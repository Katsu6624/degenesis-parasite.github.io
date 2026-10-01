export const CULT_RELATIONSHIP_KEYS = [
  'spitalians',
  'chroniclers',
  'hellvetics',
  'judges',
  'clanners',
  'scrappers',
  'neolibyans',
  'scourgers',
  'anubians',
  'jehammedans',
  'apocalyptics',
  'anabaptists',
  'palers',
] as const

export type CultRelationshipKey = (typeof CULT_RELATIONSHIP_KEYS)[number]
export type CultRelationships = Record<CultRelationshipKey, number>

export function defaultCultRelationships(): CultRelationships {
  return Object.fromEntries(CULT_RELATIONSHIP_KEYS.map((key) => [key, 0])) as CultRelationships
}

export function clampCultRelationship(value: number): number {
  if (!Number.isFinite(value)) return 0
  return Math.max(-6, Math.min(6, Math.trunc(value)))
}

export function normalizeCultRelationships(
  relationships?: Partial<CultRelationships> | null,
): CultRelationships {
  const defaults = defaultCultRelationships()
  if (!relationships) return defaults
  return Object.fromEntries(
    CULT_RELATIONSHIP_KEYS.map((key) => [
      key,
      clampCultRelationship((relationships as Record<string, unknown>)[key] as number),
    ]),
  ) as CultRelationships
}
