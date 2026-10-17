// src/services/contactAdapter.ts

export interface ContactMessagePayload {
  name: string;
  contactInfo: string; // phone or telegram handle
  category: 'web' | 'telegram-bot' | 'windows-app';
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
    if (!payload.name || payload.name.trim().length < 2) {
      return {
        success: false,
        code: 'VALIDATION_ERROR',
        messageFa: 'لطفاً نام یا نام‌خانوادگی معتبر وارد کنید.'
      };
    }
    if (!payload.message || payload.message.trim().length < 10) {
      return {
        success: false,
        code: 'VALIDATION_ERROR',
        messageFa: 'توضیحات پیام باید حداقل ۱۰ کاراکتر باشد.'
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
