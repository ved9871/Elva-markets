/* ELVA — Trading Workspace · all data simulated & deterministic; no product logic */
(function () {
  "use strict";

  var $ = function (id) { return document.getElementById(id); };

  /* ---------- demo instrument set ---------- */
  var SYMBOLS = {
    EURUSD: { g: "Forex", px: 1.0894, dec: 4, pip: 0.0001, spread: 0.6, pipVal: 10, chg: "+0.21%", up: true },
    GBPUSD: { g: "Forex", px: 1.2731, dec: 4, pip: 0.0001, spread: 0.9, pipVal: 10, chg: "-0.08%", up: false },
    USDJPY: { g: "Forex", px: 157.24, dec: 2, pip: 0.01, spread: 1.2, pipVal: 6.4, chg: "+0.34%", up: true },
    XAUUSD: { g: "Metals", px: 2382.6, dec: 1, pip: 0.1, spread: 2.5, pipVal: 10, chg: "+0.45%", up: true },
    US500: { g: "Indices", px: 5603.2, dec: 1, pip: 0.1, spread: 4, pipVal: 5, chg: "-0.12%", up: false },
    USOIL: { g: "Commodities", px: 78.42, dec: 2, pip: 0.01, spread: 3, pipVal: 10, chg: "+0.67%", up: true },
    BTCUSD: { g: "Crypto", px: 63420, dec: 0, pip: 1, spread: 18, pipVal: 1, chg: "-1.10%", up: false }
  };
  var TF_VOL = { M15: 0.7, H1: 1, H4: 1.8, D1: 3.2 };
  var LENS = {
    EURUSD: ["ECB held; the pair trades on US data this week.", "Crowded longs above 1.0880 — CPI could unwind fast.", "A close below 1.0840 voids the momentum thesis."],
    GBPUSD: ["Cable follows gilt yields; BoE quiet period in effect.", "Thin liquidity into the London fix has widened spreads.", "Loss of 1.2660 invalidates the range-hold view."],
    USDJPY: ["Carry demand persists while US yields stay firm.", "Intervention risk rises above the 158 handle.", "A drop through 156.20 breaks the trend structure."],
    XAUUSD: ["Central-bank demand underpins dips; real yields cap rallies.", "A hot CPI print typically pressures gold first.", "Losing 2,362 invalidates the accumulation setup."],
    US500: ["Index is digesting earnings; breadth is narrowing.", "Concentration risk: five names drive most of the move.", "A close under 5,560 ends the consolidation thesis."],
    USOIL: ["Inventory draws support the front contract.", "OPEC headline risk cuts both ways this week.", "Below 76.80 the supply-tightness case is invalid."],
    BTCUSD: ["Spot flows steady; weekend liquidity remains thin.", "Funding is elevated — longs pay to stay in.", "Losing 61,500 invalidates the higher-low structure."]
  };

  var state = { sym: "EURUSD", tf: "H1", side: "buy" };

  /* ---------- helpers ---------- */
  function mulberry32(a) {
    return function () {
      a |= 0; a = (a + 0x6D2B79F5) | 0;
      var t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  function seedOf(str) {
    var h = 2166136261, i;
    for (i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619); }
    return h >>> 0;
  }
  function fmt(v, dec) {
    return v.toLocaleString("en-US", { minimumFractionDigits: dec, maximumFractionDigits: dec });
  }
  function money(v) {
    var n = Math.abs(v);
    return (v < 0 ? "−$" : "$") + n.toLocaleString("en-US", { maximumFractionDigits: n < 100 ? 2 : 0 });
  }

  /* ---------- candles ---------- */
  function genCandles(sym, tf) {
    var s = SYMBOLS[sym];
    var rnd = mulberry32(seedOf(sym + tf));
    var n = 56, candles = [], px = s.px * (1 - 0.004 * TF_VOL[tf]);
    var vol = s.px * 0.0009 * TF_VOL[tf];
    for (var i = 0; i < n; i++) {
      var drift = (rnd() - 0.47) * vol;
      var o = px, c = px + drift;
      var hi = Math.max(o, c) + rnd() * vol * 0.6;
      var lo = Math.min(o, c) - rnd() * vol * 0.6;
      candles.push({ o: o, c: c, h: hi, l: lo });
      px = c;
    }
    return candles;
  }

  function drawChart() {
    var wrap = $("chart-wrap"), svg = $("chart");
    var W = wrap.clientWidth, H = wrap.clientHeight;
    if (W < 40 || H < 40) { return; }
    var s = SYMBOLS[state.sym];
    var candles = genCandles(state.sym, state.tf);
    var padR = 62, padT = 12, padB = 18;
    var lo = Infinity, hi = -Infinity;
    candles.forEach(function (k) { if (k.l < lo) lo = k.l; if (k.h > hi) hi = k.h; });
    var sl = parseFloat($("tk-sl").value), tp = parseFloat($("tk-tp").value);
    if (!isNaN(sl)) { lo = Math.min(lo, sl); hi = Math.max(hi, sl); }
    if (!isNaN(tp)) { lo = Math.min(lo, tp); hi = Math.max(hi, tp); }
    var span = (hi - lo) || 1; lo -= span * 0.05; hi += span * 0.05; span = hi - lo;
    var y = function (p) { return padT + (hi - p) / span * (H - padT - padB); };
    var cw = (W - padR) / candles.length;
    var parts = [];
    /* gridlines + axis labels */
    for (var g = 0; g <= 4; g++) {
      var gy = padT + g * (H - padT - padB) / 4;
      var gp = hi - g * span / 4;
      parts.push('<line class="c-grid" x1="0" y1="' + gy + '" x2="' + (W - padR + 8) + '" y2="' + gy + '"/>');
      parts.push('<text class="c-axis" x="' + (W - padR + 12) + '" y="' + (gy + 3) + '">' + fmt(gp, s.dec) + "</text>");
    }
    /* candles */
    candles.forEach(function (k, i) {
      var x = i * cw + cw / 2;
      var up = k.c >= k.o;
      var cls = up ? "c-up" : "c-dn", wcls = up ? "c-up-w" : "c-dn-w";
      parts.push('<line class="' + wcls + '" x1="' + x + '" y1="' + y(k.h) + '" x2="' + x + '" y2="' + y(k.l) + '"/>');
      var bt = y(Math.max(k.o, k.c)), bh = Math.max(1.5, Math.abs(y(k.o) - y(k.c)));
      parts.push('<rect class="' + cls + '" x="' + (x - cw * 0.32) + '" y="' + bt + '" width="' + (cw * 0.64) + '" height="' + bh + '"/>');
    });
    /* last price */
    var last = candles[candles.length - 1].c;
    parts.push('<line class="c-last" x1="0" y1="' + y(last) + '" x2="' + (W - padR + 8) + '" y2="' + y(last) + '"/>');
    parts.push('<text class="c-last-lbl" x="' + (W - padR + 12) + '" y="' + (y(last) + 3) + '">' + fmt(last, s.dec) + "</text>");
    /* SL / TP preview lines */
    if (!isNaN(sl)) {
      parts.push('<line class="c-sl" x1="0" y1="' + y(sl) + '" x2="' + (W - padR + 8) + '" y2="' + y(sl) + '"/>');
      parts.push('<text class="c-lvl-lbl lbl-sl" x="4" y="' + (y(sl) - 4) + '">SL ' + fmt(sl, s.dec) + "</text>");
    }
    if (!isNaN(tp)) {
      parts.push('<line class="c-tp" x1="0" y1="' + y(tp) + '" x2="' + (W - padR + 8) + '" y2="' + y(tp) + '"/>');
      parts.push('<text class="c-lvl-lbl lbl-tp" x="4" y="' + (y(tp) - 4) + '">TP ' + fmt(tp, s.dec) + "</text>");
    }
    svg.setAttribute("viewBox", "0 0 " + W + " " + H);
    svg.innerHTML = parts.join("");
    return last;
  }

  /* ---------- header / watchlist / lens ---------- */
  function renderHeader() {
    var s = SYMBOLS[state.sym];
    var bid = s.px, ask = s.px + s.spread * s.pip;
    $("ch-sym").textContent = state.sym;
    $("tk-sym").textContent = state.sym;
    $("lens-sym").textContent = state.sym;
    $("q-bid").textContent = fmt(bid, s.dec);
    $("q-ask").textContent = fmt(ask, s.dec);
    $("q-spr").textContent = s.spread + (s.g === "Forex" ? " pips" : " pts");
    var chg = $("q-chg");
    chg.textContent = s.chg;
    chg.className = "q-chg data " + (s.up ? "pnl-up" : "pnl-dn pnl-down");
  }

  function renderWatchlist() {
    var groups = {};
    Object.keys(SYMBOLS).forEach(function (k) {
      (groups[SYMBOLS[k].g] = groups[SYMBOLS[k].g] || []).push(k);
    });
    var html = "";
    Object.keys(groups).forEach(function (g) {
      html += '<p class="wl-group">' + g + "</p>";
      groups[g].forEach(function (k) {
        var s = SYMBOLS[k];
        html += '<button type="button" class="wl-item' + (k === state.sym ? " active" : "") + '" data-sym="' + k + '">' +
          '<span class="wl-sym">' + k + '</span><span class="wl-px">' + fmt(s.px, s.dec) + "</span>" +
          '<span class="wl-chg ' + (s.up ? "pnl-up" : "pnl-down") + '">' + s.chg + "</span></button>";
      });
    });
    $("watchlist").innerHTML = html;
    var sel = $("sym-select");
    sel.innerHTML = Object.keys(SYMBOLS).map(function (k) {
      return '<option value="' + k + '"' + (k === state.sym ? " selected" : "") + ">" + k + "</option>";
    }).join("");
  }

  function renderLens() {
    var rows = LENS[state.sym] || [];
    var tags = ["Markets", "Challenge", "Invalidation"];
    var tagCls = ["", " tag-amber", " tag-amber"];
    $("lens-list").innerHTML = rows.map(function (t, i) {
      return '<li><span class="lens-tag' + tagCls[i] + '">' + tags[i] + "</span>" + t + "</li>";
    }).join("");
  }

  function setSymbol(sym) {
    state.sym = sym;
    $("tk-sl").value = ""; $("tk-tp").value = "";
    renderHeader(); renderWatchlist(); renderLens(); drawChart(); calc();
  }

  /* ---------- ticket ---------- */
  var ALLOC = 10000, RISK_CAP = 0.01, LEV = 10;

  function entryPrice() {
    var s = SYMBOLS[state.sym];
    if ($("tk-type").value === "limit") {
      var lp = parseFloat($("tk-limit").value);
      if (!isNaN(lp)) { return lp; }
    }
    return state.side === "buy" ? s.px + s.spread * s.pip : s.px;
  }

  function calc() {
    var s = SYMBOLS[state.sym];
    var lots = parseFloat($("tk-size").value);
    var sl = parseFloat($("tk-sl").value);
    var entry = entryPrice();
    var out = { ok: false };
    if (isNaN(lots) || lots <= 0) {
      $("tk-margin").textContent = "—"; $("tk-risk").textContent = "—"; $("tk-riskpct").textContent = "—";
      setVerdict("neutral", "Enter a position size.");
      $("tk-review").disabled = true;
      return out;
    }
    var notionalPerLot = s.g === "Forex" ? 100000 * (s.dec === 2 ? 1 : entry) : entry * (s.g === "Crypto" ? 1 : 100);
    var margin = notionalPerLot * lots / LEV;
    $("tk-margin").textContent = money(margin) + " · demo est.";
    if (isNaN(sl)) {
      $("tk-risk").textContent = "—"; $("tk-riskpct").textContent = "—";
      setVerdict("neutral", "Set a stop loss to run the check (required by your boundary profile).");
      $("tk-review").disabled = true;
      return out;
    }
    var wrongSide = state.side === "buy" ? sl >= entry : sl <= entry;
    if (wrongSide) {
      setVerdict("blocked", "BLOCKED — stop loss must be on the protective side of entry.");
      $("tk-risk").textContent = "—"; $("tk-riskpct").textContent = "—";
      $("tk-review").disabled = true;
      return out;
    }
    var riskUsd = Math.abs(entry - sl) / s.pip * s.pipVal * lots;
    var riskPct = riskUsd / ALLOC;
    $("tk-risk").textContent = money(riskUsd) + " · demo est.";
    $("tk-riskpct").textContent = (riskPct * 100).toFixed(2) + "% / " + (RISK_CAP * 100).toFixed(1) + "%";
    if ($("st-risk") && $("st-risk").checked) {
      setVerdict("unavail", "Verdict unavailable — Risk Engine offline. Automated execution is blocked; manual orders proceed under account rules.");
      $("tk-review").disabled = false;
      out.ok = true;
    } else if (riskPct > RISK_CAP) {
      setVerdict("blocked", "BLOCKED — risk per trade " + (riskPct * 100).toFixed(2) + "% exceeds your 1.0% cap.");
      $("tk-review").disabled = true;
    } else {
      setVerdict("pass", "PASSED — risk " + (riskPct * 100).toFixed(2) + "% ≤ 1.0% cap · leverage ≤ " + LEV + "x · positions 3/8.");
      $("tk-review").disabled = false;
      out.ok = true;
    }
    out.entry = entry; out.margin = margin; out.riskUsd = riskUsd; out.riskPct = riskPct; out.lots = lots;
    return out;
  }

  function setVerdict(kind, text) {
    var v = $("risk-verdict");
    v.className = "verdict" + (kind === "neutral" ? "" : " " + kind);
    $("verdict-body").textContent = text;
  }

  function setSide(side) {
    state.side = side;
    $("side-buy").classList.toggle("active", side === "buy");
    $("side-buy").setAttribute("aria-pressed", side === "buy");
    $("side-sell").classList.toggle("active", side === "sell");
    $("side-sell").setAttribute("aria-pressed", side === "sell");
    drawChart(); calc();
  }

  /* review / confirm */
  function review() {
    var r = calc();
    if (!r.ok) { return; }
    var s = SYMBOLS[state.sym];
    var rows = [
      ["Symbol", state.sym],
      ["Side", state.side === "buy" ? "Buy" : "Sell"],
      ["Type", $("tk-type").value === "limit" ? "Limit" : "Market"],
      ["Size", r.lots.toFixed(2) + " lots"],
      ["Entry", fmt(r.entry, s.dec)],
      ["Stop loss", fmt(parseFloat($("tk-sl").value), s.dec)],
      ["Take profit", $("tk-tp").value ? fmt(parseFloat($("tk-tp").value), s.dec) : "—"],
      ["Est. margin", money(r.margin)],
      ["Est. risk", money(r.riskUsd) + " (" + (r.riskPct * 100).toFixed(2) + "%)"]
    ];
    $("confirm-list").innerHTML = rows.map(function (kv) {
      return "<li><span>" + kv[0] + "</span><strong>" + kv[1] + "</strong></li>";
    }).join("");
    $("ticket-form").hidden = true;
    $("tk-confirm").hidden = false;
    $("tk-back").focus();
  }

  function execute() {
    var r = calc();
    if (!r.ok) { return; }
    var s = SYMBOLS[state.sym];
    var tr = document.createElement("tr");
    tr.innerHTML = '<td data-l="Symbol"><strong>' + state.sym + "</strong></td>" +
      '<td data-l="Mode">Manual</td>' +
      '<td data-l="Side">' + (state.side === "buy" ? "Long" : "Short") + "</td>" +
      '<td data-l="Size" class="num">' + r.lots.toFixed(2) + "</td>" +
      '<td data-l="Entry" class="num">' + fmt(r.entry, s.dec) + "</td>" +
      '<td data-l="Mark" class="num">' + fmt(r.entry, s.dec) + "</td>" +
      '<td data-l="P&amp;L" class="num"><span>$0</span></td>';
    $("pos-body").prepend(tr);
    $("tk-confirm").hidden = true;
    $("ticket-form").hidden = false;
    closeSheet();
    showTab("pos");
    toast("Executed · demo — " + (state.side === "buy" ? "bought " : "sold ") + r.lots.toFixed(2) + " " + state.sym + ". No real order was placed.");
  }

  var toastTimer;
  function toast(msg) {
    var t = $("toast");
    t.textContent = msg;
    t.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { t.hidden = true; }, 4200);
  }

  /* ---------- tabs ---------- */
  var TABS = { pos: ["tab-pos", "pane-pos"], ord: ["tab-ord", "pane-ord"], his: ["tab-his", "pane-his"] };
  function showTab(key) {
    Object.keys(TABS).forEach(function (k) {
      var on = k === key;
      $(TABS[k][0]).classList.toggle("active", on);
      $(TABS[k][0]).setAttribute("aria-selected", on);
      $(TABS[k][1]).hidden = !on;
    });
  }

  /* ---------- mobile sheet ---------- */
  function sizeSheet() {
    /* fixed elements span the scrollbar gutter in classic-scrollbar mode; pin to content width */
    var tk = $("ticket");
    if (getComputedStyle(tk).position === "fixed") {
      tk.style.width = document.documentElement.clientWidth + "px";
      tk.style.right = "auto";
    } else {
      tk.style.width = ""; tk.style.right = "";
    }
  }
  function openSheet() {
    sizeSheet();
    $("ticket").classList.add("open");
    $("sheet-backdrop").hidden = false;
    $("tk-size").focus();
  }
  function closeSheet() {
    $("ticket").classList.remove("open");
    $("sheet-backdrop").hidden = true;
  }

  /* ---------- wiring ---------- */
  $("watchlist").addEventListener("click", function (e) {
    var btn = e.target.closest(".wl-item");
    if (btn) { setSymbol(btn.dataset.sym); }
  });
  $("sym-select").addEventListener("change", function () { setSymbol(this.value); });
  document.querySelectorAll(".tf").forEach(function (b) {
    b.addEventListener("click", function () {
      document.querySelectorAll(".tf").forEach(function (x) { x.classList.remove("active"); x.removeAttribute("aria-pressed"); });
      b.classList.add("active"); b.setAttribute("aria-pressed", "true");
      state.tf = b.dataset.tf;
      drawChart();
    });
  });
  $("side-buy").addEventListener("click", function () { setSide("buy"); });
  $("side-sell").addEventListener("click", function () { setSide("sell"); });
  $("tk-type").addEventListener("change", function () {
    $("row-limit").hidden = this.value !== "limit";
    calc();
  });
  ["tk-limit", "tk-size", "tk-sl", "tk-tp"].forEach(function (id) {
    $(id).addEventListener("input", function () { drawChart(); calc(); });
  });
  if ($("st-risk")) { $("st-risk").addEventListener("change", calc); }
  $("tk-review").addEventListener("click", review);
  $("tk-back").addEventListener("click", function () {
    $("tk-confirm").hidden = true;
    $("ticket-form").hidden = false;
    $("tk-review").focus();
  });
  $("tk-go").addEventListener("click", execute);
  $("tab-pos").addEventListener("click", function () { showTab("pos"); });
  $("tab-ord").addEventListener("click", function () { showTab("ord"); });
  $("tab-his").addEventListener("click", function () { showTab("his"); });
  $("lens-toggle").addEventListener("click", function () {
    var body = $("lens-body");
    var open = body.hidden;
    body.hidden = !open;
    this.textContent = open ? "Hide" : "Show";
    this.setAttribute("aria-expanded", open ? "true" : "false");
  });
  $("fab-order").addEventListener("click", openSheet);
  $("sheet-backdrop").addEventListener("click", closeSheet);
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && $("ticket").classList.contains("open")) { closeSheet(); }
  });
  var rT;
  window.addEventListener("resize", function () {
    clearTimeout(rT);
    rT = setTimeout(function () { drawChart(); sizeSheet(); }, 120);
  });
  var sheetMq = window.matchMedia("(max-width: 560px)");
  var onMq = function () { sizeSheet(); drawChart(); };
  if (sheetMq.addEventListener) { sheetMq.addEventListener("change", onMq); }
  else if (sheetMq.addListener) { sheetMq.addListener(onMq); }

  /* ---------- init ---------- */
  renderWatchlist(); renderHeader(); renderLens(); drawChart(); calc(); sizeSheet();
})();
