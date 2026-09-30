# Phase B · Screen Group 11 — Mobile Variants (Review Pass Spec)

Mobile behavior shipped with every group (each was designed and QA'd at
390/375/360). This group is therefore a dedicated audit-and-fix pass across
the whole surface, not a new build.

## A. Purpose
Verify every page of the prototype as a phone experience against the Design
Architecture's accessibility/trust bar and the locked QA breakpoints, fix
what fails, and record accepted deviations explicitly for founder review.

## B. Scope (14 pages)
Landing (`:8765`) · Command Center · Trading Workspace · Intelligence Home ·
Strategy Detail (both) · Permissions · Copy discovery · Provider (both) ·
Bots · Bot Health · Bot Setup · Portfolio Doctor · Capital · Security.

## C. Checks per page (automated where possible)
1. Horizontal overflow at 390 and 360 (page-level, excluding intentional
   in-container scrollers).
2. Console errors.
3. Input focus-zoom risk: form controls with font-size < 16px at ≤560.
4. Touch targets: interactive elements below 40px effective height flagged;
   primary controls (buttons, form fields, tab bars) raised to ≥44px on
   mobile; dense secondary chips allowed at ≥36px **as a recorded deviation**
   from the architecture's 44px line (WCAG 2.2 AA target-size 24px is met
   everywhere) — founder to confirm or tighten.
5. Fixed/sticky collisions with the mobile tab bar; FAB clearance.
6. Visual spot checks (screenshots) of representative screens.

## D. Deliverables
- Fixes committed for every failure of checks 1–3 and 5; global mobile
  touch-target CSS for check 4.
- `docs/qa/MOBILE_QA_REPORT.md`: page-by-page results, fixes applied,
  accepted deviations, open questions.

## E. Acceptance criteria
- Zero page-level horizontal overflow and zero console errors on all 14
  pages at 390 and 360.
- Zero form controls under 16px font on mobile.
- Primary interactive controls ≥44px on mobile; all remaining sub-44
  targets listed in the report with sizes and rationale.
- Report committed; no behavioral regressions on desktop (spot re-check).
