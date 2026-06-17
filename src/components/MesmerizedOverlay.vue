<template>
  <Teleport to="body">
    <div v-if="active" class="mesmerized-overlay" aria-hidden="true">
      <span
        v-for="n in numbers"
        :key="n.id"
        class="mesmerized-number"
        :style="n.style"
      >{{ chosenValue }}</span>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { useMesmerized } from '@/composables/useMesmerized'

const { active, numbers, chosenValue } = useMesmerized()
</script>

<style scoped>
.mesmerized-overlay {
  position: fixed;
  inset: 0;
  z-index: 99990;
  pointer-events: none;
  overflow: hidden;
}

.mesmerized-number {
  position: absolute;
  color: #cc0000;
  font-weight: 900;
  font-family: monospace;
  line-height: 1;
  text-shadow:
    0 0 10px #ff0000,
    0 0 30px rgba(200, 0, 0, 0.7);
  animation: mesmerized-move var(--duration, 2.5s) linear forwards;
  will-change: transform, opacity;
}

@keyframes mesmerized-move {
  0% {
    transform: translate(0, 0);
    opacity: 0;
    clip-path: inset(60% 0 30% 0);
    filter: blur(4px) brightness(2);
  }
  5% {
    opacity: 1;
    clip-path: inset(0% 0 0% 0);
    filter: blur(0px) brightness(1.5);
  }
  8% {
    clip-path: inset(20% 0 50% 0);
    filter: blur(2px) brightness(2);
  }
  12% {
    clip-path: inset(0% 0 0% 0);
    filter: blur(0px) brightness(1);
  }
  16% {
    clip-path: inset(40% 0 10% 0);
  }
  20% {
    clip-path: inset(0% 0 0% 0);
  }
  75% {
    opacity: 0.9;
    transform: translate(var(--dx), var(--dy));
  }
  100% {
    opacity: 0;
    transform: translate(var(--dx), var(--dy));
    filter: blur(3px);
  }
}
</style>
