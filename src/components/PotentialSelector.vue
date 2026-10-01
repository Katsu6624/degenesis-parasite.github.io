<template>
  <div class="mb-2" style="display:flex;align-items:center;gap:16px">
    <span>{{ $t('messages.potentials').toUpperCase() }}</span>
    <span style="font-size:12px;color:#999">{{ store.spentPoints.potentials }}/{{ config.availablePoints.potentials + store.legacyXPPotentialBonus }}</span>
    <input
      v-model="search"
      placeholder="Rechercher…"
      style="margin-left:8px;background:transparent;border:1px solid #444;border-radius:4px;padding:2px 8px;font-size:12px;color:#ccc;outline:none;width:200px"
    />
  </div>
  <v-divider class="mb-4"></v-divider>

  <div class="mb-2" style="font-size:12px;color:#aaa;letter-spacing:0.08em">{{ $t('messages.commonPotentials').toUpperCase() }}</div>
  <v-container>
    <v-row>
      <v-col
        cols="12"
        xs="12"
        sm="6"
        md="3"
        xl="3"
        class="py-0"
        v-for="{ potential, label, altLabel, value } in commonPotentialsList()"
        v-bind:key="potential.name"
      >
        <ValueSelector
          :name="potential.name"
          :label="label"
          :altLabel="altLabel"
          :value="value"
          :max="maxForPotential(value)"
          :count="3"
          :active="store.editorMode === EditorMode.HardLimits ? store.eligiblePotentials.has(potential) : true"
          :ineligible="store.editorMode === EditorMode.SoftLimits && !store.eligiblePotentials.has(potential)"
          :missingInfo="store.editorMode !== EditorMode.Free && !store.eligiblePotentials.has(potential) ? missingConditionsHtml(potential) : ''"
          :min="config.pointLimits.potentials.min"
          @change="(v) => onPotentialChange(potential, v)"
          :display-max="store.editorMode != EditorMode.Free"
          @mouseenter="store.setHighlighted(...requirements(potential))"
          @mouseleave="store.unsetHighlighted(...requirements(potential))"
          type="potentials"
        />
      </v-col>
    </v-row>
  </v-container>

  <!-- Luminary skill-choice dialog -->
  <v-dialog v-model="showLuminaryDialog" max-width="420" persistent>
    <v-card>
      <v-card-title class="text-h6">{{ $t('potentials.luminary') }}</v-card-title>
      <v-card-text>
        <div class="mb-3" style="font-size:0.85rem;color:#aaa">
          {{ $t('messages.luminaryChoiceDesc') }}
        </div>
        <v-select
          v-model="luminarySkillChoice"
          :items="skillItems"
          item-title="title"
          item-value="value"
          :label="$t('messages.luminaryChooseSkill')"
          variant="outlined"
          density="compact"
        />
      </v-card-text>
      <v-card-actions class="justify-end">
        <v-btn variant="text" @click="cancelLuminary">{{ $t('messages.cancel') }}</v-btn>
        <v-btn color="red-darken-2" variant="flat" :disabled="!luminarySkillChoice" @click="confirmLuminary">{{ $t('messages.confirm') }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <template v-if="cultPotentialsList().length > 0">
    <v-divider class="my-4"></v-divider>
    <div class="mb-2" style="font-size:12px;color:#aaa;letter-spacing:0.08em">{{ $t('messages.cultPotentials', { cult: $t(`culturesConceptsCults.${store.cult.name}`) }).toUpperCase() }}</div>
    <v-container>
      <v-row>
        <v-col
          cols="12"
          xs="12"
          sm="6"
          md="3"
          xl="3"
          class="py-0"
          v-for="{ potential, label, altLabel, value } in cultPotentialsList()"
          v-bind:key="potential.name"
        >
          <ValueSelector
            :name="potential.name"
            :label="label"
            :altLabel="altLabel"
            :value="value"
            :max="maxForPotential(value)"
            :count="3"
            :active="store.editorMode === EditorMode.HardLimits ? store.eligiblePotentials.has(potential) : true"
            :ineligible="store.editorMode === EditorMode.SoftLimits && !store.eligiblePotentials.has(potential)"
            :missingInfo="store.editorMode !== EditorMode.Free && !store.eligiblePotentials.has(potential) ? missingConditionsHtml(potential) : ''"
            :min="config.pointLimits.potentials.min"
            @change="(v) => onPotentialChange(potential, v)"
            :display-max="store.editorMode != EditorMode.Free"
            @mouseenter="store.setHighlighted(...requirements(potential))"
            @mouseleave="store.unsetHighlighted(...requirements(potential))"
            type="potentials"
          />
        </v-col>
      </v-row>
    </v-container>
  </template>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import ValueSelector from '@/components/ValueSelector.vue'
import config from '@/config'
import messages from '@/config/messages'
import { EditorMode } from '@/config/modes'
import { cultSpecificPotentials } from '@/config/potentials'
import { CommonPotentials } from '@/config/potentials/common'
import type { Potential } from '@/config/potentials/potential'
import { useCharacterStore } from '@/store'

const store = useCharacterStore()
const i18n = useI18n()
const search = ref('')

// Luminary skill-choice dialog
const showLuminaryDialog = ref(false)
const luminarySkillChoice = ref<string | null>(null)

const skillItems = computed(() =>
  config.skills
    .map(s => ({ title: i18n.t(`skills.${s.name}`), value: s.name }))
    .sort((a, b) => a.title.localeCompare(b.title, i18n.locale.value))
)

function onPotentialChange(potential: Potential, v: number) {
  store.setPotential(potential, v)
  if (potential.name === 'luminary' && v > 0 && !store.potentialChoices?.['luminary']) {
    luminarySkillChoice.value = null
    showLuminaryDialog.value = true
  }
}

function confirmLuminary() {
  if (!luminarySkillChoice.value) return
  store.setPotentialChoice('luminary', luminarySkillChoice.value)
  showLuminaryDialog.value = false
}

function cancelLuminary() {
  showLuminaryDialog.value = false
}

const remainingPotentialPoints = computed(() => {
  if (store.editorMode === EditorMode.Free) return Infinity
  return config.availablePoints.potentials + store.legacyXPPotentialBonus - store.spentPoints.potentials
})

function maxForPotential(value: number): number {
  if (store.editorMode === EditorMode.Free) return 3
  return Math.min(3, value + remainingPotentialPoints.value)
}

const englishPotentialNames = new Map(Object.entries(messages.en.potentials))

function englishName(potential: Potential) {
  return englishPotentialNames.get(potential.name) || potential.name
}

function mapPotential(potential: Potential) {
  const translatedLabel = i18n.t(`potentials.${potential.name}`)
  const originalLabel = englishName(potential)
  const displayTranslation = store.displayTranslatedLabels
  const value = store.potentialValue(potential)

  const skillSuffix = potential.name === 'luminary' && store.potentialChoices?.['luminary']
    ? ` (${i18n.t(`skills.${store.potentialChoices['luminary']}`)})` : ''

  if (i18n.locale.value == 'en') {
    return { potential, label: translatedLabel + skillSuffix, altLabel: '', value }
  }
  return {
    potential,
    label: (displayTranslation ? translatedLabel : originalLabel) + skillSuffix,
    altLabel: displayTranslation ? originalLabel : translatedLabel,
    value
  }
}

function frLabel(name: string) {
  return i18n.t(`potentials.${name}`) as string
}

function matchesSearch(name: string) {
  if (!search.value) return true
  const q = search.value.toLowerCase()
  const en = englishPotentialNames.get(name) || ''
  return frLabel(name).toLowerCase().includes(q) || en.toLowerCase().includes(q)
}

function commonPotentialsList() {
  return CommonPotentials
    .filter(p => matchesSearch(p.name))
    .map(mapPotential)
    .sort((a, b) => frLabel(a.potential.name).localeCompare(frLabel(b.potential.name), 'fr'))
}

function cultPotentialsList() {
  return cultSpecificPotentials(store.cult, store.clan)
    .filter(p => matchesSearch(p.name))
    .map(mapPotential)
    .sort((a, b) => frLabel(a.potential.name).localeCompare(frLabel(b.potential.name), 'fr'))
}

function requirements(potential: Potential) {
  return [
    ...potential.requiredSkills.flatMap((s) => s.items.map((i) => i.skill)),
    ...potential.requiredOrigins.flatMap((o) => o.items),
    ...potential.requiredAttributes.flatMap((a) => a.items),
    ...(potential.mentalPowerSkill ? [potential.mentalPowerSkill] : []),
    ...(potential.mentalResistanceSkill ? [potential.mentalResistanceSkill] : []),
    ...potential.minimumRanks.flatMap((r) => r.ranks)
  ]
}

function missingConditionsHtml(potential: Potential): string {
  const tr = (key: string) => i18n.t(key) as string
  const missing: string[] = []

  for (const req of potential.requiredOrigins) {
    if (!req.check(store.originValues)) missing.push(req.format(tr))
  }
  for (const req of potential.requiredSkills) {
    if (!req.check(store.skillValues)) missing.push(req.format(tr))
  }
  for (const req of potential.requiredAttributes) {
    if (!req.check(store.attributeValues)) missing.push(req.format(tr))
  }
  for (const req of potential.minimumRanks) {
    if (!req.check([store.rank])) missing.push(req.format(tr))
  }
  if (potential.mentalPowerSkill && potential.mentalPowerSkill.name !== store.mentalPowerSkill.name) {
    missing.push(`Compétence Spéciale requise :${potential.mentalPowerSkill.format(tr)}`)
  }
  if (potential.mentalResistanceSkill && potential.mentalResistanceSkill.name !== store.mentalResistanceSkill.name) {
    missing.push(`Compétence Spéciale requise :${potential.mentalResistanceSkill.format(tr)}`)
  }

  if (missing.length === 0) return ''
  return `<hr style="border-color:#555;margin:10px 0"><span style="color:#ef9a9a;font-weight:bold">${tr('messages.missingConditions')}</span><br>` +
    missing.map(m => `• ${m}`).join('<br>')
}
</script>
