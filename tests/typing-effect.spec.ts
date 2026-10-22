import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import TypingEffect from '@/components/ui/TypingEffect.vue'

describe('TypingEffect with Fast Backspacing', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.restoreAllMocks()
    vi.useRealTimers()
  })

  it('renders ghost text and sr-only accessibility text for zero CLS', () => {
    const wrapper = mount(TypingEffect, {
      props: {
        text: 'خدمات تخصصی و زمینه کاری ما',
      },
    })

    expect(wrapper.find('.sr-only').text()).toBe('خدمات تخصصی و زمینه کاری ما')
    expect(wrapper.find('.typing-ghost').text()).toBe('خدمات تخصصی و زمینه کاری ما')
  })

  it('executes full sequence: types text, holds 2s, backspaces rapidly, waits 1.5s, and retypes', async () => {
    const wrapper = mount(TypingEffect, {
      props: {
        text: 'بسپر من',
        typingSpeed: 50,
        deletingSpeed: 20,
        holdDelay: 2000,
        clearedDelay: 1500,
      },
    })

    // Advance through forward typing (7 characters at 50ms)
    vi.advanceTimersByTime(50 * 7)
    await wrapper.vm.$nextTick()
    expect(wrapper.find('.typing-visible').text()).toContain('بسپر من')

    // At full text: enters 2000ms pause
    vi.advanceTimersByTime(1000)
    await wrapper.vm.$nextTick()
    expect(wrapper.find('.typing-visible').text()).toContain('بسپر من')

    // Complete the 2000ms pause -> begins deleting
    vi.advanceTimersByTime(1000)
    await wrapper.vm.$nextTick()

    // Rapid backspacing (faster than typing): 3 characters deleted in 60ms
    vi.advanceTimersByTime(60)
    await wrapper.vm.$nextTick()
    const textAfter3Backspaces = wrapper.find('.typing-visible').text()
    expect(textAfter3Backspaces.length).toBeLessThan('بسپر من'.length)

    // Complete backspacing to 0 chars (remaining 4 chars at 20ms = 80ms)
    vi.advanceTimersByTime(100)
    await wrapper.vm.$nextTick()
    expect(wrapper.find('.typing-visible').text().trim()).toBe('')

    // Paused when cleared for 1500ms
    vi.advanceTimersByTime(1000)
    await wrapper.vm.$nextTick()
    expect(wrapper.find('.typing-visible').text().trim()).toBe('')

    // Finish 1.5s pause -> starts re-typing
    vi.advanceTimersByTime(500)
    await wrapper.vm.$nextTick()

    // 1st character re-typed
    vi.advanceTimersByTime(50)
    await wrapper.vm.$nextTick()
    expect(wrapper.find('.typing-visible').text().length).toBeGreaterThanOrEqual(1)
  })

  it('respects prefers-reduced-motion by displaying full text statically without animation loop', async () => {
    // Emulate prefers-reduced-motion: reduce
    vi.stubGlobal('matchMedia', vi.fn().mockImplementation((query) => ({
      matches: query === '(prefers-reduced-motion: reduce)',
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })))

    const wrapper = mount(TypingEffect, {
      props: {
        text: 'کارهای برنامه‌نویسی',
      },
    })
    await wrapper.vm.$nextTick()

    // Immediately shows full text
    expect(wrapper.find('.typing-visible').text()).toContain('کارهای برنامه‌نویسی')
  })
})
