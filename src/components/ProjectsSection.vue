<template>
  <section class="projects-section" aria-labelledby="projects-title">
    <div class="container">
      
      <!-- Section Header -->
      <div class="section-header">
        <span class="section-badge reveal-badge comic-pop">پورتفولیو و نتایج</span>
        <h2 id="projects-title" class="section-title">
          <TextReveal
            as="span"
            text="نمونه‌کارها و پروژه‌های واقعی"
            preset="fade-in-blur"
            :speed-reveal="1.2"
          />
        </h2>
        <p class="section-subtitle">
          <TextReveal
            as="span"
            text="تنها پروژه‌های واقعی و اعتبارسنجی‌شده استودیو؛ بدون بزرگ‌نمایی، آمار خیالی یا مشتریان جعلی."
            preset="fade-in-blur"
            :delay="0.1"
            :speed-reveal="1.3"
          />
        </p>
      </div>

      <!-- Category Filter Tabs -->
      <div class="filter-wrapper comic-pop delay-1" role="tablist" aria-label="فیلتر دسته‌بندی پروژه‌ها">
        <button
          v-for="cat in categories"
          :key="cat.key"
          type="button"
          role="tab"
          class="filter-btn"
          :class="{ 'is-active': activeCategory === cat.key }"
          :aria-selected="activeCategory === cat.key"
          @click="activeCategory = cat.key"
        >
          {{ cat.label }}
        </button>
      </div>

      <!-- Featured Project Card (Prominent Feature Treatment) -->
      <div v-if="featuredProject" class="featured-project-wrapper">
        <article class="featured-card comic-pop delay-2">
          <div class="featured-content">
            <div class="featured-badge-row">
              <span class="badge-featured">پروژه برگزیده</span>
              <span class="badge-category">{{ getCategoryLabel(featuredProject.category) }}</span>
              <span v-if="featuredProject.completedYearFa" class="badge-year">
                سال {{ featuredProject.completedYearFa }}
              </span>
            </div>

            <h3 class="featured-title">
              <router-link :to="'/projects/' + featuredProject.slug" class="project-title-link">
                {{ featuredProject.titleFa }}
              </router-link>
            </h3>

            <p class="featured-summary">{{ featuredProject.summaryFa }}</p>

            <!-- Tech Chips -->
            <div v-if="featuredProject.technologies" class="tech-chip-list">
              <span
                v-for="tech in featuredProject.technologies"
                :key="tech"
                class="tech-chip font-mono"
              >
                {{ tech }}
              </span>
            </div>

            <div class="card-action-row">
              <router-link
                :to="'/projects/' + featuredProject.slug"
                class="btn btn-primary btn-sm"
              >
                <span class="btn-text">مشاهده بررسی تخصصی پروژه</span>
                <span class="btn-arrow" aria-hidden="true">←</span>
              </router-link>

              <a
                v-if="featuredProject.externalUrl"
                :href="featuredProject.externalUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="btn btn-secondary btn-sm"
                aria-label="مشاهده سورس‌کد در گیت‌هاب (باز شدن در تب جدید)"
              >
                <span class="btn-text">سورس‌کد پروژه</span>
                <span class="btn-arrow" aria-hidden="true">↗</span>
              </a>
            </div>
          </div>

          <!-- Stylized Graphic Plate -->
          <div class="featured-plate" aria-hidden="true">
            <div class="plate-box">
              <svg class="plate-icon" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
              </svg>
              <span class="plate-label">Besporman Core</span>
            </div>
          </div>
        </article>
      </div>

      <!-- Secondary Projects Grid -->
      <div class="projects-grid">
        <article
          v-for="(project, idx) in filteredSecondaryProjects"
          :key="project.id"
          class="project-card comic-pop"
          :style="{ '--pop-delay': `${(idx + 1) * 0.08}s` }"
        >
          <div class="project-card-header">
            <span class="badge-category">{{ getCategoryLabel(project.category) }}</span>
            <span v-if="project.completedYearFa" class="badge-year">{{ project.completedYearFa }}</span>
          </div>

          <h3 class="project-card-title">
            <router-link :to="'/projects/' + project.slug" class="project-title-link">
              {{ project.titleFa }}
            </router-link>
          </h3>

          <p class="project-card-summary">{{ project.summaryFa }}</p>

          <div v-if="project.technologies" class="tech-chip-list">
            <span
              v-for="tech in project.technologies"
              :key="tech"
              class="tech-chip font-mono"
            >
              {{ tech }}
            </span>
          </div>

          <div class="project-card-footer">
            <router-link
              :to="'/projects/' + project.slug"
              class="btn btn-primary btn-sm"
            >
              <span class="btn-text">مشاهده بررسی تخصصی پروژه</span>
              <span class="btn-arrow" aria-hidden="true">←</span>
            </router-link>
          </div>
        </article>
      </div>

      <!-- Empty State if filtered out -->
      <div v-if="filteredProjectsCount === 0" class="empty-state">
        <p>در این دسته‌بندی فعلاً پروژه‌ای برای نمایش قرار نگرفته است.</p>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { projectsData } from '@/data/projects'
import type { ProjectCategory } from '@/types/project'
import TextReveal from '@/components/ui/TextReveal.vue'
import { useScrollReveal } from '@/composables/useScrollReveal'

useScrollReveal()

const categories = [
  { key: 'all', label: 'همه پروژه‌ها' },
  { key: 'web', label: 'طراحی وب‌سایت' },
  { key: 'telegram-bot', label: 'بات‌های تلگرام' },
  { key: 'windows-app', label: 'نرم‌افزارهای ویندوز' },
]

const activeCategory = ref<string>('all')

const getCategoryLabel = (cat: ProjectCategory): string => {
  switch (cat) {
    case 'web':
      return 'طراحی وب‌سایت'
    case 'telegram-bot':
      return 'بات تلگرام'
    case 'windows-app':
      return 'نرم‌افزار ویندوز'
  }
}

// Featured Project is prj-01
const featuredProject = computed(() => {
  if (activeCategory.value === 'all' || activeCategory.value === 'web') {
    return projectsData.find((p) => p.id === 'prj-01')
  }
  return null
})

// Secondary projects (excluding featured if displayed above)
const filteredSecondaryProjects = computed(() => {
  return projectsData.filter((p) => {
    // If featured is displayed, don't duplicate it in grid
    if (featuredProject.value && p.id === featuredProject.value.id) {
      return false
    }
    if (activeCategory.value === 'all') {
      return true
    }
    return p.category === activeCategory.value
  })
})

const filteredProjectsCount = computed(() => {
  let count = filteredSecondaryProjects.value.length
  if (featuredProject.value) count += 1
  return count
})
</script>

<style scoped>
.projects-section {
  padding-block: var(--space-20);
  background-color: var(--color-canvas);
}

.section-header {
  text-align: center;
  max-width: 650px;
  margin-inline: auto;
  margin-bottom: var(--space-8);
}

.section-badge {
  display: inline-block;
  font-family: var(--font-body);
  font-size: var(--text-xs);
  font-weight: 700;
  color: var(--primitive-white);
  background-color: var(--color-accent);
  padding: var(--space-1) var(--space-3);
  border-radius: var(--border-radius-sm);
  margin-bottom: var(--space-3);
}

.section-title {
  font-size: var(--text-3xl);
  color: var(--color-ink-primary);
  margin-bottom: var(--space-3);
}

.section-subtitle {
  font-size: var(--text-base);
  color: var(--color-ink-muted);
}

/* Category Filter Tabs */
.filter-wrapper {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: var(--space-3);
  margin-bottom: var(--space-10);
}

.filter-btn {
  font-family: var(--font-body);
  font-size: var(--text-sm);
  font-weight: 700;
  color: var(--color-ink-primary);
  background-color: var(--color-surface);
  border: var(--border-width-bold) solid var(--color-border-bold);
  border-radius: var(--border-radius-sm);
  padding: var(--space-2) var(--space-4);
  box-shadow: 2px 2px 0 var(--color-border-bold);
  cursor: pointer;
  transition: transform 0.1s ease, box-shadow 0.1s ease, background-color 0.15s ease;
}

.filter-btn:hover {
  transform: translate(-1px, -1px);
  box-shadow: 3px 3px 0 var(--color-border-bold);
}

.filter-btn.is-active {
  background-color: var(--color-ink-primary);
  color: var(--primitive-white);
  transform: translate(1px, 1px);
  box-shadow: 1px 1px 0 var(--color-border-bold);
}

/* ==========================================================================
   Featured Project Card (Prominent Feature Treatment)
   ========================================================================== */
.featured-project-wrapper {
  margin-bottom: var(--space-8);
}

.featured-card {
  display: grid;
  grid-template-columns: 1fr;
  background-color: var(--primitive-cream-100);
  border: var(--border-width-heavy) solid var(--color-border-bold);
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-lg);
  overflow: hidden;
}

@media (min-width: 900px) {
  .featured-card {
    grid-template-columns: 3fr 2fr;
  }
}

.featured-content {
  padding: var(--space-8);
  display: flex;
  flex-direction: column;
}

.featured-badge-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-2);
  margin-bottom: var(--space-4);
}

.badge-featured {
  font-size: var(--text-xs);
  font-weight: 700;
  color: var(--primitive-white);
  background-color: var(--color-accent);
  padding: 2px var(--space-3);
  border-radius: var(--border-radius-sm);
}

.badge-category {
  font-size: var(--text-xs);
  font-weight: 700;
  color: var(--color-ink-primary);
  background-color: var(--primitive-cream-200);
  border: 1px solid var(--color-border-bold);
  padding: 2px var(--space-2);
  border-radius: var(--border-radius-sm);
}

.badge-year {
  font-size: var(--text-xs);
  color: var(--color-ink-muted);
}

.featured-title {
  font-size: var(--text-3xl);
  color: var(--color-ink-primary);
  margin-bottom: var(--space-4);
}

.project-title-link {
  color: inherit;
  text-decoration: none;
}

.project-title-link:hover {
  color: var(--color-accent-text);
}

.featured-summary {
  font-size: var(--text-base);
  color: var(--color-ink-muted);
  line-height: var(--leading-normal);
  margin-bottom: var(--space-6);
}

.tech-chip-list {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
  margin-bottom: var(--space-6);
}

.tech-chip {
  font-size: var(--text-xs);
  color: var(--color-ink-primary);
  background-color: var(--color-canvas);
  border: 1px solid var(--color-border-bold);
  padding: 2px var(--space-2);
  border-radius: var(--border-radius-sm);
}

.card-action-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-3);
  margin-top: auto;
}

.featured-plate {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--primitive-amber-100);
  border-inline-start: var(--border-width-bold) solid var(--color-border-bold);
  padding: var(--space-8);
}

.plate-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-6) var(--space-8);
  background-color: var(--color-canvas);
  border: var(--border-width-bold) solid var(--color-border-bold);
  border-radius: var(--border-radius-md);
  box-shadow: 4px 4px 0 var(--color-border-bold);
}

.plate-icon {
  font-size: 40px;
}

.plate-label {
  font-family: var(--font-display);
  font-size: var(--text-lg);
  color: var(--color-ink-primary);
}

/* ==========================================================================
   Secondary Projects Grid
   ========================================================================== */
.projects-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-6);
}

@media (min-width: 768px) {
  .projects-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

.project-card {
  background-color: var(--primitive-cream-100);
  border: var(--border-width-bold) solid var(--color-border-bold);
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-md);
  padding: var(--space-6);
  display: flex;
  flex-direction: column;
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}

.project-card:hover {
  transform: translate(-2px, -2px);
  box-shadow: var(--shadow-hover);
}

.project-card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--space-4);
}

.project-card-title {
  font-size: var(--text-xl);
  color: var(--color-ink-primary);
  margin-bottom: var(--space-3);
}

.project-card-summary {
  font-size: var(--text-sm);
  color: var(--color-ink-muted);
  line-height: var(--leading-normal);
  margin-bottom: var(--space-5);
  flex-grow: 1;
}

.project-card-footer {
  margin-top: auto;
  padding-top: var(--space-4);
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
}

.empty-state {
  text-align: center;
  padding: var(--space-12);
  background-color: var(--primitive-cream-100);
  border: var(--border-width-bold) dashed var(--color-border-bold);
  border-radius: var(--border-radius-md);
}
</style>
