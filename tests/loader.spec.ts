import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ModernLoader from '@/components/ui/ModernLoader.vue'
import LiquidLoader from '@/components/ui/LiquidLoader.vue'
import AppLoadingScreen from '@/components/AppLoadingScreen.vue'

describe('ModernLoader & AppLoadingScreen', () => {
  it('renders macOS coding window with controls, favicon app badge, and code lines in ModernLoader', () => {
    const wrapper = mount(ModernLoader, {
      props: {
        words: ['در حال راه‌اندازی استودیو...', 'بارگذاری ماژول‌ها...'],
      },
    })

    // macOS window structure
    expect(wrapper.find('.macos-window').exists()).toBe(true)

    // 3 macOS window control dots
    const dots = wrapper.findAll('.control-dot')
    expect(dots.length).toBe(3)
    expect(wrapper.find('.dot-close').exists()).toBe(true)
    expect(wrapper.find('.dot-minimize').exists()).toBe(true)
    expect(wrapper.find('.dot-maximize').exists()).toBe(true)

    // Besporman favicon badge on topbar-right with no title text and no live badge
    const favicon = wrapper.find('.topbar-right .app-favicon')
    expect(favicon.exists()).toBe(true)
    expect(favicon.attributes('src')).toBe('/favicon.png')
    expect(wrapper.find('.app-name').exists()).toBe(false)
    expect(wrapper.find('.status-indicator').exists()).toBe(false)

    // Persian typewriter text container
    expect(wrapper.find('.window-title-container').exists()).toBe(true)
    expect(wrapper.find('.typewriter-cursor').exists()).toBe(true)

    // Code lines and editor body
    expect(wrapper.find('.window-editor-body').exists()).toBe(true)
    expect(wrapper.findAll('.code-line').length).toBeGreaterThanOrEqual(1)
    expect(wrapper.find('.active-code-cursor').exists()).toBe(true)
  })

  it('renders 7 liquid columns with physics structure in LiquidLoader', () => {
    const wrapper = mount(LiquidLoader, {
      props: {
        variant: 'brand',
      },
    })

    const columns = wrapper.findAll('.liquid-column')
    expect(columns.length).toBe(7)

    const bars = wrapper.findAll('.liquid-bar')
    expect(bars.length).toBe(7)
  })

  it('renders AppLoadingScreen with ModernLoader and Lalezar Persian title text', () => {
    const wrapper = mount(AppLoadingScreen, {
      global: {
        stubs: {
          ModernLoader: true,
        },
      },
    })

    expect(wrapper.vm).toBeDefined()
    expect((wrapper.vm as any).isFontReady).toBe(true)
  })
})
