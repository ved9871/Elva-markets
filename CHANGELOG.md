# ELVA Markets — Changelog

## 2026-09-30 — Phase B · AI Permissions + Risk Check + Confirmation (`feature/permissions-confirm`)

**Implemented**
- `app/permissions.html|permissions.css|permissions.js` per Design Architecture
  §7.6 / journey J2 and `docs/specs/PERMISSIONS_CONFIRM_SPEC.md`.
- Permission matrix: always-allowed rows, mode-dependent "Open trades", two
  audited grant toggles (modify SL/TP, close trades) with consequence copy —
  and five **NEVER rows rendered as architecture** (no inputs, no toggles):
  withdraw, wallets/security, raise own allocation, touch unallocated,
  override Risk Engine.
- Boundary profile recap (read-only; editing deferred to Capital group).
- Four-step confirmation flow: Review proposal (Lens-voiced, links to full
  analysis) → Risk check (auto verdict table + engine stamp; REU renders red
  no-verdict fail-closed and halts the flow) → Confirm (decision chain
  "AI suggested → Risk Engine PASSED → your permission → Execution Engine" +
  full restatement) → Executed (simulated receipt, audit id, monitor hand-off).
- Gates: Copilot mode disables flow start; kill switch blocks the flow until
  re-enabled; AI-offline replaces the flow (permissions stay editable);
  dismiss/cancel paths logged; `?flow=xauusd-meanrev` shows honest
  already-executing state.
- Strategy Detail's gated button now enables after a PASSED check as
  "Continue to Confirm →" (REU re-disables); Intelligence Home links to
  "Manage permissions".

**QA evidence**
- No horizontal overflow at 1440/1280/1024/768/390/375/360; no console errors.
- Programmatic tests pass: NEVER rows non-interactive, Copilot gate, toggle
  audit toasts, REU block/recover, kill block/recover (verified with deferred
  read after an initial test race), happy path to receipt with step rail
  states, strategy→permissions handoff, already-executing variant.


## 2026-09-30 — Phase B · Strategy Detail (`feature/strategy-detail`)

**Implemented**
- `app/strategy.html|strategy.css|strategy.js` per Design Architecture §7.5 and
  `docs/specs/STRATEGY_DETAIL_SPEC.md`; two demo strategies via `?s=` param
  (EURUSD Breakout @ CHALLENGE, XAUUSD Mean Reversion @ MONITOR), unknown ids
  fall back safely.
- Three-column argument: WHY (cyan, thesis + data rows + freshness), CHALLENGE
  (amber, visually adversarial offset, never collapsed on desktop/tablet),
  INVALIDATION (red, each condition tagged "monitored").
- "What changed since this analysis" strip; proposed-plan table with Risk
  Boundary caps inline; allocation-context line (unallocated unreachable).
- Risk Engine panel: Run Risk Check → rule-by-rule deterministic verdict table
  with engine version/time stamp; XAUUSD variant shows a near-cap amber
  ATTENTION row; Risk-Engine-down returns a red "no verdict — fail closed"
  block; **Confirm & execute stays disabled, labelled for screen group 6**.
- Position Monitor panel (Lens voice) with AI-offline degradation: analysis
  stays readable but marked STALE/frozen via banner; monitoring paused copy.
- Mobile: WHY/INVALIDATION collapse behind header toggles, CHALLENGE open by
  default (per §8 responsive table); resize + matchMedia both drive it.
- Intelligence Home active-work cards now link to strategy detail.

**QA evidence**
- No horizontal overflow at 1440/1280/1024/768/390/375/360; no console errors.
- Programmatic tests pass: mobile accordion defaults + toggles, verdict render
  (5 PASS rows), REU no-verdict and restore, frozen/STALE state and restore,
  confirm gating, both strategies + lifecycle dots (8 lit on MONITOR variant).


## 2026-09-30 — Phase B · ELVA Intelligence Home (`feature/intelligence-home`)

**Implemented**
- `app/intelligence.html|intelligence.css|intelligence.js` per Design
  Architecture §7.4 and `docs/specs/INTELLIGENCE_HOME_SPEC.md`, in the shared
  app shell.
- Operating-mode selector framed as a Risk Boundary contract: Copilot / Confirm
  switchable with consequence copy; **Autopilot visibly locked** ("Not available
  in this phase", per C2) — a disabled control, not a toggle.
- ASK bar with suggestion chips and a deterministic demo Q&A engine (EURUSD,
  Atlas FX provider, Momentum-7 bot, portfolio review); free text keyword-matches
  or falls back honestly to the demo's covered topics. Answers render in Lens
  voice as WHY / CHALLENGE / INVALIDATION with stage chip + freshness footer.
- Full labelled 9-step lifecycle rail; lit steps track active work and the
  latest answer; step 5 styled as the deterministic Risk Engine (red, non-AI).
- Active-work strategy cards (stage + "setup confidence — not a probability of
  profit" chips), Market Scanner digest, amber Portfolio Doctor flag, journal
  teasers, "What ELVA can never do" architecture card, page-level disclaimer.
- Whole-page AI-offline degradation (content → placeholder + link to manual
  trading); Risk-Engine-down note on execution modes; delayed-data freshness.
- Nav: "Intelligence" activated on all app pages (rail + tab bar).

**QA evidence**
- No horizontal overflow at 1440/1280/1024/768/390/375/360 (clean on first
  audit); no console errors.
- Programmatic tests pass: chip answers + lifecycle lighting, free-text match,
  unknown-question fallback, mode switching, Autopilot locked, Risk-down note,
  full-page AI-offline and restore, delayed freshness line.


## 2026-09-30 — Phase B · Trading Workspace (`feature/trading-workspace`)

**Implemented**
- `app/trade.html|trade.css|trade.js`: Professional Trading Workspace per
  Design Architecture §7.3 and `docs/specs/TRADING_WORKSPACE_SPEC.md`, inside the
  reused app shell (same top strip, banners, kill dialog, demo-state switcher).
- Grouped watchlist (FX/Metals/Indices/Commodities/Crypto) → horizontal strip on
  tablet, symbol select on mobile; seeded deterministic SVG candlestick chart with
  timeframes, axis, last-price line, SL/TP preview lines, diagonal DEMO watermark.
- Order ticket: side/type/size/SL/TP, demo margin & risk estimates, inline
  **Risk Engine — deterministic check** verdict (PASS / BLOCKED with violated
  rule / verdict-unavailable when engine down; manual orders proceed per
  handbook — fail-closed gates automated execution only), two-step confirm,
  simulated fill appends to Positions with toast. SL required by demo boundary
  profile; wrong-side SL blocked; >1% risk blocked.
- Positions / Orders / History tabs (history rows carry MT5 ✓ / Ledger ✓ ticks);
  collapsible "Ask ELVA" Lens mini-panel driven by the shared AI-offline state.
- Mobile: ticket as bottom sheet with FAB, Esc/backdrop close.
- Nav: "Trade" activated on both app pages (rail + tab bar).

**QA evidence**
- No horizontal overflow at 1440/1280/1024/768/390/375/360; no console errors.
- Defects found and fixed during QA: grid items missing `min-width:0` (+5/+14px
  overflow), rotated watermark bounding box leak (chart overflow hidden), fixed
  sheet spanning the classic-scrollbar gutter (JS width pin + matchMedia),
  mobile input auto-zoom on focus (inputs ≥16px at ≤560px).
- Ticket state machine tested programmatically: neutral→PASS→BLOCKED (risk cap)
  →BLOCKED (wrong-side SL)→review→confirm→position added; Risk-down verdict
  unavailable with manual unaffected; AI-offline Lens placeholder with ticket
  unaffected; tabs and symbol/timeframe switching verified.


## 2026-09-30 — Phase B · App Shell + Capital Command Center (`feature/app-shell-command-center`)

**Implemented**
- `app/`: client app shell (nav rail / top strip / mobile tab bar) + Capital Command
  Center per Design Architecture §7.2 and `docs/specs/APP_SHELL_COMMAND_CENTER_SPEC.md`.
- Capital Spine (full card + top-strip mini), Intelligence Lens digest, four mode
  cards, positions table (collapses to cards ≤700px), Risk Boundary snapshot with
  usage meters (amber ≥80% of cap), reconciled activity feed.
- Interactive degradation states (prototype "Demo states" control): AI offline,
  Risk Engine unavailable (fail closed — automation halted, banner), delayed data.
- Kill switch: two-step accessible confirm; halts Bot/AI cards, funds untouched,
  audit note; reversible in prototype.
- Dev server config "app" on port 8766.

**QA evidence**
- Breakpoints 1440/1280/1024/768/390/375/360: no horizontal overflow (fixed
  `[hidden]` vs display-class conflict found at 390/360), no console errors.
- State machine exercised programmatically: AI offline/restore, Risk-down
  halt/restore, delayed chips, kill flow (checkbox-gated confirm) — all pass.
- Unbuilt destinations render disabled, labelled with their coming screen group.

**Notes**
- Tokens duplicated from landing CSS (no build step yet); consolidation planned.
- Autopilot shown as "locked in this phase" on the AI card (per C2 proposal).


## 2026-09-30 — Phase B · Landing Page v1 (`feature/landing-page-v1`)

**Implemented**
- Public landing page (`landing/`): static HTML/CSS/JS, no framework, no backend.
  Section order per handbook §14: hero + Copilot visual, markets, four modes,
  Intelligence, 9-step lifecycle, Transparent Capital Layer, execution/liquidity,
  security/permissions, partners, FAQ, risk disclosure, invite, footer.
- Dark-surface brand treatment: gradient mark extracted to
  `assets/brand/elva-mark.png` (transparent background), wordmark set in type
  (Design Architecture C6 — variant pending formal founder sign-off).
- Dev server config: `.claude/launch.json` (`python -m http.server 8765 --directory landing`).

**QA evidence**
- Breakpoints 1440/1280/1024/768/390/375/360: no horizontal overflow, no offenders
  (programmatic audit), no console errors.
- Keyboard: skip link, focus-visible rings, native accordion, menu `aria-expanded`
  toggles and closes on link click (verified).
- Invite demo form validated: valid email → local demo notice, nothing transmitted.
- `prefers-reduced-motion` honored (reveal/cycling disabled).

**Compliance posture on this page**
- Invite-only narrative, no sign-up or deposit CTA, no performance/profit/yield
  language, all figures labelled DEMO/illustrative, risk disclosure readable,
  confidence framed as setup confidence, on-chain vs off-chain never blurred,
  AI-never-withdraws + fail-closed stated. NodalWaves group line withheld (C1).

**Unresolved / pending founder decision**
- C1 footer group line · C2 Autopilot presentation in app UI · C6 formal approval
  of dark-surface logo variant · counsel review of public page wording (C4).

## 2026-09-30 — Phase A · Design Architecture v1.0

- `docs/ELVA_DESIGN_ARCHITECTURE_v1.md` — approved by founder (Phase A → B).
- `docs/specs/LANDING_PAGE_SPEC.md` — screen-group spec for Landing Page.
- Approved logo added at `assets/brand/elva-logo-primary.png`.
