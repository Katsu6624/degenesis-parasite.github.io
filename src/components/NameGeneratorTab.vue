<template>
  <v-container class="name-gen-container">
    <div class="intro-block">
      <div class="intro-title">NOMEN EST OMEN</div>
      <p class="intro-text">{{ $t('messages.nameGenerator.introText') }}</p>
    </div>

    <v-row class="mt-4">
      <v-col cols="12" sm="6" md="3">
        <v-select
          v-model="selectedCulture"
          :items="cultureOptions"
          :label="$t('messages.nameGenerator.culture')"
          variant="outlined"
          density="compact"
          bg-color="grey-darken-3"
          color="red-darken-2"
          item-title="label"
          item-value="value"
        />
      </v-col>
      <v-col cols="12" sm="6" md="3">
        <v-select
          v-model="selectedSex"
          :items="sexOptions"
          :label="$t('messages.nameGenerator.sex')"
          variant="outlined"
          density="compact"
          bg-color="grey-darken-3"
          color="red-darken-2"
          item-title="label"
          item-value="value"
        />
      </v-col>
      <v-col cols="12" sm="6" md="3">
        <v-select
          v-model="selectedCult"
          :items="cultOptions"
          :label="$t('messages.nameGenerator.cult')"
          variant="outlined"
          density="compact"
          bg-color="grey-darken-3"
          color="red-darken-2"
          item-title="label"
          item-value="value"
        />
      </v-col>
      <v-col v-if="selectedCult === 'clanistes'" cols="12" sm="6" md="3">
        <v-select
          v-model="selectedClanType"
          :items="clanTypeOptions"
          :label="$t('messages.nameGenerator.clanType')"
          variant="outlined"
          density="compact"
          bg-color="grey-darken-3"
          color="red-darken-2"
          item-title="label"
          item-value="value"
        />
      </v-col>
    </v-row>

    <div class="d-flex justify-center mt-6 mb-2">
      <v-btn
        @click="generate"
        size="large"
        color="red-darken-3"
        variant="flat"
        class="generate-btn"
        :disabled="selectedCult === 'clanistes' && !selectedClanType"
      >
        {{ $t('messages.nameGenerator.generateButton') }}
      </v-btn>
    </div>

    <div v-if="poolResetNotice" class="pool-reset-notice">
      {{ $t('messages.nameGenerator.poolEmpty') }}
    </div>

    <transition name="name-fade">
      <div v-if="currentName" :key="currentName" class="name-result">
        {{ currentName }}
      </div>
    </transition>
    <div v-if="!currentName" class="name-placeholder">
      {{ $t('messages.nameGenerator.noResult') }}
    </div>

    <div v-if="history.length > 1" class="history-section mt-8">
      <div class="history-title">— {{ $t('messages.nameGenerator.sessionHistory') }} —</div>
      <div class="history-list">
        <span
          v-for="(n, i) in [...history].reverse().slice(1)"
          :key="i"
          class="history-item"
        >{{ n }}</span>
      </div>
    </div>
  </v-container>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import {
  cultureNames,
  chroniqueurNames,
  ferrailleurNames,
  neolibyanNames,
  fleuNames,
  anubienNames,
  jehammadanNames,
  anabaptisteNames,
  blafardsNames,
  clanisteSavageNames,
  type CultureKey,
} from '@/config/nameData'

const { t } = useI18n()

type CultKey = 'spitalians'|'chroniclers'|'hellvetics'|'judges'|'clanistes'|'scrappers'|'neolibyans'|'scourgers'|'anubians'|'jehammedans'|'apocalyptics'|'anabaptists'|'palers'
type Sex = 'male'|'female'
type ClanType = 'savage'|'sedentary'|'nomadic'|'hightech'

const selectedCulture = ref<CultureKey>('borca')
const selectedSex = ref<Sex>('male')
const selectedCult = ref<CultKey>('spitalians')
const selectedClanType = ref<ClanType | null>(null)

const currentName = ref('')
const history = ref<string[]>([])
const poolResetNotice = ref(false)

// queues: pool key → shuffled indices array (we pop from the end)
const queues = new Map<string, number[]>()

const cultureOptions = computed(() => [
  { value: 'borca',       label: t('messages.nameGenerator.cultures.borca') },
  { value: 'franka',      label: t('messages.nameGenerator.cultures.franka') },
  { value: 'hybrispania', label: t('messages.nameGenerator.cultures.hybrispania') },
  { value: 'afrika',      label: t('messages.nameGenerator.cultures.afrika') },
  { value: 'pollen',      label: t('messages.nameGenerator.cultures.pollen') },
  { value: 'balkhans',    label: t('messages.nameGenerator.cultures.balkhans') },
  { value: 'purgare',     label: t('messages.nameGenerator.cultures.purgare') },
])

const sexOptions = computed(() => [
  { value: 'male',   label: t('messages.nameGenerator.male') },
  { value: 'female', label: t('messages.nameGenerator.female') },
])

const cultOptions = computed(() => [
  { value: 'spitalians',   label: t('messages.nameGenerator.cults.spitalians') },
  { value: 'chroniclers',  label: t('messages.nameGenerator.cults.chroniclers') },
  { value: 'hellvetics',   label: t('messages.nameGenerator.cults.hellvetics') },
  { value: 'judges',       label: t('messages.nameGenerator.cults.judges') },
  { value: 'clanistes',    label: t('messages.nameGenerator.cults.clanistes') },
  { value: 'scrappers',    label: t('messages.nameGenerator.cults.scrappers') },
  { value: 'neolibyans',   label: t('messages.nameGenerator.cults.neolibyans') },
  { value: 'scourgers',    label: t('messages.nameGenerator.cults.scourgers') },
  { value: 'anubians',     label: t('messages.nameGenerator.cults.anubians') },
  { value: 'jehammedans',  label: t('messages.nameGenerator.cults.jehammedans') },
  { value: 'apocalyptics', label: t('messages.nameGenerator.cults.apocalyptics') },
  { value: 'anabaptists',  label: t('messages.nameGenerator.cults.anabaptists') },
  { value: 'palers',       label: t('messages.nameGenerator.cults.palers') },
])

const clanTypeOptions = computed(() => [
  { value: 'savage',    label: t('messages.nameGenerator.clanTypes.savage') },
  { value: 'sedentary', label: t('messages.nameGenerator.clanTypes.sedentary') },
  { value: 'nomadic',   label: t('messages.nameGenerator.clanTypes.nomadic') },
  { value: 'hightech',  label: t('messages.nameGenerator.clanTypes.hightech') },
])

// Reset name + history when selectors change
watch([selectedCulture, selectedSex, selectedCult, selectedClanType], () => {
  currentName.value = ''
  history.value = []
  poolResetNotice.value = false
})

function shuffle(arr: number[]): number[] {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

function pickFrom(pool: string[], key: string): string {
  if (pool.length === 0) return '—'
  if (!queues.has(key) || queues.get(key)!.length === 0) {
    const indices = shuffle(Array.from({ length: pool.length }, (_, i) => i))
    queues.set(key, indices)
    return pool[indices.pop()!]
  }
  return pool[queues.get(key)!.pop()!]
}

function getFirstNamePool(): { pool: string[]; key: string } {
  const c = selectedCulture.value
  const s = selectedSex.value
  const cult = selectedCult.value
  const clanType = selectedClanType.value

  switch (cult) {
    case 'chroniclers': return { pool: chroniqueurNames, key: 'chroniclers' }
    case 'scrappers':   return { pool: ferrailleurNames, key: 'scrappers' }
    case 'neolibyans':  return { pool: neolibyanNames[s], key: `neolibyans-${s}` }
    case 'scourgers':   return { pool: fleuNames[s], key: `scourgers-${s}` }
    case 'anubians':    return { pool: anubienNames[s], key: `anubians-${s}` }
    case 'jehammedans': return { pool: jehammadanNames[s], key: `jehammedans-${s}` }
    case 'anabaptists': return { pool: anabaptisteNames[s], key: `anabaptists-${s}` }
    case 'palers':      return { pool: blafardsNames[s], key: `palers-${s}` }
    case 'clanistes':
      if (clanType === 'savage') return { pool: clanisteSavageNames[s], key: `clanistes-savage-${s}` }
      return { pool: cultureNames[c][s], key: `culture-${c}-${s}` }
    default:
      return { pool: cultureNames[c][s], key: `culture-${c}-${s}` }
  }
}

function getSurnamePool(): { pool: string[]; key: string } | null {
  const c = selectedCulture.value
  const cult = selectedCult.value
  const clanType = selectedClanType.value
  const needsSurname = ['spitalians','hellvetics','judges','clanistes'].includes(cult)
  const clanNeedsSurname = cult === 'clanistes' && clanType !== 'savage'

  if (cult === 'clanistes') {
    if (!clanNeedsSurname) return null
  } else if (!needsSurname) {
    return null
  }

  const surnames = cultureNames[c].surnames
  if (!surnames || surnames.length === 0) return null
  return { pool: surnames, key: `surnames-${c}` }
}

function generate() {
  poolResetNotice.value = false

  const { pool: fnPool, key: fnKey } = getFirstNamePool()
  const surnameInfo = getSurnamePool()

  // detect if we just refilled the queue (pool was exhausted)
  const fnWasFull = !queues.has(fnKey) || queues.get(fnKey)!.length === 0
  const firstName = pickFrom(fnPool, fnKey)
  if (fnWasFull && queues.get(fnKey)!.length === fnPool.length - 1) {
    poolResetNotice.value = true
  }

  let fullName = firstName
  if (surnameInfo) {
    const surname = pickFrom(surnameInfo.pool, surnameInfo.key)
    fullName = `${firstName} ${surname}`
  }

  currentName.value = fullName
  history.value.push(fullName)
}
</script>

<style scoped>
.name-gen-container {
  max-width: 860px;
  color: #ccc;
  font-family: monospace;
  padding-top: 32px;
}

.intro-block {
  border-left: 3px solid #cc0000;
  padding-left: 20px;
  margin-bottom: 28px;
}

.intro-title {
  font-size: 1.5rem;
  font-weight: 900;
  letter-spacing: 0.35em;
  text-transform: uppercase;
  color: #cc0000;
  margin-bottom: 10px;
}

.intro-text {
  font-family: sans-serif;
  font-size: 0.9rem;
  color: #aaa;
  line-height: 1.7;
  max-width: 640px;
  margin: 0;
}

.generate-btn {
  font-family: monospace;
  font-size: 1rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  min-width: 220px;
}

.name-result {
  text-align: center;
  font-family: monospace;
  font-size: 2.4rem;
  font-weight: 700;
  color: #fff;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 24px 0;
  text-shadow: 0 0 20px rgba(204, 0, 0, 0.5);
}

.name-placeholder {
  text-align: center;
  color: #555;
  font-size: 1rem;
  font-style: italic;
  padding: 24px 0;
}

.pool-reset-notice {
  text-align: center;
  color: #cc0000;
  font-size: 0.8rem;
  letter-spacing: 0.05em;
  padding-bottom: 4px;
}

.history-section {
  border-top: 1px solid #333;
  padding-top: 16px;
}

.history-title {
  text-align: center;
  color: #555;
  font-size: 0.75rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  margin-bottom: 12px;
}

.history-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 16px;
  justify-content: center;
}

.history-item {
  font-size: 0.85rem;
  color: #666;
  font-family: monospace;
}

/* transition */
.name-fade-enter-active {
  transition: all 0.3s ease;
}
.name-fade-enter-from {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
