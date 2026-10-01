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
        @click="openCard(char)"
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
      </div>
    </div>

    <!-- Pagination -->
    <div v-if="totalPages > 1" class="d-flex justify-center mt-6">
      <v-pagination v-model="page" :length="totalPages" @update:model-value="loadPage" />
    </div>

    <!-- Detail dialog -->
    <v-dialog v-model="showDetail" max-width="600">
      <v-card v-if="selected">
        <div v-if="selected.character_data && JSON.parse(selected.character_data).portraitKey" class="community-detail__portrait">
          <img :src="portraitUrl(selected.id, 'main')" :alt="selected.character_name ?? ''" class="community-detail__img" />
        </div>
        <v-card-title class="d-flex justify-space-between align-center">
          <span>{{ selected.character_name ?? '?' }}</span>
          <span class="text-caption text-medium-emphasis">{{ selected.pseudo }}</span>
        </v-card-title>
        <v-card-text>
          <div class="d-flex gap-2 flex-wrap mb-3">
            <v-chip v-if="selected.cult" size="small" color="red-darken-3">{{ selected.cult }}</v-chip>
            <v-chip v-if="selected.culture" size="small" variant="outlined">{{ selected.culture }}</v-chip>
            <v-chip v-if="selected.concept" size="small" variant="outlined">{{ selected.concept }}</v-chip>
          </div>
          <p class="text-caption text-medium-emphasis">{{ $t('community.publishedOn') }} {{ formatDate(selected.created_at) }}</p>
          <v-alert v-if="reportSent" type="success" density="compact" class="mt-2">{{ $t('community.reportSent') }}</v-alert>
        </v-card-text>
        <v-card-actions class="justify-space-between">
          <v-btn
            variant="text"
            color="red"
            size="small"
            :disabled="reportSent"
            @click="report(selected.id)"
          >
            {{ $t('community.report') }}
          </v-btn>
          <div class="d-flex gap-2">
            <v-btn variant="text" @click="showDetail = false">{{ $t('messages.close') }}</v-btn>
            <v-btn color="red-darken-2" variant="flat" @click="importChar(selected)">
              {{ $t('community.import') }}
            </v-btn>
          </div>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { mdiAccount } from '@mdi/js'
import { listCharacters, reportCharacter, portraitUrl } from '@/services/communityApi'
import type { CommunityCharacter } from '@/services/communityApi'
import { useCharacterStore } from '@/store'
import { CULT_RELATIONSHIP_KEYS } from '@/config/cultRelationships'
import config from '@/config'

const store = useCharacterStore()
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
const showDetail = ref(false)
const selected = ref<CommunityCharacter | null>(null)
const reportSent = ref(false)

const LIMIT = 20
const totalPages = computed(() => Math.ceil(total.value / LIMIT))

const cultOptions: string[] = [...CULT_RELATIONSHIP_KEYS]
const cultureOptions = Object.values(config.cultures).map(c => c.name)
const conceptOptions = Object.values(config.concepts).map(c => c.name)

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

function openCard(char: CommunityCharacter) {
  selected.value = char
  reportSent.value = false
  showDetail.value = true
}

async function report(id: string) {
  await reportCharacter(id)
  reportSent.value = true
}

function importChar(char: CommunityCharacter) {
  try {
    const data = JSON.parse(char.character_data)
    store.loadCharacter(data)
    showDetail.value = false
  } catch {
    // ignore
  }
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString()
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

.community-detail__portrait {
  max-height: 300px;
  overflow: hidden;
}

.community-detail__img {
  width: 100%;
  object-fit: cover;
  max-height: 300px;
}
</style>
