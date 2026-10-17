<template>
  <section class="hero-section" aria-labelledby="hero-title">
    <div class="container hero-container">
      
      <!-- Creative Persian Headline Above Mascot -->
      <h1 id="hero-title" class="hero-title">
        خیالت از توسعه نرم‌افزار راحت؛<br />
        <span class="title-highlight">کار رو بسپر من!</span>
      </h1>

      <!-- 3. Centered Mascot Stage (2-Second Mechanical Hard Cut) -->
      <div class="mascot-wrapper">
        <div
          class="mascot-stage"
          role="img"
          aria-label="کاراکتر بسپر من در حال اشاره با اعتمادبه‌نفس"
        >
          <!-- Pose 1: Pointing to himself -->
          <img
            v-show="currentPose === 1"
            src="/pic/webp/besporman1.webp"
            alt=""
            class="mascot-layer mascot-layer--pose1"
            width="470"
            height="1200"
          />

          <!-- Pose 2: Pointing down -->
          <img
            v-show="currentPose === 2"
            src="/pic/webp/besporman2.webp"
            alt=""
            class="mascot-layer mascot-layer--pose2"
            width="607"
            height="1498"
          />
        </div>

        <!-- 4. Physical Neon Sign Below Mascot -->
        <div class="comic-sign-plate neon-sign-plate" role="img" aria-label="تابلوی نئون بسپر من">
          <span class="sr-only">بسپر من</span>
          <!-- Off State (when mascot pose 1: pointing to himself) -->
          <img
            v-show="currentPose === 1"
            src="/pic/webp/neon_sign_off.webp"
            alt="تابلوی بسپر من خاموش"
            class="neon-sign-img neon-sign-img--off"
            width="1052"
            height="599"
          />

          <!-- On State (when mascot pose 2: pointing down to sign) -->
          <img
            v-show="currentPose === 2"
            src="/pic/webp/neon_sign_on.webp"
            alt="تابلوی نئون بسپر من روشن"
            class="neon-sign-img neon-sign-img--on"
            width="1052"
            height="598"
          />
        </div>
      </div>

      <!-- 5. Primary Action Triggers -->
      <div class="hero-actions">
        <a href="#contact" class="btn btn-primary hero-btn-primary">
          <span>شروع پروژه و ثبت سفارش</span>
          <span class="btn-arrow" aria-hidden="true">←</span>
        </a>
        <a href="#projects" class="btn btn-secondary hero-btn-secondary">
          <span>بررسی نمونه‌کارها</span>
        </a>
      </div>

      <!-- 6. Trust Badges -->
      <div class="hero-trust-chips">
        <div class="trust-chip">
          <span class="chip-dot" aria-hidden="true"></span>
          <span>کدنویسی اختصاصی و استاندارد</span>
        </div>
        <div class="trust-chip">
          <span class="chip-dot" aria-hidden="true"></span>
          <span>پشتیبانی مداوم پس از تحویل</span>
        </div>
        <div class="trust-chip">
          <span class="chip-dot" aria-hidden="true"></span>
          <span>ارتباط مستقیم با توسعه‌دهنده</span>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

// 1.5-Second Mechanical Hard-Cut Pose & Neon Sign Switching
const currentPose = ref<1 | 2>(1)
let poseInterval: number | null = null

onMounted(() => {
  if (typeof window !== 'undefined') {
    const prefersReducedMotion =
      window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!prefersReducedMotion) {
      poseInterval = window.setInterval(() => {
        currentPose.value = currentPose.value === 1 ? 2 : 1
      }, 1500)
    }
  }
})

onUnmounted(() => {
  if (poseInterval) {
    clearInterval(poseInterval)
  }
})
</script>

<style scoped>
.hero-section {
  position: relative;
  padding-top: calc(var(--header-height) + var(--space-8));
  padding-bottom: var(--space-12);
  text-align: center;
  overflow: visible;
}

.hero-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* Title */
.hero-title {
  font-family: var(--font-display);
  font-size: var(--text-hero);
  line-height: var(--leading-tight);
  color: var(--color-ink-primary);
  margin-bottom: var(--space-4);
  max-width: 22ch;
}

.title-highlight {
  color: var(--color-accent);
  text-decoration: underline;
  text-decoration-thickness: 4px;
  text-underline-offset: 6px;
}

/* ==========================================================================
   Mascot Stage & Baseline Coordination
   ========================================================================== */
.mascot-wrapper {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: var(--space-8);
  width: 100%;
}

.mascot-stage {
  position: relative;
  width: 300px;
  height: 460px;
  overflow: visible;
}

@media (min-width: 768px) {
  .mascot-stage {
    width: 400px;
    height: 620px;
  }
}

/* Ground layers at bottom: 0 to align shoes identically */
.mascot-layer {
  position: absolute;
  bottom: 0;
  left: 50%;
  pointer-events: none;
  user-select: none;
  transition: none !important; /* Strictly abrupt mechanical hard cut */
}

/* Normalized Dimensions and Horizontal Head Centering */
.mascot-layer--pose1 {
  height: 470px;
  width: auto;
  transform: translateX(-50.4%);
}

.mascot-layer--pose2 {
  height: 460px;
  width: auto;
  transform: translateX(-45.6%);
}

@media (min-width: 768px) {
  .mascot-layer--pose1 {
    height: 630px;
    transform: translateX(-50.4%);
  }
  .mascot-layer--pose2 {
    height: 620px;
    transform: translateX(-45.6%);
  }
}

/* Physical Neon Sign Below Mascot */
.comic-sign-plate.neon-sign-plate {
  position: relative;
  width: 280px;
  max-width: 85vw;
  margin-top: -26px; /* Sits snugly under the mascot baseline */
  background: transparent;
  border: none;
  box-shadow: none;
  padding: 0;
  z-index: 2;
  filter: drop-shadow(4px 4px 0 var(--color-border-bold));
  user-select: none;
}

@media (min-width: 768px) {
  .comic-sign-plate.neon-sign-plate {
    width: 410px;
    margin-top: -36px;
  }
}

.neon-sign-img {
  width: 100%;
  height: auto;
  display: block;
}

.neon-sign-img--on {
  /* Physical glowing red neon aura */
  filter: drop-shadow(0 0 16px rgba(225, 40, 25, 0.6)) drop-shadow(0 0 32px rgba(225, 40, 25, 0.35));
}

/* Actions */
.hero-actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: var(--space-4);
  margin-bottom: var(--space-8);
}

.hero-btn-primary {
  font-size: var(--text-lg);
  padding-inline: var(--space-8);
}

.hero-btn-secondary {
  font-size: var(--text-lg);
}

.btn-arrow {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: var(--border-radius-full);
  background-color: rgba(255, 255, 255, 0.25);
  margin-inline-start: var(--space-1);
}

/* Trust Chips */
.hero-trust-chips {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: var(--space-4);
}

.trust-chip {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  font-family: var(--font-body);
  font-size: var(--text-xs);
  font-weight: 700;
  color: var(--color-ink-muted);
}

.chip-dot {
  width: 8px;
  height: 8px;
  background-color: var(--primitive-red-600);
  border-radius: var(--border-radius-full);
}
</style>
