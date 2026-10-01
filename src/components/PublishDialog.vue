<template>
  <v-dialog v-model="model" max-width="520" persistent>
    <v-card>
      <v-card-title class="text-uppercase label">{{ $t('community.publishTitle') }}</v-card-title>
      <v-card-text>
        <template v-if="!result">
          <p class="text-body-2 mb-4">{{ $t('community.publishDesc') }}</p>
          <v-text-field
            v-model="pseudo"
            :label="$t('community.pseudo')"
            :rules="[v => !!v || $t('community.pseudoRequired')]"
            variant="outlined"
            density="compact"
            maxlength="40"
            counter
            class="mb-2"
          />
          <v-alert v-if="error" type="error" density="compact" class="mb-2">{{ error }}</v-alert>
        </template>
        <template v-else>
          <v-alert type="success" density="compact" class="mb-4">{{ $t('community.publishSuccess') }}</v-alert>
          <p class="text-body-2 mb-1">{{ $t('community.secretDesc') }}</p>
          <v-text-field
            :model-value="result.secret"
            readonly
            variant="outlined"
            density="compact"
            :append-inner-icon="mdiContentCopy"
            @click:append-inner="copySecret"
          />
          <p class="text-caption text-red">{{ $t('community.secretWarning') }}</p>
        </template>
      </v-card-text>
      <v-card-actions class="justify-end">
        <v-btn variant="text" @click="close">{{ $t('messages.close') }}</v-btn>
        <v-btn
          v-if="!result"
          color="red-darken-2"
          variant="flat"
          :loading="loading"
          :disabled="!pseudo.trim()"
          @click="publish"
        >
          {{ $t('community.publish') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { mdiContentCopy } from '@mdi/js'
import { useCharacterStore } from '@/store'
import { publishCharacter } from '@/services/communityApi'
import type { PublishResult } from '@/services/communityApi'

const model = defineModel<boolean>({ default: false })
const props = defineProps<{ prefilledCharacter?: Record<string, unknown> | null }>()
const store = useCharacterStore()

const pseudo = ref('')
const loading = ref(false)
const error = ref('')
const result = ref<PublishResult | null>(null)

async function publish() {
  if (!pseudo.value.trim()) return
  loading.value = true
  error.value = ''
  try {
    const char = props.prefilledCharacter
      ? { ...props.prefilledCharacter }
      : JSON.parse(JSON.stringify(store.asCharacter)) as Record<string, unknown>
    const portraits: Record<string, string> = {}
    if (char.portrait) portraits.main = char.portrait as string
    if (char.portraitOriginal) portraits.original = char.portraitOriginal as string
    if (char.portraitFiche) portraits.fiche = char.portraitFiche as string

    const charData = { ...char }
    delete charData.portrait
    delete charData.portraitOriginal
    delete charData.portraitFiche

    result.value = await publishCharacter({
      pseudo: pseudo.value.trim(),
      character: charData,
      portraits: Object.keys(portraits).length ? portraits : undefined,
    })
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Erreur inconnue'
  } finally {
    loading.value = false
  }
}

function copySecret() {
  if (result.value) navigator.clipboard.writeText(result.value.secret)
}

function close() {
  model.value = false
  if (result.value) {
    pseudo.value = ''
    result.value = null
    error.value = ''
  }
}
</script>
