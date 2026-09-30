/* ELVA Markets — App Shell prototype · demo state logic only, no product logic */
(function () {
  "use strict";

  var $ = function (id) { return document.getElementById(id); };

  /* ---------- demo state switcher ---------- */
  var simBtn = $("sim-btn"), simMenu = $("sim-menu");
  simBtn.addEventListener("click", function () {
    var open = simMenu.hidden;
    simMenu.hidden = !open;
    simBtn.setAttribute("aria-expanded", open ? "true" : "false");
  });
  document.addEventListener("click", function (e) {
    if (!simMenu.hidden && !e.target.closest(".simctl")) {
      simMenu.hidden = true;
      simBtn.setAttribute("aria-expanded", "false");
    }
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !simMenu.hidden) {
      simMenu.hidden = true;
      simBtn.setAttribute("aria-expanded", "false");
      simBtn.focus();
    }
  });

  /* AI offline */
  $("st-ai").addEventListener("change", function () {
    var off = this.checked;
    $("lens-body").hidden = off;
    $("lens-offline").hidden = !off;
    document.querySelectorAll(".mode-card[data-ai]").forEach(function (card) {
      var live = card.querySelector(".mode-live"), offChip = card.querySelector(".st-off");
      if (offChip) { offChip.hidden = !off; }
      if (live) { live.hidden = off || riskDown || killed; }
    });
  });

  /* Risk Engine unavailable → fail closed */
  var riskDown = false;
  $("st-risk").addEventListener("change", function () {
    riskDown = this.checked;
    $("banner-risk").hidden = !riskDown;
    applyAutomationState();
  });

  /* Delayed data */
  $("st-delay").addEventListener("change", function () {
    var delayed = this.checked;
    document.body.classList.toggle("delayed", delayed);
    $("spine-asof").hidden = !delayed;
    var trust = $("global-trust");
    trust.textContent = delayed ? "DELAYED +2.4s" : "DEMO";
    trust.dataset.state = delayed ? "delayed" : "demo";
    document.querySelectorAll("[data-trust]").forEach(function (chip) {
      chip.textContent = delayed ? "DELAYED · demo" : "DEMO";
    });
  });

  /* ---------- kill switch ---------- */
  var killed = false;
  var dialog = $("kill-dialog"), killBtn = $("kill-btn"), check = $("kd-confirm"), go = $("kd-go");
  var lastFocus = null;

  function openDialog() {
    lastFocus = document.activeElement;
    dialog.hidden = false;
    check.checked = false;
    go.disabled = true;
    check.focus();
  }
  function closeDialog() {
    dialog.hidden = true;
    if (lastFocus) { lastFocus.focus(); }
  }

  killBtn.addEventListener("click", openDialog);
  $("kd-cancel").addEventListener("click", closeDialog);
  check.addEventListener("change", function () { go.disabled = !check.checked; });
  dialog.addEventListener("keydown", function (e) {
    if (e.key === "Escape") { closeDialog(); }
  });
  dialog.addEventListener("click", function (e) {
    if (e.target === dialog) { closeDialog(); }
  });

  go.addEventListener("click", function () {
    killed = true;
    closeDialog();
    $("banner-kill").hidden = false;
    applyAutomationState();
  });
  $("kill-undo").addEventListener("click", function () {
    killed = false;
    $("banner-kill").hidden = true;
    applyAutomationState();
  });

  /* Bot/AI cards: halted when kill switch fired OR Risk Engine down (fail closed) */
  function applyAutomationState() {
    var halted = killed || riskDown;
    var aiOff = $("st-ai").checked;
    document.querySelectorAll(".mode-card[data-auto]").forEach(function (card) {
      var live = card.querySelector(".mode-live"), halt = card.querySelector(".st-halt"), offChip = card.querySelector(".st-off");
      card.classList.toggle("is-halted", halted);
      if (halt) { halt.hidden = !halted; }
      if (live) { live.hidden = halted || (card.hasAttribute("data-ai") && aiOff); }
      if (offChip && halted) { offChip.hidden = true; }
    });
  }
})();
