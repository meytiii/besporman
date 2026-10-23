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
        <!-- Modern macOS IDE Code Streaming Loader -->
        <ModernLoader />

        <!-- Persian Lalezar Loading Copy -->
        <div
          class="loading-title-wrapper"
          :class="{ 'font-loaded': isFontReady }"
        >
          <h2 class="loading-title">
            داریم میرسیم عجله نکن!
          </h2>
          <span class="loading-dots">
            <span class="dot">.</span>
            <span class="dot">.</span>
            <span class="dot">.</span>
          </span>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import ModernLoader from '@/components/ui/ModernLoader.vue'

const isTestEnv = typeof import.meta !== 'undefined' && import.meta.env?.MODE === 'test'
const isVisible = ref(!isTestEnv)
const isExiting = ref(false)

// Check if Lalezar font is already loaded and ready in the browser font set
const isFontReady = ref(
  isTestEnv ||
  (typeof document !== 'undefined' && 'fonts' in document && document.fonts.check('1em Lalezar'))
)

const ensureFontsLoaded = async (): Promise<void> => {
  if (isFontReady.value || typeof document === 'undefined' || !('fonts' in document)) {
    isFontReady.value = true
    return
  }

  const timeoutPromise = new Promise<void>((resolve) => setTimeout(resolve, 1200))
  const loadPromise = (async () => {
    try {
      await Promise.allSettled([
        document.fonts.load('400 1em Lalezar'),
        document.fonts.load('500 1em Vazirmatn'),
        document.fonts.ready,
      ])
    } catch {
      // Graceful fallback
    }
  })()

  await Promise.race([loadPromise, timeoutPromise])
  isFontReady.value = true
}

// Kick off font loading immediately if not ready
if (!isFontReady.value && typeof window !== 'undefined') {
  ensureFontsLoaded()
}

const CRITICAL_IMAGE_URLS = [
  '/pic/webp/header_1.webp',
  '/pic/webp/header_2.webp',
  '/pic/webp/header_3.webp',
  '/pic/webp/besporman1.webp',
  '/pic/webp/besporman2.webp',
  '/pic/webp/neon_sign_off.webp',
  '/pic/webp/neon_sign_on.webp',
  '/favicon.png',
  '/pic/webp/cursor.webp',
]

const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve) => {
    if (typeof window === 'undefined') return resolve()
    const img = new Image()
    img.src = src
    if (img.complete && img.naturalHeight > 0) {
      if ('decode' in img) {
        return img.decode().then(resolve).catch(resolve)
      }
      return resolve()
    }
    img.onload = () => {
      if ('decode' in img) {
        img.decode().then(resolve).catch(resolve)
      } else {
        resolve()
      }
    }
    img.onerror = () => resolve() // Don't block page if a secondary asset is missing
  })
}

const preloadAllCriticalImages = (): Promise<void> => {
  if (typeof window === 'undefined') return Promise.resolve()
  return Promise.allSettled(CRITICAL_IMAGE_URLS.map(preloadImage)).then(() => {})
}

// Wait for all currently mounted DOM <img> elements to be complete and decoded
const waitForDomImages = async (): Promise<void> => {
  if (typeof document === 'undefined') return

  const checkDomImages = (): Promise<void> => {
    const images = Array.from(document.querySelectorAll<HTMLImageElement>('img'))
    const pending = images.filter((img) => !img.complete || img.naturalHeight === 0)
    if (pending.length === 0) return Promise.resolve()

    return Promise.allSettled(
      pending.map((img) => {
        return new Promise<void>((resolve) => {
          if (img.complete && img.naturalHeight > 0) {
            if ('decode' in img) {
              return img.decode().then(resolve).catch(resolve)
            }
            return resolve()
          }
          img.addEventListener(
            'load',
            () => {
              if ('decode' in img) {
                img.decode().then(resolve).catch(resolve)
              } else {
                resolve()
              }
            },
            { once: true }
          )
          img.addEventListener('error', () => resolve(), { once: true })
        })
      })
    ).then(() => {})
  }

  // Check immediately and also after animation frame to capture child component renders
  await checkDomImages()
  await new Promise((r) => requestAnimationFrame(r))
  await checkDomImages()
}

// Wait for window load event (all document resources loaded)
const waitForWindowLoad = (): Promise<void> => {
  if (typeof document === 'undefined') return Promise.resolve()
  if (document.readyState === 'complete') {
    return Promise.resolve()
  }
  return new Promise<void>((resolve) => {
    window.addEventListener('load', () => resolve(), { once: true })
  })
}

const MINIMUM_DISPLAY_TIME_MS = 2000 // 2 seconds minimum display rule
const MAX_FALLBACK_TIMEOUT_MS = 8000 // Safety ceiling in case network stall occurs

const waitForReadiness = async (): Promise<void> => {
  if (isTestEnv || typeof window === 'undefined') {
    return
  }

  // 1. Minimum 2 seconds timer promise
  const timerPromise = new Promise((resolve) => setTimeout(resolve, MINIMUM_DISPLAY_TIME_MS))

  // 2. Comprehensive asset readiness: Fonts + Preload Critical Images + Window Load + DOM Images
  const assetsAndFontsPromise = Promise.all([
    ensureFontsLoaded(),
    preloadAllCriticalImages(),
    waitForWindowLoad(),
    waitForDomImages(),
  ])

  // 3. Fallback timeout to prevent trapping the user on broken connections
  const fallbackPromise = new Promise((resolve) => setTimeout(resolve, MAX_FALLBACK_TIMEOUT_MS))

  // Hold until all image assets and typography are loaded and decoded
  await Promise.race([assetsAndFontsPromise, fallbackPromise])

  // Also honor the minimum 2-second visual presentation
  await timerPromise
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

  // Developer inspection support
  const isDebugLoader = typeof window !== 'undefined' && window.location.search.includes('debug_loader')
  if (isDebugLoader) {
    isVisible.value = true
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
  padding: var(--space-4, 1rem);
  width: 100%;
  max-width: 520px;
  direction: rtl;
}

/* Persian Title in Lalezar Font */
.loading-title-wrapper {
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 0.15rem;
  direction: rtl;
  opacity: 0;
  transform: translateY(4px);
  transition: opacity 0.25s cubic-bezier(0.16, 1, 0.3, 1), transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  will-change: opacity, transform;
}

.loading-title-wrapper.font-loaded {
  opacity: 1;
  transform: translateY(0);
}

.loading-title {
  font-family: var(--font-display, 'Lalezar', cursive);
  font-size: clamp(1.35rem, 4.5vw, 2.5rem);
  white-space: nowrap;
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
  .loading-title-wrapper {
    transform: none !important;
    transition: opacity 0.1s ease !important;
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
