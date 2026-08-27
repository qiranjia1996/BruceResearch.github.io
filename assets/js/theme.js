/* Theme picker, mobile nav, and skill-bar animation.
   The no-flash bootstrap lives inline in each page's <head>; this file only
   handles interaction after the page has loaded. */
(function () {
  "use strict";

  var KEY = "qj-theme";

  function store(name) {
    try {
      if (name === "default") localStorage.removeItem(KEY);
      else localStorage.setItem(KEY, name);
    } catch (e) { /* private browsing — theme just won't persist */ }
  }

  function apply(name) {
    if (name === "default") document.documentElement.removeAttribute("data-theme");
    else document.documentElement.setAttribute("data-theme", name);
  }

  function current() {
    return document.documentElement.getAttribute("data-theme") || "default";
  }

  /* --- Theme dropdown ----------------------------------------------------- */
  var btn = document.querySelector(".theme-btn");
  var list = document.querySelector(".theme-list");

  function mark() {
    if (!list) return;
    var now = current();
    list.querySelectorAll("button").forEach(function (b) {
      b.setAttribute("aria-pressed", String(b.dataset.theme === now));
    });
  }

  function closeMenu() {
    if (!list || !btn) return;
    list.hidden = true;
    btn.setAttribute("aria-expanded", "false");
  }

  if (btn && list) {
    mark();

    btn.addEventListener("click", function (e) {
      e.stopPropagation();
      var open = list.hidden;
      list.hidden = !open;
      btn.setAttribute("aria-expanded", String(open));
    });

    list.addEventListener("click", function (e) {
      var target = e.target.closest("button[data-theme]");
      if (!target) return;
      apply(target.dataset.theme);
      store(target.dataset.theme);
      mark();
      closeMenu();
      btn.focus();
    });

    document.addEventListener("click", function (e) {
      if (!list.hidden && !e.target.closest(".theme")) closeMenu();
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && !list.hidden) { closeMenu(); btn.focus(); }
    });
  }

  /* --- Mobile nav --------------------------------------------------------- */
  var menuBtn = document.querySelector(".menu-btn");
  var nav = document.querySelector(".nav");
  if (menuBtn && nav) {
    menuBtn.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      menuBtn.setAttribute("aria-expanded", String(open));
    });
  }

  /* --- Skill bars fill when scrolled into view ---------------------------- */
  var fills = document.querySelectorAll(".fill[data-level]");
  if (fills.length) {
    var set = function (el) { el.style.width = el.dataset.level + "%"; };

    if (!("IntersectionObserver" in window)) {
      fills.forEach(set);
    } else {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          set(entry.target);
          io.unobserve(entry.target);
        });
      }, { threshold: 0.35 });
      fills.forEach(function (el) { io.observe(el); });
    }
  }
})();
