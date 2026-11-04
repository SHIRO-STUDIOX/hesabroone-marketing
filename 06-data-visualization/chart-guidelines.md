# Chart Guidelines

| Metadata | Value |
|---|---|
| ID | `HCD-CHARTS` |
| Version / date | v1.0 / 2026-11-04 |
| Status | Proposed (مگر شش تصمیم مصوب کارفرما) |
| Dependencies | `Design-Decisions-v1.md` |
| Product evidence | `PRD §۲، §۴، §۵، §۶، §۹، §۱۰، §۱۳، §۲۱، §۲۳`؛ صرفاً بررسی ایستای کد، نه تضمین عملکرد زنده |

## مشخصات
برای split وجه از stacked bar + legend و عدد دقیق، برای درآمد-هزینه از دو KPI/Bar، و برای محاسبه از Breakdown table استفاده کن. Unovis wrapper پیشنهادی؛ CSS split bar برای ساده‌ترین نمودار کافی است. chart و KPI از یک calculator؛ labels و واحد، table alternative، tooltip غیرضروری، touch محفوظ از swipe، reduced motion، صفر/منفی/داده نامعتبر.

## معیارهای پذیرش این سند
- قواعد قابل اجرا، قابل آزمون و برای همه تمپلیت‌ها سازگار باشند.
- ادعای قابلیت موجود از پیشنهاد توسعه یا داده نمایشی تفکیک شود.
- RTL، واحد پول، حریم خصوصی و دسترس‌پذیری در خروجی رعایت شوند.

## وضعیت تصمیم
- **Approved:** تنها شش تصمیم DD-01 تا DD-06 در سند مادر.
- **Proposed:** جزئیات این سند برای پیاده‌سازی نمونه اول.
- **Needs Validation:** اثربخشی واقعی در کسب‌وکارهای هدف، پس از تست کاربری.
