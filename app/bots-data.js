/* ELVA — Bot Trading demo dataset · all figures illustrative */
var ELVA_BOTS = {
  momentum: {
    name: "Momentum-7", type: "MT5 EA · momentum", alloc: 1800, today: "−$9", todayCls: "pnl-down",
    health: 61, healthCls: "amber",
    healthNote: "Health 61 — behavior is diverging from the tested profile. Live win-rate runs 9 points under backtest in ranging conditions.",
    statusFlag: "⚠ divergence",
    traits: [
      ["Backtest divergence", 42, "amber", "live vs tested profile"],
      ["Drawdown vs cap", 66, "", "4.1% of 12% cap used"],
      ["Execution quality", 84, "", "slippage within profile"],
      ["Boundary discipline", 100, "", "no breaches recorded"]
    ],
    perf: [
      ["Backtest", "2019–2025 · author-supplied", "Unverified by ELVA", "amber"],
      ["Demo", "3 months · platform forward test", "Run by ELVA on demo feed", ""],
      ["Live", "9 weeks · verified", "Real executions on this account", "ok"]
    ],
    perms: [
      ["Markets", "FX majors"], ["Dedicated allocation", "$1,800"],
      ["Max daily loss", "$60"], ["Max position size", "0.30 lots"],
      ["Max positions", "3"], ["Max leverage", "8x"]
    ],
    inspector: [
      ["Behavior", "Momentum entries on H1 breakouts with fixed-distance stops. In trending weeks it matches its backtest; in ranging weeks it gives back most of its edge."],
      ["Divergence", "The last three weeks were range-bound and live win-rate ran 9 points under backtest. This is regime mismatch, not a malfunction — but it is exactly how EAs decay."],
      ["Suggestion", "If divergence persists another week, pause it. Pausing costs nothing; a bot trading outside its regime costs its allocation."]
    ]
  },
  grid: {
    name: "Grid-2", type: "Grid EA · US500", alloc: 1200, today: "+$27", todayCls: "pnl-up",
    health: 86, healthCls: "",
    healthNote: "Health 86 — behavior matches the tested profile. Drawdown, frequency and execution are all inside expected ranges.",
    statusFlag: "healthy",
    traits: [
      ["Backtest divergence", 88, "", "tracking tested profile"],
      ["Drawdown vs cap", 78, "", "2.2% of 10% cap used"],
      ["Execution quality", 90, "", "fills within profile"],
      ["Boundary discipline", 100, "", "no breaches recorded"]
    ],
    perf: [
      ["Backtest", "2021–2025 · author-supplied", "Unverified by ELVA", "amber"],
      ["Demo", "2 months · platform forward test", "Run by ELVA on demo feed", ""],
      ["Live", "5 weeks · verified", "Real executions on this account", "ok"]
    ],
    perms: [
      ["Markets", "US500 only"], ["Dedicated allocation", "$1,200"],
      ["Max daily loss", "$40"], ["Max position size", "0.20 lots"],
      ["Max positions", "6"], ["Max leverage", "6x"]
    ],
    inspector: [
      ["Behavior", "A tight grid on US500 with small per-level size. Many small wins; the risk lives in sustained one-way moves that stack the grid."],
      ["Regime watch", "Current index conditions — consolidation with narrow breadth — are this grid's best regime. Its health score reflects conditions as much as code."],
      ["Suggestion", "The max-positions cap (6) is the control that matters here. Raising it would deepen the worst case faster than it improves the average."]
    ]
  }
};

/* shared ring renderer */
function elvaRing(score, cls) {
  var C = 2 * Math.PI * 19;
  var on = (C * score / 100).toFixed(1);
  return '<svg class="ring" viewBox="0 0 44 44" role="img" aria-label="Health ' + score + ' of 100">' +
    '<circle class="ring-bg" cx="22" cy="22" r="19"/>' +
    '<circle class="ring-val ' + cls + '" cx="22" cy="22" r="19" stroke-dasharray="' + on + " " + C.toFixed(1) + '"/>' +
    '<text class="ring-txt" x="22" y="26" text-anchor="middle">' + score + "</text></svg>";
}
