export interface ArtifactEntry {
  name: string
  activation: string
  operation: string
  appraisalValue: string
}

export interface OtherData {
  // Scars section
  groupName: string
  alignment: string
  constellation: string
  scarsValue: string
  infamy: number
  // Complications
  complications: string
  // Artifacts
  artifacts: ArtifactEntry[]
  // Notes
  notes: string[]
}

export function defaultOtherData(): OtherData {
  return {
    groupName: '',
    alignment: '',
    constellation: '',
    scarsValue: '',
    infamy: 0,
    complications: '',
    artifacts: [],
    notes: [],
  }
}

export function normalizeOtherData(data?: Partial<OtherData> | null): OtherData {
  const defaults = defaultOtherData()
  if (!data) return defaults
  return {
    groupName: typeof data.groupName === 'string' ? data.groupName : defaults.groupName,
    alignment: typeof data.alignment === 'string' ? data.alignment : defaults.alignment,
    constellation: typeof data.constellation === 'string' ? data.constellation : defaults.constellation,
    scarsValue: typeof data.scarsValue === 'string' ? data.scarsValue : defaults.scarsValue,
    infamy: typeof data.infamy === 'number' && Number.isFinite(data.infamy)
      ? Math.max(0, Math.min(6, Math.trunc(data.infamy)))
      : defaults.infamy,
    complications: typeof data.complications === 'string' ? data.complications : defaults.complications,
    artifacts: Array.isArray(data.artifacts)
      ? data.artifacts.map((a) => ({
          name: typeof a.name === 'string' ? a.name : '',
          activation: typeof a.activation === 'string' ? a.activation : '',
          operation: typeof a.operation === 'string' ? a.operation : '',
          appraisalValue: typeof a.appraisalValue === 'string' ? a.appraisalValue : '',
        }))
      : defaults.artifacts,
    notes: Array.isArray(data.notes)
      ? data.notes.filter((n): n is string => typeof n === 'string')
      : defaults.notes,
  }
}
