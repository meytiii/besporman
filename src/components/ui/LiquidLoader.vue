<template>
  <div class="liquid-loader-root" aria-label="بارگذاری استودیو" role="status">
    <div class="liquid-loader-container">
      <div
        v-for="(col, index) in columns"
        :key="index"
        class="liquid-column"
        :style="{
          '--bar-height': `${Math.abs(col.height)}px`,
          '--bar-scale-y': col.height < 0 ? -1 : 1,
          '--gradient': col.gradient,
          '--shadow-color': col.shadowColor,
          '--droplet-opacity': col.showDroplet ? 1 : 0,
          '--droplet-transform': col.dropletTransform,
          '--tension-transform': col.tensionTransform,
          '--wave-transform': col.waveTransform,
          '--shimmer-transform': col.shimmerTransform,
          '--bubble-top': col.bubbleTop,
          '--bubble-left': col.bubbleLeft,
          '--bubble-scale': col.bubbleScale,
          '--bubble-opacity': col.bubbleOpacity,
          '--base-scale': col.baseScale,
          '--base-y': col.baseY,
          '--base-opacity': col.baseOpacity
        }"
      >
        <!-- Top Droplet with liquid physics -->
        <div
          class="liquid-top-droplet"
          :class="{ 'is-active': col.showDroplet }"
        />

        <!-- Main Liquid Bar -->
        <div class="liquid-bar">
          <!-- Liquid surface tension effect -->
          <div class="liquid-tension" />

          <!-- Liquid wave effect -->
          <div class="liquid-wave" />

          <!-- Shimmer reflection effect -->
          <div class="liquid-shimmer" />

          <!-- Rising bubble effect -->
          <div class="liquid-bubble" />
        </div>

        <!-- Base Droplet with liquid physics -->
        <div class="liquid-base-droplet" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

export interface LiquidLoaderProps {
  variant?: 'rainbow' | 'brand'
}

const props = withDefaults(defineProps<LiquidLoaderProps>(), {
  variant: 'brand'
})

interface ColumnState {
  height: number
  showDroplet: boolean
  gradient: string
  shadowColor: string
  dropletTransform: string
  tensionTransform: string
  waveTransform: string
  shimmerTransform: string
  bubbleTop: string
  bubbleLeft: string
  bubbleScale: number
  bubbleOpacity: number
  baseScale: number
  baseY: string
  baseOpacity: number
}

// Brand palette tuned to Besporman's comic tactile tones (Red, Amber, Sage, Coral, Charcoal)
const brandPalettes = [
  { gradient: 'linear-gradient(135deg, #D93829, #F59E0B)', shadow: '#D93829' },
  { gradient: 'linear-gradient(135deg, #F59E0B, #E2E8DF)', shadow: '#F59E0B' },
  { gradient: 'linear-gradient(135deg, #C92A1D, #D93829)', shadow: '#C92A1D' },
  { gradient: 'linear-gradient(135deg, #0E0F12, #D93829)', shadow: '#0E0F12' },
  { gradient: 'linear-gradient(135deg, #D93829, #F0EAD6)', shadow: '#D93829' },
  { gradient: 'linear-gradient(135deg, #F59E0B, #C92A1D)', shadow: '#F59E0B' },
  { gradient: 'linear-gradient(135deg, #E2E8DF, #D93829)', shadow: '#D93829' }
]

const rainbowPalettes = [
  { gradient: 'linear-gradient(135deg, #a855f7, #ec4899)', shadow: '#a855f7' },
  { gradient: 'linear-gradient(135deg, #3b82f6, #a855f7)', shadow: '#3b82f6' },
  { gradient: 'linear-gradient(135deg, #06b6d4, #3b82f6)', shadow: '#06b6d4' },
  { gradient: 'linear-gradient(135deg, #10b981, #06b6d4)', shadow: '#10b981' },
  { gradient: 'linear-gradient(135deg, #eab308, #10b981)', shadow: '#eab308' },
  { gradient: 'linear-gradient(135deg, #f97316, #eab308)', shadow: '#f97316' },
  { gradient: 'linear-gradient(135deg, #ef4444, #f97316)', shadow: '#ef4444' }
]

const activePalettes = props.variant === 'rainbow' ? rainbowPalettes : brandPalettes

const columns = ref<ColumnState[]>(
  activePalettes.map((p) => ({
    height: 40,
    showDroplet: false,
    gradient: p.gradient,
    shadowColor: p.shadow,
    dropletTransform: 'translateY(10px) scale(0.5)',
    tensionTransform: 'scaleY(1)',
    waveTransform: 'translateY(0)',
    shimmerTransform: 'translateX(0)',
    bubbleTop: '20%',
    bubbleLeft: '30%',
    bubbleScale: 0.5,
    bubbleOpacity: 0.3,
    baseScale: 0.8,
    baseY: '0px',
    baseOpacity: 0.8
  }))
)

let animId: number | null = null
const isTestEnv = typeof import.meta !== 'undefined' && import.meta.env?.MODE === 'test'

const updatePhysics = () => {
  const now = Date.now()
  const time = now * 0.001
  const maxHeight = 75

  for (let index = 0; index < columns.value.length; index++) {
    const col = columns.value[index]
    const delay = index * 0.8

    // Primary wave with bounce effect
    const primaryWave = Math.sin(time + delay)
    const bounceWave = Math.sin(time * 4 + delay) * 0.15
    const ripple = Math.sin(time * 8 + delay) * 0.05
    const combinedWave = primaryWave + bounceWave + ripple

    col.height = maxHeight * combinedWave
    const wavePeak = Math.sin(time + delay)
    col.showDroplet = wavePeak > 0.8

    // Droplet physics
    if (col.showDroplet) {
      const dropY = Math.sin(now * 0.008 + index * 0.5) * 3
      const dropScale = 0.8 + Math.sin(now * 0.006 + index * 0.3) * 0.4
      col.dropletTransform = `translateY(${dropY}px) scale(${dropScale})`
    } else {
      col.dropletTransform = 'translateY(10px) scale(0.5)'
    }

    // Tension physics
    const tensionY = Math.sin(now * 0.003 + index * 0.5) * 1
    const tensionScaleY = 0.8 + Math.sin(now * 0.004 + index * 0.3) * 0.3
    col.tensionTransform = `translateY(${tensionY}px) scaleY(${tensionScaleY})`

    // Wave physics
    const waveY = Math.sin(now * 0.002 + index * 0.5) * 2
    col.waveTransform = `translateY(${waveY}px)`

    // Shimmer physics
    const shimmerX = Math.sin(now * 0.0015 + index * 0.7) * 8
    col.shimmerTransform = `translateX(${shimmerX}px)`

    // Bubble physics
    col.bubbleTop = `${20 + Math.sin(now * 0.003 + index * 0.8) * 10}%`
    col.bubbleLeft = `${30 + Math.sin(now * 0.002 + index * 0.6) * 20}%`
    col.bubbleScale = 0.5 + Math.sin(now * 0.004 + index * 0.4) * 0.5
    col.bubbleOpacity = Math.sin(now * 0.005 + index * 0.9) * 0.3 + 0.3

    // Base droplet physics
    col.baseOpacity = Math.sin(now * 0.003 + index * 0.9) * 0.4 + 0.6
    col.baseScale = 0.6 + Math.sin(now * 0.002 + index * 0.6) * 0.4
    col.baseY = `${Math.sin(now * 0.004 + index * 0.8) * 1}px`
  }

  if (!isTestEnv) {
    animId = requestAnimationFrame(updatePhysics)
  }
}

onMounted(() => {
  if (!isTestEnv) {
    animId = requestAnimationFrame(updatePhysics)
  }
})

onUnmounted(() => {
  if (animId !== null) {
    cancelAnimationFrame(animId)
  }
})
</script>

<style scoped>
.liquid-loader-root {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  direction: ltr; /* Ensure symmetrical physics columns left-to-right */
}

.liquid-loader-container {
  display: flex;
  align-items: flex-end;
  gap: 1.25rem;
  padding: 1.5rem;
}

.liquid-column {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* Droplet with liquid physics */
.liquid-top-droplet {
  width: 1rem;
  height: 1rem;
  border-radius: 9999px;
  background: var(--gradient);
  margin-bottom: 0.75rem;
  filter: blur(0.5px);
  opacity: var(--droplet-opacity, 0);
  transform: var(--droplet-transform, translateY(10px) scale(0.5));
  transition: opacity 0.4s ease-out;
  box-shadow: 0 0 15px color-mix(in srgb, var(--shadow-color) 40%, transparent);
  will-change: transform, opacity;
}

/* Main liquid bar with enhanced physics */
.liquid-bar {
  width: 2.25rem;
  height: var(--bar-height, 40px);
  background: var(--gradient);
  border-radius: 9999px;
  position: relative;
  overflow: hidden;
  transform: scaleY(var(--bar-scale-y, 1));
  transform-origin: bottom;
  filter: blur(0.3px);
  box-shadow:
    0 0 20px color-mix(in srgb, var(--shadow-color) 45%, transparent),
    inset 0 0 15px rgba(255, 255, 255, 0.25),
    0 4px 10px rgba(14, 15, 18, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.3);
  transition: height 0.15s ease-out;
  will-change: height, transform;
}

/* Liquid surface tension effect */
.liquid-tension {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1rem;
  background: linear-gradient(to bottom, rgba(255, 255, 255, 0.5), transparent);
  border-radius: 9999px;
  transform: var(--tension-transform, translateY(0));
}

/* Liquid wave effect */
.liquid-wave {
  position: absolute;
  inset: 0;
  border-radius: 9999px;
  background: linear-gradient(0deg, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0.1) 50%, transparent 100%);
  transform: var(--wave-transform, translateY(0));
}

/* Shimmer reflection */
.liquid-shimmer {
  position: absolute;
  inset: 0;
  width: 140%;
  left: -20%;
  border-radius: 9999px;
  background: linear-gradient(to right, transparent, rgba(255, 255, 255, 0.45), transparent);
  transform: var(--shimmer-transform, translateX(0));
}

/* Rising bubble */
.liquid-bubble {
  position: absolute;
  width: 0.5rem;
  height: 0.5rem;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 9999px;
  top: var(--bubble-top, 20%);
  left: var(--bubble-left, 30%);
  transform: scale(var(--bubble-scale, 0.5));
  opacity: var(--bubble-opacity, 0.3);
}

/* Enhanced base droplet */
.liquid-base-droplet {
  width: 0.75rem;
  height: 0.75rem;
  border-radius: 9999px;
  background: var(--gradient);
  margin-top: 0.5rem;
  filter: blur(0.2px);
  opacity: var(--base-opacity, 0.8);
  transform: scale(var(--base-scale, 0.8)) translateY(var(--base-y, 0px));
  box-shadow: 0 2px 8px color-mix(in srgb, var(--shadow-color) 40%, transparent);
}

@media (prefers-reduced-motion: reduce) {
  .liquid-bar,
  .liquid-top-droplet,
  .liquid-base-droplet,
  .liquid-tension,
  .liquid-wave,
  .liquid-shimmer,
  .liquid-bubble {
    transition: none !important;
    animation: none !important;
  }
}
</style>
