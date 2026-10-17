<template>
  <footer class="site-footer" role="contentinfo">
    <div class="container footer-container">
      
      <!-- Brand & Studio Tagline -->
      <div class="footer-brand">
        <router-link to="/" class="footer-logo">
          <span class="logo-badge" aria-hidden="true">
            <img src="/favicon.png" alt="" width="24" height="24" loading="lazy" decoding="async" />
          </span>
          <span class="logo-text">بسپر من</span>
        </router-link>
        <p class="footer-tagline">
          استودیو مهندسی نرم‌افزار؛ طراحی و توسعه وب‌سایت، بات‌های تلگرام و نرم‌افزارهای کاربردی ویندوز.
        </p>
      </div>

      <!-- Quick Links -->
      <nav class="footer-nav" aria-label="پیوندهای پاورقی">
        <ul class="footer-nav-list">
          <li v-for="link in footerNavItems" :key="link.id">
            <a
              :href="'/#' + link.id"
              class="footer-link"
              @click="handleFooterNav(link.id, $event)"
            >
              {{ link.name }}
            </a>
          </li>
        </ul>
      </nav>

      <!-- Back to Top -->
      <div class="footer-actions">
        <button
          type="button"
          class="btn btn-secondary btn-sm back-to-top-btn"
          aria-label="بازگشت به ابتدای صفحه"
          @click="scrollToTop"
        >
          <span class="btn-text">بالای صفحه</span>
          <span class="btn-arrow" aria-hidden="true">↑</span>
        </button>
      </div>

    </div>

    <!-- Bottom Copyright Bar -->
    <div class="footer-bottom-bar">
      <div class="container bottom-container">
        <p class="copyright-text">
          © {{ currentYearFa }} بسپر من. تمامی حقوق متعلق به تیم توسعه‌دهندگان است.
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const currentYearFa = '۱۴۰۳'

const footerNavItems = [
  { id: 'services', name: 'خدمات' },
  { id: 'process', name: 'روند همکاری' },
  { id: 'projects', name: 'نمونه‌کارها' },
  { id: 'about', name: 'درباره ما' },
  { id: 'contact', name: 'تماس و سفارش' },
]

const handleFooterNav = (id: string, event?: MouseEvent) => {
  if (event && (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0)) {
    return
  }
  event?.preventDefault()

  if (route.path === '/') {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
    if (route.hash !== '#' + id) {
      return router.push({ path: '/', hash: '#' + id }).catch(() => {})
    }
  } else {
    return router.push({ path: '/', hash: '#' + id })
  }
}

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}
</script>

<style scoped>
.site-footer {
  background-color: var(--primitive-cream-100);
  border-top: var(--border-width-bold) solid var(--color-border-bold);
  padding-top: var(--space-12);
}

.footer-container {
  display: flex;
  flex-direction: column;
  gap: var(--space-8);
  padding-bottom: var(--space-12);
}

@media (min-width: 768px) {
  .footer-container {
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
  }
}

.footer-brand {
  max-width: 360px;
}

.footer-logo {
  display: inline-flex;
  align-items: center;
  gap: var(--space-3);
  font-family: var(--font-display);
  font-size: var(--text-2xl);
  color: var(--color-ink-primary);
  margin-bottom: var(--space-3);
}

.logo-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background-color: var(--primitive-amber-100);
  border: var(--border-width-bold) solid var(--color-border-bold);
  border-radius: var(--border-radius-sm);
  box-shadow: 2px 2px 0 var(--color-border-bold);
}

.footer-tagline {
  font-size: var(--text-sm);
  color: var(--color-ink-muted);
  line-height: var(--leading-normal);
}

.footer-nav-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  list-style: none;
}

@media (min-width: 640px) {
  .footer-nav-list {
    flex-direction: row;
    flex-wrap: wrap;
    gap: var(--space-6);
  }
}

.footer-link {
  font-size: var(--text-sm);
  font-weight: 500;
  color: var(--color-ink-primary);
}

.footer-link:hover {
  color: var(--color-accent-text);
}

.back-to-top-btn {
  font-size: var(--text-xs);
}

.footer-bottom-bar {
  border-top: 1px solid rgba(0, 0, 0, 0.08);
  padding-block: var(--space-4);
  background-color: var(--color-canvas);
}

.bottom-container {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.copyright-text {
  font-size: var(--text-xs);
  color: var(--color-ink-muted);
}
</style>
