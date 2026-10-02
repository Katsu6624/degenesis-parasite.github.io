const API_URL = 'https://parasite-api.shiney273.workers.dev'

export interface CommunityCharacter {
  id: string
  pseudo: string
  character_data: string
  cult: string | null
  culture: string | null
  concept: string | null
  character_name: string | null
  description: string
  created_at: string
}

export interface ListResponse {
  characters: CommunityCharacter[]
  total: number
  page: number
}

export interface PublishPayload {
  pseudo: string
  description?: string
  character: Record<string, unknown>
  portraits?: {
    main?: string
    original?: string
    fiche?: string
  }
}

export interface PublishResult {
  id: string
  secret: string
}

export async function listCharacters(params: {
  search?: string
  cult?: string
  culture?: string
  concept?: string
  page?: number
}): Promise<ListResponse> {
  const q = new URLSearchParams()
  if (params.search) q.set('search', params.search)
  if (params.cult) q.set('cult', params.cult)
  if (params.culture) q.set('culture', params.culture)
  if (params.concept) q.set('concept', params.concept)
  if (params.page) q.set('page', String(params.page))
  const res = await fetch(`${API_URL}/api/characters?${q}`)
  if (!res.ok) throw new Error('Erreur lors du chargement')
  return res.json()
}

export async function publishCharacter(payload: PublishPayload): Promise<PublishResult> {
  const res = await fetch(`${API_URL}/api/characters`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error((err as { error?: string }).error ?? 'Erreur lors de la publication')
  }
  return res.json()
}

export async function reportCharacter(id: string): Promise<void> {
  await fetch(`${API_URL}/api/characters/${id}/report`, { method: 'POST' })
}

export async function updateDescription(id: string, secret: string, description: string): Promise<void> {
  const res = await fetch(`${API_URL}/api/characters/${id}/description`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ secret, description }),
  })
  if (!res.ok) {
    const data = await res.json().catch(() => ({}))
    throw new Error((data as { error?: string }).error ?? 'Erreur')
  }
}

export async function updateStory(id: string, secret: string, story: string): Promise<void> {
  const res = await fetch(`${API_URL}/api/characters/${id}/story`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ secret, story }),
  })
  if (!res.ok) {
    const data = await res.json().catch(() => ({}))
    throw new Error((data as { error?: string }).error ?? 'Erreur')
  }
}

export async function deleteCharacter(id: string, secret: string): Promise<void> {
  await fetch(`${API_URL}/api/characters/${id}`, {
    method: 'DELETE',
    headers: { 'X-Character-Secret': secret },
  })
}

export function portraitUrl(id: string, key: 'main' | 'original' | 'fiche'): string {
  return `${API_URL}/api/portraits/${id}/${key}`
}

async function fetchPortraitAsDataUrl(id: string, key: 'main' | 'original' | 'fiche'): Promise<string | null> {
  try {
    const res = await fetch(portraitUrl(id, key))
    if (!res.ok) return null
    const blob = await res.blob()
    return new Promise((resolve) => {
      const reader = new FileReader()
      reader.onload = () => resolve(reader.result as string)
      reader.onerror = () => resolve(null)
      reader.readAsDataURL(blob)
    })
  } catch {
    return null
  }
}

export async function fetchPortraitsForImport(id: string, charData: Record<string, unknown>): Promise<Record<string, unknown>> {
  if (!charData.portraitKey) return charData
  const [main, original, fiche] = await Promise.all([
    fetchPortraitAsDataUrl(id, 'main'),
    fetchPortraitAsDataUrl(id, 'original'),
    fetchPortraitAsDataUrl(id, 'fiche'),
  ])
  return {
    ...charData,
    ...(main ? { portrait: main } : {}),
    ...(original ? { portraitOriginal: original } : {}),
    ...(fiche ? { portraitFiche: fiche } : {}),
  }
}
