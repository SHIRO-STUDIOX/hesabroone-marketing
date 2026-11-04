# Analytics Events

| Metadata | Value |
|---|---|
| ID | `HCD-EVENTS` |
| Version / date | v1.0 / 2026-11-04 |
| Status | Proposed (مگر شش تصمیم مصوب کارفرما) |
| Dependencies | `Design-Decisions-v1.md` |
| Product evidence | `PRD §۲، §۴، §۵، §۶، §۹، §۱۰، §۱۳، §۲۱، §۲۳`؛ صرفاً بررسی ایستای کد، نه تضمین عملکرد زنده |

## مشخصات
رویدادها: `campaign_view`, `demo_start`, `story_view`, `interaction_valid`, `insight_viewed`, `signup_cta_clicked`, `otp_verified`, `business_created`, `first_real_transaction`. Context: session ناشناس، campaign، variant، industry، scenarioVersion، storyId، timestamp. PII و مبالغ مالی ممنوع. رویداد واقعی فقط با تأیید پاسخ سرویس؛ نرخ تبدیل بر جلسات/کاربران یکتا بر اساس مخرج صریح.

## معیارهای پذیرش این سند
- قواعد قابل اجرا، قابل آزمون و برای همه تمپلیت‌ها سازگار باشند.
- ادعای قابلیت موجود از پیشنهاد توسعه یا داده نمایشی تفکیک شود.
- RTL، واحد پول، حریم خصوصی و دسترس‌پذیری در خروجی رعایت شوند.

## وضعیت تصمیم
- **Approved:** تنها شش تصمیم DD-01 تا DD-06 در سند مادر.
- **Proposed:** جزئیات این سند برای پیاده‌سازی نمونه اول.
- **Needs Validation:** اثربخشی واقعی در کسب‌وکارهای هدف، پس از تست کاربری.
