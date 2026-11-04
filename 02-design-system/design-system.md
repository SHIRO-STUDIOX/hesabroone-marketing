# Hesabro Campaigns — Design System v1

| فیلد | مقدار |
|---|---|
| ID | HCD-DS-001 |
| Version | 1.0 |
| Status | **Proposed design specification** با ارجاع به تصمیم‌های مصوب؛ اعداد توکن و پالت‌ها آزمایشی‌اند |
| Owner | UI / Design Systems |
| Last updated | 2026-11-04 |
| Depends on | `../Design-Decisions-v1.md`, `../01-foundation/ux-strategy.md`, `../01-foundation/story-experience-rules.md` |
| PRD references | حسابرو وان §۲۱، §۲۲ و شکاف‌های §۲۳ |
| Supersedes | — |

## 1. Purpose & principles

**یک سیستم UI و UX مشترک، چند شخصیت بصری صنفی.** هدف: هر تمپلیت با تم، تصویرسازی و Business Artifact اختصاصی ساخته شود، ولی typography، spacing، component states، Story navigation، behavior، chart semantics و accessibility در همه ثابت بمانند.

**Approved:** شخصیت حرفه‌ای + بازی‌وار، Story fullscreen موبایل / centered card دسکتاپ، ناوبری دکمه و لمسِ امن، هوک چالشی و متن دوستانه، تبدیل تا اولین عملیات واقعی، تمایز صنفی از طریق رنگ/illustration/artifact.

**Proposed:** انتخاب مقیاس توکن‌ها، کدهای پالت، motion timing، set کامپوننت‌ها و chart primitives؛ همه باید روی اولین نمونه کافی‌نت بررسی شوند.

**نه در دامنه:** بازطراحی UI حسابرو وان، تضمین وجود shadcn-vue در محصول فعلی، انتشار SDK مستقل در v1، شبیه‌سازی پیچیده غیرقابل آزمون یا نمودار بدون مبنای محاسباتی.

## 2. Technology direction — candidate

- UI: **Vue + TypeScript + Tailwind + shadcn-vue** برای کمپین مستقل (انتخاب پیشنهادی تیم).
- Data viz: **Unovis** در wrapperهای اختصاصی؛ chartهای ساده مثل split bar می‌توانند با HTML/CSS و متن دسترس‌پذیر اجرا شوند.
- Story Player، Financial Receipt، Money Split، Result Reveal و Artifact Card کامپوننت‌های اختصاصی تجربه حسابرو هستند.
- قبل از پیاده‌سازی فنی: نسخه‌های library، سازگاری Tailwind، RTL، SSR در صورت کاربرد، رندر نمودار، portal و تداخل CSS بررسی شود. این مرحله **پیش‌نیاز طراحی سند نیست**.
- کامپوننت‌های کمپین نباید CSS سراسری محصول حسابرو را تغییر دهند. ترجیح با namespace/theme scope روی root تجربه است.

## 3. Token architecture — single source of truth

### Layers
1. **Primitive tokens:** raw colors، spacing، radius، typography، shadows، motion.
2. **Semantic tokens:** نقش بدون صنف مانند `--c-bg`, `--c-text`, `--c-primary`, `--c-on-primary`, `--c-border`, `--c-focus`, `--c-danger`.
3. **Industry theme tokens:** override فقط palette/illustration/artifact؛ بدون تغییر behavior.
4. **Component tokens:** از semanticها مشتق شوند؛ دکمه/کارت/ورودی نباید hex صنفی hard-code داشته باشد.

### پیشنهادی: نام‌های پایه

| Token | نقش | مثال مقادیر اولیه |
|---|---|---|
| `--c-primary` | CTA / emphasis صنفی | کافی‌نت `#176D78` |
| `--c-on-primary` | متن CTA | `#FFFFFF`، مشروط به کنتراست |
| `--c-bg` | صفحه | روشن، کم‌اشباع |
| `--c-surface` | کارت | سفید/سطح روشن |
| `--c-surface-alt` | سطح نمونه | مشتق از تم |
| `--c-text` | متن اصلی | تیره و خنثی |
| `--c-text-muted` | متن کم‌اهمیت | خاکستری خوانا |
| `--c-border` | خطوط | خنثی کم‌رنگ |
| `--c-focus` | outline فوکوس | واضح، مستقل از background |
| `--c-success` | موفقیت | ثابت معنایی، نه تابع صنف |
| `--c-warning` | هشدار | ثابت معنایی |
| `--c-danger` | خطا/زیان | ثابت معنایی |
| `--c-brand` | هویت حسابرو | `#49406d` |

### منبع برند — Source-backed از PRD §۲۱

- Primary `#49406d`
- Secondary `#b84279`
- Accent `#186d7a`
- Surface `#f3f0ff`

این مقادیر **رنگ‌های محصول اصلی** هستند؛ تم صنفی فقط نقش‌های متناسب با کمپین را تغییر می‌دهد. لوگو نباید از نظر رنگ/شکل تغییر غیرمجاز کند.

## 4. Industry themes — proposed candidates

| Industry | Main | Soft background | Dark ink candidate | Business Artifact | Feeling/intent |
|---|---|---|---|---|---|
| `cafenet` | `#176D78` | `#E7F4F3` | `#103D47` | رسید خدمات/تسویه | تکنولوژیک، روشن، دقیق |
| `real-estate` | `#735338` | `#F6F0E8` | `#392B21` | برگه تسویه کمیسیون | اعتماد، قرارداد، ارزش |
| `construction` | `#B25D2A` | `#FFF0E3` | `#60351E` | صورت‌وضعیت | عملیات و هزینه پروژه |
| `print-shop` | `#4D55AD` | `#EEEFFC` | `#292E69` | سفارش چاپ | دقت و سرعت |
| `maintenance` | `#416A52` | `#ECF4ED` | `#234331` | برگه سرویس | کنترل و اطمینان |

**همه کدها Proposed هستند.** رنگ پس‌زمینه/متن/CTA باید برای حالت روشن/تیره و Hover/Focus/Disabled با contrast verifier بررسی شود. اگر Primary صنف برای متن کوچک مناسب نبود، توکن on-primary/ink مستقل و قابل دسترس تعیین گردد؛ به جای تغییر موقتی Hex در component.

## 5. Typography and financial formatting

- فارسی RTL؛ در صورت دسترسی مجاز و لایسنس از فونت پروژه اصلی یا فونت وب مجاز استفاده شود؛ **فونت‌ها را از فایل PRD استخراج یا داخل بسته منتشر نکنید**.
- فونت محصول اصلی طبق PRD `IRANYekanXVF` است؛ کمپین باید با فونت مجاز، fallback فارسی و کمینه layout shift طراحی شود.
- مقیاس اولیه پیشنهادی: Caption 12–13px، Body 14–16px، Label 14px، Story Headline 24–30px موبایل، Report Value 24–36px؛ روی دستگاه تست شود.
- line-height متن فارسی 1.55–1.8؛ تیتر 1.25–1.45؛ متن‌های مالی از overwrap یا truncation گمراه‌کننده مصون باشند.
- دکمه اصلی با متن فعلی و مشخص؛ در یک viewport در حالت عادی یک Primary CTA غالب باشد.
- واحد پول **حتماً نمایش داده شود**. UI کمپین ممکن است تومان باشد، اما PRD واحد غالب اپ را ریال می‌داند. Value serialization باید `unit` و تبدیل صریح داشته باشد.
- فرمت عدد با جداکننده هزارگان و اعداد مناسب محیط فارسی؛ در ورودی عددی و screen reader، برچسب کامل «تومان» خوانده شود.
- مقدار منفی یا مانده بدهکار/بستانکار فقط با علامت رنگ نمایش داده نشود؛ کلمه/نشانه و تعریف محاسبه نیز لازم است.

## 6. Spacing, radius, elevation (candidates)

| محور | مقیاس پیشنهادی |
|---|---|
| spacing | مضارب 4px: 4, 8, 12, 16, 20, 24, 32, 40 |
| content max width desktop | Story Card حدود 420–520px برای سناریوی کوتاه؛ گزارش پیچیده adaptive |
| radius | 12px کنترل، 16px کارت، 24px Story container |
| touch targets | حداقل 44×44px برای اهداف لمسی اصلی؛ مطابق تست دسترس‌پذیری |
| surfaces | ۱ سطح اصلی، ۱ سطح elevated و ۱ سطح sample؛ اجتناب از کارت داخل کارت بی‌مورد |
| elevation | سایه ظریف، نه glow/blur سنگین روی متن مالی |

این مقادیر عددی **مصوب نیستند**؛ در فایل‌های Tokens پس از آزمون نمونه قابل نهایی‌سازی‌اند.

## 7. Layout templates

### Mobile fullscreen — Approved pattern
- بالا: segmented progress + header کوتاه؛ برای Storyها consistent.
- میانه: `StoryContent`, اول title+helper سپس artifact یا form و live feedback.
- پایین: قبلی + CTA اصلی در safe area؛ اگر محتوا بلند است، اسکرول امن با footer مستقل.
- ناحیه خاص gesture خارج از ورودی/نمودار؛ از روی «کل صفحه لمس کن» پرهیز شود.
- برای 360px طراحی واقعی، و keyboard open، screen zoom و فونت بزرگ‌تر را تست کنید.

### Desktop centered card — Approved pattern
- کارت مرکزی با background tint ملایم؛ همان ترتیب content.
- نمودار و گزارش پرجزئیات فقط با فضای مجاز بازشونده/اسکرول، نه کاهش فونت تا حد ناخوانا.
- تمام تعامل‌ها باید با ماوس و کیبورد انجام‌پذیر باشند؛ swipe فقط راه مکمل است.

### Story composition
`progress → header → headline → single main interaction/artifact → feedback → action footer`.

## 8. Shared component inventory

| Component | وظیفه | States ضروری | نکته |
|---|---|---|---|
| `StoryShell` | زمینه و ناحیه محتوا | default, overflow | mobile/dsktp |
| `StoryProgress` | مرحله جاری | visited/current/locked | متن مرحله برای a11y |
| `StoryNavigation` | next/back/exit | disabled, busy, error | gesture safe guards |
| `CampaignHero` | hook | content, image failure | حداکثر یک CTA |
| `ArtifactCard` | رسید/قرارداد/صورت‌وضعیت | sample, detail, empty | سبک قابل تم |
| `ChoiceCards` | انتخاب خدمات | selected, invalid, disabled | چندانتخاب |
| `AmountInput` | مقدار پول | empty, valid, invalid, focused | تومان و توضیح |
| `MoneySplit` | تفکیک کل/اجزا | editing, mismatch, valid | مدل demo ≠ accounting entry |
| `ExpensePicker` | انتخاب هزینه | empty, multiple, invalid | دوره زمانی یکسان |
| `InsightCard` | نتیجه توضیحی | ready, changed, error | دلیل تغییر را نشان دهد |
| `HesabroChart` | نمودار قابل فهم | loading, empty, error, ready | textual equivalent |
| `ResultSummary` | KPI و خروجی | partial, complete | provenance و unit |
| `ProductBridge` | اتصال مفهوم به محصول | demo/real labels | ویژگی موجود در PRD |
| `ActivationCTA` | دعوت ثبت‌نام | idle, loading, fail | موفقیت واقعی فقط با پاسخ سرویس |

کامپوننت‌هایی که با اصطلاح‌های مالی کار می‌کنند باید design review و مرور صحت مالی داشته باشند.

## 9. Forms and interaction patterns

- «یک تصمیم اصلی در هر Story»، ولی یک فرم می‌تواند چند فیلد وابسته داشته باشد اگر برای فهم واحد یک عمل لازم‌اند.
- Numeric field همیشه editable و accessible؛ slider اختیاری برای آزمایش دامنه، نه جایگزین ضروری تایپ عدد.
- Helper text توضیح دهد عدد متعلق به «دریافتی»، «درآمد»، «هزینه» یا «مازاد» است.
- Validations inline و نزدیک فیلد؛ empty/invalid/zero تفکیک شوند.
- تغییر ورودی فوراً Insight را به‌روز کند؛ منبع محاسبه از کامپوننت UI جدا باشد.
- هیچ فیلد مهمی فقط در placeholder نام‌گذاری نشود؛ label دائمی داشته باشد.
- رنگ/انیمیشن به‌تنهایی موفقیت و خطا را اعلام نکنند؛ پیام و آیکون/متن هم لازم است.
- هر ورودی `aria-describedby` یا رابطه توضیح مناسب داشته باشد؛ Focus order RTL آزموده شود.

## 10. Charts and data visualization

### 10.1 Chart selection principles

| مسئله | پیشنهاد | عدم استفاده / هشدار |
|---|---|---|
| اجزای یک دریافتی | stacked proportional bar + مبلغ/برچسب | Pie بدون عدد و نام سهم |
| درآمد در برابر هزینه **هم‌دوره** | Bar chart + رقم مستقیم | مقایسه روزانه با هزینه ماهانه |
| تغییر هزینه در مراحل پروژه | Line/Step + واحد و مبنا | نمایش trend از داده غیرزمانی به‌عنوان تاریخچه واقعی |
| گردش حساب | فهرست رویداد/جدول + جمع | نمودار تزئینی بدون تطابق با تراکنش |
| ۱–۲ KPI مهم | number cards + explanation | نمودار بی‌مورد برای یک عدد |

### 10.2 Required chart contract

هر نمودار باید این‌ها را اعلام کند: `metricId`, `definition`, `unit`, `period`, `dataProvenance = demo|userInput|real`, `formulaRef`, `emptyState`, `negative/zero behavior`, `accessibilitySummary`.

- محور و labels و legend خوانا؛ نمودار موبایل با برچسب مستقیم در اولویت.
- تمام Tooltipهای مهم به صورت قابل لمس/کیبورد و دارای equivalent متنی باشند.
- مقیاس محور برای جلوگیری از اغراق کنترل شود؛ stack parts باید با total منطبق باشند.
- «گزارش واقعی حسابرو» فقط با داده واقعی تأییدشده؛ شبیه‌سازی «گزارش آموزشی» نامیده شود.
- نمودار باید به تغییر input زنده پاسخ بدهد و ارزش صفر/منفی را درست نشان دهد.

### 10.3 UI motion in charts

برای استوری‌های عددی، transition آرام و کوتاه، اما **بدون شمارش اغراق‌آمیز** اعداد. reduced motion باید بدون animation کار کند. جهت motion در RTL و تغییر داده تست شود.

## 11. Motion language — proposed

- روایت حرفه‌ای: fade/slide کوتاه به‌جای انیمیشن‌های پرشی و جشن‌های مکرر.
- زمان نمونه 160–280ms؛ فقط پیشنهادی و نیازمند تست performance.
- ورود نتیجه: subtle highlight/shape transition؛ عدم تغییر بدون اجازه در Story بعدی.
- هیچ انیمیشن نباید جلوی خواندن عدد یا استفاده از کنترل را بگیرد؛ `prefers-reduced-motion` رعایت شود.
- اگر کاربر درحال ورود عدد است، با animation layout جابه‌جا نشود.

## 12. Accessibility and localization

- حداقل کنتراست متن معمول 4.5:1 و متن بزرگ 3:1 به‌عنوان معیار اولیه WCAG AA؛ اجزای غیرمتنی معنادار 3:1 در موارد لازم. همه پالت‌ها باید جدا تست شوند.
- کیبورد، focus-visible، label، error message، reading order و screen reader ضروری‌اند.
- ناوبری بدون gesture ممکن باشد؛ progress bar و نمودار equivalent متنی داشته باشند.
- RTL: متن فارسی راست‌چین؛ رشته‌هایی مثل URL/شناسه با isolate جهت مناسب؛ نمودارها آزمون جهت و شماره محور داشته باشند.
- حالت نمایش تاریک اگر اضافه شد، توکن مستقل dark نیاز دارد؛ وارونه‌کردن ساده hex کافی نیست.

## 13. Governance: what is allowed to vary

| لایه | ثابت | متغیر صنفی |
|---|---|---|
| Story Player | Progress، navigation، focus، Back/Refresh | تعداد و ترتیب Story با شروط معتبر |
| Component API | props/states/validation/spacing | عنوان، گزینه‌ها، داده اولیه |
| Color semantics | نقش‌ها و حالت خطا/موفقیت | primary، surface tint، accent |
| Typography | scale و hierarchy | Copy متناسب با صنف |
| Illustration | سبک کلی و کیفیت | artifact، آیکون/تصویرسازی صنفی |
| Data viz | تعریف KPI، chart accessibility | metric و dataset معتبر |
| Conversion | اصل نمایش ارزش پیش از شماره | پیام و منفعت ویژه صنف |

**اگر برای یک صنف لازم شد رفتار کنترل اصلی تغییر کند، ابتدا پیشنهاد تغییر Design System ثبت شود**؛ کپی‌کردن کامپوننت و تغییر ناوبری ممنوع است مگر مورد استثنای مستند.

## 14. Definition of done — design system

- [ ] Story موبایل fullscreen و دسکتاپ centered card با یک مجموعه اجزا قابل پیاده‌سازی باشد.
- [ ] تم کافی‌نت بدون hard-code کردن رنگ در Storyهای مشترک اعمال شود.
- [ ] states و keyboard/touch در تمامی componentها تعریف شده باشد.
- [ ] `MoneySplit` ارقام و توضیحی یکسان با engine محاسبه نشان دهد.
- [ ] chart با screen reader equivalent متنی و برچسب نمونه/واقعی خوانا باشد.
- [ ] پالت با تست کنتراست، focus و دستگاه موبایل اعتبارسنجی شود.
- [ ] اصطلاحات درآمد، دریافت، هزینه، مازاد و سود در UI به‌طور صحیح تفکیک شوند.
- [ ] بازخوردهای فرم پس از Refresh و Back ثابت بمانند.
- [ ] در تمپلیت دوم، typography/nav/forms/charts از نو پیاده‌سازی نشوند.

## 15. Open decisions / next deliverables

- نهایی‌کردن semantic tokens JSON، themeهای واقعی، font licensing/fallback و dark palette.
- مشخصات دقیق Component API برای Story Player، MoneySplit و financial charts.
- آزمون پالت کافی‌نت روی 360px، focus، screen reader، keyboard و gesture.
- نهایی‌کردن نحوه نمایش نمودار در mobile viewport کوتاه و large text.
- طراحی mockupهای کافی‌نت و بعد از آن Freeze Design System v1.

## 16. Change log

- v1.0 — تعریف Design Language و چارچوب توکن، تم‌ها، کامپوننت‌ها و نمودارها برای کمپین صنفی.
