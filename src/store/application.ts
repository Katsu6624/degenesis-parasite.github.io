import { defineStore } from 'pinia'
import browserStorage from './browserStorage'
import { Character } from './character'

export type State = {
  storedCharacters: Map<string, Character>
  foldersEnabled: boolean
}

export const useApplicationStore = defineStore('application', {
  state: (): State => ({
    storedCharacters: loadAllCharacters(),
    foldersEnabled: browserStorage.loadFoldersEnabled()
  }),
  getters: {
    getStoredCharacters(): Character[] {
      return Array.from(this.storedCharacters.values()).sort((a, b) => a.name.localeCompare(b.name))
    },
    storedCharacterNames(): string[] {
      return Array.from(this.storedCharacters.keys()).sort((a, b) => a.localeCompare(b))
    }
  },
  actions: {
    setFoldersEnabled(value: boolean) {
      this.foldersEnabled = value
      browserStorage.storeFoldersEnabled(value)
    },
    refresh() {
      this.storedCharacters = loadAllCharacters()
    }
  }
})

function loadAllCharacters() {
  return new Map(browserStorage.loadAllCharacters().map(({name, character}) => [name, character]))
}