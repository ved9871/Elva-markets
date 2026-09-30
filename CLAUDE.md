# ELVA Markets — Claude Code Project Context

**Purpose of this file:** permanent working context for any Claude Code session on this
project. Read this first, every session, before touching architecture, product, or copy.

**Status:** pre-licence. MVP / investor-demo / closed-beta stage. No real client money.
Custody model not yet decided.

---

## 1. What ELVA Markets is

A multi-asset trading platform, built out of Dubai/UAE, intended to combine:

- **Markets:** Forex, Gold/Metals, Indices, Commodities, Crypto. Architecture stays
  multi-asset even if launch is Forex-first.
- **Funding:** on-chain stablecoin deposits initially, credited to an internal
  double-entry ledger. Broader wallet/network support later.
- **Execution:** MT5 at launch. Native ELVA terminal later.
- **Trading modes:** Manual, Copy, Bot/Algo (incl. bring-your-own EA), AI-assisted.
- **ELVA Intelligence:** AI layer that analyses markets, builds and challenges
  strategies, and in "Autopilot" mode may execute inside pre-approved permission
  boundaries. A separate deterministic Risk Engine — not the language model — enforces
  hard limits.
- **Transparent Capital Layer:** user-facing capital states (Total, Trading Allocation,
  Reserved Margin, Settlement Pending, Withdrawable, Unallocated).
- **Later roadmap:** Liquidity OS (multi-LP feeds, routing, hedging), institutional API,
  brokerage-as-a-service, public bot marketplace.
- **Branding:** currently positioned as "Part of the NodalWaves Group" in About/Footer
  level communication. **See the risk flag in section 4.**

The authoritative product baseline is the founder's **ELVA Master Execution Handbook
v1.0**. That document is the locked baseline. Everything in `/docs` here is research and
analysis layered on top of it.

---

## 2. Non-negotiable rules carried from the handbook

These are hard constraints, not suggestions. Do not design around them.

1. Blockchain is not the high-speed trading engine.
2. MT5 trades must never be described as on-chain trades.
3. The internal double-entry ledger is the accounting source-of-truth for consolidated
   financial obligations.
4. Blockchain records, MT5 records and the internal ledger must reconcile continuously.
5. AI reasoning and the deterministic Risk Engine are separate systems.
6. AI cannot override the Risk Engine or custody controls.
7. Manual trading must remain available even if the AI service is down.
8. If the Risk Engine is unavailable, automated execution must fail closed.
9. A bot can trade. A bot can never withdraw.
10. AI withdrawal access is disabled by architecture, not by a UI toggle.
11. AI suggests → Risk Engine validates → user permission checked → Execution Engine
    executes → monitoring and reconciliation follow.

**Positioning discipline:** do not market ELVA as "fully on-chain trading" when execution
is off-chain. Do not market AI as a profit engine. Do not overstate uniqueness. Any
number shown in a prototype or in marketing must be labelled demo/illustrative unless it
comes from real platform data.

---

## 3. Approval boundaries

Decide freely: component and code organisation, implementation detail, small UX polish
inside an approved flow, responsive behaviour, animation technique, performance work,
task sequencing inside a milestone, bug fixes that don't change product logic.

Escalate to founder, do not decide: new or removed features, business model / pricing /
fees, money-flow or capital-state changes, custody / wallet / withdrawal changes, AI
authority or automation changes, Risk Engine rules, copy-trading economics or control
logic, bot permissions, liquidity/risk model, major brand or UX direction, blockchain
architecture, and any claim about licensing, performance or guarantees.

When product logic is unclear: preserve the system, document the question, propose options
with trade-offs, escalate. Do not guess.

---

## 4. Compliance guardrails that bind engineering and copy

Summary only — full detail in `docs/ELVA_RESEARCH_FINDINGS.md`. **None of this is legal
advice. UAE-qualified regulatory counsel must confirm before any licence application,
before accepting any deposit, and before any public launch.**

- **Pre-licence, the product is demo-only.** No real deposits, no real trading, no public
  financial promotion, invite-only access. Accepting real money from UAE residents without
  a licence — including via an offshore "closed beta" — carries imprisonment of at least
  one year and fines up to AED 250 million under Federal Decree-Law No. 33 of 2025.
- **This stack is not one licence.** Leveraged FX/CFD dealing, virtual-asset
  custody/transfer, discretionary management (copy trading and AI Autopilot) and financial
  promotion are separately regulated activities. A financial free zone — DIFC (DFSA) or
  ADGM (FSRA) — is the only UAE route that holds all of them under one regulator. VARA
  cannot licence FX/CFD brokerage. Onshore CMA Category 1 needs AED 30m paid-up capital.
- **Recommended launch shape:** non-custodial. Clients contract with and fund a licensed
  broker or licensed custodian. ELVA supplies the interface and analytics. This removes the
  custody licence and roughly halves capital requirements.
- **AI Autopilot is the highest-risk feature.** Regulators will likely treat it as
  discretionary fund management. Keep it out of the first licence application and out of
  launch scope. Ship AI as analysis and explanation only. The Risk Engine is good design
  but does not change the legal characterisation.
- **Copy trading needs a management or advice permission**, not just a brokerage licence.
  Performance leaderboards are regulated communications.
- **NodalWaves branding is a flagged risk.** Tying a regulated broker's brand to a token
  project already carrying securities-law exposure imports that scrutiny into the licence
  application, where group structure and fitness-and-propriety are examined. Recommendation
  on the table: drop "Part of the NodalWaves Group" from client-facing materials until
  counsel clears it, and keep any token/ELVA economic link (fee discounts, rewards,
  governance) out entirely.
- **Engineering must stay licence-ready:** client-money and client-asset segregation,
  continuous reconciliation, audit logging of every sensitive action, KYC-based
  geo-blocking (block US persons entirely; block EU/UK unless licensed there), Travel Rule
  data on crypto transfers, and eight-year retention of marketing records.
- **Never share with AI tools:** private keys, seed phrases, exchange API secrets, MT5
  manager/admin passwords, production DB credentials, cloud root credentials, signing keys,
  raw customer personal data.

---

## 5. Copy and marketing rules

Applies to the landing page, the app, and every channel.

- No yield, APY, return, income or price-prediction language. No "earn passive income".
- No profit framing for the AI. A confidence score, if used, must be defined as model or
  setup confidence — never presented as a probability of profit.
- No claim that losses can never exceed allocation. Gaps, slippage and liquidation
  mechanics can exceed intended limits.
- Demo numbers labelled as demo, everywhere, every time.
- Risk warnings present. Marketing must be fair, clear, not misleading, and clearly
  identifiable as marketing.
- Avoid casino styling: no meme-coin visuals, rockets, flashing profit numbers, confetti,
  fake countdowns, "100x", fake urgency.
- Use: deep black/navy, electric blue/cyan, cool silver/white, restrained glow, premium
  glass surfaces, crisp data visualisation, generous spacing.
- Tone: premium, modern, calm, trustworthy, fast, intelligent.

---

## 6. Repository conventions from the handbook

Source-of-truth docs:

```
/docs/ELVA_MASTER_PLAN.md        business/product baseline
/docs/ELVA_PRODUCT_CONTEXT.md    product rules and terminology
/docs/ELVA_ARCHITECTURE.md       system architecture
/docs/ELVA_AI_RULES.md           Intelligence permissions and flows
/docs/DECISIONS.md               approved decisions and rationale
/CHANGELOG.md                    implemented changes and unresolved issues
```

Branches: `main` (production-ready), `dev` (integration), `feature/*` per feature. Never
overwrite the only working version. Every meaningful feature gets a branch, review, test,
commit, merge path.

Frontend QA breakpoints: desktop 1440 / 1280 / 1024, mobile 390 / 375 / 360. No horizontal
overflow, no overlapping cards or text, no console errors, keyboard and accessibility
states checked.

Capital QA: deposit credit matches confirmation policy, ledger stays balanced, MT5 balance
reconciliation works, P&L posting consistent, withdrawal eligibility correct, allocation
boundaries enforced, AI/bot cannot reach unallocated capital, Risk Engine blocks invalid
automated trades, audit logs capture approvals and execution.

---

## 7. How to work with Claude on this project

1. Give current product context and the relevant files.
2. Ask for inspection before editing.
3. Ask for a change plan first. Review the plan.
4. Approve one small scoped task.
5. Implement only the approved scope.
6. Run locally and test.
7. Self-review as frontend / UX / fintech / security reviewer.
8. Fix issues without redesigning approved sections.
9. Commit only after QA passes.

Task prompt shape: **TASK** (one feature) / **KEEP** (what must not change) / **CHANGE** /
**PRODUCT RULES** (relevant capital, risk, AI, custody constraints) / **DESIGN REFERENCE**
(learn from, never clone) / **ACCEPTANCE CRITERIA**.

Claude is an implementation copilot. Not the product owner, not the founder, not the final
architecture authority. Research findings may improve implementation; they do not
automatically become product requirements.

---

## 8. Contents of /docs in this pack

| File | What it holds |
|---|---|
| `ELVA_RESEARCH_FINDINGS.md` | Feasibility verdict, comparable companies, UAE licensing pathway, cross-border exposure, phased launch plan, risk register |
| `ELVA_UNIT_ECONOMICS.md` | How the business makes money, per-lot and per-client maths, revenue scenarios, break-even logic |
| `ELVA_MARKETING_CHANNELS.md` | Digital and offline channel list, ad-platform licence gating, recommended sequencing |
| `ELVA_GLOSSARY.md` | Industry terminology — MT4/MT5, CFD, A-book/B-book, custody, VASP, the UAE regulators |
| `DECISIONS.md` | Decision log and the open questions that still need a founder or counsel answer |

These were produced in a research and analysis session dated 30 September 2026. Figures
drawn from industry sources are labelled as such. Re-verify regulatory figures at the point
of application — the UAE regime changed materially in 2026 and much published guidance is
already stale.
