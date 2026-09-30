/* ELVA — Bot Health detail · all simulated */
(function () {
  "use strict";
  var $ = function (id) { return document.getElementById(id); };

  var key = (function () {
    var m = /[?&]b=([^&]+)/.exec(location.search);
    return ELVA_BOTS[m && m[1]] ? m[1] : "momentum";
  })();
  var B = ELVA_BOTS[key];

  document.title = "ELVA — " + B.name;
  $("b-name").textContent = B.name;
  $("b-type").textContent = B.type;
  $("b-sub").textContent = "Dedicated allocation $" + B.alloc.toLocaleString("en-US") +
    " · today " + B.today + " · health " + B.health + " / 100 · DEMO";
  $("b-ring").innerHTML = elvaRing(B.health, B.healthCls);
  $("b-healthnote").textContent = B.healthNote;

  $("b-traits").innerHTML = B.traits.map(function (t) {
    return '<li class="dna-row"><div class="dna-top"><span>' + t[0] +
      (t[2] ? ' <span style="color:var(--amber-400)">⚠</span>' : "") +
      '</span><span class="data">' + t[3] + "</span></div>" +
      '<div class="dna-meter" role="img" aria-label="' + t[0] + " " + t[1] + ' of 100"><i class="' + t[2] + '" style="width:' + t[1] + '%"></i></div></li>';
  }).join("");

  $("b-perf").innerHTML = B.perf.map(function (p) {
    return '<div class="perf-block"><span class="perf-tag ' + p[3] + '">' + p[0] + "</span>" +
      "<p>" + p[1] + "</p><small>" + p[2] + "</small></div>";
  }).join("");

  $("b-perms").innerHTML = B.perms.map(function (p) {
    return "<li><span>" + p[0] + '</span><span class="data">' + p[1] + "</span></li>";
  }).join("");

  /* inspector */
  $("bi-ask").addEventListener("click", function () {
    $("bi-out").innerHTML = B.inspector.map(function (b) {
      return '<div class="a-block"><p class="a-head">' + b[0] + "</p><p>" + b[1] + "</p></div>";
    }).join("");
    $("bi-out").hidden = false;
    $("bi-note").hidden = false;
    this.hidden = true;
  });

  /* status + halt handling */
  var paused = false, stopped = false, pending = null;
  function haltMsg() {
    var reu = $("st-risk") && $("st-risk").checked;
    var killed = !$("banner-kill").hidden;
    return reu ? "Risk Engine unavailable — this bot is halted, fail closed. Funds untouched."
      : killed ? "Automation stopped — this bot is halted until you re-enable automation. Funds untouched."
      : null;
  }
  function refresh() {
    var h = haltMsg();
    $("b-halt").hidden = !h;
    if (h) { $("b-halt").textContent = h; }
    var st = $("b-status");
    if (stopped) { st.className = "mode-status st-halt"; st.textContent = "Stopped"; }
    else if (h) { st.className = "mode-status st-halt"; st.textContent = "Halted — fail closed"; }
    else if (paused) { st.className = "mode-status st-paused"; st.textContent = "Paused"; }
    else if (B.healthCls === "amber") { st.className = "mode-status st-warn"; st.textContent = "Running · " + B.statusFlag; }
    else { st.className = "mode-status st-live"; st.textContent = "Running · " + B.statusFlag; }
    $("b-pause").textContent = paused ? "Resume bot" : "Pause bot";
    $("b-pause").disabled = stopped;
    $("b-stop").disabled = stopped;
  }

  var toastTimer;
  function toast(msg) {
    var t = $("bot-toast");
    t.textContent = msg; t.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { t.hidden = true; }, 4000);
  }

  $("b-pause").addEventListener("click", function () {
    pending = paused ? "resume" : "pause";
    $("b-confirm-msg").textContent = paused
      ? "Resume " + B.name + "? It continues trading inside its existing permissions."
      : "Pause " + B.name + "? It stops opening trades. Open positions remain yours to manage; funds are untouched.";
    $("b-confirm").hidden = false;
    $("bc-go").focus();
  });
  $("b-stop").addEventListener("click", function () {
    pending = "stop";
    $("b-confirm-msg").textContent = "Stop " + B.name + "? Its trading ends, its $" + B.alloc.toLocaleString("en-US") +
      " allocation is released back to Unallocated (simulated), and the event is logged. A bot can trade; a bot can never withdraw.";
    $("b-confirm").hidden = false;
    $("bc-go").focus();
  });
  $("bc-cancel").addEventListener("click", function () { $("b-confirm").hidden = true; pending = null; });
  $("bc-go").addEventListener("click", function () {
    $("b-confirm").hidden = true;
    if (pending === "stop") { stopped = true; toast("Stopped " + B.name + " — allocation released (simulated), audit BOT-STOP-0006 logged."); }
    else { paused = pending === "pause"; toast((paused ? "Paused " : "Resumed ") + B.name + " — logged (demo)."); }
    pending = null;
    refresh();
  });

  if ($("st-risk")) { $("st-risk").addEventListener("change", refresh); }
  ["kill-undo", "kd-go"].forEach(function (id) {
    $(id).addEventListener("click", function () { setTimeout(refresh, 0); });
  });
  refresh();
})();
