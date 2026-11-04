# Cafenet Interaction & Calculation Contract

| Metadata | Value |
|---|---|
| ID | `HCD-CF-INPUT` |
| Version / date | v1.0 / 2026-11-04 |
| Status | Proposed (مگر شش تصمیم مصوب کارفرما) |
| Dependencies | `Design-Decisions-v1.md` |
| Product evidence | `PRD §۲، §۴، §۵، §۶، §۹، §۱۰، §۱۳، §۲۱، §۲۳`؛ صرفاً بررسی ایستای کد، نه تضمین عملکرد زنده |

## ۱. Data model (همه ارقام به تومان صحیح)
`selectedServices: ServiceId[]`, `serviceType: 'standard'|'agency'`, `totalReceivedToman: int`, `serviceFeeToman: int`, `passThroughToman: derived int`, `expenses: {id, category, amountToman, allocationScope}[]`.

## ۲. Data defaults — آموزشی
- `agency`: total=300000, fee=80000, passThrough=220000.
- `standard`: total=100000, fee=100000, passThrough=0.
- هزینه مرتبط با همین مثال: 25000 (اگر کاربر آن را تأیید کند). هیچ نسبت واقعی سود/تعرفه صنفی از این اعداد استنباط نشود.

## ۳. Validation
| Field | Rule | Error |
|---|---|---|
| selectedServices | ≥۱ و از allowlist | «حداقل یک خدمت انتخاب کن.» |
| totalReceivedToman | عدد صحیح، ۰ تا ۱۰٬۰۰۰٬۰۰۰ برای دمو | «مبلغ معتبر وارد کن.» |
| serviceFeeToman | ۰ ≤ fee ≤ total | «حق‌الزحمه از دریافتی بیشتر نمی‌شه.» |
| expenses[].amountToman | عدد صحیح ≥۰، سقف دمو ۱۰٬۰۰۰٬۰۰۰ | «هزینه نمی‌تونه منفی باشه.» |
| passThrough | فقط مشتق‌شده در `agency` | خطای تقسیم مبلغ در نامساوی مجموع |

## ۴. Pure calculation
`passThrough = agency ? totalReceived - serviceFee : 0`؛ `recognizedFeeForIllustration = agency ? serviceFee : totalReceived`؛ `relatedExpenses = Σ(expense amounts in same scenario period)`؛ `illustrativeSurplus = recognizedFeeForIllustration - relatedExpenses`.

**قید مهم:** این منطق صرفاً **آموزشی** و بر مبنای فرض رابطه نمایندگی است؛ درباره درآمد مالیاتی، سود واقعی یا طبقه‌بندی قانونی همه کافی‌نت‌ها حکم نمی‌دهد. در حالت standard مقدار `serviceFee` برابر `totalReceived` و کاربر از سناریوی عبوری خارج می‌شود.

## ۵. UX form behaviors
- وقتی کاربر total را کمتر از fee کند، به‌جای clamp پنهانی، inline error یا پیشنهاد «تنظیم حق‌الزحمه برابر کل دریافتی» نمایش داده شود.
- کاربر ارقام فارسی و لاتین را وارد کند؛ commas حذف و مقدار normalize شود.
- فیلدهای ناتمام (`''`) با صفر واقعی اشتباه گرفته نشوند؛ result نیاز به valid state دارد.
- تغییر خدمت standard/agency موجب reset ایمن داده وابسته همراه توضیح شود.
- دکمه next روی pending یا invalid غیرفعال + توضیح؛ Back همیشه آزاد.
- نتایج منفی مجاز و با عنوان «مازاد منفی بر اساس هزینه‌های انتخابی» نشان داده شوند؛ نه الزاماً زیان کسب‌وکار.

## ۶. Test vectors
| Input | Expected |
|---|---|
| agency, total 300000, fee 80000, expenses 25000 | passThrough 220000, surplus 55000 |
| agency, total 300000, fee 300000, expenses 0 | passThrough 0, surplus 300000 |
| standard, total 100000, expenses 25000 | passThrough 0, surplus 75000 |
| agency, total 100000, fee 120000 | invalid; no result |
| agency, total 50000, fee 10000, expenses 80000 | passThrough 40000, surplus -70000 |

## معیارهای پذیرش این سند
- قواعد قابل اجرا، قابل آزمون و برای همه تمپلیت‌ها سازگار باشند.
- ادعای قابلیت موجود از پیشنهاد توسعه یا داده نمایشی تفکیک شود.
- RTL، واحد پول، حریم خصوصی و دسترس‌پذیری در خروجی رعایت شوند.

## وضعیت تصمیم
- **Approved:** تنها شش تصمیم DD-01 تا DD-06 در سند مادر.
- **Proposed:** جزئیات این سند برای پیاده‌سازی نمونه اول.
- **Needs Validation:** اثربخشی واقعی در کسب‌وکارهای هدف، پس از تست کاربری.
