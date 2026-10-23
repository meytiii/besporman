<template>
  <section id="process" class="process-section" aria-labelledby="process-title">
    <div class="container">
      
      <!-- Main Process Container Card (Mirrors AboutSection architecture) -->
      <div class="process-main-card">
        
        <!-- Right Column: Content & 4 Process Steps (In RTL, inline-start is Right) -->
        <div class="process-content">
          <span class="process-badge reveal-badge comic-pop">مراحل کار</span>
          <h2 id="process-title" class="process-title">
            <TypingEffect
              text="چگونه کارها را به ما می‌سپارید؟"
              :hold-delay="2000"
              :cleared-delay="1500"
              :typing-speed="65"
              :deleting-speed="25"
            />
          </h2>
          <p class="process-subtitle">
            <TextReveal
              as="span"
              text="مسیر همکاری با ما شفاف، بدون بوروکراسی خسته‌کننده و مبتنی بر تحویل واقعی خروجی باکیفیت است."
              preset="fade-in-blur"
              :delay="0.1"
              :speed-reveal="1.3"
            />
          </p>

          <!-- 4-Step Process Grid -->
          <div class="steps-grid">
            
            <div class="process-card comic-pop delay-1">
              <span class="step-badge">گام ۰۱</span>
              <h3 class="step-title">گفتگو و شفاف‌سازی</h3>
              <p class="step-desc">
                ایده یا نیازی که دارید را مطرح می‌کنید. ما با هم صحبت می‌کنیم، جزئیات فنی و خروجی مورد انتظار را دقیق و به زبان ساده مشخص می‌کنیم.
              </p>
            </div>

            <div class="process-card comic-pop delay-2">
              <span class="step-badge">گام ۰۲</span>
              <h3 class="step-title">برنامه‌ریزی و توافق</h3>
              <p class="step-desc">
                زمان‌بندی دقیق تحویل و برآورد هزینه به صورت شفاف و نهایی مشخص می‌شود. هیچ هزینه پنهان یا بدقولی در زمان تحویل وجود ندارد.
              </p>
            </div>

            <div class="process-card comic-pop delay-3">
              <span class="step-badge">گام ۰۳</span>
              <h3 class="step-title">توسعه و آزمون</h3>
              <p class="step-desc">
                کار با بالاترین استانداردهای کدنویسی پیش می‌رود. در طول مسیر پیشرفت را به شما نشان می‌دهیم و همه‌چیز زیر بار آزمایش قرار می‌گیرد.
              </p>
            </div>

            <div class="process-card comic-pop delay-4">
              <span class="step-badge">گام ۰۴</span>
              <h3 class="step-title">تحویل و پشتیبانی</h3>
              <p class="step-desc">
                پروژه به صورت کامل، همراه با تست و سورس‌کد تحویل شما می‌شود و پس از راه‌اندازی نیز برای نگهداری و پاسخ به سوالات همراهتان هستیم.
              </p>
            </div>

          </div>
        </div>

        <!-- Left Column: Banner Illustration Side Panel (In RTL, inline-end is Left) -->
        <div class="process-side-panel">
          <div class="process-frame comic-pop delay-2">
            <img
              :src="requestStepsImg"
              alt="مراحل همکاری و سفارش پروژه در بسپر من"
              class="process-illustration"
              width="796"
              height="768"
              loading="lazy"
            />
          </div>
        </div>

      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import TextReveal from '@/components/ui/TextReveal.vue'
import TypingEffect from '@/components/ui/TypingEffect.vue'
import { useScrollReveal } from '@/composables/useScrollReveal'
import requestStepsImg from '../../pic/webp/request_steps.webp'

useScrollReveal()
</script>

<style scoped>
.process-section {
  padding-block: var(--space-20);
  background-color: var(--primitive-cream-100);
  border-block: var(--border-width-bold) solid var(--color-border-bold);
}

/* Main Container Card mirroring AboutSection */
.process-main-card {
  display: grid;
  grid-template-columns: 1fr;
  background-color: var(--color-canvas);
  border: var(--border-width-heavy) solid var(--color-border-bold);
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-lg);
  overflow: hidden;
}

@media (min-width: 960px) {
  .process-main-card {
    grid-template-columns: 7fr 5fr;
  }
}

/* Right Content Column */
.process-content {
  padding: var(--space-8);
  display: flex;
  flex-direction: column;
}

@media (min-width: 768px) {
  .process-content {
    padding: var(--space-10) var(--space-12);
  }
}

.process-badge {
  display: inline-block;
  align-self: flex-start;
  font-family: var(--font-body);
  font-size: var(--text-xs);
  font-weight: 700;
  color: var(--primitive-white);
  background-color: var(--color-accent);
  padding: var(--space-1) var(--space-3);
  border-radius: var(--border-radius-sm);
  margin-bottom: var(--space-3);
}

.process-title {
  font-size: var(--text-3xl);
  color: var(--color-ink-primary);
  margin-bottom: var(--space-3);
}

.process-subtitle {
  font-size: var(--text-base);
  color: var(--color-ink-muted);
  line-height: var(--leading-normal);
  margin-bottom: var(--space-8);
}

/* Steps Grid */
.steps-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-4);
  margin-top: auto;
}

@media (min-width: 580px) {
  .steps-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Individual Process Step Cards */
.process-card {
  position: relative;
  background-color: var(--primitive-cream-100);
  border: var(--border-width-bold) solid var(--color-border-bold);
  border-radius: var(--border-radius-sm);
  box-shadow: 2px 2px 0 var(--color-border-bold);
  padding: var(--space-5);
  display: flex;
  flex-direction: column;
  transition: transform var(--transition-bounce), box-shadow var(--transition-bounce), background-color 0.2s ease;
}

.process-card:hover {
  transform: translate(-2px, -2px);
  box-shadow: 4px 4px 0 var(--color-border-bold);
  background-color: var(--color-canvas);
}

.step-badge {
  display: inline-block;
  align-self: flex-start;
  font-family: var(--font-display);
  font-size: var(--text-xs);
  font-weight: 700;
  color: var(--color-accent-text);
  background-color: var(--color-canvas);
  border: 1px solid var(--color-border-bold);
  padding: 2px 8px;
  border-radius: var(--border-radius-sm);
  margin-bottom: var(--space-3);
}

.step-title {
  font-size: var(--text-base);
  font-weight: 800;
  color: var(--color-ink-primary);
  margin-bottom: var(--space-2);
}

.step-desc {
  font-size: var(--text-xs);
  color: var(--color-ink-muted);
  line-height: var(--leading-normal);
}

/* Left Column: Side Panel with Illustration */
.process-side-panel {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--primitive-sage-100);
  border-top: var(--border-width-bold) solid var(--color-border-bold);
  padding: var(--space-6);
  overflow: hidden;
}

@media (min-width: 960px) {
  .process-side-panel {
    border-top: none;
    border-inline-start: var(--border-width-bold) solid var(--color-border-bold);
    padding: var(--space-8);
  }
}

.process-frame {
  width: 100%;
  max-width: 440px;
  background-color: var(--color-canvas);
  border: var(--border-width-bold) solid var(--color-border-bold);
  border-radius: var(--border-radius-md);
  box-shadow: 4px 4px 0 var(--color-border-bold);
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: transform var(--transition-bounce), box-shadow var(--transition-bounce);
}

.process-frame:hover {
  transform: translate(-2px, -2px);
  box-shadow: 6px 6px 0 var(--color-border-bold);
}

.process-illustration {
  width: 100%;
  height: auto;
  display: block;
  object-fit: cover;
}
</style>
