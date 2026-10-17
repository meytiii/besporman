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

      <!-- Desktop Navigation -->
      <nav class="nav-desktop" aria-label="منوی اصلی وب‌سایت">
        <ul class="nav-list">
          <li><a href="#services" class="nav-link">خدمات</a></li>
          <li><a href="#process" class="nav-link">روند همکاری</a></li>
          <li><a href="#projects" class="nav-link">نمونه‌کارها</a></li>
          <li><a href="#about" class="nav-link">درباره ما</a></li>
          <li><a href="#contact" class="nav-link">ثبت سفارش</a></li>
        </ul>
      </nav>

      <!-- Direct Contact CTA -->
      <div class="header-actions">
        <a
          href="#contact"
          class="btn btn-primary header-cta"
        >
          <span>سفارش پروژه</span>
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
          <li><a href="#services" class="mobile-nav-link" @click="closeMobileMenu">خدمات</a></li>
          <li><a href="#process" class="mobile-nav-link" @click="closeMobileMenu">روند همکاری</a></li>
          <li><a href="#projects" class="mobile-nav-link" @click="closeMobileMenu">نمونه‌کارها</a></li>
          <li><a href="#about" class="mobile-nav-link" @click="closeMobileMenu">درباره ما</a></li>
          <li><a href="#contact" class="mobile-nav-link" @click="closeMobileMenu">ثبت سفارش</a></li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const isScrolled = ref(false)
const isMobileMenuOpen = ref(false)

const handleScroll = () => {
  isScrolled.value = window.scrollY > 20
}

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
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
}

@media (min-width: 860px) {
  .nav-desktop {
    display: block;
  }
}

.nav-list {
  display: flex;
  align-items: center;
  gap: var(--space-6);
  list-style: none;
}

.nav-link {
  font-family: var(--font-body);
  font-weight: 500;
  font-size: var(--text-base);
  color: var(--color-ink-primary);
  padding-block: var(--space-1);
  border-bottom: 2px solid transparent;
  transition: border-color 0.15s ease, color 0.15s ease;
}

.nav-link:hover {
  color: var(--color-accent-text);
  border-bottom-color: var(--color-accent-text);
}

/* Actions */
.header-actions {
  display: flex;
  align-items: center;
  gap: var(--space-3);
}

.header-cta {
  min-height: 40px;
  padding-inline: var(--space-4);
  padding-block: var(--space-2);
  font-size: var(--text-sm);
  white-space: nowrap;
}

@media (max-width: 480px) {
  .header-cta {
    display: none;
  }
}

.btn-arrow {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border-radius: var(--border-radius-full);
  background-color: rgba(255, 255, 255, 0.25);
  margin-inline-start: var(--space-1);
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

.mobile-nav-link:hover {
  color: var(--color-accent-text);
}
</style>
