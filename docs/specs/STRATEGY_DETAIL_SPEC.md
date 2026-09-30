# Phase B · Screen Group 5 — Strategy Detail + WHY / CHALLENGE / INVALIDATION (Spec)

Per Design Architecture v1.0 §7.5. Static prototype in the approved app shell.

## A. Screen purpose
The full argument behind one AI-built strategy. The page must make the
explainability standard physical: why this setup, what could go wrong, what
kills it, what changed since the analysis — and route toward execution only
through the deterministic Risk Engine. The AI argues; it never presses the
button.

## B. Information hierarchy
1. Breadcrumb ← Intelligence · strategy name, family/market chips, stage chip,
   compact lifecycle dots, setup-confidence chip (fixed suffix), trust chip
2. Three-column argument: WHY (cyan) · CHALLENGE (amber, visually adversarial,
   never collapsed on desktop/tablet) · INVALIDATION (red, monitored conditions)
3. "What changed since this analysis" strip
4. Proposed plan table with Risk Boundary caps inline
5. Risk check block: Run Risk Check → rule-by-rule deterministic verdict;
   Confirm & execute CTA gated to screen group 6 (disabled, labelled)
6. Position Monitor status (Lens-driven; degrades when AI offline)

## C. Main components
Shared shell · StrategyHeader (stage + confidence + lifecycle dots) · Argument
columns (a-block language scaled up) · ChangeStrip · PlanTable (data face, caps
column) · RiskVerdict block (PASS rows, near-cap ATTENTION row, REU state) ·
MonitorPanel (`lens-body`/`lens-offline` ids so the shared AI-offline switch
drives it) · two demo strategies selected by `?s=` query
(`eurusd-breakout` default, `xauusd-meanrev`).

## D. States & edge cases
- **AI offline:** analysis stays readable (it already exists) but is marked
  frozen — freshness chips flip to STALE, Position Monitor panel degrades to
  placeholder; trading elsewhere unaffected.
- **Risk Engine unavailable:** Run Risk Check returns a red "no verdict —
  fail closed" block; confirm stays disabled; banner from shell shows.
- **Delayed:** trust chips + freshness line flip to DELAYED.
- Verdict: all rules PASS; XAUUSD variant carries a near-cap amber ATTENTION
  row to demonstrate the state; verdict stamped with engine version + time.
- Confirm CTA disabled with "Confirmation flow — screen group 6" label.
- Unknown `?s=` falls back to the default strategy.
- Mobile: WHY and INVALIDATION collapse behind header toggles; CHALLENGE open
  by default and toggleable but initially expanded (§8 responsive table).

## E. Layout
- Desktop ≥1100: header full width; 3 equal argument columns; plan (7) +
  risk check (5); monitor full width.
- 768–1099: argument columns stack, CHALLENGE never collapsed; plan/risk stack.
- ≤560: accordion behavior per D; single column; no overflow at 390/375/360.

## F. Signature systems
- **Intelligence Lens:** the argument columns and Monitor panel are Lens voice.
- **Risk Boundary:** plan caps column + verdict block in structural styling,
  clearly separated from AI reasoning (own panel, engine stamp, never cyan).
- **Capital Spine:** allocation context line only ("inside your $2,000 AI
  allocation"); top-strip mini.

## G. Existing code/components to preserve
- Shell files untouched in behavior; `intelligence.html` active-work cards
  upgrade "Open strategy →" from disabled to real links (only change there).
- All prior pages, landing, docs unchanged.

## H. Acceptance criteria
- No horizontal overflow at 1440/1280/1024/768/390/375/360; no console errors.
- Keyboard: accordion toggles, Run Risk Check, and all controls operable;
  reduced-motion safe; headings ordered.
- Copy audit: confidence suffix everywhere; no profit framing; CHALLENGE
  content genuinely adversarial; demo labels on all figures.
- States verified: AI-offline→STALE+monitor placeholder, REU→no-verdict block,
  delayed chips, both strategies render via query param.
