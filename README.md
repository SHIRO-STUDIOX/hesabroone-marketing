# Hesabro Campaign Design — Complete Pre-development Package v1

**Date:** 2026-11-04 | **Status:** ready for building/testing *cafenet prototype*, not live release.

## Read first
`AGENTS.md` → `Design-Decisions-v1.md` → `MASTER-PRD.md` → `01-foundation/` → `02-design-system/` → `03-story-engine/` → `04-industries/cafenet/` → `05-landing-system/` → `06-data-visualization/` → `07-development/agent-development.md` → `08-agent-instructions/review-checklist.md`.

## Decision statuses
- **Approved:** فقط ۶ تصمیم صریح کارفرما در Design Decisions.
- **Source-backed:** امکانات طبق PRD و بررسی ایستای کد، نه ضمانت کارکرد زنده.
- **Proposed:** جزئیات UX/UI، تم‌ها، اسکریپت کافی‌نت و معماری.
- **Needs Validation:** اثرگذاری پیام، تم، تعداد استوری، فهم مخاطب و نرخ تبدیل.
- **Blocked:** اتصال واقعی Auth/Business/Finance، حسابداری وجوه عبوری و ادعای سود خالص/مالیات قطعی.

## Single sources of truth
- UX و اصول: `Design-Decisions-v1.md`, `01-foundation/*`
- Tokens: `02-design-system/tokens/*.json`, `themes/*.json`
- Schema: `03-story-engine/scenario-schema.json`
- Copy and scenario: `04-industries/cafenet/landing-content.md`, `story-script.md`, `scenario.config.json`
- Math: `04-industries/cafenet/interactions.md`, `06-data-visualization/financial-metrics.md`
- Agent: `07-development/agent-development.md`

## Scope
۷ استوری کافی‌نت، از Hook تا Result و Activation Mock؛ همه اعداد دمو و عملیات نمایشی. تم و Brief برای ۴ صنعت دیگر موجود است، ولی سناریوی کامل آن‌ها **بعد از اعتبارسنجی کافی‌نت** نوشته می‌شود.

## Installing
کل پوشه `campaign-design/` را در روت پروژه قرار دهید. PRD محصول در فایل جداگانه `HESABRO_ONE_PRODUCT_PRD(1).md` ارائه شده و در این ZIP کپی نشده است. برای agentهای root-only یک ارجاع به `campaign-design/AGENTS.md` در AGENTS روت اضافه کنید.
