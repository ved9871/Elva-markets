# Phase B · Screen Group 3 — Professional Trading Workspace (Spec)

Per Design Architecture v1.0 §7.3. Static prototype inside the approved app shell,
demo data only, deterministic (seeded) chart data.

## A. Screen purpose
The manual-trading surface: watch markets, read a chart, place an order inside
visible Risk Boundaries. Professional density; must remain fully usable with the
Intelligence panel closed or offline (handbook rule 7), and its Risk Engine check
must read as deterministic verdict, never AI voice.

## B. Information hierarchy
1. Symbol header: name, bid/ask (data face), spread, session, trust chip
2. Chart: candlesticks, timeframe switch, SL/TP preview lines, DEMO watermark
3. Order ticket: side, type, size, SL/TP, margin + risk estimate, Risk Engine
   preview verdict, two-step confirm
4. Watchlist: grouped symbols (FX/Metals/Indices/Commodities/Crypto), bid/ask/chg
5. Intelligence Lens (collapsible): "Ask ELVA about this market" mini-analysis
6. Bottom tabs: Positions / Orders / History (history rows carry reconcile ticks)

## C. Main components
AppShell reused (rail, top strip, banners, kill dialog, tab bar) · Watchlist ·
SVG candle chart (seeded PRNG, no chart library) · OrderTicket with inline
RiskBoundary caps + Risk verdict block · Lens mini panel (same ids as Command
Center so the shared demo-state switcher drives it) · Positions/Orders/History
tables with responsive card collapse · order toast.

## D. States & edge cases
- All market data DEMO; chart carries diagonal DEMO watermark; header trust chip
  responds to the shared "Data delayed" toggle (amber DELAYED + lag).
- **AI offline:** Lens collapses to placeholder; ticket and chart unaffected.
- **Risk Engine unavailable:** banner shows; manual ticket stays enabled (manual
  trading is not gated by the Risk Engine for entry in this prototype, per
  handbook: fail-closed applies to automated execution). Ticket's risk preview
  shows "verdict unavailable" rather than silently passing.
- Ticket validation: stop loss required by the demo boundary profile; risk >
  1.0% of allocation → BLOCKED verdict with the violated rule; confirm restates
  the full order before simulated execution; executed orders append to
  Positions with an "Executed · demo" toast. Nothing real is placed.
- Kill switch present; halts nothing here (no automation on this screen) but
  remains reachable per shell contract.

## E. Layout
- Desktop ≥1100: grid `watchlist+lens (250px) | chart (flex) | ticket (300px)`,
  tables spanning under chart+ticket.
- 768–1099: watchlist becomes a horizontal symbol strip above the chart; ticket
  beside chart at ≥900, below it under 900; lens after tables.
- Mobile ≤560: symbol select in chart header, chart full width, floating
  "New order" button opens the ticket as a bottom sheet (Esc/backdrop closes),
  tabs below; tab bar persists. No horizontal page overflow at 390/375/360.

## F. Signature systems
- **Capital Spine:** top-strip mini (unchanged); ticket shows allocation context
  ("Manual allocation $10,000 · demo") — balances only in Spine styling.
- **Intelligence Lens:** the only AI voice; collapsible; offline state designed.
- **Risk Boundary:** caps inline in the ticket (risk %, leverage, positions),
  verdict block styled structural (green PASS / red BLOCKED + rule), never cyan.

## G. Existing code/components to preserve
- `app/index.html`, `app/app.css`, `app/app.js` behavior and ids; landing; docs.
- Rail/tab "Trade" items upgrade from disabled to real links on both pages —
  no other nav changes.

## H. Acceptance criteria
- Breakpoints 1440/1280/1024/768/390/375/360: no horizontal overflow, no console
  errors; chart redraws on resize without overflow.
- Keyboard: full ticket flow operable; sheet focus handling + Esc; tabs operable.
- Product rules: risk preview labelled "Risk Engine — deterministic check";
  confidence absent (no AI numbers in ticket); AI panel closable/offline with
  trading unaffected; all figures demo-labelled; red/green only directional.
- Shared demo-state switcher works identically on this page.
