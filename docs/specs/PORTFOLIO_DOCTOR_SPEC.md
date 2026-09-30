# Phase B · Screen Group 9 — Portfolio Doctor + Exposure Map (Spec)

Per Design Architecture v1.0 §7.10. Static prototype in the approved app shell,
under the Intelligence domain.

## A. Screen purpose
The account-level checkup: where risk is concentrated, how behavior is
drifting, and which boundary or control to touch about it. Metrics are
deterministic measurements; only the commentary is AI — and the page keeps
that separation visible.

## B. Information hierarchy
1. Header: Portfolio Doctor · checkup timestamp · trust chip · DEMO
2. Doctor's summary (Lens voice — degrades when AI offline)
3. Exposure Map: treemap of open-risk share, group-by toggle
   (Currency / Instrument / Mode); heat = risk share; flagged cells amber
4. Findings, ranked by severity: each with measurement, Explain (Lens) and
   an Act → link into the relevant Risk Boundary surface
5. Behavior (from your journal): session bias, early exits
6. Disclaimer footer

## C. Main components
Shared shell (Intelligence rail active) · Lens summary block
(`lens-body`/`lens-offline`) · Treemap (slice-and-dice, absolutely positioned
cells, % labels, amber flag styling, group-by segmented control) · FindingRow
(severity chip green ✓ / amber ⚠ + inline Explain toggle + Act link) ·
Behavior panel · demo dataset consistent with the rest of the prototype
(USD 68% finding matches Command Center / Intelligence Home).

## D. States & edge cases
- **AI offline:** Doctor summary → placeholder; per-finding Explain disabled
  with note; map and measured findings remain (deterministic data ≠ AI).
- **Delayed:** trust chips flip (shared switch).
- **REU / kill:** shell banners only — nothing executes from this page; Act
  links navigate to the surfaces that own the controls.
- Findings include at least one green (discipline holding) so the page reads
  as measurement, not alarm theater; amber only where attention is due; no
  red unless genuine breach (none in demo).
- Treemap group-by recomputes cells; each grouping sums to 100% of open risk;
  cells carry accessible labels.

## E. Layout
- Desktop ≥1100: map (7) + findings (5); summary full-width above; behavior
  below map.
- 768–1099: summary, map, findings, behavior stacked.
- ≤560: **findings first** (actionable), then map, per §8 responsive table;
  no overflow at 390/375/360.

## F. Signature systems
- **Intelligence Lens:** summary + Explain commentary only.
- **Risk Boundary:** severity framing and every Act destination (boundaries,
  copy monitor, bot health); no cyan on measurements.
- **Capital Spine:** top-strip mini; risk shares expressed against allocation.

## G. Existing code/components to preserve
- Shell behavior unchanged; `intelligence.html` Doctor card upgrades
  "Open full checkup →" to a real link. No other edits to existing pages.

## H. Acceptance criteria
- No horizontal overflow at 1440/1280/1024/768/390/375/360; no console errors.
- Keyboard: group-by toggle, Explain toggles, Act links operable; treemap
  cells have text alternatives; reduced-motion safe.
- Copy audit: measurements phrased as measurements, explanations as analysis
  not advice; no profit language; DEMO everywhere.
- States verified programmatically: group-by recompute (sums to 100), Explain
  toggle, AI-offline summary + disabled explains + restore, mobile order
  (findings before map).
