<template>
  <div
    v-if="isSupported"
    ref="cursorContainerRef"
    class="custom-cursor-root"
    :class="{
      'is-visible': isVisible,
      'is-interactive': isInteractive,
      'is-pressed': isPressed,
      'is-text': isText,
      'is-dropdown': isDropdown,
    }"
    aria-hidden="true"
    dir="ltr"
  >
    <!-- Comic Tap Burst Feedback -->
    <span
      v-for="burst in bursts"
      :key="burst.id"
      class="cursor-comic-burst"
    />

    <!-- Pointing Hand Art Wrapper -->
    <div class="cursor-hand-wrapper">
      <img
        :src="cursorImg"
        alt=""
        class="cursor-hand-img"
        width="34"
        height="80"
        draggable="false"
        loading="eager"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import cursorImg from '../../pic/webp/cursor.webp'

interface ComicBurst {
  id: number
}

const cursorContainerRef = ref<HTMLDivElement | null>(null)
const isSupported = ref(false)
const isVisible = ref(false)
const isInteractive = ref(false)
const isPressed = ref(false)
const isText = ref(false)
const isDropdown = ref(false)
const bursts = ref<ComicBurst[]>([])

let mouseX = -200
let mouseY = -200
let rafId: number | null = null
let burstCounter = 0
let mediaQueryList: MediaQueryList | null = null

const renderCursor = () => {
  rafId = null
  if (cursorContainerRef.value) {
    cursorContainerRef.value.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`
  }
}

const checkTargetState = (target: EventTarget | null) => {
  if (!target || !(target instanceof Element)) {
    isInteractive.value = false
    isText.value = false
    isDropdown.value = false
    return
  }

  // 1. Dropdown options & flyout: let dedicated dropdown pointing cursor take over seamlessly
  const dropdownFlyout = target.closest('.dropdown-menu-card, .dropdown-option-item')
  if (dropdownFlyout) {
    isDropdown.value = true
    isInteractive.value = false
    isText.value = false
    return
  }
  isDropdown.value = false

  // 2. Text input or editable area: let native I-beam take over
  const textElement = target.closest(
    'input:not([type="button"]):not([type="submit"]):not([type="checkbox"]):not([type="radio"]):not([type="file"]), textarea, [contenteditable="true"]'
  )
  if (textElement) {
    isText.value = true
    isInteractive.value = false
    return
  }
  isText.value = false

  // 3. Interactive target: links, buttons, custom clickable widgets
  const clickable = target.closest(
    'a, button, [role="button"], .btn, input[type="submit"], input[type="button"], select, summary, [tabindex]:not([tabindex="-1"]), .interactive'
  )
  if (clickable) {
    isInteractive.value = true
    return
  }

  // 4. Fallback: Computed CSS pointer cursor
  try {
    const computed = window.getComputedStyle(target).cursor
    isInteractive.value = computed === 'pointer'
  } catch {
    isInteractive.value = false
  }
}

const handlePointerMove = (e: PointerEvent | MouseEvent) => {
  // Only track fine pointer (ignore touch taps)
  if ('pointerType' in e && e.pointerType && e.pointerType === 'touch') return

  mouseX = e.clientX
  mouseY = e.clientY

  if (!isVisible.value) {
    isVisible.value = true
    document.body.classList.add('has-custom-cursor')
  }

  checkTargetState(e.target)

  if (!rafId) {
    rafId = requestAnimationFrame(renderCursor)
  }
}

const handlePointerDown = (e: PointerEvent) => {
  if (e.pointerType && e.pointerType !== 'mouse') return
  if (e.button !== 0) return // Left-click only

  isPressed.value = true

  // Spawn vintage comic burst unless clicking inside a text field
  if (!isText.value) {
    const id = ++burstCounter
    bursts.value.push({ id })
    setTimeout(() => {
      bursts.value = bursts.value.filter((b) => b.id !== id)
    }, 320)
  }
}

const handlePointerUp = () => {
  isPressed.value = false
}

const handleMouseLeave = (e: MouseEvent) => {
  // If moving out of viewport boundaries
  if (
    !e.relatedTarget &&
    (e.clientY <= 0 ||
      e.clientX <= 0 ||
      e.clientX >= window.innerWidth ||
      e.clientY >= window.innerHeight)
  ) {
    isVisible.value = false
  }
}

const handleMouseEnter = () => {
  isVisible.value = true
}

const handleWindowBlur = () => {
  isVisible.value = false
  isPressed.value = false
}

const updateSupport = () => {
  if (typeof window === 'undefined') return
  mediaQueryList = window.matchMedia('(pointer: fine) and (hover: hover)')
  isSupported.value = mediaQueryList.matches

  if (isSupported.value) {
    document.documentElement.classList.add('has-custom-cursor')
    document.body.classList.add('has-custom-cursor')
  } else {
    document.documentElement.classList.remove('has-custom-cursor')
    document.body.classList.remove('has-custom-cursor')
  }
}

onMounted(() => {
  updateSupport()

  if (mediaQueryList) {
    mediaQueryList.addEventListener('change', updateSupport)
  }

  window.addEventListener('pointermove', handlePointerMove, { passive: true })
  window.addEventListener('pointerdown', handlePointerDown, { passive: true })
  window.addEventListener('pointerup', handlePointerUp, { passive: true })
  document.addEventListener('mouseleave', handleMouseLeave, { passive: true })
  document.addEventListener('mouseenter', handleMouseEnter, { passive: true })
  window.addEventListener('blur', handleWindowBlur, { passive: true })
})

onUnmounted(() => {
  if (mediaQueryList) {
    mediaQueryList.removeEventListener('change', updateSupport)
  }

  window.removeEventListener('pointermove', handlePointerMove)
  window.removeEventListener('pointerdown', handlePointerDown)
  window.removeEventListener('pointerup', handlePointerUp)
  document.removeEventListener('mouseleave', handleMouseLeave)
  document.removeEventListener('mouseenter', handleMouseEnter)
  window.removeEventListener('blur', handleWindowBlur)

  if (rafId) {
    cancelAnimationFrame(rafId)
  }

  document.documentElement.classList.remove('has-custom-cursor')
  document.body.classList.remove('has-custom-cursor')
})
</script>

<style scoped>
.custom-cursor-root {
  position: fixed;
  top: 0;
  left: 0;
  width: 0;
  height: 0;
  pointer-events: none;
  z-index: 99999;
  direction: ltr;
  opacity: 0;
  transition: opacity 0.15s ease;
  will-change: transform;
}

.custom-cursor-root.is-visible {
  opacity: 1;
}

/* Hide custom cursor when over text inputs to let native I-beam work */
.custom-cursor-root.is-text {
  opacity: 0 !important;
}

/* Smooth handoff transition when mouse enters dropdown options */
.custom-cursor-root.is-dropdown {
  opacity: 0 !important;
  pointer-events: none;
}

.custom-cursor-root.is-dropdown .cursor-hand-wrapper {
  transform: scale(0.65) rotate(-22deg) translateY(-8px);
  opacity: 0;
  transition:
    transform 0.2s cubic-bezier(0.16, 1, 0.3, 1),
    opacity 0.16s ease;
}

/* 
  Hand wrapper alignment:
  The finger tip in pic/cursor.png is at 33.333% from the left (x = 118px / 354px)
  and 0px from the top.
  At 34px width: 33.333% is 11.33px.
  Shifting margin-left by -11.33px places the fingertip exactly at (0, 0).
  Setting transform-origin to 11.33px 0px guarantees rotations/scaling pivot directly on the fingertip!
*/
.cursor-hand-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  width: 34px;
  height: 80px;
  margin-left: -11.33px;
  margin-top: 0px;
  transform-origin: 11.33px 0px;
  transition: transform 0.16s cubic-bezier(0.2, 0.8, 0.3, 1);
  filter: drop-shadow(2px 3px 0px rgba(14, 15, 18, 0.22));
  will-change: transform;
}

.cursor-hand-img {
  display: block;
  width: 34px;
  height: auto;
  user-select: none;
  pointer-events: none;
}

/* Interactive Hover State: Subtle tilt and slight scale around anchored fingertip */
.custom-cursor-root.is-interactive .cursor-hand-wrapper {
  transform: scale(1.1) rotate(-6deg);
}

/* Click / Pressed State: Tactile downward punch */
.custom-cursor-root.is-pressed .cursor-hand-wrapper {
  transform: scale(0.9) translateY(3px) rotate(-2deg);
}

/* Comic Tap Burst Effect */
.cursor-comic-burst {
  position: absolute;
  top: 0;
  left: 0;
  width: 10px;
  height: 10px;
  margin-left: -5px;
  margin-top: -5px;
  border-radius: 50%;
  border: 2px solid var(--primitive-ink-950, #0e0f12);
  background-color: var(--color-accent, #d93829);
  pointer-events: none;
  box-shadow: 1px 1px 0px var(--primitive-ink-950, #0e0f12);
  animation: comic-burst-anim 0.28s cubic-bezier(0.1, 0.9, 0.2, 1) forwards;
}

@keyframes comic-burst-anim {
  0% {
    transform: scale(0.6);
    opacity: 0.95;
  }
  60% {
    transform: scale(2.4);
    opacity: 0.8;
  }
  100% {
    transform: scale(3.2);
    opacity: 0;
  }
}

/* Reduced Motion: Disable spring scaling and burst */
@media (prefers-reduced-motion: reduce) {
  .cursor-hand-wrapper {
    transition: none !important;
    transform: none !important;
  }
  .cursor-comic-burst {
    display: none !important;
  }
  .custom-cursor-root.is-dropdown .cursor-hand-wrapper {
    transition: none !important;
    transform: none !important;
  }
}
</style>
