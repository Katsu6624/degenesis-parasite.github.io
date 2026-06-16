<template>
  <div class="dilemma-root">
    <div class="dilemma-header">
      <v-tooltip max-width="360" location="bottom">
        <template #activator="{ props }">
          <span v-bind="props" class="dilemma-title text-uppercase font-weight-bold" style="cursor:help;border-bottom:1px dotted #666">{{ $t('messages.mentalDilemma.title') }}</span>
        </template>
        <span v-html="$t('messages.mentalDilemma.titleTooltip')"></span>
      </v-tooltip>
    </div>

    <div class="dilemma-row">
      <!-- Primal vs Focus -->
      <div class="dilemma-block">
        <v-tooltip max-width="380" location="bottom">
          <template #activator="{ props }">
            <div class="dilemma-label mb-2"><span v-bind="props" style="cursor:help;border-bottom:1px dotted #666;display:inline-block">{{ $t('messages.mentalDilemma.primalFocus.label') }}</span></div>
          </template>
          <span>{{ $t('messages.mentalDilemma.primalFocus.tooltip') }}</span>
        </v-tooltip>
        <v-btn-toggle
          :model-value="store.mentalPowerChoice"
          @update:model-value="v => v && store.setMentalPowerChoice(v)"
          mandatory
          density="compact"
          rounded="lg"
          class="dilemma-toggle"
        >
          <v-btn value="primal" :color="store.mentalPowerChoice === 'primal' ? 'red-darken-2' : ''" size="small">
            <div class="dilemma-btn-content">
              <span class="dilemma-skill-name">{{ $t('skills.primal') }}</span>
              <span class="dilemma-skill-attr">INS</span>
            </div>
          </v-btn>
          <v-btn value="focus" :color="store.mentalPowerChoice === 'focus' ? 'red-darken-2' : ''" size="small">
            <div class="dilemma-btn-content">
              <span class="dilemma-skill-name">{{ $t('skills.focus') }}</span>
              <span class="dilemma-skill-attr">INT</span>
            </div>
          </v-btn>
        </v-btn-toggle>
        <div v-if="!store.mentalPowerChoice" class="dilemma-warning mt-1">
          {{ $t('messages.mentalDilemma.choiceRequired') }}
        </div>
        <div v-else class="dilemma-blocked mt-1">
          {{ $t('messages.mentalDilemma.blocked', { name: store.mentalPowerChoice === 'primal' ? $t('skills.focus') : $t('skills.primal') }) }}
        </div>
      </div>

      <div class="dilemma-separator"></div>

      <!-- Faith vs Willpower -->
      <div class="dilemma-block">
        <v-tooltip max-width="380" location="bottom">
          <template #activator="{ props }">
            <div class="dilemma-label mb-2"><span v-bind="props" style="cursor:help;border-bottom:1px dotted #666;display:inline-block">{{ $t('messages.mentalDilemma.faithWillpower.label') }}</span></div>
          </template>
          <span>{{ $t('messages.mentalDilemma.faithWillpower.tooltip') }}</span>
        </v-tooltip>
        <v-btn-toggle
          :model-value="store.mentalResistanceChoice"
          @update:model-value="v => v && store.setMentalResistanceChoice(v)"
          mandatory
          density="compact"
          rounded="lg"
          class="dilemma-toggle"
        >
          <v-btn value="faith" :color="store.mentalResistanceChoice === 'faith' ? 'red-darken-2' : ''" size="small">
            <div class="dilemma-btn-content">
              <span class="dilemma-skill-name">{{ $t('skills.faith') }}</span>
              <span class="dilemma-skill-attr">PSY</span>
            </div>
          </v-btn>
          <v-btn value="willpower" :color="store.mentalResistanceChoice === 'willpower' ? 'red-darken-2' : ''" size="small">
            <div class="dilemma-btn-content">
              <span class="dilemma-skill-name">{{ $t('skills.willpower') }}</span>
              <span class="dilemma-skill-attr">PSY</span>
            </div>
          </v-btn>
        </v-btn-toggle>
        <div v-if="!store.mentalResistanceChoice" class="dilemma-warning mt-1">
          {{ $t('messages.mentalDilemma.choiceRequired') }}
        </div>
        <div v-else class="dilemma-blocked mt-1">
          {{ $t('messages.mentalDilemma.blocked', { name: store.mentalResistanceChoice === 'faith' ? $t('skills.willpower') : $t('skills.faith') }) }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCharacterStore } from '@/store'
const store = useCharacterStore()
</script>

<style scoped>
.dilemma-root {
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
}
.dilemma-header {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
}
.dilemma-title {
  font-size: 12px;
  letter-spacing: 0.1em;
  color: #bbb;
}
.dilemma-row {
  display: flex;
  gap: 24px;
  align-items: flex-start;
}
.dilemma-block {
  flex: 1;
}
.dilemma-separator {
  width: 1px;
  background: rgba(255,255,255,0.1);
  align-self: stretch;
}
.dilemma-label {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: #ccc;
}
.dilemma-toggle {
  gap: 4px;
}
.dilemma-btn-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1px;
  padding: 2px 8px;
}
.dilemma-skill-name {
  font-size: 12px;
  font-weight: 600;
}
.dilemma-skill-attr {
  font-size: 10px;
  opacity: 0.6;
}
.dilemma-warning {
  font-size: 11px;
  color: #ef9a9a;
}
.dilemma-blocked {
  font-size: 11px;
  color: #777;
}
</style>
