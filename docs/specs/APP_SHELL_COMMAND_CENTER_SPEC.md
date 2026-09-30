# Phase B · Screen Group 2 — Client App Shell + Capital Command Center (Spec)

Per Design Architecture v1.0 (approved) §4, §7.2, §8. Static prototype, demo data only.

## A. Screen purpose
The authenticated home. Answers the four questions at a glance — where is my capital,
what does ELVA see, why does it matter, what are my boundaries — and hosts the
persistent app shell (nav rail, top strip, kill switch, DEMO badge) every later screen
group will reuse.

## B. Information hierarchy
1. Top strip: page title · Capital Spine mini · trust chip · kill switch · DEMO badge
2. Capital Spine card (full): total + stacked state bar + state values
3. Intelligence Lens digest ("What ELVA sees")
4. Mode cards: Manual / Copy / Bot / AI — allocation, day P&L, mode status
5. Open positions table
6. Risk Boundary snapshot (limits vs current usage)
7. Recent activity with three-way reconciliation ticks (chain / MT5 / ledger)

## C. Main components
AppShell (nav rail + top strip) · CapitalSpine full + mini · Lens digest panel ·
ModeCard ×4 · Positions table (responsive card collapse) · Boundary snapshot with
usage meters · Activity rows with reconcile ticks · Kill-switch dialog (two-step,
keyboard-accessible) · System banners (AI offline / Risk Engine unavailable) ·
Demo state switcher (prototype-only control to preview degradation states).

## D. States & edge cases (interactive in the prototype)
- Default: all data DEMO-chipped; per-card violet marking; global DEMO badge.
- **AI offline:** Lens digest → quiet placeholder "Intelligence offline — trading
  unaffected"; AI mode card shows offline chip. Nothing else degrades.
- **Risk Engine unavailable:** red system banner, Bot + AI cards show HALTED —
  fail closed; manual trading explicitly unaffected.
- **Delayed data:** trust chips flip to DELAYED (amber, lag shown), spine shows
  as-of timestamp.
- **Kill switch:** two-step confirm (explicit checkbox + confirm button, no
  hold-gesture dependency); on confirm → automation-stopped banner, Bot/AI cards
  halted, "event logged" note, funds untouched.
- Nav destinations not yet built render disabled with "next screen groups" title.

## E. Layout
- Desktop ≥1280: 220px nav rail; content 12-col — Spine (8) + Lens (4); modes 4-up;
  positions (8) + boundaries (4); activity full.
- 1024–1279: icon-only rail (64px); same content grid.
- Tablet 768: rail hidden → top strip menu; Lens below Spine; modes 2-up.
- Mobile ≤560: bottom tab bar (Home · Trade · Intelligence · Capital · More);
  single column; positions table collapses to cards; kill switch stays reachable
  in top strip. No horizontal page overflow at 390/375/360.

## F. Signature systems
- **Capital Spine:** the only balance presentation (full card + top-strip mini).
- **Intelligence Lens:** the only AI-voiced surface (cyan, "analysis not advice"),
  closable/degradable without affecting trading content.
- **Risk Boundary:** limits shown as a contract with usage meters; amber ≥80% of a
  cap; kill switch and fail-closed banner styled structural (never cyan).

## G. Existing code/components to preserve
- `landing/` untouched; approved logo assets untouched; docs untouched.
- Tokens duplicated from landing CSS for now (no build step); consolidation into a
  shared tokens file is a later refactor task, not this group.

## H. Acceptance criteria
- Breakpoints 1440/1280/1024/768/390/375/360: no horizontal overflow, no overlap,
  no console errors.
- Keyboard: skip link, focus-visible everywhere, dialog focus handling + Esc,
  state toggles and kill flow fully operable without a mouse; reduced-motion safe.
- Product rules visible: AI/bot cannot reach Unallocated (stated on Spine card),
  bots can never withdraw (kill dialog copy), fail-closed behavior demonstrated,
  P&L red/green only for directional truth, every figure demo-labelled.
- Degradation states switchable and visually correct per §10 state matrix.
