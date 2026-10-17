<template>
  <main id="main-content" class="project-detail-view">
    <div class="container detail-container">
      
      <!-- Top Breadcrumb & Return Action -->
      <nav class="breadcrumb-nav" aria-label="مسیر راهنما">
        <router-link to="/" class="breadcrumb-link">صفحه اصلی</router-link>
        <span class="breadcrumb-separator" aria-hidden="true">/</span>
        <router-link to="/#projects" class="breadcrumb-link">نمونه‌کارها</router-link>
        <span class="breadcrumb-separator" aria-hidden="true">/</span>
        <span class="breadcrumb-current" aria-current="page">{{ project?.titleFa || 'پروژه' }}</span>
      </nav>

      <div class="back-link-wrapper">
        <router-link to="/#projects" class="back-link">
          <span class="back-arrow" aria-hidden="true">→</span>
          <span>بازگشت به فهرست پروژه‌ها</span>
        </router-link>
      </div>

      <!-- Project Found -->
      <article v-if="project" class="detail-card">
        
        <!-- Header -->
        <header class="detail-header">
          <div class="detail-badge-row">
            <span class="badge-category">{{ categoryLabel }}</span>
            <span v-if="project.completedYearFa" class="badge-year">سال {{ project.completedYearFa }}</span>
            <span class="badge-status">تأییدشده و فعال</span>
          </div>

          <h1 class="detail-title">{{ project.titleFa }}</h1>
          <p class="detail-summary">{{ project.summaryFa }}</p>

          <!-- Tech Stack -->
          <div v-if="project.technologies" class="detail-tech-list">
            <span
              v-for="tech in project.technologies"
              :key="tech"
              class="tech-chip font-mono"
            >
              {{ tech }}
            </span>
          </div>

          <!-- Action Buttons -->
          <div v-if="project.externalUrl || project.telegramUrl" class="detail-actions">
            <a
              v-if="project.externalUrl"
              :href="project.externalUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="btn btn-primary"
            >
              <span>مشاهده سورس‌کد / ریپازیتوری</span>
              <span class="btn-arrow" aria-hidden="true">↗</span>
            </a>

            <a
              v-if="project.telegramUrl"
              :href="project.telegramUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="btn btn-secondary"
            >
              <span>مشاهده در تلگرام</span>
              <span class="btn-arrow" aria-hidden="true">↗</span>
            </a>
          </div>
        </header>

        <!-- Key Highlights -->
        <section v-if="project.keyHighlightsFa?.length" class="highlights-section">
          <h2 class="section-subheading">دستاوردها و ویژگی‌های کلیدی</h2>
          <ul class="highlights-list">
            <li v-for="(highlight, i) in project.keyHighlightsFa" :key="i">
              {{ highlight }}
            </li>
          </ul>
        </section>

        <!-- Extended Case Study Content -->
        <section class="case-study-section">
          <h2 class="section-subheading">بررسی تخصصی و معماری پیاده‌سازی</h2>
          <div class="case-study-body">
            <p v-for="(paragraph, pIdx) in formattedParagraphs" :key="pIdx">
              {{ paragraph }}
            </p>
          </div>
        </section>

        <!-- Next / Previous Navigation -->
        <footer class="detail-nav-footer">
          <router-link
            v-if="prevProject"
            :to="'/projects/' + prevProject.slug"
            class="nav-prev-btn"
          >
            <span class="nav-btn-hint">پروژه قبلی</span>
            <span class="nav-btn-title">« {{ prevProject.titleFa }}</span>
          </router-link>
          <div v-else class="nav-empty"></div>

          <router-link
            v-if="nextProject"
            :to="'/projects/' + nextProject.slug"
            class="nav-next-btn"
          >
            <span class="nav-btn-hint">پروژه بعدی</span>
            <span class="nav-btn-title">{{ nextProject.titleFa }} »</span>
          </router-link>
        </footer>

      </article>

      <!-- Project Not Found -->
      <div v-else class="project-not-found">
        <h1 class="not-found-title">پروژه مورد نظر یافت نشد</h1>
        <p class="not-found-desc">
          ممکن است آدرس وارد شده نادرست باشد یا این پروژه هنوز در دسترس عموم قرار نگرفته باشد.
        </p>
        <router-link to="/#projects" class="btn btn-primary">
          <span>بازگشت به فهرست پروژه‌ها</span>
        </router-link>
      </div>

    </div>
  </main>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { projectsData } from '@/data/projects'
import type { ProjectItem, ProjectCategory } from '@/types/project'

const route = useRoute()

const project = computed<ProjectItem | undefined>(() => {
  const slug = route.params.slug as string
  return projectsData.find((p) => p.slug === slug)
})

const currentIndex = computed(() => {
  if (!project.value) return -1
  return projectsData.findIndex((p) => p.id === project.value!.id)
})

const prevProject = computed<ProjectItem | null>(() => {
  if (currentIndex.value > 0) {
    return projectsData[currentIndex.value - 1]
  }
  return null
})

const nextProject = computed<ProjectItem | null>(() => {
  if (currentIndex.value >= 0 && currentIndex.value < projectsData.length - 1) {
    return projectsData[currentIndex.value + 1]
  }
  return null
})

const categoryLabel = computed(() => {
  if (!project.value) return ''
  const catMap: Record<ProjectCategory, string> = {
    'web': 'طراحی و توسعه وب‌سایت',
    'telegram-bot': 'بات‌های اختصاصی تلگرام',
    'windows-app': 'اپلیکیشن‌های ویندوز',
  }
  return catMap[project.value.category]
})

const formattedParagraphs = computed(() => {
  if (!project.value?.caseStudyMarkdownFa) {
    return [project.value?.summaryFa || '']
  }
  return project.value.caseStudyMarkdownFa
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .map((line) => line.replace(/^#+\s*/, ''))
})
</script>

<style scoped>
.project-detail-view {
  min-height: 100dvh;
  padding-top: calc(var(--header-height) + var(--space-8));
  padding-bottom: var(--space-20);
  background-color: var(--color-canvas);
}

.detail-container {
  max-width: 900px;
}

/* Breadcrumbs */
.breadcrumb-nav {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-2);
  font-size: var(--text-xs);
  color: var(--color-ink-muted);
  margin-bottom: var(--space-4);
}

.breadcrumb-link {
  color: var(--color-ink-primary);
}

.breadcrumb-link:hover {
  color: var(--color-accent-text);
  text-decoration: underline;
}

.breadcrumb-separator {
  color: var(--primitive-ink-400);
}

.breadcrumb-current {
  color: var(--color-accent-text);
  font-weight: 700;
}

.back-link-wrapper {
  margin-bottom: var(--space-6);
}

.back-link {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  font-size: var(--text-sm);
  font-weight: 700;
  color: var(--color-ink-primary);
}

.back-link:hover {
  color: var(--color-accent-text);
}

.back-arrow {
  font-size: 16px;
}

/* Detail Card */
.detail-card {
  background-color: var(--primitive-cream-100);
  border: var(--border-width-heavy) solid var(--color-border-bold);
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-lg);
  padding: var(--space-8);
}

@media (min-width: 768px) {
  .detail-card {
    padding: var(--space-12);
  }
}

.detail-badge-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-2);
  margin-bottom: var(--space-4);
}

.badge-category {
  font-size: var(--text-xs);
  font-weight: 700;
  color: var(--primitive-white);
  background-color: var(--color-accent);
  padding: 2px var(--space-3);
  border-radius: var(--border-radius-sm);
}

.badge-year {
  font-size: var(--text-xs);
  color: var(--color-ink-muted);
}

.badge-status {
  font-size: var(--text-xs);
  font-weight: 700;
  color: var(--primitive-white);
  background-color: var(--color-ink-primary);
  padding: 2px var(--space-2);
  border-radius: var(--border-radius-sm);
}

.detail-title {
  font-size: var(--text-3xl);
  color: var(--color-ink-primary);
  margin-bottom: var(--space-4);
}

.detail-summary {
  font-size: var(--text-lg);
  color: var(--color-ink-muted);
  line-height: var(--leading-normal);
  margin-bottom: var(--space-6);
}

.detail-tech-list {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
  margin-bottom: var(--space-8);
}

.tech-chip {
  font-size: var(--text-xs);
  color: var(--color-ink-primary);
  background-color: var(--color-canvas);
  border: 1px solid var(--color-border-bold);
  padding: 2px var(--space-3);
  border-radius: var(--border-radius-sm);
}

.detail-actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-4);
  margin-bottom: var(--space-10);
  padding-bottom: var(--space-8);
  border-bottom: 2px solid rgba(0, 0, 0, 0.1);
}

.section-subheading {
  font-size: var(--text-2xl);
  color: var(--color-ink-primary);
  margin-bottom: var(--space-4);
}

.highlights-section {
  margin-bottom: var(--space-10);
}

.highlights-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.highlights-list li {
  position: relative;
  font-size: var(--text-base);
  color: var(--color-ink-primary);
  padding-inline-start: var(--space-6);
  line-height: var(--leading-normal);
}

.highlights-list li::before {
  content: '✓';
  position: absolute;
  inset-inline-start: 0;
  color: var(--color-accent-text);
  font-weight: 700;
  font-size: var(--text-lg);
}

.case-study-section {
  margin-bottom: var(--space-10);
}

.case-study-body p {
  font-size: var(--text-base);
  color: var(--color-ink-muted);
  line-height: var(--leading-loose);
  margin-bottom: var(--space-4);
}

/* Detail Navigation Footer */
.detail-nav-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-4);
  padding-top: var(--space-8);
  border-top: 2px solid rgba(0, 0, 0, 0.1);
}

.nav-prev-btn,
.nav-next-btn {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
  padding: var(--space-3) var(--space-4);
  background-color: var(--color-canvas);
  border: var(--border-width-bold) solid var(--color-border-bold);
  border-radius: var(--border-radius-sm);
  box-shadow: 2px 2px 0 var(--color-border-bold);
  text-decoration: none;
  transition: transform 0.1s ease, box-shadow 0.1s ease;
}

.nav-prev-btn:hover,
.nav-next-btn:hover {
  transform: translate(-1px, -1px);
  box-shadow: 3px 3px 0 var(--color-border-bold);
}

.nav-btn-hint {
  font-size: var(--text-xs);
  color: var(--color-ink-muted);
}

.nav-btn-title {
  font-size: var(--text-sm);
  font-weight: 700;
  color: var(--color-ink-primary);
}

.nav-empty {
  flex-grow: 1;
}

/* Not Found */
.project-not-found {
  text-align: center;
  padding: var(--space-16);
  background-color: var(--primitive-cream-100);
  border: var(--border-width-heavy) solid var(--color-border-bold);
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-lg);
}

.not-found-title {
  font-size: var(--text-3xl);
  color: var(--color-ink-primary);
  margin-bottom: var(--space-4);
}

.not-found-desc {
  font-size: var(--text-base);
  color: var(--color-ink-muted);
  margin-bottom: var(--space-6);
}
</style>
