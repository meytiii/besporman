<template>
  <aside class="marquee-wrapper" aria-labelledby="marquee-heading">
    <!-- Section Header: Mascot & Title -->
    <div class="container marquee-header-container">
      <div class="marquee-header-inner">
        <div class="marquee-mascot-box comic-pop">
          <img
            :src="mascotLikeImg"
            alt="بسپر من - رضایت مشتریان"
            class="marquee-mascot-img"
            width="452"
            height="1162"
            loading="lazy"
          />
        </div>
        <h2 id="marquee-heading" class="marquee-section-title">
          <TextReveal
            as="span"
            text="نظرات مشتریای عزیزمون"
            preset="fade-in-blur"
            :speed-reveal="1.2"
          />
        </h2>
      </div>
    </div>

    <!-- Marquee Track Area (Scoped edge fades and moving cards) -->
    <div class="marquee-track-area">
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
        ref="viewportRef"
        class="marquee-viewport"
        aria-hidden="true"
        dir="ltr"
        @mouseenter="handleMouseEnter"
        @mouseleave="handleMouseLeave"
        @dblclick="handleDoubleClick"
        @touchstart="handleTouchStart"
        @touchmove="handleTouchMove"
        @touchend="handleTouchEnd"
        @touchcancel="handleTouchCancel"
        @mousedown="handleMouseDown"
      >
        <div
          ref="trackRef"
          class="marquee-track"
          :class="{ 'is-paused': isPaused, 'is-dragging': isDragging }"
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
  </div>
</aside>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import StarRating from './StarRating.vue'
import TextReveal from '@/components/ui/TextReveal.vue'
import { useScrollReveal } from '@/composables/useScrollReveal'
import mascotLikeImg from '../../pic/webp/besporman_like.webp'

useScrollReveal()

interface ReviewSource {
  name: string;
  text: string;
}

interface ReviewItem {
  name: string;
  text: string;
  type: 'web' | 'bot' | 'app' | 'amber' | 'coral' | 'slate';
  rating: number;
}

const BUBBLE_THEMES: ReviewItem['type'][] = ['web', 'amber', 'bot', 'coral', 'slate', 'app']
const DISPLAY_COUNT = 9

const getRandomRating = (): number => {
  const options = [3.5, 4.0, 4.5, 5.0]
  return options[Math.floor(Math.random() * options.length)]
}

const ALL_REVIEWS: ReviewSource[] = [
  {
    name: 'مهدی',
    text: 'از وقتی سایت برای مغازه‌ام بالا آوردین، فروشم دوبرابر شده ممنونم ازتون!',
  },
  {
    name: 'سارا',
    text: 'دیزاینتون واقعاً فوق‌العاده و درجه‌یکه، هر کی سایت رو می‌بینه کیف می‌کنه.',
  },
  {
    name: 'رضا',
    text: 'تشکر از تیم خوب بسپرمن بخاطر پشتیبانی عالی و خوبشون! دمتون گرم.',
  },
  {
    name: 'لیلا',
    text: 'خدایی دمتون گرم ایده‌هاتون حرف نداره، نرم‌افزار انبار کارمون رو خیلی راه انداخت.',
  },
  {
    name: 'علی',
    text: 'ربات تلگرامی که ساختین روزی چندصدتا سفارش رو خودکار فاکتور می‌کنه، عالیه.',
  },
  {
    name: 'پویا',
    text: 'سرعت لود سایتمون عالی شده، تو گوشی برق‌آسا باز می‌شه و مشتری معطل نمی‌مونه.',
  },
  {
    name: 'مریم',
    text: 'پشتیبانی و پیگیریتون واقعاً حرفه‌ای و صبورانه‌ست، مرسی از زحماتتون.',
  },
  {
    name: 'امید',
    text: 'برنامه ویندوزی تطبیق اکسل بعد از ماه‌ها هنوز بدون خطا کار می‌کنه، خسته نباشید.',
  },
  {
    name: 'نیما',
    text: 'بات تلگرام پشتیبانی که برامون نوشتید، بار پاسخگویی تیم رو نصف کرد، دمتون گرم.',
  },
  {
    name: 'فرنوش',
    text: 'سایت فروشگاهی دقیقا همونی شد که تو ذهنم بود؛ شیک، سریع و بدون هیچ پیچیدگی.',
  },
  {
    name: 'میلاد',
    text: 'نرم‌افزار مدیریت فاکتور ویندوز عالیه، حتی روی سیستم‌های قدیمی دفتر هم روون اجرا می‌شه.',
  },
  {
    name: 'سوگند',
    text: 'تحویل به‌موقع و اخلاق حرفه‌ای‌تون برام خیلی باارزش بود، همکاری با شما لذت‌بخش بود.',
  },
  {
    name: 'حسام',
    text: 'بات تلگرام قرعه‌کشی بدون حتی یه ثانیه قطعی کار کرد و اعضای کانال کلی راضی بودن.',
  },
  {
    name: 'نگار',
    text: 'واکنش‌گرایی سایت روی تبلت و موبایل بی‌نقصه، طراحی رنگ‌ها هم حسابی چشم‌نوازه.',
  },
  {
    name: 'احسان',
    text: 'اتوماسیون اکسل به دیتابیسی که زدید، روزی سه ساعت وقت حسابدارمون رو آزاد کرد.',
  },
  {
    name: 'پریا',
    text: 'از دیزاین تمیز و کدنویسی سبکتون مشخصه چقدر روی کار مسلط هستید، خدا قوت.',
  },
  {
    name: 'آرش',
    text: 'ربات ارسال پیامک و تلگرام همزمان خیلی به دردمون خورد، مشتری‌ها سریع مطلع می‌شن.',
  },
  {
    name: 'بهنام',
    text: 'نرم‌افزار ثبت سفارش آفلاین بدون باگ کار می‌کنه؛ دمتون گرم بابت پشتیبانی دقیق.',
  },
  {
    name: 'نسترن',
    text: 'صفحه اصلی سایت انقدر جذاب شده که تایم موندن کاربرها دو برابر شده، واقعا مرسی.',
  },
  {
    name: 'دانیال',
    text: 'ربات پرداخت تلگرام بدون معطلی تراکنش‌ها رو تایید می‌کنه، فروش شبانه رو متحول کرد.',
  },
  {
    name: 'هانیه',
    text: 'پنل کاربری انقدر ساده و خوش‌دست طراحی شده که بچه‌های دفتر بدون آموزش یاد گرفتن.',
  },
  {
    name: 'فرهاد',
    text: 'سرعت، دقت و درک نیاز مشتری؛ چیزی که توی کمتر تیمی دیدم. کارتون حرف نداشت.',
  },
  {
    name: 'ترانه',
    text: 'دیزاین مینیمال و فونت زیبای سایت نظر همه همکارها رو جلب کرد، دست‌مریزاد.',
  },
  {
    name: 'کیان',
    text: 'برنامه ویندوزی گزارش‌گیری سود و زیان دقیقاً همون چیزی بود که ماه‌ها دنبالش بودم.',
  },
  {
    name: 'سامان',
    text: 'بات تلگرام ادمین خودکار، اسپم‌ها رو درجا حذف می‌کنه و گروه کلاً امن و منظم شده.',
  },
  {
    name: 'شیما',
    text: 'تجربه کاربری سایت فوق‌العاده‌ست؛ مراحل خرید انقدر روونه که انصراف از خرید نداریم.',
  },
  {
    name: 'نوید',
    text: 'نرم‌افزار بایگانی اسناد خیلی سبک و پرسرعته، کار چندماهه تیم رو جمع کرد.',
  },
  {
    name: 'سپیده',
    text: 'بهترین تصمیمی بود که برای کسب‌وکارم گرفتم، از پشتیبانی گرمتون بی‌نهایت سپاسگزارم.',
  },
]

const shuffleArray = <T>(array: T[]): T[] => {
  const arr = [...array]
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

const generateRandomReviewList = (): ReviewItem[] => {
  const shuffled = shuffleArray(ALL_REVIEWS)
  const selected = shuffled.slice(0, DISPLAY_COUNT)
  return selected.map((item, index) => ({
    name: item.name,
    text: item.text,
    type: BUBBLE_THEMES[index % BUBBLE_THEMES.length],
    rating: getRandomRating(),
  }))
}

const reviewList = ref<ReviewItem[]>(generateRandomReviewList())

const trackRef = ref<HTMLDivElement | null>(null)
const tileRefA = ref<HTMLDivElement | null>(null)
const viewportRef = ref<HTMLDivElement | null>(null)

const isHovered = ref(false)
const isDoubleTapPaused = ref(false)
const isDragging = ref(false)

// Marquee is paused when hovered on desktop, double-tap toggled on mobile, or actively dragged
const isPaused = computed(() => isHovered.value || isDoubleTapPaused.value || isDragging.value)

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

  // Determine target speed based on pause state (hover, double-tap, or active touch drag)
  targetSpeed = isPaused.value ? 0 : BASE_SPEED

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

  // Advance transform if moving and not actively dragged by user's finger/mouse
  if (tileWidth > 0 && currentSpeed > 0 && !isDragging.value) {
    currentX = (currentX + currentSpeed * dt) % tileWidth
    if (trackRef.value) {
      trackRef.value.style.transform = `translate3d(-${currentX}px, 0, 0)`
    }
  }

  animationFrameId = requestAnimationFrame(updateLoop)
}

const handleMouseEnter = () => {
  if (typeof window !== 'undefined' && window.matchMedia) {
    if (window.matchMedia('(hover: none)').matches) {
      return
    }
  }
  isHovered.value = true
}

const handleMouseLeave = () => {
  isHovered.value = false
}

let lastTouchDoubleTapTime = 0

// Double-tap pause toggle
const toggleDoubleTapPause = () => {
  isDoubleTapPaused.value = !isDoubleTapPaused.value
}

const handleDoubleClick = () => {
  const now = performance.now()
  if (now - lastTouchDoubleTapTime < 500) {
    return
  }
  toggleDoubleTapPause()
}

// Mobile touch gestures: horizontal sweep & double-tap
let touchStartX = 0
let touchStartY = 0
let touchStartCurrentX = 0
let isTouching = false
let isHorizontalDrag = false
let dragDirectionLocked = false
let lastTapTime = 0
let lastTapX = 0
let lastTapY = 0

const handleTouchStart = (e: TouchEvent) => {
  isHovered.value = false // Clear any synthetic hover from touch devices
  if (e.touches.length !== 1) return
  const touch = e.touches[0]
  touchStartX = touch.clientX
  touchStartY = touch.clientY
  touchStartCurrentX = currentX
  isTouching = true
  isHorizontalDrag = false
  dragDirectionLocked = false
}

const handleTouchMove = (e: TouchEvent) => {
  if (!isTouching || e.touches.length !== 1) return
  const touch = e.touches[0]
  const deltaX = touch.clientX - touchStartX
  const deltaY = touch.clientY - touchStartY

  // Lock drag direction after 7px of movement
  if (!dragDirectionLocked) {
    if (Math.hypot(deltaX, deltaY) > 7) {
      dragDirectionLocked = true
      if (Math.abs(deltaX) >= Math.abs(deltaY)) {
        isHorizontalDrag = true
        isDragging.value = true
      } else {
        isHorizontalDrag = false
      }
    }
  }

  if (isHorizontalDrag) {
    if (e.cancelable) {
      e.preventDefault()
    }
    if (tileWidth === 0) {
      measureTile()
    }
    if (tileWidth > 0) {
      // Swiping right/left moves the track accordingly with seamless modulo wrap-around
      const rawX = touchStartCurrentX - deltaX
      currentX = ((rawX % tileWidth) + tileWidth) % tileWidth
      if (trackRef.value) {
        trackRef.value.style.transform = `translate3d(-${currentX}px, 0, 0)`
      }
    }
  }
}

const handleTouchEnd = (e: TouchEvent) => {
  if (!isTouching) return
  isTouching = false
  const wasHorizontalDrag = isHorizontalDrag
  isHorizontalDrag = false
  isDragging.value = false

  const touch = e.changedTouches[0]
  if (!touch) return

  const totalDeltaX = touch.clientX - touchStartX
  const totalDeltaY = touch.clientY - touchStartY
  const dist = Math.hypot(totalDeltaX, totalDeltaY)

  // Stationary tap check for double-tap detection
  if (dist < 16 && !wasHorizontalDrag) {
    const now = performance.now()
    const timeSinceLastTap = now - lastTapTime
    const distFromLastTap = Math.hypot(touch.clientX - lastTapX, touch.clientY - lastTapY)

    if (timeSinceLastTap >= 30 && timeSinceLastTap <= 400 && distFromLastTap < 45) {
      lastTouchDoubleTapTime = performance.now()
      toggleDoubleTapPause()
      lastTapTime = 0
    } else {
      lastTapTime = now
      lastTapX = touch.clientX
      lastTapY = touch.clientY
    }
  }
}

const handleTouchCancel = () => {
  isTouching = false
  isHorizontalDrag = false
  isDragging.value = false
}

// Mouse dragging support for desktop pair-programming and browser tests
let isMouseDown = false
let mouseStartX = 0
let mouseStartCurrentX = 0

const handleMouseDown = (e: MouseEvent) => {
  if (e.button !== 0) return
  isMouseDown = true
  mouseStartX = e.clientX
  mouseStartCurrentX = currentX
  if (typeof window !== 'undefined') {
    window.addEventListener('mousemove', handleWindowMouseMove)
    window.addEventListener('mouseup', handleWindowMouseUp)
  }
}

const handleWindowMouseMove = (e: MouseEvent) => {
  if (!isMouseDown) return
  const deltaX = e.clientX - mouseStartX
  if (Math.abs(deltaX) > 5) {
    isDragging.value = true
    if (tileWidth === 0) measureTile()
    if (tileWidth > 0) {
      const rawX = mouseStartCurrentX - deltaX
      currentX = ((rawX % tileWidth) + tileWidth) % tileWidth
      if (trackRef.value) {
        trackRef.value.style.transform = `translate3d(-${currentX}px, 0, 0)`
      }
    }
  }
}

const handleWindowMouseUp = () => {
  isMouseDown = false
  isDragging.value = false
  if (typeof window !== 'undefined') {
    window.removeEventListener('mousemove', handleWindowMouseMove)
    window.removeEventListener('mouseup', handleWindowMouseUp)
  }
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
  if (typeof window !== 'undefined') {
    window.removeEventListener('mousemove', handleWindowMouseMove)
    window.removeEventListener('mouseup', handleWindowMouseUp)
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
   Marquee Section Header with Mascot
   ========================================================================== */
.marquee-header-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: var(--space-6);
  text-align: center;
}

.marquee-header-inner {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-4);
}

.marquee-mascot-box {
  height: 190px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.marquee-mascot-img {
  height: 100%;
  width: auto;
  object-fit: contain;
  filter: drop-shadow(3px 3px 0 var(--color-border-bold));
  user-select: none;
}

.marquee-section-title {
  font-family: var(--font-display);
  font-size: var(--text-3xl);
  font-weight: 400;
  color: var(--color-ink-primary);
  margin: 0;
  line-height: var(--leading-tight);
}

.marquee-track-area {
  position: relative;
  width: 100%;
}

/* ==========================================================================
   Edge Fades (Gradient masks blending into --primitive-cream-100)
   ========================================================================== */
.marquee-fade {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 28px;
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
  touch-action: pan-y;
  cursor: grab;
  user-select: none;
  -webkit-user-select: none;
  -webkit-touch-callout: none;
}

.marquee-viewport:active,
.marquee-track.is-dragging {
  cursor: grabbing;
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
  top: 34px;
  inset-inline-start: 46px;
  inset-inline-end: 34px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 11px;
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
  margin-inline-start: 30px; /* Shift author name and avatar a bit left */
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
   Mobile Responsive Adjustments
   ========================================================================== */
@media (max-width: 768px) {
  .marquee-wrapper {
    padding-block: var(--space-6);
  }

  .marquee-header-container {
    margin-bottom: var(--space-4);
  }

  .marquee-header-inner {
    gap: var(--space-3);
  }

  .marquee-mascot-box {
    height: 140px;
  }

  .marquee-section-title {
    font-size: var(--text-2xl);
  }

  .marquee-tile {
    gap: var(--space-4);
    padding-inline-end: var(--space-4);
  }

  .comic-bubble {
    width: 280px;
    height: 195px;
    filter: drop-shadow(2.5px 2.5px 0 var(--color-border-bold));
  }

  .comic-bubble:hover {
    transform: translateY(-2px);
    filter: drop-shadow(3.5px 3.5px 0 var(--color-border-bold));
  }

  .bubble-inner-content {
    top: 22px;
    inset-inline-start: 34px;
    inset-inline-end: 24px;
    gap: 8px;
  }

  .bubble-author {
    margin-inline-start: 6px;
    gap: 6px;
  }

  .author-avatar {
    width: 24px;
    height: 24px;
    font-size: 11px;
  }

  .author-name {
    font-size: 13.5px;
  }

  :deep(.star-icon) {
    width: 14px;
    height: 14px;
  }

  :deep(.stars-track) {
    gap: 1.5px;
  }

  :deep(.score-badge) {
    font-size: 12px;
  }

  .bubble-text {
    font-size: 15px;
    font-weight: 500;
    line-height: 1.55;
    margin-inline-start: 2px;
    margin-inline-end: 2px;
  }

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
