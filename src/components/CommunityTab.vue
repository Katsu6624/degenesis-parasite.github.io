<template>
  <div class="community-root">
  <div class="community-tab pa-4">
    <div class="community-tab__header mb-4">
      <div>
        <h1 class="text-h5">{{ $t('community.title') }}</h1>
        <p class="text-body-2 text-medium-emphasis">{{ $t('community.subtitle') }}</p>
      </div>
      <v-btn
        variant="outlined"
        size="small"
        :prepend-icon="mdiKeyVariant"
        class="community-secrets-btn"
        @click="openSecrets"
      >
        {{ $t('community.mySecrets') }}
      </v-btn>
    </div>

    <!-- Filters -->
    <v-row dense class="mb-4">
      <v-col cols="12" sm="4">
        <v-text-field
          v-model="search"
          :label="$t('community.search')"
          variant="outlined"
          density="compact"
          clearable
          @update:model-value="onFilterChange"
        />
      </v-col>
      <v-col cols="12" sm="3">
        <v-select
          v-model="filterCult"
          :label="$t('community.filterCult')"
          :items="cultOptions"
          variant="outlined"
          density="compact"
          clearable
          @update:model-value="onFilterChange"
        />
      </v-col>
      <v-col cols="12" sm="3">
        <v-select
          v-model="filterCulture"
          :label="$t('community.filterCulture')"
          :items="cultureOptions"
          variant="outlined"
          density="compact"
          clearable
          @update:model-value="onFilterChange"
        />
      </v-col>
      <v-col cols="12" sm="2">
        <v-select
          v-model="filterConcept"
          :label="$t('community.filterConcept')"
          :items="conceptOptions"
          variant="outlined"
          density="compact"
          clearable
          @update:model-value="onFilterChange"
        />
      </v-col>
    </v-row>

    <!-- Loading -->
    <div v-if="loading" class="d-flex justify-center pa-8">
      <v-progress-circular indeterminate color="red-darken-2" />
    </div>

    <!-- Error -->
    <v-alert v-else-if="error" type="error" density="compact" class="mb-4">{{ error }}</v-alert>

    <!-- Empty -->
    <div v-else-if="characters.length === 0" class="text-center text-medium-emphasis pa-8">
      {{ $t('community.empty') }}
    </div>

    <!-- Grid -->
    <div v-else class="community-grid">
      <div
        v-for="char in characters"
        :key="char.id"
        class="char-card"
      >
        <div class="char-card-portrait">
          <img
            v-if="charData(char).portraitKey"
            :src="portraitUrl(char.id, 'main')"
            :alt="char.character_name ?? ''"
            class="char-card-portrait-img"
          />
          <div v-else class="char-card-portrait-placeholder">
            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" class="char-placeholder-svg">
              <circle cx="50" cy="35" r="22" fill="#555" />
              <ellipse cx="50" cy="85" rx="34" ry="28" fill="#555" />
            </svg>
          </div>
        </div>
        <div class="char-card-body">
          <div class="char-card-name">{{ char.character_name ?? '?' }}</div>
          <div class="char-card-rank">{{ rankLabel(char) }}</div>
          <div class="char-card-pseudo">{{ char.pseudo }}</div>
          <div class="char-card-icons">
            <v-tooltip :text="char.culture ? t(`culturesConceptsCults.${char.culture}`) : '?'" location="top">
              <template #activator="{ props: tp }">
                <img v-if="char.culture" v-bind="tp" :src="`${baseUrl}logotypes/cultures/${char.culture}.svg`" class="char-logotype" :class="isDark ? 'char-logotype--dark' : 'char-logotype--light'" />
                <span v-else v-bind="tp" class="char-logotype-unknown">?</span>
              </template>
            </v-tooltip>
            <v-tooltip :text="char.concept ? t(`culturesConceptsCults.${char.concept}`) : '?'" location="top">
              <template #activator="{ props: tp }">
                <img v-if="char.concept" v-bind="tp" :src="`${baseUrl}logotypes/concepts/${char.concept}.svg`" class="char-logotype" :class="isDark ? 'char-logotype--dark' : 'char-logotype--light'" />
                <span v-else v-bind="tp" class="char-logotype-unknown">?</span>
              </template>
            </v-tooltip>
            <v-tooltip :text="char.cult ? t(`culturesConceptsCults.${char.cult}`) : '?'" location="top">
              <template #activator="{ props: tp }">
                <img v-if="char.cult" v-bind="tp" :src="`${baseUrl}logotypes/cults/${char.cult}.svg`" class="char-logotype" :class="isDark ? 'char-logotype--dark' : 'char-logotype--light'" />
                <span v-else v-bind="tp" class="char-logotype-unknown">?</span>
              </template>
            </v-tooltip>
          </div>
          <LegacyChips :names="legacyNames(char)" />
          <v-tooltip
            v-if="char.description"
            location="top"
            max-width="320"
            open-delay="150"
            content-class="char-desc-tooltip"
          >
            <template #activator="{ props: tp }">
              <div v-bind="tp" v-clip-fade class="char-card-description">{{ char.description }}</div>
            </template>
            <span class="char-desc-tooltip-text">{{ char.description }}</span>
          </v-tooltip>
        </div>
        <div class="char-card-actions" @click.stop>
          <div class="char-card-quick">
            <v-btn
              size="small"
              variant="tonal"
              class="char-card-quick-btn"
              @click="openQuickView(char, 'stats')"
            >
              {{ $t('community.viewStats') }}
            </v-btn>
            <v-btn
              v-if="hasStory(char)"
              size="small"
              variant="tonal"
              class="char-card-quick-btn"
              @click="openQuickView(char, 'story')"
            >
              {{ $t('community.viewStory') }}
            </v-btn>
          </div>
          <div class="char-icon-row">
            <v-tooltip :text="$t('community.import')" location="top">
              <template #activator="{ props: tp }">
                <button
                  v-bind="tp"
                  type="button"
                  class="char-icon-btn char-icon-btn--primary"
                  :aria-label="$t('community.import')"
                  @click="importChar(char)"
                ><CardIcon name="download" /></button>
              </template>
            </v-tooltip>
            <v-tooltip :text="reportedIds.has(char.id) ? $t('community.reportSent') : $t('community.report')" location="top">
              <template #activator="{ props: tp }">
                <button
                  v-bind="tp"
                  type="button"
                  class="char-icon-btn"
                  :disabled="reportedIds.has(char.id)"
                  :aria-label="$t('community.report')"
                  @click="report(char.id)"
                ><CardIcon name="report" /></button>
              </template>
            </v-tooltip>
            <v-tooltip :text="$t('community.editDesc')" location="top">
              <template #activator="{ props: tp }">
                <button
                  v-bind="tp"
                  type="button"
                  class="char-icon-btn"
                  :aria-label="$t('community.editDesc')"
                  @click="openEditDesc(char)"
                ><CardIcon name="edit" /></button>
              </template>
            </v-tooltip>
            <v-tooltip :text="$t('community.delete')" location="top">
              <template #activator="{ props: tp }">
                <button
                  v-bind="tp"
                  type="button"
                  class="char-icon-btn char-icon-btn--danger"
                  :aria-label="$t('community.delete')"
                  @click="openDelete(char)"
                ><CardIcon name="delete" /></button>
              </template>
            </v-tooltip>
          </div>
        </div>
      </div>
    </div>

    <!-- Pagination -->
    <div v-if="totalPages > 1" class="d-flex justify-center mt-6">
      <v-pagination v-model="page" :length="totalPages" @update:model-value="loadPage" />
    </div>

    <!-- Edit description dialog -->
    <v-dialog v-model="showEditDesc" max-width="480" persistent>
      <v-card>
        <v-card-title class="text-uppercase label">{{ $t('community.editDescTitle') }}</v-card-title>
        <v-card-text>
          <v-textarea
            v-model="editDescText"
            :label="$t('community.description')"
            variant="outlined"
            density="compact"
            maxlength="1000"
            counter
            rows="3"
            auto-grow
            class="mb-3"
          />
          <v-text-field
            v-model="editDescSecret"
            :label="$t('community.deleteSecret')"
            variant="outlined"
            density="compact"
            :type="showEditDescSecret ? 'text' : 'password'"
            :append-inner-icon="showEditDescSecret ? mdiEyeOff : mdiEye"
            @click:append-inner="showEditDescSecret = !showEditDescSecret"
          />
          <v-alert v-if="editDescError" type="error" density="compact" class="mt-2">{{ editDescError }}</v-alert>
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn variant="text" @click="showEditDesc = false">{{ $t('messages.close') }}</v-btn>
          <v-btn color="red-darken-2" variant="flat" :loading="editDescLoading" :disabled="!editDescSecret.trim()" @click="doEditDesc">
            {{ $t('community.editDescSave') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Import snackbar -->
    <v-snackbar v-model="importedSnack" timeout="3000" color="green-darken-2">
      {{ $t('community.importSuccess') }}
    </v-snackbar>

    <CharacterQuickView
      v-model="quickOpen"
      :mode="quickMode"
      :name="quickChar?.character_name ?? '?'"
      :subtitle="quickChar ? rankLabel(quickChar) : ''"
      :data="quickData"
    />

    <!-- My secret codes dialog -->
    <v-dialog v-model="showSecrets" max-width="520" scrollable>
      <v-card class="secret-card">
        <v-card-title class="text-h6">{{ $t('community.mySecrets') }}</v-card-title>
        <v-card-text>
          <p class="text-body-2 mb-3">{{ $t('community.mySecretsDesc') }}</p>
          <div v-if="secretEntries.length === 0" class="text-body-2 text-medium-emphasis">
            {{ $t('community.noSecrets') }}
          </div>
          <v-list v-else density="compact" class="secret-list">
            <v-list-item
              v-for="entry in secretEntries"
              :key="entry.id"
              class="secret-item"
              @click="copySecret(entry)"
            >
              <v-list-item-title class="secret-name">{{ entry.name }}</v-list-item-title>
              <v-list-item-subtitle class="secret-code">{{ entry.secret }}</v-list-item-subtitle>
              <template #append>
                <v-icon :icon="copiedId === entry.id ? mdiCheck : mdiContentCopy" size="18"></v-icon>
              </template>
            </v-list-item>
          </v-list>
          <p v-if="copiedId" class="text-caption mt-2">{{ $t('community.copied') }}</p>
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn variant="text" @click="showSecrets = false">{{ $t('messages.close') }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Delete dialog -->
    <v-dialog v-model="showDelete" max-width="440" persistent>
      <v-card>
        <v-card-title class="text-uppercase label">{{ $t('community.deleteTitle') }}</v-card-title>
        <v-card-text>
          <p class="text-body-2 mb-4">{{ $t('community.deleteDesc') }}</p>
          <v-text-field
            v-model="deleteSecret"
            :label="$t('community.deleteSecret')"
            variant="outlined"
            density="compact"
            :type="showDeleteSecret ? 'text' : 'password'"
            :append-inner-icon="showDeleteSecret ? mdiEyeOff : mdiEye"
            @click:append-inner="showDeleteSecret = !showDeleteSecret"
          />
          <v-alert v-if="deleteError" type="error" density="compact" class="mt-2">{{ deleteError }}</v-alert>
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn variant="text" @click="showDelete = false">{{ $t('messages.close') }}</v-btn>
          <v-btn
            color="red-darken-2"
            variant="flat"
            :loading="deleteLoading"
            :disabled="!deleteSecret.trim()"
            @click="doDelete"
          >
            {{ $t('community.deleteConfirm') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useTheme } from 'vuetify'
import { mdiAccount, mdiEye, mdiEyeOff, mdiKeyVariant, mdiContentCopy, mdiCheck } from '@mdi/js'
import browserStorage from '@/store/browserStorage'
import { listCharacters, reportCharacter, deleteCharacter, updateDescription, portraitUrl, fetchPortraitsForImport } from '@/services/communityApi'
import type { CommunityCharacter } from '@/services/communityApi'
import LegacyChips from './LegacyChips.vue'
import CharacterQuickView from './CharacterQuickView.vue'
import CardIcon from './CardIcon.vue'
import { CULT_RELATIONSHIP_KEYS } from '@/config/cultRelationships'
import config from '@/config'

const emit = defineEmits<{ (e: 'import', character: Record<string, unknown>): void }>()
const { t } = useI18n()
const baseUrl = import.meta.env.BASE_URL
const theme = useTheme()
const isDark = computed(() => theme.global.current.value.dark)

const characters = ref<CommunityCharacter[]>([])
const total = ref(0)
const page = ref(1)
const loading = ref(false)
const error = ref('')
const search = ref('')
const filterCult = ref('')
const filterCulture = ref('')
const filterConcept = ref('')
const reportedIds = ref(new Set<string>())
const secrets = ref(browserStorage.loadPublishedSecrets())
const showSecrets = ref(false)
const copiedId = ref('')

interface SecretEntry {
  id: string
  name: string
  secret: string
}

const secretEntries = computed<SecretEntry[]>(() =>
  Object.entries(secrets.value).map(([id, entry]) => {
    const known = characters.value.find(c => c.id === id)
    return {
      id,
      secret: entry.secret,
      name: entry.name || known?.character_name || `#${id.slice(0, 8)}`,
    }
  }).sort((x, y) => x.name.localeCompare(y.name))
)

function openSecrets() {
  secrets.value = browserStorage.loadPublishedSecrets()
  copiedId.value = ''
  showSecrets.value = true
}

async function copySecret(entry: SecretEntry) {
  try {
    await navigator.clipboard.writeText(entry.secret)
    copiedId.value = entry.id
  } catch {
    copiedId.value = ''
  }
}
const importedSnack = ref(false)

const showEditDesc = ref(false)
const editDescTarget = ref<CommunityCharacter | null>(null)
const editDescText = ref('')
const editDescSecret = ref('')
const editDescLoading = ref(false)
const editDescError = ref('')
const showEditDescSecret = ref(false)

const showDelete = ref(false)
const deleteTarget = ref<CommunityCharacter | null>(null)
const deleteSecret = ref('')
const deleteLoading = ref(false)
const deleteError = ref('')
const showDeleteSecret = ref(false)

const LIMIT = 20
const totalPages = computed(() => Math.ceil(total.value / LIMIT))

const cultOptions = computed(() =>
  CULT_RELATIONSHIP_KEYS.map(k => ({ title: t(`culturesConceptsCults.${k}`), value: k }))
)
const cultureOptions = computed(() =>
  Object.values(config.cultures).map(c => ({ title: t(`culturesConceptsCults.${c.name}`), value: c.name }))
)
const conceptOptions = computed(() =>
  Object.values(config.concepts).map(c => ({ title: t(`culturesConceptsCults.${c.name}`), value: c.name }))
)

async function load() {
  loading.value = true
  error.value = ''
  try {
    const res = await listCharacters({
      search: search.value,
      cult: filterCult.value,
      culture: filterCulture.value,
      concept: filterConcept.value,
      page: page.value,
    })
    characters.value = res.characters
    total.value = res.total
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Erreur'
  } finally {
    loading.value = false
  }
}

function onFilterChange() {
  page.value = 1
  load()
}

function loadPage() {
  load()
}

function rankLabel(char: CommunityCharacter): string {
  const cultLabel = char.cult ? t(`culturesConceptsCults.${char.cult}`) : ''
  const rankKey = charData(char).rank as string | undefined
  const rank = rankKey ? t(`ranks.${rankKey}`) : ''
  return rank ? `${cultLabel} (${rank})` : cultLabel
}

function openEditDesc(char: CommunityCharacter) {
  editDescTarget.value = char
  editDescText.value = char.description ?? ''
  editDescSecret.value = secrets.value[char.id]?.secret ?? ''
  editDescError.value = ''
  showEditDescSecret.value = false
  showEditDesc.value = true
}

async function doEditDesc() {
  if (!editDescTarget.value || !editDescSecret.value.trim()) return
  editDescLoading.value = true
  editDescError.value = ''
  try {
    await updateDescription(editDescTarget.value.id, editDescSecret.value.trim(), editDescText.value)
    editDescTarget.value.description = editDescText.value
    showEditDesc.value = false
  } catch (e) {
    editDescError.value = e instanceof Error ? e.message : 'Erreur'
  } finally {
    editDescLoading.value = false
  }
}

function openDelete(char: CommunityCharacter) {
  deleteTarget.value = char
  deleteSecret.value = secrets.value[char.id]?.secret ?? ''
  deleteError.value = ''
  showDeleteSecret.value = false
  showDelete.value = true
}

async function doDelete() {
  if (!deleteTarget.value || !deleteSecret.value.trim()) return
  deleteLoading.value = true
  deleteError.value = ''
  try {
    await deleteCharacter(deleteTarget.value.id, deleteSecret.value.trim())
    browserStorage.removePublishedSecret(deleteTarget.value.id)
    secrets.value = browserStorage.loadPublishedSecrets()
    characters.value = characters.value.filter(c => c.id !== deleteTarget.value!.id)
    showDelete.value = false
  } catch (e) {
    deleteError.value = e instanceof Error ? e.message : 'Erreur'
  } finally {
    deleteLoading.value = false
  }
}

async function report(id: string) {
  await reportCharacter(id)
  reportedIds.value = new Set([...reportedIds.value, id])
}

async function importChar(char: CommunityCharacter) {
  try {
    const data = JSON.parse(char.character_data)
    const dataWithPortraits = await fetchPortraitsForImport(char.id, data)
    emit('import', dataWithPortraits)
    importedSnack.value = true
  } catch {
    // ignore
  }
}

// Marks an element as clipped when its text overflows, so the CSS can fade the cut-off edge
const clipObservers = new WeakMap<HTMLElement, ResizeObserver>()
function updateClipped(el: HTMLElement) {
  el.classList.toggle('is-clipped', el.scrollHeight - el.clientHeight > 1)
}
const vClipFade = {
  mounted(el: HTMLElement) {
    const observer = new ResizeObserver(() => updateClipped(el))
    observer.observe(el)
    clipObservers.set(el, observer)
    updateClipped(el)
  },
  updated(el: HTMLElement) {
    updateClipped(el)
  },
  unmounted(el: HTMLElement) {
    clipObservers.get(el)?.disconnect()
    clipObservers.delete(el)
  },
}

const quickOpen = ref(false)
const quickMode = ref<'stats' | 'story'>('stats')
const quickChar = ref<CommunityCharacter | null>(null)
const quickData = computed(() => (quickChar.value ? charData(quickChar.value) : {}))

function hasStory(char: CommunityCharacter): boolean {
  const story = charData(char).story
  return typeof story === 'string' && story.trim().length > 0
}

function openQuickView(char: CommunityCharacter, mode: 'stats' | 'story') {
  quickChar.value = char
  quickMode.value = mode
  quickOpen.value = true
}

function legacyNames(char: CommunityCharacter): string[] {
  const legacies = charData(char).legacies
  if (!Array.isArray(legacies)) return []
  return legacies
    .filter((l): l is [string, number] => Array.isArray(l) && typeof l[0] === 'string' && Number(l[1]) > 0)
    .map(([name]) => name)
}

function charData(char: CommunityCharacter): Record<string, unknown> {
  try { return JSON.parse(char.character_data) } catch { return {} }
}

onMounted(load)
</script>

<style scoped>
.community-root {
  min-height: 100vh;
  color: rgb(var(--v-theme-on-surface));
  background: rgb(var(--v-theme-surface));
}

.community-tab {
  max-width: 1200px;
  margin: 0 auto;
}

.community-tab__header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
  padding-bottom: 8px;
}

.community-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
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
  color: rgba(var(--v-theme-on-surface), 0.7);
  margin-bottom: 2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
}

.char-card-pseudo {
  font-size: 0.65rem;
  color: rgba(var(--v-theme-on-surface), 0.45);
  margin-bottom: 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
}

.char-card-description {
  font-size: 0.68rem;
  color: rgba(var(--v-theme-on-surface), 0.6);
  margin-top: 10px;
  line-height: 1.4;
  cursor: help;
  white-space: pre-line;
  /* Takes all the room left by the other blocks (legacies, portrait...) instead of a fixed line count */
  flex: 1 1 0;
  min-height: calc(1.4em * 4);
  overflow: hidden;
  text-align: left;
  width: 100%;
}

.char-card-description.is-clipped {
  -webkit-mask-image: linear-gradient(to bottom, #000 calc(100% - 1.8em), transparent);
  mask-image: linear-gradient(to bottom, #000 calc(100% - 1.8em), transparent);
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

/* The app-wide dark card style is 95% opaque; this dialog shows a code and needs a solid background */
.secret-card.v-card--variant-elevated {
  background-color: rgb(var(--v-theme-surface)) !important;
}

.secret-name {
  font-weight: 700;
}

.secret-code {
  font-family: monospace;
  font-size: 0.78rem;
  opacity: 1 !important;
  word-break: break-all;
  white-space: normal !important;
}

.secret-item {
  cursor: pointer;
  border-radius: 6px;
}

.char-card-quick {
  display: flex;
  gap: 6px;
}

.char-card-quick-btn {
  flex: 1 1 0;
  min-width: 0;
  height: auto !important;
  min-height: 32px;
  padding: 4px 6px !important;
  font-size: 0.62rem !important;
  letter-spacing: 0.02em !important;
  line-height: 1.2;
}

.char-card-quick-btn :deep(.v-btn__content) {
  white-space: normal;
  text-align: center;
}

.char-card-actions {
  padding: 8px 12px 12px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.char-icon-row {
  display: flex;
  gap: 6px;
}

/* Angular buttons with cut corners, echoing the label tabs of the character sheet */
.char-icon-btn {
  flex: 1 1 0;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
  color: rgba(var(--v-theme-on-surface), 0.85);
  background: rgba(var(--v-theme-on-surface), 0.12);
  clip-path: polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px));
  transition: background 0.15s, color 0.15s;
}

.char-icon-btn:hover:not(:disabled) {
  background: rgba(var(--v-theme-on-surface), 0.24);
}

.char-icon-btn:focus-visible {
  outline: 2px solid rgb(var(--v-theme-primary));
  outline-offset: -2px;
}

.char-icon-btn:disabled {
  cursor: default;
  opacity: 0.4;
}

.char-icon-btn--primary {
  flex: 1.6 1 0;
  color: #fff;
  background: rgb(var(--v-theme-primary));
}

.char-icon-btn--primary:hover:not(:disabled) {
  background: rgba(var(--v-theme-primary), 0.8);
}

.char-icon-btn--danger:hover:not(:disabled) {
  color: #fff;
  background: rgb(var(--v-theme-primary));
}
</style>

<style>
.char-desc-tooltip.v-overlay__content {
  background: rgba(24, 24, 24, 0.97) !important;
  color: #e6e6e6 !important;
  border: 1px solid rgba(239, 83, 80, 0.55);
  border-left: 3px solid #ef5350;
  border-radius: 6px;
  padding: 12px 14px;
  box-shadow: 0 8px 28px rgba(0, 0, 0, 0.55);
  font-size: 0.8rem;
  line-height: 1.55;
  text-align: left;
}

.char-desc-tooltip-text {
  white-space: pre-line;
}
</style>
