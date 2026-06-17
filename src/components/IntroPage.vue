<template>
  <v-main class="intro mb-0">
    <video
      class="intro-video-bg"
      :src="`${baseUrl}stream.mp4`"
      autoplay
      loop
      muted
      playsinline
    ></video>
    <div class="intro-video-overlay"></div>
    <v-container class="intro-content">
      <v-row>
        <v-col class="float-left">
          <v-card class="introCard">
            <v-card-title class="d-flex align-center">
              {{ $t('messages.welcome') }}
              <img :src="`${baseUrl}solar-cross.png`" alt="" class="welcome-logo ml-2" />
            </v-card-title>
            <v-card-text>
              <div>
                <div class="text-subtitle-1" v-html="$t('messages.introduction.whatIsIt')"> </div>
                <p>{{ $t('messages.introduction.whatIsItText1') }}</p>
                <p>{{ $t('messages.introduction.whatIsItText2') }}</p>
                <i18n-t keypath="messages.introduction.whatIsItText3" tag="p">
                    <a :href="config.sourceCodeGitlab" target="_blank">GitLab</a>
                </i18n-t>
                <p class="text-subtitle-1 mb-1">{{ $t('messages.introduction.credits.title') }}</p>
                <p class="mt-0">{{ $t('messages.introduction.credits.diskordanz') }}</p>
                <p class="mt-0">{{ $t('messages.introduction.credits.miokido') }}</p>
                <p class="mt-0">{{ $t('messages.introduction.credits.katsu') }}</p>
                <img
                  :src="`${baseUrl}intro-banner.png`"
                  alt="Degenesis"
                  class="intro-banner mt-4"
                />
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script setup lang="ts">
import config from '@/config'
const baseUrl = import.meta.env.BASE_URL
</script>

<style scoped>
.intro {
  position: relative;
  height: 100vh;
  overflow: hidden;
}

.intro-video-bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
}

.intro-video-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.55);
  z-index: 1;
}

.intro-content {
  position: relative;
  z-index: 2;
}

.introCard {
  max-width: 80em;
  background: rgba(30, 30, 30, 0.82) !important;
  backdrop-filter: blur(6px);
}

p {
  margin-top: 1em;
}

.welcome-logo {
  height: 1.4em;
  width: auto;
}

.intro-banner {
  display: block;
  width: auto;
  max-width: 100%;
  max-height: 380px;
  border-radius: 8px;
  margin-left: 0;
  margin-right: auto;
}
</style>
