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

        <!-- Mobile Liquid Morph Floating Navigation Menu (Single Button -> Morphing Dropdown) -->
        <div
          ref="mobileMenuRef"
          class="mobile-morph-menu"
          :class="{ 'is-open': isMobileMenuOpen }"
        >
          <!-- Morph Card Container (Expands from Top to Bottom) -->
          <div
            class="morph-card"
            @click="handleCardClick"
          >
            <!-- Yellow / Amber Base Background Layer -->
            <div class="morph-bg-base" aria-hidden="true"></div>

            <!-- Dark Liquid Charcoal Circle Expanding from Top to Bottom -->
            <div class="morph-liquid-circle" aria-hidden="true"></div>

            <!-- Top Header Bar: "منو" / "بستن" + 2-bar Morphing Cross Icon -->
            <button
              type="button"
              class="morph-trigger-btn"
              :aria-expanded="isMobileMenuOpen"
              aria-controls="mobile-nav-content"
              :aria-label="isMobileMenuOpen ? 'بستن منو' : 'باز کردن منو'"
              @click.stop="toggleMobileMenu"
            >
              <span class="morph-label">{{ isMobileMenuOpen ? 'بستن' : 'منو' }}</span>
              <div class="morph-icon" aria-hidden="true">
                <span class="morph-bar bar-top"></span>
                <span class="morph-bar bar-bottom"></span>
              </div>
            </button>

            <!-- Nav Content: Staggered Cascade Revealed Inside Dark Layer -->
            <nav
              id="mobile-nav-content"
              class="morph-nav-content"
              aria-label="منوی موبایل"
              :aria-hidden="!isMobileMenuOpen"
              @click.stop
            >
              <ul class="morph-nav-list">
                <li
                  v-for="(item, idx) in navItems"
                  :key="item.id"
                  class="morph-nav-item"
                  :style="{ '--item-idx': idx }"
                >
                  <a
                    :href="item.href"
                    class="morph-nav-link"
                    :class="{ 'is-active': activeTab === item.id }"
                    @click.stop="handleMobileNavClick(item.id)"
                  >
                    <!-- Kinetic Word Roll from Template -->
                    <span class="morph-roll-box">
                      <span class="morph-roll-track">
                        <span class="morph-roll-line">{{ item.name }}</span>
                        <span class="morph-roll-line morph-roll-hover" aria-hidden="true">{{ item.name }}</span>
                      </span>
                    </span>
                    <span v-if="activeTab === item.id" class="morph-active-indicator" aria-hidden="true">←</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>

    <!-- Backdrop Overlay for Outside Click -->
    <Transition name="fade">
      <div
        v-if="isMobileMenuOpen"
        class="morph-backdrop"
        aria-hidden="true"
        @click="closeMobileMenu"
      ></div>
    </Transition>
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
const mobileMenuRef = ref<HTMLElement | null>(null)

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

const handleCardClick = () => {
  if (!isMobileMenuOpen.value) {
    isMobileMenuOpen.value = true
  }
}

const handleOutsideClick = (e: MouseEvent) => {
  if (isMobileMenuOpen.value && mobileMenuRef.value && !mobileMenuRef.value.contains(e.target as Node)) {
    closeMobileMenu()
  }
}

const handleKeyDown = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && isMobileMenuOpen.value) {
    closeMobileMenu()
  }
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
  document.addEventListener('mousedown', handleOutsideClick)
  window.addEventListener('keydown', handleKeyDown)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('resize', updateMascotPosition)
  document.removeEventListener('mousedown', handleOutsideClick)
  window.removeEventListener('keydown', handleKeyDown)
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

/* ==========================================================================
   Mobile Device Exclusive Navbar: Liquid Morph Floating Menu
   ========================================================================== */

.mobile-morph-menu {
  display: none;
  position: relative;
  width: 104px;
  height: 44px;
  z-index: 105;
}

@media (max-width: 859px) {
  .mobile-morph-menu {
    display: block;
  }
}

.morph-card {
  position: absolute;
  top: 0;
  inset-inline-end: 0;
  width: 104px;
  height: 44px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  border-radius: var(--border-radius-full);
  border: var(--border-width-bold) solid var(--color-border-bold);
  box-shadow: 2px 2px 0 var(--color-border-bold);
  cursor: pointer;
  transform-origin: top inset-inline-end;
  background-color: var(--primitive-amber-100);
  transition:
    width 0.65s cubic-bezier(0.22, 1, 0.36, 1),
    height 0.65s cubic-bezier(0.22, 1, 0.36, 1),
    border-radius 0.65s cubic-bezier(0.22, 1, 0.36, 1),
    box-shadow 0.65s cubic-bezier(0.22, 1, 0.36, 1);
}

.mobile-morph-menu.is-open .morph-card {
  width: min(280px, calc(100vw - 32px));
  height: 350px;
  border-radius: 28px;
  box-shadow: 4px 8px 0 var(--color-border-bold);
  cursor: default;
}

/* Yellow / Amber Base Background Layer */
.morph-bg-base {
  position: absolute;
  inset: 0;
  background-color: var(--primitive-amber-100);
  border-radius: inherit;
  transition: background-color 0.3s ease;
}

/* Dark Liquid Charcoal Circle Expanding from Top to Bottom */
.morph-liquid-circle {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 260%;
  height: 260%;
  border-radius: 50%;
  background-color: var(--color-ink-primary);
  top: -270%;
  transition: top 0.75s cubic-bezier(0.22, 1, 0.36, 1);
}

.mobile-morph-menu.is-open .morph-liquid-circle {
  top: -30%;
  transition-delay: 0.08s;
}

/* Top Trigger Bar */
.morph-trigger-btn {
  position: relative;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  width: 100%;
  height: 44px;
  flex-shrink: 0;
  padding-inline: var(--space-3);
  background: transparent;
  border: none;
  cursor: pointer;
  color: inherit;
  font-family: inherit;
}

.mobile-morph-menu.is-open .morph-trigger-btn {
  justify-content: space-between;
  padding-inline: var(--space-4);
}

.morph-label {
  display: inline-flex;
  align-items: center;
  font-family: var(--font-display);
  font-size: var(--text-lg);
  line-height: 1;
  padding-top: 2px;
  color: var(--color-ink-primary);
  transition: color 0.35s ease;
}

.mobile-morph-menu.is-open .morph-label {
  color: var(--color-canvas);
}

/* Morphing Icon (2 bars -> 45deg cross) */
.morph-icon {
  position: relative;
  width: 22px;
  height: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.morph-bar {
  position: absolute;
  width: 16px;
  height: 2px;
  border-radius: 2px;
  background-color: var(--color-ink-primary);
  transition:
    transform 0.4s cubic-bezier(0.22, 1, 0.36, 1),
    background-color 0.35s ease;
}

.bar-top {
  transform: translateY(-3.5px) rotate(0deg);
}

.bar-bottom {
  transform: translateY(3.5px) rotate(0deg);
}

.mobile-morph-menu.is-open .morph-bar {
  background-color: var(--color-canvas);
}

.mobile-morph-menu.is-open .bar-top {
  transform: translateY(0) rotate(45deg);
}

.mobile-morph-menu.is-open .bar-bottom {
  transform: translateY(0) rotate(-45deg);
}

/* Menu Content & Staggered Reveal */
.morph-nav-content {
  display: none;
  position: relative;
  z-index: 10;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  padding-inline: var(--space-4);
  padding-block-end: var(--space-4);
  pointer-events: none;
  opacity: 0;
  transform: translateY(-12px);
  transition:
    opacity 0.25s ease,
    transform 0.25s ease;
}

.mobile-morph-menu.is-open .morph-nav-content {
  display: flex;
  pointer-events: auto;
  opacity: 1;
  transform: translateY(0);
  transition:
    opacity 0.4s ease 0.2s,
    transform 0.4s cubic-bezier(0.22, 1, 0.36, 1) 0.2s;
}

.morph-nav-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  list-style: none;
  padding: 0;
  margin: 0;
  align-items: center;
}

.morph-nav-item {
  width: 100%;
  text-align: center;
  opacity: 0;
  transform: translateY(-8px);
}

.mobile-morph-menu.is-open .morph-nav-item {
  animation: morphItemReveal 0.4s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  animation-delay: calc(0.24s + var(--item-idx) * 0.06s);
}

@keyframes morphItemReveal {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.morph-nav-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  text-decoration: none;
  padding-block: var(--space-1);
  padding-inline: var(--space-3);
  border-radius: var(--border-radius-full);
  color: var(--color-canvas);
  font-family: var(--font-display);
  font-size: var(--text-2xl);
  line-height: 1.2;
  transition: color 0.2s ease, transform 0.2s ease;
}

.morph-nav-link:hover,
.morph-nav-link:focus-visible {
  color: var(--color-accent);
  transform: translateY(-1px) scale(1.04);
}

.morph-nav-link.is-active {
  color: var(--color-accent);
}

/* Kinetic Word Roll from Template */
.morph-roll-box {
  display: inline-block;
  overflow: hidden;
  height: 1.25em;
  vertical-align: middle;
}

.morph-roll-track {
  display: flex;
  flex-direction: column;
  transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
}

.morph-nav-link:hover .morph-roll-track,
.morph-nav-link:focus-visible .morph-roll-track {
  transform: translateY(-50%);
}

.morph-roll-line {
  display: block;
  height: 1.25em;
  line-height: 1.25em;
}

.morph-roll-hover {
  color: var(--color-accent);
}

.morph-active-indicator {
  font-size: var(--text-base);
  color: var(--color-accent);
}

/* Backdrop */
.morph-backdrop {
  position: fixed;
  inset: 0;
  background-color: rgba(14, 15, 18, 0.4);
  backdrop-filter: blur(3px);
  -webkit-backdrop-filter: blur(3px);
  z-index: 104;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
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
  .header-cta .btn-text,
  .morph-card,
  .morph-liquid-circle,
  .morph-bar,
  .morph-nav-content,
  .morph-nav-item,
  .morph-roll-track {
    animation: none !important;
    transition: none !important;
  }
}
</style>
