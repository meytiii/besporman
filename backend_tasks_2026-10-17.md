# Besporman — Backend and Infrastructure Tasks

> **Date:** 2026-10-17  
> **Status:** Pending Owner Infrastructure Selection  
> **Scope:** Architecture & Requirements for Backend, Telegram Bot & Server Deployment  
> **Repository Boundary:** Decoupled from client frontend repository (`meytiii/besporman`)

---

## 1. Architectural Boundary & Security Principles

The Besporman client website is an isolated, portable static Single Page Application (Vue 3 + Vite + TypeScript). 

To ensure security and prevent unauthorized access or abuse:
* **Zero Client-Side Secrets:** Client-side JavaScript must **never** contain Telegram Bot API tokens, database connection strings, or private webhook secrets.
* **Decoupled Adapter Pattern:** The frontend form interacts exclusively with an abstract interface (`ContactSubmissionAdapter`). It does not communicate directly with the Telegram Bot API.
* **Isolated Backend Service:** All form processing, validation, rate limiting, and Telegram forwarding must be handled by an independent serverless function or backend microservice.

---

## 2. Identified Backend Tasks

### Task 1: Telegram Bot Registration & Administrative Channel Setup
* **Bot Creation:** Register the official Besporman bot via `@BotFather` to obtain the Telegram Bot Token.
* **Bot Profile Configuration:** Set the official avatar (`favicon.png` / studio mascot), description, and commands.
* **Admin Channel / Group:** Create an internal, private Telegram channel or group to receive incoming client inquiries. Obtain the `CHAT_ID`.
* **Deep Link Username:** Confirm the official Telegram username handle (e.g., `https://t.me/besporman_admin`) for the direct contact button on the website.

### Task 2: Contact Form Submission Endpoint (Serverless / Microservice)
* **Target Endpoint:** `POST /api/inquiry` (hosted on Cloudflare Workers, Vercel Serverless Functions, Supabase Edge Functions, or a lightweight Node.js/Python microservice).
* **Payload Validation Schema:**
  * `name`: string, required, 2–60 characters, sanitized against XSS.
  * `phone`: string, optional, Iranian mobile format validation (`^09[0-9]{9}$`).
  * `telegramHandle`: string, optional, valid Telegram username format (`^@[A-Za-z0-9_]{5,32}$`).
  * `category`: enum, required (`'web'` | `'telegram-bot'` | `'windows-app'`).
  * `message`: string, required, 10–2000 characters.
* **Security & Anti-Abuse:**
  * IP-based rate limiting (maximum 3 inquiries per IP per hour).
  * Honeypot field verification (`_hp_company` field must remain empty).
  * Optional Cloudflare Turnstile token verification for bot prevention.
* **Telegram Notification Dispatch:**
  * Format incoming inquiries into a clean, structured Persian Telegram message:
    ```
    📩 پیام جدید از وب‌سایت بسپر من

    👤 نام: [نام مشتری]
    📞 تماس: [شماره موبایل]
    💬 تلگرام: [@یوزرنیم]
    🏷 دسته‌بندی: [طراحی وب / بات تلگرام / نرم‌افزار ویندوز]
    📝 شرح نیاز:
    [متن پیام]

    ⏰ زمان ثبت: [تاریخ و ساعت شمسی]
    🌐 آی‌پی فرستنده: [IP]
    ```
  * Send payload securely to `https://api.telegram.org/bot<SECRET_TOKEN>/sendMessage`.
  * Return structured JSON response to client:
    * Success: `{ "success": true, "code": "SENT", "messageFa": "پیام شما با موفقیت ثبت شد." }`
    * Validation Error: `{ "success": false, "code": "VALIDATION_ERROR", "messageFa": "اطلاعات وارد شده نامعتبر است." }`
    * Server Error: `{ "success": false, "code": "ERROR", "messageFa": "خطایی رخ داد. لطفاً از طریق تلگرام مستقیم تماس بگیرید." }`

### Task 3: Web Server HTML5 History Mode Fallback & Headers
* **URL Rewrite Configuration:** Ensure the target static host rewrites all non-file requests to `/index.html` with an HTTP 200 status:
  * **Nginx:**
    ```nginx
    location / {
      try_files $uri $uri/ /index.html;
    }
    ```
  * **Cloudflare Pages / Netlify:** Maintain a `_redirects` file:
    ```
    /* /index.html 200
    ```
* **Security Headers:**
  * `X-Content-Type-Options: nosniff`
  * `X-Frame-Options: SAMEORIGIN`
  * `Referrer-Policy: strict-origin-when-cross-origin`
  * Content Security Policy (CSP) restricting script execution and font sources.

---

## 3. Prerequisites for Implementation

Before wiring the production contact adapter:
1. Owner confirms target backend hosting environment (e.g. Cloudflare Worker or Node VPS).
2. Owner creates Telegram bot and supplies `BOT_TOKEN` and `CHAT_ID` as backend environment variables.
3. Owner confirms public Telegram username for direct contact button.
