# Phase B · Screen Group 6 — AI Permissions + Risk Check + Confirmation (Spec)

Per Design Architecture v1.0 §7.6 and journey J2 (RISK CHECK → CONFIRM →
EXECUTE). Static prototype in the approved app shell.

## A. Screen purpose
The contract page between the user and ELVA Intelligence: what the AI may do,
what it may never do, and the only doorway through which a prepared action can
execute — Risk Engine verdict first, explicit human confirmation second.
Nothing on this page lets the AI act alone.

## B. Information hierarchy
1. Modes: Copilot / Confirm / Autopilot (locked, C2) — flow requires Confirm
2. Permission matrix (Risk Boundary): granted rows (Analyze ✓, Build ✓, Open
   trade = mode-dependent, Modify SL/TP ▾, Close trade ▾) + NEVER rows
   (architectural locks, not toggles)
3. Boundary profile recap (read-only; editing ships with the Capital group)
4. Pending action flow (FlowStepper): Review proposal → Risk check (auto-run
   verdict table) → Confirm (full restatement + decision chain) → Executed
   (demo receipt + audit line + monitoring hand-off)

## C. Main components
Shared shell · Mode selector (reused pattern) · PermissionMatrix with two
live toggles (audited, consequence copy) and five locked NEVER rows ·
BoundaryRecap · FlowStepper with step rail · RiskVerdict table (engine stamp) ·
ConfirmCard restating order + the chain "AI suggested → Risk Engine PASSED →
your permission → Execution Engine" · Receipt card · toast.

## D. States & edge cases
- **Copilot mode selected:** flow start disabled — "Switch to Confirm mode to
  approve prepared actions." Matrix row "Open trade" reads No / With your
  approval / locked per mode.
- **AI offline:** pending-action flow replaced by placeholder ("no pending AI
  actions — Intelligence offline"); the permission matrix remains fully
  usable (it is account configuration, not AI output).
- **Risk Engine unavailable:** step 2 renders the red no-verdict fail-closed
  block; flow cannot advance; recovers when the engine returns.
- **Kill switch active:** flow blocked with "automation stopped" notice until
  re-enabled.
- **Delayed:** freshness chips flip.
- Permission toggles fire an "audit logged — demo" toast; every figure
  DEMO-marked; `?flow=xauusd-meanrev` shows an honest "already executing,
  nothing awaiting confirmation" state; unknown flow falls back to the
  pending EURUSD proposal.

## E. Layout
- Desktop ≥1100: single flow column, max 680px, matrix and flow stacked
  (per §8: "single flow column 640px"); boundary recap beside matrix at ≥1100.
- 768–1099: same, recap below matrix.
- ≤560: full-width steps, one section visible per step, step rail compact.
  No overflow at 390/375/360.

## F. Signature systems
- **Risk Boundary:** owns the page — matrix, locked rows, verdict, recap.
- **Intelligence Lens:** only the proposal content inside the flow (cyan),
  clearly nested inside the structural flow chrome; degrades with AI offline.
- **Capital Spine:** allocation context on proposal + top-strip mini.

## G. Existing code/components to preserve
- Shell files unchanged in behavior. `strategy.js` gains one behavior: after a
  PASSED check the gated button enables as "Continue to Confirm →" linking
  here (REU re-disables it). `intelligence.html` mode panel gains a "Manage
  permissions →" link. No other changes to prior pages.

## H. Acceptance criteria
- No horizontal overflow at 1440/1280/1024/768/390/375/360; no console errors.
- Keyboard: matrix toggles, stepper, confirm flow fully operable; focus moves
  to each step's heading; reduced-motion safe.
- Product rules audit: NEVER rows are not interactive; execution requires
  verdict + explicit confirmation; fail-closed and kill states block the flow;
  decision chain rendered on the confirm step; no profit language; DEMO
  everywhere.
- States verified programmatically: mode gate, AI-offline, REU block/recover,
  kill block, toggle audit toasts, full happy path to receipt.
