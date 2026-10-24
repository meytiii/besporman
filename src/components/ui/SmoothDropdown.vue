<template>
  <div
    ref="containerRef"
    class="smooth-dropdown-root"
    :class="{ 'is-open': isOpen, 'is-selected': Boolean(selectedOption) }"
    @keydown="handleContainerKeydown"
  >
    <!-- Accessible Trigger Button -->
    <button
      type="button"
      class="dropdown-trigger"
      :class="{ 'has-value': Boolean(selectedOption), 'has-error': hasError }"
      :aria-expanded="isOpen"
      :aria-haspopup="'listbox'"
      :id="triggerId"
      @click="toggleDropdown"
      @keydown.down.prevent="openAndFocusNext"
      @keydown.up.prevent="openAndFocusPrev"
      @keydown.escape="closeDropdown"
    >
      <div class="trigger-label-group">
        <!-- Display pattern: "{label}: {selectedOption || '...'}" -->
        <span class="trigger-title">{{ label }}:</span>
        <span
          class="trigger-value"
          :class="{ 'is-placeholder': !selectedOption }"
        >
          {{ selectedOption ? selectedOption.label : '...' }}
        </span>
      </div>

      <!-- Neo-brutalist Action Morphing Indicator / Chevron -->
      <span class="trigger-chevron" aria-hidden="true">
        <svg
          class="chevron-svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </span>
    </button>

    <!-- Dropdown Menu Flyout -->
    <Transition name="dropdown-spring">
      <div
        v-if="isOpen"
        class="dropdown-menu-card"
        role="listbox"
        :aria-labelledby="triggerId"
        @mouseleave="handleMenuMouseLeave"
      >
        <ul
          ref="listRef"
          class="dropdown-options-list"
        >
          <!-- Dynamic Pointing Hand Indicator (Points Left from the Right Edge towards Hovered Option) -->
          <div
            class="dropdown-cursor-indicator"
            :class="{
              'is-active': isIndicatorVisible,
              'is-pressed': isOptionPressed,
            }"
            :style="indicatorStyle"
            aria-hidden="true"
          >
            <img
              :src="cursorDropdownImg"
              alt=""
              class="dropdown-cursor-img"
              width="48"
              height="24"
              draggable="false"
              loading="eager"
            />
          </div>

          <li
            v-for="option in options"
            :key="option.id"
            :ref="(el) => setOptionRef(option.id, el)"
            class="dropdown-option-item"
            :class="{
              'is-active': modelValue === option.id,
              'is-hovered': hoveredId === option.id,
            }"
            role="option"
            :aria-selected="modelValue === option.id"
            @click="selectOption(option)"
            @mouseenter="handleOptionMouseEnter(option)"
            @mousedown="handleOptionMouseDown"
            @mouseup="handleOptionMouseUp"
          >
            <!-- Option Content -->
            <div class="option-text-wrap">
              <span class="option-label">{{ option.label }}</span>
              <span v-if="option.subtext" class="option-subtext">{{ option.subtext }}</span>
            </div>

            <!-- Checkmark for Selected State -->
            <span
              v-if="modelValue === option.id"
              class="option-check-icon"
              aria-hidden="true"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </span>
          </li>
        </ul>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick, onMounted, onUnmounted } from 'vue'
import cursorDropdownImg from '../../../pic/webp/cursor_dropdown.webp'

export interface DropdownOption {
  id: string
  label: string
  subtext?: string
}

interface Props {
  label: string
  options: DropdownOption[]
  modelValue?: string
  hasError?: boolean
  triggerId?: string
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  hasError: false,
  triggerId: '',
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'change', option: DropdownOption): void
}>()

const isOpen = ref(false)
const hoveredId = ref<string | null>(null)
const containerRef = ref<HTMLElement | null>(null)
const listRef = ref<HTMLElement | null>(null)

const optionElements = new Map<string, HTMLElement>()
const setOptionRef = (id: string, el: any) => {
  if (el) {
    optionElements.set(id, el as HTMLElement)
  } else {
    optionElements.delete(id)
  }
}

const indicatorTop = ref(0)
const isIndicatorVisible = ref(false)
const isOptionPressed = ref(false)

const selectedOption = computed(() => {
  return props.options.find((opt) => opt.id === props.modelValue) || null
})

const indicatorStyle = computed(() => {
  return {
    '--target-y': `${indicatorTop.value}px`,
  }
})

const updateIndicatorForOption = (optionId: string) => {
  const el = optionElements.get(optionId)
  if (el) {
    // Center vertically within option item: (item height - indicator height) / 2
    indicatorTop.value = Math.round(el.offsetTop + (el.offsetHeight - 22) / 2)
    isIndicatorVisible.value = true
  }
}

const handleOptionMouseEnter = (option: DropdownOption) => {
  hoveredId.value = option.id
  updateIndicatorForOption(option.id)
}

const handleMenuMouseLeave = () => {
  hoveredId.value = null
  isIndicatorVisible.value = false
  isOptionPressed.value = false
}

const handleOptionMouseDown = () => {
  isOptionPressed.value = true
}

const handleOptionMouseUp = () => {
  isOptionPressed.value = false
}

const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}

const closeDropdown = () => {
  isOpen.value = false
  hoveredId.value = null
  isIndicatorVisible.value = false
  isOptionPressed.value = false
}

const selectOption = (opt: DropdownOption) => {
  emit('update:modelValue', opt.id)
  emit('change', opt)
  closeDropdown()
}

const openAndFocusNext = () => {
  if (!isOpen.value) {
    isOpen.value = true
    if (props.options.length > 0) {
      hoveredId.value = props.options[0].id
      nextTick(() => updateIndicatorForOption(props.options[0].id))
    }
    return
  }
  const currentIndex = props.options.findIndex((opt) => opt.id === hoveredId.value)
  const nextIndex = currentIndex < props.options.length - 1 ? currentIndex + 1 : 0
  const nextOption = props.options[nextIndex]
  if (nextOption) {
    hoveredId.value = nextOption.id
    updateIndicatorForOption(nextOption.id)
  }
}

const openAndFocusPrev = () => {
  if (!isOpen.value) {
    isOpen.value = true
    if (props.options.length > 0) {
      const last = props.options[props.options.length - 1]
      hoveredId.value = last.id
      nextTick(() => updateIndicatorForOption(last.id))
    }
    return
  }
  const currentIndex = props.options.findIndex((opt) => opt.id === hoveredId.value)
  const prevIndex = currentIndex > 0 ? currentIndex - 1 : props.options.length - 1
  const prevOption = props.options[prevIndex]
  if (prevOption) {
    hoveredId.value = prevOption.id
    updateIndicatorForOption(prevOption.id)
  }
}

const handleContainerKeydown = (e: KeyboardEvent) => {
  if (!isOpen.value) return
  if (e.key === 'Enter' || e.key === ' ') {
    if (hoveredId.value) {
      const opt = props.options.find((o) => o.id === hoveredId.value)
      if (opt) {
        e.preventDefault()
        selectOption(opt)
      }
    }
  }
}

// Coordinate initial indicator position when opened
watch(isOpen, async (opened) => {
  if (opened) {
    await nextTick()
    if (props.modelValue && optionElements.has(props.modelValue)) {
      const el = optionElements.get(props.modelValue)
      if (el) {
        indicatorTop.value = Math.round(el.offsetTop + (el.offsetHeight - 22) / 2)
      }
    } else if (props.options.length > 0 && optionElements.has(props.options[0].id)) {
      const el = optionElements.get(props.options[0].id)
      if (el) {
        indicatorTop.value = Math.round(el.offsetTop + (el.offsetHeight - 22) / 2)
      }
    }
  } else {
    isIndicatorVisible.value = false
    hoveredId.value = null
    isOptionPressed.value = false
  }
})

const handleOutsideClick = (e: MouseEvent) => {
  if (containerRef.value && !containerRef.value.contains(e.target as Node)) {
    closeDropdown()
  }
}

onMounted(() => {
  if (typeof document !== 'undefined') {
    document.addEventListener('mousedown', handleOutsideClick)
  }
})

onUnmounted(() => {
  if (typeof document !== 'undefined') {
    document.removeEventListener('mousedown', handleOutsideClick)
  }
})
</script>

<style scoped>
.smooth-dropdown-root {
  position: relative;
  width: 100%;
  user-select: none;
}

/* Neo-brutalist Trigger Button */
.dropdown-trigger {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-3, 12px);
  padding: 12px 16px;
  background-color: var(--color-canvas, #FAF7F0);
  color: var(--color-ink-primary, #0E0F12);
  border: 3px solid var(--color-ink-primary, #0E0F12);
  border-radius: var(--border-radius-md, 8px);
  box-shadow: 3px 3px 0 var(--color-ink-primary, #0E0F12);
  cursor: pointer;
  text-align: start;
  transition: transform 0.15s ease, box-shadow 0.15s ease, border-color 0.15s ease, background-color 0.15s ease;
  min-height: 48px;
}

.dropdown-trigger:hover {
  transform: translate(-1px, -1px);
  box-shadow: 4px 4px 0 var(--color-ink-primary, #0E0F12);
  background-color: var(--primitive-white, #FFFFFF);
}

.dropdown-trigger:focus-visible,
.is-open .dropdown-trigger {
  outline: none;
  border-color: var(--color-accent, #D93829);
  box-shadow: 0 0 0 3px rgba(217, 56, 41, 0.2), 3px 3px 0 var(--color-ink-primary, #0E0F12);
}

.dropdown-trigger.has-error {
  border-color: var(--color-accent-text, #C92A1D);
  background-color: rgba(217, 56, 41, 0.04);
}

.trigger-label-group {
  display: flex;
  align-items: baseline;
  flex-wrap: wrap;
  gap: 6px;
  min-width: 0;
  flex: 1 1 auto;
}

.trigger-title {
  font-family: var(--font-body, 'Vazirmatn', sans-serif);
  font-size: var(--text-sm, 14px);
  font-weight: 700;
  color: var(--color-ink-primary, #0E0F12);
  white-space: nowrap;
}

.trigger-value {
  font-family: var(--font-body, 'Vazirmatn', sans-serif);
  font-size: var(--text-sm, 14px);
  font-weight: 600;
  color: var(--color-accent-text, #C92A1D);
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.trigger-value.is-placeholder {
  color: var(--color-ink-muted, #5A5D64);
  font-weight: 800;
  font-size: var(--text-base, 16px);
  letter-spacing: 2px;
}

.trigger-chevron {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: var(--color-ink-primary, #0E0F12);
  transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}

.is-open .trigger-chevron {
  transform: rotate(180deg);
  color: var(--color-accent, #D93829);
}

/* Dropdown Menu Card */
.dropdown-menu-card {
  position: absolute;
  top: calc(100% + 8px);
  inset-inline-start: 0;
  min-width: 100%;
  width: max-content;
  max-width: min(340px, calc(100vw - 32px));
  max-height: 280px;
  overflow-y: auto;
  background-color: var(--primitive-white, #FFFFFF);
  border: 3px solid var(--color-ink-primary, #0E0F12);
  border-radius: var(--border-radius-md, 8px);
  box-shadow: 4px 6px 0 var(--color-ink-primary, #0E0F12);
  z-index: 60;
  padding: 6px;
  scroll-behavior: smooth;
}

.dropdown-options-list {
  position: relative;
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 3px;
}

/* Pointing Hand Cursor Indicator (Vintage Engraving Manicule pointing to the left on the right edge) */
.dropdown-cursor-indicator {
  position: absolute;
  inset-inline-start: 8px;
  top: 0;
  width: 44px;
  height: 22px;
  pointer-events: none;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transform: translate3d(14px, var(--target-y, 0px), 0) scale(0.85);
  transition:
    transform 0.22s cubic-bezier(0.16, 1, 0.3, 1),
    opacity 0.18s cubic-bezier(0.16, 1, 0.3, 1);
  will-change: transform, opacity;
  filter: drop-shadow(2px 2px 0px rgba(14, 15, 18, 0.28));
}

.dropdown-cursor-indicator.is-active {
  opacity: 1;
  transform: translate3d(0, var(--target-y, 0px), 0) scale(1);
}

/* Tactile Click / Mousedown State */
.dropdown-cursor-indicator.is-pressed {
  transform: translate3d(-4px, var(--target-y, 0px), 0) scale(0.92);
  transition: transform 0.08s ease-out;
}

.dropdown-cursor-img {
  display: block;
  width: 44px;
  height: 22px;
  object-fit: contain;
  user-select: none;
  pointer-events: none;
}

.dropdown-option-item {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding-block: 10px;
  padding-inline-start: 56px; /* Dedicated lane on the right/start side for the pointing hand cursor */
  padding-inline-end: 14px;
  border-radius: 6px;
  cursor: pointer;
  background-color: transparent;
  white-space: nowrap;
  transition: background-color 0.15s ease, color 0.15s ease;
}

.dropdown-option-item:hover,
.dropdown-option-item.is-hovered {
  background-color: rgba(217, 56, 41, 0.08);
}

.dropdown-option-item.is-active {
  background-color: var(--color-canvas, #FAF7F0);
  font-weight: 700;
}

.option-text-wrap {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
  transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}

.dropdown-option-item.is-hovered .option-text-wrap {
  transform: translateX(-3px);
}

.dropdown-option-item:active .option-text-wrap {
  transform: translateX(-5px);
}

.option-label {
  font-family: var(--font-body, 'Vazirmatn', sans-serif);
  font-size: var(--text-sm, 14px);
  font-weight: 600;
  color: var(--color-ink-primary, #0E0F12);
  transition: color 0.15s ease;
}

.dropdown-option-item.is-hovered .option-label {
  color: var(--color-accent-text, #C92A1D);
}

.dropdown-option-item.is-active .option-label {
  color: var(--color-accent-text, #C92A1D);
}

.option-subtext {
  font-family: var(--font-body, 'Vazirmatn', sans-serif);
  font-size: var(--text-xs, 12px);
  color: var(--color-ink-muted, #5A5D64);
}

.option-check-icon {
  display: flex;
  align-items: center;
  color: var(--color-accent, #D93829);
  flex-shrink: 0;
}

/* Spring Transition for Dropdown */
.dropdown-spring-enter-active {
  transition: opacity 0.2s ease, transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  transform-origin: top center;
}

.dropdown-spring-leave-active {
  transition: opacity 0.15s ease, transform 0.18s ease-in;
  transform-origin: top center;
}

.dropdown-spring-enter-from {
  opacity: 0;
  transform: translateY(-8px) scale(0.97);
}

.dropdown-spring-leave-to {
  opacity: 0;
  transform: translateY(-6px) scale(0.98);
}

@media (prefers-reduced-motion: reduce) {
  .dropdown-spring-enter-active,
  .dropdown-spring-leave-active {
    transition: opacity 0.1s ease !important;
    transform: none !important;
  }
  .dropdown-cursor-indicator {
    transition: opacity 0.1s ease !important;
    transform: none !important;
  }
  .option-text-wrap {
    transition: none !important;
    transform: none !important;
  }
}
</style>
