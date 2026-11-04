# Conversion & Activation

| Metadata | Value |
|---|---|
| ID | `HCD-CONVERT` |
| Version / date | v1.0 / 2026-11-04 |
| Status | Proposed (مگر شش تصمیم مصوب کارفرما) |
| Dependencies | `Design-Decisions-v1.md` |
| Product evidence | `PRD §۲، §۴، §۵، §۶، §۹، §۱۰، §۱۳، §۲۱، §۲۳`؛ صرفاً بررسی ایستای کد، نه تضمین عملکرد زنده |

## مشخصات
`result_viewed → signup_clicked → auth → otp_verified → existing_business? → create/select business → select year → first_real_income/expense → server_confirmed`. اگر دفتر دارد ساخت دوباره تحمیل نکنید. در حالت MVP این فرایند mock صریح است؛ از موفقیت ساختگی پرهیز شود. داده‌های demo transaction هرگز وارد دفتر واقعی نمی‌شوند. Auth return URL امن و allowlisted باشد؛ retry و session restoration تعریف شود.

## معیارهای پذیرش این سند
- قواعد قابل اجرا، قابل آزمون و برای همه تمپلیت‌ها سازگار باشند.
- ادعای قابلیت موجود از پیشنهاد توسعه یا داده نمایشی تفکیک شود.
- RTL، واحد پول، حریم خصوصی و دسترس‌پذیری در خروجی رعایت شوند.

## وضعیت تصمیم
- **Approved:** تنها شش تصمیم DD-01 تا DD-06 در سند مادر.
- **Proposed:** جزئیات این سند برای پیاده‌سازی نمونه اول.
- **Needs Validation:** اثربخشی واقعی در کسب‌وکارهای هدف، پس از تست کاربری.
