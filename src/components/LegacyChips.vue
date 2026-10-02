<template>
  <div v-if="names.length > 0" class="legacy-chips">
    <span v-for="name in names" :key="name" class="legacy-chip" :title="label(name)">{{ label(name) }}</span>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

defineProps<{ names: string[] }>()
const { t, te } = useI18n()

function label(name: string): string {
  return te(`legacies.${name}`) ? t(`legacies.${name}`) : name
}
</script>

<style scoped>
.legacy-chips {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 4px;
  margin-top: 10px;
  max-width: 100%;
}

.legacy-chip {
  font-size: 0.62rem;
  line-height: 1.3;
  padding: 2px 8px;
  border-radius: 10px;
  border: 1px solid rgba(var(--v-theme-on-surface), 0.3);
  color: rgba(var(--v-theme-on-surface), 0.8);
  max-width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
