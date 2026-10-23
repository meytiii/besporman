import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import NotFoundView from '@/views/NotFoundView.vue'
import Error404Page from '@/components/ui/Error404Page.vue'

describe('Error 404 Not Found Page', () => {
  it('renders 404 error code and cloud background SVG', () => {
    const wrapper = mount(NotFoundView, {
      global: {
        stubs: {
          'router-link': true,
        },
      },
    })

    // Check 404 display number
    expect(wrapper.text()).toContain('۴۰۴')

    // Check SVG background with cloud paths
    const cloudSvg = wrapper.find('.cloud-svg')
    expect(cloudSvg.exists()).toBe(true)
    expect(wrapper.find('.cloud-path-mid').exists()).toBe(true)
    expect(wrapper.find('.cloud-path-front').exists()).toBe(true)
  })

  it('renders translated Persian message explaining lost in clouds', () => {
    const wrapper = mount(Error404Page, {
      global: {
        stubs: {
          'router-link': {
            template: '<a><slot /></a>',
          },
        },
      },
    })

    expect(wrapper.text()).toContain('به نظر میاد صفحه‌ای که دنبالشی توی آسمونا گم شده!')
    expect(wrapper.text()).toContain('میخوای خیلی آروم به صفحه اصلی برگردیم؟')
    expect(wrapper.text()).toContain('برگرد به خونه')
  })

  it('includes accessible return home link targeting root "/"', () => {
    const wrapper = mount(Error404Page, {
      global: {
        stubs: {
          'router-link': {
            template: '<a :href="to"><slot /></a>',
            props: ['to'],
          },
        },
      },
    })

    const homeLink = wrapper.find('a')
    expect(homeLink.exists()).toBe(true)
    expect(homeLink.attributes('href')).toBe('/')
  })
})
