/* ELVA Markets — Landing v1 · progressive enhancement only; page is fully usable without JS */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* nav: border on scroll */
  var nav = document.querySelector(".nav");
  var onScroll = function () {
    nav.classList.toggle("scrolled", window.scrollY > 8);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* mobile menu */
  var menuBtn = document.getElementById("menu-btn");
  var links = document.getElementById("nav-links");
  if (menuBtn && links) {
    menuBtn.addEventListener("click", function () {
      var open = links.classList.toggle("open");
      menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
      menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });
    links.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        links.classList.remove("open");
        menuBtn.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* reveal on scroll */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !reduceMotion) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("in"); });
  }

  /* copilot lifecycle cycling (decorative; list is fully readable without it) */
  var rail = document.getElementById("mini-rail");
  if (rail && !reduceMotion) {
    var steps = rail.querySelectorAll("li");
    var i = 0;
    steps[0].classList.add("active");
    setInterval(function () {
      steps[i].classList.remove("active");
      i = (i + 1) % steps.length;
      steps[i].classList.add("active");
    }, 1600);
  }

  /* invite form — demo build: nothing is transmitted */
  var form = document.getElementById("invite-form");
  var msg = document.getElementById("form-msg");
  if (form && msg) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var email = document.getElementById("invite-email");
      if (!email.value || email.validity.typeMismatch) {
        msg.textContent = "Please enter a valid email address.";
        email.focus();
        return;
      }
      msg.textContent = "Demo build — invitations are not yet open. Nothing was sent or stored.";
      form.reset();
    });
  }
})();
