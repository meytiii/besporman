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

  it('updates active tab and mascot visibility dynamically during scrolling', async () => {
    // Setup DOM with section elements and mocked getBoundingClientRect
    const sectionServices = document.createElement('div')
    sectionServices.id = 'services'
    document.body.appendChild(sectionServices)

    const sectionContact = document.createElement('div')
    sectionContact.id = 'contact'
    document.body.appendChild(sectionContact)

    // Mock getBoundingClientRect
    sectionServices.getBoundingClientRect = () => ({
      top: 1500 - window.scrollY,
      bottom: 2500 - window.scrollY,
      left: 0,
      right: 1000,
      width: 1000,
      height: 1000,
      x: 0,
      y: 1500 - window.scrollY,
      toJSON: () => {},
    })

    sectionContact.getBoundingClientRect = () => ({
      top: 5000 - window.scrollY,
      bottom: 6000 - window.scrollY,
      left: 0,
      right: 1000,
      width: 1000,
      height: 1000,
      x: 0,
      y: 5000 - window.scrollY,
      toJSON: () => {},
    })

    const router = await setupRouter('/')
    const wrapper = mount(TheHeader, {
      attachTo: document.body,
      global: {
        plugins: [router],
      },
    })
    await flushPromises()

    // 1. At top of page (scrollY = 0), hero is active, no nav tab active, mascot stays visible perched on brand
    Object.defineProperty(window, 'scrollY', { value: 0, writable: true })
    window.dispatchEvent(new Event('scroll'))
    await flushPromises()

    const mascot = wrapper.find('.anime-mascot-wrapper')
    expect(wrapper.find('.nav-link.is-active').exists()).toBe(false)
    expect(mascot.classes()).toContain('is-on-brand')
    expect(mascot.attributes('style')).toContain('opacity: 1')

    // 2. Scroll to Services (scrollY = 1400, scrollPosition = 1600 >= 1500)
    window.scrollY = 1400
    window.dispatchEvent(new Event('scroll'))
    await flushPromises()

    const activeLink = wrapper.find('.nav-link.is-active')
    expect(activeLink.exists()).toBe(true)
    expect(activeLink.text()).toContain('خدمات')
    expect(mascot.attributes('style')).toContain('opacity: 1')

    // Cleanup
    wrapper.unmount()
    sectionServices.remove()
    sectionContact.remove()
  })
})
