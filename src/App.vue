<template>
  <div class="app-root">
    <!-- Full-screen Studio Loading Screen -->
    <AppLoadingScreen />

    <!-- Custom Vintage Comic Hand Cursor -->
    <CustomCursor />

    <!-- Accessible Skip to Content Link -->
    <a href="#main-content" class="skip-link">
      رفتن به محتوای اصلی
    </a>

    <!-- Living Tactile Halftone Pixel Stars Background Canvas -->
    <BackgroundPixelStars />

    <!-- Persistent Header Navigation -->
    <TheHeader />

    <!-- Routed Page View -->
    <router-view />

    <!-- Persistent Footer -->
    <TheFooter />
  </div>
</template>

<script setup lang="ts">
import AppLoadingScreen from '@/components/AppLoadingScreen.vue'
import TheHeader from '@/components/TheHeader.vue'
import TheFooter from '@/components/TheFooter.vue'
import CustomCursor from '@/components/CustomCursor.vue'
import BackgroundPixelStars from '@/components/ui/BackgroundPixelStars.vue'
</script>

<style scoped>
.app-root {
  display: flex;
  flex-direction: column;
  min-height: 100dvh;
  position: relative;
  overflow-x: clip;
}

/* Skip Link */
.skip-link {
  position: absolute;
  top: -100px;
  inset-inline-start: var(--space-4);
  padding: var(--space-2) var(--space-4);
  background-color: var(--color-ink-primary);
  color: var(--primitive-white);
  border: var(--border-width-bold) solid var(--primitive-white);
  border-radius: var(--border-radius-sm);
  font-weight: 700;
  font-size: var(--text-sm);
  z-index: 9999;
  text-decoration: none;
  transition: top 0.15s ease;
}

.skip-link:focus {
  top: var(--space-4);
  outline: 3px solid var(--color-accent);
}
</style>
