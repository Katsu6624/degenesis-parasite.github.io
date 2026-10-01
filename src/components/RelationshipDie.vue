<template>
  <div class="relationship-die" :class="[valueClass, { bounce: isBouncing }]">
    <div class="die-face">
      <span v-if="value !== 0" class="die-value">{{ value > 0 ? '+' : '' }}{{ value }}</span>
      <span v-else class="die-zero">0</span>
      <div class="pips">
        <div
          v-for="pip in activePips"
          :key="pip"
          class="pip"
          :style="pipStyle(pip)"
        ></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed, nextTick } from 'vue'

const props = defineProps<{ value: number }>()

const isBouncing = ref(false)

watch(
  () => props.value,
  () => {
    isBouncing.value = false
    nextTick(() => {
      isBouncing.value = true
      setTimeout(() => { isBouncing.value = false }, 400)
    })
  },
)

const valueClass = computed(() => {
  if (props.value > 0) return 'positive'
  if (props.value < 0) return 'negative'
  return 'neutral'
})

// Pip layout: positions in a 3x3 grid (row 0-2, col 0-2)
const pipLayouts: Record<number, [number, number][]> = {
  1: [[1, 1]],
  2: [[0, 0], [2, 2]],
  3: [[0, 0], [1, 1], [2, 2]],
  4: [[0, 0], [0, 2], [2, 0], [2, 2]],
  5: [[0, 0], [0, 2], [1, 1], [2, 0], [2, 2]],
  6: [[0, 0], [0, 2], [1, 0], [1, 2], [2, 0], [2, 2]],
}

const abs = computed(() => Math.min(Math.abs(props.value), 6))
const activePips = computed(() => pipLayouts[abs.value] ? Array.from({ length: abs.value }, (_, i) => i) : [])

function pipStyle(index: number): Record<string, string> {
  const layout = pipLayouts[abs.value]
  if (!layout || !layout[index]) return {}
  const [row, col] = layout[index]
  return {
    top: `${8 + row * 10}px`,
    left: `${8 + col * 10}px`,
  }
}
</script>

<style scoped>
.relationship-die {
  width: 40px;
  height: 40px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  font-weight: 900;
  font-size: 0.85rem;
  user-select: none;
  transition: transform 0.15s ease;
  border: 2px solid rgba(0, 0, 0, 0.3);
}

.relationship-die.positive {
  background: #f0f0f0;
  color: #111;
}

.relationship-die.negative {
  background: #1a1a1a;
  color: #eee;
}

.relationship-die.neutral {
  background: #555;
  color: #ccc;
}

.die-face {
  position: relative;
  width: 100%;
  height: 100%;
}

.die-value, .die-zero {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 0.8rem;
  font-weight: 900;
  z-index: 2;
}

.pip {
  position: absolute;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: currentColor;
  opacity: 0.4;
}

.bounce {
  animation: die-bounce 0.4s ease;
}

@keyframes die-bounce {
  0% { transform: scale(1); }
  30% { transform: scale(1.3); }
  60% { transform: scale(0.9); }
  100% { transform: scale(1); }
}
</style>
