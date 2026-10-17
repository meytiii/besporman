<template>
  <main id="main-content" class="home-view">
    <!-- 1. Centered Hero Section with Mascot & Comic Sign -->
    <HeroSection />

    <!-- 2. Looping Illustrated Request Marquee -->
    <MarqueeBanner />

    <!-- 3. Supporting Services (Web, Bot, Windows) -->
    <LazySection target-id="services" :min-height="580" :columns="3" :card-count="3">
      <ServicesSection />
    </LazySection>

    <!-- 4. Working-Process Section (4 Steps) -->
    <LazySection target-id="process" :min-height="480" :columns="4" :card-count="4">
      <ProcessSection />
    </LazySection>

    <!-- 5. Featured Projects Gallery -->
    <LazySection target-id="projects" :min-height="620" :columns="3" :card-count="3">
      <ProjectsSection />
    </LazySection>

    <!-- 6. Brand-Focused About Section -->
    <LazySection target-id="about" :min-height="500" :columns="3" :card-count="3">
      <AboutSection />
    </LazySection>

    <!-- 7. Contact / Inquiry Form & Direct Telegram -->
    <LazySection target-id="contact" :min-height="580" :columns="2" :card-count="2">
      <ContactSection />
    </LazySection>
  </main>
</template>

<script setup lang="ts">
import HeroSection from '@/components/HeroSection.vue'
import MarqueeBanner from '@/components/MarqueeBanner.vue'
import LazySection from '@/components/LazySection.vue'
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
