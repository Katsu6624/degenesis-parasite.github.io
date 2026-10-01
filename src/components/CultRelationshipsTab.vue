<template>
  <div class="cult-relationships-tab pa-4">
    <div class="d-flex justify-space-between align-center mb-4">
      <span class="text-h6 label text-uppercase">{{ $t('cultRelationships.title') }}</span>
      <v-btn size="small" variant="outlined" color="red-darken-2" @click="showResetDialog = true">
        {{ $t('cultRelationships.reset') }}
      </v-btn>
    </div>

    <div class="cult-grid">
      <div
        v-for="cult in CULT_RELATIONSHIP_KEYS"
        :key="cult"
        class="cult-card"
        @click="store.increaseCultRelationship(cult)"
        @contextmenu.prevent="store.decreaseCultRelationship(cult)"
        :title="$t(`cultRelationships.cults.${cult}`)"
      >
        <div class="cult-image-wrapper">
          <img
            v-if="imageExists(cult)"
            :src="cultImageSrc(cult)"
            :alt="$t(`cultRelationships.cults.${cult}`)"
            class="cult-image"
          />
          <div v-else class="cult-placeholder">
            <span class="cult-name-abbr">{{ cultAbbr(cult) }}</span>
          </div>
          <div class="die-overlay">
            <RelationshipDie :value="store.cultRelationships[cult]" />
          </div>
        </div>
        <div class="cult-label text-caption text-center mt-1">
          {{ $t(`cultRelationships.cults.${cult}`) }}
        </div>
      </div>
    </div>

    <v-dialog v-model="showResetDialog" max-width="320">
      <v-card>
        <v-card-text>{{ $t('cultRelationships.resetConfirm') }}</v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn @click="showResetDialog = false">{{ $t('messages.cancel') }}</v-btn>
          <v-btn color="red-darken-2" @click="confirmReset">{{ $t('cultRelationships.reset') }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useCharacterStore } from '@/store'
import { CULT_RELATIONSHIP_KEYS, type CultRelationshipKey } from '@/config/cultRelationships'
import RelationshipDie from './RelationshipDie.vue'

const store = useCharacterStore()
const showResetDialog = ref(false)

// Map cult keys to image filenames (adjust if actual files differ)
const cultImageFilenames: Record<CultRelationshipKey, string> = {
  spitalians: '01-CULT-CARDS-SPITALIAN.png',
  chroniclers: '02-CULT-CARDS-CHRONICLER.png',
  hellvetics: '03-CULT-CARDS-HELLVETIC.png',
  judges: '04-CULT-CARDS-JUDGE.png',
  clanners: '05-CULT-CARDS-CLANNER.png',
  scrappers: '06-CULT-CARDS-SCRAPPER.png',
  neolibyans: '07-CULT-CARDS-NEOLIBYAN.png',
  scourgers: '08-CULT-CARDS-SCOURGER.png',
  anubians: '09-CULT-CARDS-ANUBIAN.png',
  jehammedans: '10-CULT-CARDS-JEHAMMEDAN.png',
  apocalyptics: '11-CULT-CARDS-APOCALYPTICS.png',
  anabaptists: '12-CULT-CARDS-ANABAPTIST.png',
  palers: '13-CULT-CARDS-PALER.png',
}

function cultImageSrc(cult: CultRelationshipKey): string {
  return `/cult-cards/${cultImageFilenames[cult]}`
}

function imageExists(_cult: CultRelationshipKey): boolean {
  return true
}

function cultAbbr(cult: CultRelationshipKey): string {
  return cult.slice(0, 3).toUpperCase()
}

function confirmReset() {
  store.resetCultRelationships()
  showResetDialog.value = false
}
</script>

<style scoped>
.cult-relationships-tab {
  max-width: 900px;
  margin: 0 auto;
}

.cult-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 12px;
}

.cult-card {
  cursor: pointer;
  user-select: none;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.cult-image-wrapper {
  position: relative;
  width: 100%;
  aspect-ratio: 2/3;
  border-radius: 6px;
  overflow: hidden;
  border: 2px solid rgba(128, 128, 128, 0.3);
  transition: border-color 0.15s ease;
}

.cult-card:hover .cult-image-wrapper {
  border-color: rgba(204, 0, 0, 0.6);
}

.cult-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.cult-placeholder {
  width: 100%;
  height: 100%;
  background: rgba(80, 80, 80, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
}

.cult-name-abbr {
  font-size: 1.1rem;
  font-weight: 900;
  letter-spacing: 0.05em;
  color: rgba(200, 200, 200, 0.8);
  font-family: monospace;
}

.die-overlay {
  position: absolute;
  bottom: 6px;
  right: 6px;
}

.cult-label {
  font-size: 0.65rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: rgba(180, 180, 180, 0.8);
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
