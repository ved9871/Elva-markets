/* ELVA — Provider profile · DNA, curves, Lens analysis, copy configurator/monitor · all simulated */
(function () {
  "use strict";

  var $ = function (id) { return document.getElementById(id); };

  var key = (function () {
    var m = /[?&]p=([^&]+)/.exec(location.search);
    return ELVA_PROVIDERS[m && m[1]] ? m[1] : "meridian";
  })();
  var P = ELVA_PROVIDERS[key];

  /* ---------- header ---------- */
  document.title = "ELVA — " + P.name;
  $("p-name").textContent = P.name;
  $("p-verified").textContent = "Verified · " + P.months + " mo live";
  $("p-cls").textContent = P.cls;
  $("p-sub").textContent = P.market + " · max drawdown " + P.maxDD + " · avg win : avg loss " + P.winloss +
    " · median hold " + P.hold + " · " + P.freq + " · " + P.conc + " · DEMO";

  /* ---------- DNA ---------- */
  $("dna-list").innerHTML = P.dna.map(function (d) {
    return '<li class="dna-row"><div class="dna-top"><span>' + d[0] +
      (d[2] ? ' <span class="pflag">⚠</span>' : "") +
      '</span><span class="data">' + d[1] + " / 100</span></div>" +
      '<div class="dna-meter" role="img" aria-label="' + d[0] + " " + d[1] + ' of 100"><i class="' + d[2] + '" style="width:' + d[1] + '%"></i></div></li>';
  }).join("");

  /* ---------- curves (seeded, deterministic) ---------- */
  function mulberry32(a) {
    return function () {
      a |= 0; a = (a + 0x6D2B79F5) | 0;
      var t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  var rnd = mulberry32(P.seed * 7919);
  var N = 120, eq = [], v = 100, peak = 100, dd = [];
  for (var i = 0; i < N; i++) {
    var vol = P.curve === "choppy" ? 2.2 : 1.1;
    v += (rnd() - 0.44) * vol;
    if (v < 60) { v = 60; }
    eq.push(v);
    if (v > peak) { peak = v; }
    dd.push((v - peak) / peak);
  }
  var lo = Math.min.apply(null, eq), hi = Math.max.apply(null, eq), span = hi - lo || 1;
  var pts = eq.map(function (y, i) {
    return (i / (N - 1) * 600).toFixed(1) + "," + (140 - (y - lo) / span * 125).toFixed(1);
  });
  $("equity-svg").innerHTML =
    '<line class="c-base" x1="0" y1="140" x2="600" y2="140"/>' +
    '<polygon class="c-eq-fill" points="0,150 ' + pts.join(" ") + ' 600,150"/>' +
    '<polyline class="c-eq" points="' + pts.join(" ") + '"/>';
  var ddMax = Math.min.apply(null, dd) || -0.01;
  var dpts = dd.map(function (y, i) {
    return (i / (N - 1) * 600).toFixed(1) + "," + (5 + (y / ddMax) * 58).toFixed(1);
  });
  $("dd-svg").innerHTML =
    '<line class="c-base" x1="0" y1="5" x2="600" y2="5"/>' +
    '<polygon class="c-dd-fill" points="0,5 ' + dpts.join(" ") + ' 600,5"/>';
  $("cv-months").textContent = P.months;
  $("cv-dd").textContent = P.maxDD;

  /* ---------- lens ---------- */
  $("lens-ask").addEventListener("click", function () {
    $("lens-out").innerHTML = P.lens.map(function (b, i) {
      return '<div class="a-block b2"><p class="a-head">' + b[0] + "</p><p>" + b[1] + "</p></div>";
    }).join("");
    $("lens-out").hidden = false;
    $("lens-note").hidden = false;
    this.hidden = true;
  });

  /* ---------- shared halt state ---------- */
  function halted() {
    var reu = $("st-risk") && $("st-risk").checked;
    var killed = !$("banner-kill").hidden;
    return reu ? "Risk Engine unavailable — copy execution is blocked, fail closed."
      : killed ? "Automation stopped — copy execution halted until you re-enable it."
      : null;
  }

  /* ---------- configurator vs monitor ---------- */
  var toastTimer;
  function toast(msg) {
    var t = $("copy-toast");
    t.textContent = msg; t.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { t.hidden = true; }, 4000);
  }

  if (P.copying) {
    $("mon").hidden = false;
    var paused = false, pendingAction = null;

    function refreshMon() {
      var h = halted();
      $("mon-halt").hidden = !h;
      if (h) { $("mon-halt").textContent = h; }
      var st = $("mon-status");
      st.className = "mode-status " + (h ? "st-halt" : paused ? "st-paused" : "st-live");
      st.textContent = h ? "Halted — fail closed" : paused ? "Paused" : "Active";
      $("mon-pause").textContent = paused ? "Resume copying" : "Pause copying";
    }

    $("mon-pause").addEventListener("click", function () {
      pendingAction = paused ? "resume" : "pause";
      $("mon-confirm-msg").textContent = paused
        ? "Resume copying Atlas FX? New provider trades will be copied again under your existing contract."
        : "Pause copying Atlas FX? No new trades will be copied. Existing copied positions remain open and yours to manage.";
      $("mon-confirm").hidden = false;
      $("mc-go").focus();
    });
    $("mon-stop").addEventListener("click", function () {
      pendingAction = "stop";
      $("mon-confirm-msg").textContent = "Stop copying Atlas FX? Per your stop-copy settings, copied positions will be closed and the dedicated allocation released back to Unallocated. This is logged to your audit trail.";
      $("mon-confirm").hidden = false;
      $("mc-go").focus();
    });
    $("mc-cancel").addEventListener("click", function () {
      $("mon-confirm").hidden = true; pendingAction = null;
    });
    $("mc-go").addEventListener("click", function () {
      $("mon-confirm").hidden = true;
      if (pendingAction === "stop") {
        $("mon").innerHTML = '<p class="receipt-head">Copying stopped <span class="chip chip-demo">DEMO · simulated</span></p>' +
          '<p class="mon-off">Copied positions closed and <span class="data">$5,000</span> released to Unallocated (simulated). Audit COPY-STOP-0009 logged.</p>' +
          '<div class="step-actions" style="margin-top:16px"><a class="btn btn-primary" href="copy.html">Back to discovery</a></div>';
        toast("Stopped copying Atlas FX — logged (demo).");
      } else {
        paused = pendingAction === "pause";
        refreshMon();
        toast((paused ? "Paused" : "Resumed") + " copying Atlas FX — logged (demo).");
      }
      pendingAction = null;
    });

    if ($("st-risk")) { $("st-risk").addEventListener("change", refreshMon); }
    ["kill-undo", "kd-go"].forEach(function (id) {
      $(id).addEventListener("click", function () { setTimeout(refreshMon, 0); });
    });
    refreshMon();
  } else {
    $("cfg").hidden = false;

    $("c-mult").addEventListener("input", function () {
      $("c-mult-v").textContent = parseFloat(this.value).toFixed(2).replace(/0$/, "") + "×";
    });

    function validate() {
      var alloc = parseFloat($("c-alloc").value);
      if (isNaN(alloc) || alloc < 100) { return "Allocation must be at least $100."; }
      if (alloc > 5000) { return "Allocation cannot exceed your $5,000 Unallocated capital."; }
      var dl = parseFloat($("c-dloss").value);
      if (isNaN(dl) || dl <= 0) { return "Set a max daily loss."; }
      if (!$("sc-1").checked && !$("sc-2").checked && !$("sc-3").checked) {
        return "Keep at least one stop-copy condition — copying without an exit rule is not permitted.";
      }
      return null;
    }

    $("cfg-review").addEventListener("click", function () {
      var err = validate();
      $("cfg-err").hidden = !err;
      if (err) { $("cfg-err").textContent = err; return; }
      var rows = [
        ["Provider", P.name + " (" + P.cls + ")"],
        ["Dedicated allocation", "$" + parseFloat($("c-alloc").value).toLocaleString("en-US")],
        ["Risk multiplier", $("c-mult-v").textContent],
        ["Max position size", parseFloat($("c-maxpos").value).toFixed(2) + " lots"],
        ["Max daily loss", "$" + parseFloat($("c-dloss").value).toLocaleString("en-US")],
        ["Max allocation drawdown", parseFloat($("c-dd").value) + "%"],
        ["Stop-copy conditions", [$("sc-1").checked, $("sc-2").checked, $("sc-3").checked].filter(Boolean).length + " active"]
      ];
      $("ct-list").innerHTML = rows.map(function (r) {
        return "<li><span>" + r[0] + "</span><strong>" + r[1] + "</strong></li>";
      }).join("");
      $("cfg-form").hidden = true;
      $("cfg-contract").hidden = false;
      refreshContract();
      $("ct-back").focus();
    });

    function refreshContract() {
      if ($("cfg-contract").hidden) { return; }
      var h = halted();
      $("ct-block").hidden = !h;
      if (h) { $("ct-block").textContent = h; }
      $("ct-confirm").disabled = !!h;
    }

    $("ct-back").addEventListener("click", function () {
      $("cfg-contract").hidden = true;
      $("cfg-form").hidden = false;
    });
    $("ct-confirm").addEventListener("click", function () {
      if (halted()) { refreshContract(); return; }
      $("done-prov").textContent = P.name;
      $("done-alloc").textContent = "$" + parseFloat($("c-alloc").value).toLocaleString("en-US") + " dedicated";
      $("cfg-contract").hidden = true;
      $("cfg-done").hidden = false;
      toast("Copy contract confirmed for " + P.name + " — simulated, logged (demo).");
    });

    if ($("st-risk")) { $("st-risk").addEventListener("change", refreshContract); }
    ["kill-undo", "kd-go"].forEach(function (id) {
      $(id).addEventListener("click", function () { setTimeout(refreshContract, 0); });
    });
  }
})();
