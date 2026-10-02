import browserStorage from '@/store/browserStorage'
import type { FoldersData } from '@/store/browserStorage'
import type { Character } from '@/store/character'

const BACKUP_APP = 'parasite-degenesis'
const BACKUP_VERSION = 1

export interface CollectionBackup {
  app: string
  version: number
  exportedAt: string
  characters: Character[]
  folders: FoldersData
}

export function exportCollection(): number {
  const characters = browserStorage.loadAllCharacters().map(({ character }) => character)
  const backup: CollectionBackup = {
    app: BACKUP_APP,
    version: BACKUP_VERSION,
    exportedAt: new Date().toISOString(),
    characters,
    folders: browserStorage.loadFolders(),
  }
  const blob = new Blob([JSON.stringify(backup)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `parasite-collection-${backup.exportedAt.slice(0, 10)}.json`
  link.click()
  URL.revokeObjectURL(url)
  return characters.length
}

export function parseBackup(text: string): CollectionBackup {
  const data = JSON.parse(text)
  if (!data || data.app !== BACKUP_APP || !Array.isArray(data.characters)) {
    throw new Error('invalid backup')
  }
  const characters = data.characters.filter(
    (c: unknown): c is Character =>
      !!c && typeof c === 'object' && typeof (c as Character).name === 'string' && (c as Character).name.trim() !== ''
  )
  const folders: FoldersData = {
    folders: Array.isArray(data.folders?.folders) ? data.folders.folders.filter((f: unknown) => typeof f === 'string') : [],
    assignments:
      data.folders?.assignments && typeof data.folders.assignments === 'object' ? data.folders.assignments : {},
  }
  return { app: data.app, version: data.version, exportedAt: data.exportedAt, characters, folders }
}

export function analyzeBackup(backup: CollectionBackup) {
  const existing = new Set(browserStorage.loadAllCharacters().map(({ name }) => name))
  const conflicts = backup.characters.filter((c) => existing.has(c.name)).length
  return { total: backup.characters.length, fresh: backup.characters.length - conflicts, conflicts }
}

// The active character is never overwritten: the editor would save its in-memory copy over the imported one
export function applyBackup(backup: CollectionBackup, overwrite: boolean, activeName: string) {
  const existing = new Set(browserStorage.loadAllCharacters().map(({ name }) => name))
  const folderData = browserStorage.loadFolders()
  let imported = 0
  let skipped = 0
  for (const character of backup.characters) {
    const exists = existing.has(character.name)
    if (exists && (!overwrite || character.name === activeName)) {
      skipped++
      continue
    }
    browserStorage.storeCharacter(character)
    imported++
    const folder = backup.folders.assignments[character.name]
    if (typeof folder === 'string' && backup.folders.folders.includes(folder)) {
      if (!folderData.folders.includes(folder)) folderData.folders.push(folder)
      folderData.assignments[character.name] = folder
    }
  }
  for (const folder of backup.folders.folders) {
    if (!folderData.folders.includes(folder)) folderData.folders.push(folder)
  }
  browserStorage.storeFolders(folderData)
  return { imported, skipped }
}
