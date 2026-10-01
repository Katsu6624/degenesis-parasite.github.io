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
      <v-card
        v-for="char in characters"
        :key="char.id"
        variant="outlined"
        class="community-card"
        @click="openCard(char)"
      >
        <div class="community-card__portrait">
          <img
            v-if="char.character_data && JSON.parse(char.character_data).portraitKey"
            :src="portraitUrl(char.id, 'main')"
            :alt="char.character_name ?? ''"
            class="community-card__img"
          />
          <div v-else class="community-card__placeholder">
            <v-icon :icon="mdiAccount" size="48" color="grey" />
          </div>
        </div>
        <v-card-text class="pa-3">
          <div class="text-subtitle-2 font-weight-bold mb-1">{{ char.character_name ?? '?' }}</div>
          <div class="text-caption text-medium-emphasis mb-1">{{ char.pseudo }}</div>
          <div class="d-flex gap-1 flex-wrap">
            <v-chip v-if="char.cult" size="x-small" color="red-darken-3">{{ char.cult }}</v-chip>
            <v-chip v-if="char.culture" size="x-small" variant="outlined">{{ char.culture }}</v-chip>
            <v-chip v-if="char.concept" size="x-small" variant="outlined">{{ char.concept }}</v-chip>
          </div>
        </v-card-text>
      </v-card>
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

const cultOptions = CULT_RELATIONSHIP_KEYS.map(k => k)
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

onMounted(load)
</script>

<style scoped>
.community-tab {
  max-width: 1200px;
  margin: 0 auto;
}

.community-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 16px;
}

.community-card {
  cursor: pointer;
  transition: transform 150ms ease, border-color 150ms ease;
}

.community-card:hover {
  transform: translateY(-2px);
  border-color: rgba(200, 20, 32, 0.6);
}

.community-card__portrait {
  aspect-ratio: 3/4;
  overflow: hidden;
  background: #111;
}

.community-card__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.community-card__placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
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
