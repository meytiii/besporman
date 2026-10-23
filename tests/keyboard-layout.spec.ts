import { describe, it, expect } from 'vitest'
import {
  transposeEnToFa,
  transposeFaToEn,
  toEnglishDigits,
  toPersianDigits,
  normalizeAndValidateIranianPhone,
  validatePersianFullName,
  validateTelegramUsername,
} from '@/utils/keyboardLayout'

describe('Keyboard Layout Transposition & Form Validators', () => {
  describe('transposeEnToFa (English QWERTY to Persian layout)', () => {
    it('transposes single keys accurately as requested (e.g. d -> ی)', () => {
      expect(transposeEnToFa('d')).toBe('ی')
      expect(transposeEnToFa('s')).toBe('س')
      expect(transposeEnToFa('a')).toBe('ش')
      expect(transposeEnToFa('f')).toBe('ب')
      expect(transposeEnToFa('h')).toBe('ا')
      expect(transposeEnToFa('l')).toBe('م')
    })

    it('transposes shifted keys properly (e.g. H -> آ, C -> ژ)', () => {
      expect(transposeEnToFa('H')).toBe('آ')
      expect(transposeEnToFa('C')).toBe('ژ')
    })

    it('transposes a full sentence mistakenly typed in English', () => {
      // "lind vqhdd" typed on QWERTY -> "مهدی رضایی"
      expect(transposeEnToFa('lind vqhdd')).toBe('مهدی رضایی')
    })
  })

  describe('transposeFaToEn (Persian layout to English QWERTY)', () => {
    it('transposes Persian keys back to English QWERTY (e.g. ی -> d, س -> s)', () => {
      expect(transposeFaToEn('ی')).toBe('d')
      expect(transposeFaToEn('س')).toBe('s')
      expect(transposeFaToEn('خ')).toBe('o')
    })

    it('converts Persian digits to English digits during transposition', () => {
      expect(transposeFaToEn('۱۲۳')).toBe('123')
      expect(transposeFaToEn('@پثایه_۱۲')).toBe('@mehdi_12')
    })
  })

  describe('toEnglishDigits & toPersianDigits', () => {
    it('normalizes Persian and Arabic numerals to English digits', () => {
      expect(toEnglishDigits('۰۹۱۲۳۴۵۶۷۸۹')).toBe('09123456789')
      expect(toEnglishDigits('٠١٢٣٤٥٦٧٨٩')).toBe('0123456789')
    })

    it('formats English digits to Persian numerals', () => {
      expect(toPersianDigits('09123456789')).toBe('۰۹۱۲۳۴۵۶۷۸۹')
    })
  })

  describe('normalizeAndValidateIranianPhone', () => {
    it('validates a standard 11-digit Iranian mobile number starting with 09', () => {
      const res = normalizeAndValidateIranianPhone('09123456789')
      expect(res.isValid).toBe(true)
      expect(res.normalized).toBe('09123456789')
    })

    it('normalizes Persian digits in phone numbers', () => {
      const res = normalizeAndValidateIranianPhone('۰۹۱۲۳۴۵۶۷۸۹')
      expect(res.isValid).toBe(true)
      expect(res.normalized).toBe('09123456789')
    })

    it('normalizes international prefixes like +98 or 0098', () => {
      const res1 = normalizeAndValidateIranianPhone('+989123456789')
      expect(res1.isValid).toBe(true)
      expect(res1.normalized).toBe('09123456789')

      const res2 = normalizeAndValidateIranianPhone('00989351234567')
      expect(res2.isValid).toBe(true)
      expect(res2.normalized).toBe('09351234567')
    })

    it('normalizes 10-digit number without leading 0', () => {
      const res = normalizeAndValidateIranianPhone('9123456789')
      expect(res.isValid).toBe(true)
      expect(res.normalized).toBe('09123456789')
    })

    it('rejects numbers not starting with 09 (e.g. landlines) or invalid lengths', () => {
      const landline = normalizeAndValidateIranianPhone('02188776655')
      expect(landline.isValid).toBe(false)
      expect(landline.errorMessage).toContain('با ۰۹ شروع شود')

      const tooShort = normalizeAndValidateIranianPhone('09123456')
      expect(tooShort.isValid).toBe(false)
      expect(tooShort.errorMessage).toContain('۱۱ رقم')
    })
  })

  describe('validatePersianFullName', () => {
    it('accepts valid Persian full names with both first and last name', () => {
      expect(validatePersianFullName('مهدی رضایی').isValid).toBe(true)
      expect(validatePersianFullName('سید علی حسینی').isValid).toBe(true)
    })

    it('rejects single-word names (requires both first and last name)', () => {
      const res = validatePersianFullName('مهدی')
      expect(res.isValid).toBe(false)
      expect(res.errorMessage).toContain('شامل هر دو بخش نام و نام خانوادگی')
    })

    it('rejects English characters in Persian full name', () => {
      const res = validatePersianFullName('Mehdi Rezaei')
      expect(res.isValid).toBe(false)
      expect(res.errorMessage).toContain('حروف فارسی')
    })

    it('rejects empty name', () => {
      const res = validatePersianFullName('   ')
      expect(res.isValid).toBe(false)
      expect(res.errorMessage).toContain('نام و نام خانوادگی خود را وارد کنید')
    })
  })

  describe('validateTelegramUsername', () => {
    it('accepts valid telegram username and ensures @ prefix', () => {
      const res1 = validateTelegramUsername('@besporman_bot')
      expect(res1.isValid).toBe(true)
      expect(res1.normalized).toBe('@besporman_bot')

      const res2 = validateTelegramUsername('mehdi_dev')
      expect(res2.isValid).toBe(true)
      expect(res2.normalized).toBe('@mehdi_dev')
    })

    it('rejects usernames that are too short or contain non-English characters', () => {
      const res1 = validateTelegramUsername('ab')
      expect(res1.isValid).toBe(false)
      expect(res1.errorMessage).toContain('حداقل ۴ کاراکتر')

      const res2 = validateTelegramUsername('@مهدی')
      expect(res2.isValid).toBe(false)
      expect(res2.errorMessage).toContain('فقط شامل حروف انگلیسی')
    })
  })
})
