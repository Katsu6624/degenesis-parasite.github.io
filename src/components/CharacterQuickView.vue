<template>
  <v-dialog v-model="model" :max-width="mode === 'stats' ? 860 : 680" scrollable>
    <v-card class="qv-card">
      <v-card-title class="qv-title">
        <span class="qv-name">{{ name }}</span>
        <span v-if="subtitle" class="qv-subtitle">{{ subtitle }}</span>
      </v-card-title>
      <v-divider></v-divider>

      <v-card-text v-if="mode === 'stats'" class="qv-body">
        <h3 class="qv-section">{{ $t('community.sectionAttributes') }}</h3>
        <div class="qv-attr-grid">
          <div v-for="group in attributeGroups" :key="group.name" class="qv-attr">
            <div class="qv-attr-head">
              <span>{{ $t(`attributes.${group.name}`) }}</span>
              <strong>{{ group.value }}</strong>
            </div>
            <div v-for="skill in group.skills" :key="skill.name" class="qv-row">
              <span>{{ $t(`skills.${skill.name}`) }}</span>
              <span class="qv-value">{{ skill.value }}</span>
            </div>
            <div v-if="group.skills.length === 0" class="qv-none">{{ $t('community.noneValue') }}</div>
          </div>
        </div>

        <div class="qv-lists">
          <div class="qv-list">
            <h3 class="qv-section">{{ $t('community.sectionOrigins') }}</h3>
            <div v-for="o in origins" :key="o.name" class="qv-row">
              <span>{{ $t(`origins.${o.name}`) }}</span>
              <span class="qv-value">{{ o.value }}</span>
            </div>
            <div v-if="origins.length === 0" class="qv-none">{{ $t('community.noneValue') }}</div>
          </div>
          <div class="qv-list">
            <h3 class="qv-section">{{ $t('community.sectionPotentials') }}</h3>
            <div v-for="p in potentials" :key="p.name" class="qv-row">
              <span>{{ potentialLabel(p.name) }}</span>
              <span class="qv-value">{{ p.value }}</span>
            </div>
            <div v-if="potentials.length === 0" class="qv-none">{{ $t('community.noneValue') }}</div>
          </div>
          <div class="qv-list">
            <h3 class="qv-section">{{ $t('community.sectionLegacies') }}</h3>
            <div v-for="l in legacies" :key="l.name" class="qv-row">
              <span>{{ $t(`legacies.${l.name}`) }}</span>
            </div>
            <div v-if="legacies.length === 0" class="qv-none">{{ $t('community.noneValue') }}</div>
          </div>
        </div>
        <p class="qv-hint">{{ $t('community.statsHint') }}</p>
      </v-card-text>

      <v-card-text v-else class="qv-body">
        <div class="qv-story">{{ story }}</div>
      </v-card-text>

      <v-divider></v-divider>
      <v-card-actions class="justify-end">
        <v-btn variant="text" @click="model = false">{{ $t('messages.close') }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { SkillsByAttribute } from '@/config/properties'

const props = defineProps<{
  modelValue: boolean
  mode: 'stats' | 'story'
  name: string
  subtitle?: string
  data: Record<string, unknown>
}>()
const emit = defineEmits<{ (e: 'update:modelValue', v: boolean): void }>()
const model = computed({
  get: () => props.modelValue,
  set: (v) => emit('update:modelValue', v),
})

const { t, te } = useI18n()

function pairs(key: string): Array<{ name: string; value: number }> {
  const raw = props.data[key]
  if (!Array.isArray(raw)) return []
  return raw
    .filter((e): e is [string, number] => Array.isArray(e) && typeof e[0] === 'string' && Number.isFinite(Number(e[1])))
    .map(([name, value]) => ({ name, value: Number(value) }))
}

const attributeValues = computed(() => new Map(pairs('attributes').map((a) => [a.name, a.value])))
const skillValues = computed(() => new Map(pairs('skills').map((s) => [s.name, s.value])))

const attributeGroups = computed(() =>
  Array.from(SkillsByAttribute.entries()).map(([attribute, skills]) => ({
    name: attribute.name,
    value: attributeValues.value.get(attribute.name) ?? 1,
    skills: skills
      .map((skill) => ({ name: skill.name, value: skillValues.value.get(skill.name) ?? 0 }))
      .filter((skill) => skill.value > 0),
  }))
)

const origins = computed(() => pairs('origins').filter((o) => o.value > 0))
const potentials = computed(() => pairs('potentials').filter((p) => p.value > 0))
const legacies = computed(() => pairs('legacies').filter((l) => l.value > 0))

const potentialChoices = computed(() => {
  const raw = props.data.potentialChoices
  return raw && typeof raw === 'object' ? (raw as Record<string, string>) : {}
})

function potentialLabel(name: string): string {
  const base = te(`potentials.${name}`) ? t(`potentials.${name}`) : name
  const choice = potentialChoices.value[name]
  return choice && te(`skills.${choice}`) ? `${base} (${t(`skills.${choice}`)})` : base
}

const story = computed(() => (typeof props.data.story === 'string' ? props.data.story : ''))
</script>

<style scoped>
.qv-card {
  color: rgb(var(--v-theme-on-surface));
}

.qv-title {
  display: flex;
  align-items: baseline;
  gap: 12px;
  flex-wrap: wrap;
  padding: 16px 24px;
}

.qv-name {
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.qv-subtitle {
  font-size: 0.8rem;
  opacity: 0.6;
}

.qv-body {
  padding: 20px 24px !important;
}

.qv-section {
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  margin: 0 0 8px;
  padding-bottom: 4px;
  border-bottom: 1px solid rgba(var(--v-theme-on-surface), 0.2);
}

.qv-attr-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 16px;
  margin-bottom: 24px;
}

.qv-attr-head {
  display: flex;
  justify-content: space-between;
  padding: 4px 8px;
  margin-bottom: 4px;
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  background: rgba(var(--v-theme-on-surface), 0.1);
  border-left: 3px solid rgb(var(--v-theme-primary));
}

.qv-lists {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
}

.qv-row {
  display: flex;
  justify-content: space-between;
  gap: 8px;
  padding: 2px 8px;
  font-size: 0.85rem;
}

.qv-value {
  font-weight: 700;
}

.qv-none {
  padding: 2px 8px;
  font-size: 0.8rem;
  opacity: 0.45;
}

.qv-hint {
  margin: 20px 0 0;
  font-size: 0.72rem;
  opacity: 0.55;
}

.qv-story {
  white-space: pre-wrap;
  line-height: 1.7;
  font-size: 0.92rem;
}
</style>
