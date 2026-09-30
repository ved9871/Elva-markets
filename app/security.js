/* ELVA — Account & Security · demo controls */
(function () {
  "use strict";
  var $ = function (id) { return document.getElementById(id); };

  var toastTimer;
  function toast(msg) {
    var t = $("cap-toast");
    t.textContent = msg; t.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { t.hidden = true; }, 4000);
  }

  var revoke = $("dev-revoke");
  if (revoke) {
    revoke.addEventListener("click", function () {
      var li = $("dev-2");
      li.innerHTML = "<div><strong>iPhone 15</strong><small>Session revoked — signed out everywhere</small></div><span class=\"cls-chip\">Revoked</span>";
      var audit = $("audit-list");
      var now = new Date();
      var row = document.createElement("li");
      row.innerHTML = '<span class="act-what"><strong>Session revoked</strong> iPhone 15</span><span class="act-rec"><span class="tick tick-note">Audit ✓</span></span><span class="act-when data">' +
        ("0" + now.getHours()).slice(-2) + ":" + ("0" + now.getMinutes()).slice(-2) + "</span>";
      audit.prepend(row);
      toast("Session revoked and logged (demo).");
    });
  }
})();
