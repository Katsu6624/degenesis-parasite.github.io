<template>
  <section class="cult-relationships">
    <header class="cult-relationships__header">
      <div>
        <h1 class="text-h5 mb-1">{{ $t('cultRelationships.title') }}</h1>
        <p class="text-body-2 cult-relationships__instructions mb-0">
          {{ $t('cultRelationships.help') }}
        </p>
      </div>
      <v-btn
        :prepend-icon="mdiRestore"
        color="red-darken-2"
        variant="outlined"
        :disabled="!hasRelationships"
        @click="showResetConfirmation = true"
      >
        {{ $t('cultRelationships.reset') }}
      </v-btn>
    </header>

    <v-expansion-panels class="cult-relationships__rules mb-6" variant="accordion">
      <v-expansion-panel>
        <v-expansion-panel-title class="label text-uppercase text-caption">
          {{ $t('cultRelationships.rulesTitle') }}
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <div class="rules-text">{{ $t('cultRelationships.rules') }}</div>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>

    <div class="cult-relationships__grid">
      <article
        v-for="card in cultCards"
        :key="card.key"
        class="cult-card"
        :class="{ 'cult-card--centered': card.centered }"
        :tabindex="0"
        :aria-label="card.name"
        @click="store.increaseCultRelationship(card.key)"
        @contextmenu.prevent="store.decreaseCultRelationship(card.key)"
        @keydown.enter.prevent="store.increaseCultRelationship(card.key)"
        @keydown.space.prevent="store.increaseCultRelationship(card.key)"
        @keydown.up.prevent="store.increaseCultRelationship(card.key)"
        @keydown.down.prevent="store.decreaseCultRelationship(card.key)"
      >
        <img :src="card.image" :alt="card.name" class="cult-card__image" draggable="false" />
        <RelationshipDie :value="store.cultRelationships[card.key]" />
      </article>
    </div>

    <v-dialog v-model="showResetConfirmation" max-width="480">
      <v-card>
        <v-card-title>{{ $t('cultRelationships.reset') }}</v-card-title>
        <v-card-text>{{ $t('cultRelationships.resetConfirm') }}</v-card-text>
        <v-card-actions class="justify-end">
          <v-btn variant="text" @click="showResetConfirmation = false">
            {{ $t('messages.cancel') }}
          </v-btn>
          <v-btn color="red-darken-2" variant="flat" @click="confirmReset">
            {{ $t('cultRelationships.reset') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { mdiRestore } from '@mdi/js'
import { useCharacterStore } from '@/store'
import type { CultRelationshipKey } from '@/config/cultRelationships'
import RelationshipDie from './RelationshipDie.vue'

const store = useCharacterStore()
const showResetConfirmation = ref(false)
const baseUrl = import.meta.env.BASE_URL

const cultCards: Array<{ key: CultRelationshipKey; name: string; image: string; centered?: boolean }> = [
  { key: 'spitalians',   name: 'Spitalians',   image: `${baseUrl}cult-cards/01-CULT-CARDS-SPITALIAN.png` },
  { key: 'chroniclers',  name: 'Chroniclers',  image: `${baseUrl}cult-cards/02-CULT-CARDS-CHRONICLER.png` },
  { key: 'hellvetics',   name: 'Hellvetics',   image: `${baseUrl}cult-cards/03-CULT-CARDS-HELLVETIC.png` },
  { key: 'judges',       name: 'Judges',       image: `${baseUrl}cult-cards/04-CULT-CARDS-JUDGE.png` },
  { key: 'clanners',     name: 'Clanners',     image: `${baseUrl}cult-cards/05-CULT-CARDS-CLANNER.png` },
  { key: 'scrappers',    name: 'Scrappers',    image: `${baseUrl}cult-cards/06-CULT-CARDS-SCRAPPER.png` },
  { key: 'neolibyans',   name: 'Neolibyans',   image: `${baseUrl}cult-cards/07-CULT-CARDS-NEOLIBYAN.png` },
  { key: 'scourgers',    name: 'Scourgers',    image: `${baseUrl}cult-cards/08-CULT-CARDS-SCOURGER.png` },
  { key: 'anubians',     name: 'Anubians',     image: `${baseUrl}cult-cards/09-CULT-CARDS-ANUBIAN.png` },
  { key: 'jehammedans',  name: 'Jehammedans',  image: `${baseUrl}cult-cards/10-CULT-CARDS-JEHAMMEDAN.png` },
  { key: 'apocalyptics', name: 'Apocalyptics', image: `${baseUrl}cult-cards/11-CULT-CARDS-APOCALYPTICS.png` },
  { key: 'anabaptists',  name: 'Anabaptists',  image: `${baseUrl}cult-cards/12-CULT-CARDS-ANABAPTIST.png` },
  { key: 'palers',       name: 'Palers',       image: `${baseUrl}cult-cards/13-CULT-CARDS-PALER.png`, centered: true },
]

const hasRelationships = computed(() =>
  Object.values(store.cultRelationships).some((v) => v !== 0),
)

function confirmReset() {
  store.resetCultRelationships()
  showResetConfirmation.value = false
}
</script>

<style scoped>
.cult-relationships {
  min-height: calc(100vh - 112px);
  padding: clamp(16px, 3vw, 32px);
  color: #f5f5f5;
  background: radial-gradient(circle at 50% 0%, rgba(120, 0, 0, 0.16), transparent 32rem), #080808;
}

.cult-relationships__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  width: min(1500px, 100%);
  margin: 0 auto 16px;
}

.cult-relationships__instructions {
  color: rgba(255, 255, 255, 0.68);
}

.cult-relationships__rules {
  width: min(1500px, 100%);
  margin: 0 auto;
}

.rules-text {
  font-size: 0.85rem;
  line-height: 1.6;
  white-space: pre-line;
  color: rgb(var(--v-theme-on-surface));
}

.cult-relationships__grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: clamp(12px, 2vw, 22px);
  align-items: start;
  width: min(1500px, 100%);
  margin: 0 auto;
}

.cult-card {
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: 12px;
  background: #000;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.48);
  cursor: pointer;
  user-select: none;
  transition:
    transform 150ms ease,
    border-color 150ms ease,
    box-shadow 150ms ease;
}

.cult-card:hover,
.cult-card:focus-visible {
  border-color: rgba(200, 20, 32, 0.78);
  outline: none;
  transform: translateY(-3px);
  box-shadow:
    0 13px 30px rgba(0, 0, 0, 0.62),
    0 0 0 2px rgba(160, 0, 12, 0.2);
}

.cult-card--centered {
  grid-column: 1 / -1;
  width: calc(50% - clamp(6px, 1vw, 11px));
  justify-self: center;
}

.cult-card__image {
  display: block;
  width: 100%;
  height: auto;
  pointer-events: none;
}

@media (max-width: 850px) {
  .cult-relationships__header {
    align-items: flex-start;
    flex-direction: column;
  }

  .cult-relationships__grid {
    grid-template-columns: 1fr;
  }

  .cult-card--centered {
    grid-column: auto;
    width: 100%;
  }
}
</style>
