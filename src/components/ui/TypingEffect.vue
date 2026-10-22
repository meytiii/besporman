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
      <span
        v-if="cursor"
        class="typing-cursor"
        :class="{ 'is-blinking': isBlinkingCursor }"
      ></span>
    </span>
  </component>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'

export type TypingPhase = 'typing' | 'pause-typed' | 'deleting' | 'pause-cleared'

interface Props {
  text?: string
  texts?: string[]
  className?: string
  holdDelay?: number // ms to wait after full text typed (default: 2000ms = 2s)
  clearedDelay?: number // ms to wait after text is cleared (default: 1500ms = 1.5s)
  typingSpeed?: number // ms per character forward typing (default: 65ms)
  deletingSpeed?: number // ms per character backspacing (default: 25ms - quicker than typing)
  rotationInterval?: number // backward-compatibility alias for holdDelay
  highlight?: string
  highlightClass?: string
  as?: string
  cursor?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  text: '',
  texts: undefined,
  className: '',
  holdDelay: 2000,
  clearedDelay: 1500,
  typingSpeed: 65,
  deletingSpeed: 25,
  rotationInterval: undefined,
  highlight: '',
  highlightClass: 'title-highlight',
  as: 'span',
  cursor: true,
})

const textList = computed<string[]>(() => {
  if (props.texts && props.texts.length > 0) return props.texts
  if (props.text) return [props.text]
  return ['بسپر من']
})

const effectiveHoldDelay = computed(() => {
  return props.rotationInterval !== undefined ? props.rotationInterval : props.holdDelay
})

const currentTextIndex = ref(0)
const charIndex = ref(0)
const phase = ref<TypingPhase>('typing')
const isInView = ref(false)

const rootRef = ref<HTMLElement | null>(null)
const textWrapperRef = ref<HTMLElement | null>(null)

const currentText = computed(() => {
  return textList.value[currentTextIndex.value % textList.value.length] || ''
})

const displayedText = computed(() => {
  return currentText.value.slice(0, charIndex.value)
})

const isBlinkingCursor = computed(() => {
  return phase.value === 'pause-typed' || phase.value === 'pause-cleared'
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

// Timer management
let stepTimer: ReturnType<typeof setTimeout> | null = null
let observer: IntersectionObserver | null = null

const clearTimers = () => {
  if (stepTimer) {
    clearTimeout(stepTimer)
    stepTimer = null
  }
}

// Typing & Backspacing Cycle
const runCycle = () => {
  clearTimers()

  if (!isInView.value) return

  const targetText = currentText.value

  if (phase.value === 'typing') {
    if (charIndex.value < targetText.length) {
      stepTimer = setTimeout(() => {
        charIndex.value++
        runCycle()
      }, props.typingSpeed)
    } else {
      // Full title is typed -> pause for 2 seconds
      phase.value = 'pause-typed'
      stepTimer = setTimeout(() => {
        phase.value = 'deleting'
        runCycle()
      }, effectiveHoldDelay.value)
    }
  } else if (phase.value === 'deleting') {
    if (charIndex.value > 0) {
      // Rapid backspacing (quicker than forward typing)
      stepTimer = setTimeout(() => {
        charIndex.value--
        runCycle()
      }, props.deletingSpeed)
    } else {
      // Entire title is cleared -> wait for 1.5 seconds before typing again
      phase.value = 'pause-cleared'
      stepTimer = setTimeout(() => {
        currentTextIndex.value = (currentTextIndex.value + 1) % textList.value.length
        phase.value = 'typing'
        runCycle()
      }, props.clearedDelay)
    }
  }
}

watch(isInView, (visible) => {
  if (visible) {
    runCycle()
  } else {
    clearTimers()
  }
}, { flush: 'sync' })

onMounted(() => {
  if (typeof window !== 'undefined') {
    const isReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (isReduced) {
      charIndex.value = currentText.value.length
      phase.value = 'pause-typed'
      isInView.value = true
      return
    }

    // In test environment, activate immediately without waiting for observer
    if (import.meta.env?.MODE === 'test') {
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
  width: 3.5px;
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
  pointer-events: auto;
  text-align: inherit;
}

/* Comic Accent Red Cursor */
.typing-cursor {
  display: inline-block;
  width: 3.5px;
  height: 0.88em;
  background-color: var(--color-accent, #D93829);
  vertical-align: -0.06em;
  margin-inline-start: 4px;
  border-radius: 1px;
}

.typing-cursor.is-blinking {
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

@media (prefers-reduced-motion: reduce) {
  .typing-cursor {
    display: none !important;
  }
  .typing-visible {
    opacity: 1 !important;
  }
}
</style>
