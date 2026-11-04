# Story Player Component Contract

| Metadata | Value |
|---|---|
| ID | `HCD-COMP-STORY` |
| Version / date | v1.0 / 2026-11-04 |
| Status | Proposed (مگر شش تصمیم مصوب کارفرما) |
| Dependencies | `Design-Decisions-v1.md` |
| Product evidence | `PRD §۲، §۴، §۵، §۶، §۹، §۱۰، §۱۳، §۲۱، §۲۳`؛ صرفاً بررسی ایستای کد، نه تضمین عملکرد زنده |

## API پیشنهادی
Props: `stories: StoryDefinition[]`, `activeStoryId: string`, `themeId`, `sessionState`, `canGoNext`, `busy`, `onNext`, `onBack`, `onJumpVisited`, `onExit`. Events: `story_view`, `story_validation_failed`, `story_completed`, `story_exit`. StoryPlayer فقط UI و navigation را می‌شناسد و محاسبه مالی اجرا نمی‌کند.

## عناصر
segmented progress، brand/header، title، content slot، feedback slot، footer با CTA/Back. تمرکز عنوان بعد navigation. footer حین کیبورد قابل دسترس. dismiss خروج با تأیید در صورت داده ویرایش‌شده.

## Guardها
- swipe فقط با لمس آغازشده در ناحیه امن و افقی واضح؛ اسلایدر، نمودار، ورودی، لینک، modal یا scroll قابل gesture نیست.
- Next نیاز به `valid && !pending` دارد؛ back بدون validate.
- Progress فقط بازدیدهای قبلی را باز می‌کند؛ skip جلو در MVP غیرفعال.
- Auto-advance غیرفعال.

## حالات آزمون
اول/آخر، برگشت، rapid taps، gesture در slider، کلیک روی نمودار، تاریخچه مرورگر، refresh، portrait/landscape، reduced motion و عدم تمرکز خارج از modal.

## معیارهای پذیرش این سند
- قواعد قابل اجرا، قابل آزمون و برای همه تمپلیت‌ها سازگار باشند.
- ادعای قابلیت موجود از پیشنهاد توسعه یا داده نمایشی تفکیک شود.
- RTL، واحد پول، حریم خصوصی و دسترس‌پذیری در خروجی رعایت شوند.

## وضعیت تصمیم
- **Approved:** تنها شش تصمیم DD-01 تا DD-06 در سند مادر.
- **Proposed:** جزئیات این سند برای پیاده‌سازی نمونه اول.
- **Needs Validation:** اثربخشی واقعی در کسب‌وکارهای هدف، پس از تست کاربری.
