<template>
  <main id="main-content" class="not-found-view">
    <div class="container not-found-container">
      <div class="not-found-card">
        <span class="error-code">۴۰۴</span>
        <h1 class="not-found-title">صفحه مورد نظر پیدا نشد!</h1>
        <p class="not-found-desc">
          آدرسی که وارد کرده‌اید وجود ندارد یا ممکن است منتقل شده باشد. نگران نباشید، کارها هنوز سر جایش است!
        </p>
        <router-link to="/" class="btn btn-primary">
          <span class="btn-text">بازگشت به صفحه اصلی</span>
          <AppButtonArrow direction="left" />
        </router-link>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import AppButtonArrow from '@/components/AppButtonArrow.vue'
</script>

<style scoped>
.not-found-view {
  min-height: 100dvh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-block: var(--space-20);
  background-color: var(--color-canvas);
}

.not-found-container {
  max-width: 600px;
}

.not-found-card {
  text-align: center;
  background-color: var(--primitive-cream-100);
  border: var(--border-width-heavy) solid var(--color-border-bold);
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-lg);
  padding: var(--space-12) var(--space-8);
}

.error-code {
  display: block;
  font-family: var(--font-display);
  font-size: 72px;
  line-height: 1;
  color: var(--color-accent);
  margin-bottom: var(--space-4);
}

.not-found-title {
  font-size: var(--text-3xl);
  color: var(--color-ink-primary);
  margin-bottom: var(--space-4);
}

.not-found-desc {
  font-size: var(--text-base);
  color: var(--color-ink-muted);
  line-height: var(--leading-normal);
  margin-bottom: var(--space-8);
}
</style>
