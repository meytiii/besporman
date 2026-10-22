<template>
  <div
    class="modern-loader-root"
    role="status"
    aria-live="polite"
    aria-label="در حال بارگذاری استودیو بسپر من"
  >
    <div class="macos-window">
      <!-- macOS Window Top Bar -->
      <div class="window-topbar" dir="ltr">
        <!-- Left Side: Controls & Besporman App Brand Badge -->
        <div class="topbar-left">
          <div class="window-controls">
            <span class="control-dot dot-close" aria-hidden="true" />
            <span class="control-dot dot-minimize" aria-hidden="true" />
            <span class="control-dot dot-maximize" aria-hidden="true" />
          </div>

          <div class="window-app-badge" title="Besporman.app">
            <img
              src="/favicon.png"
              alt="Besporman"
              class="app-favicon"
              width="18"
              height="18"
              loading="eager"
              decoding="sync"
            />
            <span class="app-name font-mono">Besporman.app</span>
          </div>
        </div>

        <!-- Center: Animated Persian Status Text (Typewriter Effect) -->
        <div class="window-title-container" dir="rtl">
          <span class="window-typewriter-text">
            {{ currentTypedText }}
            <span class="typewriter-cursor" :class="{ 'cursor-hidden': !cursorVisible }">|</span>
          </span>
        </div>

        <!-- Right Side: Clean Balanced Indicator -->
        <div class="topbar-right">
          <span class="status-indicator">
            <span class="pulse-dot" />
            <span class="status-label font-mono">LIVE</span>
          </span>
        </div>
      </div>

      <!-- IDE Code Editor Body -->
      <div
        ref="codeContainerRef"
        class="window-editor-body"
        dir="ltr"
      >
        <!-- Background Subtle Code Grid Lines -->
        <div class="code-lines-wrapper">
          <template v-for="(line, idx) in visibleLines" :key="line.id">
            <div
              v-if="visibleStart + idx < currentLine"
              class="code-line"
              :class="{
                'has-indent': line.segments[0]?.indent,
                'has-extra-margin': (idx + 1) % 4 === 0,
              }"
            >
              <!-- Line Number Column -->
              <span class="line-number font-mono">{{ formatLineNumber(visibleStart + idx + 1) }}</span>

              <!-- Code Syntax Block Segments -->
              <div class="line-segments">
                <template v-for="(seg, segIdx) in line.segments" :key="segIdx">
                  <div
                    v-if="seg.isCircle"
                    class="segment-circle"
                    :style="{ backgroundColor: seg.color }"
                  />
                  <div
                    v-else
                    class="segment-bar"
                    :style="{
                      width: seg.width,
                      backgroundColor: seg.color,
                    }"
                  />
                </template>
              </div>
            </div>

            <!-- Optional Code Block Divider Every 6 Lines -->
            <div
              v-if="(visibleStart + idx + 1) % 6 === 0 && visibleStart + idx < currentLine"
              class="code-divider"
            />
          </template>

          <!-- Active Typing Line With Blinking Cursor -->
          <div
            v-if="currentLine < lines.length"
            class="code-line active-typing-line"
            :class="{ 'has-indent': lines[currentLine]?.segments[0]?.indent }"
          >
            <span class="line-number font-mono">{{ formatLineNumber(currentLine + 1) }}</span>
            <div class="line-segments">
              <span
                class="active-code-cursor"
                :class="{ 'cursor-hidden': !cursorVisible }"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'

export interface ModernLoaderProps {
  words?: string[]
}

const props = withDefaults(defineProps<ModernLoaderProps>(), {
  words: () => [
    'در حال راه‌اندازی استودیو...',
    'بارگذاری ماژول‌های پروژه...',
    'کامپایل کدها و استایل‌ها...',
    'اتصال به ابزارهای اختصاصی...',
    'تقریباً آماده شد!...',
  ],
})

// Palette of syntax highlighting tokens adhering to Besporman's clean visual design
const SYNTAX_COLORS = [
  '#D93829', // Brand accent red
  '#06B6D4', // Modern cyan
  '#10B981', // Sage emerald
  '#F59E0B', // Warm amber
  '#3B82F6', // Royal blue
  '#8B5CF6', // Purple slate
  '#71717A', // Muted steel
]

interface Segment {
  width: string
  color: string
  isCircle: boolean
  indent: boolean
}

interface CodeLine {
  id: number
  segments: Segment[]
}

const BUFFER = 20
const MAX_LINES = 100

// Generate random code line segments
const generateLines = (count = 25): CodeLine[] => {
  return Array.from({ length: count }, (_, idx) => {
    const segmentCount = Math.floor(Math.random() * 4) + 1
    const hasIndent = Math.random() > 0.68
    return {
      id: Date.now() + Math.random() + idx,
      segments: Array.from({ length: segmentCount }, () => ({
        width: `${Math.floor(Math.random() * 75) + 45}px`,
        color: SYNTAX_COLORS[Math.floor(Math.random() * SYNTAX_COLORS.length)],
        isCircle: Math.random() > 0.92,
        indent: hasIndent,
      })),
    }
  })
}

const lines = ref<CodeLine[]>(generateLines(30))
const currentLine = ref(0)
const cursorVisible = ref(true)
const codeContainerRef = ref<HTMLDivElement | null>(null)

// Sliding visible range window
const visibleStart = computed(() => Math.max(0, currentLine.value - BUFFER))
const visibleEnd = computed(() => Math.min(lines.value.length, currentLine.value + BUFFER))
const visibleLines = computed(() => lines.value.slice(visibleStart.value, visibleEnd.value))

const formatLineNumber = (num: number): string => {
  return num < 10 ? `0${num}` : `${num}`
}

// Persian Typewriter Logic for macOS Titlebar
const currentWordIndex = ref(0)
const currentTypedText = ref('')
const isDeleting = ref(false)

let lineTimer: ReturnType<typeof setTimeout> | null = null
let cursorInterval: ReturnType<typeof setInterval> | null = null
let cleanupInterval: ReturnType<typeof setInterval> | null = null
let typewriterTimer: ReturnType<typeof setTimeout> | null = null

const advanceTypewriter = () => {
  const currentWord = props.words[currentWordIndex.value] || ''

  if (!isDeleting.value) {
    if (currentTypedText.value.length < currentWord.length) {
      currentTypedText.value = currentWord.slice(0, currentTypedText.value.length + 1)
      typewriterTimer = setTimeout(advanceTypewriter, 75)
    } else {
      // Pause on full word
      typewriterTimer = setTimeout(() => {
        isDeleting.value = true
        advanceTypewriter()
      }, 1600)
    }
  } else {
    if (currentTypedText.value.length > 0) {
      currentTypedText.value = currentWord.slice(0, currentTypedText.value.length - 1)
      typewriterTimer = setTimeout(advanceTypewriter, 40)
    } else {
      isDeleting.value = false
      currentWordIndex.value = (currentWordIndex.value + 1) % props.words.length
      typewriterTimer = setTimeout(advanceTypewriter, 350)
    }
  }
}

// Step line execution
const stepLine = () => {
  currentLine.value++
  if (currentLine.value >= lines.value.length - 10) {
    lines.value = [...lines.value, ...generateLines(40)]
  }

  // Auto scroll down smoothly
  if (codeContainerRef.value) {
    codeContainerRef.value.scrollTop = codeContainerRef.value.scrollHeight
  }

  lineTimer = setTimeout(stepLine, 190)
}

onMounted(() => {
  // Blinking cursor
  cursorInterval = setInterval(() => {
    cursorVisible.value = !cursorVisible.value
  }, 500)

  // Start typewriter
  advanceTypewriter()

  // Start code line generation
  lineTimer = setTimeout(stepLine, 250)

  // Memory cleanup
  cleanupInterval = setInterval(() => {
    if (lines.value.length > MAX_LINES && currentLine.value > BUFFER * 2) {
      const safeIndex = currentLine.value - BUFFER * 2
      if (safeIndex > 0) {
        currentLine.value -= safeIndex
        lines.value = lines.value.slice(safeIndex)
      }
    }
  }, 5000)
})

onUnmounted(() => {
  if (lineTimer) clearTimeout(lineTimer)
  if (cursorInterval) clearInterval(cursorInterval)
  if (cleanupInterval) clearInterval(cleanupInterval)
  if (typewriterTimer) clearTimeout(typewriterTimer)
})
</script>

<style scoped>
.modern-loader-root {
  width: 100%;
  max-width: 520px;
  margin: 0 auto;
  perspective: 1000px;
}

/* macOS Window Frame */
.macos-window {
  position: relative;
  width: 100%;
  height: 320px;
  background-color: #0E0F12;
  border-radius: var(--border-radius-lg, 16px);
  border: 2px solid var(--color-ink-primary, #0E0F12);
  box-shadow:
    0 20px 40px -15px rgba(0, 0, 0, 0.4),
    4px 4px 0px var(--color-ink-primary, #0E0F12);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  animation: window-appear 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes window-appear {
  0% {
    opacity: 0;
    transform: scale(0.94) translateY(8px);
  }
  100% {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

/* Top Bar (macOS Chrome) */
.window-topbar {
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  padding: 10px 14px;
  background-color: #17181D;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  user-select: none;
  gap: 12px;
}

.topbar-left {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
}

/* 3 macOS Window Controls */
.window-controls {
  display: flex;
  align-items: center;
  gap: 7px;
  flex-shrink: 0;
}

.control-dot {
  width: 11px;
  height: 11px;
  border-radius: 50%;
  display: inline-block;
  box-shadow: inset 0 0 0 0.5px rgba(0, 0, 0, 0.25);
}

.dot-close {
  background-color: #FF5F56;
}

.dot-minimize {
  background-color: #FFBD2E;
}

.dot-maximize {
  background-color: #27C93F;
}

/* Besporman App Brand Badge */
.window-app-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background-color: rgba(255, 255, 255, 0.06);
  padding: 3px 8px;
  border-radius: 6px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  flex-shrink: 0;
}

.app-favicon {
  width: 16px;
  height: 16px;
  border-radius: 3px;
  object-fit: contain;
}

.app-name {
  font-size: 11px;
  font-weight: 600;
  color: #E2E8DF;
  letter-spacing: -0.2px;
}

/* Center Persian Title (Typewriter) */
.window-title-container {
  text-align: center;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  padding: 0 4px;
}

.window-typewriter-text {
  font-family: var(--font-body, 'Vazirmatn', sans-serif);
  font-size: 12px;
  font-weight: 600;
  color: #E2E8DF;
}

.typewriter-cursor {
  display: inline-block;
  color: var(--color-accent, #D93829);
  font-weight: 700;
  margin-right: 2px;
  transition: opacity 0.1s linear;
}

.cursor-hidden {
  opacity: 0 !important;
}

/* Right Status Indicator */
.topbar-right {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-shrink: 0;
}

.status-indicator {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 10px;
  font-weight: 600;
  color: #10B981;
  background: rgba(16, 185, 129, 0.1);
  padding: 2px 7px;
  border-radius: 999px;
  border: 1px solid rgba(16, 185, 129, 0.2);
  letter-spacing: 0.5px;
}

.pulse-dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background-color: #10B981;
  animation: pulse-dot 1.8s ease-in-out infinite;
}

@keyframes pulse-dot {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.4;
    transform: scale(0.85);
  }
}

/* Code Editor Body */
.window-editor-body {
  position: relative;
  flex: 1;
  overflow-y: hidden;
  overflow-x: hidden;
  padding: 14px 16px;
  background-color: #0E0F12;
  scroll-behavior: smooth;
}

.code-lines-wrapper {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

/* Code Line */
.code-line {
  display: flex;
  align-items: center;
  gap: 12px;
  height: 18px;
  animation: line-fade-in 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes line-fade-in {
  0% {
    opacity: 0;
    transform: translateX(-4px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

.code-line.has-indent .line-segments {
  padding-left: 18px;
}

.code-line.has-extra-margin {
  margin-top: 4px;
}

/* Line Number */
.line-number {
  font-size: 11px;
  color: #52525B;
  width: 18px;
  text-align: right;
  flex-shrink: 0;
  user-select: none;
}

/* Line Segments */
.line-segments {
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1;
}

.segment-bar {
  height: 9px;
  border-radius: 3px;
  opacity: 0.65;
  transition: opacity 0.2s ease;
}

.segment-circle {
  width: 11px;
  height: 11px;
  border-radius: 50%;
  opacity: 0.65;
  flex-shrink: 0;
}

/* Divider */
.code-divider {
  width: 100%;
  height: 1px;
  background-color: rgba(255, 255, 255, 0.06);
  margin: 3px 0;
}

/* Active Typing Cursor */
.active-typing-line {
  opacity: 1;
}

.active-code-cursor {
  display: inline-block;
  width: 2.5px;
  height: 13px;
  background-color: var(--color-accent, #D93829);
  border-radius: 1px;
}

/* Responsive Scaling for Mobile (320px Floor) */
@media (max-width: 480px) {
  .macos-window {
    height: 270px;
  }

  .window-topbar {
    padding: 8px 10px;
    gap: 8px;
  }

  .app-name {
    display: none;
  }

  .window-typewriter-text {
    font-size: 11px;
  }

  .window-editor-body {
    padding: 10px 12px;
  }
}
</style>
