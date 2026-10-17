import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createRouter, createMemoryHistory } from 'vue-router'
import TextReveal from '@/components/ui/TextReveal.vue'
import LazySection from '@/components/LazySection.vue'

describe('TextReveal & Lazy Loading Architecture', () => {
  it('splits Persian text by words, preserves Persian ligatures & half-spaces, and provides screen-reader text', () => {
    const wrapper = mount(TextReveal, {
      props: {
        text: 'خیالت از توسعه نرم‌افزار راحت؛',
        preset: 'fade-in-blur',
      },
    })

    const srOnly = wrapper.find('.sr-only')
    expect(srOnly.exists()).toBe(true)
    expect(srOnly.text()).toBe('خیالت از توسعه نرم‌افزار راحت؛')

    const segments = wrapper.findAll('.text-reveal-segment')
    expect(segments.length).toBe(5)
    expect(segments[0].text()).toBe('خیالت')
    expect(segments[1].text()).toBe('از')
    expect(segments[2].text()).toBe('توسعه')
    expect(segments[3].text()).toBe('نرم‌افزار')
    expect(segments[4].text()).toBe('راحت؛')
  })

  it('correctly applies highlight class to targeted words', () => {
    const wrapper = mount(TextReveal, {
      props: {
        text: 'کار رو بسپر من!',
        highlight: 'بسپر من!',
        highlightClass: 'title-highlight',
      },
    })

    const segments = wrapper.findAll('.text-reveal-segment')
    expect(segments[0].classes()).not.toContain('title-highlight')
    expect(segments[1].classes()).not.toContain('title-highlight')
    expect(segments[2].classes()).toContain('title-highlight')
    expect(segments[3].classes()).toContain('title-highlight')
  })

  it('mounts LazySection slot content in test environment', async () => {
    const router = createRouter({
      history: createMemoryHistory(),
      routes: [{ path: '/', component: { template: '<div></div>' } }],
    })
    await router.push('/')
    await router.isReady()

    const wrapper = mount(LazySection, {
      props: {
        targetId: 'services',
      },
      global: {
        plugins: [router],
      },
      slots: {
        default: '<div class="test-services-content">Real Service Content</div>',
      },
    })

    expect(wrapper.find('.test-services-content').exists()).toBe(true)
    expect(wrapper.text()).toContain('Real Service Content')
  })
})
