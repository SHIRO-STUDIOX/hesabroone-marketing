# Shadcn-vue Guidelines

| Metadata | Value |
|---|---|
| ID | `HCD-SHADCN` |
| Version / date | v1.0 / 2026-11-04 |
| Status | Proposed (مگر شش تصمیم مصوب کارفرما) |
| Dependencies | `Design-Decisions-v1.md` |
| Product evidence | `PRD §۲، §۴، §۵، §۶، §۹، §۱۰، §۱۳، §۲۱، §۲۳`؛ صرفاً بررسی ایستای کد، نه تضمین عملکرد زنده |

## مشخصات
Button, Card, Input/NumberField, Slider, Checkbox, Progress, Dialog را wrapper و با CSS Variables scoped تعریف کن. از دستکاری سراسری UI اصلی حسابرو خودداری. StoryPlayer, Receipt, MoneySplit اختصاصی‌اند. charts با Unovis wrapper یا primitive ساده تست‌شده. سازگاری Vue/Tailwind و RTL باید قبل از نصب تأیید شود.

## معیارهای پذیرش این سند
- قواعد قابل اجرا، قابل آزمون و برای همه تمپلیت‌ها سازگار باشند.
- ادعای قابلیت موجود از پیشنهاد توسعه یا داده نمایشی تفکیک شود.
- RTL، واحد پول، حریم خصوصی و دسترس‌پذیری در خروجی رعایت شوند.

## وضعیت تصمیم
- **Approved:** تنها شش تصمیم DD-01 تا DD-06 در سند مادر.
- **Proposed:** جزئیات این سند برای پیاده‌سازی نمونه اول.
- **Needs Validation:** اثربخشی واقعی در کسب‌وکارهای هدف، پس از تست کاربری.
