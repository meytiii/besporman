<template>
  <section class="process-section" aria-labelledby="process-title">
    <div class="container">
      
      <!-- Section Header -->
      <div class="section-header">
        <span class="section-badge reveal-badge comic-pop">مراحل کار</span>
        <h2 id="process-title" class="section-title">
          <TypingEffect
            text="چگونه کارها را به ما می‌سپارید؟"
            :hold-delay="2000"
            :cleared-delay="1500"
            :typing-speed="65"
            :deleting-speed="25"
          />
        </h2>
        <p class="section-subtitle">
          <TextReveal
            as="span"
            text="مسیر همکاری با ما شفاف، بدون بوروکراسی خسته‌کننده و مبتنی بر تحویل واقعی خروجی باکیفیت است."
            preset="fade-in-blur"
            :delay="0.1"
            :speed-reveal="1.3"
          />
        </p>
      </div>

      <!-- Process Steps (4-Step Flow) -->
      <div class="process-grid">
        
        <div class="process-card comic-pop delay-1">
          <div class="step-badge">گام ۰۱</div>
          <h3 class="step-title">گفتگو و شفاف‌سازی</h3>
          <p class="step-desc">
            ایده یا نیازی که دارید را مطرح می‌کنید. ما با هم صحبت می‌کنیم، جزئیات فنی و خروجی مورد انتظار را دقیق و به زبان ساده مشخص می‌کنیم.
          </p>
        </div>

        <div class="process-card comic-pop delay-2">
          <div class="step-badge">گام ۰۲</div>
          <h3 class="step-title">برنامه‌ریزی و توافق</h3>
          <p class="step-desc">
            زمان‌بندی دقیق تحویل و برآورد هزینه به صورت شفاف و نهایی مشخص می‌شود. هیچ هزینه پنهان یا بدقولی در زمان تحویل وجود ندارد.
          </p>
        </div>

        <div class="process-card comic-pop delay-3">
          <div class="step-badge">گام ۰۳</div>
          <h3 class="step-title">توسعه و آزمون</h3>
          <p class="step-desc">
            کار با بالاترین استانداردهای کدنویسی پیش می‌رود. در طول مسیر پیشرفت را به شما نشان می‌دهیم و همه‌چیز زیر بار آزمایش قرار می‌گیرد.
          </p>
        </div>

        <div class="process-card comic-pop delay-4">
          <div class="step-badge">گام ۰۴</div>
          <h3 class="step-title">تحویل و پشتیبانی</h3>
          <p class="step-desc">
            پروژه به صورت کامل، همراه با تست و سورس‌کد تحویل شما می‌شود و پس از راه‌اندازی نیز برای نگهداری و پاسخ به سوالات همراهتان هستیم.
          </p>
        </div>

      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import TextReveal from '@/components/ui/TextReveal.vue'
import TypingEffect from '@/components/ui/TypingEffect.vue'
import { useScrollReveal } from '@/composables/useScrollReveal'

useScrollReveal()
</script>

<style scoped>
.process-section {
  padding-block: var(--space-20);
  background-color: var(--primitive-cream-100);
  border-block: var(--border-width-bold) solid var(--color-border-bold);
}

.section-header {
  text-align: center;
  max-width: 650px;
  margin-inline: auto;
  margin-bottom: var(--space-12);
}

.section-badge {
  display: inline-block;
  font-family: var(--font-body);
  font-size: var(--text-xs);
  font-weight: 700;
  color: var(--primitive-white);
  background-color: var(--color-accent);
  padding: var(--space-1) var(--space-3);
  border-radius: var(--border-radius-sm);
  margin-bottom: var(--space-3);
}

.section-title {
  font-size: var(--text-3xl);
  color: var(--color-ink-primary);
  margin-bottom: var(--space-3);
}

.section-subtitle {
  font-size: var(--text-base);
  color: var(--color-ink-muted);
}

/* Grid */
.process-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-6);
}

@media (min-width: 640px) {
  .process-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .process-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

/* Process Card */
.process-card {
  position: relative;
  background-color: var(--color-canvas);
  border: var(--border-width-bold) solid var(--color-border-bold);
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-md);
  padding: var(--space-6);
  display: flex;
  flex-direction: column;
}

.step-badge {
  display: inline-block;
  align-self: flex-start;
  font-family: var(--font-display);
  font-size: var(--text-lg);
  color: var(--color-accent-text);
  background-color: var(--primitive-cream-100);
  border: 1px solid var(--color-border-bold);
  padding: var(--space-1) var(--space-3);
  border-radius: var(--border-radius-sm);
  margin-bottom: var(--space-4);
}

.step-title {
  font-size: var(--text-xl);
  color: var(--color-ink-primary);
  margin-bottom: var(--space-3);
}

.step-desc {
  font-size: var(--text-sm);
  color: var(--color-ink-muted);
  line-height: var(--leading-normal);
}
</style>
