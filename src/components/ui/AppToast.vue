<template>
  <Transition name="toast-pop">
    <div
      v-if="visible"
      class="app-toast-wrap"
      role="status"
      aria-live="polite"
      :class="`toast--${type}`"
    >
      <div class="toast-card">
        <!-- Status Icon -->
        <div class="toast-icon" aria-hidden="true">
          <svg
            v-if="type === 'warning'"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
            <line x1="12" y1="9" x2="12" y2="13"></line>
            <line x1="12" y1="17" x2="12.01" y2="17"></line>
          </svg>
          <svg
            v-else-if="type === 'info'"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="16" x2="12" y2="12"></line>
            <line x1="12" y1="8" x2="12.01" y2="8"></line>
          </svg>
          <svg
            v-else
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="15" y1="9" x2="9" y2="15"></line>
            <line x1="9" y1="9" x2="15" y2="15"></line>
          </svg>
        </div>

        <!-- Toast Message Text -->
        <span class="toast-message">{{ message }}</span>

        <!-- Close Button -->
        <button
          type="button"
          class="toast-close-btn"
          aria-label="بستن پیام"
          @click="close"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, watch, onUnmounted } from 'vue'

interface Props {
  show?: boolean
  message: string
  type?: 'warning' | 'info' | 'error'
  duration?: number
}

const props = withDefaults(defineProps<Props>(), {
  show: false,
  type: 'warning',
  duration: 3500,
})

const emit = defineEmits<{
  (e: 'update:show', value: boolean): void
  (e: 'close'): void
}>()

const visible = ref(props.show)
let autoDismissTimer: ReturnType<typeof setTimeout> | null = null

const close = () => {
  visible.value = false
  emit('update:show', false)
  emit('close')
  if (autoDismissTimer) {
    clearTimeout(autoDismissTimer)
    autoDismissTimer = null
  }
}

watch(
  () => props.show,
  (newVal) => {
    visible.value = newVal
    if (newVal && props.duration > 0) {
      if (autoDismissTimer) clearTimeout(autoDismissTimer)
      autoDismissTimer = setTimeout(() => {
        close()
      }, props.duration)
    }
  },
  { immediate: true }
)

onUnmounted(() => {
  if (autoDismissTimer) clearTimeout(autoDismissTimer)
})
</script>

<style scoped>
.app-toast-wrap {
  position: fixed;
  bottom: calc(var(--space-6) + env(safe-area-inset-bottom, 0px));
  left: 50%;
  transform: translateX(-50%);
  z-index: 99999;
  width: max-content;
  max-width: min(90vw, 460px);
  pointer-events: none;
}

.toast-card {
  pointer-events: auto;
  display: flex;
  align-items: center;
  gap: var(--space-3);
  background-color: var(--color-canvas);
  border: var(--border-width-bold) solid var(--color-border-bold);
  border-radius: var(--border-radius-pill);
  box-shadow: 4px 4px 0 var(--color-border-bold);
  padding: var(--space-2) var(--space-4);
  color: var(--color-ink-primary);
  direction: rtl;
}

.toast--warning .toast-icon {
  color: #D97706; /* Warm comic amber */
  display: flex;
  align-items: center;
  justify-content: center;
}

.toast--info .toast-icon {
  color: #2563EB;
  display: flex;
  align-items: center;
  justify-content: center;
}

.toast--error .toast-icon {
  color: var(--color-accent);
  display: flex;
  align-items: center;
  justify-content: center;
}

.toast-message {
  font-family: var(--font-body);
  font-size: var(--text-xs);
  font-weight: 700;
  line-height: var(--leading-normal);
  color: var(--color-ink-primary);
}

@media (min-width: 640px) {
  .toast-message {
    font-size: var(--text-sm);
  }
}

.toast-close-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  background: transparent;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  color: var(--color-ink-muted);
  margin-inline-start: var(--space-1);
  transition: color 0.15s ease, transform 0.15s ease;
}

.toast-close-btn:hover {
  color: var(--color-ink-primary);
  transform: scale(1.1);
}

/* Animations */
.toast-pop-enter-active {
  transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}

.toast-pop-leave-active {
  transition: all 0.25s cubic-bezier(0.4, 0, 1, 1);
}

.toast-pop-enter-from {
  opacity: 0;
  transform: translate(-50%, 20px) scale(0.94);
}

.toast-pop-leave-to {
  opacity: 0;
  transform: translate(-50%, 15px) scale(0.96);
}
</style>
