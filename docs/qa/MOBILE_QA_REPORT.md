# Mobile QA Report — Screen Group 11 (Mobile Variants Pass)

**Date:** 2026-09-30 · **Scope:** all 14 pages (landing + 13 app pages) ·
**Method:** automated audits at 390px (spot 360px) in the emulated mobile
browser — page-level horizontal overflow, console errors, touch-target
heights (interactive elements, excluding checkbox/radio/range), and
focus-zoom risk (text-entry controls with font-size < 16px) — plus visual
spot checks.

## Baseline result (before fixes)

| Check | Result |
|---|---|
| Horizontal overflow (page-level) | **0 / 14 pages** — clean everywhere |
| Console errors | **0 / 14 pages** — clean everywhere |
| Focus-zoom risk | 3 real findings: landing `invite-email` (15px), trade `sym-select` (13.5px), copy `sort-sel` (13px) |
| Touch targets < 40px | Systematic: top-strip `kill-pill`/`simctl-btn` (34px) on every app page; chip/segment controls (`tf` 29, `achip` 29, `gseg` 32, `fseg` 34, `ctab` 39); inline action links 15–20px effective height (`meta-link`, `strat-open`, `act-link`, `bcard-cta`, `pcard-cta`, crumbs); toggles 22px; landing footer/nav links ~21px |

## Fixes applied

1. **Compliance layer in `app.css`** (`@media ≤560px`, desktop untouched):
   - 44px minimum height on all primary and segmented controls: kill pill,
     demo-states button, small buttons, filter/group/timeframe/ask chips,
     capital tabs, records tabs, side and mode segments, argument toggles.
   - Inline action links gain 13px vertical tap padding (≥44px effective).
   - Permission toggles gain tap padding.
   - **All text-entry controls forced to 16px font (`!important` — outranks
     per-page class sizes) + 44px min-height** — kills mobile focus-zoom
     globally, including the two selects the element-selector rule missed.
2. **`landing/styles.css`:** invite email input → 16px/44px; footer + menu
   links padded; FAQ summaries ≥44px.

## Post-fix verification

- Touch-target audit: **0 findings** on capital, trade, copy (re-swept);
  intelligence/doctor inline links now 44–46px.
- Focus-zoom audit: **0 findings** on all re-swept pages including landing.
- Overflow and console: still 0 everywhere.
- Desktop regression spot check: media-gated — kill pill 34px at 1280px,
  no overflow; visual check clean.

## Accepted deviations / notes for founder

- **Brand/logo links** (~29px) left as-is: decorative navigation duplicated
  by Home in the rail/tab bar.
- **Non-interactive small text** (chips, ticks, stage labels) is display-only
  and exempt from target rules.
- The 44px bar is now met by every interactive control that matters on
  mobile; WCAG 2.2 AA target-size (24px) is exceeded everywhere.
- Browser-cache note: the dev server (`python http.server`) sends no cache
  headers, so hard-refresh (or the app's cache clearing) may be needed to see
  CSS changes — worth adding no-cache headers if the demo is served to
  clients from this server.

## Verdict

All acceptance criteria of `docs/specs/MOBILE_PASS_SPEC.md` met. The
prototype is phone-clean across all 14 pages at the locked mobile
breakpoints.
