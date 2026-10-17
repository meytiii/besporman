import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ContactSection from '@/components/ContactSection.vue'

describe('Contact Section & Decoupled Telegram Boundary', () => {
  it('validates required fields and shows inline errors without false success', async () => {
    const wrapper = mount(ContactSection)
    const form = wrapper.find('form')

    // Submit empty form
    await form.trigger('submit.prevent')

    // Should show validation errors
    expect(wrapper.text()).toContain('لطفاً نام خود را به صورت معتبر وارد کنید')
    expect(wrapper.text()).toContain('لطفاً شماره موبایل یا آیدی تلگرام خود را وارد کنید')
    expect(wrapper.text()).toContain('لطفاً توضیحات بیشتری درباره نیازمندی‌های پروژه بنویسید')
  })

  it('submits valid form and returns honest not_configured feedback rather than fake success', async () => {
    const wrapper = mount(ContactSection)

    // Fill valid data
    await wrapper.find('#client-name').setValue('مهدی رضایی')
    await wrapper.find('#contact-info').setValue('09121112233')
    await wrapper.find('#project-message').setValue('نیازمند یک وب‌سایت مدرن با پورتفولیو و فرم سفارشات اختصاصی هستیم.')

    const form = wrapper.find('form')
    await form.trigger('submit.prevent')

    // Wait for async submission
    await new Promise((r) => setTimeout(r, 700))

    // Verify honest user-facing status (never fakes success)
    const feedbackBanner = wrapper.find('.feedback-banner')
    expect(feedbackBanner.exists()).toBe(true)
    expect(feedbackBanner.text()).toContain('درگاه ثبت پیام خودکار هنوز به سرور متصل نشده است')
    expect(feedbackBanner.text()).not.toContain('پیام شما با موفقیت ثبت شد')
  })

  it('provides a direct Telegram deep link with target="_blank"', () => {
    const wrapper = mount(ContactSection)
    const tgLink = wrapper.find('a.telegram-btn')
    expect(tgLink.exists()).toBe(true)
    expect(tgLink.attributes('href')).toContain('https://t.me/')
    expect(tgLink.attributes('target')).toBe('_blank')
    expect(tgLink.attributes('rel')).toContain('noopener')
  })
})
