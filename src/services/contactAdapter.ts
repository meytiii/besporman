// src/services/contactAdapter.ts

export type ProjectStage = 'new-idea' | 'upgrade-existing' | 'consultation';
export type ContactMethod = 'telegram' | 'phone';

export interface ContactMessagePayload {
  projectStage: ProjectStage;
  name: string;
  contactMethod: ContactMethod;
  contactInfo: string;
  budgetRange: string;
  timeline: string;
  referenceLink?: string;
  message: string;
}

export interface SubmissionResult {
  success: boolean;
  code: 'SENT' | 'NOT_CONFIGURED' | 'VALIDATION_ERROR' | 'ERROR';
  messageFa: string;
}

export interface ContactSubmissionAdapter {
  submit(payload: ContactMessagePayload): Promise<SubmissionResult>;
}

/**
 * Development & Static Fallback Adapter
 * Explicitly informs the user that the backend submission gateway is not yet wired,
 * adhering to the strict project rule: NEVER simulate false submission success.
 */
export class DevelopmentContactAdapter implements ContactSubmissionAdapter {
  async submit(payload: ContactMessagePayload): Promise<SubmissionResult> {
    // Basic client-side sanity check
    if (!payload.projectStage) {
      return {
        success: false,
        code: 'VALIDATION_ERROR',
        messageFa: 'لطفاً مرحله پروژه خود را انتخاب کنید.'
      };
    }
    if (!payload.name || payload.name.trim().length < 2) {
      return {
        success: false,
        code: 'VALIDATION_ERROR',
        messageFa: 'لطفاً نام یا نام‌خانوادگی معتبر وارد کنید (حداقل ۲ حرف).'
      };
    }
    if (!payload.contactInfo || payload.contactInfo.trim().length < 4) {
      return {
        success: false,
        code: 'VALIDATION_ERROR',
        messageFa: payload.contactMethod === 'telegram'
          ? 'لطفاً آیدی تلگرام خود را وارد کنید.'
          : 'لطفاً شماره تماس معتبر وارد کنید.'
      };
    }
    if (!payload.message || payload.message.trim().length < 30) {
      return {
        success: false,
        code: 'VALIDATION_ERROR',
        messageFa: 'توضیحات پروژه باید حداقل ۳۰ کاراکتر باشد تا بتوانیم برآورد دقیقی ارائه دهیم.'
      };
    }

    // Simulate short network roundtrip
    await new Promise((resolve) => setTimeout(resolve, 600));

    // Return explicit NOT_CONFIGURED status
    return {
      success: false,
      code: 'NOT_CONFIGURED',
      messageFa: 'درگاه ثبت پیام خودکار هنوز به سرور متصل نشده است. لطفاً مستقیماً از طریق تلگرام پیام ارسال کنید.'
    };
  }
}

// Export default instance
export const defaultContactAdapter: ContactSubmissionAdapter = new DevelopmentContactAdapter();
