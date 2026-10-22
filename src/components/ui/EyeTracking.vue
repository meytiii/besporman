<template>
  <div
    class="eye-tracking-container"
    :class="className"
    :style="{ gap: `${gap}px` }"
    aria-hidden="true"
  >
    <div
      v-for="(_, index) in eyeCount"
      :key="index"
      :ref="(el) => setEyeRef(el as HTMLElement, index)"
      class="tracking-eye"
      :class="[`variant-${variant}`, { 'is-blinking': isBlinking[index] }]"
      :style="eyeStyle"
    >
      <!-- Sclera Surface Details / Comic Shading -->
      <div class="sclera-inner" :style="{ backgroundColor: scleraColor }">
        <!-- Iris Layer (Smoothly translated by cursor tracking) -->
        <div
          class="tracking-iris"
          :style="getIrisStyle(index)"
        >
          <!-- Iris Comic Ring Pattern -->
          <div
            v-if="showIrisDetail"
            class="iris-detail-ring"
            :style="{ borderColor: `${irisColor}44` }"
          ></div>

          <!-- Pupil Layer (Reacts with dilation based on proximity) -->
          <div
            class="tracking-pupil"
            :style="getPupilStyle(index)"
          ></div>

          <!-- High-Contrast Light Reflections (Comic Glints) -->
          <div v-if="showReflection" class="reflection-primary"></div>
          <div v-if="showReflection" class="reflection-secondary"></div>
        </div>

        <!-- Upper & Lower Eyelid Shadows for Tactile Depth -->
        <div v-if="showEyelids" class="eyelid-shadow-top"></div>
        <div v-if="showEyelids" class="eyelid-shadow-bottom"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted, onUnmounted } from 'vue'

interface Props {
  className?: string
  eyeSize?: number
  gap?: number
  irisColor?: string
  irisColorSecondary?: string
  pupilColor?: string
  scleraColor?: string
  pupilRange?: number
  showReflection?: boolean
  showIrisDetail?: boolean
  idleAnimation?: boolean
  blinkInterval?: number
  eyeCount?: number
  variant?: 'comic' | 'cartoon' | 'minimal' | 'realistic'
  reactivePupil?: boolean
  showEyelids?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  className: '',
  eyeSize: 48,
  gap: 14,
  irisColor: '#0E0F12',
  irisColorSecondary: '#27272A',
  pupilColor: '#0E0F12',
  scleraColor: '#FAF7F0',
  pupilRange: 0.72,
  showReflection: true,
  showIrisDetail: true,
  idleAnimation: true,
  blinkInterval: 3800,
  eyeCount: 2,
  variant: 'comic',
  reactivePupil: true,
  showEyelids: true,
})

const eyeElements = ref<HTMLElement[]>([])
const setEyeRef = (el: HTMLElement | null, idx: number) => {
  if (el) eyeElements.value[idx] = el
}

const isBlinking = reactive<boolean[]>([false, false])
const pupilScales = reactive<number[]>([1, 1])

// Damped spring offsets for each eye
interface EyeOffset {
  currentX: number
  currentY: number
  targetX: number
  targetY: number
}

const eyeOffsets = reactive<EyeOffset[]>([
  { currentX: 0, currentY: 0, targetX: 0, targetY: 0 },
  { currentX: 0, currentY: 0, targetX: 0, targetY: 0 },
])

const irisSize = computed(() => props.eyeSize * 0.5)
const pupilSize = computed(() => irisSize.value * 0.54)
const maxOffset = computed(() => (props.eyeSize / 2 - irisSize.value / 2) * props.pupilRange)

const eyeStyle = computed(() => ({
  width: `${props.eyeSize}px`,
  height: `${props.eyeSize * (props.variant === 'cartoon' ? 1.05 : 0.95)}px`,
}))

const getIrisStyle = (idx: number) => {
  const offset = eyeOffsets[idx] || { currentX: 0, currentY: 0 }
  return {
    width: `${irisSize.value}px`,
    height: `${irisSize.value}px`,
    left: `calc(50% - ${irisSize.value / 2}px)`,
    top: `calc(50% - ${irisSize.value / 2}px)`,
    transform: `translate3d(${offset.currentX}px, ${offset.currentY}px, 0)`,
    background:
      props.variant === 'comic'
        ? `radial-gradient(circle at 40% 40%, ${props.irisColorSecondary}, ${props.irisColor} 70%)`
        : `radial-gradient(circle at 35% 35%, ${props.irisColorSecondary}, ${props.irisColor} 75%)`,
  }
}

const getPupilStyle = (idx: number) => {
  const scale = props.reactivePupil ? pupilScales[idx] || 1 : 1
  return {
    width: `${pupilSize.value}px`,
    height: `${pupilSize.value}px`,
    left: `calc(50% - ${pupilSize.value / 2}px)`,
    top: `calc(50% - ${pupilSize.value / 2}px)`,
    transform: `scale(${scale})`,
    backgroundColor: props.pupilColor,
  }
}

let mouseX = typeof window !== 'undefined' ? window.innerWidth / 2 : 0
let mouseY = typeof window !== 'undefined' ? window.innerHeight / 2 : 0
let animFrameId: number | null = null
const blinkTimers: ReturnType<typeof setTimeout>[] = []
let blinkIntervalId: ReturnType<typeof setInterval> | null = null
let idleIntervalId: ReturnType<typeof setInterval> | null = null

// Tracking and spring damping loop
const updatePhysics = () => {
  for (let i = 0; i < eyeElements.value.length; i++) {
    const el = eyeElements.value[i]
    if (!el) continue

    const rect = el.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    const dx = mouseX - centerX
    const dy = mouseY - centerY
    const dist = Math.sqrt(dx * dx + dy * dy)
    const angle = Math.atan2(dy, dx)

    const reach = maxOffset.value * 3.5
    const clampedDist = Math.min(dist, reach)
    const normalizedDist = clampedDist / reach
    const targetDistance = normalizedDist * maxOffset.value

    const offset = eyeOffsets[i]
    if (offset) {
      offset.targetX = Math.cos(angle) * targetDistance
      offset.targetY = Math.sin(angle) * targetDistance

      // Smooth critically-damped spring interpolation
      offset.currentX += (offset.targetX - offset.currentX) * 0.18
      offset.currentY += (offset.targetY - offset.currentY) * 0.18
    }

    // Reactive pupil dilation based on mouse proximity
    if (props.reactivePupil) {
      if (dist < 180) {
        pupilScales[i] = 1.25 - (dist / 180) * 0.25
      } else {
        pupilScales[i] = 0.9 + Math.min(dist / 900, 1) * 0.1
      }
    }
  }

  animFrameId = requestAnimationFrame(updatePhysics)
}

const handleMouseMove = (e: MouseEvent) => {
  mouseX = e.clientX
  mouseY = e.clientY
}

const handleTouchMove = (e: TouchEvent) => {
  if (e.touches && e.touches[0]) {
    mouseX = e.touches[0].clientX
    mouseY = e.touches[0].clientY
  }
}

// Organic blinking with independent eye offset
const triggerBlink = (eyeIdx: number) => {
  isBlinking[eyeIdx] = true
  const t = setTimeout(() => {
    isBlinking[eyeIdx] = false
  }, 140)
  blinkTimers.push(t)
}

const startBlinkingRoutine = () => {
  if (props.blinkInterval <= 0) return

  blinkIntervalId = setInterval(() => {
    // Left eye blinks
    triggerBlink(0)

    // Right eye blinks with 40-90ms natural human desync
    const desync = setTimeout(() => {
      triggerBlink(1)
    }, 45 + Math.random() * 50)
    blinkTimers.push(desync)
  }, props.blinkInterval + Math.random() * 1200)
}

// Idle micro-movements when cursor sits still
let lastMouseX = 0
let lastMouseY = 0

const startIdleCheck = () => {
  if (!props.idleAnimation) return

  idleIntervalId = setInterval(() => {
    if (Math.abs(mouseX - lastMouseX) < 2 && Math.abs(mouseY - lastMouseY) < 2) {
      const wanderX = mouseX + (Math.random() - 0.5) * 60
      const wanderY = mouseY + (Math.random() - 0.5) * 40
      mouseX = wanderX
      mouseY = wanderY

      setTimeout(() => {
        mouseX = lastMouseX
        mouseY = lastMouseY
      }, 700)
    }
    lastMouseX = mouseX
    lastMouseY = mouseY
  }, 3500)
}

onMounted(() => {
  if (typeof window !== 'undefined') {
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('touchmove', handleTouchMove, { passive: true })

    animFrameId = requestAnimationFrame(updatePhysics)
    startBlinkingRoutine()
    startIdleCheck()
  }
})

onUnmounted(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('mousemove', handleMouseMove)
    window.removeEventListener('touchmove', handleTouchMove)
  }

  if (animFrameId) {
    cancelAnimationFrame(animFrameId)
    animFrameId = null
  }

  if (blinkIntervalId) {
    clearInterval(blinkIntervalId)
    blinkIntervalId = null
  }

  if (idleIntervalId) {
    clearInterval(idleIntervalId)
    idleIntervalId = null
  }

  blinkTimers.forEach(clearTimeout)
  blinkTimers.length = 0
})
</script>

<style scoped>
.eye-tracking-container {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  user-select: none;
}

.tracking-eye {
  position: relative;
  border-radius: var(--border-radius-full);
  overflow: hidden;
  border: var(--border-width-bold) solid var(--color-border-bold, #0E0F12);
  box-shadow: 2px 2px 0 var(--color-border-bold, #0E0F12);
  transition: transform 0.12s cubic-bezier(0.4, 0, 0.2, 1);
  will-change: transform;
}

.tracking-eye.is-blinking {
  transform: scaleY(0.08);
}

.sclera-inner {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: inherit;
  overflow: hidden;
}

/* Iris & Pupil */
.tracking-iris {
  position: absolute;
  border-radius: var(--border-radius-full);
  will-change: transform;
  border: 1.5px solid rgba(14, 15, 18, 0.4);
}

.iris-detail-ring {
  position: absolute;
  inset: 18%;
  border-radius: var(--border-radius-full);
  border: 1px dashed;
  pointer-events: none;
}

.tracking-pupil {
  position: absolute;
  border-radius: var(--border-radius-full);
  transition: transform 0.25s ease-out;
}

/* Comic Light Reflections (Glints) */
.reflection-primary {
  position: absolute;
  width: 32%;
  height: 32%;
  top: 18%;
  left: 20%;
  border-radius: var(--border-radius-full);
  background-color: var(--primitive-white, #FFFFFF);
  box-shadow: 0 0 2px rgba(255, 255, 255, 0.8);
  pointer-events: none;
}

.reflection-secondary {
  position: absolute;
  width: 14%;
  height: 14%;
  bottom: 22%;
  right: 22%;
  border-radius: var(--border-radius-full);
  background-color: rgba(255, 255, 255, 0.75);
  pointer-events: none;
}

/* Eyelid Shadows */
.eyelid-shadow-top {
  position: absolute;
  inset-inline: 0;
  top: 0;
  height: 30%;
  background: linear-gradient(to bottom, rgba(14, 15, 18, 0.12) 0%, transparent 100%);
  pointer-events: none;
}

.eyelid-shadow-bottom {
  position: absolute;
  inset-inline: 0;
  bottom: 0;
  height: 18%;
  background: linear-gradient(to top, rgba(14, 15, 18, 0.08) 0%, transparent 100%);
  pointer-events: none;
}

@media (prefers-reduced-motion: reduce) {
  .tracking-iris {
    transform: none !important;
  }
  .tracking-eye.is-blinking {
    transform: none !important;
  }
}
</style>
