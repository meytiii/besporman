<template>
  <component
    :is="as"
    ref="containerRef"
    :class="['text-reveal-root', `preset-${preset}`, className]"
    :style="computedRootStyle"
  >
    <!-- Screen Reader Accessible Text -->
    <span class="sr-only">{{ text }}</span>

    <!-- Animated Words with Intact Persian Ligatures -->
    <span
      v-for="(segment, idx) in segments"
      :key="`${idx}-${segment}`"
      class="text-reveal-segment"
      :class="[
        { 'is-revealed': isRevealed },
        isHighlighted(segment) ? (highlightClass || 'title-highlight') : ''
      ]"
      :style="{
        '--segment-index': idx,
        '--segment-delay': `${delay + (idx * staggerDelay)}s`,
        '--segment-duration': `${duration}s`
      }"
      aria-hidden="true"
    >{{ segment }}</span>
  </component>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

export type TextRevealPreset = 'blur' | 'fade-in-blur' | 'scale' | 'fade' | 'slide'
export type TextRevealPer = 'word' | 'line'

interface Props {
  text: string
  as?: string
  preset?: TextRevealPreset
  per?: TextRevealPer
  delay?: number
  speedReveal?: number
  speedSegment?: number
  trigger?: boolean
  className?: string
  once?: boolean
  highlight?: string
  highlightClass?: string
}

const props = withDefaults(defineProps<Props>(), {
  as: 'p',
  preset: 'fade-in-blur',
  per: 'word',
  delay: 0,
  speedReveal: 1,
  speedSegment: 1,
  trigger: undefined,
  className: '',
  once: true,
  highlight: '',
  highlightClass: '',
})

const isTestEnv = typeof import.meta !== 'undefined' && import.meta.env?.MODE === 'test'
const containerRef = ref<HTMLElement | null>(null)
const isRevealed = ref(isTestEnv)

const segments = computed(() => {
  if (!props.text) return []
  if (props.per === 'line') {
    return props.text.split('\n').filter((l) => l.trim().length > 0)
  }
  // Word level splitting preserving half-spaces (ZWNJ) and Persian words
  return props.text.trim().split(/\s+/).filter(Boolean)
})

const isHighlighted = (segment: string): boolean => {
  if (!props.highlight) return false
  const normalize = (str: string) => str.replace(/[!؟؛.,،«»\s\u200c]/g, '').trim()
  const cleanSeg = normalize(segment)
  if (!cleanSeg) return false

  const cleanHighlight = normalize(props.highlight)
  if (cleanHighlight.includes(cleanSeg)) return true

  const words = props.highlight.split(/\s+/).map(normalize)
  return words.some((w) => w && (w === cleanSeg || cleanSeg.includes(w)))
}

const staggerDelay = computed(() => {
  const baseStagger = props.per === 'line' ? 0.1 : 0.045
  return baseStagger / Math.max(props.speedReveal, 0.1)
})

const duration = computed(() => {
  return 0.42 / Math.max(props.speedSegment, 0.1)
})

const computedRootStyle = computed(() => {
  return {
    '--stagger-delay': `${staggerDelay.value}s`,
  }
})

let observer: IntersectionObserver | null = null

onMounted(() => {
  if (isTestEnv) {
    isRevealed.value = true
    return
  }

  if (props.trigger !== undefined) {
    isRevealed.value = props.trigger
    return
  }

  // Automatic IntersectionObserver trigger on scroll
  if (typeof window !== 'undefined' && typeof IntersectionObserver !== 'undefined' && containerRef.value) {
    observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        if (entry.isIntersecting) {
          isRevealed.value = true
          if (props.once && observer && containerRef.value) {
            observer.unobserve(containerRef.value)
          }
        } else if (!props.once) {
          isRevealed.value = false
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -30px 0px',
      }
    )
    observer.observe(containerRef.value)
  } else {
    isRevealed.value = true
  }
})

onUnmounted(() => {
  if (observer && containerRef.value) {
    observer.unobserve(containerRef.value)
    observer.disconnect()
  }
})
</script>

<style scoped>
.text-reveal-root {
  display: inline;
}

.text-reveal-segment {
  display: inline-block;
  white-space: nowrap;
  margin-inline-end: 0.28em;
  opacity: 0;
  transition-property: opacity, filter, transform;
  transition-duration: var(--segment-duration, 0.42s);
  transition-timing-function: cubic-bezier(0.2, 0.8, 0.2, 1);
  transition-delay: var(--segment-delay, 0s);
  will-change: opacity, filter, transform;
}

.text-reveal-segment:last-child {
  margin-inline-end: 0;
}

/* Preset: fade-in-blur (Default matching Motion/21st.dev specification) */
.preset-fade-in-blur .text-reveal-segment {
  filter: blur(12px);
  transform: translateY(18px);
}
.preset-fade-in-blur .text-reveal-segment.is-revealed {
  opacity: 1;
  filter: blur(0px);
  transform: translateY(0);
}

/* Preset: blur */
.preset-blur .text-reveal-segment {
  filter: blur(12px);
}
.preset-blur .text-reveal-segment.is-revealed {
  opacity: 1;
  filter: blur(0px);
}

/* Preset: fade */
.preset-fade .text-reveal-segment {
  opacity: 0;
}
.preset-fade .text-reveal-segment.is-revealed {
  opacity: 1;
}

/* Preset: scale */
.preset-scale .text-reveal-segment {
  transform: scale(0.7);
}
.preset-scale .text-reveal-segment.is-revealed {
  opacity: 1;
  transform: scale(1);
}

/* Preset: slide */
.preset-slide .text-reveal-segment {
  transform: translateY(20px);
}
.preset-slide .text-reveal-segment.is-revealed {
  opacity: 1;
  transform: translateY(0);
}

/* Highlighted segments */
.text-reveal-segment.title-highlight {
  color: var(--color-accent, #D93829) !important;
  text-decoration: underline;
  text-decoration-thickness: 4px;
  text-underline-offset: 6px;
}

/* Non-breaking space wrapper between words */
.text-reveal-space {
  display: inline;
}

@media (prefers-reduced-motion: reduce) {
  .text-reveal-segment {
    opacity: 1 !important;
    filter: none !important;
    transform: none !important;
    transition: none !important;
  }
}
</style>
