<template>
  <div class="story-root">
    <div class="story-inner pa-4">
      <h2 class="story-heading">{{ $t('story.legaciesTitle') }}</h2>
      <div v-if="activeLegacies.length === 0" class="story-empty">
        {{ $t('story.noLegacies') }} {{ $t('story.legaciesHint') }}
      </div>
      <v-expansion-panels v-else variant="accordion" class="mb-6">
        <v-expansion-panel v-for="legacy in activeLegacies" :key="legacy.name">
          <v-expansion-panel-title>
            <v-icon :icon="mdiScriptTextOutline" size="18" class="mr-2"></v-icon>
            <span class="story-legacy-name">{{ $t(`legacies.${legacy.name}`) }}</span>
          </v-expansion-panel-title>
          <v-expansion-panel-text>
            <div class="story-legacy-desc" v-html="legacyDescription(legacy.name)"></div>
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>

      <h2 class="story-heading">{{ $t('story.textTitle') }}</h2>
      <v-textarea
        v-model="store.story"
        :placeholder="$t('story.placeholder')"
        :readonly="readonly"
        variant="outlined"
        auto-grow
        rows="18"
        maxlength="30000"
        counter
        hide-details="auto"
        class="story-textarea"
      />
      <div class="story-note">{{ $t('story.pdfNote') }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { mdiScriptTextOutline } from '@mdi/js'
import { useCharacterStore } from '@/store'

defineProps<{ readonly?: boolean }>()

const store = useCharacterStore()
const { t, te } = useI18n()

const activeLegacies = computed(() =>
  Array.from(store.legacies.entries())
    .filter(([, value]) => value > 0)
    .map(([legacy]) => legacy)
    .sort((a, b) => t(`legacies.${a.name}`).localeCompare(t(`legacies.${b.name}`)))
)

function legacyDescription(name: string): string {
  const key = `legacies.${name}Description`
  return te(key) ? t(key) : ''
}
</script>

<style scoped>
.story-root {
  min-height: calc(100vh - 48px);
  color: rgb(var(--v-theme-on-surface));
  background: rgb(var(--v-theme-background));
}

.story-inner {
  max-width: 960px;
  margin: 0 auto;
}

.story-heading {
  font-size: 0.85rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  margin: 8px 0 12px;
}

.story-empty,
.story-note {
  font-size: 0.8rem;
  color: rgba(var(--v-theme-on-surface), 0.6);
  margin-bottom: 24px;
}

.story-note {
  margin: 8px 0 0;
}

.story-legacy-name {
  font-weight: 700;
  letter-spacing: 0.04em;
}

.story-legacy-desc {
  font-size: 0.85rem;
  line-height: 1.6;
}

.story-textarea :deep(textarea) {
  line-height: 1.6;
}
</style>
