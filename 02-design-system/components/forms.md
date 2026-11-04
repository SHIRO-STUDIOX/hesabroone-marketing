# Forms & Interaction Components

| Metadata | Value |
|---|---|
| ID | `HCD-COMP-FORMS` |
| Version / date | v1.0 / 2026-11-04 |
| Status | Proposed (مگر شش تصمیم مصوب کارفرما) |
| Dependencies | `Design-Decisions-v1.md` |
| Product evidence | `PRD §۲، §۴، §۵، §۶، §۹، §۱۰، §۱۳، §۲۱، §۲۳`؛ صرفاً بررسی ایستای کد، نه تضمین عملکرد زنده |

## فرم‌های قابل استفاده
`ChoiceCards` انتخاب چند خدمت، `AmountInput` مبلغ، `MoneySplit` جداکردن دریافت در سناریوی مشخص، `ExpensePicker` هزینه، `AccountSelector` حساب نمونه، `InsightDetails` جزئیات قابل باز شدن، `LeadCapture` رضایت و ورود.

## قرارداد مشترک
هر ورودی: `id`, `label`, `description`, `value`, `defaultValue`, `required`, `unit`, `limits`, `error`, `disabled`, `onChange`. اعتبارسنجی قطعی از Schema/Calculator می‌آید؛ نمایشگر از خودش فرمول نسازد.

## پول
در UI کمپین تومان؛ `MoneyAmount` به شکل integer تومان در demo state. هنگام handoff به اپ واقعی که مبنایش ریال است، تبدیل صریح `IRR = toman * 10` با کنترل سرریز/گرد کردن انجام شود. برای محاسبات حرفه‌ای از integer یا Decimal استفاده شود، نه float نادقیق. ورودی ارقام فارسی و عربی normalize شود.

## MoneySplit
`totalReceived = serviceFee + passThrough` فقط وقتی سناریو ماهیت عبوری مستند و تأییدشده دارد. در بقیه خدمات `passThrough = 0` و شرح «دریافتی خدمات» نشان داده شود. `passThrough` هزینه خدمات محسوب نشود.

## حالات
empty، invalid، zero، max، paste نامعتبر، بازگشت، network error، keyboard open، disabled + reason، user edit و reset با تأیید.

## معیارهای پذیرش این سند
- قواعد قابل اجرا، قابل آزمون و برای همه تمپلیت‌ها سازگار باشند.
- ادعای قابلیت موجود از پیشنهاد توسعه یا داده نمایشی تفکیک شود.
- RTL، واحد پول، حریم خصوصی و دسترس‌پذیری در خروجی رعایت شوند.

## وضعیت تصمیم
- **Approved:** تنها شش تصمیم DD-01 تا DD-06 در سند مادر.
- **Proposed:** جزئیات این سند برای پیاده‌سازی نمونه اول.
- **Needs Validation:** اثربخشی واقعی در کسب‌وکارهای هدف، پس از تست کاربری.
