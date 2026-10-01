<template>
  <div class="other-tab pa-4">
    <!-- Scars -->
    <v-card class="mb-4" variant="outlined">
      <v-card-title class="text-uppercase label">{{ $t('other.scarsSection') }}</v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12" sm="6">
            <v-text-field
              :label="$t('other.groupName')"
              :model-value="store.other.groupName"
              @update:model-value="store.setOther({ groupName: $event })"
              variant="outlined"
              density="compact"
            />
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              :label="$t('other.alignment')"
              :model-value="store.other.alignment"
              @update:model-value="store.setOther({ alignment: $event })"
              variant="outlined"
              density="compact"
            />
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              :label="$t('other.constellation')"
              :model-value="store.other.constellation"
              @update:model-value="store.setOther({ constellation: $event })"
              variant="outlined"
              density="compact"
            />
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              :label="$t('other.scarsValue')"
              :model-value="store.other.scarsValue"
              @update:model-value="store.setOther({ scarsValue: $event })"
              variant="outlined"
              density="compact"
            />
          </v-col>
          <v-col cols="12" sm="6">
            <div class="d-flex align-center gap-2">
              <span class="label text-caption text-uppercase mr-2">{{ $t('other.infamy') }}</span>
              <v-btn
                v-for="n in 7"
                :key="n - 1"
                :variant="store.other.infamy >= n ? 'flat' : 'outlined'"
                :color="store.other.infamy >= n ? 'red-darken-2' : undefined"
                size="x-small"
                icon
                @click="store.setOther({ infamy: store.other.infamy === n ? n - 1 : n })"
              >
                {{ n - 1 }}
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <!-- Complications -->
    <v-card class="mb-4" variant="outlined">
      <v-card-title class="text-uppercase label">{{ $t('other.complicationsSection') }}</v-card-title>
      <v-card-text>
        <v-textarea
          :placeholder="$t('other.complicationsPlaceholder')"
          :model-value="store.other.complications"
          @update:model-value="store.setOther({ complications: $event })"
          variant="outlined"
          rows="4"
          auto-grow
        />
      </v-card-text>
    </v-card>

    <!-- Artifacts -->
    <v-card class="mb-4" variant="outlined">
      <v-card-title class="text-uppercase label d-flex justify-space-between align-center">
        {{ $t('other.artifactsSection') }}
        <v-btn size="small" variant="text" @click="addArtifact">
          + {{ $t('other.addArtifact') }}
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-row v-for="(artifact, i) in store.other.artifacts" :key="i" class="mb-2">
          <v-col cols="12">
            <v-card variant="tonal" class="pa-2">
              <div class="d-flex justify-end mb-1">
                <v-btn size="x-small" :icon="mdiClose" variant="text" @click="removeArtifact(i)" />
              </div>
              <v-row dense>
                <v-col cols="12" sm="6">
                  <v-text-field
                    :label="$t('other.artifactName')"
                    :model-value="artifact.name"
                    @update:model-value="updateArtifact(i, 'name', $event)"
                    variant="outlined"
                    density="compact"
                  />
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    :label="$t('other.artifactActivation')"
                    :model-value="artifact.activation"
                    @update:model-value="updateArtifact(i, 'activation', $event)"
                    variant="outlined"
                    density="compact"
                  />
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    :label="$t('other.artifactOperation')"
                    :model-value="artifact.operation"
                    @update:model-value="updateArtifact(i, 'operation', $event)"
                    variant="outlined"
                    density="compact"
                  />
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    :label="$t('other.artifactAppraisalValue')"
                    :model-value="artifact.appraisalValue"
                    @update:model-value="updateArtifact(i, 'appraisalValue', $event)"
                    variant="outlined"
                    density="compact"
                  />
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
        <div v-if="store.other.artifacts.length === 0" class="text-caption text-grey"></div>
      </v-card-text>
    </v-card>

    <!-- Notes -->
    <v-card variant="outlined">
      <v-card-title class="text-uppercase label d-flex justify-space-between align-center">
        {{ $t('other.notesSection') }}
        <v-btn size="small" variant="text" @click="addNote">
          + {{ $t('other.addNote') }}
        </v-btn>
      </v-card-title>
      <v-card-text>
        <div v-for="(note, i) in store.other.notes" :key="i" class="d-flex align-center mb-2">
          <v-textarea
            :placeholder="$t('other.notePlaceholder')"
            :model-value="note"
            @update:model-value="updateNote(i, $event)"
            variant="outlined"
            density="compact"
            rows="2"
            auto-grow
            class="flex-grow-1 mr-2"
          />
          <v-btn size="x-small" :icon="mdiClose" variant="text" @click="removeNote(i)" />
        </div>
        <div v-if="store.other.notes.length === 0" class="text-caption text-grey"></div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import { useCharacterStore } from '@/store'
import type { ArtifactEntry } from '@/config/other'
import { mdiClose } from '@mdi/js'

const store = useCharacterStore()

function addArtifact() {
  const artifacts = [...store.other.artifacts, { name: '', activation: '', operation: '', appraisalValue: '' }]
  store.setOther({ artifacts })
}

function removeArtifact(i: number) {
  const artifacts = store.other.artifacts.filter((_, idx) => idx !== i)
  store.setOther({ artifacts })
}

function updateArtifact(i: number, field: keyof ArtifactEntry, value: string) {
  const artifacts = store.other.artifacts.map((a, idx) =>
    idx === i ? { ...a, [field]: value } : a,
  )
  store.setOther({ artifacts })
}

function addNote() {
  store.setOther({ notes: [...store.other.notes, ''] })
}

function removeNote(i: number) {
  store.setOther({ notes: store.other.notes.filter((_, idx) => idx !== i) })
}

function updateNote(i: number, value: string) {
  const notes = store.other.notes.map((n, idx) => (idx === i ? value : n))
  store.setOther({ notes })
}
</script>

<style scoped>
.other-tab {
  max-width: 900px;
  margin: 0 auto;
}
</style>
