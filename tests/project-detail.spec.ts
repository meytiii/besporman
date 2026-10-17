import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createRouter, createMemoryHistory } from 'vue-router'
import ProjectDetailView from '@/views/ProjectDetailView.vue'

const createTestRouter = (initialRoute: string) => {
  const router = createRouter({
    history: createMemoryHistory(),
    routes: [
      { path: '/', component: { template: '<div>Home</div>' } },
      { path: '/projects/:slug', component: ProjectDetailView },
    ],
  })
  router.push(initialRoute)
  return router
}

describe('Project Detail Page Routing & Graceful Degradation', () => {
  it('loads valid project by slug with title, tech stack, and case study', async () => {
    const router = createTestRouter('/projects/besporman-web')
    await router.isReady()

    const wrapper = mount(ProjectDetailView, {
      global: {
        plugins: [router],
      },
    })

    expect(wrapper.find('.detail-title').text()).toContain('پلتفرم و پورتفولیوی اختصاصی بسپر من')
    expect(wrapper.find('.badge-category').text()).toContain('طراحی و توسعه وب‌سایت')
    expect(wrapper.text()).toContain('Vue 3')
    expect(wrapper.text()).toContain('درباره پروژه')
    expect(wrapper.find('.detail-actions').exists()).toBe(true)
  })

  it('renders friendly not-found banner for non-existent project slug', async () => {
    const router = createTestRouter('/projects/non-existent-slug')
    await router.isReady()

    const wrapper = mount(ProjectDetailView, {
      global: {
        plugins: [router],
      },
    })

    const notFound = wrapper.find('.project-not-found')
    expect(notFound.exists()).toBe(true)
    expect(notFound.text()).toContain('پروژه مورد نظر یافت نشد')
  })
})
