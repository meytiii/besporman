/**
 * Keyboard Layout Transposition and Character Normalization Utilities
 * Besporman Studio Design System & Input Hygiene
 */

// Physical QWERTY key to Standard Persian (ISIRI 9147 / Windows Persian)
export const EN_TO_FA_KEYBOARD: Record<string, string> = {
  // Lowercase keys
  q: 'ض',
  w: 'ص',
  e: 'ث',
  r: 'ق',
  t: 'ف',
  y: 'غ',
  u: 'ع',
  i: 'ه',
  o: 'خ',
  p: 'ح',
  '[': 'ج',
  ']': 'چ',
  '\\': 'پ',
  a: 'ش',
  s: 'س',
  d: 'ی',
  f: 'ب',
  g: 'ل',
  h: 'ا',
  j: 'ت',
  k: 'ن',
  l: 'م',
  ';': 'ک',
  "'": 'گ',
  z: 'ظ',
  x: 'ط',
  c: 'ز',
  v: 'ر',
  b: 'ذ',
  n: 'د',
  m: 'پ',
  ',': 'و',

  // Uppercase / Shifted keys
  Q: 'ض',
  W: 'ص',
  E: 'ث',
  R: 'ق',
  T: 'ف',
  Y: 'غ',
  U: 'ع',
  I: 'ه',
  O: 'خ',
  P: 'ح',
  '{': 'ج',
  '}': 'چ',
  '|': 'پ',
  A: 'ش',
  S: 'س',
  D: 'ی',
  F: 'ب',
  G: 'ل',
  H: 'آ',
  J: 'ت',
  K: 'ن',
  L: 'م',
  ':': 'ک',
  '"': 'گ',
  Z: 'ظ',
  X: 'ط',
  C: 'ژ',
  V: 'ر',
  B: 'ذ',
  N: 'د',
  M: 'پ',
  '<': 'و',
}

// Physical Persian keys typed mistakenly back to English QWERTY
export const FA_TO_EN_KEYBOARD: Record<string, string> = {
  'ض': 'q',
  'ص': 'w',
  'ث': 'e',
  'ق': 'r',
  'ف': 't',
  'غ': 'y',
  'ع': 'u',
  'ه': 'i',
  'خ': 'o',
  'ح': 'p',
  'ج': '[',
  'چ': ']',
  'ش': 'a',
  'س': 's',
  'ی': 'd',
  'ي': 'd', // Arabic yeh
  'ب': 'f',
  'ل': 'g',
  'ا': 'h',
  'آ': 'h',
  'أ': 'h',
  'إ': 'h',
  'ت': 'j',
  'ن': 'k',
  'م': 'l',
  'ک': 'k', // on direct letter conversion
  'ك': 'k',
  'گ': "'",
  'ظ': 'z',
  'ط': 'x',
  'ز': 'c',
  'ژ': 'c',
  'ر': 'v',
  'ذ': 'b',
  'د': 'n',
  'پ': 'm',
  'ئ': 'm',
  'ء': 'm',
  'و': ',',
}

// Persian / Arabic numerals to English digits
export const PERSIAN_TO_ENGLISH_DIGITS: Record<string, string> = {
  '۰': '0', '۱': '1', '۲': '2', '۳': '3', '۴': '4',
  '۵': '5', '۶': '6', '۷': '7', '۸': '8', '۹': '9',
  '٠': '0', '١': '1', '٢': '2', '٣': '3', '٤': '4',
  '٥': '5', '٦': '6', '٧': '7', '٨': '8', '٩': '9',
}

export const ENGLISH_TO_PERSIAN_DIGITS: Record<string, string> = {
  '0': '۰', '1': '۱', '2': '۲', '3': '۳', '4': '۴',
  '5': '۵', '6': '۶', '7': '۷', '8': '۸', '9': '۹',
}

/**
 * Normalizes all Persian and Arabic digits in a string to standard English digits.
 */
export function toEnglishDigits(input: string): string {
  return input.replace(/[۰-۹٠-٩]/g, (char) => PERSIAN_TO_ENGLISH_DIGITS[char] ?? char)
}

/**
 * Normalizes English digits in a string to Persian digits.
 */
export function toPersianDigits(input: string | number): string {
  return String(input).replace(/[0-9]/g, (char) => ENGLISH_TO_PERSIAN_DIGITS[char] ?? char)
}

/**
 * Transposes English characters to their corresponding Persian keyboard layout keys.
 * Handles Arabic variations (ي -> ی, ك -> ک).
 */
export function transposeEnToFa(text: string): string {
  return text
    .split('')
    .map((char) => EN_TO_FA_KEYBOARD[char] ?? char)
    .join('')
    .replace(/ي/g, 'ی')
    .replace(/ك/g, 'ک')
}

/**
 * Transposes Persian keyboard characters to their English QWERTY equivalents.
 * Also converts Persian numerals to English digits.
 */
export function transposeFaToEn(text: string): string {
  const converted = toEnglishDigits(text)
  return converted
    .split('')
    .map((char) => FA_TO_EN_KEYBOARD[char] ?? char)
    .join('')
}

/**
 * Checks whether current execution environment is a mobile / touch device.
 */
export function isMobileDevice(): boolean {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') {
    return false
  }
  return (
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
    Boolean(window.matchMedia && window.matchMedia('(pointer: coarse)').matches)
  )
}

/**
 * Validates an Iranian mobile phone number.
 * Must be 11 digits starting with 09 (e.g. 09123456789).
 * Normalizes prefixes like +989... or 00989... or 9...
 */
export function normalizeAndValidateIranianPhone(rawInput: string): {
  isValid: boolean
  normalized: string
  errorMessage?: string
} {
  // 1. Convert any Persian digits to English
  const english = toEnglishDigits(rawInput.trim())
  
  // 2. Remove all non-digit characters (spaces, dashes, parens, plus)
  let digits = english.replace(/\D/g, '')

  // 3. Normalize international prefixes (+98 or 0098)
  if (digits.startsWith('00989')) {
    digits = '0' + digits.slice(4)
  } else if (digits.startsWith('989')) {
    digits = '0' + digits.slice(2)
  } else if (digits.startsWith('9') && digits.length === 10) {
    digits = '0' + digits
  }

  if (!digits) {
    return {
      isValid: false,
      normalized: '',
      errorMessage: 'لطفاً شماره تماس معتبر خود را وارد کنید.',
    }
  }

  // 4. Must start with 09 and have exactly 11 digits
  const isValid = /^09\d{9}$/.test(digits)

  if (!isValid) {
    return {
      isValid: false,
      normalized: digits,
      errorMessage: 'شماره همراه باید ۱۱ رقم بوده و با ۰۹ شروع شود (مثال: 09123456789).',
    }
  }

  return {
    isValid: true,
    normalized: digits,
  }
}

/**
 * Validates full name: must have both first and last name (at least 2 distinct words)
 * and contain Persian characters.
 */
export function validatePersianFullName(fullName: string): {
  isValid: boolean
  errorMessage?: string
} {
  const trimmed = fullName.trim()
  if (!trimmed) {
    return {
      isValid: false,
      errorMessage: 'لطفاً نام و نام خانوادگی خود را وارد کنید.',
    }
  }

  const parts = trimmed.split(/\s+/).filter(Boolean)
  if (parts.length < 2 || parts.some((p) => p.length < 2)) {
    return {
      isValid: false,
      errorMessage: 'لطفاً نام و نام خانوادگی را کامل وارد کنید (شامل هر دو بخش نام و نام خانوادگی).',
    }
  }

  // Check for Persian characters (letters, spaces, zero-width non-joiner)
  const persianPattern = /^[\u0600-\u06FF\s\u200C]+$/
  if (!persianPattern.test(trimmed)) {
    return {
      isValid: false,
      errorMessage: 'لطفاً نام و نام خانوادگی را با حروف فارسی وارد کنید.',
    }
  }

  return { isValid: true }
}

/**
 * Validates Telegram username:
 * Must contain only English letters, numbers, and underscores (and optional leading @).
 * Min length 4 (excluding @).
 */
export function validateTelegramUsername(username: string): {
  isValid: boolean
  normalized: string
  errorMessage?: string
} {
  const cleaned = toEnglishDigits(username.trim())
  if (!cleaned || cleaned === '@') {
    return {
      isValid: false,
      normalized: '',
      errorMessage: 'لطفاً آیدی تلگرام خود را وارد کنید (مثال: @telegram).',
    }
  }

  const withoutAt = cleaned.startsWith('@') ? cleaned.slice(1) : cleaned
  const isValid = /^[a-zA-Z0-9_]{4,32}$/.test(withoutAt)

  if (!isValid) {
    return {
      isValid: false,
      normalized: '@' + withoutAt,
      errorMessage: 'آیدی تلگرام باید حداقل ۴ کاراکتر و فقط شامل حروف انگلیسی، اعداد و _ باشد.',
    }
  }

  return {
    isValid: true,
    normalized: '@' + withoutAt,
  }
}
