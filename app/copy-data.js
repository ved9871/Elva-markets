/* ELVA — Copy Trading demo dataset · verified-behavior framing only, all figures illustrative */
var ELVA_PROVIDERS = {
  atlas: {
    name: "Atlas FX", cls: "Manual", market: "Forex",
    months: 26, maxDD: "10.8%", winloss: "1.3 : 1", hold: "14h", freq: "11 / week",
    conc: "EUR pairs 72%", copying: true,
    flags: [["amber", "Drift watch — trade frequency 2× its historical profile"]],
    dna: [
      ["Drawdown control", 78, ""],
      ["Trade frequency", 55, ""],
      ["Holding time", 40, ""],
      ["Leverage usage", 45, ""],
      ["Concentration", 82, "amber"]
    ],
    seed: 11, curve: "steady",
    lens: [
      ["Behavior", "26 months of verified live history with disciplined exits; losses are cut at consistent distances and drawdown has stayed under 11% throughout."],
      ["Concentration", "72% of recent risk sits in EUR pairs — this is effectively one currency view expressed many ways. Your copy allocation inherits that concentration."],
      ["Change", "Trade frequency doubled over the last three weeks versus the two-year profile. A behavior change, not a verdict — the drift watch is on."]
    ]
  },
  meridian: {
    name: "Meridian Macro", cls: "Hybrid", market: "Multi-asset",
    months: 14, maxDD: "7.2%", winloss: "1.1 : 1", hold: "3.2d", freq: "4 / week",
    conc: "Balanced across USD, rates, gold",
    flags: [],
    dna: [
      ["Drawdown control", 86, ""],
      ["Trade frequency", 25, ""],
      ["Holding time", 75, ""],
      ["Leverage usage", 30, ""],
      ["Concentration", 35, ""]
    ],
    seed: 23, curve: "steady",
    lens: [
      ["Behavior", "Event-aware macro style: few positions, multi-day holds, small size into data releases. 14 months verified — shorter than Atlas, but consistent within it."],
      ["Risk shape", "Losses cluster around surprise macro prints; between events the book is quiet. Expect long flat stretches in the copied account."],
      ["Fit", "Low frequency means your risk multiplier matters less than your patience. Stop-copy conditions on drawdown are the binding control here."]
    ]
  },
  nordwind: {
    name: "Nordwind Grid", cls: "Bot", market: "Forex",
    months: 9, maxDD: "16.4%", winloss: "0.8 : 1", hold: "6h", freq: "38 / week",
    conc: "EURUSD, USDJPY grids",
    flags: [["amber", "Attention — grid style; drawdowns deepen in trending regimes"], ["amber", "Shorter verified history (9 months)"]],
    dna: [
      ["Drawdown control", 38, "amber"],
      ["Trade frequency", 92, ""],
      ["Holding time", 22, ""],
      ["Leverage usage", 70, "amber"],
      ["Concentration", 60, ""]
    ],
    seed: 47, curve: "choppy",
    lens: [
      ["Behavior", "High-frequency grid automation: many small wins punctuated by deeper drawdowns when a trend runs against the grid. The 0.8 : 1 win/loss shape is typical of the style."],
      ["Regime risk", "Nine months of verified history does not yet include a sustained one-way market. The deepest drawdown likely hasn't happened in-sample."],
      ["Fit", "If you copy this, the max-allocation-drawdown stop is your most important setting — grids fail abruptly, not gradually."]
    ]
  }
};
