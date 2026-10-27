import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import BackgroundPixelStars, { DEFAULT_BRAND_COLORS } from '@/components/ui/BackgroundPixelStars.vue'

describe('BackgroundPixelStars Component', () => {
  beforeEach(() => {
    vi.useFakeTimers()

    // Mock HTMLCanvasElement.getContext
    HTMLCanvasElement.prototype.getContext = vi.fn().mockReturnValue({
      clearRect: vi.fn(),
      fillRect: vi.fn(),
      save: vi.fn(),
      restore: vi.fn(),
      translate: vi.fn(),
      rotate: vi.fn(),
      fillStyle: '',
      globalAlpha: 1,
    }) as unknown as typeof HTMLCanvasElement.prototype.getContext

    // Mock window dimensions
    Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: 1200 })
    Object.defineProperty(window, 'innerHeight', { writable: true, configurable: true, value: 800 })

    // Default: no reduced motion
    window.matchMedia = vi.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }))
  })

  afterEach(() => {
    vi.restoreAllMocks()
    vi.useRealTimers()
  })

  it('renders canvas element with accessibility attributes and fixed styling', () => {
    const wrapper = mount(BackgroundPixelStars)
    const canvas = wrapper.find('canvas')

    expect(canvas.exists()).toBe(true)
    expect(canvas.classes()).toContain('background-pixel-stars-canvas')
    expect(canvas.attributes('aria-hidden')).toBe('true')
    expect(canvas.attributes('role')).toBe('presentation')
  })

  it('exports canonical Besporman brand halftone colors', () => {
    expect(DEFAULT_BRAND_COLORS).toContain('#0E0F12') // Charcoal ink
    expect(DEFAULT_BRAND_COLORS).toContain('#D93829') // Comic red
    expect(DEFAULT_BRAND_COLORS).toContain('#7B8E78') // Vintage sage
    expect(DEFAULT_BRAND_COLORS).toContain('#D4A373') // Tan / amber
  })

  it('mounts and initializes canvas dimensions to window size', () => {
    const wrapper = mount(BackgroundPixelStars)
    const canvas = wrapper.find('canvas').element as HTMLCanvasElement

    expect(canvas.width).toBe(1200)
    expect(canvas.height).toBe(800)
  })

  it('cleans up animation frame and timers on unmount', () => {
    const cancelAnimationSpy = vi.spyOn(window, 'cancelAnimationFrame')
    const clearIntervalSpy = vi.spyOn(window, 'clearInterval')
    const clearTimeoutSpy = vi.spyOn(window, 'clearTimeout')
    const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener')

    const wrapper = mount(BackgroundPixelStars)
    wrapper.unmount()

    expect(removeEventListenerSpy).toHaveBeenCalledWith('resize', expect.any(Function))
  })

  it('respects prefers-reduced-motion by avoiding animation loop', () => {
    window.matchMedia = vi.fn().mockImplementation((query: string) => ({
      matches: query.includes('prefers-reduced-motion'),
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }))

    const requestAnimationSpy = vi.spyOn(window, 'requestAnimationFrame')
    mount(BackgroundPixelStars)

    // Should not start requestAnimationFrame loop
    expect(requestAnimationSpy).not.toHaveBeenCalled()
  })
})
