# Story Architecture & Navigation State

| Metadata | Value |
|---|---|
| ID | `HCD-ST-ARCH` |
| Version / date | v1.0 / 2026-11-04 |
| Status | Proposed (مگر شش تصمیم مصوب کارفرما) |
| Dependencies | `Design-Decisions-v1.md` |
| Product evidence | `PRD §۲، §۴، §۵، §۶، §۹، §۱۰، §۱۳، §۲۱، §۲۳`؛ صرفاً بررسی ایستای کد، نه تضمین عملکرد زنده |

## State machine
`landing → hook → context → choose-services → money-interaction → expense → insight/result → product-bridge → activation`؛ ترتیب در scenario config اعلام می‌شود. در نمونه کافی‌نت ۷ Story تعریف شده‌اند؛ صفحه فرود می‌تواند همزمان Story اول باشد و نباید کاربر را مجبور به کلیک اضافی کند.

## Transitions
`NEXT`: فقط وقتی step معتبر، `pending=false` و Guard برقرار است؛ `BACK`: به مرحله قبلی با داده ذخیره‌شده؛ `JUMP`: فقط قبلاً بازدیدشده و guard برقرار؛ `RESET`: تأیید + پاکسازی session؛ `EXIT`: حفظ یا حذف انتخابی session؛ `RESUME`: اعتبارسنجی نسخه template و state.

## Source of truth
برای inputها، session store؛ برای calculated values، pure calculators؛ برای chart، result model. ذخیره محاسبه‌ها در session بدون version یا به‌روزرسانی خطرناک است؛ ترجیحاً نتایج هنگام نمایش از inputها محاسبه شوند.

## Error model
`invalid_input`, `scenario_version_changed`, `session_expired`, `offline`, `auth_callback_failed`, `calculation_failed`; هرکدام copy فارسی، retry یا reset واضح داشته باشند.

## Edge cases
- کاربر از نتیجه برمی‌گردد، مبلغ را تغییر می‌دهد؛ تمام نمودارها دوباره از همان ورودی محاسبه شوند.
- تغییر نوع خدمت به خدمات بدون وجه عبوری، مقدار قبلی عبوری را پاک یا غیرفعال و دلیل را مشخص کند.
- تکرار tap و swipe همزمان نباید دو بار NEXT را اجرا کند.
- Direct URL روی /result بدون Session: ورود به نمونه جدید، نه گزارش ساختگی.

## معیارهای پذیرش این سند
- قواعد قابل اجرا، قابل آزمون و برای همه تمپلیت‌ها سازگار باشند.
- ادعای قابلیت موجود از پیشنهاد توسعه یا داده نمایشی تفکیک شود.
- RTL، واحد پول، حریم خصوصی و دسترس‌پذیری در خروجی رعایت شوند.

## وضعیت تصمیم
- **Approved:** تنها شش تصمیم DD-01 تا DD-06 در سند مادر.
- **Proposed:** جزئیات این سند برای پیاده‌سازی نمونه اول.
- **Needs Validation:** اثربخشی واقعی در کسب‌وکارهای هدف، پس از تست کاربری.
