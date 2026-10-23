<template>
  <section class="contact-section" aria-labelledby="contact-title">
    <div class="container">
      
      <!-- Section Header -->
      <div class="section-header">
        <span class="section-badge reveal-badge comic-pop">ارتباط با استودیو</span>
        <h2 id="contact-title" class="section-title">
          <TypingEffect
            text="ثبت سفارش و آغاز گفتگو"
            :hold-delay="2000"
            :cleared-delay="1500"
            :typing-speed="65"
            :deleting-speed="25"
          />
        </h2>
        <p class="section-subtitle">
          <TextReveal
            as="span"
            text="ایده یا پروژه خود را شرح دهید تا در سریع‌ترین زمان ممکن پاسخ و برآورد اولیه را دریافت کنید."
            preset="fade-in-blur"
            :delay="0.1"
            :speed-reveal="1.3"
          />
        </p>
      </div>

      <div class="contact-grid">
        
        <!-- Left Column: Direct Telegram & Guidelines -->
        <div class="contact-info-card comic-pop delay-1">
          <div class="direct-telegram-box">
            <!-- Authentic Telegram Brand Logo SVG -->
            <svg class="telegram-icon" width="42" height="42" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="12" cy="12" r="11" fill="#24A1DE" stroke="var(--color-ink-primary, #0E0F12)" stroke-width="1.8"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M17.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.832.926z" fill="#FAF7F0"/>
            </svg>
            <h3 class="telegram-title">گفتگوی مستقیم و سریع در تلگرام</h3>
            <p class="telegram-desc">
              برای هماهنگی فوری، مشاوره اولیه و طرح مستقیم سوالات خود می‌توانید همین حالا به اکانت تلگرام تیم پیام دهید:
            </p>
            <a
              href="https://t.me/besporman_bot"
              target="_blank"
              rel="noopener noreferrer"
              class="btn btn-primary telegram-btn"
              aria-label="گفتگو در تلگرام (باز شدن در تب جدید)"
            >
              <span class="btn-text">پیام در تلگرام</span>
              <AppButtonArrow direction="external" />
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

        <!-- Right Column: Inquiry Form Card -->
        <div class="contact-form-card comic-pop delay-2">
          
          <!-- Card Header with Title and Circular Progress Indicator -->
          <div class="form-card-header">
            <div class="form-card-header-titles">
              <h3 class="form-card-title">فرم ثبت مشخصات پروژه</h3>
              <p class="form-card-subtitle">
                تکمیل فرم: <span class="font-mono font-bold text-accent">{{ formatPersianDigits(completionProgress) }}٪</span>
              </p>
            </div>

            <!-- Animated Circular Progress Bar Component -->
            <div
              class="form-progress-wrap"
              title="میزان پیشرفت تکمیل فرم"
              :aria-label="`میزان تکمیل فرم: ${formatPersianDigits(completionProgress)} درصد`"
            >
              <AnimatedCircularProgressBar
                :value="completionProgress"
                :size="58"
                :stroke-width="8"
                gauge-primary-color="#D93829"
                gauge-secondary-color="rgba(14, 15, 18, 0.12)"
              />
            </div>
          </div>

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
            <!-- 1. Project Stage (3 simple pills/radios replacing old service categories) -->
            <div class="form-group">
              <label class="form-label" id="stage-group-label">
                مرحله پروژه: <span class="required-star">*</span>
              </label>
              <div
                class="stage-options"
                role="radiogroup"
                aria-labelledby="stage-group-label"
              >
                <label
                  class="stage-option"
                  :class="{ 'is-selected': form.projectStage === 'new-idea' }"
                >
                  <input
                    type="radio"
                    name="projectStage"
                    value="new-idea"
                    v-model="form.projectStage"
                    class="sr-only"
                  />
                  <span>ایده جدید</span>
                </label>

                <label
                  class="stage-option"
                  :class="{ 'is-selected': form.projectStage === 'upgrade-existing' }"
                >
                  <input
                    type="radio"
                    name="projectStage"
                    value="upgrade-existing"
                    v-model="form.projectStage"
                    class="sr-only"
                  />
                  <span>ارتقا یا توسعه پروژه فعلی</span>
                </label>

                <label
                  class="stage-option"
                  :class="{ 'is-selected': form.projectStage === 'consultation' }"
                >
                  <input
                    type="radio"
                    name="projectStage"
                    value="consultation"
                    v-model="form.projectStage"
                    class="sr-only"
                  />
                  <span>مشاوره فنی</span>
                </label>
              </div>
              <span v-if="errors.projectStage" class="error-msg" role="alert">
                {{ errors.projectStage }}
              </span>
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

            <!-- 3. Preferred Contact Method & Contact Info -->
            <div class="form-group">
              <div class="contact-method-header">
                <label class="form-label" id="contact-method-label">
                  روش ارتباطی ترجیحی: <span class="required-star">*</span>
                </label>

                <!-- Method Switcher Pills -->
                <div class="contact-method-switch" role="group" aria-labelledby="contact-method-label">
                  <button
                    type="button"
                    class="method-btn"
                    :class="{ 'is-active': form.contactMethod === 'telegram' }"
                    @click="form.contactMethod = 'telegram'"
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.832.926z"/>
                    </svg>
                    <span>تلگرام</span>
                  </button>

                  <button
                    type="button"
                    class="method-btn"
                    :class="{ 'is-active': form.contactMethod === 'phone' }"
                    @click="form.contactMethod = 'phone'"
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                    </svg>
                    <span>تماس / پیامک</span>
                  </button>
                </div>
              </div>

              <!-- Contact Value Input -->
              <div class="input-with-hint">
                <input
                  id="contact-info"
                  :type="form.contactMethod === 'phone' ? 'tel' : 'text'"
                  v-model="form.contactInfo"
                  class="form-input"
                  :class="{ 'is-invalid': errors.contactInfo }"
                  :placeholder="form.contactMethod === 'telegram' ? 'مثال: @telegram' : 'مثال: 09123456789'"
                  :aria-invalid="Boolean(errors.contactInfo)"
                  :aria-describedby="errors.contactInfo ? 'contact-error' : undefined"
                  dir="ltr"
                  required
                />
              </div>
              <span v-if="errors.contactInfo" id="contact-error" class="error-msg" role="alert">
                {{ errors.contactInfo }}
              </span>
            </div>

            <!-- 4. High-Leverage Fields: Budget Range & Target Timeline in Responsive Row -->
            <div class="dropdowns-row">
              <!-- Budget Range Dropdown -->
              <div class="form-group dropdown-field">
                <SmoothDropdown
                  v-model="form.budgetRange"
                  label="محدوده بودجه تقریبی"
                  :options="budgetOptions"
                  trigger-id="budget-dropdown-trigger"
                />
              </div>

              <!-- Target Timeline Dropdown -->
              <div class="form-group dropdown-field">
                <SmoothDropdown
                  v-model="form.timeline"
                  label="زمان‌بندی مد نظر"
                  :options="timelineOptions"
                  trigger-id="timeline-dropdown-trigger"
                />
              </div>
            </div>

            <!-- 5. Reference Links or Documentation (Optional Input) -->
            <div class="form-group">
              <label for="reference-link" class="form-label">
                لینک نمونه، داکیومنت یا فیگما (اختیاری):
              </label>
              <input
                id="reference-link"
                type="url"
                v-model="form.referenceLink"
                class="form-input"
                placeholder="https://figma.com/... یا github.com/..."
                dir="ltr"
              />
            </div>

            <!-- 6. Upgraded Description Field with Mini-Prompt & Character Counter -->
            <div class="form-group">
              <div class="message-label-row">
                <label for="project-message" class="form-label">
                  شرح ایده یا نیازمندی‌های پروژه: <span class="required-star">*</span>
                </label>
                <!-- Character Counter -->
                <span
                  class="char-counter font-mono"
                  :class="{
                    'is-sufficient': form.message.trim().length >= 30,
                    'is-insufficient': form.message.trim().length > 0 && form.message.trim().length < 30
                  }"
                  aria-live="polite"
                >
                  <template v-if="form.message.trim().length >= 30">
                    {{ formatPersianDigits(form.message.trim().length) }} کاراکتر ✓
                  </template>
                  <template v-else>
                    {{ formatPersianDigits(form.message.trim().length) }} / ۳۰ کاراکتر (حداقل ۳۰)
                  </template>
                </span>
              </div>

              <textarea
                id="project-message"
                v-model="form.message"
                class="form-textarea"
                :class="{ 'is-invalid': errors.message }"
                rows="4"
                placeholder="«۱. هدف اصلی پروژه چیست؟ ۲. مخاطبان آن چه کسانی هستند؟ ۳. آیا دیزاین یا سیستم قبلی دارید؟»"
                :aria-invalid="Boolean(errors.message)"
                :aria-describedby="errors.message ? 'message-error' : undefined"
                required
              ></textarea>
              <span v-if="errors.message" id="message-error" class="error-msg" role="alert">
                {{ errors.message }}
              </span>
            </div>

            <!-- Submit Button & Action-driven Promise -->
            <button
              type="submit"
              class="btn btn-primary submit-btn neo-submit-btn"
              :disabled="isLoading"
            >
              <template v-if="!isLoading">
                <div class="btn-content-wrap">
                  <span class="btn-main-text">دریافت مشاوره و برآورد هزینه</span>
                  <span class="btn-sub-text">ثبت و ارسال پیام</span>
                </div>
                <AppButtonArrow direction="left" />
              </template>
              <span v-else class="loading-state">
                <span class="loading-spinner" aria-hidden="true"></span>
                <span class="btn-text">در حال پردازش و ثبت پیام...</span>
              </span>
            </button>

            <!-- Response Time Subtext Badge -->
            <div class="response-time-badge" aria-label="زمان پاسخگویی">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
              <span>«پاسخگویی معمولاً در کمتر از ۲۴ ساعت در تلگرام»</span>
            </div>
          </form>
        </div>

      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import { reactive, ref, computed } from 'vue'
import {
  defaultContactAdapter,
  type ContactMessagePayload,
  type ProjectStage,
  type ContactMethod,
} from '@/services/contactAdapter'
import TextReveal from '@/components/ui/TextReveal.vue'
import TypingEffect from '@/components/ui/TypingEffect.vue'
import AppButtonArrow from '@/components/AppButtonArrow.vue'
import AnimatedCircularProgressBar from '@/components/ui/AnimatedCircularProgressBar.vue'
import SmoothDropdown, { type DropdownOption } from '@/components/ui/SmoothDropdown.vue'
import { useScrollReveal } from '@/composables/useScrollReveal'

useScrollReveal()

interface FormErrors {
  projectStage?: string
  name?: string
  contactInfo?: string
  message?: string
}

interface FeedbackState {
  type: 'error' | 'info'
  message: string
}

const form = reactive<ContactMessagePayload>({
  projectStage: 'new-idea',
  name: '',
  contactMethod: 'telegram',
  contactInfo: '',
  budgetRange: '',
  timeline: '',
  referenceLink: '',
  message: '',
})

const errors = reactive<FormErrors>({})
const isLoading = ref(false)
const submissionFeedback = ref<FeedbackState | null>(null)

// Budget Options for Dropdown
const budgetOptions: DropdownOption[] = [
  { id: 'minimal', label: 'کمتر از ۱۰ میلیون تومان (مینیمال)' },
  { id: 'standard', label: '۱۰ تا ۳۰ میلیون تومان (MVP استاندارد)' },
  { id: 'production', label: '۳۰ تا ۷۰ میلیون تومان (تولید کامل)' },
  { id: 'enterprise', label: 'بیش از ۷۰ میلیون تومان (سازمانی / پیچیده)' },
  { id: 'estimate-needed', label: 'نیاز به تخمین و برآورد' },
]

// Timeline Options for Dropdown
const timelineOptions: DropdownOption[] = [
  { id: 'immediate', label: 'فوری (کمتر از ۲ هفته)' },
  { id: 'medium', label: '۱ تا ۲ ماه' },
  { id: 'flexible', label: 'منعطف / مرحله برنامه‌ریزی' },
]

// Animated Circular Progress Calculation
const completionProgress = computed(() => {
  let score = 0

  // 1. Project Stage: 15%
  if (form.projectStage) {
    score += 15
  }

  // 2. Name: 15%
  if (form.name.trim().length >= 2) {
    score += 15
  } else if (form.name.trim().length > 0) {
    score += 8
  }

  // 3. Contact Info: 20%
  if (form.contactInfo.trim().length >= 4) {
    score += 20
  } else if (form.contactInfo.trim().length > 0) {
    score += 10
  }

  // 4. Budget Range: 15%
  if (form.budgetRange) {
    score += 15
  }

  // 5. Timeline: 15%
  if (form.timeline) {
    score += 15
  }

  // 6. Message: 20% (proportional up to 30 chars)
  const msgLen = form.message.trim().length
  if (msgLen >= 30) {
    score += 20
  } else if (msgLen > 0) {
    score += Math.round((msgLen / 30) * 20)
  }

  return Math.min(100, Math.max(0, score))
})

const formatPersianDigits = (num: number): string => {
  const digits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹']
  return num.toString().replace(/\d/g, (d) => digits[parseInt(d, 10)])
}

const validateForm = (): boolean => {
  errors.projectStage = undefined
  errors.name = undefined
  errors.contactInfo = undefined
  errors.message = undefined

  let isValid = true

  if (!form.projectStage) {
    errors.projectStage = 'لطفاً وضعیت و مرحله پروژه را انتخاب کنید.'
    isValid = false
  }

  if (!form.name.trim() || form.name.trim().length < 2) {
    errors.name = 'لطفاً نام خود را به صورت معتبر وارد کنید (حداقل ۲ حرف).'
    isValid = false
  }

  if (!form.contactInfo.trim() || form.contactInfo.trim().length < 4) {
    errors.contactInfo = form.contactMethod === 'telegram'
      ? 'لطفاً آیدی تلگرام خود را وارد کنید (مثال: @telegram).'
      : 'لطفاً شماره تماس معتبر خود را وارد کنید.'
    isValid = false
  }

  if (!form.message.trim() || form.message.trim().length < 30) {
    errors.message = 'لطفاً شرح ایده را با حداقل ۳۰ کاراکتر تکمیل کنید تا امکان برآورد میسر باشد.'
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
      form.referenceLink = ''
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
  border: 3px solid var(--color-border-bold);
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-lg);
  padding: var(--space-8);
}

@media (max-width: 640px) {
  .contact-form-card {
    padding: var(--space-5);
  }
}

/* Form Card Header with Circular Progress Bar */
.form-card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-4);
  margin-bottom: var(--space-6);
  padding-bottom: var(--space-4);
  border-bottom: 2px dashed rgba(14, 15, 18, 0.15);
}

.form-card-header-titles {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.form-card-title {
  font-size: var(--text-2xl);
  color: var(--color-ink-primary);
  margin: 0;
}

.form-card-subtitle {
  font-size: var(--text-xs);
  color: var(--color-ink-muted);
  margin: 0;
}

.form-progress-wrap {
  flex-shrink: 0;
  background-color: var(--primitive-white);
  padding: 4px;
  border: 2px solid var(--color-border-bold);
  border-radius: 50%;
  box-shadow: 2px 2px 0 var(--color-border-bold);
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Feedback Banner */
.feedback-banner {
  display: flex;
  align-items: flex-start;
  gap: var(--space-3);
  padding: var(--space-4);
  border-radius: var(--border-radius-sm);
  border: 3px solid var(--color-border-bold);
  margin-bottom: var(--space-6);
  box-shadow: 2px 2px 0 var(--color-border-bold);
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
  font-weight: 600;
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

/* 1. Project Stage Options (Pills) */
.stage-options {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-2);
}

@media (min-width: 520px) {
  .stage-options {
    grid-template-columns: repeat(3, 1fr);
  }
}

.stage-option {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 8px;
  background-color: var(--color-canvas);
  border: 3px solid var(--color-border-bold);
  border-radius: var(--border-radius-sm);
  box-shadow: 3px 3px 0 var(--color-border-bold);
  font-size: var(--text-xs);
  font-weight: 700;
  color: var(--color-ink-primary);
  cursor: pointer;
  text-align: center;
  transition: transform 0.12s ease, box-shadow 0.12s ease, background-color 0.15s ease, border-color 0.15s ease;
  min-height: 44px;
}

.stage-option:hover {
  transform: translate(-1px, -1px);
  box-shadow: 4px 4px 0 var(--color-border-bold);
  background-color: var(--primitive-white);
}

.stage-option.is-selected {
  background-color: var(--color-ink-primary);
  color: var(--primitive-white);
  border-color: var(--color-ink-primary);
  transform: translate(2px, 2px);
  box-shadow: 1px 1px 0 var(--color-border-bold);
}

/* Preferred Contact Method Header & Switcher */
.contact-method-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 8px;
}

.contact-method-switch {
  display: inline-flex;
  gap: 4px;
  background-color: var(--color-canvas);
  padding: 3px;
  border: 2px solid var(--color-border-bold);
  border-radius: var(--border-radius-sm);
}

.method-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  font-family: var(--font-body);
  font-size: var(--text-xs);
  font-weight: 700;
  color: var(--color-ink-muted);
  background: transparent;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.15s ease;
  min-height: 32px;
}

.method-btn:hover {
  color: var(--color-ink-primary);
}

.method-btn.is-active {
  background-color: var(--color-ink-primary);
  color: var(--primitive-white);
  box-shadow: 1px 1px 0 var(--color-border-bold);
}

/* Dropdowns Row */
.dropdowns-row {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-4);
  margin-bottom: var(--space-5);
}

@media (min-width: 600px) {
  .dropdowns-row {
    grid-template-columns: 1fr 1fr;
  }
}

.dropdown-field {
  margin-bottom: 0;
}

/* Message Label & Character Counter */
.message-label-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 4px 8px;
}

.char-counter {
  font-size: var(--text-xs);
  font-weight: 700;
  color: var(--color-ink-muted);
  transition: color 0.2s ease;
}

.char-counter.is-sufficient {
  color: #1B7A3E;
  font-weight: 800;
}

.char-counter.is-insufficient {
  color: var(--color-accent-text);
}

/* Neo-Brutalist Inputs & Textarea with 3px Borders & Accent Red Focus Pop */
.form-input,
.form-textarea {
  width: 100%;
  padding: 12px 14px;
  background-color: var(--color-canvas);
  border: 3px solid var(--color-border-bold);
  border-radius: var(--border-radius-sm);
  box-shadow: 3px 3px 0 var(--color-border-bold);
  font-family: var(--font-body);
  font-size: var(--text-sm);
  color: var(--color-ink-primary);
  transition: border-color 0.15s ease, box-shadow 0.15s ease, background-color 0.15s ease, transform 0.15s ease;
}

.form-input:hover,
.form-textarea:hover {
  background-color: var(--primitive-white);
}

/* Heavy Brutalist Focus State: switches to Accent Red with offset shadow */
.form-input:focus,
.form-textarea:focus {
  outline: none;
  background-color: var(--primitive-white);
  border-color: var(--color-accent);
  box-shadow: 0 0 0 3px rgba(217, 56, 41, 0.25), 3px 3px 0 var(--color-border-bold);
  transform: translate(-1px, -1px);
}

.form-input.is-invalid,
.form-textarea.is-invalid {
  border-color: var(--color-accent-text);
  background-color: rgba(217, 56, 41, 0.04);
}

.error-msg {
  font-size: var(--text-xs);
  font-weight: 700;
  color: var(--color-accent-text);
  margin-top: 2px;
}

/* Neo-Brutalist Submit Button: Keyframed Smooth Tactile Animations */
.neo-submit-btn {
  position: relative;
  width: 100%;
  margin-top: var(--space-3);
  padding: 12px 20px;
  min-height: 54px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 3px solid var(--color-border-bold);
  box-shadow: 4px 4px 0 var(--color-border-bold);
  background-color: var(--color-accent);
  color: var(--primitive-white);
  overflow: hidden;
  cursor: pointer;
  transform: translateZ(0);
  transition:
    transform 0.35s cubic-bezier(0.16, 1, 0.3, 1),
    box-shadow 0.35s cubic-bezier(0.16, 1, 0.3, 1),
    background-color 0.25s ease;
}

/* Subtle Shimmer Sheen Glide */
.neo-submit-btn::before {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  inset-inline-start: -100%;
  width: 60%;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(255, 255, 255, 0.12) 40%,
    rgba(255, 255, 255, 0.28) 50%,
    rgba(255, 255, 255, 0.12) 60%,
    transparent 100%
  );
  transform: skewX(-20deg);
  pointer-events: none;
  z-index: 2;
  opacity: 0;
}

/* Multi-phase Keyframed Hover Lift & Spring */
.neo-submit-btn:hover:not(:disabled) {
  animation: btn-hover-keyframe 0.5s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}

.neo-submit-btn:hover:not(:disabled)::before {
  animation: btn-sheen-sweep 0.85s cubic-bezier(0.16, 1, 0.3, 1) 0.05s forwards;
}

@keyframes btn-hover-keyframe {
  0% {
    transform: translate(0, 0);
    box-shadow: 4px 4px 0 var(--color-border-bold);
  }
  38% {
    transform: translate(-3.5px, -3.5px);
    box-shadow: 7.5px 7.5px 0 var(--color-border-bold);
  }
  72% {
    transform: translate(-1.8px, -1.8px);
    box-shadow: 5px 5px 0 var(--color-border-bold);
  }
  100% {
    transform: translate(-2.5px, -2.5px);
    box-shadow: 6px 6px 0 var(--color-border-bold);
  }
}

@keyframes btn-sheen-sweep {
  0% {
    inset-inline-start: -70%;
    opacity: 0;
  }
  20% {
    opacity: 1;
  }
  80% {
    opacity: 0.8;
  }
  100% {
    inset-inline-start: 140%;
    opacity: 0;
  }
}

/* Keyframed Arrow Badge Animation on Hover */
.neo-submit-btn .btn-arrow {
  position: relative !important;
  inset-inline-end: auto !important;
  top: auto !important;
  transform: none !important;
  flex-shrink: 0;
  z-index: 3;
  transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}

.neo-submit-btn:hover:not(:disabled) .btn-arrow {
  animation: btn-arrow-spring 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
}

@keyframes btn-arrow-spring {
  0% {
    transform: translateX(0) scale(1);
  }
  35% {
    transform: translateX(-6px) scale(1.1);
  }
  65% {
    transform: translateX(-2px) scale(0.98);
  }
  100% {
    transform: translateX(-4px) scale(1.04);
  }
}

/* Active Press State */
.neo-submit-btn:active:not(:disabled) {
  transform: translate(2px, 2px) !important;
  box-shadow: 2px 2px 0 var(--color-border-bold) !important;
  animation: none !important;
  transition: transform 0.08s ease, box-shadow 0.08s ease;
}

.neo-submit-btn:active:not(:disabled) .btn-arrow {
  transform: translateX(1px) scale(0.95) !important;
  animation: none !important;
}

.btn-content-wrap {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2px;
  text-align: start;
  z-index: 3;
  transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}

.neo-submit-btn:hover:not(:disabled) .btn-content-wrap {
  transform: translateX(-2px);
}

.btn-main-text {
  font-size: var(--text-base);
  font-weight: 800;
  line-height: 1.2;
}

.btn-sub-text {
  font-size: var(--text-xs);
  opacity: 0.88;
  font-weight: 500;
}

.loading-state {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  width: 100%;
}

.loading-spinner {
  width: 18px;
  height: 18px;
  border: 2px solid rgba(255, 255, 255, 0.4);
  border-top-color: var(--primitive-white);
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}

/* Response Time Subtext Badge */
.response-time-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  margin-top: var(--space-4);
  padding: 8px 12px;
  background-color: var(--primitive-sage-100);
  border: 2px solid var(--color-border-bold);
  border-radius: var(--border-radius-sm);
  box-shadow: 2px 2px 0 var(--color-border-bold);
  font-size: var(--text-xs);
  font-weight: 700;
  color: var(--color-ink-primary);
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
