<template>
  <div class="error-404-wrapper" role="region" aria-label="صفحه پیدا نشد">
    <!-- SVG Cloud & Sky Background -->
    <div class="svg-background-layer" aria-hidden="true">
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 1440 560"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
        class="cloud-svg"
      >
        <g mask="url(#cloudMask1000)" fill="none">
          <!-- Deep Blue Twilight Sky -->
          <rect width="1440" height="560" x="0" y="0" fill="#1e3266" />

          <!-- Mid-layer Cloud Horizon -->
          <path
            class="cloud-path cloud-path-mid"
            d="M1488 560L0 560 L0 468.76Q37.54 386.3, 120 423.84Q189.28 373.12, 240 442.4Q291.19 421.58, 312 472.77Q366.23 455, 384 509.22Q410.11 463.33, 456 489.43Q489.15 402.58, 576 435.73Q623.36 411.09, 648 458.45Q729.6 420.04, 768 501.64Q816.33 429.97, 888 478.3Q896.89 415.19, 960 424.09Q1002.02 394.11, 1032 436.13Q1123.51 407.64, 1152 499.16Q1168.55 443.71, 1224 460.26Q1272.78 437.04, 1296 485.82Q1310.17 428, 1368 442.17Q1434.53 388.7, 1488 455.22z"
            fill="#356cb1"
          />

          <!-- Foreground Billowing Cloud Wave -->
          <path
            class="cloud-path cloud-path-front"
            d="M1488 560L0 560 L0 545.74Q39.06 464.8, 120 503.85Q162.45 474.31, 192 516.76Q262.98 467.74, 312 538.71Q325.37 480.08, 384 493.45Q461.74 499.19, 456 576.93Q497.16 546.09, 528 587.24Q552.74 539.98, 600 564.71Q601.25 493.96, 672 495.2Q708.76 459.97, 744 496.73Q803.3 484.03, 816 543.33Q866 521.34, 888 571.34Q913.61 476.95, 1008 502.56Q1087.71 462.27, 1128 541.98Q1194.09 488.07, 1248 554.16Q1293.39 479.56, 1368 524.95Q1450.82 487.77, 1488 570.59z"
            fill="#FAF7F0"
          />
        </g>
        <defs>
          <mask id="cloudMask1000">
            <rect width="1440" height="560" fill="#ffffff" />
          </mask>
        </defs>
      </svg>
    </div>

    <!-- Centered Atmospheric Content -->
    <div class="content-container">
      <!-- 404 Giant Display Heading -->
      <h1 class="error-number" aria-label="خطای ۴۰۴">
        ۴۰۴
      </h1>

      <!-- Persian Translated Description -->
      <p class="error-description">
        به نظر میاد صفحه‌ای که دنبالشی توی آسمونا گم شده!
      </p>

      <p class="error-hint">
        میخوای خیلی آروم به صفحه اصلی برگردیم؟
      </p>

      <!-- Return Home Button with tactile arrow -->
      <router-link to="/" class="btn-return-home" aria-label="برگرد به خونه">
        <span class="btn-text">برگرد به خونه</span>
        <AppButtonArrow direction="left" />
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import AppButtonArrow from '@/components/AppButtonArrow.vue'
</script>

<style scoped>
.error-404-wrapper {
  position: relative;
  min-height: calc(100vh - 80px);
  min-height: calc(100dvh - 80px);
  width: 100%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-12) var(--space-4) var(--space-16);
  background-color: #1e3266;
}

/* Background Layer */
.svg-background-layer {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  pointer-events: none;
  overflow: hidden;
}

.cloud-svg {
  width: 100%;
  height: 100%;
  position: absolute;
  bottom: -2px;
  left: 0;
  display: block;
}

@media (min-width: 768px) {
  .cloud-svg {
    bottom: -10px;
  }
}

/* Subtle Floating Cloud Drift Animations */
.cloud-path-mid {
  animation: cloudDriftSlow 12s ease-in-out infinite alternate;
  transform-origin: bottom center;
}

.cloud-path-front {
  animation: cloudDriftFast 8s ease-in-out infinite alternate;
  transform-origin: bottom center;
}

@keyframes cloudDriftSlow {
  0% {
    transform: translateY(0) scaleY(1);
  }
  100% {
    transform: translateY(-8px) scaleY(1.02);
  }
}

@keyframes cloudDriftFast {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-5px);
  }
}

@media (prefers-reduced-motion: reduce) {
  .cloud-path-mid,
  .cloud-path-front {
    animation: none;
  }
}

/* Foreground Content */
.content-container {
  position: relative;
  z-index: 10;
  text-align: center;
  max-width: 680px;
  width: 90%;
  margin-inline: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  transform: translateY(-20px);
}

@media (min-width: 768px) {
  .content-container {
    transform: translateY(-40px);
  }
}

.error-number {
  font-family: var(--font-display, 'Lalezar');
  font-size: clamp(6rem, 18vw, 10.5rem);
  font-weight: 900;
  line-height: 0.85;
  letter-spacing: 0;
  color: #FFFFFF;
  margin-bottom: var(--space-4);
  text-shadow:
    4px 4px 0 #0E0F12,
    -1px -1px 0 #0E0F12,
    1px -1px 0 #0E0F12,
    -1px 1px 0 #0E0F12;
  animation: floatTitle 4s ease-in-out infinite alternate;
}

@keyframes floatTitle {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-6px);
  }
}

@media (prefers-reduced-motion: reduce) {
  .error-number {
    animation: none;
  }
}

.error-description {
  font-family: var(--font-body);
  font-size: var(--text-lg);
  font-weight: 700;
  color: rgba(255, 255, 255, 0.95);
  line-height: var(--leading-relaxed);
  margin-bottom: var(--space-2);
  text-shadow: 1px 1px 3px rgba(14, 15, 18, 0.7);
}

@media (min-width: 640px) {
  .error-description {
    font-size: var(--text-xl);
  }
}

.error-hint {
  font-family: var(--font-body);
  font-size: var(--text-sm);
  color: rgba(255, 255, 255, 0.75);
  line-height: var(--leading-normal);
  max-width: 520px;
  margin-bottom: var(--space-8);
  text-shadow: 1px 1px 2px rgba(14, 15, 18, 0.6);
}

/* Tactile Neo-Brutalist Return Home Button */
.btn-return-home {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-4);
  padding: var(--space-3) var(--space-8);
  background-color: var(--primitive-white, #FFFFFF);
  color: var(--color-ink-primary, #0E0F12);
  border: var(--border-width-bold, 2px) solid var(--color-border-bold, #0E0F12);
  border-radius: var(--border-radius-pill, 9999px);
  box-shadow: 4px 4px 0 var(--color-border-bold, #0E0F12);
  font-family: var(--font-body);
  font-size: var(--text-base);
  font-weight: 800;
  text-decoration: none;
  cursor: pointer;
  transition: transform var(--transition-bounce), box-shadow var(--transition-bounce), background-color 0.15s ease;
}

.btn-return-home:hover {
  transform: translate(-3px, -3px);
  box-shadow: 7px 7px 0 var(--color-border-bold, #0E0F12);
  background-color: var(--primitive-cream-100, #F5EFEB);
}

.btn-return-home:focus-visible {
  outline: 3px solid #D93829;
  outline-offset: 3px;
}

.btn-return-home:active {
  transform: translate(1px, 1px);
  box-shadow: 2px 2px 0 var(--color-border-bold, #0E0F12);
}

.btn-text {
  position: relative;
  top: -1px;
}
</style>
