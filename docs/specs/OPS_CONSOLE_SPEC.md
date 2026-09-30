# Phase B · Screen Group 12 — Admin / Operations Console (Spec)

Per Design Architecture v1.0 §4 (Operations domain) and approved C10: same
tokens, denser console template, no Gen-Z simplification layer. Internal
staff surface — deliberately not linked from the client app.

## A. Screen purpose
The platform's inside view: is the money reconciled, who is waiting at the
gate, is the deterministic engine up, what is automation doing, and what got
logged. Everything view-or-operate; nothing here edits product rules
(rule changes route through founder approval + change control — stated).

## B. Sections (one page, `ops.html`, section switcher)
1. **Overview** — dense tiles: clients, deposits/withdrawals today, pending
   KYC, reconciliation status, automation running, open flags.
2. **Users & KYC** — applicant queue with region/status/flags; geo-policy
   enforcement visible (US persons auto-blocked; EU/UK held unless licensed);
   approve/reject with confirm + audit (simulated).
3. **Reconciliation** — the three-record monitor: per-scope rows of chain vs
   ledger vs MT5 with deltas and status; one amber "investigating" row to
   show the exception path; re-run (simulated) with timestamp.
4. **Risk Engine** — view-only console: engine status (reacts to the shared
   REU toggle → DOWN + fail-closed notice), enforcement counters, live
   verdict feed (PASS/BLOCKED with rule). "Rules change only via founder
   approval + change control."
5. **Automation** — platform-wide picture (bots/copy/AI counts) + the
   platform kill control (reuses the shell's two-step kill dialog); halted
   state mirrored; funds-untouched invariant restated.
6. **Audit explorer** — filterable, searchable dense table (auth /
   permission / execution / custody / admin).
7. **System health** — service list with trust-state chips wired to the
   shared demo-state switcher (market data ↔ delayed, AI service ↔ offline,
   Risk Engine ↔ down; chain watcher, MT5 bridge, ledger steady).

## C. Components
Console shell (ELVA OPS identity, INTERNAL + DEMO chips, shared demo-state
switcher and kill dialog ids so `app.js` drives this page too) · stat tiles ·
dense tables (12.5px, tight rows) · status chips · verdict feed · confirm
rows · filter/search. All data demo; every operator action toasts an audit id.

## D. States & edge cases
- REU toggle: Risk Engine section DOWN, health chip red, verdict feed
  paused, overview flag raised. Kill: automation section shows halted counts,
  health notes it. Delayed: market-data chip amber. AI offline: AI service
  chip grey; nothing else degrades (console is not an AI surface).
- KYC: blocked rows are not approvable (policy, not preference).
- Recon amber row carries an "investigating — entry hold applied" note.
- Audit search + filter compose; empty result states honest.

## E. Layout
- Desktop-first console: ≥1100 two-column section grids, dense tables.
- Still QA-clean on mobile: single column, tables collapse to rows via the
  established data-label pattern, section switcher scrolls horizontally.
  No overflow at 390/375/360; no console errors.

## F. Signature systems
- **Risk Boundary** styling for engine/kill/recon exceptions; **Capital
  Spine** only as reconciliation totals; **Lens absent** (no AI voice —
  operational truth only).

## G. Existing code/components to preserve
- No client-app page changes at all. `app.js` reused unmodified via shell ids.

## H. Acceptance criteria
- No overflow at all seven breakpoints; no console errors; keyboard operable.
- Shared switcher drives engine/health/automation states correctly incl.
  recovery; platform kill uses the two-step dialog and mirrors the banner.
- Geo-policy visibly enforced in KYC; three-record recon shows deltas and the
  exception path; audit filter+search verified; view-only rule statement
  present.
