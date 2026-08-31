/* Theme picker and mobile nav.
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
    if (window.__qjReadFxColors) window.__qjReadFxColors();
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

  /* --- Background particle field ------------------------------------------
     A quiet drifting node/edge network behind the page content, in the
     current theme's accent colors. Skipped entirely under
     prefers-reduced-motion (the canvas is also display:none via CSS). ----- */
  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!reduceMotion && "requestAnimationFrame" in window) {
    var canvas = document.createElement("canvas");
    canvas.id = "fx";
    canvas.setAttribute("aria-hidden", "true");
    document.body.insertBefore(canvas, document.body.firstChild);

    var ctx = canvas.getContext("2d");
    var W = 0, H = 0, DPR = Math.min(window.devicePixelRatio || 1, 2);
    var dotColor = "79,214,255", lineColor = "154,123,255";

    function readColors() {
      var css = getComputedStyle(document.documentElement);
      var toRgb = function (val) {
        val = val.trim();
        var m = val.match(/^#([0-9a-f]{6})$/i);
        if (m) {
          var n = parseInt(m[1], 16);
          return [(n >> 16) & 255, (n >> 8) & 255, n & 255].join(",");
        }
        m = val.match(/rgba?\(([^)]+)\)/);
        if (m) return m[1].split(",").slice(0, 3).join(",");
        return null;
      };
      dotColor = toRgb(css.getPropertyValue("--accent")) || dotColor;
      lineColor = toRgb(css.getPropertyValue("--accent2")) || lineColor;
    }
    window.__qjReadFxColors = readColors;
    readColors();

    var particles = [];
    function init() {
      W = canvas.width = Math.floor(window.innerWidth * DPR);
      H = canvas.height = Math.floor(window.innerHeight * DPR);
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";
      var count = Math.min(70, Math.round((window.innerWidth * window.innerHeight) / 22000));
      particles = [];
      for (var i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * W,
          y: Math.random() * H,
          vx: (Math.random() - 0.5) * 0.18 * DPR,
          vy: (Math.random() - 0.5) * 0.18 * DPR,
          r: (Math.random() * 1.3 + 0.6) * DPR
        });
      }
    }

    var linkDist = 130;
    function tick() {
      if (!document.hidden) {
        ctx.clearRect(0, 0, W, H);
        var ld = linkDist * DPR;

        for (var i = 0; i < particles.length; i++) {
          var p = particles[i];
          p.x += p.vx; p.y += p.vy;
          if (p.x < 0 || p.x > W) p.vx *= -1;
          if (p.y < 0 || p.y > H) p.vy *= -1;

          for (var j = i + 1; j < particles.length; j++) {
            var q = particles[j];
            var dx = p.x - q.x, dy = p.y - q.y;
            var dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < ld) {
              ctx.strokeStyle = "rgba(" + lineColor + "," + (0.16 * (1 - dist / ld)) + ")";
              ctx.lineWidth = DPR * 0.6;
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(q.x, q.y);
              ctx.stroke();
            }
          }
        }
        for (var k = 0; k < particles.length; k++) {
          var d = particles[k];
          ctx.fillStyle = "rgba(" + dotColor + ",.75)";
          ctx.beginPath();
          ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      requestAnimationFrame(tick);
    }

    init();
    requestAnimationFrame(tick);

    var resizeTimer;
    window.addEventListener("resize", function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(init, 150);
    });
  }
})();
