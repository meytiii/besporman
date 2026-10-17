<template>
  <header
    class="site-header"
    :class="{ 'is-scrolled': isScrolled }"
    role="banner"
  >
    <div class="container header-container">
      <!-- Brand Logo / Identity -->
      <router-link to="/" class="brand-link" aria-label="بسپر من - بازگشت به صفحه اصلی">
        <span class="brand-badge" aria-hidden="true">
          <img src="/favicon.png" alt="" width="28" height="28" class="brand-icon" />
        </span>
        <span class="brand-text">بسپر من</span>
      </router-link>

      <!-- Desktop Navigation with Anime Mascot Indicator -->
      <nav class="nav-desktop" aria-label="منوی اصلی وب‌سایت">
        <ul class="nav-list" ref="navListRef">
          <!-- The Little Anime Mascot Indicator -->
          <li
            v-if="mounted"
            class="anime-mascot-wrapper"
            :class="{ 'is-hovered': hoveredTab !== null }"
            :style="{
              transform: `translateX(${mascotX}px) translateX(-50%)`,
              opacity: mascotOpacity
            }"
            aria-hidden="true"
          >
            <div class="mascot-stage">
              <!-- Mascot Head -->
              <div class="mascot-head">
                <!-- Mascot Eyes -->
                <div class="mascot-eye eye-left"></div>
                <div class="mascot-eye eye-right"></div>
                <!-- Mascot Blush -->
                <div class="mascot-blush blush-left"></div>
                <div class="mascot-blush blush-right"></div>
                <!-- Mascot Smile -->
                <div class="mascot-mouth"></div>
                <!-- Hover Sparkles -->
                <span class="mascot-sparkle sparkle-1">✨</span>
                <span class="mascot-sparkle sparkle-2">✨</span>
              </div>
              <!-- Pointer Tail Beak -->
              <div class="mascot-tail"></div>
            </div>
          </li>

          <!-- Nav Items -->
          <li
            v-for="item in navItems"
            :key="item.id"
            :ref="(el) => setItemRef(item.id, el as HTMLElement)"
            class="nav-item"
          >
            <a
              :href="item.href"
              class="nav-link"
              :class="{ 'is-active': activeTab === item.id }"
              @click="handleNavClick(item.id)"
              @mouseenter="handleMouseEnter(item.id)"
              @mouseleave="handleMouseLeave"
            >
              <!-- Active Pill Indicator with Shine Sweep -->
              <span
                v-if="activeTab === item.id"
                class="nav-pill-active"
                aria-hidden="true"
              >
                <span class="nav-pill-shine"></span>
              </span>

              <!-- Hover Pill Indicator -->
              <span
                v-if="hoveredTab === item.id && activeTab !== item.id"
                class="nav-pill-hover"
                aria-hidden="true"
              ></span>

              <!-- Label -->
              <span class="nav-link-text">{{ item.name }}</span>
            </a>
          </li>
        </ul>
      </nav>

      <!-- Direct Contact CTA with Gliding Badge Animation -->
      <div class="header-actions">
        <a
          href="#contact"
          class="btn btn-primary header-cta"
        >
          <span class="btn-text">سفارش پروژه</span>
          <span class="btn-arrow" aria-hidden="true">←</span>
        </a>

        <!-- Mobile Menu Toggle Button -->
        <button
          type="button"
          class="mobile-toggle-btn"
          :aria-expanded="isMobileMenuOpen"
          aria-controls="mobile-nav-drawer"
          :aria-label="isMobileMenuOpen ? 'بستن منو' : 'باز کردن منو'"
          @click="toggleMobileMenu"
        >
          <span class="hamburger-icon" aria-hidden="true">
            <span class="bar"></span>
            <span class="bar"></span>
            <span class="bar"></span>
          </span>
        </button>
      </div>
    </div>

    <!-- Mobile Drawer Navigation -->
    <div
      id="mobile-nav-drawer"
      class="mobile-drawer"
      :class="{ 'is-open': isMobileMenuOpen }"
      :aria-hidden="!isMobileMenuOpen"
    >
      <nav class="mobile-nav" aria-label="منوی موبایل">
        <ul class="mobile-nav-list">
          <li v-for="item in navItems" :key="item.id">
            <a
              :href="item.href"
              class="mobile-nav-link"
              :class="{ 'is-active': activeTab === item.id }"
              @click="handleMobileNavClick(item.id)"
            >
              {{ item.name }}
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick, watch } from 'vue'

interface NavItem {
  id: string
  name: string
  href: string
}

const navItems: NavItem[] = [
  { id: 'services', name: 'خدمات', href: '#services' },
  { id: 'process', name: 'روند همکاری', href: '#process' },
  { id: 'projects', name: 'نمونه‌کارها', href: '#projects' },
  { id: 'about', name: 'درباره ما', href: '#about' },
  { id: 'contact', name: 'ثبت سفارش', href: '#contact' },
]

const isScrolled = ref(false)
const isMobileMenuOpen = ref(false)
const mounted = ref(false)
const activeTab = ref('services')
const hoveredTab = ref<string | null>(null)
const mascotX = ref(0)
const mascotOpacity = ref(0)

const navListRef = ref<HTMLElement | null>(null)
const itemRefs = ref<Record<string, HTMLElement>>({})

const setItemRef = (id: string, el: HTMLElement | null) => {
  if (el) {
    itemRefs.value[id] = el
  }
}

const updateMascotPosition = () => {
  const currentId = hoveredTab.value || activeTab.value
  const targetEl = itemRefs.value[currentId]
  const listEl = navListRef.value
  if (!targetEl || !listEl) return

  const left = targetEl.offsetLeft
  const width = targetEl.offsetWidth
  mascotX.value = Math.round(left + width / 2)
  mascotOpacity.value = 1
}

const handleMouseEnter = (id: string) => {
  hoveredTab.value = id
  updateMascotPosition()
}

const handleMouseLeave = () => {
  hoveredTab.value = null
  updateMascotPosition()
}

const handleNavClick = (id: string) => {
  activeTab.value = id
  updateMascotPosition()
}

const handleMobileNavClick = (id: string) => {
  activeTab.value = id
  closeMobileMenu()
}

const handleScroll = () => {
  isScrolled.value = window.scrollY > 20

  // ScrollSpy to determine active section
  const scrollPosition = window.scrollY + 120
  for (let i = navItems.length - 1; i >= 0; i--) {
    const item = navItems[i]
    const section = document.querySelector(item.href) as HTMLElement | null
    if (section) {
      const top = section.offsetTop
      const height = section.offsetHeight
      if (scrollPosition >= top && scrollPosition < top + height) {
        if (activeTab.value !== item.id) {
          activeTab.value = item.id
          if (!hoveredTab.value) {
            updateMascotPosition()
          }
        }
        break
      }
    }
  }
}

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}

// Update mascot position when activeTab or hoveredTab changes
watch([activeTab, hoveredTab], () => {
  updateMascotPosition()
})

onMounted(() => {
  mounted.value = true
  if (window.location.hash) {
    const hashId = window.location.hash.replace('#', '')
    if (navItems.some((item) => item.id === hashId)) {
      activeTab.value = hashId
    }
  }

  nextTick(() => {
    updateMascotPosition()
    setTimeout(updateMascotPosition, 100)
    setTimeout(updateMascotPosition, 300)
  })

  window.addEventListener('scroll', handleScroll, { passive: true })
  window.addEventListener('resize', updateMascotPosition, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('resize', updateMascotPosition)
})
</script>

<style scoped>
.site-header {
  position: fixed;
  top: 0;
  inset-inline-start: 0;
  inset-inline-end: 0;
  height: var(--header-height);
  z-index: 100;
  background-color: rgba(250, 247, 240, 0.85);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border-bottom: var(--border-width-bold) solid transparent;
  transition: border-color 0.2s ease, background-color 0.2s ease, box-shadow 0.2s ease;
}

.site-header.is-scrolled {
  background-color: var(--color-canvas);
  border-bottom-color: var(--color-border-bold);
  box-shadow: 0 4px 0 var(--color-border-bold);
}

.header-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
}

/* Brand Link */
.brand-link {
  display: inline-flex;
  align-items: center;
  gap: var(--space-3);
  font-family: var(--font-display);
  font-size: var(--text-2xl);
  color: var(--color-ink-primary);
  text-decoration: none;
}

.brand-text {
  white-space: nowrap;
}

.brand-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  background-color: var(--primitive-amber-100);
  border: var(--border-width-bold) solid var(--color-border-bold);
  border-radius: var(--border-radius-sm);
  box-shadow: 2px 2px 0 var(--color-border-bold);
  flex-shrink: 0;
}

.brand-icon {
  width: 24px;
  height: 24px;
  object-fit: contain;
}

/* Desktop Navigation */
.nav-desktop {
  display: none;
  position: relative;
  margin-top: 6px;
}

@media (min-width: 860px) {
  .nav-desktop {
    display: block;
  }
}

.nav-list {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  list-style: none;
  position: relative;
  padding: 0;
  margin: 0;
}

.nav-item {
  position: relative;
}

.nav-link {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-body);
  font-weight: 500;
  font-size: var(--text-base);
  color: var(--color-ink-primary);
  padding-inline: var(--space-4);
  padding-block: var(--space-2);
  border-radius: var(--border-radius-full);
  text-decoration: none;
  cursor: pointer;
  transition: color 0.2s ease, font-weight 0.2s ease;
  z-index: 1;
}

.nav-link:hover {
  color: var(--color-accent-text);
}

.nav-link.is-active {
  color: var(--color-accent-text);
  font-weight: 700;
}

.nav-link-text {
  position: relative;
  z-index: 2;
}

/* Hover pill */
.nav-pill-hover {
  position: absolute;
  inset: 0;
  border-radius: var(--border-radius-full);
  background-color: rgba(14, 15, 18, 0.06);
  z-index: 1;
  animation: pill-enter 0.2s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
}

@keyframes pill-enter {
  0% {
    opacity: 0;
    transform: scale(0.85);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

/* Active pill with shine sweep */
.nav-pill-active {
  position: absolute;
  inset: 0;
  border-radius: var(--border-radius-full);
  background-color: rgba(201, 42, 29, 0.08);
  border: 1px solid rgba(201, 42, 29, 0.22);
  z-index: 1;
  overflow: hidden;
  animation: active-pulse 2.4s ease-in-out infinite;
}

@keyframes active-pulse {
  0%, 100% {
    opacity: 0.9;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.02);
  }
}

.nav-pill-shine {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(217, 56, 41, 0.2) 50%,
    transparent 100%
  );
  animation: shine-sweep 3s ease-in-out infinite;
}

@keyframes shine-sweep {
  0% {
    transform: translateX(-100%);
  }
  50% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(-100%);
  }
}

/* Anime Mascot Indicator */
.anime-mascot-wrapper {
  position: absolute;
  top: -24px;
  left: 0;
  pointer-events: none;
  z-index: 10;
  transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.2s ease;
  list-style: none;
}

.mascot-stage {
  position: relative;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Mascot Head */
.mascot-head {
  position: absolute;
  width: 24px;
  height: 24px;
  background-color: var(--primitive-white);
  border: 2px solid var(--color-ink-primary);
  border-radius: var(--border-radius-full);
  box-shadow: 1px 2px 0 var(--color-ink-primary);
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  transform-origin: center bottom;
}

/* Idle Bob Animation */
.anime-mascot-wrapper:not(.is-hovered) .mascot-head {
  animation: mascot-bob 2s ease-in-out infinite;
}

@keyframes mascot-bob {
  0%, 100% {
    transform: translateX(-50%) translateY(0);
  }
  50% {
    transform: translateX(-50%) translateY(-3px);
  }
}

/* Hover Wobble Animation */
.anime-mascot-wrapper.is-hovered .mascot-head {
  animation: mascot-wiggle 0.5s ease-in-out infinite alternate;
}

@keyframes mascot-wiggle {
  0% {
    transform: translateX(-50%) scale(1.15) rotate(0deg);
  }
  30% {
    transform: translateX(-50%) scale(1.15) rotate(-6deg);
  }
  70% {
    transform: translateX(-50%) scale(1.15) rotate(6deg);
  }
  100% {
    transform: translateX(-50%) scale(1.15) rotate(0deg);
  }
}

/* Mascot Eyes */
.mascot-eye {
  position: absolute;
  width: 3px;
  height: 3px;
  background-color: var(--color-ink-primary);
  border-radius: var(--border-radius-full);
  top: 38%;
}

.eye-left {
  left: 25%;
}

.eye-right {
  right: 25%;
}

.anime-mascot-wrapper.is-hovered .mascot-eye {
  animation: eye-squint 0.25s ease-in-out infinite;
}

@keyframes eye-squint {
  0%, 100% {
    transform: scaleY(1);
  }
  50% {
    transform: scaleY(0.2);
  }
}

/* Mascot Blush */
.mascot-blush {
  position: absolute;
  width: 4px;
  height: 2.5px;
  background-color: #f472b6;
  border-radius: var(--border-radius-full);
  top: 52%;
  opacity: 0.7;
}

.blush-left {
  left: 14%;
}

.blush-right {
  right: 14%;
}

.anime-mascot-wrapper.is-hovered .mascot-blush {
  opacity: 0.95;
}

/* Mascot Mouth (Happy smile) */
.mascot-mouth {
  position: absolute;
  width: 6px;
  height: 3px;
  border-bottom: 1.5px solid var(--color-ink-primary);
  border-radius: 50%;
  top: 56%;
  left: 50%;
  transform: translateX(-50%);
  transition: transform 0.2s ease;
}

.anime-mascot-wrapper.is-hovered .mascot-mouth {
  transform: translateX(-50%) scaleY(1.5) translateY(-0.5px);
}

/* Mascot Tail (Beak pointing down to active tab) */
.mascot-tail {
  position: absolute;
  bottom: -1px;
  left: 50%;
  width: 7px;
  height: 7px;
  background-color: var(--primitive-white);
  border-inline-end: 2px solid var(--color-ink-primary);
  border-bottom: 2px solid var(--color-ink-primary);
  transform: translateX(-50%) rotate(45deg);
  transform-origin: center;
}

.anime-mascot-wrapper:not(.is-hovered) .mascot-tail {
  animation: tail-bob 2s ease-in-out infinite;
}

@keyframes tail-bob {
  0%, 100% {
    transform: translateX(-50%) translateY(0) rotate(45deg);
  }
  50% {
    transform: translateX(-50%) translateY(1.5px) rotate(45deg);
  }
}

.anime-mascot-wrapper.is-hovered .mascot-tail {
  animation: tail-wiggle 0.3s ease-in-out infinite alternate;
}

@keyframes tail-wiggle {
  0%, 100% {
    transform: translateX(-50%) translateY(0) rotate(45deg);
  }
  50% {
    transform: translateX(-50%) translateY(-2px) rotate(45deg);
  }
}

/* Sparkles on hover */
.mascot-sparkle {
  position: absolute;
  font-size: 10px;
  line-height: 1;
  pointer-events: none;
  opacity: 0;
  transform: scale(0);
  transition: opacity 0.2s ease, transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
  color: #f59e0b;
}

.sparkle-1 {
  top: -6px;
  inset-inline-end: -4px;
}

.sparkle-2 {
  top: -9px;
  inset-inline-start: -3px;
  transition-delay: 0.08s;
}

.anime-mascot-wrapper.is-hovered .mascot-sparkle {
  opacity: 1;
  transform: scale(1);
}

/* Actions */
.header-actions {
  display: flex;
  align-items: center;
  gap: var(--space-3);
}

/* Header CTA Gliding Arrow Badge Button Animation */
.header-cta {
  position: relative;
  overflow: hidden;
  min-height: 40px;
  padding-inline-start: var(--space-4);
  padding-inline-end: 42px;
  padding-block: var(--space-2);
  font-size: var(--text-sm);
  white-space: nowrap;
  cursor: pointer;
  transition:
    padding-inline 0.45s cubic-bezier(0.4, 0, 0.2, 1),
    transform 0.1s ease,
    box-shadow 0.1s ease,
    background-color 0.15s ease;
}

.header-cta:hover {
  padding-inline-start: 42px;
  padding-inline-end: var(--space-4);
}

.header-cta .btn-text {
  position: relative;
  z-index: 2;
  transition: transform 0.45s cubic-bezier(0.4, 0, 0.2, 1);
}

.header-cta .btn-arrow {
  position: absolute;
  inset-inline-end: 8px;
  top: 50%;
  transform: translateY(-50%) rotate(0deg);
  width: 24px;
  height: 24px;
  border-radius: var(--border-radius-full);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.25);
  color: var(--primitive-white);
  font-size: 14px;
  line-height: 1;
  z-index: 3;
  margin: 0;
  transition:
    inset-inline-end 0.45s cubic-bezier(0.4, 0, 0.2, 1),
    transform 0.45s cubic-bezier(0.4, 0, 0.2, 1),
    background-color 0.2s ease;
}

.header-cta:hover .btn-arrow {
  inset-inline-end: calc(100% - 32px);
  transform: translateY(-50%) rotate(-45deg);
  background-color: rgba(255, 255, 255, 0.38);
}

@media (max-width: 480px) {
  .header-cta {
    display: none;
  }
}

/* Mobile Toggle Button */
.mobile-toggle-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  background-color: var(--color-surface);
  border: var(--border-width-bold) solid var(--color-border-bold);
  border-radius: var(--border-radius-sm);
  box-shadow: 2px 2px 0 var(--color-border-bold);
  cursor: pointer;
}

@media (min-width: 860px) {
  .mobile-toggle-btn {
    display: none;
  }
}

.hamburger-icon {
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 20px;
}

.hamburger-icon .bar {
  display: block;
  height: 2px;
  background-color: var(--color-ink-primary);
  border-radius: 1px;
}

/* Mobile Drawer */
.mobile-drawer {
  display: none;
  position: absolute;
  top: 100%;
  inset-inline-start: 0;
  inset-inline-end: 0;
  background-color: var(--color-canvas);
  border-bottom: var(--border-width-bold) solid var(--color-border-bold);
  box-shadow: 0 8px 0 var(--color-border-bold);
  padding-block: var(--space-6);
  padding-inline: var(--space-6);
}

.mobile-drawer.is-open {
  display: block;
}

.mobile-nav-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  list-style: none;
}

.mobile-nav-link {
  display: block;
  font-family: var(--font-display);
  font-size: var(--text-xl);
  color: var(--color-ink-primary);
  padding-block: var(--space-2);
}

.mobile-nav-link:hover,
.mobile-nav-link.is-active {
  color: var(--color-accent-text);
}

/* Reduced Motion */
@media (prefers-reduced-motion: reduce) {
  .anime-mascot-wrapper,
  .anime-mascot-wrapper .mascot-head,
  .anime-mascot-wrapper .mascot-eye,
  .anime-mascot-wrapper .mascot-tail,
  .nav-pill-hover,
  .nav-pill-active,
  .nav-pill-shine,
  .header-cta,
  .header-cta .btn-arrow,
  .header-cta .btn-text {
    animation: none !important;
    transition: none !important;
  }
}
</style>
