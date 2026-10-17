<template>
  <footer class="site-footer" role="contentinfo">
    <div class="container footer-container">
      
      <!-- Brand & Studio Tagline -->
      <div class="footer-brand">
        <router-link to="/" class="footer-logo">
          <span class="logo-badge" aria-hidden="true">
            <img src="/favicon.png" alt="" width="24" height="24" />
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
          <li><a href="#services" class="footer-link">خدمات</a></li>
          <li><a href="#process" class="footer-link">روند همکاری</a></li>
          <li><a href="#projects" class="footer-link">نمونه‌کارها</a></li>
          <li><a href="#about" class="footer-link">درباره ما</a></li>
          <li><a href="#contact" class="footer-link">تماس و سفارش</a></li>
        </ul>
      </nav>

      <!-- Back to Top -->
      <div class="footer-actions">
        <button
          type="button"
          class="btn btn-secondary back-to-top-btn"
          aria-label="بازگشت به ابتدای صفحه"
          @click="scrollToTop"
        >
          <span>بالای صفحه</span>
          <span aria-hidden="true">↑</span>
        </button>
      </div>

    </div>

    <!-- Bottom Copyright Bar -->
    <div class="footer-bottom-bar">
      <div class="container bottom-container">
        <p class="copyright-text">
          © {{ currentYearFa }} بسپر من. تمامی حقوق متعلق به تیم توسعه‌دهندگان است.
        </p>
        <p class="anti-slop-notice">
          توسعه‌یافته با استاندارد Vue 3، کدنویسی تمیز و بدون وابستگی‌های سنگین.
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const currentYearFa = '۱۴۰۳'

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
  min-height: 40px;
  padding: var(--space-1) var(--space-4);
  font-size: var(--text-xs);
}

.footer-bottom-bar {
  border-top: 1px solid rgba(0, 0, 0, 0.08);
  padding-block: var(--space-4);
  background-color: var(--color-canvas);
}

.bottom-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-2);
  text-align: center;
}

@media (min-width: 768px) {
  .bottom-container {
    flex-direction: row;
    justify-content: space-between;
    text-align: start;
  }
}

.copyright-text,
.anti-slop-notice {
  font-size: var(--text-xs);
  color: var(--color-ink-muted);
}
</style>
