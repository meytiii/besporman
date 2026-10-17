<template>
  <Transition name="loading-curtain">
    <div
      v-if="isVisible"
      class="app-loading-screen"
      :class="{ 'is-exiting': isExiting }"
      role="dialog"
      aria-modal="true"
      aria-label="صفحه بارگذاری بسپر من"
    >
      <!-- Background Tactile Halftone Overlay -->
      <div class="loading-backdrop-pattern" />

      <!-- Centered Content Box -->
      <div class="loading-content">
        <!-- Liquid Animation -->
        <LiquidLoader variant="brand" />

        <!-- Persian Lalezar Loading Copy -->
        <div class="loading-title-wrapper">
          <h2 class="loading-title">
            داریم میرسیم عجله نکن!
          </h2>
          <span class="loading-dots">
            <span class="dot">.</span>
            <span class="dot">.</span>
            <span class="dot">.</span>
          </span>
        </div>

        <!-- Studio Subtitle -->
        <p class="loading-subtitle">
          آماده‌سازی کارگاه برنامه‌نویسی بسپر من
        </p>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import LiquidLoader from '@/components/ui/LiquidLoader.vue'

const isTestEnv = typeof import.meta !== 'undefined' && import.meta.env?.MODE === 'test'
const isVisible = ref(!isTestEnv)
const isExiting = ref(false)

const MINIMUM_DISPLAY_TIME_MS = 2000 // 2 seconds minimum display rule
const MAX_FALLBACK_TIMEOUT_MS = 6000 // Safety fallback in case slow network blocks an image

// Helper to verify that an image is fully decoded and ready
const isImageLoaded = (img: HTMLImageElement): boolean => {
  return img.complete && img.naturalHeight > 0
}

// Check top elements (navbar, header marquee, mascot, hero images)
const areTopElementsLoaded = (): boolean => {
  if (typeof document === 'undefined') return true

  // 1. Header / Navbar DOM existence
  const header = document.querySelector('.site-header') || document.querySelector('#navbar')
  if (!header) return false

  // 2. Mascot & Header Images check
  const topImages = Array.from(
    document.querySelectorAll<HTMLImageElement>(
      '.site-header img, .hero-section img, .mascot-stage img, .comic-sign-plate img'
    )
  )

  if (topImages.length > 0) {
    const allImagesLoaded = topImages.every(isImageLoaded)
    if (!allImagesLoaded) return false
  }

  return true
}

const waitForReadiness = async (): Promise<void> => {
  if (isTestEnv || typeof window === 'undefined') {
    return
  }

  // 1. Minimum 2 seconds timer promise
  const timerPromise = new Promise((resolve) => setTimeout(resolve, MINIMUM_DISPLAY_TIME_MS))

  // 2. Fonts readiness promise
  const fontsPromise = (document.fonts ? document.fonts.ready : Promise.resolve()).catch(() => {})

  // 3. Top elements polling promise
  const elementsPromise = new Promise<void>((resolve) => {
    const startTime = Date.now()

    const check = () => {
      if (areTopElementsLoaded() || Date.now() - startTime > MAX_FALLBACK_TIMEOUT_MS) {
        resolve()
      } else {
        requestAnimationFrame(check)
      }
    }

    if (document.readyState === 'complete') {
      check()
    } else {
      window.addEventListener('load', check, { once: true })
      // Also poll via RAF
      requestAnimationFrame(check)
    }
  })

  // Await both the minimum 2 seconds AND asset/header readiness
  await Promise.all([timerPromise, fontsPromise, elementsPromise])
}

const dismissLoadingScreen = () => {
  isExiting.value = true
  setTimeout(() => {
    isVisible.value = false
  }, 650) // Match curtain slide-up transition duration
}

onMounted(async () => {
  if (isTestEnv) {
    isVisible.value = false
    return
  }

  // Ensure fresh initial load starts at the top of the hero section
  if (typeof window !== 'undefined' && (!window.location.hash || window.location.hash === '#')) {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }

  try {
    await waitForReadiness()
  } finally {
    if (typeof window !== 'undefined' && (!window.location.hash || window.location.hash === '#')) {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    }
    dismissLoadingScreen()
  }
})
</script>

<style scoped>
.app-loading-screen {
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100dvh;
  z-index: 999999;
  background-color: var(--color-canvas, #FAF7F0);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  user-select: none;
  cursor: wait;
}

/* Halftone paper texture background */
.loading-backdrop-pattern {
  position: absolute;
  inset: 0;
  background-image: radial-gradient(var(--color-border-subtle, rgba(14, 15, 18, 0.08)) 1px, transparent 1px);
  background-size: 24px 24px;
  pointer-events: none;
}

/* Centered Container */
.loading-content {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--space-4, 1rem);
  text-align: center;
  padding: var(--space-6, 1.5rem);
  max-width: 90vw;
  direction: rtl;
}

/* Persian Title in Lalezar Font */
.loading-title-wrapper {
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 0.15rem;
  direction: rtl;
}

.loading-title {
  font-family: var(--font-display, 'Lalezar', cursive);
  font-size: clamp(2rem, 5vw, 3.25rem);
  color: var(--color-ink-primary, #0E0F12);
  line-height: 1.2;
  margin: 0;
  letter-spacing: 0;
  text-shadow: 2px 2px 0 var(--primitive-amber-100, #F0EAD6);
  animation: title-breath 2s ease-in-out infinite;
  direction: rtl;
}

/* Animated Comic Ellipsis Dots */
.loading-dots {
  display: inline-flex;
  direction: ltr;
  font-family: var(--font-display, 'Lalezar', cursive);
  font-size: clamp(2rem, 5vw, 3.25rem);
  color: var(--color-accent, #D93829);
  line-height: 1;
}

.dot {
  opacity: 0;
  animation: dot-pulse 1.5s infinite;
}
.dot:nth-child(1) { animation-delay: 0s; }
.dot:nth-child(2) { animation-delay: 0.3s; }
.dot:nth-child(3) { animation-delay: 0.6s; }

/* Subtitle */
.loading-subtitle {
  font-family: var(--font-body, 'Vazirmatn', sans-serif);
  font-size: var(--text-sm, 0.95rem);
  font-weight: 500;
  color: var(--color-ink-muted, #55575E);
  margin: 0;
  direction: rtl;
}

/* Keyframes */
@keyframes title-breath {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-4px);
  }
}

@keyframes dot-pulse {
  0%, 20% {
    opacity: 0;
    transform: translateY(0);
  }
  40% {
    opacity: 1;
    transform: translateY(-3px);
  }
  60%, 100% {
    opacity: 0;
    transform: translateY(0);
  }
}

/* Curtain Slide-up Exit Transition */
.loading-curtain-leave-active {
  transition: transform 0.65s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.5s ease;
}

.loading-curtain-leave-to {
  transform: translateY(-100%);
  opacity: 0;
}

@media (prefers-reduced-motion: reduce) {
  .loading-title,
  .dot {
    animation: none !important;
  }
  .loading-curtain-leave-active {
    transition: opacity 0.3s ease !important;
  }
  .loading-curtain-leave-to {
    transform: none !important;
    opacity: 0 !important;
  }
}
</style>
