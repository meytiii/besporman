<template>
  <canvas
    ref="canvasRef"
    class="background-pixel-stars-canvas"
    aria-hidden="true"
    role="presentation"
  />
</template>

<script lang="ts">
// Besporman Tactile Comic Halftone Palette
// Iron Charcoal (#0E0F12), Deep Graphite (#27272A), Restrained Comic Red (#D93829),
// Vintage Sage (#7B8E78), Warm Tan/Amber (#D4A373), Warm Slate (#78716C)
export const DEFAULT_BRAND_COLORS: readonly string[] = Object.freeze([
  '#0E0F12', // Charcoal ink dot
  '#27272A', // Graphite muted dot
  '#D93829', // Comic accent red dot
  '#7B8E78', // Vintage sage stardust
  '#D4A373', // Warm tan / amber dust
  '#78716C', // Warm slate printing fiber
])
</script>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

export interface BackgroundPixelStarsProps {
  /** Pixel size for standard stars (default: 4px) */
  pixelSize?: number
  /** Shooting star pixel size (default: 2px) */
  shootingStarPixelSize?: number
  /** Star density per square pixel (default: 0.000035) */
  starDensity?: number
  /** Probability that a star twinkles (0 - 1, default: 0.65) */
  twinkleProbability?: number
  /** Target animation frame rate for retro feel (default: 16 FPS) */
  targetFps?: number
  /** Whether shooting stars are enabled (default: true) */
  enableShootingStars?: boolean
  /** Interval in ms between partial background star regenerations (default: 6000) */
  regenerationIntervalMs?: number
  /** Percent of stars regenerated per interval (0 - 1, default: 0.12) */
  regenerationRatio?: number
  /** Palette of star colors (defaults to Besporman tactile comic tokens) */
  colors?: readonly string[]
}

const props = withDefaults(defineProps<BackgroundPixelStarsProps>(), {
  pixelSize: 4,
  shootingStarPixelSize: 2,
  starDensity: 0.000035,
  twinkleProbability: 0.65,
  targetFps: 16,
  enableShootingStars: true,
  regenerationIntervalMs: 6000,
  regenerationRatio: 0.12,
  colors: () => DEFAULT_BRAND_COLORS,
})

// Type definitions
interface BackgroundStar {
  x: number
  y: number
  color: string
  baseOpacity: number
  currentOpacity: number
  twinkle: boolean
  twinkleSpeed: number
  twinkleDirection: number // -1 fading out, 1 fading in
  twinkleTimer: number
}

interface TrailPoint {
  x: number
  y: number
  opacity: number
}

interface ShootingStar {
  id: number
  x: number
  y: number
  angle: number
  speed: number
  distance: number
  trail: TrailPoint[]
}

interface StartPoint {
  x: number
  y: number
  angle: number
}

const canvasRef = ref<HTMLCanvasElement | null>(null)
let animationFrameId: number | null = null
let regenerationTimerId: ReturnType<typeof setInterval> | null = null
let shootingStarTimeoutId: ReturnType<typeof setTimeout> | null = null
let resizeDebounceTimer: ReturnType<typeof setTimeout> | null = null

const backgroundStars: BackgroundStar[] = []
let shootingStars: ShootingStar[] = []
let lastRenderTime = 0
const minTwinkleSpeed = 2
const maxTwinkleSpeed = 4

// Check prefers-reduced-motion
const prefersReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return false
  return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

// Random starting point for shooting stars
const getRandomStartPoint = (): StartPoint => {
  const width = window.innerWidth
  const x = Math.random() * width
  // Trajectory: 45 to 135 degrees (down-right to down-left)
  const angle = 45 + Math.random() * 90
  return { x, y: 0, angle }
}

// Create a new shooting star
const createNewShootingStar = (): ShootingStar => {
  const { x, y, angle } = getRandomStartPoint()
  return {
    id: Date.now() + Math.random(),
    x,
    y,
    angle,
    speed: Math.random() * 4 + 7,
    distance: 0,
    trail: [],
  }
}

// Initialize background stars
const initBackgroundStars = (): void => {
  const canvas = canvasRef.value
  if (!canvas) return

  backgroundStars.length = 0

  const area = canvas.width * canvas.height
  const numStars = Math.floor(area * props.starDensity)
  const colorPalette = props.colors.length > 0 ? props.colors : DEFAULT_BRAND_COLORS

  for (let i = 0; i < numStars; i++) {
    const shouldTwinkle = Math.random() < props.twinkleProbability
    const gridX = Math.floor(Math.random() * (canvas.width / props.pixelSize)) * props.pixelSize
    const gridY = Math.floor(Math.random() * (canvas.height / props.pixelSize)) * props.pixelSize
    const colorIndex = Math.floor(Math.random() * colorPalette.length)
    // Tactile opacity: subtle 0.15 - 0.45 range so it respects WCAG AA background contrast
    const baseOpacity = Math.random() * 0.30 + 0.15

    backgroundStars.push({
      x: gridX,
      y: gridY,
      color: colorPalette[colorIndex] ?? '#0E0F12',
      baseOpacity,
      currentOpacity: baseOpacity,
      twinkle: shouldTwinkle,
      twinkleSpeed: minTwinkleSpeed + Math.random() * (maxTwinkleSpeed - minTwinkleSpeed),
      twinkleDirection: -1,
      twinkleTimer: 0,
    })
  }
}

// Regenerate a small percentage of background stars periodically
const regenerateBackgroundStars = (): void => {
  const canvas = canvasRef.value
  if (!canvas || backgroundStars.length === 0) return

  const numToRegenerate = Math.max(
    1,
    Math.floor(backgroundStars.length * props.regenerationRatio)
  )
  const colorPalette = props.colors.length > 0 ? props.colors : DEFAULT_BRAND_COLORS

  for (let i = 0; i < numToRegenerate; i++) {
    const randomIndex = Math.floor(Math.random() * backgroundStars.length)
    const shouldTwinkle = Math.random() < props.twinkleProbability
    const gridX = Math.floor(Math.random() * (canvas.width / props.pixelSize)) * props.pixelSize
    const gridY = Math.floor(Math.random() * (canvas.height / props.pixelSize)) * props.pixelSize
    const colorIndex = Math.floor(Math.random() * colorPalette.length)
    const baseOpacity = Math.random() * 0.30 + 0.15

    backgroundStars[randomIndex] = {
      x: gridX,
      y: gridY,
      color: colorPalette[colorIndex] ?? '#0E0F12',
      baseOpacity,
      currentOpacity: baseOpacity,
      twinkle: shouldTwinkle,
      twinkleSpeed: minTwinkleSpeed + Math.random() * (maxTwinkleSpeed - minTwinkleSpeed),
      twinkleDirection: -1,
      twinkleTimer: 0,
    }
  }
}

// Draw static frame (for prefers-reduced-motion or initial render)
const drawStaticFrame = (): void => {
  const canvas = canvasRef.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  ctx.clearRect(0, 0, canvas.width, canvas.height)
  for (let i = 0; i < backgroundStars.length; i++) {
    const star = backgroundStars[i]
    if (!star) continue
    ctx.fillStyle = star.color
    ctx.globalAlpha = star.baseOpacity
    ctx.fillRect(star.x, star.y, props.pixelSize, props.pixelSize)
  }
}

// Main animation loop
const animateCanvas = (timestamp: number): void => {
  const frameInterval = 1000 / props.targetFps

  // Throttle to target FPS
  if (timestamp - lastRenderTime < frameInterval) {
    animationFrameId = requestAnimationFrame(animateCanvas)
    return
  }

  lastRenderTime = timestamp

  const canvas = canvasRef.value
  if (!canvas) {
    animationFrameId = requestAnimationFrame(animateCanvas)
    return
  }

  const ctx = canvas.getContext('2d')
  if (!ctx) {
    animationFrameId = requestAnimationFrame(animateCanvas)
    return
  }

  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  // 1. Draw and update background stars
  for (let i = 0; i < backgroundStars.length; i++) {
    const star = backgroundStars[i]
    if (!star) continue

    ctx.fillStyle = star.color
    ctx.globalAlpha = star.currentOpacity
    ctx.fillRect(star.x, star.y, props.pixelSize, props.pixelSize)

    // Update twinkling
    if (star.twinkle) {
      star.twinkleTimer += 1 / props.targetFps
      if (star.twinkleTimer >= star.twinkleSpeed) {
        star.twinkleTimer = 0
        star.twinkleDirection *= -1
      }

      const progress = star.twinkleTimer / star.twinkleSpeed
      if (progress < 0.5) {
        star.currentOpacity =
          star.twinkleDirection < 0 ? star.baseOpacity : star.baseOpacity * 0.35
      } else {
        star.currentOpacity =
          star.twinkleDirection < 0 ? star.baseOpacity * 0.35 : star.baseOpacity
      }
    }
  }

  // 2. Update and draw shooting stars
  if (props.enableShootingStars && shootingStars.length > 0) {
    const windowW = window.innerWidth
    const windowH = window.innerHeight

    shootingStars = shootingStars
      .map((star) => {
        const rad = (star.angle * Math.PI) / 180
        const newX = star.x + star.speed * Math.cos(rad)
        const newY = star.y + star.speed * Math.sin(rad)
        const newDistance = star.distance + star.speed

        const newTrail = [...star.trail]
        if (newDistance % 8 < star.speed) {
          newTrail.push({
            x: star.x,
            y: star.y,
            opacity: 0.85,
          })
        }

        const updatedTrail = newTrail
          .map((point) => ({ ...point, opacity: point.opacity - 0.12 }))
          .filter((point) => point.opacity > 0)

        return {
          ...star,
          x: newX,
          y: newY,
          distance: newDistance,
          trail: updatedTrail,
        }
      })
      .filter(
        (star) =>
          star.x >= -40 &&
          star.x <= windowW + 40 &&
          star.y >= -40 &&
          star.y <= windowH + 40
      )

    // Draw shooting stars
    for (let i = 0; i < shootingStars.length; i++) {
      const star = shootingStars[i]
      if (!star) continue

      // Draw trail with comic red warmth
      for (let j = 0; j < star.trail.length; j++) {
        const point = star.trail[j]
        if (!point) continue

        ctx.save()
        ctx.translate(point.x, point.y)
        ctx.rotate((star.angle * Math.PI) / 180)
        ctx.translate(-point.x, -point.y)

        // Comic red stardust trail with fading opacity
        ctx.fillStyle = `rgba(217, 56, 41, ${point.opacity * 0.7})`
        ctx.fillRect(point.x, point.y, props.shootingStarPixelSize, props.shootingStarPixelSize)
        ctx.restore()
      }

      // Draw star head (pixelated cross)
      const starWidth = 4
      const starHeight = 2

      ctx.save()
      ctx.translate(star.x, star.y)
      ctx.rotate((star.angle * Math.PI) / 180)
      ctx.translate(-star.x, -star.y)

      ctx.fillStyle = '#D93829' // Comic red star head
      ctx.globalAlpha = 0.9

      for (let y = 0; y < starHeight; y++) {
        for (let x = 0; x < starWidth; x++) {
          if ((x === 0 && y === 1) || (x === 3 && y === 0)) continue
          ctx.fillRect(
            star.x + x * props.shootingStarPixelSize,
            star.y + y * props.shootingStarPixelSize,
            props.shootingStarPixelSize,
            props.shootingStarPixelSize
          )
        }
      }

      ctx.restore()
    }
  }

  animationFrameId = requestAnimationFrame(animateCanvas)
}

// Schedule shooting star generation
const scheduleShootingStar = (): void => {
  if (!props.enableShootingStars || prefersReducedMotion()) return

  const delay = Math.random() * 5000 + 3500 // 3.5s - 8.5s
  shootingStarTimeoutId = setTimeout(() => {
    shootingStars.push(createNewShootingStar())
    scheduleShootingStar()
  }, delay)
}

// Handle window resize with debounce
const handleResize = (): void => {
  if (resizeDebounceTimer) clearTimeout(resizeDebounceTimer)
  resizeDebounceTimer = setTimeout(() => {
    const canvas = canvasRef.value
    if (!canvas) return
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    initBackgroundStars()
    if (prefersReducedMotion()) {
      drawStaticFrame()
    }
  }, 150)
}

onMounted(() => {
  const canvas = canvasRef.value
  if (!canvas) return

  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  initBackgroundStars()

  if (prefersReducedMotion()) {
    // Respect accessibility: draw gentle static stardust, no animation loop
    drawStaticFrame()
    window.addEventListener('resize', handleResize)
    return
  }

  // Start animation loop
  animationFrameId = requestAnimationFrame(animateCanvas)

  // Start periodic background stardust regeneration
  regenerationTimerId = setInterval(regenerateBackgroundStars, props.regenerationIntervalMs)

  // Schedule shooting stars
  scheduleShootingStar()

  // Listen for resize
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  if (animationFrameId !== null) {
    cancelAnimationFrame(animationFrameId)
    animationFrameId = null
  }
  if (regenerationTimerId !== null) {
    clearInterval(regenerationTimerId)
    regenerationTimerId = null
  }
  if (shootingStarTimeoutId !== null) {
    clearTimeout(shootingStarTimeoutId)
    shootingStarTimeoutId = null
  }
  if (resizeDebounceTimer !== null) {
    clearTimeout(resizeDebounceTimer)
    resizeDebounceTimer = null
  }
  window.removeEventListener('resize', handleResize)
})
</script>

<style scoped>
.background-pixel-stars-canvas {
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  z-index: 0;
  display: block;
  user-select: none;
  /* Hardware acceleration */
  transform: translate3d(0, 0, 0);
  will-change: contents;
}
</style>
