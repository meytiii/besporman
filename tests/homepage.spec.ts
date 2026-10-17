import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: HomeView },
    { path: '/projects/:slug', component: { template: '<div>Detail</div>' } },
  ],
})

describe('Homepage Rendering & Structure', () => {
  it('renders hero headline, mascot stage and comic sign', async () => {
    router.push('/')
    await router.isReady()

    const wrapper = mount(HomeView, {
      global: {
        plugins: [router],
      },
    })

    // Headline check
    const heroTitle = wrapper.find('#hero-title')
    expect(heroTitle.exists()).toBe(true)
    expect(heroTitle.text()).toContain('کار رو بسپر من!')

    // Mascot stage check
    const mascotStage = wrapper.find('.mascot-stage')
    expect(mascotStage.exists()).toBe(true)
    const mascot1 = wrapper.find('.mascot-layer--pose1')
    const mascot2 = wrapper.find('.mascot-layer--pose2')
    expect(mascot1.exists()).toBe(true)
    expect(mascot2.exists()).toBe(true)

    // Comic sign check
    const sign = wrapper.find('.comic-sign-plate')
    expect(sign.exists()).toBe(true)
    expect(sign.text()).toContain('بسپر من')
  })

  it('renders all three core services', async () => {
    const wrapper = mount(HomeView, {
      global: {
        plugins: [router],
      },
    })

    const services = wrapper.findAll('.service-card')
    expect(services.length).toBe(3)
    expect(wrapper.text()).toContain('طراحی و توسعه وب‌سایت')
    expect(wrapper.text()).toContain('بات‌های اختصاصی تلگرام')
    expect(wrapper.text()).toContain('اپلیکیشن‌های ویندوز')
  })

  it('renders the 4 collaboration process steps', async () => {
    const wrapper = mount(HomeView, {
      global: {
        plugins: [router],
      },
    })

    const steps = wrapper.findAll('.process-card')
    expect(steps.length).toBe(4)
    expect(wrapper.text()).toContain('گفتگو و شفاف‌سازی')
    expect(wrapper.text()).toContain('برنامه‌ریزی و توافق')
    expect(wrapper.text()).toContain('توسعه و آزمون')
    expect(wrapper.text()).toContain('تحویل و پشتیبانی')
  })
})
