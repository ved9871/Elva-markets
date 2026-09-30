/* ELVA — Portfolio Doctor · deterministic demo measurements + Lens explanations */
(function () {
  "use strict";
  var $ = function (id) { return document.getElementById(id); };

  /* ---------- exposure data (shares of open risk, each grouping sums to 100) ---------- */
  var GROUPS = {
    currency: [
      ["USD", 68, true], ["EUR", 14, false], ["XAU", 10, false], ["Index pts", 8, false]
    ],
    instrument: [
      ["EURUSD", 34, false], ["XAUUSD", 26, false], ["US500", 22, false], ["GBPUSD", 10, false], ["USDJPY", 8, false]
    ],
    mode: [
      ["Manual", 46, false], ["Copy", 24, false], ["Bot", 18, false], ["AI", 12, false]
    ]
  };

  /* slice-and-dice treemap: alternate split direction by depth */
  function layout(items, x, y, w, h, vertical, out) {
    if (!items.length) { return; }
    if (items.length === 1) {
      out.push({ it: items[0], x: x, y: y, w: w, h: h });
      return;
    }
    var total = items.reduce(function (s, it) { return s + it[1]; }, 0);
    var acc = 0, i = 0, half = total / 2, cut = 1;
    for (; i < items.length - 1; i++) {
      acc += items[i][1];
      if (acc >= half) { cut = i + 1; break; }
    }
    var a = items.slice(0, cut), b = items.slice(cut);
    var aShare = a.reduce(function (s, it) { return s + it[1]; }, 0) / total;
    if (vertical) {
      layout(a, x, y, w * aShare, h, !vertical, out);
      layout(b, x + w * aShare, y, w * (1 - aShare), h, !vertical, out);
    } else {
      layout(a, x, y, w, h * aShare, !vertical, out);
      layout(b, x, y + h * aShare, w, h * (1 - aShare), !vertical, out);
    }
  }

  function renderMap(groupKey) {
    var items = GROUPS[groupKey].slice().sort(function (a, b) { return b[1] - a[1]; });
    var cells = [];
    layout(items, 0, 0, 100, 100, true, cells);
    $("treemap").innerHTML = cells.map(function (c) {
      var op = 0.35 + 0.55 * (c.it[1] / items[0][1]);
      return '<div class="tm-cell' + (c.it[2] ? " flag" : "") + '" style="left:' + c.x + "%;top:" + c.y + "%;width:" + c.w + "%;height:" + c.h + "%;background:rgba(43,102,255," + op.toFixed(2) + ')" title="' + c.it[0] + " — " + c.it[1] + '% of open risk">' +
        '<span class="tm-name">' + c.it[0] + '</span><span class="tm-share">' + c.it[1] + "%</span></div>";
    }).join("");
    $("treemap").setAttribute("aria-label", "Treemap of open risk share by " + groupKey + ": " +
      items.map(function (it) { return it[0] + " " + it[1] + "%"; }).join(", ") + " — demo data");
  }

  document.querySelectorAll(".gseg").forEach(function (b) {
    b.addEventListener("click", function () {
      document.querySelectorAll(".gseg").forEach(function (x) { x.classList.remove("active"); x.setAttribute("aria-pressed", "false"); });
      b.classList.add("active"); b.setAttribute("aria-pressed", "true");
      renderMap(b.dataset.g);
    });
  });

  /* ---------- findings ---------- */
  var FINDINGS = [
    {
      sev: "amber", title: "USD concentration",
      measure: "USD is on one side of <span class=\"data\">68%</span> of your open risk, across Manual, Copy and Bot allocations. One dollar move touches most of the book at once.",
      explain: "Your EURUSD long, Atlas FX's EUR-heavy copying and Momentum-7's FX book are all, at bottom, the same short-dollar position. Diversifying the copy allocation or trimming overlapping positions would reduce it — your call, through the surfaces that own those controls.",
      act: [["Review copy allocation →", "provider.html?p=atlas"], ["Review boundaries →", "permissions.html"]]
    },
    {
      sev: "amber", title: "Leverage creep",
      measure: "Average account leverage rose from <span class=\"data\">4.1x</span> to <span class=\"data\">6.2x</span> over two weeks — still inside your 10x cap, but trending up without a documented reason.",
      explain: "The rise comes from position sizes growing while allocations stayed flat. Nothing has breached a limit; the pattern simply deserves a decision rather than a drift. If intentional, note it; if not, the next new position is the place to stop it.",
      act: [["Review boundaries →", "permissions.html"]]
    },
    {
      sev: "amber", title: "Bot regime mismatch",
      measure: "Momentum-7's live win-rate runs <span class=\"data\">9 points</span> under backtest in ranging conditions — day 3 of your 7-day drift watch.",
      explain: "Covered in detail on its Bot Health page. The regime, not the code, is the variable that changed.",
      act: [["Open Bot Health →", "bot.html?b=momentum"]]
    },
    {
      sev: "ok", title: "Daily-loss discipline holding",
      measure: "The <span class=\"data\">$400</span> daily-loss cap has not been touched in 30 days; worst day was <span class=\"data\">$210</span>.",
      explain: null,
      act: []
    },
    {
      sev: "ok", title: "Invalidation adherence",
      measure: "Every stop in the last 30 days executed at its planned level — no widened stops, no removed stops.",
      explain: null,
      act: []
    }
  ];

  $("find-list").innerHTML = FINDINGS.map(function (f, i) {
    return '<li class="find-item f-' + f.sev + '">' +
      '<div class="find-top"><span class="sev sev-' + f.sev + '">' + (f.sev === "ok" ? "✓" : "⚠") + "</span>" +
      '<span class="find-title">' + f.title + "</span></div>" +
      '<p class="find-measure">' + f.measure + "</p>" +
      '<div class="find-actions">' +
      (f.explain ? '<button class="explain-btn" data-f="' + i + '" aria-expanded="false">Explain</button>' : "") +
      f.act.map(function (a) { return '<a class="act-link" href="' + a[1] + '">' + a[0] + "</a>"; }).join("") +
      "</div>" +
      (f.explain ? '<div class="explain-out" id="exp-' + i + '" hidden>' + f.explain + "</div>" : "") +
      "</li>";
  }).join("");

  document.querySelectorAll(".explain-btn").forEach(function (b) {
    b.addEventListener("click", function () {
      var out = $("exp-" + b.dataset.f);
      var open = out.hidden;
      out.hidden = !open;
      b.setAttribute("aria-expanded", open ? "true" : "false");
      b.textContent = open ? "Hide explanation" : "Explain";
    });
  });

  /* ---------- AI offline: summary handled by shell; also gate explains ---------- */
  if ($("st-ai")) {
    $("st-ai").addEventListener("change", function () {
      var off = this.checked;
      document.querySelectorAll(".explain-btn").forEach(function (b) {
        b.disabled = off;
        if (off) {
          var out = $("exp-" + b.dataset.f);
          out.hidden = true;
          b.setAttribute("aria-expanded", "false");
          b.textContent = "Explain";
          b.title = "Intelligence offline — explanations paused";
        } else {
          b.removeAttribute("title");
        }
      });
    });
  }

  renderMap("currency");
})();
