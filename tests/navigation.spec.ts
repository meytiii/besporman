import { describe, it, expect } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import { createRouter, createMemoryHistory } from 'vue-router'
import TheHeader from '@/components/TheHeader.vue'
import TheFooter from '@/components/TheFooter.vue'

const setupRouter = async (initialPath = '/') => {
  const router = createRouter({
    history: createMemoryHistory(),
    routes: [
      { path: '/', component: { template: '<div id="home"><div id="about">About</div><div id="services">Services</div></div>' } },
      { path: '/projects/:slug', component: { template: '<div>Project Detail</div>' } },
    ],
  })
  await router.push(initialPath)
  await router.isReady()
  return router
}

describe('Header & Footer Cross-Route Navigation', () => {
  it('renders cross-route section hrefs in header navigation and CTA', async () => {
    const router = await setupRouter('/projects/besporman-web')
    const wrapper = mount(TheHeader, {
      global: {
        plugins: [router],
      },
    })

    const navLinks = wrapper.findAll('.nav-link')
    expect(navLinks.length).toBe(5)
    expect(navLinks[0].attributes('href')).toBe('/#services')
    expect(navLinks[1].attributes('href')).toBe('/#process')
    expect(navLinks[2].attributes('href')).toBe('/#projects')
    expect(navLinks[3].attributes('href')).toBe('/#about')
    expect(navLinks[4].attributes('href')).toBe('/#contact')

    const cta = wrapper.find('.header-cta')
    expect(cta.attributes('href')).toBe('/#contact')
  })

  it('navigates to homepage section when clicking nav link while on project detail route', async () => {
    const router = await setupRouter('/projects/besporman-web')
    const wrapper = mount(TheHeader, {
      global: {
        plugins: [router],
      },
    })

    // Click on "درباره ما" (index 3)
    const aboutLink = wrapper.findAll('.nav-link')[3]
    await aboutLink.trigger('click')
    await flushPromises()

    expect(router.currentRoute.value.path).toBe('/')
    expect(router.currentRoute.value.hash).toBe('#about')
  })

  it('navigates to homepage contact section when clicking header CTA from project detail route', async () => {
    const router = await setupRouter('/projects/besporman-web')
    const wrapper = mount(TheHeader, {
      global: {
        plugins: [router],
      },
    })

    const cta = wrapper.find('.header-cta')
    await cta.trigger('click')
    await flushPromises()

    expect(router.currentRoute.value.path).toBe('/')
    expect(router.currentRoute.value.hash).toBe('#contact')
  })

  it('navigates to homepage section when clicking footer quick links from project detail route', async () => {
    const router = await setupRouter('/projects/besporman-web')
    const wrapper = mount(TheFooter, {
      global: {
        plugins: [router],
      },
    })

    const footerLinks = wrapper.findAll('.footer-link')
    expect(footerLinks.length).toBe(5)
    expect(footerLinks[0].attributes('href')).toBe('/#services')

    // Click "خدمات"
    await footerLinks[0].trigger('click')
    await flushPromises()

    expect(router.currentRoute.value.path).toBe('/')
    expect(router.currentRoute.value.hash).toBe('#services')
  })
})
