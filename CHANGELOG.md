# ELVA Markets — Changelog

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
