<template>
  <div ref="wrapperRef" class="lazy-section-wrapper" :style="{ minHeight: `${minHeight}px` }">
    <slot v-if="shouldRender" />
    <slot v-else name="skeleton">
      <SectionSkeleton :min-height="minHeight" :columns="columns" :card-count="cardCount" />
    </slot>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import SectionSkeleton from '@/components/skeletons/SectionSkeleton.vue'

interface Props {
  targetId?: string
  minHeight?: number
  columns?: number
  cardCount?: number
  rootMargin?: string
}

const props = withDefaults(defineProps<Props>(), {
  targetId: '',
  minHeight: 450,
  columns: 3,
  cardCount: 3,
  rootMargin: '450px 0px',
})

const route = useRoute()
const isTestEnv = typeof import.meta !== 'undefined' && import.meta.env?.MODE === 'test'
const wrapperRef = ref<HTMLElement | null>(null)
const shouldRender = ref(isTestEnv)
let observer: IntersectionObserver | null = null

// Watch route hash for cross-route or in-page anchor jumps
watch(
  () => route?.hash,
  (hash) => {
    if (props.targetId && hash === `#${props.targetId}`) {
      shouldRender.value = true
    }
  }
)

onMounted(() => {
  // If in automated test environment or direct hash anchor matching this section, mount immediately
  if (import.meta.env.MODE === 'test') {
    shouldRender.value = true
    return
  }

  if (props.targetId && (typeof window !== 'undefined' && window.location.hash === `#${props.targetId}` || route?.hash === `#${props.targetId}`)) {
    shouldRender.value = true
    return
  }

  if (typeof IntersectionObserver === 'undefined') {
    shouldRender.value = true
    return
  }

  observer = new IntersectionObserver(
    (entries) => {
      const [entry] = entries
      if (entry.isIntersecting) {
        shouldRender.value = true
        if (observer && wrapperRef.value) {
          observer.unobserve(wrapperRef.value)
          observer.disconnect()
          observer = null
        }
      }
    },
    {
      rootMargin: props.rootMargin,
      threshold: 0.01,
    }
  )

  if (wrapperRef.value) {
    observer.observe(wrapperRef.value)
  }
})

onUnmounted(() => {
  if (observer) {
    observer.disconnect()
    observer = null
  }
})
</script>

<style scoped>
.lazy-section-wrapper {
  width: 100%;
  content-visibility: auto;
  contain-intrinsic-size: 1px 500px;
}
</style>
