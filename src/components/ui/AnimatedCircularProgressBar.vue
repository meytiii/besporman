<template>
  <div
    class="circular-progress-root"
    :style="{
      '--progress-size': `${size}px`,
      '--circumference': `${circumference}px`,
      '--gauge-primary': gaugePrimaryColor,
      '--gauge-secondary': gaugeSecondaryColor,
    }"
    role="progressbar"
    :aria-valuenow="Math.round(currentPercent)"
    :aria-valuemin="min"
    :aria-valuemax="max"
    :aria-label="ariaLabel || `میزان تکمیل فرم: ${Math.round(currentPercent)} درصد`"
  >
    <svg
      class="progress-svg"
      viewBox="0 0 100 100"
      fill="none"
      aria-hidden="true"
    >
      <!-- Background Gauge Track -->
      <circle
        cx="50"
        cy="50"
        r="42"
        :stroke-width="strokeWidth"
        class="progress-track"
      />

      <!-- Active Animated Progress Arc -->
      <circle
        cx="50"
        cy="50"
        r="42"
        :stroke-width="strokeWidth"
        stroke-linecap="round"
        class="progress-indicator"
        :style="{
          strokeDasharray: `${indicatorStrokeLength}px ${circumference}px`,
        }"
      />
    </svg>

    <!-- Percentage Label Centered in Circle -->
    <div v-if="showValue" class="progress-label-box" aria-hidden="true">
      <span class="progress-value font-mono">{{ formatPersianPercent(Math.round(currentPercent)) }}</span>
      <span class="progress-percent-symbol">٪</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  value: number
  min?: number
  max?: number
  size?: number
  strokeWidth?: number
  gaugePrimaryColor?: string
  gaugeSecondaryColor?: string
  showValue?: boolean
  ariaLabel?: string
}

const props = withDefaults(defineProps<Props>(), {
  min: 0,
  max: 100,
  size: 54,
  strokeWidth: 9,
  gaugePrimaryColor: '#D93829',
  gaugeSecondaryColor: 'rgba(14, 15, 18, 0.12)',
  showValue: true,
  ariaLabel: '',
})

// Radius = 42 -> Circumference = 2 * PI * 42 = 263.8937
const circumference = 2 * Math.PI * 42

const currentPercent = computed(() => {
  const range = props.max - props.min
  if (range <= 0) return 0
  const normalized = ((props.value - props.min) / range) * 100
  return Math.min(100, Math.max(0, normalized))
})

const indicatorStrokeLength = computed(() => {
  return (currentPercent.value / 100) * circumference
})

const formatPersianPercent = (num: number): string => {
  const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹']
  return num.toString().replace(/\d/g, (d) => persianDigits[parseInt(d, 10)])
}
</script>

<style scoped>
.circular-progress-root {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: var(--progress-size);
  height: var(--progress-size);
  flex-shrink: 0;
  user-select: none;
}

.progress-svg {
  width: 100%;
  height: 100%;
  transform: rotate(-90deg);
  overflow: visible;
}

.progress-track {
  stroke: var(--gauge-secondary);
  stroke-dasharray: var(--circumference) var(--circumference);
  transition: stroke 0.3s ease;
}

.progress-indicator {
  stroke: var(--gauge-primary);
  stroke-dashoffset: 0;
  transition: stroke-dasharray 0.65s cubic-bezier(0.16, 1, 0.3, 1), stroke 0.3s ease;
  filter: drop-shadow(0 1px 2px rgba(217, 56, 41, 0.25));
}

.progress-label-box {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1px;
  direction: ltr;
}

.progress-value {
  font-family: var(--font-body, 'Vazirmatn', sans-serif);
  font-size: calc(var(--progress-size) * 0.26);
  font-weight: 800;
  color: var(--color-ink-primary, #0E0F12);
  line-height: 1;
}

.progress-percent-symbol {
  font-family: var(--font-body, 'Vazirmatn', sans-serif);
  font-size: calc(var(--progress-size) * 0.18);
  font-weight: 700;
  color: var(--color-ink-muted, #5A5D64);
  line-height: 1;
}

@media (prefers-reduced-motion: reduce) {
  .progress-indicator {
    transition: none !important;
  }
}
</style>
