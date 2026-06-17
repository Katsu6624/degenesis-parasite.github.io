import { ref } from 'vue'

const active = ref(false)
const chosenValue = ref(0)
const numbers = ref<{ id: number; style: Record<string, string> }[]>([])
let triggered = false
let spawnInterval: ReturnType<typeof setInterval> | null = null
let idCounter = 0

const POOL = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000]

function spawnOne() {
  const angle = Math.random() * 360
  const rad = (angle * Math.PI) / 180
  // Start near center-ish, move far in direction
  const startX = 10 + Math.random() * 80
  const startY = 10 + Math.random() * 80
  const dist = 40 + Math.random() * 60
  const dx = Math.cos(rad) * dist
  const dy = Math.sin(rad) * dist
  const size = 3.5 + Math.random() * 5.5 // big: 3.5–9rem
  const duration = 2.0 + Math.random() * 2.5
  const id = idCounter++

  numbers.value.push({
    id,
    style: {
      '--dx': `${dx}vw`,
      '--dy': `${dy}vh`,
      '--duration': `${duration}s`,
      top: `${startY}%`,
      left: `${startX}%`,
      fontSize: `${size}rem`,
    },
  })

  // remove after animation ends
  setTimeout(() => {
    numbers.value = numbers.value.filter((n) => n.id !== id)
  }, (duration + 0.2) * 1000)
}

export function triggerMesmerized(baseUrl: string) {
  if (triggered) return
  triggered = true

  chosenValue.value = POOL[Math.floor(Math.random() * POOL.length)]

  const audio1 = new Audio(`${baseUrl}prank/mesmerized.mp3`)
  const audio2 = new Audio(`${baseUrl}prank/mesmerized-voices.mp3`)
  audio1.volume = 0.9
  audio2.volume = 1.0
  audio1.play()
  audio2.play()

  // Start spawning after 1.5s
  setTimeout(() => {
    active.value = true
    // Spawn a burst immediately then keep spawning
    for (let i = 0; i < 6; i++) setTimeout(spawnOne, i * 80)
    spawnInterval = setInterval(spawnOne, 180)
  }, 1500)

  audio2.addEventListener('ended', () => {
    audio1.pause()
    if (spawnInterval !== null) {
      clearInterval(spawnInterval)
      spawnInterval = null
    }
    // Let existing numbers finish their animation
    setTimeout(() => {
      active.value = false
      numbers.value = []
    }, 2500)
  })
}

export function useMesmerized() {
  return { active, numbers, chosenValue }
}
