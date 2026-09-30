# Phase B · Screen Group 4 — ELVA Intelligence Home (Spec)

Per Design Architecture v1.0 §7.4. Static prototype in the approved app shell.

## A. Screen purpose
The front door of ELVA Intelligence: ask a question, see what the AI is working
on and where each piece sits in the nine-step lifecycle, and control the AI's
operating mode — with Autopilot visibly locked (Design Architecture C2) and the
"analysis, not advice" posture explicit. The whole page is an AI surface, so it
must degrade completely and gracefully when AI is offline.

## B. Information hierarchy
1. Header: ELVA Intelligence · mode selector (Copilot ✓ / Confirm / Autopilot 🔒)
2. ASK bar with suggestion chips → inline structured answer (WHY / CHALLENGE /
   INVALIDATION + lifecycle position + freshness)
3. Lifecycle rail — full labelled 9-step variant (right column)
4. Active work: strategy cards with stage + setup-confidence chips
5. Scanner digest (trust-chipped rows)
6. Portfolio Doctor flag (amber attention card)
7. Recent reviews (journal teasers)
8. Footer disclaimer: analysis not advice; confidence ≠ probability of profit; DEMO

## C. Main components
Mode selector (RiskBoundary-gated presentation; Autopilot locked, not a toggle) ·
AskBar + canned-response engine (deterministic demo Q&A for 4 topics; free text
falls back to a topics hint) · Copilot response card (Lens voice) · LifecycleRail
full variant · StrategyCard (stage chip + "setup confidence" chip) · Scanner rows ·
Doctor flag card · Review teasers · shared shell (top strip, banners, kill dialog,
demo-state switcher).

## D. States & edge cases
- **AI offline:** entire Intelligence content replaced by a quiet placeholder —
  "ELVA Intelligence is offline. Manual trading is unaffected" + link to the
  Trading Workspace. Shell stays live.
- **Risk Engine unavailable:** banner; ASK and analysis remain available; mode
  selector shows "Confirm & Autopilot execution blocked — fail closed" note.
- **Delayed:** scanner/answer freshness chips flip to DELAYED.
- Mode select: Copilot/Confirm switch with one-line consequence copy; Autopilot
  renders locked with reason ("Not available in this phase"); switching modes
  never executes anything.
- Ask with unknown text → honest demo fallback listing covered topics.
- Every confidence value suffixed "setup confidence"; DEMO chips throughout.

## E. Layout
- Desktop ≥1100: content 8 cols (ask, answer, active work, scanner, doctor,
  reviews) + right rail 4 cols (lifecycle, mode explainer).
- 768–1099: rail moves below ask/answer, two-column card grids.
- ≤560: single column; ask bar pinned first; rail as compact dots + current
  stage label; tab bar Intelligence item active. No overflow at 390/375/360.

## F. Signature systems
- **Intelligence Lens:** the whole main column speaks in Lens voice (cyan, mark
  avatar, structured WHY/CHALLENGE/INVALIDATION, freshness footer).
- **Risk Boundary:** mode selector framed as a permission contract; execution
  modes annotated with what the Risk Engine gates; never cyan.
- **Capital Spine:** top-strip mini only; AI allocation referenced on cards as
  context ("runs inside your $2,000 AI allocation").

## G. Existing code/components to preserve
- `app/app.css`, `app/app.js` untouched in behavior; shell markup reused with the
  same ids so the shared demo-state switcher drives this page (`lens-body` /
  `lens-offline` wrap the page's AI content).
- Rail/tab "Intelligence" upgrades to a real link on all app pages; nothing else
  changes on existing pages. Landing and prior specs untouched.

## H. Acceptance criteria
- No horizontal overflow at 1440/1280/1024/768/390/375/360; no console errors.
- Keyboard: ask bar, chips, mode selector, and all toggles operable; focus
  visible; reduced-motion safe.
- Copy audit: no profit language; confidence always "setup confidence"; Autopilot
  locked with no availability promise; disclaimer footer present; DEMO labels on
  all data.
- AI-offline replaces the full page content; Risk-down note appears on execution
  modes; shared state switcher verified on this page.
