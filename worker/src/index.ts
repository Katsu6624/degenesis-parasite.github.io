interface Env {
  DB: D1Database
  PORTRAITS: R2Bucket
  REPORT_THRESHOLD: string
  FRONTEND_ORIGIN: string
  ADMIN_SECRET: string
  NOTIFY_EMAIL: string
}

interface CharacterRow {
  id: string
  pseudo: string
  character_data: string
  cult: string | null
  culture: string | null
  concept: string | null
  character_name: string | null
  description: string
  report_count: number
  hidden: number
  created_at: string
}

function cors(env: Env) {
  return {
    'Access-Control-Allow-Origin': env.FRONTEND_ORIGIN,
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, X-Character-Secret, Authorization',
  }
}

function json(data: unknown, status = 200, env: Env) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json', ...cors(env) },
  })
}

function err(msg: string, status: number, env: Env) {
  return json({ error: msg }, status, env)
}

async function hashSecret(secret: string): Promise<string> {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(secret))
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('')
}

function randomId(): string {
  return crypto.randomUUID().replace(/-/g, '')
}

async function uploadPortrait(bucket: R2Bucket, id: string, key: string, dataUrl: string): Promise<string | null> {
  const match = dataUrl.match(/^data:([^;]+);base64,(.+)$/)
  if (!match) return null
  const [, contentType, b64] = match
  const bytes = Uint8Array.from(atob(b64), c => c.charCodeAt(0))
  await bucket.put(`${id}/${key}`, bytes, { httpMetadata: { contentType } })
  return `${id}/${key}`
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url)
    const path = url.pathname.replace(/\/$/, '')
    const method = request.method

    if (method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: cors(env) })
    }

    // GET /api/characters
    if (method === 'GET' && path === '/api/characters') {
      const search = url.searchParams.get('search') ?? ''
      const cult = url.searchParams.get('cult') ?? ''
      const culture = url.searchParams.get('culture') ?? ''
      const concept = url.searchParams.get('concept') ?? ''
      const page = Math.max(1, parseInt(url.searchParams.get('page') ?? '1'))
      const limit = 20
      const offset = (page - 1) * limit

      let query = 'WHERE hidden = 0'
      const params: (string | number)[] = []

      if (cult) { query += ' AND cult = ?'; params.push(cult) }
      if (culture) { query += ' AND culture = ?'; params.push(culture) }
      if (concept) { query += ' AND concept = ?'; params.push(concept) }
      if (search) { query += ' AND (character_name LIKE ? OR pseudo LIKE ?)'; params.push(`%${search}%`, `%${search}%`) }

      const total = await env.DB.prepare(`SELECT COUNT(*) as n FROM characters ${query}`)
        .bind(...params).first<{ n: number }>()

      const rows = await env.DB.prepare(
        `SELECT id, pseudo, character_data, cult, culture, concept, character_name, description, created_at FROM characters ${query} ORDER BY created_at DESC LIMIT ? OFFSET ?`
      ).bind(...params, limit, offset).all<CharacterRow>()

      return json({ characters: rows.results, total: total?.n ?? 0, page }, 200, env)
    }

    // GET /api/characters/:id
    const matchGet = path.match(/^\/api\/characters\/([a-f0-9]+)$/)
    if (method === 'GET' && matchGet) {
      const row = await env.DB.prepare(
        'SELECT id, pseudo, character_data, cult, culture, concept, character_name, description, created_at FROM characters WHERE id = ? AND hidden = 0'
      ).bind(matchGet[1]).first<CharacterRow>()
      if (!row) return err('Not found', 404, env)
      return json(row, 200, env)
    }

    // POST /api/characters
    if (method === 'POST' && path === '/api/characters') {
      let body: {
        pseudo: string
        description?: string
        character: Record<string, unknown>
        portraits?: { main?: string; original?: string; fiche?: string }
      }
      try { body = await request.json() } catch { return err('Invalid JSON', 400, env) }

      if (!body.pseudo?.trim()) return err('Pseudo requis', 400, env)
      if (!body.character) return err('Personnage requis', 400, env)

      const id = randomId()
      const secret = randomId()
      const secretHash = await hashSecret(secret)
      const now = new Date().toISOString()

      const charData = { ...body.character }
      delete charData.portrait
      delete charData.portraitOriginal
      delete charData.portraitFiche

      if (body.portraits?.main) {
        const key = await uploadPortrait(env.PORTRAITS, id, 'main', body.portraits.main)
        if (key) (charData as Record<string, unknown>).portraitKey = key
      }
      if (body.portraits?.original) {
        await uploadPortrait(env.PORTRAITS, id, 'original', body.portraits.original)
      }
      if (body.portraits?.fiche) {
        await uploadPortrait(env.PORTRAITS, id, 'fiche', body.portraits.fiche)
      }

      const cult = (body.character.cult as string) ?? null
      const culture = (body.character.culture as string) ?? null
      const concept = (body.character.concept as string) ?? null
      const characterName = (body.character.name as string) ?? null

      const description = (body.description ?? '').trim().slice(0, 1000)

      await env.DB.prepare(
        'INSERT INTO characters (id, pseudo, character_data, secret_hash, cult, culture, concept, character_name, description, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
      ).bind(id, body.pseudo.trim(), JSON.stringify(charData), secretHash, cult, culture, concept, characterName, description, now).run()

      return json({ id, secret }, 201, env)
    }

    // POST /api/characters/:id/report
    const matchReport = path.match(/^\/api\/characters\/([a-f0-9]+)\/report$/)
    if (method === 'POST' && matchReport) {
      const charId = matchReport[1]
      const row = await env.DB.prepare('SELECT id, report_count FROM characters WHERE id = ? AND hidden = 0').bind(charId).first<CharacterRow>()
      if (!row) return err('Not found', 404, env)

      const reportId = randomId()
      await env.DB.prepare('INSERT INTO reports (id, character_id, created_at) VALUES (?, ?, ?)').bind(reportId, charId, new Date().toISOString()).run()
      const newCount = row.report_count + 1
      const threshold = parseInt(env.REPORT_THRESHOLD ?? '3')
      const hidden = newCount >= threshold ? 1 : 0
      await env.DB.prepare('UPDATE characters SET report_count = ?, hidden = ? WHERE id = ?').bind(newCount, hidden, charId).run()

      if (env.NOTIFY_EMAIL) {
        const char = await env.DB.prepare('SELECT character_name, pseudo FROM characters WHERE id = ?').bind(charId).first<CharacterRow>()
        const subject = hidden
          ? `[Parasite] Personnage masqué automatiquement (${newCount} signalements)`
          : `[Parasite] Nouveau signalement (${newCount}/${env.REPORT_THRESHOLD ?? '3'})`
        const body = `Personnage : ${char?.character_name ?? '?'}\nPseudo : ${char?.pseudo ?? '?'}\nID : ${charId}\nSignalements : ${newCount}\n${hidden ? '\nMasqué automatiquement.' : ''}`
        await fetch('https://api.mailchannels.net/tx/v1/send', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            personalizations: [{ to: [{ email: env.NOTIFY_EMAIL }] }],
            from: { email: 'noreply@parasite-api.shiney273.workers.dev', name: 'Parasite API' },
            subject,
            content: [{ type: 'text/plain', value: body }],
          }),
        }).catch(() => {})
      }

      return json({ ok: true, hidden: hidden === 1 }, 200, env)
    }

    // PATCH /api/characters/:id/description
    const matchPatch = path.match(/^\/api\/characters\/([a-f0-9]+)\/description$/)
    if (method === 'PATCH' && matchPatch) {
      const charId = matchPatch[1]
      let body: { secret: string; description: string }
      try { body = await request.json() } catch { return err('Invalid JSON', 400, env) }
      if (!body.secret) return err('Secret requis', 400, env)
      const hash = await hashSecret(body.secret)
      const row = await env.DB.prepare('SELECT secret_hash FROM characters WHERE id = ?').bind(charId).first<{ secret_hash: string }>()
      if (!row || row.secret_hash !== hash) return err('Non autorisé', 403, env)
      const desc = (body.description ?? '').trim().slice(0, 1000)
      await env.DB.prepare('UPDATE characters SET description = ? WHERE id = ?').bind(desc, charId).run()
      return json({ ok: true }, 200, env)
    }

    // PATCH /api/characters/:id/story (the story lives inside the character_data JSON)
    const matchStory = path.match(/^\/api\/characters\/([a-f0-9]+)\/story$/)
    if (method === 'PATCH' && matchStory) {
      const charId = matchStory[1]
      let body: { secret: string; story: string }
      try { body = await request.json() } catch { return err('Invalid JSON', 400, env) }
      if (!body.secret) return err('Secret requis', 400, env)
      const hash = await hashSecret(body.secret)
      const row = await env.DB.prepare('SELECT secret_hash, character_data FROM characters WHERE id = ?').bind(charId).first<{ secret_hash: string; character_data: string }>()
      if (!row || row.secret_hash !== hash) return err('Non autorisé', 403, env)
      let charData: Record<string, unknown>
      try { charData = JSON.parse(row.character_data) } catch { return err('Données invalides', 500, env) }
      const story = (typeof body.story === 'string' ? body.story : '').trim().slice(0, 30000)
      if (story) charData.story = story
      else delete charData.story
      await env.DB.prepare('UPDATE characters SET character_data = ? WHERE id = ?').bind(JSON.stringify(charData), charId).run()
      return json({ ok: true }, 200, env)
    }

    // DELETE /api/characters/:id (admin ou auteur)
    const matchDelete = path.match(/^\/api\/characters\/([a-f0-9]+)$/)
    if (method === 'DELETE' && matchDelete) {
      const charId = matchDelete[1]
      const authHeader = request.headers.get('Authorization') ?? ''
      const secretHeader = request.headers.get('X-Character-Secret') ?? ''

      const isAdmin = authHeader === `Bearer ${env.ADMIN_SECRET}`
      let isAuthor = false

      if (!isAdmin && secretHeader) {
        const hash = await hashSecret(secretHeader)
        const row = await env.DB.prepare('SELECT secret_hash FROM characters WHERE id = ?').bind(charId).first<{ secret_hash: string }>()
        isAuthor = row?.secret_hash === hash
      }

      if (!isAdmin && !isAuthor) return err('Non autorisé', 403, env)

      await env.DB.prepare('DELETE FROM characters WHERE id = ?').bind(charId).run()
      const portraits = await env.PORTRAITS.list({ prefix: `${charId}/` })
      await Promise.all(portraits.objects.map(o => env.PORTRAITS.delete(o.key)))

      return json({ ok: true }, 200, env)
    }

    // GET /api/portraits/:id/:key
    const matchPortrait = path.match(/^\/api\/portraits\/([a-f0-9]+)\/(main|original|fiche)$/)
    if (method === 'GET' && matchPortrait) {
      const [, id, key] = matchPortrait
      const obj = await env.PORTRAITS.get(`${id}/${key}`)
      if (!obj) return err('Not found', 404, env)
      return new Response(obj.body, {
        headers: {
          'Content-Type': obj.httpMetadata?.contentType ?? 'image/jpeg',
          'Cache-Control': 'public, max-age=31536000',
          ...cors(env),
        },
      })
    }

    return err('Not found', 404, env)
  },
}
