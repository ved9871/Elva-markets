/* ELVA — Capital: spine state machine, deposit/allocate/withdraw flows, reconciled activity · all simulated */
(function () {
  "use strict";
  var $ = function (id) { return document.getElementById(id); };

  /* ---------- capital state (page-local, demo) ---------- */
  var S = { active: 12800, res: 3200, pen: 850, wd: 3150, un: 5000 };
  var DEFS = [
    ["active", "ms-active", "Active allocation", "Capital working inside your trading modes."],
    ["res", "ms-res", "Reserved margin", "Held against your current open positions."],
    ["pen", "ms-pen", "Settlement pending", "Realized results awaiting reconciliation."],
    ["wd", "ms-wd", "Withdrawable", "Eligible to leave the platform right now."],
    ["un", "ms-un", "Unallocated", "Yours, held apart — unreachable by AI and bots."]
  ];

  function money(v) { return "$" + Math.round(v).toLocaleString("en-US"); }
  function total() { return S.active + S.res + S.pen + S.wd + S.un; }

  function renderSpine() {
    $("cs-total").textContent = money(total());
    $("cs-bar").innerHTML = DEFS.map(function (d) {
      var v = S[d[0]];
      return '<span class="seg ' + d[1] + '" style="flex:' + Math.max(v, 1) / 100 + '"><i>' + d[2] + "</i></span>";
    }).join("");
    $("cs-bar").setAttribute("aria-label", "Capital states — " + DEFS.map(function (d) {
      return d[2] + " " + money(S[d[0]]);
    }).join(", ") + " — demo");
    $("cs-legend").innerHTML = DEFS.map(function (d) {
      return '<li><span class="swatch ' + d[1] + '"></span>' + d[2] + ' <span class="data">' + money(S[d[0]]) + "</span></li>";
    }).join("");
    $("ov-states").innerHTML = DEFS.map(function (d) {
      return '<div class="state"><h3>' + d[2] + ' <span class="data">' + money(S[d[0]]) + "</span></h3><p>" + d[3] + "</p></div>";
    }).join("");
    $("al-avail").textContent = money($("al-dir").value === "to" ? S.un : S.active);
    $("wd-avail").textContent = money(S.wd);
    $("wd-locked").innerHTML = [
      ["Active allocation", S.active, "working in trading modes"],
      ["Reserved margin", S.res, "held against open positions"],
      ["Settlement pending", S.pen, "awaiting reconciliation"],
      ["Unallocated", S.un, "release rules apply — beyond demo scope"]
    ].map(function (r) {
      return '<li><span class="lock" aria-hidden="true">🔒</span><span class="data">' + money(r[1]) + "</span> " + r[0] + " — " + r[2] + "</li>";
    }).join("");
  }

  /* ---------- activity ---------- */
  var ACTS = [
    ["trade", "<strong>Trade closed</strong> EURUSD +$89", [["MT5 ✓", ""], ["Ledger ✓", ""]], "12:38"],
    ["allocation", "<strong>Allocation</strong> $2,000 → AI (Confirm mode)", [["Ledger ✓", ""], ["Audit ✓", "tick-note"]], "11:04"],
    ["deposit", "<strong>Deposit</strong> 5,000 USDC credited", [["Chain ✓ 12/12", ""], ["Ledger ✓", ""]], "09:52"],
    ["withdrawal", "<strong>Withdrawal</strong> 1,000 USDC confirmed", [["Chain ✓", ""], ["Ledger ✓", ""], ["Audit ✓", "tick-note"]], "Yesterday"]
  ];
  var filter = "all";
  function renderActs() {
    $("act-list").innerHTML = ACTS.filter(function (a) { return filter === "all" || a[0] === filter; })
      .map(function (a) {
        return '<li data-k="' + a[0] + '"><span class="act-what">' + a[1] + "</span>" +
          '<span class="act-rec">' + a[2].map(function (t) { return '<span class="tick ' + t[1] + '">' + t[0] + "</span>"; }).join("") + "</span>" +
          '<span class="act-when data">' + a[3] + "</span></li>";
      }).join("") || '<li><span class="act-what">No events of this type yet (demo).</span></li>';
  }
  function addAct(kind, what, recs) {
    var now = new Date();
    ACTS.unshift([kind, what, recs, ("0" + now.getHours()).slice(-2) + ":" + ("0" + now.getMinutes()).slice(-2)]);
    renderActs();
  }
  document.querySelectorAll(".fseg").forEach(function (b) {
    b.addEventListener("click", function () {
      document.querySelectorAll(".fseg").forEach(function (x) { x.classList.remove("active"); x.setAttribute("aria-pressed", "false"); });
      b.classList.add("active"); b.setAttribute("aria-pressed", "true");
      filter = b.dataset.f;
      renderActs();
    });
  });

  /* ---------- tabs ---------- */
  var TABS = ["overview", "deposit", "allocate", "withdraw", "activity"];
  function showTab(key) {
    TABS.forEach(function (k) {
      $("t-" + k).classList.toggle("active", k === key);
      $("t-" + k).setAttribute("aria-selected", k === key);
      $("p-" + k).hidden = k !== key;
    });
  }
  TABS.forEach(function (k) {
    $("t-" + k).addEventListener("click", function () { showTab(k); });
  });
  var tabParam = (/[?&]tab=([^&]+)/.exec(location.search) || [])[1];
  if (tabParam && TABS.indexOf(tabParam) > -1) { showTab(tabParam); }

  /* ---------- toast ---------- */
  var toastTimer;
  function toast(msg) {
    var t = $("cap-toast");
    t.textContent = msg; t.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { t.hidden = true; }, 4200);
  }

  /* ---------- deposit (J6) ---------- */
  var DP_AMT = 2000, dpTimer = null, dpRunning = false;
  function updWarn() {
    $("dp-warn").innerHTML = "Send only <strong>" + $("dp-asset").value + " on " + $("dp-net").value + "</strong> to this address. Assets sent on the wrong network are lost.";
  }
  $("dp-asset").addEventListener("change", updWarn);
  $("dp-net").addEventListener("change", updWarn);
  $("dp-copy").addEventListener("click", function () { toast("Demo address copied — it is not a real deposit address."); });
  $("dp-send").addEventListener("click", function () {
    if (dpRunning) { return; }
    dpRunning = true;
    $("dp-send").disabled = true;
    $("dp-track").hidden = false;
    var chip = $("dp-chip");
    chip.className = "chip-pending"; chip.textContent = "SETTLEMENT PENDING";
    var conf = 0;
    var delayed = $("st-delay") && $("st-delay").checked;
    S.pen += DP_AMT; renderSpine();
    addAct("deposit", "<strong>Deposit detected</strong> " + DP_AMT.toLocaleString("en-US") + " " + $("dp-asset").value, [["Chain ⧗ 0/12", "tick-pend"], ["Ledger — pending", "tick-note"]]);
    function tick() {
      conf++;
      $("dp-conf").textContent = conf + " / 12 confirmations" + (delayed ? " · DELAYED feed" : "");
      $("dp-meter").style.width = (conf / 12 * 100) + "%";
      if (conf < 12) {
        dpTimer = setTimeout(tick, delayed ? 550 : 280);
      } else {
        S.pen -= DP_AMT; S.un += DP_AMT; renderSpine();
        chip.className = "chip-pending credited"; chip.textContent = "CREDITED";
        $("dp-note").textContent = "Confirmation policy complete. " + DP_AMT.toLocaleString("en-US") + " " + $("dp-asset").value + " credited to Unallocated — ledger entry LDG-1187 posted, reconciled against the chain record.";
        ACTS.shift();
        addAct("deposit", "<strong>Deposit credited</strong> " + DP_AMT.toLocaleString("en-US") + " " + $("dp-asset").value + " → Unallocated", [["Chain ✓ 12/12", ""], ["Ledger ✓", ""]]);
        toast("Deposit credited to Unallocated (simulated).");
        dpRunning = false;
        $("dp-send").disabled = false;
      }
    }
    tick();
  });

  /* ---------- allocate (J1) ---------- */
  $("al-dir").addEventListener("change", function () {
    $("al-avail").textContent = money(this.value === "to" ? S.un : S.active);
    $("al-hint").firstChild.textContent = this.value === "to" ? "Available Unallocated: " : "Active allocation (movable part): ";
  });
  $("al-go").addEventListener("click", function () {
    var amt = parseFloat($("al-amt").value);
    var toMode = $("al-dir").value === "to";
    var cap = toMode ? S.un : S.active;
    var err = null;
    if (isNaN(amt) || amt < 50) { err = "Minimum move is $50."; }
    else if (amt > cap) { err = "Amount exceeds " + (toMode ? "Unallocated (" : "movable Active allocation (") + money(cap) + ")."; }
    $("al-err").hidden = !err;
    if (err) { $("al-err").textContent = err; return; }
    $("al-confirm-msg").textContent = toMode
      ? "Move " + money(amt) + " from Unallocated into " + $("al-mode").value + "? Its boundary caps apply immediately, and the capital becomes reachable by that mode only."
      : "Return " + money(amt) + " from " + $("al-mode").value + " (Active allocation) to Unallocated? It becomes unreachable by all automation.";
    $("al-confirm").hidden = false;
    $("al-yes").focus();
  });
  $("al-cancel").addEventListener("click", function () { $("al-confirm").hidden = true; });
  $("al-yes").addEventListener("click", function () {
    var amt = parseFloat($("al-amt").value);
    var toMode = $("al-dir").value === "to";
    if (toMode) { S.un -= amt; S.active += amt; } else { S.active -= amt; S.un += amt; }
    renderSpine();
    $("al-confirm").hidden = true;
    addAct("allocation", "<strong>Allocation</strong> " + money(amt) + (toMode ? " → " + $("al-mode").value : " → Unallocated (from " + $("al-mode").value + ")"), [["Ledger ✓", ""], ["Audit ✓", "tick-note"]]);
    toast("Moved " + money(amt) + (toMode ? " into " + $("al-mode").value : " back to Unallocated") + " — ledger posted, audit ALC-0058 logged (simulated).");
  });

  /* ---------- withdraw (J9) ---------- */
  $("wd-review").addEventListener("click", function () {
    var amt = parseFloat($("wd-amt").value);
    var addr = $("wd-addr").value;
    var code = $("wd-2fa").value.trim();
    var err = null;
    if (isNaN(amt) || amt < 50) { err = "Minimum withdrawal is $50."; }
    else if (amt > S.wd) { err = "Amount exceeds Withdrawable (" + money(S.wd) + "). Other states are locked — see the list above."; }
    else if (!addr) { err = "Select a whitelisted destination address."; }
    else if (!/^\d{6}$/.test(code)) { err = "Enter your 6-digit 2FA code (demo accepts any 6 digits)."; }
    $("wd-err").hidden = !err;
    if (err) { $("wd-err").textContent = err; return; }
    $("wd-list").innerHTML = [
      ["Amount", amt.toLocaleString("en-US") + " USDC"],
      ["Destination", addr],
      ["Network", "Ethereum"],
      ["Security", "2FA verified (demo)"],
      ["Draws on", "Withdrawable only"]
    ].map(function (r) { return "<li><span>" + r[0] + "</span><strong>" + r[1] + "</strong></li>"; }).join("");
    $("wd-form").hidden = true;
    $("wd-confirm").hidden = false;
    $("wd-back").focus();
  });
  $("wd-back").addEventListener("click", function () {
    $("wd-confirm").hidden = true;
    $("wd-form").hidden = false;
  });
  $("wd-go").addEventListener("click", function () {
    var amt = parseFloat($("wd-amt").value);
    S.wd -= amt; renderSpine();
    $("wd-confirm").hidden = true;
    $("wd-track").hidden = false;
    var steps = document.querySelectorAll("#wd-steps li");
    var i = 0;
    addAct("withdrawal", "<strong>Withdrawal requested</strong> " + amt.toLocaleString("en-US") + " USDC", [["Audit ✓", "tick-note"], ["Chain ⧗", "tick-pend"]]);
    function step() {
      steps.forEach(function (li, n) {
        li.classList.toggle("done", n < i);
        li.classList.toggle("now", n === i);
      });
      i++;
      if (i <= steps.length) { setTimeout(step, 700); }
      else {
        steps.forEach(function (li) { li.classList.add("done"); li.classList.remove("now"); });
        $("wd-note").textContent = "Confirmed on-chain (simulated). Audit WDR-0021 logged with your security confirmation and destination. Ledger and chain records reconciled.";
        ACTS.shift();
        addAct("withdrawal", "<strong>Withdrawal confirmed</strong> " + amt.toLocaleString("en-US") + " USDC → 0x91aF…3B22", [["Chain ✓", ""], ["Ledger ✓", ""], ["Audit ✓", "tick-note"]]);
        $("wd-done-actions").hidden = false;
        toast("Withdrawal confirmed (simulated) — nothing left any wallet.");
      }
    }
    step();
  });
  $("wd-again").addEventListener("click", function () {
    $("wd-track").hidden = true;
    $("wd-done-actions").hidden = true;
    $("wd-form").hidden = false;
    $("wd-2fa").value = "";
    document.querySelectorAll("#wd-steps li").forEach(function (li) { li.classList.remove("done", "now"); });
  });

  /* ---------- init ---------- */
  renderSpine();
  renderActs();
})();
