# Integration Boundaries

| Metadata | Value |
|---|---|
| ID | `HCD-INTEGRATION` |
| Version / date | v1.0 / 2026-11-04 |
| Status | Proposed (مگر شش تصمیم مصوب کارفرما) |
| Dependencies | `Design-Decisions-v1.md` |
| Product evidence | `PRD §۲، §۴، §۵، §۶، §۹، §۱۰، §۱۳، §۲۱، §۲۳`؛ صرفاً بررسی ایستای کد، نه تضمین عملکرد زنده |

## مشخصات
PRD ورود OTP، Business/Tenant، Account و Treasury را در کد گزارش می‌کند نه تست عملیاتی. انتقال دمو، وجوه عبوری، اتصال بانکی و اولین ثبت از کمپین قرارداد ندارد. فعلاً Auth/Business/Finance mock adapter با نشانه روشن؛ بعداً از سرویس واقعی و API contract با idempotency, tenant isolation, consent و security review استفاده شود. هیچ endpoint حدسی ایجاد نکن.

## معیارهای پذیرش این سند
- قواعد قابل اجرا، قابل آزمون و برای همه تمپلیت‌ها سازگار باشند.
- ادعای قابلیت موجود از پیشنهاد توسعه یا داده نمایشی تفکیک شود.
- RTL، واحد پول، حریم خصوصی و دسترس‌پذیری در خروجی رعایت شوند.

## وضعیت تصمیم
- **Approved:** تنها شش تصمیم DD-01 تا DD-06 در سند مادر.
- **Proposed:** جزئیات این سند برای پیاده‌سازی نمونه اول.
- **Needs Validation:** اثربخشی واقعی در کسب‌وکارهای هدف، پس از تست کاربری.
