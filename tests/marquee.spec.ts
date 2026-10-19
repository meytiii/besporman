import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import MarqueeBanner from '@/components/MarqueeBanner.vue'

describe('MarqueeBanner Accessibility & Kinematics', () => {
  it('renders two identical tiles for seamless continuous looping', () => {
    const wrapper = mount(MarqueeBanner)
    const tiles = wrapper.findAll('.marquee-tile')
    expect(tiles.length).toBe(2)

    // Verify both tiles contain the same number of bubbles
    const bubblesTileA = tiles[0].findAll('.comic-bubble')
    const bubblesTileB = tiles[1].findAll('.comic-bubble')
    expect(bubblesTileA.length).toBe(bubblesTileB.length)
    expect(bubblesTileA.length).toBeGreaterThan(0)
  })

  it('provides a screen-reader transcription and isolates visual track', () => {
    const wrapper = mount(MarqueeBanner)
    
    // Graphic track is aria-hidden
    const track = wrapper.find('.marquee-viewport')
    expect(track.attributes('aria-hidden')).toBe('true')
    expect(track.attributes('dir')).toBe('ltr')

    // Screen reader list exists and contains requests
    const srList = wrapper.find('ul.sr-only')
    expect(srList.exists()).toBe(true)
    expect(srList.findAll('li').length).toBeGreaterThan(0)
  })

  it('toggles pause state on mouse hover and leave', async () => {
    const wrapper = mount(MarqueeBanner)
    const viewport = wrapper.find('.marquee-viewport')
    expect(viewport.exists()).toBe(true)

    // Initial state: running
    expect(wrapper.find('.marquee-track').classes()).not.toContain('is-paused')

    // Mouse enter -> paused
    await viewport.trigger('mouseenter')
    expect(wrapper.find('.marquee-track').classes()).toContain('is-paused')

    // Mouse leave -> resumed
    await viewport.trigger('mouseleave')
    expect(wrapper.find('.marquee-track').classes()).not.toContain('is-paused')
  })

  it('toggles pause state on double click / double tap without showing messages', async () => {
    const wrapper = mount(MarqueeBanner)
    const viewport = wrapper.find('.marquee-viewport')

    // Initially not paused and badge does not exist
    expect(wrapper.find('.marquee-track').classes()).not.toContain('is-paused')
    expect(wrapper.find('.marquee-status-pill').exists()).toBe(false)

    // First double click -> pauses without status badge
    await viewport.trigger('dblclick')
    expect(wrapper.find('.marquee-track').classes()).toContain('is-paused')
    expect(wrapper.find('.marquee-status-pill').exists()).toBe(false)

    // Second double click -> resumes without status badge
    await viewport.trigger('dblclick')
    expect(wrapper.find('.marquee-track').classes()).not.toContain('is-paused')
    expect(wrapper.find('.marquee-status-pill').exists()).toBe(false)
  })

  it('handles mobile touch start, horizontal swipe, and drag state', async () => {
    const wrapper = mount(MarqueeBanner)
    const viewport = wrapper.find('.marquee-viewport')
    const track = wrapper.find('.marquee-track')

    // Touch start
    await viewport.trigger('touchstart', {
      touches: [{ clientX: 200, clientY: 100 }],
    })

    // Touch move horizontally by 50px
    await viewport.trigger('touchmove', {
      touches: [{ clientX: 150, clientY: 102 }],
    })

    // Should activate dragging and pause
    expect(track.classes()).toContain('is-dragging')
    expect(track.classes()).toContain('is-paused')

    // Touch end completes swipe
    await viewport.trigger('touchend', {
      changedTouches: [{ clientX: 150, clientY: 102 }],
    })

    expect(track.classes()).not.toContain('is-dragging')
  })
})
