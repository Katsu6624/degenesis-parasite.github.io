<template>
  <Teleport to="body">
    <div v-if="active" class="mesmerized-overlay" aria-hidden="true">
      <!-- Full-screen glitch layers over the page -->
      <div class="glitch-screen glitch-screen-r"></div>
      <div class="glitch-screen glitch-screen-b"></div>
      <div class="glitch-slice-layer">
        <div class="glitch-slice"></div>
        <div class="glitch-slice glitch-slice-2"></div>
      </div>

      <!-- Floating numbers -->
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

/* ── Screen-wide RGB shift layers ── */
.glitch-screen {
  position: absolute;
  inset: 0;
  background: transparent;
  mix-blend-mode: screen;
}

.glitch-screen-r {
  animation: screen-glitch-r 1.6s steps(1) infinite;
}

.glitch-screen-b {
  animation: screen-glitch-b 2.1s steps(1) infinite;
}

/* Horizontal tear slices across the full screen */
.glitch-slice-layer {
  position: absolute;
  inset: 0;
}

.glitch-slice {
  position: absolute;
  left: 0;
  right: 0;
  height: 4px;
  background: rgba(200, 0, 0, 0.55);
  animation: slice-move 1.3s steps(1) infinite;
}

.glitch-slice-2 {
  height: 2px;
  background: rgba(255, 60, 0, 0.4);
  animation: slice-move-2 1.9s steps(1) infinite;
}

/* ── Numbers ── */
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
  0%   { transform: translate(0, 0); opacity: 0; }
  8%   { opacity: 1; }
  75%  { opacity: 0.9; transform: translate(var(--dx), var(--dy)); }
  100% { opacity: 0;  transform: translate(var(--dx), var(--dy)); }
}

/* Red channel shift — clips a band and shifts it horizontally */
@keyframes screen-glitch-r {
  0%   { clip-path: inset(0 0 92% 0); transform: translate(-8px, 0); opacity: 0.6; }
  7%   { clip-path: inset(28% 0 60% 0); transform: translate(5px, 0);  opacity: 0.5; }
  14%  { clip-path: inset(55% 0 30% 0); transform: translate(-4px, 0); opacity: 0.7; }
  21%  { clip-path: inset(10% 0 80% 0); transform: translate(9px, 0);  opacity: 0.4; }
  28%  { clip-path: inset(70% 0 12% 0); transform: translate(-6px, 0); opacity: 0.6; }
  35%  { clip-path: inset(40% 0 45% 0); transform: translate(3px, 0);  opacity: 0.5; }
  42%  { clip-path: inset(5% 0 88% 0);  transform: translate(-7px, 0); opacity: 0.7; }
  49%  { clip-path: inset(60% 0 22% 0); transform: translate(6px, 0);  opacity: 0.4; }
  56%  { clip-path: inset(18% 0 68% 0); transform: translate(-3px, 0); opacity: 0.6; }
  63%  { clip-path: inset(82% 0 5% 0);  transform: translate(8px, 0);  opacity: 0.5; }
  70%  { clip-path: inset(35% 0 50% 0); transform: translate(-5px, 0); opacity: 0.7; }
  100% { clip-path: inset(50% 0 35% 0); transform: translate(4px, 0);  opacity: 0.5; }
}

/* Blue channel shift */
@keyframes screen-glitch-b {
  0%   { clip-path: inset(45% 0 40% 0); transform: translate(6px, 0);  opacity: 0.4; }
  12%  { clip-path: inset(8% 0 78% 0);  transform: translate(-4px, 0); opacity: 0.5; }
  24%  { clip-path: inset(72% 0 15% 0); transform: translate(7px, 0);  opacity: 0.3; }
  36%  { clip-path: inset(20% 0 62% 0); transform: translate(-6px, 0); opacity: 0.5; }
  48%  { clip-path: inset(58% 0 28% 0); transform: translate(3px, 0);  opacity: 0.4; }
  60%  { clip-path: inset(2% 0 90% 0);  transform: translate(-5px, 0); opacity: 0.6; }
  72%  { clip-path: inset(38% 0 48% 0); transform: translate(8px, 0);  opacity: 0.3; }
  84%  { clip-path: inset(85% 0 5% 0);  transform: translate(-3px, 0); opacity: 0.5; }
  100% { clip-path: inset(15% 0 72% 0); transform: translate(5px, 0);  opacity: 0.4; }
}

@keyframes slice-move {
  0%   { top: 12%;  height: 3px; }
  9%   { top: 67%;  height: 6px; }
  18%  { top: 34%;  height: 2px; }
  27%  { top: 88%;  height: 8px; }
  36%  { top: 5%;   height: 4px; }
  45%  { top: 52%;  height: 3px; }
  54%  { top: 23%;  height: 7px; }
  63%  { top: 79%;  height: 2px; }
  72%  { top: 44%;  height: 5px; }
  81%  { top: 10%;  height: 9px; }
  90%  { top: 61%;  height: 3px; }
  100% { top: 38%;  height: 4px; }
}

@keyframes slice-move-2 {
  0%   { top: 55%; }
  14%  { top: 18%; }
  28%  { top: 73%; }
  42%  { top: 31%; }
  56%  { top: 90%; }
  70%  { top: 8%;  }
  84%  { top: 46%; }
  100% { top: 62%; }
}
</style>
