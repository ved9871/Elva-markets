/* ELVA — AI Permissions + Risk Check + Confirmation · demo flow, nothing executes */
(function () {
  "use strict";

  var $ = function (id) { return document.getElementById(id); };

  var mode = "confirm";
  var step = 1;

  /* ---------- already-executing variant ---------- */
  var flowParam = (/[?&]flow=([^&]+)/.exec(location.search) || [])[1];
  if (flowParam === "xauusd-meanrev") {
    $("flow-none").hidden = false;
    $("flow").hidden = true;
  }

  /* ---------- mode selector ---------- */
  var MODE_NOTES = {
    copilot: "Copilot — analysis and recommendations only. You execute every trade yourself.",
    confirm: "Confirm — ELVA prepares each action; nothing executes until you explicitly approve it, and every action passes the Risk Engine first."
  };
  function setMode(m) {
    mode = m;
    $("m-copilot").classList.toggle("active", m === "copilot");
    $("m-copilot").setAttribute("aria-pressed", m === "copilot");
    $("m-confirm").classList.toggle("active", m === "confirm");
    $("m-confirm").setAttribute("aria-pressed", m === "confirm");
    $("mode-note").textContent = MODE_NOTES[m];
    var open = $("mx-open");
    if (m === "copilot") { open.textContent = "No — Copilot mode"; open.className = "mx-state no"; }
    else { open.textContent = "With your approval"; open.className = "mx-state cond"; }
    $("mode-gate").hidden = m === "confirm";
    $("s1-next").disabled = m !== "confirm";
    toast("Mode set to " + (m === "confirm" ? "Confirm" : "Copilot") + " — change logged to your audit trail (demo).");
  }
  $("m-copilot").addEventListener("click", function () { setMode("copilot"); });
  $("m-confirm").addEventListener("click", function () { setMode("confirm"); });

  /* ---------- permission toggles ---------- */
  function wireToggle(id, label) {
    $(id).addEventListener("change", function () {
      toast("Permission “" + label + "” " + (this.checked ? "granted" : "revoked") + " — logged to your audit trail (demo).");
    });
  }
  wireToggle("pg-sltp", "Modify stop loss / take profit");
  wireToggle("pg-close", "Close trades");

  /* ---------- toast ---------- */
  var toastTimer;
  function toast(msg) {
    var t = $("perm-toast");
    t.textContent = msg;
    t.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { t.hidden = true; }, 3800);
  }

  /* ---------- flow ---------- */
  function killed() { return !$("banner-kill").hidden; }
  function riskDown() { return $("st-risk") && $("st-risk").checked; }

  function showStep(n) {
    step = n;
    [1, 2, 3, 4].forEach(function (i) {
      $("step-" + i).hidden = i !== n;
    });
    document.querySelectorAll("#steps li").forEach(function (li) {
      var s = parseInt(li.dataset.step, 10);
      li.classList.toggle("on", s === n);
      li.classList.toggle("done", s < n);
    });
    refreshBlocks();
    $("step-" + n).focus();
  }

  function refreshBlocks() {
    /* kill switch blocks the whole flow */
    var blockedByKill = killed() && step < 4;
    $("flow-blocked").hidden = !blockedByKill;
    if (blockedByKill) {
      $("flow-blocked-msg").innerHTML = "<strong>Automation is stopped.</strong> This proposal cannot execute while the kill switch is active. Re-enable automation from the banner above to continue.";
    }
    /* risk engine state drives step 2 */
    if (step === 2) {
      var down = riskDown();
      $("rc-ok").hidden = down;
      $("rc-down").hidden = !down;
      $("s2-next").disabled = down || blockedByKill;
      if (!down) {
        var now = new Date();
        $("rc-stamp").textContent = "Risk Engine v2.1 · deterministic · checked " +
          ("0" + now.getHours()).slice(-2) + ":" + ("0" + now.getMinutes()).slice(-2) + ":" + ("0" + now.getSeconds()).slice(-2) + " · demo";
      }
    }
    if (step === 3) {
      $("s3-go").disabled = riskDown() || blockedByKill;
    }
    $("s1-next").disabled = mode !== "confirm" || blockedByKill;
  }

  $("s1-next").addEventListener("click", function () { showStep(2); });
  $("s1-dismiss").addEventListener("click", function () {
    toast("Proposal dismissed — nothing was executed. Logged (demo).");
    $("flow").hidden = true;
    $("flow-none").hidden = false;
    $("flow-none").querySelector("p").innerHTML = "<strong>Nothing awaiting confirmation.</strong><br>You dismissed the EURUSD proposal. ELVA will not re-raise it unless the setup materially changes.";
  });
  $("s2-back").addEventListener("click", function () { showStep(1); });
  $("s2-next").addEventListener("click", function () { if (!riskDown()) { showStep(3); } });
  $("s3-cancel").addEventListener("click", function () { showStep(1); toast("Cancelled — nothing was executed."); });
  $("s3-go").addEventListener("click", function () {
    if (riskDown() || killed()) { refreshBlocks(); return; }
    var now = new Date();
    $("rcp-time").textContent = ("0" + now.getHours()).slice(-2) + ":" + ("0" + now.getMinutes()).slice(-2) + ":" + ("0" + now.getSeconds()).slice(-2) + " GST · demo";
    showStep(4);
  });

  /* shared demo-state hooks */
  if ($("st-risk")) { $("st-risk").addEventListener("change", refreshBlocks); }
  ["kill-undo", "kd-go"].forEach(function (id) {
    var el = $(id);
    if (el) { el.addEventListener("click", function () { setTimeout(refreshBlocks, 0); }); }
  });

  refreshBlocks();
})();
