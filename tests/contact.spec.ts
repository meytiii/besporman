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
    expect(wrapper.text()).toContain('لطفاً نام و نام خانوادگی خود را وارد کنید')
    expect(wrapper.text()).toContain('لطفاً آیدی تلگرام خود را وارد کنید')
    expect(wrapper.text()).toContain('لطفاً شرح ایده را با حداقل ۳۰ کاراکتر تکمیل کنید')
  })

  it('requires both first and last name for full name validation', async () => {
    const wrapper = mount(ContactSection)
    const nameInput = wrapper.find('#client-name')

    // Only first name entered
    await nameInput.setValue('مهدی')
    const form = wrapper.find('form')
    await form.trigger('submit.prevent')

    expect(wrapper.text()).toContain('لطفاً نام و نام خانوادگی را کامل وارد کنید (شامل هر دو بخش نام و نام خانوادگی)')
  })

  it('validates Iranian mobile phone numbers (11 digits starting with 09)', async () => {
    const wrapper = mount(ContactSection)
    
    // Switch to phone method
    const phoneBtn = wrapper.findAll('.method-btn')[1]
    await phoneBtn.trigger('click')

    // Enter invalid phone
    const contactInput = wrapper.find('#contact-info')
    await contactInput.setValue('0211234567') // Landline or 10 digits
    const form = wrapper.find('form')
    await form.trigger('submit.prevent')

    expect(wrapper.text()).toContain('شماره همراه باید ۱۱ رقم بوده و با ۰۹ شروع شود')

    // Enter valid 11-digit mobile starting with 09
    await contactInput.setValue('09121112233')
    await form.trigger('submit.prevent')
    expect(wrapper.text()).not.toContain('شماره همراه باید ۱۱ رقم بوده و با ۰۹ شروع شود')
  })

  it('updates circular progress completion as fields are filled', async () => {
    const wrapper = mount(ContactSection)

    // Initially with default projectStage ('new-idea'): 15%
    expect(wrapper.text()).toContain('۱۵٪')

    // Fill name (both first and last name: +15% -> 30%)
    await wrapper.find('#client-name').setValue('مهدی رضایی')
    expect(wrapper.text()).toContain('۳۰٪')

    // Fill contact info (valid telegram: +20% -> 50%)
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
    await wrapper.find('#contact-info').setValue('@mehdi_dev')
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
    expect(tgLink.attributes('href')).toBe('https://t.me/besporman_bot')
    expect(tgLink.attributes('target')).toBe('_blank')
    expect(tgLink.attributes('rel')).toContain('noopener')
  })
})
