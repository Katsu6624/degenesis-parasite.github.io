export const statusTrackKeys = ['ego', 'sporeInfestations', 'fleshwounds', 'trauma'] as const
export type StatusTrackKey = (typeof statusTrackKeys)[number]
export type StatusSoftSelections = Record<StatusTrackKey, number[]>

export function defaultStatusSoftSelections(): StatusSoftSelections {
  return { ego: [], sporeInfestations: [], fleshwounds: [], trauma: [] }
}

export function normalizeStatusPoints(value: unknown): number[] {
  if (!Array.isArray(value)) return []
  return value.filter((v): v is number => typeof v === 'number' && Number.isFinite(v) && v >= 0)
}

export function normalizeStatusSoftSelections(
  value?: Partial<StatusSoftSelections>,
): StatusSoftSelections {
  if (!value) return defaultStatusSoftSelections()
  return {
    ego: normalizeStatusPoints(value.ego),
    sporeInfestations: normalizeStatusPoints(value.sporeInfestations),
    fleshwounds: normalizeStatusPoints(value.fleshwounds),
    trauma: normalizeStatusPoints(value.trauma),
  }
}
