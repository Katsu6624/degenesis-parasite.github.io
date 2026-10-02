<template>
  <div class="chars-root">
    <!-- Header -->
    <div class="chars-header elevation-2">
      <div class="chars-header-title">{{ $t('messages.characters') }}</div>
      <div class="chars-header-actions">
        <v-btn :prepend-icon="mdiAccountPlusOutline" variant="outlined" color="red-darken-2" @click="emit('createNew')">
          {{ $t('messages.createNewCharacter') }}
        </v-btn>
        <v-btn :prepend-icon="mdiImport" variant="outlined" @click="emit('import')">
          {{ $t('messages.importCharacter') }}
        </v-btn>
      </div>
    </div>

    <!-- Empty state -->
    <div v-if="characters.length === 0" class="chars-empty">
      <v-icon size="80" color="grey-darken-2" :icon="mdiAccountGroupOutline"></v-icon>
      <div class="text-h6 text-grey-darken-2 mt-4">Aucun personnage sauvegardé.</div>
      <div class="text-body-2 text-grey-darken-1 mt-1">Créez un nouveau personnage pour commencer.</div>
    </div>

    <!-- Filters + folders toolbar -->
    <div v-else class="chars-toolbar">
      <v-row dense>
        <v-col cols="12" sm="3">
          <v-text-field v-model="search" :label="$t('folders.search')" variant="outlined" density="compact" clearable hide-details />
        </v-col>
        <v-col cols="12" sm="2">
          <v-select v-model="filterCult" :label="$t('folders.filterCult')" :items="cultOptions" variant="outlined" density="compact" clearable hide-details />
        </v-col>
        <v-col cols="12" sm="2">
          <v-select v-model="filterCulture" :label="$t('folders.filterCulture')" :items="cultureOptions" variant="outlined" density="compact" clearable hide-details />
        </v-col>
        <v-col cols="12" sm="2">
          <v-select v-model="filterConcept" :label="$t('folders.filterConcept')" :items="conceptOptions" variant="outlined" density="compact" clearable hide-details />
        </v-col>
        <v-col v-if="foldersEnabled" cols="12" sm="3">
          <v-select v-model="filterFolder" :label="$t('folders.filterFolder')" :items="folderFilterOptions" variant="outlined" density="compact" clearable hide-details />
        </v-col>
      </v-row>
      <div v-if="foldersEnabled" class="mt-3">
        <v-btn size="small" variant="outlined" :prepend-icon="mdiFolderPlusOutline" @click="openFolderDialog(null)">
          {{ $t('folders.newFolder') }}
        </v-btn>
      </div>
    </div>

    <div v-if="characters.length > 0 && sections.length === 0" class="text-center text-medium-emphasis pa-8">
      {{ $t('folders.noResults') }}
    </div>

    <!-- Folder sections -->
    <section v-for="section in sections" :key="section.key" class="chars-section">
      <div v-if="!section.plain" class="chars-section-header" @click="toggleCollapsed(section.key)">
        <v-icon size="18" :icon="collapsed.has(section.key) ? mdiChevronRight : mdiChevronDown"></v-icon>
        <v-icon size="18" :icon="section.folder === null ? mdiFolderOutline : mdiFolder" class="ml-1"></v-icon>
        <span class="chars-section-title">{{ section.label }}</span>
        <span class="chars-section-count">{{ section.chars.length }}</span>
        <v-spacer></v-spacer>
        <template v-if="section.folder !== null">
          <v-btn icon size="x-small" variant="text" :title="$t('folders.renameFolder')" @click.stop="openFolderDialog(section.folder)">
            <v-icon size="16" :icon="mdiPencilOutline"></v-icon>
          </v-btn>
          <v-btn icon size="x-small" variant="text" :title="$t('folders.deleteFolder')" @click.stop="askDeleteFolder(section.folder)">
            <v-icon size="16" :icon="mdiDeleteOutline"></v-icon>
          </v-btn>
        </template>
      </div>
      <div v-if="!collapsed.has(section.key) && section.chars.length === 0" class="chars-section-empty">
        {{ $t('folders.emptyFolder') }}
      </div>
    <div v-if="!collapsed.has(section.key) && section.chars.length > 0" class="chars-grid">
      <div
        v-for="character in section.chars"
        :key="character.name"
        class="char-card"
        :class="{ 'char-card--highlighted': character.name === props.highlightedCharacter }"
        :ref="el => { if (character.name === props.highlightedCharacter && el) (el as HTMLElement).scrollIntoView({ behavior: 'smooth', block: 'center' }) }"
        @click="emit('load', character.name)"
      >
        <!-- Portrait -->
        <div class="char-card-portrait" @click.stop>
          <img v-if="character.portrait" :src="character.portrait" class="char-card-portrait-img" @click="emit('load', character.name)" />
          <div v-else class="char-card-portrait-placeholder" @click="emit('load', character.name)">
            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" class="char-placeholder-svg">
              <circle cx="50" cy="35" r="22" fill="#555" />
              <ellipse cx="50" cy="85" rx="34" ry="28" fill="#555" />
            </svg>
          </div>
          <!-- Crop overlay button -->
          <button v-if="character.portrait" class="char-portrait-crop-btn" @click.stop="openCrop(character)">
            <v-icon size="14" :icon="mdiCrop"></v-icon>
            <span>Recadrer</span>
          </button>
        </div>

        <!-- Info -->
        <div class="char-card-body">
          <div class="char-card-name">{{ character.name }}</div>
          <div class="char-card-rank">{{ rankLabel(character) }}</div>

          <!-- Logotypes -->
          <div class="char-card-icons">
            <img
              v-if="character.culture"
              :src="`${baseUrl}logotypes/cultures/${character.culture}.svg`"
              class="char-logotype"
              :class="isDark ? 'char-logotype--dark' : 'char-logotype--light'"
              :title="t(`culturesConceptsCults.${character.culture}`)"
            />
            <span v-else class="char-logotype-unknown" title="Culture non sélectionnée">?</span>
            <img
              v-if="character.concept"
              :src="`${baseUrl}logotypes/concepts/${character.concept}.svg`"
              class="char-logotype"
              :class="isDark ? 'char-logotype--dark' : 'char-logotype--light'"
              :title="t(`culturesConceptsCults.${character.concept}`)"
            />
            <span v-else class="char-logotype-unknown" title="Concept non sélectionné">?</span>
            <template v-if="character.clan">
              <img
                :src="`${baseUrl}logotypes/clans/${character.clan}.svg`"
                class="char-logotype"
                :class="isDark ? 'char-logotype--dark' : 'char-logotype--light'"
                :title="t(`clans.${character.clan}`)"
              />
            </template>
            <template v-else-if="character.cult">
              <img
                :src="`${baseUrl}logotypes/cults/${character.cult}.svg`"
                class="char-logotype"
                :class="isDark ? 'char-logotype--dark' : 'char-logotype--light'"
                :title="t(`culturesConceptsCults.${character.cult}`)"
              />
            </template>
            <span v-else class="char-logotype-unknown" title="Culte non sélectionné">?</span>
          </div>
        </div>

        <!-- Actions -->
        <div class="char-card-actions" @click.stop>
          <v-btn
            block
            variant="flat"
            color="red-darken-3"
            class="char-card-action-btn"
            :loading="sharing === character.name"
            @click="shareChar(character)"
          >
            <v-icon :icon="mdiShareVariant" size="16" class="mr-2"></v-icon>
            Partager
          </v-btn>
          <v-btn
            block
            variant="outlined"
            color="red-darken-3"
            class="char-card-action-btn"
            @click="openPublish(character)"
          >
            <v-icon :icon="mdiAccountMultiple" size="16" class="mr-2"></v-icon>
            {{ $t('community.publish') }}
          </v-btn>
          <v-btn
            block
            variant="outlined"
            color="red-darken-3"
            class="char-card-action-btn"
            @click="confirmDelete(character.name)"
          >
            <v-icon :icon="mdiDeleteOutline" size="16" class="mr-2"></v-icon>
            Supprimer
          </v-btn>
          <v-menu v-if="foldersEnabled" location="top">
            <template #activator="{ props: mp }">
              <v-btn v-bind="mp" block variant="text" class="char-card-action-btn">
                <v-icon :icon="mdiFolderOutline" size="16" class="mr-2"></v-icon>
                {{ $t('folders.moveToFolder') }}: {{ folderOf(character.name) ?? $t('folders.noFolder') }}
              </v-btn>
            </template>
            <v-list density="compact">
              <v-list-item
                :active="folderOf(character.name) === null"
                :title="$t('folders.noFolder')"
                @click="assignFolder(character.name, null)"
              ></v-list-item>
              <v-list-item
                v-for="f in foldersData.folders"
                :key="f"
                :active="folderOf(character.name) === f"
                :title="f"
                @click="assignFolder(character.name, f)"
              ></v-list-item>
              <v-divider></v-divider>
              <v-list-item
                :prepend-icon="mdiFolderPlusOutline"
                :title="$t('folders.newFolder')"
                @click="openFolderDialog(null, character.name)"
              ></v-list-item>
            </v-list>
          </v-menu>
        </div>
      </div>
    </div>
    </section>

    <!-- Crop dialog -->
    <ImageCropperDialog
      v-model="showCropDialog"
      :src="cropSrc"
      @crop="onCropConfirm"
    />

    <!-- Share snackbar -->
    <v-snackbar v-model="shareCopied" timeout="3000" color="green-darken-2">
      {{ $t('messages.shareCopied') }}
    </v-snackbar>

    <!-- Publish dialog -->
    <PublishDialog v-model="showPublishDialog" :prefilled-character="publishCharacter" />

    <!-- Create / rename folder dialog -->
    <v-dialog v-model="folderDialog" max-width="380">
      <v-card>
        <v-card-title class="text-h6">{{ folderEditing === null ? $t('folders.newFolder') : $t('folders.renameFolder') }}</v-card-title>
        <v-card-text>
          <v-text-field
            v-model="folderNameInput"
            :label="$t('folders.folderName')"
            :error-messages="folderError"
            variant="outlined"
            density="compact"
            maxlength="40"
            autofocus
            @keyup.enter="saveFolder"
          />
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn variant="text" @click="folderDialog = false">{{ $t('folders.cancel') }}</v-btn>
          <v-btn color="red-darken-2" variant="flat" :disabled="!folderNameInput.trim()" @click="saveFolder">
            {{ folderEditing === null ? $t('folders.create') : $t('folders.rename') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Delete folder dialog -->
    <v-dialog v-model="deleteFolderDialog" max-width="400">
      <v-card>
        <v-card-title class="text-h6">{{ $t('folders.deleteFolder') }} : {{ pendingDeleteFolder }}</v-card-title>
        <v-card-text>{{ $t('folders.deleteFolderDesc') }}</v-card-text>
        <v-card-actions class="justify-end">
          <v-btn variant="text" @click="deleteFolderDialog = false">{{ $t('folders.cancel') }}</v-btn>
          <v-btn color="red-darken-2" variant="flat" @click="doDeleteFolder">{{ $t('folders.delete') }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Confirm delete dialog -->
    <v-dialog v-model="deleteDialog" max-width="400">
      <v-card>
        <v-card-title class="text-h6">Supprimer le personnage ?</v-card-title>
        <v-card-text>
          <strong>{{ pendingDeleteName }}</strong> sera définitivement supprimé. Cette action est irréversible.
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn variant="text" @click="deleteDialog = false">Annuler</v-btn>
          <v-btn color="red-darken-2" variant="flat" @click="doDelete">Supprimer</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useTheme } from 'vuetify'
import type { Character } from '@/store/character'
import { encodeCharacter } from '@/util/share'
import browserStorage from '@/store/browserStorage'
import { useApplicationStore } from '@/store/application'
import ImageCropperDialog from './ImageCropperDialog.vue'
import PublishDialog from './PublishDialog.vue'
import {
  mdiAccountPlusOutline,
  mdiAccountGroupOutline,
  mdiImport,
  mdiCrop,
  mdiShareVariant,
  mdiDeleteOutline,
  mdiAccountMultiple,
  mdiFolder,
  mdiFolderOutline,
  mdiFolderPlusOutline,
  mdiChevronRight,
  mdiChevronDown,
  mdiPencilOutline,
} from '@mdi/js'
import config from '@/config'
import { CULT_RELATIONSHIP_KEYS } from '@/config/cultRelationships'

const props = defineProps<{
  characters: Character[]
  activeCharacterName: string
  highlightedCharacter?: string | null
}>()

const emit = defineEmits<{
  (e: 'load', name: string): void
  (e: 'delete', name: string): void
  (e: 'createNew'): void
  (e: 'import'): void
}>()

const { t } = useI18n()
const theme = useTheme()
const isDark = computed(() => theme.global.current.value.dark)
const baseUrl = import.meta.env.BASE_URL
const appStore = useApplicationStore()

// Filters
const NO_FOLDER = '__none__'
const search = ref<string | null>('')
const filterCult = ref<string | null>(null)
const filterCulture = ref<string | null>(null)
const filterConcept = ref<string | null>(null)
const filterFolder = ref<string | null>(null)

const cultOptions = computed(() =>
  CULT_RELATIONSHIP_KEYS.map(k => ({ title: t(`culturesConceptsCults.${k}`), value: k }))
)
const cultureOptions = computed(() =>
  Object.values(config.cultures).map(c => ({ title: t(`culturesConceptsCults.${c.name}`), value: c.name }))
)
const conceptOptions = computed(() =>
  Object.values(config.concepts).map(c => ({ title: t(`culturesConceptsCults.${c.name}`), value: c.name }))
)

// Folders (local to this browser, stored separately from the characters)
const foldersEnabled = browserStorage.loadFoldersEnabled()
const foldersData = ref(browserStorage.loadFolders())
const collapsed = ref(new Set<string>())

function persistFolders() {
  browserStorage.storeFolders(foldersData.value)
}

function folderOf(name: string): string | null {
  const folder = foldersData.value.assignments[name]
  return folder && foldersData.value.folders.includes(folder) ? folder : null
}

const folderFilterOptions = computed(() => [
  { title: t('folders.noFolder'), value: NO_FOLDER },
  ...foldersData.value.folders.map(f => ({ title: f, value: f })),
])

const filteredCharacters = computed(() => {
  const q = (search.value || '').trim().toLowerCase()
  return props.characters.filter(c =>
    (!q || c.name.toLowerCase().includes(q)) &&
    (!filterCult.value || c.cult === filterCult.value) &&
    (!filterCulture.value || c.culture === filterCulture.value) &&
    (!filterConcept.value || c.concept === filterConcept.value)
  )
})

const filtersActive = computed(() =>
  !!((search.value || '').trim() || filterCult.value || filterCulture.value || filterConcept.value)
)

interface Section {
  key: string
  label: string
  folder: string | null
  plain: boolean
  chars: Character[]
}

const sections = computed<Section[]>(() => {
  const result: Section[] = []
  const list = filteredCharacters.value
  if (!foldersEnabled) {
    return list.length > 0 ? [{ key: 'all', label: '', folder: null, plain: true, chars: list }] : []
  }
  for (const f of foldersData.value.folders) {
    if (filterFolder.value && filterFolder.value !== f) continue
    const chars = list.filter(c => folderOf(c.name) === f)
    if (chars.length === 0 && filtersActive.value) continue
    result.push({ key: `f:${f}`, label: f, folder: f, plain: false, chars })
  }
  if (!filterFolder.value || filterFolder.value === NO_FOLDER) {
    const chars = list.filter(c => folderOf(c.name) === null)
    if (chars.length > 0) {
      result.push({
        key: 'none',
        label: t('folders.noFolder'),
        folder: null,
        plain: foldersData.value.folders.length === 0,
        chars,
      })
    }
  }
  return result
})

function toggleCollapsed(key: string) {
  const next = new Set(collapsed.value)
  if (next.has(key)) next.delete(key)
  else next.add(key)
  collapsed.value = next
}

function assignFolder(characterName: string, folder: string | null) {
  if (folder === null) delete foldersData.value.assignments[characterName]
  else foldersData.value.assignments[characterName] = folder
  persistFolders()
}

const folderDialog = ref(false)
const folderEditing = ref<string | null>(null)
const folderAssignAfter = ref<string | null>(null)
const folderNameInput = ref('')
const folderError = ref('')

function openFolderDialog(editing: string | null, assignCharacter: string | null = null) {
  folderEditing.value = editing
  folderAssignAfter.value = assignCharacter
  folderNameInput.value = editing ?? ''
  folderError.value = ''
  folderDialog.value = true
}

function saveFolder() {
  const name = folderNameInput.value.trim()
  if (!name) return
  const data = foldersData.value
  const old = folderEditing.value
  if (data.folders.some(f => f.toLowerCase() === name.toLowerCase() && f !== old)) {
    folderError.value = t('folders.folderExists')
    return
  }
  if (old === null) {
    data.folders.push(name)
    if (folderAssignAfter.value) data.assignments[folderAssignAfter.value] = name
  } else if (old !== name) {
    data.folders[data.folders.indexOf(old)] = name
    for (const [charName, f] of Object.entries(data.assignments)) {
      if (f === old) data.assignments[charName] = name
    }
    if (filterFolder.value === old) filterFolder.value = name
    if (collapsed.value.has(`f:${old}`)) {
      const next = new Set(collapsed.value)
      next.delete(`f:${old}`)
      next.add(`f:${name}`)
      collapsed.value = next
    }
  }
  persistFolders()
  folderDialog.value = false
}

const deleteFolderDialog = ref(false)
const pendingDeleteFolder = ref('')

function askDeleteFolder(folder: string) {
  pendingDeleteFolder.value = folder
  deleteFolderDialog.value = true
}

function doDeleteFolder() {
  const folder = pendingDeleteFolder.value
  const data = foldersData.value
  data.folders = data.folders.filter(f => f !== folder)
  for (const [charName, f] of Object.entries(data.assignments)) {
    if (f === folder) delete data.assignments[charName]
  }
  if (filterFolder.value === folder) filterFolder.value = null
  persistFolders()
  deleteFolderDialog.value = false
}

// Publish
const showPublishDialog = ref(false)
const publishCharacter = ref<Record<string, unknown> | null>(null)
function openPublish(character: { name: string }) {
  const raw = browserStorage.loadCharacter(character.name)
  publishCharacter.value = raw ? JSON.parse(JSON.stringify(raw)) : null
  showPublishDialog.value = true
}

// Delete
const deleteDialog = ref(false)
const pendingDeleteName = ref('')
function confirmDelete(name: string) {
  pendingDeleteName.value = name
  deleteDialog.value = true
}
function doDelete() {
  emit('delete', pendingDeleteName.value)
  deleteDialog.value = false
}

// Crop
const showCropDialog = ref(false)
const cropSrc = ref('')
let cropTargetName = ''

function openCrop(character: Character) {
  cropTargetName = character.name
  // Toujours recadrer depuis l'original brut
  cropSrc.value = character.portraitOriginal || character.portrait || ''
  showCropDialog.value = true
}

function onCropConfirm(croppedDataUrl: string) {
  const char = browserStorage.loadCharacter(cropTargetName)
  if (!char) return
  // Seul le portrait de la carte (miniature) est modifié, portraitOriginal reste intact
  const raw = char as any
  raw.portrait = croppedDataUrl
  browserStorage.storeCharacter(raw)
  appStore.refresh()
}

// Share
const sharing = ref<string | null>(null)
const shareCopied = ref(false)
async function shareChar(character: Character) {
  sharing.value = character.name
  const base = window.location.origin + window.location.pathname
  let url: string
  try {
    const res = await fetch('https://bytebin.lucko.me/post', {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain' },
      body: JSON.stringify(character),
    })
    if (!res.ok) throw new Error(`bytebin status ${res.status}`)
    const { key } = await res.json()
    if (!key) throw new Error('no key returned')
    url = `${base}#bb=${key}`
  } catch {
    const encoded = await encodeCharacter(character)
    url = `${base}#view=${encoded}`
  }
  try {
    await navigator.clipboard.writeText(url)
  } catch {
    window.open(url, '_blank')
  }
  sharing.value = null
  shareCopied.value = true
}

// Rank label
function rankLabel(character: Character): string {
  const cultLabel = character.clan
    ? t(`clans.${character.clan}`)
    : character.cult
      ? t(`culturesConceptsCults.${character.cult}`)
      : ''
  const rank = character.rank ? t(`ranks.${character.rank}`) : ''
  return rank ? `${cultLabel} (${rank})` : cultLabel
}
</script>

<style scoped>
.chars-root {
  min-height: 100vh;
  background: rgb(var(--v-theme-surface));
}

.chars-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 12px;
  padding: 20px 28px;
  background: rgb(var(--v-theme-surface-variant));
  border-bottom: 1px solid rgba(var(--v-theme-on-surface), 0.1);
}

.chars-header-title {
  font-size: 1rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: rgb(var(--v-theme-on-surface));
}

.chars-header-actions {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.chars-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 24px;
}

.chars-toolbar {
  padding: 20px 28px 0;
}

.chars-section {
  padding-top: 8px;
}

.chars-section-header {
  display: flex;
  align-items: center;
  gap: 6px;
  margin: 12px 28px 0;
  padding: 8px 12px;
  border-radius: 6px;
  background: rgba(var(--v-theme-on-surface), 0.05);
  border-left: 3px solid rgb(var(--v-theme-primary));
  cursor: pointer;
  user-select: none;
}

.chars-section-title {
  font-size: 0.85rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.chars-section-count {
  font-size: 0.7rem;
  padding: 1px 8px;
  border-radius: 10px;
  background: rgba(var(--v-theme-on-surface), 0.12);
}

.chars-section-empty {
  margin: 12px 28px 0;
  font-size: 0.8rem;
  color: rgba(var(--v-theme-on-surface), 0.45);
}

.chars-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  padding: 28px;
}

.char-card {
  background: rgb(var(--v-theme-surface-variant));
  border-radius: 6px;
  overflow: hidden;
  cursor: pointer;
  border: 2px solid transparent;
  transition: border-color 0.2s, transform 0.15s, box-shadow 0.2s;
  display: flex;
  flex-direction: column;
}

.char-card:hover {
  border-color: rgba(var(--v-theme-primary), 0.5);
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0,0,0,0.35);
}

.char-card--highlighted {
  border-color: rgb(var(--v-theme-primary));
  box-shadow: 0 0 0 2px rgb(var(--v-theme-primary)), 0 0 20px rgba(var(--v-theme-primary), 0.4);
  animation: highlight-pulse 2s ease-in-out 3;
}

@keyframes highlight-pulse {
  0%, 100% { box-shadow: 0 0 0 2px rgb(var(--v-theme-primary)), 0 0 20px rgba(var(--v-theme-primary), 0.35); }
  50%       { box-shadow: 0 0 0 3px rgb(var(--v-theme-primary)), 0 0 36px rgba(var(--v-theme-primary), 0.6); }
}

.char-card-portrait {
  position: relative;
  aspect-ratio: 3 / 4;
  background: #2a2a2a;
  overflow: hidden;
}

.char-card-portrait-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.char-card-portrait-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #333;
}

.char-placeholder-svg {
  width: 60%;
  height: 60%;
  opacity: 0.5;
}

.char-portrait-crop-btn {
  position: absolute;
  bottom: 6px;
  right: 6px;
  background: rgba(0,0,0,0.62);
  border: 1px solid rgba(255,255,255,0.3);
  color: #fff;
  border-radius: 4px;
  padding: 4px 8px;
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.15s;
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 0.7rem;
  font-family: inherit;
  white-space: nowrap;
}

.char-card-portrait:hover .char-portrait-crop-btn {
  opacity: 1;
}

.char-card-body {
  padding: 12px 12px 8px;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.char-card-name {
  font-size: 0.85rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: rgb(var(--v-theme-on-surface));
  margin-bottom: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
}

.char-card-rank {
  font-size: 0.7rem;
  color: rgba(var(--v-theme-on-surface), 0.55);
  margin-bottom: 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
}

.char-card-icons {
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: center;
}

.char-logotype {
  width: 28px;
  height: 28px;
  object-fit: contain;
  flex-shrink: 0;
}

.char-logotype--dark {
  filter: invert(1) brightness(0.75);
}

.char-logotype--light {
  filter: brightness(0);
}

.char-logotype-unknown {
  width: 28px;
  height: 28px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  font-weight: 700;
  color: rgba(var(--v-theme-on-surface), 0.3);
  border: 1px dashed rgba(var(--v-theme-on-surface), 0.25);
  border-radius: 4px;
  flex-shrink: 0;
}

.char-card-actions {
  padding: 8px 12px 12px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.char-card-action-btn {
  font-size: 0.73rem !important;
  letter-spacing: 0.06em !important;
  justify-content: center !important;
}
</style>
