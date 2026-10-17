<template>
  <aside class="marquee-wrapper" aria-labelledby="marquee-heading">
    <h2 id="marquee-heading" class="sr-only">نمونه درخواست‌ها و نیازهای متداول مشتریان</h2>

    <!-- 1. Semantic Screen Reader Transcription (Never repeating in assistive tech) -->
    <ul class="sr-only">
      <li v-for="(request, index) in requestList" :key="'sr-' + index">
        {{ request.text }} (دسته‌بندی: {{ request.category }})
      </li>
    </ul>

    <!-- 2. Visual Looping Marquee Track (Strictly aria-hidden) -->
    <div
      class="marquee-viewport"
      aria-hidden="true"
      dir="ltr"
      @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave"
    >
      <div
        class="marquee-track"
        :class="{ 'is-paused': isPaused || isHovered }"
      >
        <!-- Tile A (Original) -->
        <div class="marquee-tile">
          <div
            v-for="(item, idx) in requestList"
            :key="'tile-a-' + idx"
            class="comic-bubble"
            :class="'comic-bubble--' + item.type"
          >
            <span class="bubble-tag">{{ item.category }}</span>
            <p class="bubble-text">«{{ item.text }}»</p>
          </div>
        </div>

        <!-- Tile B (Exact Identical Clone for Seamless Math Loop) -->
        <div class="marquee-tile">
          <div
            v-for="(item, idx) in requestList"
            :key="'tile-b-' + idx"
            class="comic-bubble"
            :class="'comic-bubble--' + item.type"
          >
            <span class="bubble-tag">{{ item.category }}</span>
            <p class="bubble-text">«{{ item.text }}»</p>
          </div>
        </div>
      </div>
    </div>

    <!-- 3. Explicit WCAG 2.2.2 Keyboard Pause/Play Control -->
    <div class="marquee-controls container">
      <button
        type="button"
        class="marquee-toggle-btn"
        :aria-pressed="isPaused"
        :aria-label="isPaused ? 'پخش انیمیشن نوار درخواست‌ها' : 'توقف انیمیشن نوار درخواست‌ها'"
        @click="toggleMarquee"
      >
        <span class="btn-icon" aria-hidden="true">{{ isPaused ? '▶' : '⏸' }}</span>
        <span class="btn-label">{{ isPaused ? 'پخش حرکت' : 'توقف حرکت' }}</span>
      </button>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface RequestBubble {
  category: string;
  text: string;
  type: 'web' | 'bot' | 'app';
}

const requestList: RequestBubble[] = [
  {
    category: 'بات تلگرام',
    text: 'یه بات تلگرام می‌خوام که سفارشات مشتری رو خودکار ثبت کنه و فاکتور بفرسته',
    type: 'bot'
  },
  {
    category: 'طراحی وب‌سایت',
    text: 'یه پورتفولیوی شخصی، خفن و سریع با طراحی اختصاصی برای نمونه‌کارهام نیاز دارم',
    type: 'web'
  },
  {
    category: 'نرم‌افزار ویندوز',
    text: 'یه برنامه سبک ویندوزی می‌خوایم که فایل‌های اکسل انبار رو تطبیق بده و گزارش بسازه',
    type: 'app'
  },
  {
    category: 'بات تلگرام',
    text: 'رباتی لازم داریم برای اتصال کانال اطلاع‌رسانی به پنل سفارش‌ها با پاسخ آنی',
    type: 'bot'
  },
  {
    category: 'طراحی وب‌سایت',
    text: 'سایتی می‌خوایم که در گوشی بدون معطلی لود بشه و فرم سفارشاتش خطا نده',
    type: 'web'
  }
]

const isPaused = ref(false)
const isHovered = ref(false)

const toggleMarquee = () => {
  isPaused.value = !isPaused.value
}

const handleMouseEnter = () => {
  isHovered.value = true
}

const handleMouseLeave = () => {
  isHovered.value = false
}
</script>

<style scoped>
.marquee-wrapper {
  position: relative;
  width: 100%;
  overflow: hidden;
  padding-block: var(--space-6);
  border-block: var(--border-width-bold) solid var(--color-border-bold);
  background-color: var(--primitive-cream-100);
}

.marquee-viewport {
  width: 100%;
  overflow: hidden;
}

/* ==========================================================================
   Continuous Seamless Loop Track (Math Proof: ΔX = -50% = -W)
   ========================================================================== */
.marquee-track {
  display: flex;
  width: max-content;
  gap: 0; /* Strictly zero gap to prevent seam jumps */
  will-change: transform;
  transform: translate3d(0, 0, 0);
  animation: marquee-scroll-left 38s linear infinite;
}

.marquee-track.is-paused {
  animation-play-state: paused;
}

@keyframes marquee-scroll-left {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

/* Identical Tile Construction */
.marquee-tile {
  display: flex;
  align-items: center;
  gap: var(--space-6);
  padding-inline-end: var(--space-6);
  flex-shrink: 0;
}

/* Comic Request Bubbles */
.comic-bubble {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
  min-width: 300px;
  max-width: 360px;
  padding: var(--space-4) var(--space-5);
  background-color: var(--color-canvas);
  border: var(--border-width-bold) solid var(--color-border-bold);
  border-radius: var(--border-radius-md);
  box-shadow: 3px 3px 0 var(--color-border-bold);
  direction: rtl; /* Persian text within tile */
  text-align: start;
}

.comic-bubble--bot {
  background-color: var(--primitive-sage-100);
}

.comic-bubble--app {
  background-color: var(--primitive-tan-100);
}

.bubble-tag {
  display: inline-block;
  align-self: flex-start;
  font-family: var(--font-body);
  font-size: var(--text-xs);
  font-weight: 700;
  color: var(--color-ink-primary);
  background-color: rgba(0, 0, 0, 0.08);
  padding: 2px var(--space-2);
  border-radius: var(--border-radius-sm);
}

.bubble-text {
  font-family: var(--font-body);
  font-size: var(--text-sm);
  font-weight: 500;
  line-height: var(--leading-snug);
  color: var(--color-ink-primary);
}

/* Controls */
.marquee-controls {
  display: flex;
  justify-content: flex-end;
  margin-top: var(--space-3);
}

.marquee-toggle-btn {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  min-height: 36px;
  padding: var(--space-1) var(--space-3);
  font-family: var(--font-body);
  font-size: var(--text-xs);
  font-weight: 700;
  color: var(--color-ink-primary);
  background-color: var(--color-canvas);
  border: var(--border-width-bold) solid var(--color-border-bold);
  border-radius: var(--border-radius-sm);
  box-shadow: 2px 2px 0 var(--color-border-bold);
  cursor: pointer;
  transition: transform 0.1s ease, box-shadow 0.1s ease;
}

.marquee-toggle-btn:hover {
  transform: translate(-1px, -1px);
  box-shadow: 3px 3px 0 var(--color-border-bold);
}

.marquee-toggle-btn:active {
  transform: translate(1px, 1px);
  box-shadow: 1px 1px 0 var(--color-border-bold);
}

/* ==========================================================================
   Accessible Reduced Motion Layout
   ========================================================================== */
@media (prefers-reduced-motion: reduce) {
  .marquee-track {
    animation: none !important;
    transform: none !important;
    flex-wrap: wrap;
    justify-content: center;
    gap: var(--space-4);
  }

  .marquee-tile:nth-child(2) {
    display: none !important; /* Hide duplicate clone */
  }

  .marquee-tile:first-child {
    max-width: 100%;
    overflow: visible;
    flex-wrap: wrap;
    justify-content: center;
  }

  .marquee-controls {
    display: none !important;
  }
}
</style>
