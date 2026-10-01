const API_URL = 'https://parasite-api.shiney273.workers.dev'

export interface CommunityCharacter {
  id: string
  pseudo: string
  character_data: string
  cult: string | null
  culture: string | null
  concept: string | null
  character_name: string | null
  created_at: string
}

export interface ListResponse {
  characters: CommunityCharacter[]
  total: number
  page: number
}

export interface PublishPayload {
  pseudo: string
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

export async function deleteCharacter(id: string, secret: string): Promise<void> {
  await fetch(`${API_URL}/api/characters/${id}`, {
    method: 'DELETE',
    headers: { 'X-Character-Secret': secret },
  })
}

export function portraitUrl(id: string, key: 'main' | 'original' | 'fiche'): string {
  return `${API_URL}/api/portraits/${id}/${key}`
}
