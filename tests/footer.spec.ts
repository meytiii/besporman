import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createRouter, createMemoryHistory } from 'vue-router'
import TheFooter from '@/components/TheFooter.vue'

describe('TheFooter Component', () => {
  const setupRouter = async () => {
    const router = createRouter({
      history: createMemoryHistory(),
      routes: [
        { path: '/', component: { template: '<div>Home</div>' } },
        { path: '/projects/:slug', component: { template: '<div>Project</div>' } },
      ],
    })
    await router.push('/')
    await router.isReady()
    return router
  }

  it('renders footer copyright notice with updated Persian year ۱۴۰۵', async () => {
    const router = await setupRouter()
    const wrapper = mount(TheFooter, {
      global: {
        plugins: [router],
      },
    })

    const copyright = wrapper.find('.copyright-text')
    expect(copyright.exists()).toBe(true)
    expect(copyright.text()).toContain('۱۴۰۵')
    expect(copyright.text()).toContain('بسپر من. تمامی حقوق متعلق به تیم توسعه‌دهندگان است.')
  })

  it('renders all quick links with proper hrefs', async () => {
    const router = await setupRouter()
    const wrapper = mount(TheFooter, {
      global: {
        plugins: [router],
      },
    })

    const links = wrapper.findAll('.footer-link')
    expect(links.length).toBe(5)
    expect(links.map((l) => l.text())).toEqual([
      'خدمات',
      'روند همکاری',
      'نمونه‌کارها',
      'درباره ما',
      'تماس و سفارش',
    ])
  })
})
