# Financial Metrics

| Metadata | Value |
|---|---|
| ID | `HCD-FINMETRIC` |
| Version / date | v1.0 / 2026-11-04 |
| Status | Proposed (مگر شش تصمیم مصوب کارفرما) |
| Dependencies | `Design-Decisions-v1.md` |
| Product evidence | `PRD §۲، §۴، §۵، §۶، §۹، §۱۰، §۱۳، §۲۱، §۲۳`؛ صرفاً بررسی ایستای کد، نه تضمین عملکرد زنده |

## مشخصات
**داده دمو، تومان صحیح، دامنه یک خدمت نمونه:** `received=totalReceived`; `serviceFee=agency? fee: totalReceived`; `passThrough=agency? received-fee:0`; `relatedExpenses=sum(selected expense)`؛ `illustrativeSurplus=serviceFee-relatedExpenses`. دریافتی، درآمد، هزینه و وجه عبوری مفاهیم متفاوت‌اند. مازاد ≠ سود خالص. ناقص بودن input باید null/error بدهد نه صفر. PRD داشبورد فعلی سود خالص قطعی نیست.

## معیارهای پذیرش این سند
- قواعد قابل اجرا، قابل آزمون و برای همه تمپلیت‌ها سازگار باشند.
- ادعای قابلیت موجود از پیشنهاد توسعه یا داده نمایشی تفکیک شود.
- RTL، واحد پول، حریم خصوصی و دسترس‌پذیری در خروجی رعایت شوند.

## وضعیت تصمیم
- **Approved:** تنها شش تصمیم DD-01 تا DD-06 در سند مادر.
- **Proposed:** جزئیات این سند برای پیاده‌سازی نمونه اول.
- **Needs Validation:** اثربخشی واقعی در کسب‌وکارهای هدف، پس از تست کاربری.
