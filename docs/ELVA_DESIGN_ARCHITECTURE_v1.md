# ELVA Markets — Design Architecture v1.0 (Phase A)

**Status:** DRAFT — awaiting founder approval before any high-fidelity screens or code.
**Prepared per:** ELVA Master Design Prompt FINAL v1.1 · ELVA Master Execution Handbook v1.0 (locked baseline) · CLAUDE.md compliance guardrails.
**Scope:** Design architecture only. No production code. No product-logic changes.
**Logo:** Approved logo received — `assets/brand/elva-logo-primary.png`. Token palette below is anchored to its actual gradient.

---

## 1. Understanding of ELVA — 10 points

1. **ELVA is a multi-asset trading platform** (Forex-first; Gold/Metals, Indices, Commodities, Crypto) built from Dubai/UAE — positioned as institutional infrastructure, not "another MT5 broker" and not a crypto-themed site.
2. **Capital moves on-chain; trading executes off-chain** in professional infrastructure (MT5 at launch). These are distinct layers and the UI must never blur them — MT5 trades are never represented as on-chain transactions.
3. **Three records coexist and reconcile continuously:** blockchain (asset transfers), MT5 (executions), and the internal double-entry ledger (the accounting source-of-truth). The UI surfaces reconciliation as a trust feature.
4. **The Transparent Capital Layer is the flagship differentiator:** capital is always in an explicit state — Total, Trading Allocation, Reserved Margin, Settlement Pending, Withdrawable, Unallocated — never one ambiguous balance.
5. **Four trading modes** — Manual, Copy, Bot/Algo, AI-assisted — each with a dedicated allocation context so one mode can never silently consume another's capital.
6. **ELVA Intelligence** (official name; "ELVA AI" only as a compact UI label) is an intelligence operating layer, not a chatbot: Copilot, Market Scanner, Strategy Engine, Challenge Layer, Risk Guardian, Portfolio Doctor, Copy Intelligence, Bot Inspector, Position Monitor, Post-Trade Review.
7. **The lifecycle is the product's spine:** ASK → ANALYZE → CHALLENGE → BUILD → RISK CHECK → CONFIRM → EXECUTE → MONITOR → REVIEW. Every Intelligence surface expresses where the user is in this loop.
8. **Authority is strictly separated:** AI suggests, the deterministic Risk Engine validates, the user controls, the Execution Engine executes. AI/bots can never withdraw, change wallets/security, raise their own allocation, or override the Risk Engine — by architecture, and visibly so in the UI.
9. **Degradation is designed, not accidental:** manual trading survives AI outage; automated execution fails closed when the Risk Engine is unavailable; every number carries a data-trust state (LIVE / DELAYED / DEMO / STALE / DISCONNECTED).
10. **The product is currently pre-licence and demo-only:** invite-only, no real deposits, no public financial promotion, every figure labelled Demo/Illustrative. Copy and design must be fair, calm, and free of profit framing, yield language, or casino mechanics.

**North star:** Institutional Trust × Gen-Z Simplicity × AI-Native Interaction.
**Master concept:** ELVA — The Living Capital OS, expressed through three signature systems: **Capital Spine** (where capital is, in what state), **Intelligence Lens** (contextual AI explanation), **Risk Boundary** (user-controlled limits).

---

## 2. Design principles and anti-patterns

### Principles

| # | Principle | What it means in practice |
|---|---|---|
| P1 | **Every screen answers the four questions** | Where is my capital? What does ELVA see? Why does it matter? What are my boundaries? If a screen answers none, it doesn't ship. |
| P2 | **State before decoration** | Capital state, data freshness, and risk status are rendered before any aesthetic layer. A beautiful stale number is a lie. |
| P3 | **Two systems, two voices** | AI reasoning (Intelligence Cyan, conversational, "ELVA sees…") is always visually distinct from Risk Engine verdicts (structural, verdict-styled, "Risk Engine: PASSED/BLOCKED"). They never share a card. |
| P4 | **Calm by default, loud only for truth** | Green only for pass/healthy. Amber only for attention. Red only for genuine risk/error. No decorative use of status colors. |
| P5 | **Explain, never promise** | WHY / CHALLENGE / INVALIDATION accompany every strategy. Confidence = setup confidence, never probability of profit. |
| P6 | **Boundaries are visible controls, not settings buried in menus** | Risk Boundary panels sit beside the actions they govern. Permissions read as contracts: what's allowed, what's capped, what's never possible. |
| P7 | **Progressive density** | Gen-Z simplicity at entry (cards, short copy, one action), professional density on demand (tables, depth, multi-panel workspaces). Same tokens, two densities. |
| P8 | **Degrade legibly** | Outages produce designed states, not blank panels: AI down → manual trading front and center; Risk Engine down → automation visibly locked. |
| P9 | **Demo honesty** | Pre-licence, every number wears the DEMO chip. No screen may be screenshot-able as a fake live account. |
| P10 | **Motion is information** | Animation confirms state change (allocation moved, check passed) in ≤300ms, respects reduced-motion, and never simulates excitement. |

### Anti-patterns (never)

- Casino styling: rockets, confetti, flashing P&L, meme visuals, fake countdowns, "100x", fake urgency, gamified streaks.
- Profit framing: yield/APY/return language, "earn passive income", AI as profit engine, leaderboards ranked by raw ROI.
- One ambiguous balance number; mixing on-chain and MT5 records in one visual metaphor.
- AI verdict styling on Risk Engine output or vice versa; a toggle that implies AI could ever withdraw.
- Unlabelled demo data; charts without timestamps/freshness; green used as brand decoration.
- Dark-pattern consent, pre-ticked boxes, hidden risk disclosure, disclaimer in unreadable grey.

---

## 3. ELVA Design System v1.0

### 3.1 Brand anchor — the approved logo

`assets/brand/elva-logo-primary.png` — the triple-wing "E" monogram in a deep-navy → electric-blue → cyan gradient, ELVA wordmark in deep navy, MARKETS letterspaced in electric blue.

**Usage rules (proposed):**

- **App/dark surfaces (primary product context):** use the gradient mark as-is (it carries the brand gradient and reads well on midnight navy) with the wordmark re-cut in Frost White. *The supplied lockup's navy wordmark is illegible on navy — a dark-surface variant is required; see Conflicts §12, item C6.*
- **Light/print surfaces:** supplied lockup as-is on white/frost only.
- **Nav usage:** mark-only at 28–32px height; mark + wordmark at ≥40px. Tagline lines ("A World of Opportunity", "Trusted · Connected · Further") appear only in the full ceremonial lockup (landing footer, documents) — never in app chrome.
- **Clearspace:** minimum = height of one wing stroke on all sides. Minimum mark size 20px. Never recolor the gradient, never place on photography without a scrim, never stretch.
- The logo gradient (navy→blue→cyan) is reserved for brand moments (logo, hero accent, loading mark). It is **not** a general UI gradient — surfaces stay flat/glass so data stays the hero.

### 3.2 Color tokens

Primitives are anchored to the logo gradient; semantic tokens are what components consume.

**Primitives**

```
--navy-950: #04070F   (void)            --blue-600: #1E4FD8
--navy-900: #070D1B   (canvas)          --blue-500: #2B66FF  (Electric Blue — logo mid)
--navy-850: #0A1424   (surface)         --blue-400: #5A8AFF
--navy-800: #0F1D33   (raised)          --cyan-400: #2FC1F5  (Intelligence Cyan — logo tip)
--navy-700: #16273F   (interactive)     --cyan-300: #7ADCFF
--navy-600: #1F3352   (border strong)   --ink-700:  #0E2B66  (logo deep navy, light surfaces)
--line-500: #24385C   (border)          
--frost-50: #F2F6FC   (text primary)    --green-400: #2FCF9A  (pass/healthy only)
--frost-200:#D7E0EE                     --amber-400: #E8A93D  (attention only)
--silver-400:#8FA2BF  (text secondary)  --red-400:   #E8545B  (genuine risk/error only)
--silver-600:#5F7294  (text muted)      --violet-400:#9B8CFF  (DEMO/illustrative marking only)
```

**Semantic (excerpt)**

```
bg/canvas: navy-900        text/primary: frost-50      accent/primary: blue-500
bg/surface: navy-850       text/secondary: silver-400  accent/intelligence: cyan-400
bg/raised: navy-800        text/muted: silver-600      accent/on-accent: frost-50
bg/glass: navy-850 @ 72% + 12px blur + 1px line-500    border/default: line-500

status/live: green-400     risk/pass: green-400        capital/allocated: blue-500
status/delayed: amber-400  risk/attention: amber-400   capital/reserved: blue-400 @ 60%
status/stale: amber-400    risk/blocked: red-400       capital/pending: cyan-400 @ 70%
status/demo: violet-400    risk/engine-down: red-400   capital/withdrawable: green-400
status/disconnected: red-400                           capital/unallocated: silver-400
```

Notes: violet is reserved exclusively for DEMO/illustrative marking so demo labelling can never be confused with attention (amber) or risk (red). Withdrawable uses green as "healthy/available" — consistent with green = pass. Restrained glow: a single 0–24px cyan outer glow at ≤20% opacity, allowed only on Intelligence surfaces and focused brand moments.

### 3.3 Typography

| Role | Face | Sizes (px/line) |
|---|---|---|
| Display (landing hero) | **Space Grotesk** 500/600 | 64/68, 48/54, 40/46 |
| Headings (app) | Space Grotesk 500 | h1 32/38 · h2 24/30 · h3 20/26 · h4 17/24 |
| Body / UI | **Inter** 400/500/600 | body-lg 17/26 · body 15/22 · small 13/18 · caption 12/16 |
| Data / numerics | **IBM Plex Mono** 500 (tabular) | data-xl 28/34 · data-lg 20/26 · data 15/20 · data-sm 13/16 |

Rules: every price, balance, percentage, and capital figure renders in the data face with tabular numerals — no layout shift on tick. Negative values use the minus sign + red only when semantically a loss/risk. Letterspacing +0.06em on all-caps labels (echoes MARKETS in the logo). Minimum body on mobile 15px; minimum any text 12px.

### 3.4 Grid, spacing, radii, elevation

- **Grid:** 12-col desktop (max 1280 content, 24px gutters), 8-col tablet, 4-col mobile (16px gutters). Trading Workspace uses a panel grid (resizable regions) instead of the page grid.
- **Spacing scale (4px base):** 4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96. Section rhythm on landing: 96–128px. Card padding 24 desktop / 16 mobile.
- **Radii:** 6 (chips/tags) · 8 (buttons/inputs) · 12 (cards) · 16 (modals/sheets) · full (pills, status dots).
- **Elevation:** e0 flat on canvas · e1 card (1px line-500 + shadow 0 1px 2px @25%) · e2 raised (0 8px 24px @35%) · e3 overlay (0 16px 48px @50% + glass blur). Glow is not elevation; see 3.2.
- **Breakpoints (QA-locked):** desktop 1440/1280/1024, tablet 768, mobile 390/375/360. No horizontal overflow at any of them.

### 3.5 Iconography

Outlined, 1.5px stroke, 24px grid, geometric with slightly cut terminals (echoing the wing cuts of the mark). Duotone fill permitted only for capital-state and Intelligence icons. Never emoji in product UI. Core set: markets (fx/metals/indices/commodities/crypto), capital states (6), modes (manual/copy/bot/AI), lifecycle (9 stages), risk (shield/boundary/blocked/kill), trust states (5), security, reconciliation.

### 3.6 Core components

**Buttons** — Primary (blue-500 fill), Secondary (outline line-500), Ghost, Destructive (red, only for genuinely destructive acts: kill switch, stop-copy, cancel withdrawal), AI action (cyan outline + subtle glow — only for Intelligence actions). Heights 44/36/28. States: default/hover/active/focus-visible (2px cyan-300 ring)/loading/disabled. Irreversible actions always pair with a confirm step — never one-tap.

**Inputs** — text, amount (data face, currency suffix, max-chip), select, slider (risk parameters; shows numeric value + boundary cap), segmented control, toggle. Toggles that govern money/automation show their consequence inline ("Autopilot may open trades up to $2,000 — Demo").

**Cards** — Surface card (e1), Glass card (hero/overlay), Metric card (label + data-lg + trust chip + spark), Capital-state card, Strategy card, Provider card, Bot card. All cards carry an optional trust chip slot, top-right.

**Tables** — professional density: 40px rows, sticky header, right-aligned numerics (data face), row hover navy-700, sortable, column pinning on workspace tables; mobile collapses to key-value cards.

**Charts** — line/area (price, equity), allocation bar (Capital Spine), exposure map (treemap/heat), drawdown curve, bar/histogram. Rules: every chart has timestamp + trust chip; axes labelled; no y-axis truncation that exaggerates moves; red/green only for directional price/P&L truth; DEMO watermark diagonal @6% on any demo-fed chart.

**Status patterns** — Trust chip (LIVE pulse-dot ·green / DELAYED ·amber + lag / DEMO ·violet / STALE ·amber + age / DISCONNECTED ·red + retry). Risk verdict block (PASS/ATTENTION/BLOCKED with rule-by-rule table). System banner (page-level degradation: AI unavailable, Risk Engine unavailable, reconciliation lag).

### 3.7 AI components (Intelligence Lens)

All Intelligence UI shares: cyan accent, the ELVA mark as avatar, a lifecycle position indicator, and a "reasoning, not verdict" tone.

- **Copilot thread** — conversational stream; every analytical reply is structured: summary → WHY → CHALLENGE (counter-case) → INVALIDATION → data freshness footer.
- **Lens panel** — contextual side panel summonable on any entity (market, position, provider, bot, portfolio). Closable everywhere; trading never depends on it (Rule: manual survives AI outage).
- **Strategy card** — name, family, markets, setup summary, confidence chip labelled "Setup confidence — not a profit probability", lifecycle stage, CTA to detail.
- **Challenge block** — visually adversarial (offset border, "What could go wrong" heading); never hidden behind a click on desktop.
- **Invalidation list** — explicit conditions that void the thesis; each condition monitored → feeds Position Monitor.
- **Lifecycle tracker** — 9-step ASK→…→REVIEW rail, current stage lit; compact (dots) and full (labelled) variants.
- **Confidence chip** — value + fixed suffix "setup confidence"; tooltip defines the model basis. Never green/red — always cyan/neutral.
- **AI unavailable state** — panel collapses to a quiet placeholder: "ELVA Intelligence is offline. Manual trading is unaffected." + link to manual workspace.

### 3.8 Risk components (Risk Boundary)

Deliberately *not* cyan, *not* conversational — structural, engraved, deterministic.

- **Boundary panel** — the user's limits as a fixed contract: allocation, max risk/trade, max daily loss, max drawdown, max leverage, max positions, instruments allowed/blocked, news restrictions. Edit = explicit re-confirmation.
- **Risk check result** — rule-by-rule verdict table (rule · limit · proposed · result). Header: "Risk Engine — deterministic check", timestamp, engine version. PASS (green) / BLOCKED (red, with exact violated rule) / ATTENTION (amber, within limits but near cap).
- **Permission matrix** — what this mode/bot/AI may and may never do; "never" rows (Withdraw, Change wallet, Change security, Raise own allocation, Override Risk Engine) are permanently locked with a lock glyph and are not toggles.
- **Kill switch** — always-visible pill on any screen with active automation; two-step (hold-to-arm → confirm); stops automation, never touches funds.
- **Fail-closed banner** — Risk Engine unavailable: red system banner, all automated execution CTAs disabled with explanatory tooltip, manual trading unaffected and clearly signposted.

### 3.9 System states

Every data-bearing component defines: loading (skeleton, no spinners >400ms), empty (explanatory + next action), error (what failed, what's safe, retry), plus the five trust states, plus risk-blocked and risk-engine-down where applicable. Reduced-motion variant for all animated states.

---

## 4. Information architecture

```
PUBLIC                      ACCOUNT & SECURITY          CLIENT APP (shell)
├─ Landing                  ├─ Invite / Sign in         ├─ Capital Command Center (home)
├─ Platform (modes)         ├─ KYC / verification       ├─ Trade (workspace)
├─ Intelligence             ├─ Profile & preferences    ├─ Intelligence
├─ Capital transparency     ├─ Security (2FA, devices,  ├─ Copy
├─ Security & control       │   sessions, audit trail)  ├─ Bots
├─ Company / About          ├─ Wallet addresses (view)  ├─ Capital
├─ Legal / Risk disclosure  └─ Notifications            ├─ Activity & Statements
└─ Invite request                                       └─ Account & Security

INTELLIGENCE                CAPITAL                     OPERATIONS (admin/internal)
├─ Intelligence Home        ├─ Overview (Spine)         ├─ Ops dashboard
├─ Copilot (ASK)            ├─ Deposit (on-chain)       ├─ Users & KYC queue
├─ Market Scanner           ├─ Allocate / Rebalance     ├─ Reconciliation monitor
├─ Strategies (list/detail) ├─ Reserved & Pending       │   (chain vs MT5 vs ledger)
├─ Permissions & modes      ├─ Withdraw                 ├─ Risk Engine console (view)
│   (Copilot/Confirm/       ├─ Activity (3-record       ├─ Automation kill controls
│    Autopilot*)            │   reconciled view)        ├─ Audit log explorer
├─ Portfolio Doctor         └─ Statements               └─ System health / trust states
└─ Post-Trade Review
```

\* Autopilot surfaces are designed but gated per compliance recommendation R3 — see §12.

Primary app navigation (left rail, desktop): Home · Trade · Intelligence · Copy · Bots · Capital · Activity · Account. Persistent top strip: Capital Spine summary + trust chip + kill switch (when automation active) + DEMO badge (pre-licence, global).

---

## 5. Complete screen map

**Public (8):** Landing · Platform · Intelligence marketing · Capital transparency · Security & control · About · Legal/Risk · Invite request.

**Auth/Account (9):** Invite code · Sign in · 2FA challenge · KYC intro/steps/status · Profile · Security centre · Devices & sessions · Notifications · Personal audit trail.

**Client app core (10):** Capital Command Center · Trading Workspace · Order ticket (panel/sheet) · Positions & orders · Position detail (+Lens) · Activity feed · Statement detail · Global search · Notifications centre · System status.

**Intelligence (10):** Intelligence Home · Copilot thread · Market Scanner · Scanner result detail · Strategy list · Strategy detail (WHY/CHALLENGE/INVALIDATION) · Risk Check & Confirm · Permissions & modes · Portfolio Doctor (+Exposure Map) · Post-Trade Review journal.

**Copy (5):** Discovery · Provider profile (Strategy DNA) · Start Copying (configure risk) · Copy relationship monitor · Stop/pause flow.

**Bots (6):** Bot dashboard · Bot detail (Bot Health) · Bot setup wizard (upload/connect → permissions → capital/risk → review) · Bot activity log · Kill/stop flow · Marketplace placeholder (later).

**Capital (7):** Capital overview · Deposit · Deposit status (confirmations) · Allocate/Rebalance · Withdraw · Withdrawal status · Reconciled activity.

**Operations (7):** Ops dashboard · KYC queue · Reconciliation monitor · Risk Engine console · Automation controls · Audit explorer · System health.

**Total: 62 screens/surfaces.** Priority 10 wireframed in §7.

---

## 6. Critical user journeys (10)

Format: stages — key screens — design notes. All journeys assume DEMO badge pre-licence.

**J1 · Fund → Allocate → Trade → Reconcile → Withdraw (the spine)**
Deposit (network+asset → address+QR → confirmations n/12, Settlement Pending) → ledger credit (Unallocated, LIVE) → Allocate to Manual (slider + boundary review + confirm; Spine animates the move) → trade in Workspace (Reserved Margin visibly carved) → close (P&L posts → Settlement Pending → reconcile tick: chain/MT5/ledger all ✓) → Withdraw (only from Withdrawable; security re-auth; status tracked). *Every capital movement is one explicit state transition on the Spine.*

**J2 · ASK → ANALYZE → CHALLENGE → BUILD → RISK CHECK → CONFIRM → EXECUTE → MONITOR → REVIEW**
Copilot question → scanner analysis (freshness stamped) → Challenge block (counter-case surfaced *before* build completes) → structured strategy (entry/SL/TP/size) → Risk Engine verdict table (distinct styling) → user confirmation (full order + boundaries restated) → execution record → Position Monitor (thesis validity, invalidation watch) → Post-Trade Review appended to journal. *Lifecycle rail lit at every stage; user can abandon at any stage.*

**J3 · Copy Discovery → Analyze → Configure Risk → Confirm → Monitor**
Discovery ranked by risk-adjusted, verified metrics (never raw ROI) → provider profile: Strategy DNA (drawdown, win/loss size, hold time, concentration, leverage behavior, drift) → "Ask ELVA about this provider" → behavioral analysis, not verdicts → Start Copying: dedicated allocation + risk multiplier + stop-copy conditions → confirm contract → relationship monitor with divergence and drift alerts → pause/stop anytime.

**J4 · Bot Setup → Permissions → Capital/Risk → Activate → Monitor → Kill Switch**
Connect/upload EA → permission matrix (trade: configurable; withdraw/custody/security: permanently locked rows) → dedicated allocation + caps → review contract → activate (Bot Health baseline) → monitor (behavior vs backtest, Backtest/Demo/Live labels never conflated) → kill switch: hold-to-arm → confirm → trading halted, capital untouched, event audited.

**J5 · Invite → KYC → first session (onboarding)**
Invite code → eligibility gate (nationality/residence per geo-policy; US blocked; clear ineligibility message) → KYC steps with status → first-run tour of the four questions (capital, lens, why, boundaries) → demo capital granted, DEMO chip explained on first contact.

**J6 · Deposit with delayed confirmations (trust under waiting)**
Address + network warnings → tx detected (0/12, Settlement Pending, cyan) → progress with explorer link → policy-complete → credited (state flip animation) → if abnormal delay: DELAYED chip + explanation, never a silent stall.

**J7 · Manual trading with AI down (graceful degradation)**
Workspace loads; Lens placeholder: "Intelligence offline — trading unaffected" → full manual ticket, positions, closes function → banner clears when AI returns; no dead panels, no blocked trading.

**J8 · Risk Engine unavailable (fail closed)**
Red system banner → all automated/AI execution CTAs disabled with reason; queued automation halted (audited) → Autopilot/Confirm-mode execution blocked; analysis still available → manual trading unaffected, signposted → recovery banner + audit entry. *The user sees automation is locked precisely because determinism is lost.*

**J9 · Withdrawal with security ceremony**
Withdraw from Withdrawable only (other states shown but locked, with reasons) → amount + whitelisted address → 2FA re-auth → explicit confirm (amount, address, network, finality warning) → status (requested→signed→broadcast→confirmed) → audit trail entry. *AI/bots have no path into this journey by architecture — the UI never even implies one.*

**J10 · Post-trade review → learning loop**
Close position → review card generated (thesis vs outcome, challenge accuracy, invalidation hits, boundary adherence) → journal aggregates behavior patterns → Portfolio Doctor references journal in exposure/behavior warnings. *Frames ELVA as a discipline system, not a signal seller.*

---

## 7. Low-fidelity wireframes — 10 priority screens

Annotations: [CS]=Capital Spine [IL]=Intelligence Lens [RB]=Risk Boundary [TC]=trust chip.

### 7.1 Public Landing Page

```
┌──────────────────────────────────────────────────────────────┐
│ (E) ELVA MARKETS      Platform  Intelligence  Capital  About │ sticky nav
│                                     [Risk notice] [Invite →] │
├──────────────────────────────────────────────────────────────┤
│  HERO (deep navy, restrained gradient wash from logo hues)   │
│  Global Markets. On-Chain Capital.            ┌────────────┐ │
│  Institutional-grade trading with             │ COPILOT     │ │
│  transparent capital and explainable          │ visual demo │ │
│  intelligence.                                │ ASK→…→REVIEW│ │
│  [Request invite]  [See how it works]        │ [DEMO] [TC] │ │
│  ▸ invite-only · demo environment            └────────────┘ │
├──────────────────────────────────────────────────────────────┤
│  MARKETS STRIP  FX · Metals · Indices · Commodities · Crypto │
├──────────────────────────────────────────────────────────────┤
│  FOUR MODES     [Manual] [Copy] [Bot] [AI-assisted] cards    │
├──────────────────────────────────────────────────────────────┤
│  ELVA INTELLIGENCE  Lens mock: WHY / CHALLENGE / INVALIDATION│
├──────────────────────────────────────────────────────────────┤
│  9-STEP LIFECYCLE  horizontal rail, each step one line       │
├──────────────────────────────────────────────────────────────┤
│  TRANSPARENT CAPITAL  Spine diagram, 6 states [DEMO]         │
├──────────────────────────────────────────────────────────────┤
│  SECURITY & CONTROL  AI never withdraws · fail-closed ·      │
│  kill switch · permission matrix excerpt                     │
├──────────────────────────────────────────────────────────────┤
│  EXECUTION TECH → PARTNERS/IB → FAQ                          │
├──────────────────────────────────────────────────────────────┤
│  RISK DISCLOSURE (readable, not fine-print grey)             │
│  FOOTER  full logo lockup · legal · [group line: see C1]     │
└──────────────────────────────────────────────────────────────┘
```

### 7.2 Client App Shell + Capital Command Center

```
┌──┬───────────────────────────────────────────────────────────┐
│N │ TOP: Capital Spine mini [CS]  ·  [TC LIVE]  · [DEMO] ·(⏻) │
│a ├───────────────────────────────────────────────────────────┤
│v │ WHERE IS MY CAPITAL?                                      │
│  │ ┌─────────────────────────────────────────────┐ ┌───────┐ │
│H │ │ Total $25,000 [DEMO]                        │ │ IL    │ │
│T │ │ █████████░░░░ stacked state bar             │ │ digest│ │
│I │ │ Alloc 10k · Reserved 2.4k · Pending 0.6k    │ │ "what │ │
│C │ │ Withdrawable 7k · Unalloc 5k                │ │ ELVA  │ │
│B │ └─────────────────────────────────────────────┘ │ sees" │ │
│C │ MODE CARDS  [Manual][Copy][Bot][AI] alloc+P&L  └───────┘ │
│A │ ┌────────────────────────┐ ┌──────────────────────────┐  │
│  │ │ Open positions (table) │ │ Boundaries snapshot [RB] │  │
│  │ └────────────────────────┘ └──────────────────────────┘  │
│  │ Recent activity — reconciled ✓ chain/MT5/ledger          │
└──┴───────────────────────────────────────────────────────────┘
```

### 7.3 Professional Trading Workspace

```
┌──┬────────────┬──────────────────────────────┬──────────────┐
│N │ WATCHLIST  │ CHART EURUSD [TC LIVE 12:04:31]│ ORDER TICKET │
│a │ fx/metals/ │ (tf, indicators, session)     │ Buy/Sell     │
│v │ crypto     │                               │ size/SL/TP   │
│  │ + spreads  │                               │ margin calc  │
│  ├────────────┤                               │ [RB] caps    │
│  │ IL (coll-  │                               │ inline       │
│  │ apsible):  │                               │ [Confirm]    │
│  │ "ask ELVA  ├──────────────────────────────┴──────────────┤
│  │ about this │ POSITIONS / ORDERS / HISTORY (tabs, table)   │
│  │ market"    │ reconcile ✓ per closed row                   │
└──┴────────────┴──────────────────────────────────────────────┘
AI offline → IL column collapses to placeholder; ticket unaffected.
```

### 7.4 ELVA Intelligence Home

```
┌──┬───────────────────────────────────────────────────────────┐
│  │ ELVA INTELLIGENCE          mode: Copilot ▾ [RB gate]      │
│  │ ┌───────────────────────────────────────────┐ ┌─────────┐ │
│  │ │ ASK bar: "Ask about any market, provider, │ │Lifecycle│ │
│  │ │ bot or your portfolio…"                   │ │rail     │ │
│  │ └───────────────────────────────────────────┘ │ASK→…    │ │
│  │ ACTIVE WORK  strategy cards w/ stage chips    └─────────┘ │
│  │ SCANNER DIGEST [TC]  ·  PORTFOLIO DOCTOR flag (amber)     │
│  │ RECENT REVIEWS (journal teasers)                          │
│  │ footer: "Analysis, not advice. Confidence = setup         │
│  │ confidence, not probability of profit." [DEMO]            │
└──┴───────────────────────────────────────────────────────────┘
```

### 7.5 Strategy Detail — WHY / CHALLENGE / INVALIDATION

```
┌──────────────────────────────────────────────────────────────┐
│ Strategy: EURUSD Breakout (Trend family) [stage: CHALLENGE]  │
│ setup confidence 64 — "setup confidence, not profit odds"    │
├───────────────┬───────────────────┬──────────────────────────┤
│ WHY (cyan)    │ CHALLENGE (offset │ INVALIDATION             │
│ thesis, data, │ border) counter-  │ • close < 1.0840         │
│ session, vol  │ case, event risk, │ • ECB presser volatility │
│ [TC DELAYED]  │ crowding          │ • DXY divergence breaks  │
├───────────────┴───────────────────┴──────────────────────────┤
│ PROPOSED PLAN  entry/SL/TP/size table [RB caps shown]        │
│ [Run Risk Check →]   (Risk Engine verdict = separate block)  │
└──────────────────────────────────────────────────────────────┘
```

### 7.6 AI Permissions + Risk Check + Confirmation

```
┌──────────────────────────────────────────────────────────────┐
│ MODES  [Copilot ✓] [Confirm] [Autopilot 🔒 gated: see C2]    │
├──────────────────────────────────────────────────────────────┤
│ PERMISSION MATRIX [RB]                                       │
│ Analyze ✓ · Build ✓ · Open trade (Confirm-only) ·           │
│ Modify SL/TP (granted ▾) · Close (granted ▾)                 │
│ ─ NEVER (architectural, not toggles) ─                       │
│ 🔒 Withdraw  🔒 Change wallet  🔒 Security  🔒 Raise own      │
│ allocation   🔒 Override Risk Engine                         │
├──────────────────────────────────────────────────────────────┤
│ RISK CHECK — Risk Engine (deterministic) v2.1  12:04:31      │
│ rule            limit      proposed    result                │
│ risk/trade      1.0%       0.8%        PASS ✓                │
│ daily loss cap  $400       $120 used   PASS ✓                │
│ leverage        10x        8x          PASS ✓                │
│ ─────────────────────────────  VERDICT: PASSED               │
├──────────────────────────────────────────────────────────────┤
│ CONFIRM  full order restated + boundaries  [Cancel][Confirm] │
└──────────────────────────────────────────────────────────────┘
```

### 7.7 Copy Trading — Discovery + Provider Profile (Strategy DNA)

```
DISCOVERY: filter bar (market, style, max DD, hold time, Manual/
Bot/Hybrid) → provider cards: verified history len · max DD ·
avg win/avg loss · concentration — never raw-ROI leaderboard.
┌──────────────────────────────────────────────────────────────┐
│ PROFILE: "Atlas FX" verified · 26 mo live [TC]               │
│ STRATEGY DNA  radar/bars: DD, frequency, hold, leverage,     │
│ concentration, drift alert (amber)                           │
│ equity curve [DEMO watermark] + drawdown curve               │
│ [IL] "Ask ELVA about this provider" → behavioral analysis    │
│ [RB] Start Copying: dedicated alloc · multiplier · max pos · │
│ daily loss · stop-copy conditions → [Review contract →]      │
└──────────────────────────────────────────────────────────────┘
```

### 7.8 Bot Trading — Dashboard + Setup + Health

```
DASHBOARD: bot cards (name · status · alloc · today · Health
ring · [Kill ⏻]) + global kill-all.
SETUP WIZARD: 1 Connect EA → 2 Permissions (matrix w/ locked
NEVER rows) → 3 Capital/Risk ([RB] sliders + caps) → 4 Review
contract → Activate.
BOT HEALTH: behavior vs backtest divergence · regime flags ·
drawdown vs cap · Backtest/Demo/Live labels strictly separate.
```

### 7.9 Capital — Deposit / Allocate / Withdraw

```
┌──────────────────────────────────────────────────────────────┐
│ CAPITAL [CS full-width stacked bar, 6 states, animated]      │
│ tabs: Overview · Deposit · Allocate · Withdraw · Activity    │
│ DEPOSIT: asset+network ▾ → address+QR → confirmations 4/12   │
│   [TC] Settlement Pending (cyan) → credited to Unallocated   │
│ ALLOCATE: from Unallocated → mode ▾ → amount slider [RB]     │
│   boundary review → confirm → Spine animates transition      │
│ WITHDRAW: Withdrawable only (locked states listed w/ reason) │
│   whitelisted addr ▾ → 2FA → explicit confirm → status       │
│ ACTIVITY: each row: chain ✓ · MT5 ✓ · ledger ✓ (reconciled)  │
└──────────────────────────────────────────────────────────────┘
```

### 7.10 Portfolio Doctor + Exposure Map

```
┌──────────────────────────────────────────────────────────────┐
│ PORTFOLIO DOCTOR [TC] [DEMO]                                 │
│ ┌──────────────────────────┐ ┌───────────────────────────┐   │
│ │ EXPOSURE MAP treemap by  │ │ FINDINGS (ranked)         │   │
│ │ instrument/currency/mode │ │ ⚠ USD concentration 68%   │   │
│ │ heat = risk share        │ │ ⚠ leverage creep (amber)  │   │
│ └──────────────────────────┘ │ ✓ daily-loss discipline   │   │
│ BEHAVIOR (from journal): revenge-trade flag, session bias   │
│ each finding → [IL] explain → links to [RB] to act          │
└──────────────────────────────────────────────────────────────┘
```

---

## 8. Responsive behavior — priority screens

Global rules: desktop = multi-panel; tablet = two-column, Lens becomes overlay sheet; mobile = single column, bottom tab bar (Home · Trade · Intelligence · Capital · More), Spine mini always in top strip, kill switch floats when automation active. All panels reachable by keyboard at every size; no horizontal overflow at 1440/1280/1024/768/390/375/360.

| Screen | Desktop (≥1024) | Tablet (768) | Mobile (≤390) |
|---|---|---|---|
| Landing | 12-col, hero split text/visual | stacked hero, 2-col cards | single col, nav → sheet, sections stack in same order |
| Command Center | 3-zone (spine/cards/side) | side digest below cards | spine card → mode carousel → positions list |
| Workspace | 4-panel resizable | chart+ticket; watchlist drawer | chart full-width, ticket = bottom sheet, positions tab |
| Intelligence Home | ask + rail side-by-side | rail compact dots | ask bar pinned top, cards stack |
| Strategy Detail | WHY/CHALLENGE/INVALIDATION 3-col | 3 stacked, CHALLENGE never collapsed | accordion, CHALLENGE open by default |
| Permissions/Risk/Confirm | single flow column 640px | same | full-screen steps, one section per screen |
| Copy | table+profile split | profile full page | DNA chart swipeable, config = stepped sheets |
| Bots | card grid 3-up | 2-up | 1-up, kill switch sticky footer |
| Capital | tabs + full spine | same | spine compresses to stacked mini-bars, flows become steppers |
| Portfolio Doctor | map+findings split | map above findings | findings first (actionable), map below |

---

## 9. Component inventory & reusable hierarchy

```
TOKENS (color · type · space · radius · elevation · motion · icon)
└─ PRIMITIVES: Button · Input · Amount · Select · Slider · Toggle ·
   Segmented · Chip · Badge · Tooltip · Modal · Sheet · Banner ·
   Table · Tabs · Skeleton · Toast
   └─ PATTERNS (composed):
      TrustChip · DataStamp · MetricCard · SparkCard · StatusDot ·
      LifecycleRail · ConfidenceChip · SectionHeader · EmptyState ·
      ErrorState · DemoWatermark
      └─ SIGNATURE SYSTEMS (product-level, reused everywhere):
         ▸ CapitalSpine (full / mini / per-mode) — the only way
           balances are ever displayed
         ▸ IntelligenceLens (thread / panel / digest / inline) —
           the only container for AI reasoning
         ▸ RiskBoundary (panel / matrix / verdict / kill switch /
           fail-closed banner) — the only container for limits &
           Risk Engine output
         └─ SCREEN TEMPLATES:
            PublicPage · AppShell · WorkspaceShell · FlowStepper
            (deposit/withdraw/allocate/bot-setup/copy-config) ·
            EntityDetail (position/provider/bot/strategy) ·
            OpsConsole
```

Rule: screens compose signature systems; they never reimplement them. A balance outside CapitalSpine styling, AI text outside the Lens, or a limit outside RiskBoundary is a design defect.

---

## 10. Component × state matrix

States: LIVE · DELAYED · DEMO · STALE · DISCONNECTED · RISK-BLOCKED · RISK ENGINE UNAVAILABLE (REU) · LOADING · EMPTY · ERROR.

| Component | LIVE | DELAYED | DEMO | STALE | DISCONNECTED | RISK-BLOCKED | REU |
|---|---|---|---|---|---|---|---|
| Price chart | green dot + ts | amber chip "+2.4s" | violet chip + watermark | amber "as of 12:01" | red overlay + retry, last data dimmed | n/a | n/a |
| Capital Spine | live values | recalculating note | violet chip on totals | last-reconciled ts | cached + warning | n/a | unaffected (funds ≠ engine) |
| Order ticket | enabled | enabled + lag notice | enabled, demo fills | re-quote on submit | disabled + reason | submit→verdict BLOCKED w/ rule | manual: enabled · automated: disabled |
| Strategy card | fresh stamp | stamp + amber | demo data label | "re-analyze" prompt | hidden, placeholder | shows failed verdict | RISK CHECK stage locked |
| Risk verdict block | verdict + ts | n/a (deterministic, always stamped) | demo chip | verdict expired → re-run | n/a | = its purpose | red REU banner replaces verdict |
| Copy provider card | verified live | delayed metrics chip | demo watermark | metrics age shown | hidden | copy-start blocked w/ rule | new copying disabled |
| Bot card / Health | running pulse | sync lag | demo env label | last-heartbeat age | lost-contact alert + auto-halt note | bot halted w/ rule | all bots halted (fail closed) |
| Copilot thread | answers + freshness footer | notes data lag in answer | demo context notice | flags outdated context | offline placeholder (J7) | explains block, offers manual path | states analysis-only mode |
| Withdraw flow | enabled from Withdrawable | n/a | demo: simulated only, labelled | balances re-fetch | disabled + status link | n/a (no AI path exists) | unaffected — user custody only |
| Activity row | 3-way ✓✓✓ | pending tick | demo chip | reconciliation lag badge | source unreachable flag | n/a | n/a |

LOADING = skeletons mirroring final layout; EMPTY = explanation + next best action; ERROR = cause + safe-state statement + retry. Full 62-screen matrix to be expanded per screen group in Phase B specs.

---

## 11. Accessibility & trust requirements

**Accessibility (WCAG 2.2 AA target):**
- Contrast ≥4.5:1 body, ≥3:1 large/data text on all navy surfaces (token pairs pre-validated; silver-600 is decorative-only).
- Status never by color alone: every trust/risk state = color + icon + text label.
- Full keyboard operability: visible 2px focus ring (cyan-300), logical order, skip links, focus trap in modals/sheets; kill switch and order ticket fully keyboard-operable.
- Screen readers: live regions for price/state changes (throttled), charts carry data summaries, Spine exposes state values as a list, verdict tables are real tables.
- `prefers-reduced-motion`: all state animations get non-motion equivalents; no information exists only in motion.
- Touch targets ≥44px; amount inputs support direct typing, not slider-only.
- Semantic HTML mandated for Phase B; heading hierarchy per screen defined in specs.

**Trust requirements:**
- Every number: source + freshness (trust chip or data stamp). Every demo number: DEMO marking. No exceptions, ever.
- Risk disclosure readable (min 13px, ≥4.5:1), present on landing, onboarding, and every mode-activation flow.
- Irreversible/financial actions: full restatement before confirm; post-action receipt into audit trail; user-visible audit log in Account.
- AI honesty: confidence always suffixed "setup confidence"; Lens content labelled analysis, never advice; no profit language anywhere in UI copy.
- Security ceremony visible: 2FA prompts explain why; device/session list; withdrawal address whitelisting.
- Permission "NEVER" rows rendered as architecture (lock glyph, non-interactive), teaching the custody model through the UI itself.

---

## 12. Conflicts & open questions requiring approval

| # | Item | Detail | Needs |
|---|---|---|---|
| C1 | **NodalWaves footer line** | Handbook allows "Part of the NodalWaves Group" at About/Footer level; compliance R5 recommends dropping it client-facing. Wireframe 7.1 reserves the slot but ships empty until decided. | Founder (+counsel) |
| C2 | **Autopilot in UI scope** | Handbook includes Autopilot; compliance R3 recommends excluding from launch. Proposal: design the mode selector with Autopilot visible but locked ("not available in this phase") so architecture is honest and nothing must be retrofitted. | Founder |
| C3 | **Copy trading live vs. design-only** | R4: screens proceed, live activation gated on permissions. Proposal: full design now, "activation pending" state designed in. | Founder |
| C4 | **Public landing vs. no public financial promotion** | Pre-licence, a public marketing page for a trading product risks being a financial promotion. Proposal: landing v1 ships as brand/technology narrative + invite request, with risk language and demo positioning; no sign-up, no deposit CTA. | Founder + counsel |
| C5 | **Demo-global badge** | I've made DEMO a persistent global badge pre-licence (top strip + per-number chips). Stricter than handbook minimum; recommend keeping. | Founder confirm |
| C6 | **Logo dark-surface variant** | Approved lockup has a navy wordmark on white — unusable on the app's navy surfaces. Need an approved variant: gradient mark + frost-white wordmark. I can prepare it for approval; the mark itself is untouched. | Founder |
| C7 | **Leaderboard framing** | Performance leaderboards are regulated communications. Discovery (7.7) ranks by risk-adjusted verified metrics with no "top earners" framing. Confirm this satisfies intended positioning. | Founder + counsel |
| C8 | **"A World of Opportunity" tagline** | Fine as brand line; borderline as financial promotion copy. Proposal: keep in ceremonial lockup, exclude from marketing headlines pre-counsel. | Founder |
| C9 | **Violet as DEMO color** | New token beyond the stated palette (navy/blue/cyan/silver + status trio), added so demo marking can't be confused with warnings. | Founder confirm |
| C10 | **Ops/Admin visual language** | Proposal: same tokens, denser "console" template, no Gen-Z simplification layer. | Founder confirm |

---

*End of Phase A deliverable. Per the Master Design Prompt: STOPPING here — awaiting approval (and decisions on C1–C10) before any high-fidelity screens or code. Phase B order on approval: 1) Public Landing Page.*
