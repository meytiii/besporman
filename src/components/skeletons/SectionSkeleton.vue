<template>
  <div class="section-skeleton" :style="{ minHeight: `${minHeight}px` }" aria-hidden="true">
    <div class="container skeleton-container">
      <!-- Section Header Skeleton -->
      <div class="skeleton-header">
        <div class="skeleton-badge shimmer"></div>
        <div class="skeleton-title shimmer"></div>
        <div class="skeleton-subtitle shimmer"></div>
      </div>

      <!-- Section Grid Skeleton -->
      <div class="skeleton-grid" :class="`cols-${columns}`">
        <div
          v-for="i in cardCount"
          :key="i"
          class="skeleton-card shimmer"
          :style="{ '--card-idx': i }"
        >
          <div class="skeleton-card-bar"></div>
          <div class="skeleton-card-title"></div>
          <div class="skeleton-card-text"></div>
          <div class="skeleton-card-text short"></div>
          <div class="skeleton-card-footer"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  columns?: number
  cardCount?: number
  minHeight?: number
}

withDefaults(defineProps<Props>(), {
  columns: 3,
  cardCount: 3,
  minHeight: 460,
})
</script>

<style scoped>
.section-skeleton {
  width: 100%;
  padding-block: var(--space-16);
  background-color: var(--color-canvas);
  display: flex;
  align-items: center;
  justify-content: center;
}

.skeleton-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-8);
}

.skeleton-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-3);
  width: 100%;
  max-width: 600px;
}

/* Shimmer pulse effect adhering strictly to parchment tactile palette */
.shimmer {
  position: relative;
  overflow: hidden;
  background-color: rgba(14, 15, 18, 0.05);
  border: var(--border-width-bold) dashed rgba(14, 15, 18, 0.15);
  border-radius: var(--border-radius-md);
}

.shimmer::after {
  content: '';
  position: absolute;
  inset: 0;
  transform: translateX(-100%);
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(250, 247, 240, 0.6) 50%,
    transparent 100%
  );
  animation: tactile-shimmer 1.8s infinite;
}

@keyframes tactile-shimmer {
  100% {
    transform: translateX(100%);
  }
}

.skeleton-badge {
  width: 110px;
  height: 28px;
  border-radius: var(--border-radius-full);
}

.skeleton-title {
  width: 75%;
  height: 42px;
  border-radius: var(--border-radius-sm);
}

.skeleton-subtitle {
  width: 90%;
  height: 20px;
  border-radius: var(--border-radius-sm);
}

.skeleton-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-6);
  width: 100%;
}

@media (min-width: 768px) {
  .skeleton-grid.cols-3 {
    grid-template-columns: repeat(3, 1fr);
  }
  .skeleton-grid.cols-4 {
    grid-template-columns: repeat(4, 1fr);
  }
  .skeleton-grid.cols-2 {
    grid-template-columns: repeat(2, 1fr);
  }
}

.skeleton-card {
  height: 260px;
  padding: var(--space-6);
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  background-color: var(--primitive-cream-100);
  border: var(--border-width-bold) solid rgba(14, 15, 18, 0.12);
  border-radius: var(--border-radius-md);
  box-shadow: 2px 2px 0 rgba(14, 15, 18, 0.08);
}

.skeleton-card-bar {
  width: 36px;
  height: 36px;
  border-radius: var(--border-radius-sm);
  background-color: rgba(14, 15, 18, 0.08);
}

.skeleton-card-title {
  width: 60%;
  height: 24px;
  background-color: rgba(14, 15, 18, 0.08);
  border-radius: var(--border-radius-sm);
}

.skeleton-card-text {
  width: 100%;
  height: 14px;
  background-color: rgba(14, 15, 18, 0.06);
  border-radius: var(--border-radius-xs);
}

.skeleton-card-text.short {
  width: 70%;
}

.skeleton-card-footer {
  margin-top: auto;
  width: 40%;
  height: 32px;
  background-color: rgba(14, 15, 18, 0.08);
  border-radius: var(--border-radius-sm);
}

@media (prefers-reduced-motion: reduce) {
  .shimmer::after {
    animation: none !important;
  }
}
</style>
