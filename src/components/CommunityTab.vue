<template>
  <div class="community-tab pa-4">
    <div class="community-tab__header mb-4">
      <h1 class="text-h5">{{ $t('community.title') }}</h1>
      <p class="text-body-2 text-medium-emphasis">{{ $t('community.subtitle') }}</p>
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
          <div class="char-card-rank">{{ char.pseudo }}</div>
          <div class="char-card-icons">
            <img v-if="char.culture" :src="`${baseUrl}logotypes/cultures/${char.culture}.svg`" class="char-logotype char-logotype--dark" />
            <span v-else class="char-logotype-unknown">?</span>
            <img v-if="char.concept" :src="`${baseUrl}logotypes/concepts/${char.concept}.svg`" class="char-logotype char-logotype--dark" />
            <span v-else class="char-logotype-unknown">?</span>
            <img v-if="char.cult" :src="`${baseUrl}logotypes/cults/${char.cult}.svg`" class="char-logotype char-logotype--dark" />
            <span v-else class="char-logotype-unknown">?</span>
          </div>
        </div>
        <div class="char-card-actions" @click.stop>
          <v-btn
            block
            variant="flat"
            color="red-darken-3"
            class="char-card-action-btn"
            @click="importChar(char)"
          >
            {{ $t('community.import') }}
          </v-btn>
          <v-btn
            block
            variant="outlined"
            color="red-darken-3"
            class="char-card-action-btn"
            :disabled="reportedIds.has(char.id)"
            @click="report(char.id)"
          >
            {{ reportedIds.has(char.id) ? $t('community.reportSent') : $t('community.report') }}
          </v-btn>
          <v-btn
            block
            variant="text"
            color="grey"
            class="char-card-action-btn"
            @click="openDelete(char)"
          >
            {{ $t('community.delete') }}
          </v-btn>
        </div>
      </div>
    </div>

    <!-- Pagination -->
    <div v-if="totalPages > 1" class="d-flex justify-center mt-6">
      <v-pagination v-model="page" :length="totalPages" @update:model-value="loadPage" />
    </div>

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
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { mdiAccount, mdiEye, mdiEyeOff } from '@mdi/js'
import { listCharacters, reportCharacter, deleteCharacter, portraitUrl } from '@/services/communityApi'
import type { CommunityCharacter } from '@/services/communityApi'
import { useCharacterStore } from '@/store'
import { CULT_RELATIONSHIP_KEYS } from '@/config/cultRelationships'
import config from '@/config'

const store = useCharacterStore()
const { t } = useI18n()
const baseUrl = import.meta.env.BASE_URL

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

function openDelete(char: CommunityCharacter) {
  deleteTarget.value = char
  deleteSecret.value = ''
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

function importChar(char: CommunityCharacter) {
  try {
    const data = JSON.parse(char.character_data)
    store.loadCharacter(data)
  } catch {
    // ignore
  }
}

function charData(char: CommunityCharacter): Record<string, unknown> {
  try { return JSON.parse(char.character_data) } catch { return {} }
}

onMounted(load)
</script>

<style scoped>
.community-tab {
  max-width: 1200px;
  margin: 0 auto;
}

.community-tab__header {
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
