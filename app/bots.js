/* ELVA — Bot dashboard · all simulated */
(function () {
  "use strict";
  var $ = function (id) { return document.getElementById(id); };

  function halted() {
    return ($("st-risk") && $("st-risk").checked) || !$("banner-kill").hidden;
  }

  function render() {
    var h = halted();
    $("bot-grid").innerHTML = Object.keys(ELVA_BOTS).map(function (k) {
      var b = ELVA_BOTS[k];
      var status = h
        ? '<span class="mode-status st-halt">Halted — fail closed</span>'
        : b.healthCls === "amber"
          ? '<span class="mode-status st-warn">Running · ' + b.statusFlag + "</span>"
          : '<span class="mode-status st-live">Running · ' + b.statusFlag + "</span>";
      return '<article class="bcard' + (h ? " is-halted" : "") + '">' +
        '<header class="bcard-head"><h3>' + b.name + "</h3>" +
        '<span class="cls-chip">' + b.type + "</span>" + status + "</header>" +
        '<div class="bcard-body">' +
        '<div class="ring-wrap">' + elvaRing(b.health, b.healthCls) + "</div>" +
        '<ul class="bcard-stats">' +
        '<li><span>Dedicated allocation</span><span class="data">$' + b.alloc.toLocaleString("en-US") + "</span></li>" +
        '<li><span>Today</span><span class="data ' + b.todayCls + '">' + b.today + "</span></li>" +
        '<li><span>Health</span><span class="data">' + b.health + " / 100</span></li>" +
        "</ul></div>" +
        '<a class="bcard-cta" href="bot.html?b=' + k + '">Bot Health &amp; controls →</a>' +
        "</article>";
    }).join("");
  }

  if ($("st-risk")) { $("st-risk").addEventListener("change", render); }
  ["kill-undo", "kd-go"].forEach(function (id) {
    $(id).addEventListener("click", function () { setTimeout(render, 0); });
  });
  render();
})();
