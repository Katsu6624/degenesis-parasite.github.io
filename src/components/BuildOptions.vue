<template>
  <div class="pa-1">
    <v-btn-toggle
      v-model="store.editorMode"
      @update:model-value="onModeChange"
      color="primary"
      variant="outlined"
      density="comfortable"
      mandatory
    >
      <v-btn
        :disabled="store.editorMode != EditorMode.HardLimits && store.anyPointLimitExceeded"
        :value="EditorMode.HardLimits"
        :prepend-icon="mdiLock"
        >{{ $t('messages.editorModes.hardLimits') }}
      </v-btn>
      <v-btn :value="EditorMode.SoftLimits" :prepend-icon="mdiLockCheckOutline">{{
        $t('messages.editorModes.softLimits')
      }}</v-btn>
      <v-btn :value="EditorMode.Free" :prepend-icon="mdiLockOpenOutline">{{
        $t('messages.editorModes.free')
      }}</v-btn>
    </v-btn-toggle>
    <div class="pa-1 text-caption text-medium-emphasis">
      <p
        v-if="store.editorMode != EditorMode.HardLimits && store.anyPointLimitExceeded"
        class="text-high-emphasis"
      >
        <b>{{ $t(`messages.hint`) }}:</b>
        {{ $t(`messages.editorModes.hintHardLimitModeImpossible`) }}
      </p>
      <p>
        <b>{{ $t(`messages.editorModes.${store.editorMode}`) }}:</b>
        {{ $t(`messages.editorModes.hints.${store.editorMode}`) }}
      </p>
    </div>

    <v-dialog v-model="showLCDialog" max-width="480" persistent>
      <v-card>
        <v-card-title class="text-h6 pa-4">{{ $t('messages.expertLCDialog.title') }}</v-card-title>
        <v-card-text>{{ $t('messages.expertLCDialog.body') }}</v-card-text>
        <v-card-actions class="justify-end pa-4 gap-2">
          <v-btn variant="outlined" @click="resolveLCDialog(false)">{{ $t('messages.expertLCDialog.no') }}</v-btn>
          <v-btn color="primary" variant="flat" @click="resolveLCDialog(true)">{{ $t('messages.expertLCDialog.yes') }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { EditorMode } from '@/config/modes';
import { useCharacterStore } from '@/store';
import { mdiLock, mdiLockCheckOutline, mdiLockOpenOutline } from '@mdi/js';

const store = useCharacterStore()

const showLCDialog = ref(false)
let pendingMode: EditorMode | null = null

function onModeChange(mode: EditorMode) {
  const leavingExpert = store.editorMode === EditorMode.Free && mode !== EditorMode.Free
  if (leavingExpert && store.expertLCModified) {
    // Revert the v-model change visually — we'll apply it after dialog
    store.editorMode = EditorMode.Free
    pendingMode = mode
    showLCDialog.value = true
    return
  }
  store.setEditorMode(mode)
}

function resolveLCDialog(keepManual: boolean) {
  showLCDialog.value = false
  store.resolveExpertLCDialog(keepManual)
  if (pendingMode !== null) {
    store.setEditorMode(pendingMode)
    pendingMode = null
  }
}
</script>
