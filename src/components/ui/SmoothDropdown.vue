<template>
  <div
    ref="containerRef"
    class="smooth-dropdown-root"
    :class="{ 'is-open': isOpen, 'is-selected': Boolean(selectedOption) }"
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
      @keydown.down.prevent="openAndFocusFirst"
      @keydown.up.prevent="openAndFocusLast"
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
      >
        <ul class="dropdown-options-list">
          <li
            v-for="(option, idx) in options"
            :key="option.id"
            class="dropdown-option-item"
            :class="{
              'is-active': modelValue === option.id,
              'is-hovered': hoveredId === option.id,
            }"
            role="option"
            :aria-selected="modelValue === option.id"
            @click="selectOption(option)"
            @mouseenter="hoveredId = option.id"
            @mouseleave="hoveredId = null"
          >
            <!-- Kinetic Left Bar Indicator (inspired by smooth-dropdown layoutId) -->
            <span
              v-if="hoveredId === option.id || modelValue === option.id"
              class="option-active-bar"
              aria-hidden="true"
            />

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
import { ref, computed, onMounted, onUnmounted } from 'vue'

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

const selectedOption = computed(() => {
  return props.options.find((opt) => opt.id === props.modelValue) || null
})

const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}

const closeDropdown = () => {
  isOpen.value = false
  hoveredId.value = null
}

const openAndFocusFirst = () => {
  isOpen.value = true
}

const openAndFocusLast = () => {
  isOpen.value = true
}

const selectOption = (opt: DropdownOption) => {
  emit('update:modelValue', opt.id)
  emit('change', opt)
  closeDropdown()
}

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
  width: 100%;
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
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.dropdown-option-item {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 10px 14px;
  border-radius: 6px;
  cursor: pointer;
  background-color: transparent;
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

/* Kinetic Left Bar Indicator */
.option-active-bar {
  position: absolute;
  inset-inline-start: 4px;
  top: 15%;
  bottom: 15%;
  width: 4px;
  border-radius: 2px;
  background-color: var(--color-accent, #D93829);
  animation: bar-grow 0.18s ease-out forwards;
}

@keyframes bar-grow {
  from {
    transform: scaleY(0.4);
    opacity: 0;
  }
  to {
    transform: scaleY(1);
    opacity: 1;
  }
}

.option-text-wrap {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
  padding-inline-start: 6px;
}

.option-label {
  font-family: var(--font-body, 'Vazirmatn', sans-serif);
  font-size: var(--text-sm, 14px);
  font-weight: 600;
  color: var(--color-ink-primary, #0E0F12);
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
}
</style>
