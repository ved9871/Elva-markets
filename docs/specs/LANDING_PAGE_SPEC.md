# Phase B · Screen Group 1 — Public Landing Page (Spec)

Per Design Architecture v1.0 (approved). Implementation follows this spec exactly.

## A. Screen purpose
Present ELVA to invited prospects, partners and investors as an institutional, AI-native,
capital-transparent trading platform — while remaining compliant with the pre-licence
posture: **brand/technology narrative + invite request only. No sign-up, no deposit CTA,
no financial promotion, no performance claims, all figures Demo/Illustrative.**

## B. Information hierarchy (handbook §14 storytelling, locked order)
1. Hero — positioning + interactive AI Copilot visual (demo-labelled)
2. Markets strip (FX · Metals · Indices · Commodities · Crypto; Forex-first note)
3. Four trading modes (Manual / Copy / Bot / AI-assisted, each with its hard boundary)
4. ELVA Intelligence capabilities (10 modules + explainability standard)
5. 9-step lifecycle rail (ASK→…→REVIEW)
6. Transparent Capital Layer (Capital Spine diagram, handbook's illustrative $25k split)
7. Liquidity / execution technology (on-chain capital vs off-chain execution, reconciliation)
8. Security / control / permissions (matrix excerpt with locked NEVER rows, kill switch, fail-closed)
9. Partners / IB / institutional direction
10. FAQ → Risk disclosure → invite CTA → footer

## C. Main components
Sticky nav (mark + wordmark, section links, DEMO badge, Request-invite button) · Hero
copilot demo card (lifecycle chips, WHY/CHALLENGE/INVALIDATION mini, trust chip) · Mode
cards · Module grid · LifecycleRail (full variant) · CapitalSpine (stacked bar + legend,
DEMO chip) · Permission matrix excerpt (RiskBoundary styling, locked rows) · FAQ accordion
(semantic details/summary) · Risk disclosure block · Invite panel (local-only demo form) ·
Footer with ceremonial lockup (mark + text wordmark; NodalWaves slot reserved empty per C1).

## D. States & edge cases
- All numeric/market content: **DEMO** (violet chip) — page has no live data by design.
- Copilot demo card: animated cycle; static full-content fallback under `prefers-reduced-motion`
  and before JS loads (no dead panel if JS fails).
- Invite form: submits nowhere; shows "Closed beta — invitations are not yet open" locally.
- No-JS: all content readable, nav anchors work, accordion works (native details).
- Autopilot: listed in AI-assisted mode copy as permission-gated; no availability promise (C2).
- Copy trading: presented as product capability, no live activation implication (C3).

## E. Layout
- Desktop (≥1024): 12-col, max 1280; hero split 55/45 text/visual; cards 4-up→2-up.
- Tablet (768): hero stacks, grids 2-up, rail wraps 3×3.
- Mobile (390/375/360): single column, nav collapses to menu sheet, rail vertical,
  spine legend stacks; 16px gutters; no horizontal overflow.

## F. Signature systems on this page
- **Capital Spine:** section 6 diagram — the only balance visualization, 6 explicit states.
- **Intelligence Lens:** hero copilot card + section 4 — cyan voice, confidence defined as
  setup confidence, CHALLENGE visually adversarial.
- **Risk Boundary:** section 8 — structural styling distinct from AI cyan; NEVER rows
  rendered locked (architecture, not toggles); fail-closed statement.

## G. Existing code/components to preserve
None exists (first implementation). Preserve: approved logo assets in `assets/brand/`
(mark untouched; dark-surface treatment = extracted mark + frost text wordmark per C6),
all `/docs` content, CLAUDE.md.

## H. Acceptance criteria
- Breakpoints clean at 1440/1280/1024/768/390/375/360 — no horizontal overflow, no overlap.
- No console errors; anchors work; keyboard: skip link, visible focus, accordion/menu operable.
- `prefers-reduced-motion` honored; semantic HTML (landmarks, single h1, ordered headings).
- Copy audit passes: no yield/return/profit language, no "earn", no fake users/volume/licence
  claims, no urgency/casino elements; every figure Demo/Illustrative; risk disclosure readable.
- Product-rule audit passes: on-chain vs off-chain never blurred; AI-never-withdraws stated;
  fail-closed stated; confidence = setup confidence.
- Tokens match Design System §3 (colors, type, spacing, radii); logo clearspace respected.
