<template>
  <component
    :is="as"
    ref="rootRef"
    class="flickering-text-root"
    :class="className"
    :style="{ color: textColor }"
  >
    <span
      v-for="(item, index) in segments"
      :key="index"
      :ref="(el) => setCharRef(el as HTMLElement, index)"
      class="flickering-char"
      :class="{ 'is-space': item.isSpace }"
    >{{ item.char }}</span>
  </component>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'

export interface FlickeringTextProps {
  text?: string
  as?: string
  className?: string
  textColor?: string
  /** Noise samples per second (wiggles/sec) */
  wigglesPerSecond?: number
  /** 0 = every character flickers alone, 1 = entire word flickers as one */
  correlation?: number
  /** Minimum opacity a character drops to */
  minOpacity?: number
  /** Lower bound of selector amount; negative values keep letters legible longer */
  minAmount?: number
  maxAmount?: number
  glow?: boolean
  glowColor?: string
  glowIntensity?: number
  glowRadius?: number
  glowThreshold?: number
}

const props = withDefaults(defineProps<FlickeringTextProps>(), {
  text: 'بسپر من',
  as: 'span',
  className: '',
  textColor: 'inherit',
  wigglesPerSecond: 2.5,
  correlation: 0.45,
  minOpacity: 0.35,
  minAmount: -0.8,
  maxAmount: 0.8,
  glow: true,
  glowColor: '#D93829',
  glowIntensity: 0.85,
  glowRadius: 0.8,
  glowThreshold: 0.6,
})

// Deterministic value noise hash constants
const SHARED_LANE = 0
const HASH_LANE = 374761393
const HASH_STEP = 668265263
const HASH_SEED = 2246822519
const HASH_MIX = 1274126177
const UINT32_MAX = 4294967295
const DEFAULT_RANDOM_SEED = 0

// Multi-tier bloom halo layers (in em units)
const GLOW_LAYERS = [
  { radius: 0.08, alpha: 0.55 },
  { radius: 0.22, alpha: 0.35 },
  { radius: 0.5, alpha: 0.22 },
]

interface SegmentItem {
  char: string
  isSpace: boolean
}

const segments = computed<SegmentItem[]>(() => {
  return Array.from(props.text).map((c) => ({
    char: c,
    isSpace: c === ' ',
  }))
})

const rootRef = ref<HTMLElement | null>(null)
const charElements = ref<HTMLElement[]>([])

const setCharRef = (el: HTMLElement | null, idx: number) => {
  if (el) charElements.value[idx] = el
}

/** Deterministic pseudo-random in [-1, 1] for lane & step */
const randomAt = (lane: number, step: number, seed: number): number => {
  let hash =
    (Math.imul(lane, HASH_LANE) ^
      Math.imul(step, HASH_STEP) ^
      Math.imul(seed, HASH_SEED)) >>>
    0
  hash = Math.imul(hash ^ (hash >>> 13), HASH_MIX) >>> 0
  return (hash / UINT32_MAX) * 2 - 1
}

/** Smoothstep-interpolated value noise */
const noiseAt = (lane: number, time: number, seed: number): number => {
  const step = Math.floor(time)
  const t = time - step
  const ease = t * t * (3 - 2 * t)
  const from = randomAt(lane, step, seed)
  const to = randomAt(lane, step + 1, seed)
  return from + (to - from) * ease
}

/** Multi-layer text shadow bloom */
const generateGlowShadow = (strength: number, color: string, radius: number): string => {
  if (strength <= 0) return 'none'

  return GLOW_LAYERS.map(({ radius: layerRadius, alpha }) => {
    const spread = (layerRadius * radius).toFixed(3)
    const mix = Math.round(alpha * strength * 100)
    return `0 0 ${spread}em color-mix(in srgb, ${color} ${mix}%, transparent)`
  }).join(', ')
}

let animFrameId: number | null = null
let startTimestamp: number | null = null

const tick = (now: number) => {
  if (startTimestamp === null) startTimestamp = now
  const elapsedSeconds = (now - startTimestamp) / 1000
  const time = elapsedSeconds * props.wigglesPerSecond

  const shared = noiseAt(SHARED_LANE, time, DEFAULT_RANDOM_SEED)
  const blendNorm = Math.hypot(1 - props.correlation, props.correlation)
  const glowRamp = Math.max(1 - props.glowThreshold, 0.001)

  const elements = charElements.value
  for (let i = 0; i < elements.length; i++) {
    const el = elements[i]
    if (!el || segments.value[i]?.isSpace) continue

    const own = noiseAt(i + 1, time, DEFAULT_RANDOM_SEED)
    const noise = (own * (1 - props.correlation) + shared * props.correlation) / blendNorm

    const amount = ((noise + 1) / 2) * (props.maxAmount - props.minAmount) + props.minAmount
    const opacity = Math.min(1, Math.max(props.minOpacity, 1 + amount * (props.minOpacity - 1)))

    const strength = props.glow
      ? Math.min(1, Math.max(0, (opacity - props.glowThreshold) / glowRamp)) * props.glowIntensity
      : 0

    el.style.opacity = opacity.toFixed(3)
    el.style.textShadow = generateGlowShadow(strength, props.glowColor, props.glowRadius)
  }

  animFrameId = requestAnimationFrame(tick)
}

onMounted(() => {
  const prefersReduced =
    typeof window !== 'undefined' &&
    window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches

  if (prefersReduced) {
    // Keep characters at full opacity without animation loop
    charElements.value.forEach((el) => {
      if (el) {
        el.style.opacity = '1'
        el.style.textShadow = 'none'
      }
    })
    return
  }

  animFrameId = requestAnimationFrame(tick)
})

onUnmounted(() => {
  if (animFrameId !== null) {
    cancelAnimationFrame(animFrameId)
    animFrameId = null
  }
})
</script>

<style scoped>
.flickering-text-root {
  display: inline;
  vertical-align: baseline;
  white-space: nowrap;
}

.flickering-char {
  display: inline;
  transition: text-shadow 0.08s ease-out;
  will-change: opacity, text-shadow;
}

.flickering-char.is-space {
  display: inline;
}
</style>
