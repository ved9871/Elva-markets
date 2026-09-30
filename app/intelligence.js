/* ELVA — Intelligence Home · canned demo Q&A, no product logic, nothing executes */
(function () {
  "use strict";

  var $ = function (id) { return document.getElementById(id); };

  /* ---------- canned answers (demo) ---------- */
  var ANSWERS = {
    eurusd: {
      q: "What's driving EURUSD?",
      stage: "ANALYZE",
      blocks: [
        ["why", "Why", "London-open momentum with a softer dollar index; volatility sits inside the normal session range and spreads are tight."],
        ["challenge", "Challenge", "Thursday's US CPI can reverse the move in minutes, and positioning above 1.0880 looks crowded — a squeeze cuts both ways."],
        ["invalid", "Invalidation", "A close below 1.0840 voids the momentum thesis."]
      ]
    },
    atlas: {
      q: "Analyze Atlas FX",
      stage: "ANALYZE",
      blocks: [
        ["why", "Behavior", "26 months of verified live history. Median hold time 14 hours, leverage typically 4–6x, drawdown has stayed under 11%."],
        ["challenge", "Concentration", "72% of recent risk sits in EUR pairs — the strategy is effectively one currency view expressed many ways."],
        ["invalid", "Drift watch", "Trade frequency doubled over the last three weeks versus its historical profile. Behavior change, not yet a verdict."]
      ]
    },
    momentum: {
      q: "Check Momentum-7",
      stage: "MONITOR",
      blocks: [
        ["why", "Status", "Running inside its permissions: $60 max daily loss, 3 max positions, FX majors only. No boundary breaches recorded."],
        ["challenge", "Divergence", "Live win-rate is 9 points under its backtest in ranging conditions — this regime is not the one it was fitted to."],
        ["invalid", "Suggested boundary", "If divergence persists another week, consider pausing via the kill switch. Stopping a bot never touches your funds."]
      ]
    },
    portfolio: {
      q: "Review my portfolio",
      stage: "REVIEW",
      blocks: [
        ["why", "Shape", "Three open positions across Manual and Bot allocations; total reserved margin $3,200 of a $16,000 active allocation."],
        ["challenge", "Concentration", "USD exposure is 68% of open risk — a single dollar move touches most of your book at once."],
        ["invalid", "Behavior", "Your journal shows exits running 15–20 pips earlier than plan on winners. The plans have been sound; the exits are emotional."]
      ]
    }
  };

  var FALLBACK = {
    stage: "ASK",
    blocks: [
      ["plain", "Demo scope", "In the full build, ELVA answers free-form questions about markets, strategy providers, bots and your portfolio. This demo covers the four topics below — pick one to see a structured answer."]
    ]
  };

  function renderAnswer(key, rawQ) {
    var a = ANSWERS[key] || FALLBACK;
    $("answer-q").textContent = "You asked: " + (a.q || rawQ);
    $("answer-body").innerHTML = a.blocks.map(function (b) {
      return '<div class="a-block a-' + b[0] + '"><p class="a-head">' + b[1] + "</p><p>" + b[2] + "</p></div>";
    }).join("");
    $("answer-stage").textContent = a.stage;
    $("answer").hidden = false;
    lightCycle(a.stage);
  }

  function matchQuestion(text) {
    var t = text.toLowerCase();
    if (/eur|usd(?!jpy)|fx|forex|market/.test(t) && !/atlas|bot|portfolio/.test(t)) { return "eurusd"; }
    if (/atlas|provider|copy/.test(t)) { return "atlas"; }
    if (/momentum|bot/.test(t)) { return "momentum"; }
    if (/portfolio|exposure|my book|review/.test(t)) { return "portfolio"; }
    return null;
  }

  /* light lifecycle: keep the two "active work" stages lit, add the answer stage */
  var BASE_LIT = ["CHALLENGE", "MONITOR"];
  function lightCycle(extra) {
    document.querySelectorAll("#cycle li").forEach(function (li) {
      var s = li.dataset.s;
      li.classList.toggle("lit", BASE_LIT.indexOf(s) > -1 || s === extra);
    });
  }

  $("ask-form").addEventListener("submit", function (e) {
    e.preventDefault();
    var text = $("ask-input").value.trim();
    if (!text) { $("ask-input").focus(); return; }
    renderAnswer(matchQuestion(text), text);
  });
  $("ask-chips").addEventListener("click", function (e) {
    var chip = e.target.closest(".achip");
    if (!chip) { return; }
    $("ask-input").value = chip.textContent;
    renderAnswer(chip.dataset.q, chip.textContent);
  });

  /* ---------- mode selector (visual only; nothing executes) ---------- */
  var MODE_NOTES = {
    copilot: "Copilot — analysis and recommendations only. You execute every trade yourself.",
    confirm: "Confirm — ELVA prepares each action; nothing executes until you explicitly approve it, and every action passes the Risk Engine first."
  };
  function setMode(mode) {
    $("m-copilot").classList.toggle("active", mode === "copilot");
    $("m-copilot").setAttribute("aria-pressed", mode === "copilot");
    $("m-confirm").classList.toggle("active", mode === "confirm");
    $("m-confirm").setAttribute("aria-pressed", mode === "confirm");
    $("mode-note").textContent = MODE_NOTES[mode];
  }
  $("m-copilot").addEventListener("click", function () { setMode("copilot"); });
  $("m-confirm").addEventListener("click", function () { setMode("confirm"); });

  /* Risk Engine state note (shared checkbox from app.js shell) */
  var stRisk = $("st-risk");
  if (stRisk) {
    stRisk.addEventListener("change", function () {
      $("mode-risknote").hidden = !stRisk.checked;
    });
  }

  /* Delayed state: answer freshness line */
  var stDelay = $("st-delay");
  if (stDelay) {
    stDelay.addEventListener("change", function () {
      $("answer-fresh").textContent = stDelay.checked
        ? "analysis based on delayed data (+2.4s) · demo data"
        : "analysis generated just now · demo data";
    });
  }
})();
