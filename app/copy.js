/* ELVA — Copy discovery · behavioral filters and sorts only, no ROI ranking */
(function () {
  "use strict";

  var grid = document.getElementById("prov-grid");
  var cls = "all";
  var sortKey = "months";

  function num(v) { return parseFloat(String(v).replace(/[^\d.]/g, "")) || 0; }

  function render() {
    var keys = Object.keys(ELVA_PROVIDERS).filter(function (k) {
      return cls === "all" || ELVA_PROVIDERS[k].cls === cls;
    });
    keys.sort(function (a, b) {
      var A = ELVA_PROVIDERS[a], B = ELVA_PROVIDERS[b];
      if (sortKey === "months") { return B.months - A.months; }
      if (sortKey === "dd") { return num(A.maxDD) - num(B.maxDD); }
      return num(A.freq) - num(B.freq);
    });
    grid.innerHTML = keys.map(function (k) {
      var p = ELVA_PROVIDERS[k];
      return '<article class="pcard">' +
        '<header class="pcard-head"><h3>' + p.name + "</h3>" +
        '<span class="verified">Verified · ' + p.months + " mo</span>" +
        '<span class="cls-chip">' + p.cls + "</span>" +
        (p.copying ? '<span class="copying-chip">Copying</span>' : "") +
        "</header>" +
        '<ul class="pcard-metrics">' +
        '<li><span>Max drawdown</span><span class="data">' + p.maxDD + "</span></li>" +
        '<li><span>Avg win : avg loss</span><span class="data">' + p.winloss + "</span></li>" +
        '<li><span>Median hold</span><span class="data">' + p.hold + "</span></li>" +
        '<li><span>Trade frequency</span><span class="data">' + p.freq + "</span></li>" +
        '<li><span>Markets</span><span class="data">' + p.market + "</span></li>" +
        '<li><span>Concentration</span><span class="data">' + p.conc + "</span></li>" +
        "</ul>" +
        p.flags.map(function (f) { return '<p class="pflag">⚠ ' + f[1] + "</p>"; }).join("") +
        '<a class="pcard-cta" href="provider.html?p=' + k + '">' + (p.copying ? "Manage relationship →" : "View profile →") + "</a>" +
        "</article>";
    }).join("");
  }

  document.querySelectorAll(".fseg").forEach(function (b) {
    b.addEventListener("click", function () {
      document.querySelectorAll(".fseg").forEach(function (x) { x.classList.remove("active"); x.setAttribute("aria-pressed", "false"); });
      b.classList.add("active"); b.setAttribute("aria-pressed", "true");
      cls = b.dataset.cls;
      render();
    });
  });
  document.getElementById("sort-sel").addEventListener("change", function () {
    sortKey = this.value;
    render();
  });

  render();
})();
