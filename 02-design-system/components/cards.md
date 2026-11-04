# Cards & Artifact Components

| Metadata | Value |
|---|---|
| ID | `HCD-CARDS` |
| Version / date | v1.0 / 2026-11-04 |
| Status | Proposed (مگر شش تصمیم مصوب کارفرما) |
| Dependencies | `Design-Decisions-v1.md` |
| Product evidence | `PRD §۲، §۴، §۵، §۶، §۹، §۱۰، §۱۳، §۲۱، §۲۳`؛ صرفاً بررسی ایستای کد، نه تضمین عملکرد زنده |

کارت‌های مشترک `StoryCard`, `OptionCard`, `AmountCard`, `InsightCard`, `FinancialArtifact`؛ padding, radius, border از semantic/component tokens. Artifact (رسید/صورت‌حساب/قرارداد) برای هر صنف skin اختصاصی دارد اما داده، accessibility و responsive behaviour مشترک است. برگه نمونه باید «فرضی» و واحد زمان/پول داشته باشد. کارت انتخابی stateهای selected/unselected/disabled/focus/error دارد.

## معیارهای پذیرش این سند
- قواعد قابل اجرا، قابل آزمون و برای همه تمپلیت‌ها سازگار باشند.
- ادعای قابلیت موجود از پیشنهاد توسعه یا داده نمایشی تفکیک شود.
- RTL، واحد پول، حریم خصوصی و دسترس‌پذیری در خروجی رعایت شوند.

## وضعیت تصمیم
- **Approved:** تنها شش تصمیم DD-01 تا DD-06 در سند مادر.
- **Proposed:** جزئیات این سند برای پیاده‌سازی نمونه اول.
- **Needs Validation:** اثربخشی واقعی در کسب‌وکارهای هدف، پس از تست کاربری.
