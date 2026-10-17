<template>
  <section id="about" class="about-section" aria-labelledby="about-title">
    <div class="container">
      
      <div class="about-card">
        <div class="about-content">
          <span class="about-badge">داستان و ارزش‌های تیم</span>
          <h2 id="about-title" class="about-title">چرا «بسپر من» ساخته شد؟</h2>
          
          <p class="about-paragraph">
            توسعه نرم‌افزار نباید پر از استرس، بدقولی و بهانه‌های فنی باشد. ما «بسپر من» را با یک هدف مشخص راه‌اندازی کردیم:
            <strong>برقراری ارتباط مستقیم، صادقانه و فنی با کسانی که به دنبال راهکارهای واقعی نرم‌افزاری هستند.</strong>
          </p>

          <p class="about-paragraph">
            در استودیو ما، هیچ بازاریاب یا مدیر میانی غیرفنی بین شما و کد پروژه قرار نمی‌گیرد. شما از روز اول با خود توسعه‌دهندگان
            هم‌صحبت می‌شوید، نیازتان را بررسی می‌کنید و در هر مرحله از پیشرفت کار مطلع می‌شوید.
          </p>

          <div class="values-grid">
            <div class="value-item">
              <span class="value-num">۰۱</span>
              <div>
                <h3 class="value-title">کدنویسی تمیز و ساختارمند</h3>
                <p class="value-desc">پروژه‌ها با اصول معماری روز و بدون کدهای اضافی نوشته می‌شوند تا توسعه‌های بعدی آسان باشد.</p>
              </div>
            </div>

            <div class="value-item">
              <span class="value-num">۰۲</span>
              <div>
                <h3 class="value-title">ارتباط مستقیم با توسعه‌دهنده</h3>
                <p class="value-desc">مشاوره‌ها و گزارش‌ها مستقیماً توسط برنامه‌نویس ارشد انجام می‌شود تا هیچ جزئیاتی از دست نرود.</p>
              </div>
            </div>

            <div class="value-item">
              <span class="value-num">۰۳</span>
              <div>
                <h3 class="value-title">تعهد کامل به زمان‌بندی</h3>
                <p class="value-desc">برنامه‌ریزی شفاف و توافق نهایی؛ پروژه‌ها سر موعد تعیین‌شده همراه با تست‌های نهایی تحویل می‌گردند.</p>
              </div>
            </div>
          </div>
        </div>

        <div class="about-side-panel">
          <div class="quote-card">
            <span class="quote-mark" aria-hidden="true">«</span>
            <p class="quote-text">
              خیالت از بخش فنی پروژه‌ات راحت باشد. ما پشت سیستم نشسته‌ایم و کار را درست تحویل می‌دهیم.
            </p>
            <span class="quote-author">— استودیو بسپر من</span>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<style scoped>
.about-section {
  padding-block: var(--space-20);
  background-color: var(--primitive-cream-100);
  border-block: var(--border-width-bold) solid var(--color-border-bold);
}

.about-card {
  display: grid;
  grid-template-columns: 1fr;
  background-color: var(--color-canvas);
  border: var(--border-width-heavy) solid var(--color-border-bold);
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-lg);
  overflow: hidden;
}

@media (min-width: 960px) {
  .about-card {
    grid-template-columns: 3fr 2fr;
  }
}

.about-content {
  padding: var(--space-8);
}

@media (min-width: 768px) {
  .about-content {
    padding: var(--space-12);
  }
}

.about-badge {
  display: inline-block;
  font-size: var(--text-xs);
  font-weight: 700;
  color: var(--primitive-white);
  background-color: var(--color-accent);
  padding: var(--space-1) var(--space-3);
  border-radius: var(--border-radius-sm);
  margin-bottom: var(--space-4);
}

.about-title {
  font-size: var(--text-3xl);
  color: var(--color-ink-primary);
  margin-bottom: var(--space-6);
}

.about-paragraph {
  font-size: var(--text-base);
  color: var(--color-ink-muted);
  line-height: var(--leading-loose);
  margin-bottom: var(--space-4);
}

.about-paragraph strong {
  color: var(--color-ink-primary);
}

/* Values Grid */
.values-grid {
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
  margin-top: var(--space-8);
}

.value-item {
  display: flex;
  align-items: flex-start;
  gap: var(--space-4);
}

.value-num {
  font-family: var(--font-display);
  font-size: var(--text-2xl);
  color: var(--color-accent-text);
  background-color: var(--primitive-cream-100);
  border: 1px solid var(--color-border-bold);
  padding: var(--space-1) var(--space-3);
  border-radius: var(--border-radius-sm);
  flex-shrink: 0;
}

.value-title {
  font-size: var(--text-lg);
  color: var(--color-ink-primary);
  margin-bottom: var(--space-1);
}

.value-desc {
  font-size: var(--text-sm);
  color: var(--color-ink-muted);
  line-height: var(--leading-normal);
}

/* Side Panel */
.about-side-panel {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--primitive-sage-100);
  border-inline-start: var(--border-width-bold) solid var(--color-border-bold);
  padding: var(--space-8);
}

.quote-card {
  position: relative;
  background-color: var(--color-canvas);
  border: var(--border-width-bold) solid var(--color-border-bold);
  border-radius: var(--border-radius-md);
  box-shadow: 4px 4px 0 var(--color-border-bold);
  padding: var(--space-8);
  max-width: 360px;
}

.quote-mark {
  font-family: var(--font-display);
  font-size: 54px;
  line-height: 1;
  color: var(--color-accent);
  display: block;
  margin-bottom: var(--space-2);
}

.quote-text {
  font-family: var(--font-body);
  font-size: var(--text-base);
  font-weight: 500;
  line-height: var(--leading-normal);
  color: var(--color-ink-primary);
  margin-bottom: var(--space-4);
}

.quote-author {
  display: block;
  font-size: var(--text-sm);
  font-weight: 700;
  color: var(--color-accent-text);
}
</style>
