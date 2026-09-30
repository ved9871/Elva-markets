# Phase B · Screen Group 10 — Capital / Deposit / Allocation / Activity / Withdrawal / Security (Spec)

Per Design Architecture v1.0 §7.9 and journeys J1 (spine), J6 (deposit under
waiting), J9 (withdrawal ceremony). Static prototype; every money movement is
simulated and labelled.

## A. Screen purpose
The Transparent Capital Layer's own surface: capital always in an explicit
state, movements as explicit transitions, three-record reconciliation visible
per row — and a withdrawal path that is a security ceremony no AI or bot can
enter. Security page: the custody controls themselves.

## B. Information hierarchy
**Capital (`capital.html`)** — full Capital Spine (6 states, animated) above
tabs: Overview · Deposit · Allocate · Withdraw · Activity.
- Overview: state cards + per-mode allocations + rule line (AI/bots can't
  reach Unallocated).
- Deposit (J6): asset + network selects, demo address + decorative QR, network
  warning, simulated incoming tx → confirmations 0→12 with Settlement Pending
  → credited to Unallocated → spine + activity update.
- Allocate (J1): direction (to mode / back to Unallocated), mode, amount
  capped by source state, boundary note → confirm → animated spine transition,
  audit toast, activity row.
- Withdraw (J9): Withdrawable only; locked states listed with reasons
  (release rules beyond demo scope noted honestly); whitelisted address
  select; 2FA step (demo-labelled); explicit confirm with irreversibility
  warning → status tracker (requested → signed → broadcast → confirmed) →
  audit + activity. **REU/kill never touch this flow — custody is
  user-controlled and engine-independent.**
- Activity: reconciled rows (Chain ✓ / MT5 ✓ / Ledger ✓ as applicable),
  filter chips, dynamically appended events.
**Security (`security.html`)** — KYC/region status · 2FA (TOTP, enabled) ·
devices & sessions with revoke · whitelisted withdrawal addresses (add gated
behind security review, out of demo) · personal audit trail (mirrors the
prototype's logged events) · architecture statement (AI/bots have no path
into custody).

## C. Main components
Shared shell · CapitalSpine full (JS-driven values, animated widths) ·
Tabbed flows (FlowStepper patterns from prior groups) · Confirmation counter ·
Whitelist select · 2FA input (demo) · Status tracker · Reconciled activity
rows with filters · Security cards · toasts. State lives in page JS; starting
values match the rest of the prototype (12,800 / 3,200 / 850 / 3,150 / 5,000).

## D. States & edge cases
- Deposit: wrong-network warning always visible; delay state (shared toggle)
  shows DELAYED chip on confirmations; mid-flight tx shows Settlement Pending.
- Allocate: amount validation against source state; per-mode boundary note;
  returning allocation respects active state only (reserved margin cannot be
  moved — reason shown).
- Withdraw: amount ≤ Withdrawable; address must be selected; 2FA must be 6
  digits (demo-labelled); confirm restates everything + irreversibility;
  cancel at every step; locked states never silently hidden.
- Activity rows: each shows exactly the records that apply to it; no fake
  three-way ticks on events that don't touch all three systems.
- All figures DEMO; simulated actions say so; audit ids on every sensitive
  action. AI-offline changes nothing here (no Lens on these pages — stubs
  keep the shared switch safe).

## E. Layout
- Spine full-width; tabs beneath (scrollable tab bar on mobile); flows in a
  single 640px column; Overview cards 3-up ≥1100, 2-up ≥700, 1-up below.
  Security: card stack, 2-col ≥1100. No overflow at 390/375/360.

## F. Signature systems
- **Capital Spine:** the page IS the spine — every movement is a visible
  state transition on the bar.
- **Risk Boundary:** allocation boundary notes; withdrawal ceremony styling;
  locked-state reasons.
- **Intelligence Lens:** absent by design — capital movement carries no AI
  voice anywhere.

## G. Existing code/components to preserve
- Shell behavior unchanged. Rail upgrades on all app pages: Capital →
  capital.html, Activity → capital.html?tab=activity, Account →
  security.html; tab bars gain the Capital link where the slot exists;
  Command Center spine card links here. No other edits.

## H. Acceptance criteria
- Both pages: no horizontal overflow at 1440/1280/1024/768/390/375/360; no
  console errors; keyboard-complete flows; reduced-motion safe (spine
  animation disabled).
- Product rules: withdrawals unaffected by REU/kill; AI/bot absence from
  custody stated; reconciliation ticks accurate per event type; no ambiguous
  single balance anywhere; demo labels throughout.
- States verified programmatically: deposit lifecycle to credit, allocation
  both directions with caps, withdrawal validation chain + status tracker,
  activity filters, security revoke + audit list.
