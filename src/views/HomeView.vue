<template>
  <main id="main-content" class="home-view">
    <!-- 1. Centered Hero Section with Mascot & Comic Sign -->
    <HeroSection />

    <!-- 2. Looping Illustrated Request Marquee -->
    <MarqueeBanner />

    <!-- 3. Supporting Services (Web, Bot, Windows) -->
    <ServicesSection />

    <!-- 4. Working-Process Section (4 Steps) -->
    <ProcessSection />

    <!-- 5. Featured Projects Gallery -->
    <ProjectsSection />

    <!-- 6. Brand-Focused About Section -->
    <AboutSection />

    <!-- 7. Contact / Inquiry Form & Direct Telegram -->
    <ContactSection />
  </main>
</template>

<script setup lang="ts">
import HeroSection from '@/components/HeroSection.vue'
import MarqueeBanner from '@/components/MarqueeBanner.vue'
import ServicesSection from '@/components/ServicesSection.vue'
import ProcessSection from '@/components/ProcessSection.vue'
import ProjectsSection from '@/components/ProjectsSection.vue'
import AboutSection from '@/components/AboutSection.vue'
import ContactSection from '@/components/ContactSection.vue'
</script>

<style scoped>
.home-view {
  min-height: 100dvh;
}
</style>
