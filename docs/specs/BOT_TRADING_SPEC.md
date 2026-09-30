# Phase B · Screen Group 8 — Bot Trading + Bot Health + Bot Setup (Spec)

Per Design Architecture v1.0 §7.8 and journey J4. Static prototype in the
approved app shell. Handbook rules in force: a bot can trade, a bot can never
withdraw; kill switch always reachable; Backtest / Demo / Live records never
conflated.

## A. Screen purpose
Run automation inside explicit, audited permissions. The dashboard answers
"what is running and is it healthy"; Bot Health answers "is this bot still the
bot I tested"; the wizard makes granting a bot capital feel like signing a
contract, not flipping a switch.

## B. Information hierarchy
**Dashboard (`bots.html`):** bot cards (status · allocation · today · Health
ring · pause/kill) → Add-a-bot CTA → marketplace placeholder (later roadmap).
**Bot Health (`bot.html?b=`):** health ring + trait breakdown (divergence vs
backtest, drawdown vs cap, execution quality, regime flags) → performance in
three strictly separated labelled blocks (Backtest — author-supplied,
unverified · Demo — platform forward test · Live — verified) → permission
panel recap → Bot Inspector (Lens) → controls (pause / stop with confirm).
**Setup wizard (`bot-setup.html`):** 1 Connect (source + name) → 2 Permissions
(allowed markets + locked NEVER rows) → 3 Capital & risk (allocation, max
daily loss, max position size, max positions, max leverage — validated against
the account boundary profile) → 4 Review contract → Activate (simulated
receipt; Health baseline starts neutral; Live record begins at zero).

## C. Main components
Shared shell · BotCard with SVG Health ring · Health trait meters ·
Performance triptych with record-separation note · Permission recap ·
Inspector Lens block (`lens-body`/`lens-offline`) · 4-step FlowStepper with
validation · per-bot pause/stop confirms · toasts. Demo bots: Momentum-7
(amber — live win-rate 9pts under backtest in ranging regimes) and Grid-2
(healthy). Allocations sum to the Command Center's $3,000 bot figure.

## D. States & edge cases
- **REU / kill switch:** all bots halt fail-closed (dashboard statuses, detail
  banner, wizard activation blocked); recover cleanly. Stopping bots never
  touches funds — stated at every stop point.
- **AI offline:** Bot Inspector commentary degrades; health data, permissions
  and controls stay fully usable (deterministic data ≠ AI).
- **Delayed:** trust chips flip.
- Wizard validation: allocation ≤ $5,000 Unallocated; per-bot caps must not
  exceed the account boundary profile (daily loss ≤ $400, leverage ≤ 10x,
  positions ≤ 8) with named errors; at least one allowed market.
- Backtest block always carries "author-supplied, unverified" and the three
  records are never summed or merged anywhere.
- Unknown `?b=` falls back to Momentum-7. All figures DEMO.

## E. Layout
- Dashboard: 2-up cards ≥900 (+ add/marketplace row), 1-up below.
- Detail: health+performance left (7), permissions+inspector+controls right
  (5) at ≥1100; stacked below. Wizard: single 640px column; full-width steps
  on mobile. No overflow at 390/375/360 on all three pages.

## F. Signature systems
- **Risk Boundary:** permission panel, caps validation, halt states, stop
  confirms — structural.
- **Intelligence Lens:** Bot Inspector only — behavioral, no guarantees,
  degradable.
- **Capital Spine:** allocation context (dedicated, from Unallocated,
  unreachable beyond).

## G. Existing code/components to preserve
- Shell behavior unchanged; rail "Bots" upgrades to links on all app pages;
  Command Center Bots card meta links to the dashboard. No other edits to
  existing pages.

## H. Acceptance criteria
- No horizontal overflow at 1440/1280/1024/768/390/375/360 on all three
  pages; no console errors; keyboard + reduced-motion safe.
- Product-rule audit: "a bot can never withdraw" present in wizard NEVER rows
  and stop copy; records separation explicit; no performance promises.
- States verified programmatically: halt/recover on dashboard + detail +
  wizard, inspector offline, wizard validation errors, full setup path to
  activation receipt, pause/stop flows on both bots.
