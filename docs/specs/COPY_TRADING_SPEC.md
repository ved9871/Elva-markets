# Phase B · Screen Group 7 — Copy Trading + Strategy DNA + Start Copying (Spec)

Per Design Architecture v1.0 §7.7 and journey J3. Static prototype in the
approved app shell. Compliance posture: R4/C3 — full design now, activation
simulated and labelled; no performance-promotional framing anywhere.

## A. Screen purpose
Let a user evaluate strategy providers on verified behavior — never on raw ROI
ranking — understand a provider's Strategy DNA, ask ELVA for behavioral
analysis, and configure copying inside their own Risk Boundary with explicit
stop-copy conditions. Copying is a permission contract, not a bet on a
leaderboard.

## B. Information hierarchy
**Discovery (`copy.html`):** filter/sort bar (classification, market, sort by
verified history / lowest drawdown / consistency — no ROI sort) → provider
cards (verified history length, max drawdown, avg win/avg loss, hold time,
frequency, concentration, Manual/Bot/Hybrid chip, drift/attention flags) →
compliance footnote (verified platform data, demo).
**Profile (`provider.html?p=`):** identity + verified badge + trust chip →
Strategy DNA meters (drawdown control, frequency, holding time, leverage,
concentration; amber attention marks) → equity + drawdown curves (seeded,
DEMO watermark) → "Ask ELVA about this provider" (Lens behavioral analysis,
never verdicts) → Start Copying configurator (Risk Boundary) or, for the
already-copied provider, the Relationship Monitor with pause/stop.

## C. Main components
Shared shell · FilterBar (functional classification filter + sort) ·
ProviderCard · DNA meter row · SVG equity/drawdown curves · Lens analysis
block (`lens-body`/`lens-offline`) · Start Copying stepper: Configure
(dedicated allocation, risk multiplier, max position size, max daily loss,
max allocation drawdown, stop-copy conditions) → Review contract → Confirmed
(simulated receipt) · RelationshipMonitor (your settings, divergence, drift
alert, Pause / Stop with two-step confirm) · toasts.

## D. States & edge cases
- **No ROI ranking anywhere**; sort options are behavioral only; avg win/loss
  shown as a ratio pair, not a profit pitch.
- **Atlas FX** (`?p=atlas`) is already copied → profile shows Relationship
  Monitor instead of the configurator; drift alert amber; Pause and Stop are
  two-step confirms with audit toasts; stop-copy settings shown as the
  governing contract.
- **Meridian / Nordwind** → Start Copying configurator; Nordwind carries
  attention flags (higher drawdown, regime sensitivity) shown honestly.
- **Risk Engine unavailable:** copy execution is automated → fail closed:
  activation confirm blocked; monitor shows "copy execution paused — fail
  closed". **Kill switch:** same halt, until re-enabled.
- **AI offline:** Lens analysis degrades to placeholder; discovery, DNA data
  and configurator remain fully usable (verified data ≠ AI output).
- **Delayed:** trust chips flip. All figures DEMO-labelled; activation
  explicitly "simulated — demo build".
- Allocation input capped by Unallocated ($5,000); validation with clear
  errors; multiplier bounded 0.25–1.5.

## E. Layout
- Discovery: filter bar + 3-up card grid ≥1100, 2-up ≥700, 1-up below.
- Profile: DNA + curves left (7), Lens + config/monitor right (5) at ≥1100;
  stacked below, configurator after DNA. Mobile single column; stepper
  full-width steps. No overflow at 390/375/360.

## F. Signature systems
- **Risk Boundary:** the whole configurator + stop-copy contract + monitor
  limits; structural styling.
- **Intelligence Lens:** only the "Ask ELVA" analysis (behavioral, no
  good/bad verdicts) — cyan, degradable.
- **Capital Spine:** allocation context (from Unallocated; copied capital is a
  dedicated allocation; unallocated unreachable by the provider).

## G. Existing code/components to preserve
- Shell behavior unchanged. Rail "Copy" upgrades to a link on all app pages;
  Command Center's Copy mode card meta links to the Atlas monitor. No other
  changes to existing pages.

## H. Acceptance criteria
- No horizontal overflow at 1440/1280/1024/768/390/375/360 on both pages; no
  console errors.
- Keyboard: filters, sort, DNA page, stepper, pause/stop confirms operable;
  reduced-motion safe.
- Copy audit: no ROI leaderboard, no profit language, drift/attention framed
  as behavior not verdicts, demo labels everywhere, follower capital labelled
  demo.
- States verified programmatically: filter/sort, both profile variants, Lens
  ask + AI-offline, REU and kill blocks on activation and monitor, full
  configure→contract→confirmed path with validation.
