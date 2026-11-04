# Cafenet Result Experience

| Metadata | Value |
|---|---|
| ID | `HCD-CF-RESULT` |
| Version / date | v1.0 / 2026-11-04 |
| Status | Proposed (مگر شش تصمیم مصوب کارفرما) |
| Dependencies | `Design-Decisions-v1.md` |
| Product evidence | `PRD §۲، §۴، §۵، §۶، §۹، §۱۰، §۱۳، §۲۱، §۲۳`؛ صرفاً بررسی ایستای کد، نه تضمین عملکرد زنده |

## Output contract
Title: «گزارش یک خدمت نمونه». Time basis: **یک عملیات فرضی** (نه کل روز/ماه اگر فقط یک عملیات ثبت شده). Units: تومان. Values: `received`, `feeIncomeExample`, `passThroughIfApplicable`, `expensesIncluded`, `surplusIncluded`. هیچ KPI «سود خالص» نمایش داده نشود.

## چیدمان
(۱) تیتر و badge «بر اساس اطلاعات نمونه شما»، (۲) ۲ KPI دریافتی/حق‌الزحمه، (۳) split bar برای agency با مقدارها و legend، (۴) هزینه‌ها و مازاد، (۵) Disclosure «چطور حساب شد؟»، (۶) Product bridge صادقانه، (۷) CTA ساخت دفتر واقعی.

## Insight variants
- agency + passThrough >0: «بخشی از مبلغ دریافتی در این مثال متعلق به شخص ثالث است.»
- standard: «دریافتی این خدمت برابر مبلغ خدمات فرض شده؛ هزینه‌های کار را جدا ببین.»
- surplus <0: «هزینه‌های انتخاب‌شده از حق‌الزحمه بیشتر شده‌اند؛ بقیه هزینه‌ها در این مثال وارد نشده‌اند.»
- 0: «بر اساس همین داده‌های واردشده، مازاد صفر است.»

## محاسبه و شفافیت
از تابع واحد calculator استفاده شود؛ رقم‌ها در UI، insight، tooltip و export یکسان؛ حذف خطاهای گردکردن، fallback داده ناقص با نمایش error/try again نه عدد صفر ساختگی.

## CTA و ادامه
«دفتر واقعی کافی‌نت من رو بساز» → Phone/OTP → Business setup → First real income/expense. اگر اتصال واقعی در MVP موجود نیست، action باید به Stub یا mock صریح development ارجاع دهد و موفقیت جعلی نشان ندهد.

## Accessibility و Device
در موبایل split bar با متن، جدول تفصیلی با scroll ایمن، screenshot-friendly layout بدون حذف فرضیات، zoom 200٪ و reduced motion.

## معیارهای پذیرش این سند
- قواعد قابل اجرا، قابل آزمون و برای همه تمپلیت‌ها سازگار باشند.
- ادعای قابلیت موجود از پیشنهاد توسعه یا داده نمایشی تفکیک شود.
- RTL، واحد پول، حریم خصوصی و دسترس‌پذیری در خروجی رعایت شوند.

## وضعیت تصمیم
- **Approved:** تنها شش تصمیم DD-01 تا DD-06 در سند مادر.
- **Proposed:** جزئیات این سند برای پیاده‌سازی نمونه اول.
- **Needs Validation:** اثربخشی واقعی در کسب‌وکارهای هدف، پس از تست کاربری.
