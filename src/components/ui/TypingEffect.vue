<template>
  <component
    :is="as"
    ref="rootRef"
    class="typing-effect-root"
    :class="className"
  >
    <!-- Screen reader accessible text for 100% SEO & accessibility compliance -->
    <span class="sr-only">{{ currentText }}</span>

    <!-- Ghost text preserving exact layout geometry and line wraps (Zero CLS) -->
    <span class="typing-ghost" aria-hidden="true">
      <template v-for="(line, lIdx) in currentText.split('\n')" :key="`g-${lIdx}`">
        <br v-if="lIdx > 0" />
        {{ line }}
      </template>
      <span v-if="cursor" class="typing-cursor-ghost"></span>
    </span>

    <!-- Visible typing text layer -->
    <span
      ref="textWrapperRef"
      class="typing-visible"
      :class="{ 'is-dissolving': isDissolving }"
      aria-hidden="true"
    >
      <template v-for="(seg, sIdx) in renderedSegments" :key="`s-${sIdx}`">
        <span :class="seg.isHighlight ? (highlightClass || 'title-highlight') : undefined">
          <template v-for="(line, lIdx) in seg.text.split('\n')" :key="`l-${lIdx}`">
            <br v-if="lIdx > 0" />
            {{ line }}
          </template>
        </span>
      </template>
      <span v-if="cursor && !isDissolving" class="typing-cursor"></span>
    </span>

    <!-- Sand particle dissolution canvas -->
    <canvas
      ref="canvasRef"
      class="sand-canvas"
      :class="{ 'is-active': isDissolving }"
      aria-hidden="true"
    ></canvas>
  </component>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'

interface Props {
  text?: string
  texts?: string[]
  className?: string
  rotationInterval?: number // ms to hold after full text typed (default 3000ms)
  typingSpeed?: number // ms per character (default 65ms)
  highlight?: string
  highlightClass?: string
  as?: string
  cursor?: boolean
  sandEffect?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  text: '',
  texts: undefined,
  className: '',
  rotationInterval: 3000,
  typingSpeed: 65,
  highlight: '',
  highlightClass: 'title-highlight',
  as: 'span',
  cursor: true,
  sandEffect: true,
})

const textList = computed<string[]>(() => {
  if (props.texts && props.texts.length > 0) return props.texts
  if (props.text) return [props.text]
  return ['بسپر من']
})

const currentTextIndex = ref(0)
const charIndex = ref(0)
const isDissolving = ref(false)
const isInView = ref(false)

const rootRef = ref<HTMLElement | null>(null)
const textWrapperRef = ref<HTMLElement | null>(null)
const canvasRef = ref<HTMLCanvasElement | null>(null)

const currentText = computed(() => {
  return textList.value[currentTextIndex.value % textList.value.length] || ''
})

const displayedText = computed(() => {
  return currentText.value.slice(0, charIndex.value)
})

// Highlight segment splitting
interface TextSegment {
  text: string
  isHighlight: boolean
}

const renderedSegments = computed<TextSegment[]>(() => {
  const displayed = displayedText.value
  if (!props.highlight) {
    return [{ text: displayed, isHighlight: false }]
  }

  const hIndex = currentText.value.indexOf(props.highlight)
  if (hIndex === -1 || displayed.length <= hIndex) {
    return [{ text: displayed, isHighlight: false }]
  }

  const pre = displayed.slice(0, hIndex)
  const hEnd = hIndex + props.highlight.length
  if (displayed.length <= hEnd) {
    const hPart = displayed.slice(hIndex)
    return [
      { text: pre, isHighlight: false },
      { text: hPart, isHighlight: true },
    ]
  }

  const hPart = displayed.slice(hIndex, hEnd)
  const post = displayed.slice(hEnd)
  return [
    { text: pre, isHighlight: false },
    { text: hPart, isHighlight: true },
    { text: post, isHighlight: false },
  ]
})

// Timers & particle system state
let typingTimer: ReturnType<typeof setTimeout> | null = null
let holdTimer: ReturnType<typeof setTimeout> | null = null
let animFrameId: number | null = null
let observer: IntersectionObserver | null = null

interface SandParticle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  color: string
  alpha: number
  decay: number
  wobble: number
  wobbleSpeed: number
}

const sandPalette = [
  '#FEF3C7', // Warm Amber
  '#F0EAD6', // Tan Neutral
  '#D4A373', // Golden Desert Sand
  '#E5C39E', // Pale Sand Grain
  '#0E0F12', // Charcoal Ink Fleck
  '#27272A', // Muted Ink Fleck
  '#D93829', // Comic Accent Red Fleck
]

const clearTimers = () => {
  if (typingTimer) {
    clearTimeout(typingTimer)
    typingTimer = null
  }
  if (holdTimer) {
    clearTimeout(holdTimer)
    holdTimer = null
  }
  if (animFrameId) {
    cancelAnimationFrame(animFrameId)
    animFrameId = null
  }
}

// Particle dissolution simulation
const triggerSandDissolve = () => {
  if (!props.sandEffect || typeof window === 'undefined') {
    isDissolving.value = false
    charIndex.value = 0
    currentTextIndex.value = (currentTextIndex.value + 1) % textList.value.length
    stepTyping()
    return
  }

  const canvas = canvasRef.value
  const textWrapper = textWrapperRef.value
  if (!canvas || !textWrapper) {
    isDissolving.value = false
    charIndex.value = 0
    currentTextIndex.value = (currentTextIndex.value + 1) % textList.value.length
    stepTyping()
    return
  }

  const rect = textWrapper.getBoundingClientRect()
  if (rect.width <= 0 || rect.height <= 0) {
    isDissolving.value = false
    charIndex.value = 0
    currentTextIndex.value = (currentTextIndex.value + 1) % textList.value.length
    stepTyping()
    return
  }

  const dpr = Math.min(window.devicePixelRatio || 1, 2)
  const padX = 60
  const padY = 70

  const width = Math.ceil(rect.width + padX * 2)
  const height = Math.ceil(rect.height + padY * 2)

  canvas.width = width * dpr
  canvas.height = height * dpr
  canvas.style.width = `${width}px`
  canvas.style.height = `${height}px`
  canvas.style.top = `-${padY}px`
  canvas.style.insetInlineStart = `-${padX}px`

  const ctx = canvas.getContext('2d')
  if (!ctx) return

  ctx.scale(dpr, dpr)

  // Generate sand particles across the text surface
  const particles: SandParticle[] = []
  const particleCount = Math.min(Math.max(Math.round(rect.width * 2.8), 280), 750)

  for (let i = 0; i < particleCount; i++) {
    const rx = Math.random() * rect.width
    const ry = Math.random() * rect.height

    particles.push({
      x: rx + padX,
      y: ry + padY,
      vx: (Math.random() - 0.48) * 2.6, // Drift sideways with slight breeze
      vy: -(Math.random() * 2.8 + 1.2), // Float upward into the air
      size: Math.random() * 2.0 + 1.0,
      color: sandPalette[Math.floor(Math.random() * sandPalette.length)],
      alpha: 1.0,
      decay: Math.random() * 0.013 + 0.008,
      wobble: Math.random() * Math.PI * 2,
      wobbleSpeed: Math.random() * 0.08 + 0.03,
    })
  }

  // Activate dissolve state to hide underlying solid text
  isDissolving.value = true

  const renderParticles = () => {
    ctx.clearRect(0, 0, width, height)
    let activeParticles = 0

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i]
      if (p.alpha <= 0) continue

      p.x += p.vx + Math.sin(p.wobble) * 0.7
      p.y += p.vy
      p.vy -= 0.012 // Gentle upward air lift
      p.wobble += p.wobbleSpeed
      p.alpha -= p.decay

      if (p.alpha > 0) {
        activeParticles++
        ctx.fillStyle = p.color
        ctx.globalAlpha = Math.max(0, p.alpha)
        ctx.fillRect(p.x, p.y, p.size, p.size)
      }
    }

    if (activeParticles > 0) {
      animFrameId = requestAnimationFrame(renderParticles)
    } else {
      // Sand grains have completely disappeared into the air
      ctx.clearRect(0, 0, width, height)
      animFrameId = null

      holdTimer = setTimeout(() => {
        isDissolving.value = false
        charIndex.value = 0
        currentTextIndex.value = (currentTextIndex.value + 1) % textList.value.length
        stepTyping()
      }, 350)
    }
  }

  animFrameId = requestAnimationFrame(renderParticles)
}

// Typing progression step
const stepTyping = () => {
  clearTimers()

  if (!isInView.value) return

  if (charIndex.value < currentText.value.length) {
    typingTimer = setTimeout(() => {
      charIndex.value++
      stepTyping()
    }, props.typingSpeed)
  } else {
    // Whole title is typed -> hold for 3 seconds before sand dissolution
    holdTimer = setTimeout(() => {
      triggerSandDissolve()
    }, props.rotationInterval)
  }
}

watch(isInView, (visible) => {
  if (visible) {
    stepTyping()
  } else {
    clearTimers()
  }
})

onMounted(() => {
  if (typeof window !== 'undefined') {
    const isReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (isReduced) {
      charIndex.value = currentText.value.length
      isInView.value = true
      return
    }

    if (typeof IntersectionObserver !== 'undefined' && rootRef.value) {
      observer = new IntersectionObserver(
        (entries) => {
          const [entry] = entries
          if (entry.isIntersecting) {
            isInView.value = true
          }
        },
        { threshold: 0.1 }
      )
      observer.observe(rootRef.value)
    } else {
      isInView.value = true
    }
  } else {
    isInView.value = true
  }
})

onUnmounted(() => {
  clearTimers()
  if (observer && rootRef.value) {
    observer.unobserve(rootRef.value)
    observer.disconnect()
  }
})
</script>

<style scoped>
.typing-effect-root {
  position: relative;
  display: inline-block;
  line-height: inherit;
  font-family: inherit;
  font-size: inherit;
  font-weight: inherit;
  text-align: inherit;
}

/* Ghost text to lock layout width and height (Zero CLS) */
.typing-ghost {
  visibility: hidden;
  opacity: 0;
  pointer-events: none;
  user-select: none;
  display: inline-block;
}

.typing-cursor-ghost {
  display: inline-block;
  width: 3px;
  height: 0.88em;
  margin-inline-start: 4px;
}

/* Visible typing layer layered on top of ghost text */
.typing-visible {
  position: absolute;
  top: 0;
  inset-inline-start: 0;
  width: 100%;
  height: 100%;
  display: inline-block;
  opacity: 1;
  transition: opacity 0.25s ease;
  pointer-events: auto;
  text-align: inherit;
}

.typing-visible.is-dissolving {
  opacity: 0;
  pointer-events: none;
}

/* Blinking Cursor in Comic Accent Red */
.typing-cursor {
  display: inline-block;
  width: 3.5px;
  height: 0.88em;
  background-color: var(--color-accent, #D93829);
  vertical-align: -0.06em;
  margin-inline-start: 4px;
  border-radius: 1px;
  animation: typing-blink 0.8s ease-in-out infinite;
}

@keyframes typing-blink {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
}

/* Highlighted words within typed text */
:deep(.title-highlight) {
  color: var(--color-accent, #D93829) !important;
  text-decoration: underline;
  text-decoration-thickness: 4px;
  text-underline-offset: 6px;
}

/* Sand Dissolution Overlay Canvas */
.sand-canvas {
  position: absolute;
  pointer-events: none;
  z-index: 20;
  opacity: 0;
  transition: opacity 0.15s ease;
}

.sand-canvas.is-active {
  opacity: 1;
}

@media (prefers-reduced-motion: reduce) {
  .typing-cursor {
    display: none !important;
  }
  .typing-visible {
    opacity: 1 !important;
  }
  .sand-canvas {
    display: none !important;
  }
}
</style>
