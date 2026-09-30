/* ELVA OPS — internal console · all data and actions simulated */
(function () {
  "use strict";
  var $ = function (id) { return document.getElementById(id); };

  /* ---------- sections ---------- */
  var SECS = ["overview", "kyc", "recon", "risk", "auto", "audit", "health"];
  function show(sec) {
    SECS.forEach(function (s) {
      $("s-" + s).hidden = s !== sec;
    });
    document.querySelectorAll(".onav").forEach(function (b) {
      var on = b.dataset.s === sec;
      b.classList.toggle("active", on);
      b.setAttribute("aria-pressed", on);
    });
  }
  document.querySelectorAll(".onav").forEach(function (b) {
    b.addEventListener("click", function () { show(b.dataset.s); });
  });

  /* ---------- toast ---------- */
  var toastTimer;
  function toast(msg) {
    var t = $("ops-toast");
    t.textContent = msg; t.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { t.hidden = true; }, 4200);
  }

  /* ---------- KYC ---------- */
  $("kyc-body").addEventListener("click", function (e) {
    var btn = e.target.closest(".btn-o");
    if (!btn) { return; }
    var tr = btn.closest("tr");
    var id = tr.dataset.id;
    var approve = btn.dataset.a === "approve";
    tr.querySelector(".k-status").textContent = approve ? "Verified" : "Rejected";
    tr.querySelector(".k-status").className = "k-status " + (approve ? "ok-txt" : "blocked-txt");
    tr.querySelector(".k-act").innerHTML = '<span class="oid">' + (approve ? "Approved" : "Rejected") + " · logged</span>";
    toast((approve ? "Approved " : "Rejected ") + id + " — decision + reviewer logged to audit (demo).");
  });

  /* ---------- reconciliation ---------- */
  $("recon-run").addEventListener("click", function () {
    var now = new Date();
    var ts = ("0" + now.getHours()).slice(-2) + ":" + ("0" + now.getMinutes()).slice(-2) + ":" + ("0" + now.getSeconds()).slice(-2);
    $("recon-ts").textContent = "last run " + ts + " GST";
    toast("Reconciliation run complete (simulated) — 3 scopes ✓, 1 under investigation.");
  });

  /* ---------- risk engine / health / automation state sync ---------- */
  function killed() { return !$("banner-kill").hidden; }
  function refresh() {
    var down = $("st-risk") && $("st-risk").checked;
    var aiOff = $("st-ai") && $("st-ai").checked;
    var delayed = $("st-delay") && $("st-delay").checked;
    var halt = killed();

    /* risk engine section */
    var re = $("re-status");
    re.className = "mode-status " + (down ? "st-halt" : "st-live");
    re.textContent = down ? "DOWN — fail closed" : "UP · v2.1";
    $("re-down").hidden = !down;
    $("re-feed").classList.toggle("paused", down);

    /* overview */
    $("flag-risk").hidden = !down;
    $("auto-count").textContent = (halt || down) ? "0 running" : "61 running";
    $("auto-sub").textContent = (halt || down) ? "halted — fail closed" : "38 bots · 19 copy · 4 AI";

    /* automation section */
    $("ac-halted").hidden = !(halt || down);
    if (halt || down) {
      $("ac-halted").innerHTML = down
        ? "<strong>HALTED — fail closed.</strong> Risk Engine unavailable; automation cannot run until it returns."
        : "<strong>HALTED.</strong> Platform automation is stopped. Re-enable from the banner above.";
    }
    $("ac-bots").textContent = (halt || down) ? "0" : "38";
    $("ac-copy").textContent = (halt || down) ? "0" : "19";
    $("ac-ai").textContent = (halt || down) ? "0" : "4";

    /* health */
    var md = $("h-md");
    md.className = "hchip " + (delayed ? "h-warn" : "h-ok");
    md.textContent = delayed ? "DELAYED +2.4s" : "LIVE";
    var hre = $("h-re");
    hre.className = "hchip " + (down ? "h-down" : "h-ok");
    hre.textContent = down ? "DOWN — fail closed" : "UP · deterministic";
    var hai = $("h-ai");
    hai.className = "hchip " + (aiOff ? "h-off" : "h-ok");
    hai.textContent = aiOff ? "OFFLINE — analysis paused" : "UP · analysis + confirm";
    var hauto = $("h-auto");
    hauto.className = "hchip " + ((halt || down) ? "h-down" : "h-ok");
    hauto.textContent = (halt || down) ? "HALTED — 0 units" : "RUNNING · 61 units";
  }
  ["st-risk", "st-ai", "st-delay"].forEach(function (id) {
    if ($(id)) { $(id).addEventListener("change", refresh); }
  });
  ["kill-undo", "kd-go"].forEach(function (id) {
    $(id).addEventListener("click", function () { setTimeout(refresh, 0); });
  });
  $("ac-kill").addEventListener("click", function () { $("kill-btn").click(); });

  /* ---------- audit explorer ---------- */
  var AUDIT = [
    ["13:22", "execution", "system", "AI execution confirmed — Buy 0.20 EURUSD (ACC-1021)", "AI-EXEC-0042"],
    ["13:18", "permission", "client ACC-1021", "AI permission granted — modify SL/TP", "PRM-0311"],
    ["13:02", "custody", "client ACC-1042", "Withdrawal confirmed — 500 USDC", "WDR-0021"],
    ["12:44", "execution", "client ACC-1021", "Kill switch armed & released — account automation", "KIL-0104"],
    ["12:31", "admin", "ops:r.hassan", "KYC approved — APL-0409", "KYC-0409"],
    ["11:58", "custody", "system", "Deposit credited — 5,000 USDC (ACC-1021)", "LDG-1186"],
    ["11:12", "permission", "client ACC-1007", "Bot cap updated — Momentum-7 daily loss → $60", "PRM-0309"],
    ["09:47", "auth", "client ACC-1113", "Sign-in — 2FA passed, new device held for review", "AUT-2210"],
    ["09:21", "admin", "ops:m.iqbal", "Recon exception opened — ACC-1094/USDT", "REC-0042"],
    ["08:02", "auth", "client ACC-1021", "Sign-in — 2FA passed", "AUT-2205"]
  ];
  var auFilter = "all", auQuery = "";
  function renderAudit() {
    var rows = AUDIT.filter(function (r) {
      if (auFilter !== "all" && r[1] !== auFilter) { return false; }
      if (auQuery && (r.join(" ").toLowerCase().indexOf(auQuery) === -1)) { return false; }
      return true;
    });
    $("au-body").innerHTML = rows.map(function (r) {
      return '<tr><td data-l="Time" class="oid">' + r[0] + '</td><td data-l="Type">' + r[1] + '</td><td data-l="Actor">' + r[2] + '</td><td data-l="Event"><strong>' + r[3] + '</strong></td><td data-l="Ref" class="oid">' + r[4] + "</td></tr>";
    }).join("");
    $("au-empty").hidden = rows.length > 0;
  }
  document.querySelectorAll("#s-audit .fseg").forEach(function (b) {
    b.addEventListener("click", function () {
      document.querySelectorAll("#s-audit .fseg").forEach(function (x) { x.classList.remove("active"); x.setAttribute("aria-pressed", "false"); });
      b.classList.add("active"); b.setAttribute("aria-pressed", "true");
      auFilter = b.dataset.f;
      renderAudit();
    });
  });
  $("au-q").addEventListener("input", function () {
    auQuery = this.value.trim().toLowerCase();
    renderAudit();
  });

  /* ---------- init ---------- */
  renderAudit();
  refresh();
})();
