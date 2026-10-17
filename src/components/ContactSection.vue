<template>
  <section id="contact" class="contact-section" aria-labelledby="contact-title">
    <div class="container">
      
      <!-- Section Header -->
      <div class="section-header">
        <span class="section-badge">ارتباط با استودیو</span>
        <h2 id="contact-title" class="section-title">ثبت سفارش و آغاز گفتگو</h2>
        <p class="section-subtitle">
          ایده یا پروژه خود را شرح دهید تا در سریع‌ترین زمان ممکن پاسخ و برآورد اولیه را دریافت کنید.
        </p>
      </div>

      <div class="contact-grid">
        
        <!-- Left Column: Direct Telegram & Guidelines -->
        <div class="contact-info-card">
          <div class="direct-telegram-box">
            <svg class="telegram-icon" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
            <h3 class="telegram-title">گفتگوی مستقیم و سریع در تلگرام</h3>
            <p class="telegram-desc">
              برای هماهنگی فوری، مشاوره اولیه و طرح مستقیم سوالات خود می‌توانید همین حالا به اکانت تلگرام تیم پیام دهید:
            </p>
            <a
              href="https://t.me/besporman"
              target="_blank"
              rel="noopener noreferrer"
              class="btn btn-primary telegram-btn"
              aria-label="گفتگو در تلگرام (باز شدن در تب جدید)"
            >
              <span>پیام در تلگرام</span>
              <span class="btn-arrow" aria-hidden="true">↗</span>
            </a>
          </div>

          <div class="info-guidelines">
            <h4 class="guidelines-title">قبل از ثبت سفارش بدانید:</h4>
            <ul class="guidelines-list">
              <li>برآورد زمان و هزینه به صورت کاملاً شفاف و مستند به شما اعلام می‌شود.</li>
              <li>تمامی پیام‌ها مستقیماً توسط برنامه‌نویسان تیم بررسی می‌گردد.</li>
              <li>اطلاعات پروژه و اطلاعات تماس شما کاملاً محرمانه باقی می‌ماند.</li>
            </ul>
          </div>
        </div>

        <!-- Right Column: Inquiry Form -->
        <div class="contact-form-card">
          <h3 class="form-card-title">فرم ثبت مشخصات پروژه</h3>

          <!-- Status Message Banner (Honest feedback) -->
          <div
            v-if="submissionFeedback"
            class="feedback-banner"
            :class="'feedback-banner--' + submissionFeedback.type"
            role="alert"
            aria-live="polite"
          >
            <span class="feedback-icon" aria-hidden="true">
              <svg v-if="submissionFeedback.type === 'error'" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
              <svg v-else width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="16" x2="12" y2="12"></line>
                <line x1="12" y1="8" x2="12.01" y2="8"></line>
              </svg>
            </span>
            <p class="feedback-text">{{ submissionFeedback.message }}</p>
          </div>

          <form
            class="inquiry-form"
            :aria-busy="isLoading"
            novalidate
            @submit.prevent="handleSubmit"
          >
            <!-- 1. Category Selector -->
            <div class="form-group">
              <label class="form-label" id="category-group-label">نوع پروژه یا خدمت درخواستی: <span class="required-star">*</span></label>
              <div
                class="category-options"
                role="radiogroup"
                aria-labelledby="category-group-label"
              >
                <label
                  class="category-option"
                  :class="{ 'is-selected': form.category === 'web' }"
                >
                  <input
                    type="radio"
                    name="category"
                    value="web"
                    v-model="form.category"
                    class="sr-only"
                  />
                  <span>طراحی وب‌سایت</span>
                </label>

                <label
                  class="category-option"
                  :class="{ 'is-selected': form.category === 'telegram-bot' }"
                >
                  <input
                    type="radio"
                    name="category"
                    value="telegram-bot"
                    v-model="form.category"
                    class="sr-only"
                  />
                  <span>بات تلگرام</span>
                </label>

                <label
                  class="category-option"
                  :class="{ 'is-selected': form.category === 'windows-app' }"
                >
                  <input
                    type="radio"
                    name="category"
                    value="windows-app"
                    v-model="form.category"
                    class="sr-only"
                  />
                  <span>نرم‌افزار ویندوز</span>
                </label>
              </div>
            </div>

            <!-- 2. Name Field -->
            <div class="form-group">
              <label for="client-name" class="form-label">
                نام یا نام‌خانوادگی: <span class="required-star">*</span>
              </label>
              <input
                id="client-name"
                type="text"
                v-model="form.name"
                class="form-input"
                :class="{ 'is-invalid': errors.name }"
                placeholder="مثال: مهدی رضایی"
                :aria-invalid="Boolean(errors.name)"
                :aria-describedby="errors.name ? 'name-error' : undefined"
                required
              />
              <span v-if="errors.name" id="name-error" class="error-msg" role="alert">
                {{ errors.name }}
              </span>
            </div>

            <!-- 3. Contact Info Field -->
            <div class="form-group">
              <label for="contact-info" class="form-label">
                شماره تماس یا آیدی تلگرام: <span class="required-star">*</span>
              </label>
              <input
                id="contact-info"
                type="text"
                v-model="form.contactInfo"
                class="form-input"
                :class="{ 'is-invalid': errors.contactInfo }"
                placeholder="مثال: 09123456789 یا @telegram_id"
                :aria-invalid="Boolean(errors.contactInfo)"
                :aria-describedby="errors.contactInfo ? 'contact-error' : undefined"
                dir="ltr"
                required
              />
              <span v-if="errors.contactInfo" id="contact-error" class="error-msg" role="alert">
                {{ errors.contactInfo }}
              </span>
            </div>

            <!-- 4. Message Field -->
            <div class="form-group">
              <label for="project-message" class="form-label">
                شرح ایده یا نیازمندی‌های پروژه: <span class="required-star">*</span>
              </label>
              <textarea
                id="project-message"
                v-model="form.message"
                class="form-textarea"
                :class="{ 'is-invalid': errors.message }"
                rows="4"
                placeholder="توضیح دهید پروژه قرار است چه کاری انجام دهد..."
                :aria-invalid="Boolean(errors.message)"
                :aria-describedby="errors.message ? 'message-error' : undefined"
                required
              ></textarea>
              <span v-if="errors.message" id="message-error" class="error-msg" role="alert">
                {{ errors.message }}
              </span>
            </div>

            <!-- Submit Button -->
            <button
              type="submit"
              class="btn btn-primary submit-btn"
              :disabled="isLoading"
            >
              <span v-if="!isLoading">ارسال درخواست برای بررسی</span>
              <span v-else class="loading-state">
                <span class="loading-spinner" aria-hidden="true"></span>
                <span>در حال ارسال...</span>
              </span>
            </button>
          </form>
        </div>

      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { defaultContactAdapter, type ContactMessagePayload } from '@/services/contactAdapter'

interface FormErrors {
  name?: string;
  contactInfo?: string;
  message?: string;
}

interface FeedbackState {
  type: 'error' | 'info';
  message: string;
}

const form = reactive<ContactMessagePayload>({
  name: '',
  contactInfo: '',
  category: 'web',
  message: '',
})

const errors = reactive<FormErrors>({})
const isLoading = ref(false)
const submissionFeedback = ref<FeedbackState | null>(null)

const validateForm = (): boolean => {
  errors.name = undefined
  errors.contactInfo = undefined
  errors.message = undefined

  let isValid = true

  if (!form.name.trim() || form.name.trim().length < 2) {
    errors.name = 'لطفاً نام خود را به صورت معتبر وارد کنید (حداقل ۲ حرف).'
    isValid = false
  }

  if (!form.contactInfo.trim() || form.contactInfo.trim().length < 5) {
    errors.contactInfo = 'لطفاً شماره موبایل یا آیدی تلگرام خود را وارد کنید.'
    isValid = false
  }

  if (!form.message.trim() || form.message.trim().length < 10) {
    errors.message = 'لطفاً توضیحات بیشتری درباره نیازمندی‌های پروژه بنویسید (حداقل ۱۰ کاراکتر).'
    isValid = false
  }

  return isValid
}

const handleSubmit = async () => {
  if (!validateForm()) {
    return
  }

  isLoading.value = true
  submissionFeedback.value = null

  try {
    const result = await defaultContactAdapter.submit({ ...form })
    if (result.success) {
      submissionFeedback.value = {
        type: 'info',
        message: result.messageFa,
      }
      form.name = ''
      form.contactInfo = ''
      form.message = ''
    } else {
      submissionFeedback.value = {
        type: 'info',
        message: result.messageFa,
      }
    }
  } catch {
    submissionFeedback.value = {
      type: 'error',
      message: 'برقراری ارتباط با سرور با خطا مواجه شد. لطفاً از طریق تلگرام مستقیم در ارتباط باشید.',
    }
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
.contact-section {
  padding-block: var(--space-20);
  background-color: var(--color-canvas);
}

.section-header {
  text-align: center;
  max-width: 650px;
  margin-inline: auto;
  margin-bottom: var(--space-12);
}

.section-badge {
  display: inline-block;
  font-family: var(--font-body);
  font-size: var(--text-xs);
  font-weight: 700;
  color: var(--primitive-white);
  background-color: var(--color-accent);
  padding: var(--space-1) var(--space-3);
  border-radius: var(--border-radius-sm);
  margin-bottom: var(--space-3);
}

.section-title {
  font-size: var(--text-3xl);
  color: var(--color-ink-primary);
  margin-bottom: var(--space-3);
}

.section-subtitle {
  font-size: var(--text-base);
  color: var(--color-ink-muted);
}

/* Grid */
.contact-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-8);
}

@media (min-width: 960px) {
  .contact-grid {
    grid-template-columns: 2fr 3fr;
  }
}

/* Left Column: Direct Telegram Card */
.contact-info-card {
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
}

.direct-telegram-box {
  background-color: var(--primitive-sage-100);
  border: var(--border-width-bold) solid var(--color-border-bold);
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-md);
  padding: var(--space-8);
}

.telegram-icon {
  font-size: 36px;
  display: block;
  margin-bottom: var(--space-3);
}

.telegram-title {
  font-size: var(--text-xl);
  color: var(--color-ink-primary);
  margin-bottom: var(--space-3);
}

.telegram-desc {
  font-size: var(--text-sm);
  color: var(--color-ink-muted);
  line-height: var(--leading-normal);
  margin-bottom: var(--space-6);
}

.telegram-btn {
  width: 100%;
}

.info-guidelines {
  background-color: var(--primitive-cream-100);
  border: var(--border-width-bold) solid var(--color-border-bold);
  border-radius: var(--border-radius-md);
  padding: var(--space-6);
}

.guidelines-title {
  font-size: var(--text-base);
  color: var(--color-ink-primary);
  margin-bottom: var(--space-3);
}

.guidelines-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.guidelines-list li {
  position: relative;
  font-size: var(--text-xs);
  color: var(--color-ink-muted);
  padding-inline-start: var(--space-4);
  line-height: var(--leading-normal);
}

.guidelines-list li::before {
  content: '•';
  position: absolute;
  inset-inline-start: 0;
  color: var(--color-accent);
  font-weight: 700;
}

/* Right Column: Inquiry Form Card */
.contact-form-card {
  background-color: var(--primitive-cream-100);
  border: var(--border-width-heavy) solid var(--color-border-bold);
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-lg);
  padding: var(--space-8);
}

.form-card-title {
  font-size: var(--text-2xl);
  color: var(--color-ink-primary);
  margin-bottom: var(--space-6);
}

/* Feedback Banner */
.feedback-banner {
  display: flex;
  align-items: flex-start;
  gap: var(--space-3);
  padding: var(--space-4);
  border-radius: var(--border-radius-sm);
  border: var(--border-width-bold) solid var(--color-border-bold);
  margin-bottom: var(--space-6);
}

.feedback-banner--info {
  background-color: var(--primitive-amber-100);
  color: var(--color-warning-text);
}

.feedback-banner--error {
  background-color: var(--color-error-bg);
  color: var(--color-error-text);
}

.feedback-icon {
  font-size: 20px;
  flex-shrink: 0;
}

.feedback-text {
  font-size: var(--text-sm);
  font-weight: 500;
  line-height: var(--leading-normal);
}

/* Form Groups */
.form-group {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  margin-bottom: var(--space-5);
}

.form-label {
  font-size: var(--text-sm);
  font-weight: 700;
  color: var(--color-ink-primary);
}

.required-star {
  color: var(--color-accent-text);
}

/* Category Radios */
.category-options {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-2);
}

.category-option {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-3) var(--space-2);
  background-color: var(--color-canvas);
  border: var(--border-width-bold) solid var(--color-border-bold);
  border-radius: var(--border-radius-sm);
  box-shadow: 2px 2px 0 var(--color-border-bold);
  font-size: var(--text-xs);
  font-weight: 700;
  color: var(--color-ink-primary);
  cursor: pointer;
  text-align: center;
  transition: transform 0.1s ease, box-shadow 0.1s ease, background-color 0.15s ease;
}

.category-option:hover {
  transform: translate(-1px, -1px);
  box-shadow: 3px 3px 0 var(--color-border-bold);
}

.category-option.is-selected {
  background-color: var(--color-ink-primary);
  color: var(--primitive-white);
  transform: translate(1px, 1px);
  box-shadow: 1px 1px 0 var(--color-border-bold);
}

/* Inputs & Textarea */
.form-input,
.form-textarea {
  width: 100%;
  padding: var(--space-3) var(--space-4);
  background-color: var(--color-canvas);
  border: var(--border-width-bold) solid var(--color-border-bold);
  border-radius: var(--border-radius-sm);
  box-shadow: 2px 2px 0 var(--color-border-bold);
  font-size: var(--text-base);
  color: var(--color-ink-primary);
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
}

.form-input:focus,
.form-textarea:focus {
  outline: none;
  border-color: var(--color-accent);
  box-shadow: 3px 3px 0 var(--color-accent);
}

.form-input.is-invalid,
.form-textarea.is-invalid {
  border-color: var(--color-accent-text);
}

.error-msg {
  font-size: var(--text-xs);
  font-weight: 700;
  color: var(--color-accent-text);
}

.submit-btn {
  width: 100%;
  margin-top: var(--space-2);
}

.loading-state {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
}

.loading-spinner {
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.4);
  border-top-color: var(--primitive-white);
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
