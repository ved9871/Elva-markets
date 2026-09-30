/* ELVA — Strategy Detail · demo strategies, deterministic verdicts, nothing executes */
(function () {
  "use strict";

  var $ = function (id) { return document.getElementById(id); };

  var STRATS = {
    "eurusd-breakout": {
      name: "EURUSD Breakout",
      sub: "Trend family · Forex · built by the Strategy Engine inside your $2,000 AI allocation · DEMO",
      stage: "CHALLENGE", stageIdx: 3, stageCls: "",
      conf: 64,
      why: [
        "London-open momentum has carried EURUSD through the 1.0880 resistance band on above-average participation, while the dollar index softens into Thursday's CPI print.",
        "Volatility sits inside the normal session range and spreads are tight, so the entry cost of expressing this view is low."
      ],
      kv: [["Session", "London"], ["Volatility", "Normal range"], ["Momentum", "Building"], ["Spread", "0.6 pips"]],
      challenge: [
        "US CPI at 16:30 GST can reverse the move in minutes — event risk dominates any technical read this week.",
        "Positioning above 1.0880 looks crowded; a squeeze punishes late longs first.",
        "The breakout has not been retested. Untested levels fail more often than clean retests."
      ],
      invalidation: [
        "A close below 1.0840 on any timeframe ≥ H1",
        "CPI-driven range expansion beyond 2× normal session volatility",
        "DXY reclaiming its weekly open"
      ],
      changed: [
        ["12:41", "Spread normalised after the London fix (1.1 → 0.6 pips)."],
        ["11:58", "DXY drifted 0.2% lower — supportive, thesis unchanged."]
      ],
      plan: [
        ["Direction", "Long"],
        ["Entry", "1.0895"],
        ["Stop loss", "1.0860", "risk cap 1.0%/trade"],
        ["Take profit", "1.0965"],
        ["Size", "0.20 lots", "max leverage 10x"],
        ["Est. risk", "$70 · 0.35% of allocation"]
      ],
      alloc: "Runs inside your $2,000 AI allocation. Unallocated capital is unreachable by this strategy.",
      rc: [
        ["Risk per trade", "1.0%", "0.35%", "PASS", "rc-pass"],
        ["Daily loss cap", "$400", "$120 used", "PASS", "rc-pass"],
        ["Max leverage", "10x", "8x", "PASS", "rc-pass"],
        ["Instrument", "FX majors", "EURUSD", "PASS", "rc-pass"],
        ["Open positions", "8", "3", "PASS", "rc-pass"]
      ],
      verdict: "VERDICT: PASSED",
      monitor: [
        ["", "Thesis intact — price holding above 1.0880 since the breakout."],
        ["amber", "Invalidation is 55 pips away; CPI in 3h 49m is the nearest threat."],
        ["", "No boundary usage change since the last check."]
      ]
    },
    "xauusd-meanrev": {
      name: "XAUUSD Mean Reversion",
      sub: "Mean-reversion family · Metals · Confirm mode · inside your $2,000 AI allocation · DEMO",
      stage: "MONITOR", stageIdx: 8, stageCls: "st-cyan",
      conf: 58,
      why: [
        "Gold has stretched 1.8 standard deviations above its 20-day mean while real yields hold steady — the divergence usually closes from the price side.",
        "Central-bank demand supports dips, which caps the downside of fading this extension."
      ],
      kv: [["Session", "NY / London overlap"], ["Extension", "+1.8σ vs 20-day mean"], ["Real yields", "Flat"], ["Spread", "2.5 pts"]],
      challenge: [
        "A hot CPI print typically hits gold first and hardest — mean reversion into a macro event is the riskiest version of this trade.",
        "Geopolitical headlines can extend the stretch far beyond statistical norms.",
        "The 20-day mean itself is rising; reversion may arrive by time, not by price."
      ],
      invalidation: [
        "A close above 2,405 (new acceptance above the stretch)",
        "Real yields falling more than 5bp in a session",
        "Losing the 2,362 support after entry"
      ],
      changed: [
        ["12:20", "Extension eased from +2.1σ to +1.8σ — partially reverted already."],
        ["09:45", "Position opened after your confirmation. Monitor active."]
      ],
      plan: [
        ["Direction", "Short"],
        ["Entry", "2,384.0 (filled)"],
        ["Stop loss", "2,406.0", "risk cap 1.0%/trade"],
        ["Take profit", "2,348.0"],
        ["Size", "0.04 lots", "max leverage 10x"],
        ["Est. risk", "$92 · 0.92% of allocation"]
      ],
      alloc: "Runs inside your $2,000 AI allocation. Unallocated capital is unreachable by this strategy.",
      rc: [
        ["Risk per trade", "1.0%", "0.92%", "PASS · near cap", "rc-warn"],
        ["Daily loss cap", "$400", "$120 used", "PASS", "rc-pass"],
        ["Max leverage", "10x", "6x", "PASS", "rc-pass"],
        ["Instrument", "Metals allowed", "XAUUSD", "PASS", "rc-pass"],
        ["Open positions", "8", "3", "PASS", "rc-pass"]
      ],
      verdict: "VERDICT: PASSED — one rule near its cap",
      monitor: [
        ["", "Thesis intact — extension closing gradually since entry."],
        ["amber", "Risk per trade sits at 92% of your cap. No room to add."],
        ["", "Invalidation at 2,362 is 0.9% away; watched continuously."]
      ]
    }
  };

  var CYCLE = ["ASK", "ANALYZE", "CHALLENGE", "BUILD", "RISK CHECK", "CONFIRM", "EXECUTE", "MONITOR", "REVIEW"];

  function getStrat() {
    var m = /[?&]s=([^&]+)/.exec(location.search);
    return STRATS[m && m[1]] || STRATS["eurusd-breakout"];
  }

  var S = getStrat();

  /* ---------- render ---------- */
  document.title = "ELVA — " + S.name;
  $("s-name").textContent = S.name;
  $("s-sub").textContent = S.sub;
  var stage = $("s-stage");
  stage.textContent = S.stage;
  if (S.stageCls) { stage.classList.add(S.stageCls); }
  $("s-conf").textContent = S.conf;

  $("s-dots").innerHTML = CYCLE.map(function (c, i) {
    var cls = [];
    if (i + 1 <= S.stageIdx) { cls.push("on"); }
    if (c === "RISK CHECK") { cls.push("risk-dot"); }
    return '<li class="' + cls.join(" ") + '" title="' + (i + 1) + " · " + c + '"></li>';
  }).join("");

  $("why-content").innerHTML =
    S.why.map(function (p) { return "<p>" + p + "</p>"; }).join("") +
    S.kv.map(function (kv) {
      return '<div class="arg-kv"><span>' + kv[0] + '</span><span class="data">' + kv[1] + "</span></div>";
    }).join("");

  $("challenge-content").innerHTML = S.challenge.map(function (c) { return "<li>" + c + "</li>"; }).join("");
  $("invalid-content").innerHTML = S.invalidation.map(function (c) {
    return "<li>" + c + '<span class="mon-tag">monitored</span></li>';
  }).join("");

  $("s-changed").innerHTML = S.changed.map(function (c) {
    return '<li><span class="data">' + c[0] + "</span><span>" + c[1] + "</span></li>";
  }).join("");

  $("plan-body").innerHTML = S.plan.map(function (row) {
    var cap = row[2] ? '<span class="cap">' + row[2] + "</span>" : "";
    return "<tr><td>" + row[0] + cap + "</td><td>" + row[1] + "</td></tr>";
  }).join("");
  $("plan-alloc").textContent = S.alloc;

  $("mon-list").innerHTML = S.monitor.map(function (m) {
    return '<li><span class="mon-dot ' + m[0] + '"></span>' + m[1] + "</li>";
  }).join("");

  /* ---------- risk check ---------- */
  var riskbox = document.querySelector(".riskbox");
  function runCheck() {
    var down = $("st-risk") && $("st-risk").checked;
    $("rc-idle").hidden = true;
    riskbox.classList.remove("checked", "unavail");
    if (down) {
      $("rc-result").hidden = true;
      $("rc-unavail").hidden = false;
      riskbox.classList.add("unavail");
      $("rc-confirm").disabled = true;
      $("rc-run").textContent = "Re-run Risk Check";
      return;
    }
    $("rc-unavail").hidden = true;
    $("rc-body").innerHTML = S.rc.map(function (r) {
      return "<tr><td>" + r[0] + "</td><td>" + r[1] + "</td><td>" + r[2] + '</td><td class="' + r[4] + '">' + r[3] + "</td></tr>";
    }).join("");
    var v = $("rc-verdict");
    v.textContent = S.verdict;
    v.className = "rc-verdict v-pass";
    var now = new Date();
    $("rc-stamp").textContent = "Risk Engine v2.1 · deterministic · checked " +
      ("0" + now.getHours()).slice(-2) + ":" + ("0" + now.getMinutes()).slice(-2) + ":" + ("0" + now.getSeconds()).slice(-2) + " · demo";
    $("rc-result").hidden = false;
    riskbox.classList.add("checked");
    $("rc-run").textContent = "Re-run Risk Check";
    /* confirm stays disabled — screen group 6 */
  }
  $("rc-run").addEventListener("click", runCheck);
  if ($("st-risk")) {
    $("st-risk").addEventListener("change", function () {
      if (!$("rc-result").hidden || !$("rc-unavail").hidden) { runCheck(); }
    });
  }

  /* ---------- AI offline: frozen analysis + stale marks ---------- */
  if ($("st-ai")) {
    $("st-ai").addEventListener("change", function () {
      var off = this.checked;
      $("banner-frozen").hidden = !off;
      $("why-fresh").textContent = off ? "STALE — frozen at 12:04 · demo data" : "Generated 12:04 · demo data";
      $("why-fresh").classList.toggle("is-stale", off);
    });
  }

  /* ---------- mobile accordion (CHALLENGE open by default) ---------- */
  var mq = window.matchMedia("(max-width: 560px)");
  var cols = [
    { btn: "tg-why", body: "body-why", openDefault: false },
    { btn: "tg-challenge", body: "body-challenge", openDefault: true },
    { btn: "tg-invalid", body: "body-invalid", openDefault: false }
  ];
  function applyAccordion() {
    cols.forEach(function (c) {
      var btn = $(c.btn), body = $(c.body);
      if (mq.matches) {
        var open = c.openDefault;
        body.classList.toggle("collapsed", !open);
        btn.setAttribute("aria-expanded", open ? "true" : "false");
      } else {
        body.classList.remove("collapsed");
        btn.setAttribute("aria-expanded", "true");
      }
    });
  }
  cols.forEach(function (c) {
    $(c.btn).addEventListener("click", function () {
      if (!mq.matches) { return; }
      var body = $(c.body);
      var open = body.classList.toggle("collapsed") === false;
      this.setAttribute("aria-expanded", open ? "true" : "false");
    });
  });
  if (mq.addEventListener) { mq.addEventListener("change", applyAccordion); }
  else if (mq.addListener) { mq.addListener(applyAccordion); }
  var accT, accWas = mq.matches;
  window.addEventListener("resize", function () {
    clearTimeout(accT);
    accT = setTimeout(function () {
      if (mq.matches !== accWas) { accWas = mq.matches; applyAccordion(); }
    }, 120);
  });
  applyAccordion();
})();
