/* ELVA — Bot setup wizard · contract flow, all simulated */
(function () {
  "use strict";
  var $ = function (id) { return document.getElementById(id); };
  var step = 1;

  var CAPS = { dloss: 400, lev: 10, pos: 8, alloc: 5000 };

  function halted() {
    var reu = $("st-risk") && $("st-risk").checked;
    var killed = !$("banner-kill").hidden;
    return reu ? "Risk Engine unavailable — bots cannot be activated while automated execution is blocked (fail closed)."
      : killed ? "Automation is stopped — re-enable it before activating a new bot."
      : null;
  }

  function show(n) {
    step = n;
    ["wz-1", "wz-2", "wz-3", "wz-4", "wz-done"].forEach(function (id, i) {
      $(id).hidden = (i + 1) !== n;
    });
    document.querySelectorAll("#wz-steps li").forEach(function (li) {
      var s = parseInt(li.dataset.step, 10);
      li.classList.toggle("on", s === Math.min(n, 4));
      li.classList.toggle("done", s < n);
    });
    if (n === 4) { refreshBlock(); }
    var el = $(n === 5 ? "wz-done" : "wz-" + n);
    el.focus();
  }

  function refreshBlock() {
    if ($("wz-4").hidden) { return; }
    var h = halted();
    $("wz-block").hidden = !h;
    if (h) { $("wz-block").textContent = h; }
    $("wz-go").disabled = !!h;
  }

  $("wz-n1").addEventListener("click", function () {
    var name = $("wz-name").value.trim();
    $("wz-err1").hidden = !!name;
    if (!name) { $("wz-err1").textContent = "Give the bot a name."; return; }
    show(2);
  });
  $("wz-b2").addEventListener("click", function () { show(1); });
  $("wz-n2").addEventListener("click", function () {
    var any = $("mk-fx").checked || $("mk-met").checked || $("mk-idx").checked || $("mk-cr").checked;
    $("wz-err2").hidden = any;
    if (!any) { $("wz-err2").textContent = "Allow at least one market — a bot with no permitted market cannot run."; return; }
    show(3);
  });
  $("wz-b3").addEventListener("click", function () { show(2); });
  $("wz-n3").addEventListener("click", function () {
    var alloc = parseFloat($("wz-alloc").value), dloss = parseFloat($("wz-dloss").value);
    var size = parseFloat($("wz-size").value), pos = parseInt($("wz-pos").value, 10), lev = parseFloat($("wz-lev").value);
    var err = null;
    if (isNaN(alloc) || alloc < 100) { err = "Allocation must be at least $100."; }
    else if (alloc > CAPS.alloc) { err = "Allocation cannot exceed your $5,000 Unallocated capital."; }
    else if (isNaN(dloss) || dloss <= 0) { err = "Set a max daily loss."; }
    else if (dloss > CAPS.dloss) { err = "Max daily loss exceeds your account boundary ($400)."; }
    else if (isNaN(size) || size <= 0) { err = "Set a max position size."; }
    else if (isNaN(pos) || pos < 1) { err = "Set max simultaneous positions."; }
    else if (pos > CAPS.pos) { err = "Max positions exceeds your account boundary (8)."; }
    else if (isNaN(lev) || lev < 1) { err = "Set a max leverage."; }
    else if (lev > CAPS.lev) { err = "Max leverage exceeds your account boundary (10x)."; }
    $("wz-err3").hidden = !err;
    if (err) { $("wz-err3").textContent = err; return; }

    var mkts = [];
    if ($("mk-fx").checked) { mkts.push("FX majors"); }
    if ($("mk-met").checked) { mkts.push("Gold & metals"); }
    if ($("mk-idx").checked) { mkts.push("Indices"); }
    if ($("mk-cr").checked) { mkts.push("Crypto"); }
    var src = document.querySelector('input[name="src"]:checked').value;
    var rows = [
      ["Bot", $("wz-name").value.trim() + " · " + src],
      ["Allowed markets", mkts.join(", ")],
      ["Dedicated allocation", "$" + alloc.toLocaleString("en-US")],
      ["Max daily loss", "$" + dloss.toLocaleString("en-US")],
      ["Max position size", size.toFixed(2) + " lots"],
      ["Max positions", String(pos)],
      ["Max leverage", lev + "x"],
      ["Can withdraw", "Never — by architecture"]
    ];
    $("wz-contract").innerHTML = rows.map(function (r) {
      return "<li><span>" + r[0] + "</span><strong>" + r[1] + "</strong></li>";
    }).join("");
    show(4);
  });
  $("wz-b4").addEventListener("click", function () { show(3); });
  $("wz-go").addEventListener("click", function () {
    if (halted()) { refreshBlock(); return; }
    $("wzd-name").textContent = $("wz-name").value.trim();
    $("wzd-alloc").textContent = "$" + parseFloat($("wz-alloc").value).toLocaleString("en-US") + " dedicated";
    show(5);
  });

  if ($("st-risk")) { $("st-risk").addEventListener("change", refreshBlock); }
  ["kill-undo", "kd-go"].forEach(function (id) {
    $(id).addEventListener("click", function () { setTimeout(refreshBlock, 0); });
  });
})();
