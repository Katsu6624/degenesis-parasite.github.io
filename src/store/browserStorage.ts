import { Character } from './character'

const loadCharacter = (name: string) => {
  const saved = localStorage.getItem(`character-${name}`)
  if (saved) {
    const parsed: Character = JSON.parse(saved)
    return parsed
  }
  return undefined
}

const storeCharacter = (character: Character) => {
  localStorage.setItem(`character-${character.name}`, JSON.stringify(character))
}

const deleteCharacter = (name: string) => {
  localStorage.removeItem(`character-${name}`)
  const data = loadFolders()
  if (name in data.assignments) {
    delete data.assignments[name]
    storeFolders(data)
  }
}

export interface FoldersData {
  folders: string[]
  assignments: Record<string, string>
}

// Not prefixed with "character-" so it is never mistaken for a stored character
const FOLDERS_KEY = 'folders-index'

const loadFolders = (): FoldersData => {
  try {
    const parsed = JSON.parse(localStorage.getItem(FOLDERS_KEY) || '{}')
    return {
      folders: Array.isArray(parsed.folders) ? parsed.folders : [],
      assignments: parsed.assignments && typeof parsed.assignments === 'object' ? parsed.assignments : {}
    }
  } catch {
    return { folders: [], assignments: {} }
  }
}

const storeFolders = (data: FoldersData) => {
  localStorage.setItem(FOLDERS_KEY, JSON.stringify(data))
}

const loadFoldersEnabled = (): boolean => {
  return localStorage.getItem('preference-folders-enabled') === 'true'
}

const storeFoldersEnabled = (value: boolean) => {
  localStorage.setItem('preference-folders-enabled', value.toString())
}

const renameFolderAssignment = (oldName: string, newName: string) => {
  const data = loadFolders()
  if (oldName !== newName && oldName in data.assignments) {
    data.assignments[newName] = data.assignments[oldName]
    delete data.assignments[oldName]
    storeFolders(data)
  }
}

const keyToCharacterName = (localStorageKey: string) =>
  localStorageKey.replace(new RegExp(/^character-/), '')

const loadAllCharacterNames = () => {
  return Object.keys(localStorage)
    .filter((localStorageKey) => localStorageKey.startsWith('character-'))
    .map(keyToCharacterName)
    .sort((a, b) => (a > b ? -1 : 1))
}

const loadAllCharacters = () => {
  return loadAllCharacterNames().flatMap((name) => {
    const char = loadCharacter(name)
    if (char) {
      return [{
        name: name,
        character: char
      }]
    }
    return []
  })
}

const characterIsStored = (name: string) => {
  return loadAllCharacterNames().includes(name)
}

const loadLocale = () => {
  return localStorage.getItem('locale')
}

const storeLocale = (locale: string) => {
  localStorage.setItem('locale', locale)
}

const storeHasUnlockedBeta = () => {
  localStorage.setItem('beta-unlock', 'true')
}

const loadHasUnlockedBeta = () => {
  return localStorage.getItem('beta-unlock') == 'true'
}

const loadDisplayTranslatedLabels = (): boolean => {
  return localStorage.getItem('preference-display-translated-labels') == 'true'
}

const storeDisplayTranslatedLabels = (value: boolean) => {
  localStorage.setItem('preference-display-translated-labels', value.toString())
}

export default {
  loadCharacter,
  storeCharacter,
  deleteCharacter,
  loadFolders,
  storeFolders,
  loadFoldersEnabled,
  storeFoldersEnabled,
  renameFolderAssignment,
  loadAllCharacters,
  characterIsStored,
  loadLocale,
  storeLocale,
  storeHasUnlockedBeta,
  loadHasUnlockedBeta,
  loadDisplayTranslatedLabels,
  storeDisplayTranslatedLabels
}
