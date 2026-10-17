<template>
  <section class="hero-section" aria-labelledby="hero-title">
    <!-- 1. Hero Stage: Exactly spans the red zone behind mascot & neon sign -->
    <div class="hero-stage">
      <!-- Continuous Unstoppable Comic Strip Marquee Backdrop -->
      <div class="hero-comic-backdrop" aria-hidden="true" dir="ltr">
        <div class="hero-comic-track">
          <!-- Tile A -->
          <div class="hero-comic-tile">
            <img
              src="/pic/webp/header_1.webp"
              alt=""
              class="hero-comic-img"
              width="1376"
              height="768"
              loading="eager"
            />
            <img
              src="/pic/webp/header_2.webp"
              alt=""
              class="hero-comic-img"
              width="1376"
              height="768"
              loading="eager"
            />
            <img
              src="/pic/webp/header_3.webp"
              alt=""
              class="hero-comic-img"
              width="1376"
              height="768"
              loading="eager"
            />
          </div>

          <!-- Tile B (Exact Clone for Seamless Mathematical Loop) -->
          <div class="hero-comic-tile">
            <img
              src="/pic/webp/header_1.webp"
              alt=""
              class="hero-comic-img"
              width="1376"
              height="768"
              loading="eager"
            />
            <img
              src="/pic/webp/header_2.webp"
              alt=""
              class="hero-comic-img"
              width="1376"
              height="768"
              loading="eager"
            />
            <img
              src="/pic/webp/header_3.webp"
              alt=""
              class="hero-comic-img"
              width="1376"
              height="768"
              loading="eager"
            />
          </div>
        </div>

        <!-- Legibility & Vignette Overlay -->
        <div class="hero-comic-overlay"></div>
      </div>

      <!-- Foreground Stage Content: Title, Mascot, and Neon Sign -->
      <div class="container hero-stage-container">
        <!-- Creative Persian Headline Above Mascot -->
        <h1 id="hero-title" class="hero-title">
          خیالت از توسعه نرم‌افزار راحت؛<br />
          کار رو <span class="title-highlight">بسپر من!</span>
        </h1>

        <!-- Centered Mascot Stage & Neon Sign -->
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

          <!-- Physical Neon Sign Below Mascot -->
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
      </div>
    </div>

    <!-- 2. Primary Action Triggers & Trust Badges (Below the Stage) -->
    <div class="container hero-lower-container">
      <div class="hero-actions">
        <a href="#contact" class="btn btn-primary hero-btn-primary">
          <span class="btn-text">شروع پروژه و ثبت سفارش</span>
          <span class="btn-arrow" aria-hidden="true">←</span>
        </a>
        <a href="#projects" class="btn btn-secondary hero-btn-secondary">
          <span class="btn-text">بررسی نمونه‌کارها</span>
          <span class="btn-arrow" aria-hidden="true">←</span>
        </a>
      </div>

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
  padding-top: calc(var(--header-height) + var(--space-4));
  padding-bottom: var(--space-12);
  text-align: center;
  overflow-x: clip;
}

/* ==========================================================================
   Hero Stage (Exact Red Box Boundary: Full Width Behind Mascot & Sign)
   ========================================================================== */
.hero-stage {
  position: relative;
  width: 100%;
  padding-top: var(--space-4);
  padding-bottom: 0;
  overflow: hidden;
  background-color: var(--primitive-cream-100);
}

/* Continuous Unstoppable Comic Marquee Backdrop */
.hero-comic-backdrop {
  position: absolute;
  top: 60px;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: calc(100% - 60px);
  overflow: hidden;
  pointer-events: none; /* Marquee is unstoppable and never captures mouse events */
  user-select: none;
  z-index: 1;
}

@media (min-width: 768px) {
  .hero-comic-backdrop {
    top: 70px;
    height: calc(100% - 70px);
  }
}

.hero-comic-track {
  display: flex;
  height: 100%;
  width: max-content;
  animation: heroComicScroll 55s linear infinite;
  will-change: transform;
}

@keyframes heroComicScroll {
  0% {
    transform: translate3d(0, 0, 0);
  }
  100% {
    transform: translate3d(-50%, 0, 0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .hero-comic-track {
    animation: none !important;
  }
}

.hero-comic-tile {
  display: flex;
  height: 100%;
  flex-shrink: 0;
}

.hero-comic-img {
  height: 100%;
  width: auto;
  object-fit: cover;
  object-position: center top;
  flex-shrink: 0;
  display: block;
}

/* Legibility & Vignette Overlay */
.hero-comic-overlay {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background:
    /* Top fade gradient smoothly blending text into comic */
    linear-gradient(to bottom, rgba(250, 247, 240, 0.95) 0%, rgba(250, 247, 240, 0.65) 15%, rgba(250, 247, 240, 0) 35%, rgba(250, 247, 240, 0.45) 100%),
    /* Soft left and right edge fades */
    linear-gradient(to right, var(--color-canvas) 0%, transparent 60px, transparent calc(100% - 60px), var(--color-canvas) 100%);
}

/* Foreground Stage Container */
.hero-stage-container {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* Title */
.hero-title {
  font-family: var(--font-display);
  font-size: clamp(2.2rem, 1.8rem + 1.8vw, 3.2rem);
  line-height: var(--leading-tight);
  color: var(--color-ink-primary);
  margin-bottom: var(--space-2);
  max-width: 22ch;
  text-shadow: 0 0 16px rgba(250, 247, 240, 0.98), 0 0 6px rgba(250, 247, 240, 0.98), 0 2px 4px rgba(250, 247, 240, 0.95);
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
  margin-bottom: 0;
  width: 100%;
}

/* 3D Depth Shadow: Mascot casting silhouette shadow onto comic strip */
.mascot-stage {
  position: relative;
  width: 220px;
  height: 340px;
  overflow: visible;
  filter: drop-shadow(0 14px 18px rgba(14, 15, 18, 0.38))
          drop-shadow(0 24px 36px rgba(14, 15, 18, 0.28));
}

@media (min-width: 768px) {
  .mascot-stage {
    width: 280px;
    height: 420px;
    filter: drop-shadow(0 18px 24px rgba(14, 15, 18, 0.42))
            drop-shadow(0 32px 46px rgba(14, 15, 18, 0.32));
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
  height: 350px;
  width: auto;
  transform: translateX(-50.4%);
}

.mascot-layer--pose2 {
  height: 340px;
  width: auto;
  transform: translateX(-45.6%);
}

@media (min-width: 768px) {
  .mascot-layer--pose1 {
    height: 430px;
    transform: translateX(-50.4%);
  }
  .mascot-layer--pose2 {
    height: 420px;
    transform: translateX(-45.6%);
  }
}

/* Physical Neon Sign Below Mascot: Depth shadow and neon glow over comic strip */
.comic-sign-plate.neon-sign-plate {
  position: relative;
  width: 220px;
  max-width: 85vw;
  margin-top: -20px; /* Sits snugly under the mascot baseline */
  background: transparent;
  border: none;
  box-shadow: none;
  padding: 0;
  z-index: 3;
  filter: drop-shadow(4px 4px 0 var(--color-border-bold))
          drop-shadow(0 14px 18px rgba(14, 15, 18, 0.4));
  user-select: none;
}

@media (min-width: 768px) {
  .comic-sign-plate.neon-sign-plate {
    width: 290px;
    margin-top: -24px;
  }
}

.neon-sign-img {
  width: 100%;
  height: auto;
  display: block;
}

.neon-sign-img--on {
  /* Physical glowing red neon aura casting light over comic backdrop */
  filter: drop-shadow(0 0 16px rgba(225, 40, 25, 0.7))
          drop-shadow(0 0 35px rgba(225, 40, 25, 0.45))
          drop-shadow(0 0 60px rgba(225, 40, 25, 0.25));
}

/* ==========================================================================
   Lower Actions & Trust Chips
   ========================================================================== */
.hero-lower-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: var(--space-8);
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: var(--space-4);
  margin-bottom: var(--space-8);
}

.hero-actions .btn {
  position: relative;
  overflow: hidden;
  font-size: var(--text-lg);
  padding-inline-start: var(--space-6);
  padding-inline-end: 54px;
  min-height: 50px;
  cursor: pointer;
  transition:
    padding-inline 0.45s cubic-bezier(0.4, 0, 0.2, 1),
    transform 0.1s ease,
    box-shadow 0.1s ease,
    background-color 0.15s ease;
}

.hero-actions .btn:hover {
  padding-inline-start: 54px;
  padding-inline-end: var(--space-6);
}

.btn-text {
  position: relative;
  z-index: 2;
  transition: transform 0.45s cubic-bezier(0.4, 0, 0.2, 1);
}

.btn-arrow {
  position: absolute;
  inset-inline-end: 10px;
  top: 50%;
  transform: translateY(-50%) rotate(0deg);
  width: 30px;
  height: 30px;
  border-radius: var(--border-radius-full);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  line-height: 1;
  z-index: 3;
  margin: 0;
  transition:
    inset-inline-end 0.45s cubic-bezier(0.4, 0, 0.2, 1),
    transform 0.45s cubic-bezier(0.4, 0, 0.2, 1),
    background-color 0.2s ease;
}

.hero-btn-primary .btn-arrow {
  background-color: rgba(255, 255, 255, 0.25);
  color: var(--primitive-white);
}

.hero-btn-primary:hover .btn-arrow {
  background-color: rgba(255, 255, 255, 0.38);
}

.hero-btn-secondary .btn-arrow {
  background-color: rgba(14, 15, 18, 0.08);
  color: var(--color-ink-primary);
}

.hero-btn-secondary:hover .btn-arrow {
  background-color: rgba(14, 15, 18, 0.16);
}

.hero-actions .btn:hover .btn-arrow {
  inset-inline-end: calc(100% - 40px);
  transform: translateY(-50%) rotate(-45deg);
}

@media (prefers-reduced-motion: reduce) {
  .hero-actions .btn,
  .btn-text,
  .btn-arrow {
    transition: none !important;
  }
  .hero-actions .btn:hover {
    padding-inline-start: var(--space-6) !important;
    padding-inline-end: 54px !important;
  }
  .hero-actions .btn:hover .btn-arrow {
    inset-inline-end: 10px !important;
    transform: translateY(-50%) rotate(0deg) !important;
  }
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
