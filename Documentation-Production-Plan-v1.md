# حسابرو وان — Documentation Production Plan v1

**شناسه:** HCD-PLAN-001  
**وابستگی پایه:** `Design-Decisions-v1.md` و `HESABRO_ONE_PRODUCT_PRD(1).md`  
**هدف:** تولید مستندات طراحی و راهنمای ایجنت به‌شکل قابل ممیزی، بدون پرکردن حدسی تصمیم‌های باز.

## ۱. معیار موفقیت برنامه

در پایان، ایجنت باید بتواند **بدون بازاختراع معماری UX** یک تمپلیت دوم (املاک) از سیستم مشترک بسازد و بداند کدام UX، کدام محاسبات و کدام خدمات محصول واقعی‌اند. خروجی این برنامه **مستندات** است، نه کد عملیاتی.

## ۲. قواعد تولید برای تمام فایل‌ها

هر سند دارای این سربرگ باشد: `ID`, `Version`, `Status`, `Owner`, `Last updated`, `Depends on`, `PRD references`, `Supersedes`. بدنه: `Purpose`, `Scope/Non-goals`, `Approved decisions`, `Proposals`, `Specifications`, `States & Edge cases`, `Industry example`, `Acceptance criteria`, `Open questions`, `Change log`.

- منبع PRD باید با شماره بخش یا سطر/تیتر ارجاع شود؛ ادعای عملکرد زنده از بررسی ایستای کد استخراج نشود.
- اصطلاحات مشترک: **Story**، **Scenario**، **Template**، **Insight**، **Activation**، **Business Artifact**، **Demo Session**. در Glossary تعریف شوند.
- اطلاعات تصمیم مصوب، پیشنهاد طراحی، فرضیه نیازمند آزمون و وابستگی فنی به‌طور صریح با Status جدا شوند.
- هر فایل یک مالک معنایی داشته باشد؛ مقادیر رنگ، فرمول و متن‌ها را در چند فایل تکرار نکنیم؛ ارجاع دهیم.
- محتوای فارسی با قواعد نوشتار، جهت RTL، واحد تومان/ریال و نمونه‌بودن ارقام سازگار باشد.
- هر Milestone فقط وقتی کامل است که لینک‌ها/وابستگی‌های مستندات، معیار پذیرش و موارد باز کنترل شده باشند.

## ۳. فهرست اسناد و ترتیب وابستگی

| کد | مسیر | هدف / مالک حقیقت | وابستگی | اولویت |
|---|---|---|---|---|
| F00 | `README.md` | نقشه راه خواندن و اصطلاحات کلیدی | — | P0 |
| F01 | `AGENTS.md` | ترتیب مطالعه، محدوده اختیار، منع فرض‌سازی | F00, DD | P0 |
| F02 | `MASTER-PRD.md` | هدف کمپین، قیف و دامنه غیرهدف | PRD, DD | P0 |
| F03 | `01-foundation/ux-strategy.md` | Journey و Aha Momentهای مشترک | F02 | P0 |
| F04 | `01-foundation/story-experience-rules.md` | قواعد حرکت، فرم، back و refresh | F03 | P0 |
| F05 | `01-foundation/design-principles.md` | هویت حرفه‌ای/بازی‌وار | DD | P0 |
| F06 | `01-foundation/responsive-guidelines.md` | موبایل fullscreen / دسکتاپ centered | F04 | P0 |
| F07 | `01-foundation/accessibility-guidelines.md` | Focus، کیبورد، کنتراست، motion | F04, F06 | P0 |
| F08 | `02-design-system/design-system.md` | قواعد اجزای مشترک | F05-F07 | P0 |
| F09 | `02-design-system/tokens/global.tokens.json` | اندازه، spacing، typography، radius | F08 | P0 |
| F10 | `02-design-system/tokens/semantic.tokens.json` | نقش‌های رنگی بدون وابستگی صنفی | F08, F09 | P0 |
| F11 | `02-design-system/themes/base.theme.json` | پایه برند مشترک | F10, PRD | P0 |
| F12 | `02-design-system/themes/cafenet.theme.json` | تم پیشنهادی کافی‌نت | F10, F11 | P0 |
| F13 | `02-design-system/components/story-player.md` | shell، progress و gestures | F04, F08 | P0 |
| F14 | `02-design-system/components/forms.md` | ورودی‌ها، خطاها، حالت‌ها | F07, F08 | P0 |
| F15 | `02-design-system/components/charts.md` | Chart UX و نمودار قابل لمس | F08, F10 | P0 |
| F16 | `03-story-engine/story-types.md` | Hook/Action/Insight/Product/Activation | F03, F04 | P0 |
| F17 | `03-story-engine/story-architecture.md` | ترتیب و شروط رفتن به Story بعد | F16, F13 | P0 |
| F18 | `03-story-engine/scenario-schema.json` | قرارداد داده محتوایی سناریو | F17 | P0 |
| F19 | `03-story-engine/session-state.md` | وضعیت دمو، ذخیره و برگشت | F17, PRD | P0 |
| F20 | `04-industries/_industry-template/*` | الگوی یکسان محتوای صنفی | F03, F18 | P0 |
| F21 | `04-industries/cafenet/persona.md` | پرسونا و شرایط کاری | F20 | P0 |
| F22 | `04-industries/cafenet/pain-points.md` | مسئله‌ها و اعتبار فرضیات | F21 | P0 |
| F23 | `04-industries/cafenet/landing-content.md` | متن قطعی پیشنهادی تمامی استوری‌ها | F22, F16 | P0 |
| F24 | `04-industries/cafenet/story-script.md` | Story-by-story با action و back states | F23, F18 | P0 |
| F25 | `04-industries/cafenet/interactions.md` | فرم‌ها، شروط، داده نمونه و محاسبات | F24, PRD | P0 |
| F26 | `04-industries/cafenet/result-experience.md` | نام KPI و مفروضات نتیجه | F25, F15 | P0 |
| F27 | `05-landing-system/landing-layouts.md` | چیدمان موبایل و دسکتاپ | F06, F23 | P0 |
| F28 | `05-landing-system/conversion-flow.md` | OTP تا اولین عملیات واقعی | F19, PRD | P0 |
| F29 | `06-data-visualization/financial-metrics.md` | تعریف معیار و مبنای محاسبه | F25, PRD | P0 |
| F30 | `06-data-visualization/chart-guidelines.md` | انتخاب نمودار و حالت‌های آن | F15, F29 | P0 |
| F31 | `07-development/shadcn-vue-guidelines.md` | ارزیابی سازگاری و Wrapperها | F08, مخزن واقعی | P1 |
| F32 | `07-development/component-architecture.md` | API سطح کامپوننت‌ها و اتصال تم | F13-F15, F18 | P1 |
| F33 | `07-development/integration-with-hesabro.md` | مرز دمو/بیزینس و Adapter | F19, F28, PRD | P1 |
| F34 | `08-agent-instructions/agent-workflow.md` | SOP کار ایجنت و گزارش تغییرات | تمام فایل‌های P0 | P1 |
| F35 | `08-agent-instructions/review-checklist.md` | ممیزی محتوا، UX، مالی و فنی | تمام فایل‌های P0 | P1 |
| F36 | `04-industries/real-estate/*` | آزمون واقعی تمپلیت دوم | F20, F31-F35 | P2 |

فایل‌های تکمیلی (motion، typography، spacing، button، receipt، component.tokens، UX محتوا، FAQ، A/B، assets و تم‌های دیگر) پس از تثبیت P0 تولید شوند. پوشه خالی/placeholder نباید به‌عنوان سند کامل گزارش شود.

## ۴. بسته‌های تولید و تحویل

### Package 0 — کنترل منابع و تصمیم‌ها
**ورودی:** PRD و شش تصمیم مصوب.  
**خروجی:** `Design-Decisions-v1.md`, `README.md`, `AGENTS.md`, `MASTER-PRD.md`.  
**دروازه:** ادعاهای محصول با PRD مطابقت داشته باشند؛ وضعیت هر تصمیم روشن باشد؛ فرضیه تبدیل به الزام نشده باشد.

### Package 1 — UX مشترک و Story Engine
**اسناد:** F03-F07 و F13، F16-F19.  
**خروجی ملموس:** Journey map، state diagram، ۶ نوع Story، کنترل ناوبری موبایل/دسکتاپ، نگاشت edge cases و schema نمونه.  
**دروازه:** مشخص باشد tapping/swiping چه زمانی ممنوع است، فرم چگونه اعتبارسنجی می‌شود، Refresh/Back چه نتیجه‌ای دارد و CTA کجا ظاهر می‌شود.

### Package 2 — Visual Design System
**اسناد:** F08-F12 و F14-F15، F27.  
**خروجی ملموس:** Tokens، تم پایه و کافی‌نت، نمونه کارت Story، فرم عددی، نمودار، result، نمایش حالت Error/Loading/Empty و چیدمان ۳۶۰ و دسکتاپ.  
**دروازه:** UI بدون hard-code رنگ صنف در کامپوننت مشترک بازتولید شود؛ کنتراست و RTL تست شوند؛ فاصله و فونت مشترک باشد.

### Package 3 — مرجع کامل کافی‌نت
**اسناد:** F20-F26 و F29-F30.  
**خروجی ملموس:** Persona، Pain points، Copy Deck، Scenario storyboard، جدول فیلد/اعتبارسنجی/محاسبه، Result definition و داده‌های نمونه.  
**دروازه:** برای هر Story یک هدف، CTA، interaction، states، متن دقیق و دلیل وجود آن موجود باشد؛ هیچ رقم نمونه‌ای به‌عنوان واقعیت مالی مشتری مطرح نشود.

### Package 4 — Activation و اتصال به محصول
**اسناد:** F28، F31-F33.  
**خروجی ملموس:** پس از CTA چه می‌شود، وضعیت احراز هویت، ساخت Business/Tenant، اولین ثبت واقعی، مرز demo data، API gap list.  
**دروازه:** هیچ مسیر جدیدی بدون ممیزی Router/Auth فعلی به‌عنوان موجود معرفی نشود؛ امن‌بودن انتقال و تفکیک نمونه/واقعی تصریح شود.

### Package 5 — Governance و تمپلیت دوم
**اسناد:** F34-F36.  
**خروجی ملموس:** SOP ایجنت، چک‌لیست بررسی و تمپلیت املاک با حداقل تغییر در UX مشترک.  
**دروازه:** املاک با theme+content+scenario تعریف شود و ضرورتی برای تکثیر StoryPlayer/فرم‌ها نداشته باشد؛ اگر داشت، دلیل شکست abstraction مستند شود.

## ۵. فرم دقیق یک Story — قالب اجباری برای F24

هر Story باید این فیلدها را داشته باشد:

- `storyId`, `type`, `goal`, `userQuestion`, `headline`, `bodyCopy`
- `visualArtifact`, `themeRole`, `componentId`, `dataSource=demo|userInput|real`
- `fields`: label, unit, default, min/max, keyboard, required, validation
- `calculationRef` (فقط ارجاع به محاسبه تست‌شده؛ نه فرمول آزاد از محتوا)
- `insightCopy`, `primaryCTA`, `secondaryCTA`, `exitRule`, `backRule`
- `states`: initial, interacting, valid, invalid, loading, error, empty, completed
- `events`, `accessibility`, `mobileNotes`, `desktopNotes`, `acceptanceCriteria`

## ۶. فرم دقیق یک کامپوننت مشترک — قالب اجباری برای F13-F15

Purpose، anatomy، props/slots، semantic tokens، keyboard و touch، responsive، focus order، loading/disabled/empty/error، validation، chart/number accessibility، نمونه کافی‌نت، edge cases، anti-patterns و acceptance tests.

## ۷. تقسیم مسئولیت ایجنت و انسان

| نقش | مسئولیت | اجازه تصمیم‌گیری |
|---|---|---|
| Product/Marketing | هدف تبدیل، هوک، وعده و پرسونا | تصویب نهایی پیام و KPI |
| UX Agent | Journey، استوری‌ها و حالت‌های تعامل | پیشنهاد؛ تغییر Approved ممنوع |
| UI Agent | توکن‌ها و کامپوننت‌های بصری | پیشنهاد palette؛ تأیید نهایی انسان |
| Financial Reviewer | نام KPI، منطق درآمد/وجوه عبوری، واحد پول | تأیید اجباری پیش از انتشار |
| Engineering Agent | تطبیق با Vue/Router/Auth/SDK واقعی | پیاده‌سازی تنها پس از بررسی کد |
| QA/Research | تست کاربر و ثبت شواهد | گزارش شواهد؛ عدم جایگزینی حدس با داده |

## ۸. تست‌های پیشنهادی و شواهد لازم

- **Walkthrough تخصصی:** ۱ سناریوی کافی‌نت بدون خلأ صفحه، فیلد و پیام.
- **تست فهم:** کاربران بتوانند تفاوت دریافتی، درآمد خدمات و هزینه را توضیح دهند.
- **تست استفاده:** ورودی مبلغ، Back، Reload، کیبورد، سوایپ در نواحی امن، سناریوی خطا و CTA روی موبایل واقعی.
- **تست رنگ:** تم کافی‌نت و پایه با کنتراست و Focus واضح.
- **تست مالی:** مجموع‌ها و واحدها تطبیق کنند؛ نتیجه «سود قطعی» نامیده نشود.
- **تست تبدیل:** eventهای landing تا first_real_transaction در صورت وجود زیرساخت قابل پیگیری باشند.
- **آزمون تعمیم:** تمپلیت دوم بدون تغییر سیستم ناوبری و کنترل‌های عمومی اجراپذیر باشد.

## ۹. وضعیت اجرا

**یادداشت وضعیت مورخ ۲۰۲۶/۱۱/۰۴:** این برنامه هنگام نسخه 1.0 نوشته شده است. اکنون README و AGENTS و سه سند `ux-strategy.md`، `story-experience-rules.md` و `design-system.md` به‌عنوان مشخصات پیشنهادی v1 اضافه شده‌اند. `MASTER-PRD.md` و سایر خروجی‌های فهرست همچنان تولید نشده‌اند؛ آماده‌بودن این سه سند به معنی تکمیل بسته‌های ۱ و ۲ یا اعتبارسنجی طراحی نیست. این برنامه تعهد اجرای خودکار در پس‌زمینه نیست.

## ۱۰. ترتیب پیشنهادی درخواست‌های بعدی از ایجنت

1. «از PRD و Design Decisions، سند MASTER-PRD و AGENTS را بساز، بدون اختراع قابلیت موجود.»
2. «UX Blueprint و Story Player States را با تمام edge caseها تهیه کن؛ هنوز UI نهایی نکش.»
3. «Semantic Tokens و نمونه UI کافی‌نت را بساز، با گزارش کنتراست.»
4. «سناریوی کافی‌نت را story-by-story، با متن نهایی و جدول رفتار فرم‌ها تهیه کن.»
5. «محاسبات و KPIها را با برچسب demo/real و تأیید مالی مستند کن.»
6. «مسیر Conversion تا اولین تراکنش واقعی را با PRD تطبیق و شکاف‌ها را فهرست کن.»
7. «برای املاک یک تمپلیت دوم تولید کن و میزان reuse و مشکلات طراحی را گزارش کن.»
