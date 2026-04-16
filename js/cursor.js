/* ============================================================
   CURSOR — clean ring + dot, no mix-blend-mode
   ============================================================ */
function initCursor() {
  var ring = document.getElementById('cRing');
  var dot  = document.getElementById('cDot');
  if (!ring || !dot) return;

  // Disable on touch devices
  if (window.matchMedia('(hover: none)').matches) return;

  var mx = 0, my = 0;
  var cx = 0, cy = 0;
  var visible = false;
  var isDark = false;

  /* ── Follow mouse ─────────────────────── */
  document.addEventListener('mousemove', function(e) {
    mx = e.clientX;
    my = e.clientY;
    // Dot follows instantly
    dot.style.transform = 'translate(' + mx + 'px,' + my + 'px)';
    if (!visible) {
      ring.classList.add('is-vis');
      visible = true;
    }
  });

  document.addEventListener('mouseleave', function() {
    ring.classList.remove('is-vis');
    dot.style.opacity = '0';
    visible = false;
  });

  document.addEventListener('mouseenter', function() {
    dot.style.opacity = '1';
    visible = true;
  });

  /* ── Ring follows with lerp ───────────── */
  (function animate() {
    cx += (mx - cx) * 0.13;
    cy += (my - cy) * 0.13;
    ring.style.transform = 'translate(' + cx + 'px,' + cy + 'px)';
    requestAnimationFrame(animate);
  })();

  /* ── Dark bg detection ────────────────── */
  function checkDarkBg() {
    var el = document.elementFromPoint(mx, my);
    if (!el) return;
    var bg = window.getComputedStyle(el).backgroundColor;
    var match = bg.match(/\d+/g);
    if (match) {
      var r = +match[0], g = +match[1], b = +match[2];
      var lum = (0.299*r + 0.587*g + 0.114*b);
      var dark = lum < 80;
      if (dark !== isDark) {
        isDark = dark;
        ring.classList.toggle('is-dark', dark);
        dot.classList.toggle('is-dark', dark);
      }
    }
  }
  setInterval(checkDarkBg, 200);

  /* ── Hover states ─────────────────────── */
  // Expand on interactive elements
  var expandSel = [
    'a', 'button', '.btn-primary', '.btn-accent', '.btn-ghost',
    '.btn-outline-light', '.nav__cta', '.pkg-sel__item',
    '.pkg-cat', '.wwd__dot', '.svc-card__link'
  ].join(',');

  document.addEventListener('mouseover', function(e) {
    var el = e.target.closest(expandSel);
    var viewEl = e.target.closest('[data-cursor="view"]');

    if (viewEl) {
      ring.classList.remove('is-expand');
      ring.classList.add('is-view');
    } else if (el) {
      ring.classList.remove('is-view');
      ring.classList.add('is-expand');
    } else {
      ring.classList.remove('is-expand', 'is-view');
    }
  });

  document.addEventListener('mouseout', function(e) {
    var el = e.target.closest(expandSel + ',[data-cursor="view"]');
    if (el) {
      ring.classList.remove('is-expand', 'is-view');
    }
  });

  /* ── Cursor down feedback ─────────────── */
  document.addEventListener('mousedown', function() {
    ring.style.transform = ring.style.transform + ' scale(0.88)';
    setTimeout(function() { /* rAF handles it */ }, 100);
  });
}
