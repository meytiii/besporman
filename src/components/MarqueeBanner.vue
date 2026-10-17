<template>
  <aside class="marquee-wrapper" aria-labelledby="marquee-heading">
    <h2 id="marquee-heading" class="sr-only">نظرات و رضایت مشتریان بسپر من</h2>

    <!-- 1. Edge Fades (Smoothly blending cards into the background) -->
    <div class="marquee-fade marquee-fade--left" aria-hidden="true"></div>
    <div class="marquee-fade marquee-fade--right" aria-hidden="true"></div>

    <!-- 2. Semantic Screen Reader Transcription (Never repeating in assistive tech) -->
    <ul class="sr-only">
      <li v-for="(review, index) in reviewList" :key="'sr-' + index">
        نظر {{ review.name }} (امتیاز {{ review.rating }} از ۵): «{{ review.text }}»
      </li>
    </ul>

    <!-- 3. Visual Looping Marquee Track (Strictly aria-hidden) -->
    <div
      class="marquee-viewport"
      aria-hidden="true"
      dir="ltr"
      @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave"
    >
      <div
        ref="trackRef"
        class="marquee-track"
        :class="{ 'is-paused': isHovered }"
      >
        <!-- Tile A (Original) -->
        <div ref="tileRefA" class="marquee-tile">
          <div
            v-for="(item, idx) in reviewList"
            :key="'tile-a-' + idx"
            class="comic-bubble"
            :class="'comic-bubble--' + item.type"
          >
            <div class="bubble-inner-content">
              <div class="bubble-header">
                <div class="bubble-author">
                  <span class="author-avatar" aria-hidden="true">{{ item.name[0] }}</span>
                  <span class="author-name">{{ item.name }}</span>
                </div>
                <StarRating :rating="item.rating" :uid="`tile-a-${idx}`" />
              </div>
              <p class="bubble-text">«{{ item.text }}»</p>
            </div>
          </div>
        </div>

        <!-- Tile B (Exact Identical Clone for Seamless Math Loop) -->
        <div class="marquee-tile">
          <div
            v-for="(item, idx) in reviewList"
            :key="'tile-b-' + idx"
            class="comic-bubble"
            :class="'comic-bubble--' + item.type"
          >
            <div class="bubble-inner-content">
              <div class="bubble-header">
                <div class="bubble-author">
                  <span class="author-avatar" aria-hidden="true">{{ item.name[0] }}</span>
                  <span class="author-name">{{ item.name }}</span>
                </div>
                <StarRating :rating="item.rating" :uid="`tile-b-${idx}`" />
              </div>
              <p class="bubble-text">«{{ item.text }}»</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import StarRating from './StarRating.vue'

interface ReviewItem {
  name: string;
  tag: string;
  text: string;
  type: 'web' | 'bot' | 'app' | 'amber' | 'coral' | 'slate';
  rating: number;
}

const getRandomRating = (): number => {
  const options = [3.5, 4.0, 4.5, 5.0]
  return options[Math.floor(Math.random() * options.length)]
}

const initialReviews: Omit<ReviewItem, 'rating'>[] = [
  {
    name: 'مهدی',
    tag: 'طراحی وب‌سایت',
    text: 'از وقتی سایت برای مغازه‌ام بالا آوردین، فروشم دوبرابر شده ممنونم ازتون!',
    type: 'web',
  },
  {
    name: 'سارا',
    tag: 'طراحی وب‌سایت',
    text: 'دیزاینتون واقعاً فوق‌العاده و درجه‌یکه، هر کی سایت رو می‌بینه کیف می‌کنه.',
    type: 'amber',
  },
  {
    name: 'رضا',
    tag: 'بات تلگرام',
    text: 'تشکر از تیم خوب بسپرمن بخاطر پشتیبانی عالی و خوبشون! دمتون گرم.',
    type: 'bot',
  },
  {
    name: 'لیلا',
    tag: 'نرم‌افزار ویندوز',
    text: 'خدایی دمتون گرم ایده‌هاتون حرف نداره، نرم‌افزار انبار کارمون رو خیلی راه انداخت.',
    type: 'coral',
  },
  {
    name: 'علی',
    tag: 'بات تلگرام',
    text: 'ربات تلگرامی که ساختین روزی چندصدتا سفارش رو خودکار فاکتور می‌کنه، عالیه.',
    type: 'slate',
  },
  {
    name: 'پویا',
    tag: 'طراحی وب‌سایت',
    text: 'سرعت لود سایتمون عالی شده، تو گوشی برق‌آسا باز می‌شه و مشتری معطل نمی‌مونه.',
    type: 'web',
  },
  {
    name: 'مریم',
    tag: 'بات تلگرام',
    text: 'پشتیبانی و پیگیریتون واقعاً حرفه‌ای و صبورانه‌ست، مرسی از زحماتتون.',
    type: 'bot',
  },
  {
    name: 'امید',
    tag: 'نرم‌افزار ویندوز',
    text: 'برنامه ویندوزی تطبیق اکسل بعد از ماه‌ها هنوز بدون خطا کار می‌کنه، خسته نباشید.',
    type: 'app',
  },
]

const reviewList = ref<ReviewItem[]>(
  initialReviews.map((item) => ({
    ...item,
    rating: getRandomRating(),
  }))
)

const trackRef = ref<HTMLDivElement | null>(null)
const tileRefA = ref<HTMLDivElement | null>(null)

const isHovered = ref(false)

// Smooth kinematic physics
const BASE_SPEED = 45 // cruising speed (px/s)
const DECEL_RATE = 65 // deceleration rate (~0.7s to complete halt)
const ACCEL_RATE = 55 // acceleration rate (~0.8s to full speed)

let currentX = 0
let currentSpeed = BASE_SPEED
let targetSpeed = BASE_SPEED
let lastTimestamp: number | null = null
let animationFrameId: number | null = null
let tileWidth = 0
let resizeObserver: ResizeObserver | null = null

const measureTile = () => {
  if (tileRefA.value) {
    const width = tileRefA.value.scrollWidth || tileRefA.value.offsetWidth
    if (width > 0) {
      tileWidth = width
    }
  }
}

const updateLoop = (timestamp: number) => {
  if (lastTimestamp === null) {
    lastTimestamp = timestamp
  }
  const dt = Math.min((timestamp - lastTimestamp) / 1000, 0.1) // limit dt to 100ms max
  lastTimestamp = timestamp

  // Determine target speed based on hover
  targetSpeed = isHovered.value ? 0 : BASE_SPEED

  // Smooth acceleration / deceleration
  if (currentSpeed > targetSpeed) {
    currentSpeed = Math.max(targetSpeed, currentSpeed - DECEL_RATE * dt)
  } else if (currentSpeed < targetSpeed) {
    currentSpeed = Math.min(targetSpeed, currentSpeed + ACCEL_RATE * dt)
  }

  // Ensure tile width is measured
  if (tileWidth === 0) {
    measureTile()
  }

  // Advance transform if moving
  if (tileWidth > 0 && currentSpeed > 0) {
    currentX = (currentX + currentSpeed * dt) % tileWidth
    if (trackRef.value) {
      trackRef.value.style.transform = `translate3d(-${currentX}px, 0, 0)`
    }
  }

  animationFrameId = requestAnimationFrame(updateLoop)
}

const handleMouseEnter = () => {
  isHovered.value = true
}

const handleMouseLeave = () => {
  isHovered.value = false
}

onMounted(() => {
  measureTile()

  if (typeof window !== 'undefined') {
    if (window.ResizeObserver && tileRefA.value) {
      resizeObserver = new ResizeObserver(() => {
        measureTile()
      })
      resizeObserver.observe(tileRefA.value)
    }

    const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!prefersReducedMotion && typeof window.requestAnimationFrame === 'function') {
      animationFrameId = requestAnimationFrame(updateLoop)
    }
  }
})

onUnmounted(() => {
  if (animationFrameId !== null && typeof window !== 'undefined') {
    cancelAnimationFrame(animationFrameId)
  }
  if (resizeObserver) {
    resizeObserver.disconnect()
  }
})
</script>

<style scoped>
.marquee-wrapper {
  position: relative;
  width: 100%;
  overflow: hidden;
  padding-block: var(--space-8);
  border-block: var(--border-width-bold) solid var(--color-border-bold);
  background-color: var(--primitive-cream-100);
}

/* ==========================================================================
   Edge Fades (Gradient masks blending into --primitive-cream-100)
   ========================================================================== */
.marquee-fade {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 60px;
  z-index: 10;
  pointer-events: none;
}

@media (min-width: 768px) {
  .marquee-fade {
    width: 120px;
  }
}

.marquee-fade--left {
  left: 0;
  background: linear-gradient(to right, var(--primitive-cream-100) 0%, rgba(244, 239, 230, 0) 100%);
}

.marquee-fade--right {
  right: 0;
  background: linear-gradient(to left, var(--primitive-cream-100) 0%, rgba(244, 239, 230, 0) 100%);
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
}

/* Identical Tile Construction */
.marquee-tile {
  display: flex;
  align-items: center;
  gap: var(--space-6);
  padding-inline-end: var(--space-6);
  flex-shrink: 0;
}

/* Comic Review Bubbles */
.comic-bubble {
  position: relative;
  width: 380px;
  height: 265px;
  flex-shrink: 0;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: center;
  filter: drop-shadow(3px 3px 0 var(--color-border-bold));
  direction: rtl; /* Persian text within bubble */
  text-align: start;
  transition: transform 0.2s ease, filter 0.2s ease;
  user-select: none;
}

.comic-bubble:hover {
  transform: translateY(-3px);
  filter: drop-shadow(5px 5px 0 var(--color-border-bold));
}

.comic-bubble--web {
  background-image: url('../../pic/webp/chat_bubble_web.webp');
}

.comic-bubble--bot {
  background-image: url('../../pic/webp/chat_bubble_bot.webp');
}

.comic-bubble--app {
  background-image: url('../../pic/webp/chat_bubble_app.webp');
}

.comic-bubble--amber {
  background-image: url('../../pic/webp/chat_bubble_amber.webp');
}

.comic-bubble--coral {
  background-image: url('../../pic/webp/chat_bubble_coral.webp');
}

.comic-bubble--slate {
  background-image: url('../../pic/webp/chat_bubble_slate.webp');
}

/* Inner Safe Zone inside Comic Bubble Artwork */
.bubble-inner-content {
  position: absolute;
  top: 48px;
  bottom: 78px;
  inset-inline-start: 46px;
  inset-inline-end: 34px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 12px;
  box-sizing: border-box;
}

/* Review Header */
.bubble-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-2);
}

.bubble-author {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
}

.author-avatar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  font-family: var(--font-display);
  font-size: var(--text-xs);
  color: var(--color-ink-primary);
  background-color: var(--primitive-amber-100);
  border: var(--border-width-bold) solid var(--color-border-bold);
  border-radius: var(--border-radius-full);
  box-shadow: 1px 1px 0 var(--color-border-bold);
  flex-shrink: 0;
}

.author-name {
  font-family: var(--font-body);
  font-size: var(--text-sm);
  font-weight: 700;
  color: var(--color-ink-primary);
  white-space: nowrap;
}

.bubble-text {
  font-family: var(--font-body);
  font-size: 13.5px;
  font-weight: 500;
  line-height: 1.65;
  color: var(--color-ink-primary);
  margin: 0;
}

/* ==========================================================================
   Accessible Reduced Motion Layout
   ========================================================================== */
@media (prefers-reduced-motion: reduce) {
  .marquee-track {
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

  .marquee-fade {
    display: none !important;
  }
}
</style>
