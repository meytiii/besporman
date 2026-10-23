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
    expect(wrapper.text()).toContain('لطفاً آیدی تلگرام یا شماره در دسترس خود را وارد کنید')
    expect(wrapper.text()).toContain('لطفاً شرح ایده را با حداقل ۳۰ کاراکتر تکمیل کنید')
  })

  it('updates circular progress completion as fields are filled', async () => {
    const wrapper = mount(ContactSection)

    // Initially with default projectStage ('new-idea'): 15%
    expect(wrapper.text()).toContain('۱۵٪')

    // Fill name (>= 2 chars: +15% -> 30%)
    await wrapper.find('#client-name').setValue('مهدی رضایی')
    expect(wrapper.text()).toContain('۳۰٪')

    // Fill contact info (>= 4 chars: +20% -> 50%)
    await wrapper.find('#contact-info').setValue('@mehdi_dev')
    expect(wrapper.text()).toContain('۵۰٪')

    // Fill description >= 30 characters (+20% -> 70%)
    await wrapper.find('#project-message').setValue('این یک پروژه اختصاصی فروشگاهی مدرن با رابط کاربری نئوبروتالیسم است.')
    expect(wrapper.text()).toContain('۷۰٪')
  })

  it('submits valid form and returns honest not_configured feedback rather than fake success', async () => {
    const wrapper = mount(ContactSection)

    // Fill valid data
    await wrapper.find('#client-name').setValue('مهدی رضایی')
    await wrapper.find('#contact-info').setValue('09121112233')
    await wrapper.find('#project-message').setValue('نیازمند یک وب‌سایت مدرن با پورتفولیو و فرم سفارشات اختصاصی هستیم که تمامی بخش‌ها را پوشش دهد.')

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
