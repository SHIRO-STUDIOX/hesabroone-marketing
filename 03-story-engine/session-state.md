# Demo Session & State Contract

| Metadata | Value |
|---|---|
| ID | `HCD-SESSION` |
| Version / date | v1.0 / 2026-11-04 |
| Status | Proposed (مگر شش تصمیم مصوب کارفرما) |
| Dependencies | `Design-Decisions-v1.md` |
| Product evidence | `PRD §۲، §۴، §۵، §۶، §۹، §۱۰، §۱۳، §۲۱، §۲۳`؛ صرفاً بررسی ایستای کد، نه تضمین عملکرد زنده |

## Demo Session Model — پیشنهادی
`{sessionId, schemaVersion, scenarioId, templateVersion, variantId, campaignId, source, createdAt, updatedAt, expiresAt, currentStoryId, visitedIds, inputs, consent}`.

فقط ورودی‌های demo غیرحساس: services IDs, monetary example numbers, example expense items, business nickname اختیاری. شماره موبایل، کد ملی، شناسه بانکی، اطلاعات مشتری واقعی، OTP و توکن احراز هویت در demo session ممنوع است.

## Persistence
برای MVP یک persistence محلی با expiry پیشنهادی ۲۴ ساعت و دکمه «شروع دوباره» قابل قبول است؛ در دستگاه عمومی/مشترک باید هشدار و کنترل حذف واضح باشد. این مدت پیشنهادی و نیازمند تست است. با تغییر نسخه ناسازگار سناریو، restore با پیام «نسخه تجربه تغییر کرده» و reset امن انجام شود.

## Security & activation
Session id نباید مجوز دسترسی به پرونده واقعی باشد. از نوشتن state مالی نمونه در API عملیاتی جلوگیری شود. هنگام شروع login فقط campaign attribution و تنظیمات allowlist انتقال یابد؛ داده نمونه تراکنش به Business واقعی منتقل نشود. توکن auth فقط در جریان امن محصول؛ URL open redirect پذیرفته نشود.

## Restore behavior
Refresh → same story and values; Browser back → previous story with same values; duplicate tabs → conflict policy (ترجیح آخرین state با هشدار در صورت اختلاف); session expired → امکان شروع دوباره با حفظ رضایت اختیاری برای داده غیرحساس تا زمان پایان session.

## معیارهای پذیرش این سند
- قواعد قابل اجرا، قابل آزمون و برای همه تمپلیت‌ها سازگار باشند.
- ادعای قابلیت موجود از پیشنهاد توسعه یا داده نمایشی تفکیک شود.
- RTL، واحد پول، حریم خصوصی و دسترس‌پذیری در خروجی رعایت شوند.

## وضعیت تصمیم
- **Approved:** تنها شش تصمیم DD-01 تا DD-06 در سند مادر.
- **Proposed:** جزئیات این سند برای پیاده‌سازی نمونه اول.
- **Needs Validation:** اثربخشی واقعی در کسب‌وکارهای هدف، پس از تست کاربری.
