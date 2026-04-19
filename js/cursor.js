/* ============================================================
   CURSOR — morphing pill with contextual labels
   Default: small dot (exact) + thin ring (lagging)
   Hover:   dot hides, ring morphs into labeled pill
   ============================================================ */
function initCursor() {
  var ring = document.getElementById('cRing');
  var dot  = document.getElementById('cDot');
  if (!ring || !dot) return;

  /* Touch / no-hover devices: skip entirely */
  if (window.matchMedia('(hover: none)').matches) return;

  /* ── Inject label element into ring ─────── */
  var label = document.createElement('span');
  label.className = 'c-ring__label';
  ring.appendChild(label);

  /* ── Language detection ──────────────────── */
  var isEN = document.documentElement.lang === 'en';

  /* ── State ───────────────────────────────── */
  var mx = 0, my = 0;   /* exact mouse */
  var cx = 0, cy = 0;   /* lerp position */
  var visible  = false;
  var isDark   = false;
  var isPill   = false;
  var isPress  = false;

  /* Dimensions for centering */
  var DEFAULT_W = 28, DEFAULT_H = 28;
  var PILL_W = 86,    PILL_H = 26;

  /* ── Label map — bilingual ───────────────── */
  var LABELS = isEN ? {
    'open'    : 'Open',
    'view'    : 'View',
    'book'    : 'Book',
    'send'    : 'Send',
    'details' : 'Details',
    'close'   : 'Close',
    'drag'    : 'Drag',
    'expand'  : 'Open',
    'contact' : 'Contact',
  } : {
    'open'    : 'Otvori',
    'view'    : 'Pogledaj',
    'book'    : 'Zakaži',
    'send'    : 'Pošalji',
    'details' : 'Detalji',
    'close'   : 'Zatvori',
    'drag'    : 'Prevuci',
    'expand'  : 'Otvori',
    'contact' : 'Kontakt',
  };

  /* Selector → label key.
     Listed from most specific to least specific. */
  var TARGETS = [
    { sel: '.preview__close',          key: 'close'   },
    { sel: '.nav__cta',                key: 'book'    },
    { sel: '.btn-primary',             key: 'book'    },
    { sel: '.btn-primary-light',       key: 'book'    },
    { sel: '[href*="kontakt"]',        key: 'contact' },
    { sel: '[href*="contact"]',        key: 'contact' },
    { sel: '[href*="mailto"]',         key: 'send'    },
    { sel: '.proj-card',               key: 'details' },
    { sel: '.pkg-sel__item',           key: 'view'    },
    { sel: '.pkg-cat',                 key: 'view'    },
    { sel: '.wwd__dot',                key: 'view'    },
    { sel: '.filter__tab',             key: 'view'    },
    { sel: '.faq__q',                  key: 'open'    },
    { sel: 'a',                        key: 'open'    },
    { sel: 'button',                   key: 'open'    },
  ];

  /* Form fields where we restore system cursor */
  var FORM_SEL = 'input, textarea, select, [contenteditable]';

  /* ── Mouse tracking ──────────────────────── */
  var lastDarkCheck = 0;

  document.addEventListener('mousemove', function(e) {
    mx = e.clientX;
    my = e.clientY;
    dot.style.transform = 'translate(' + mx + 'px,' + my + 'px)';
    if (!visible) {
      visible = true;
      ring.classList.add('is-vis');
      dot.classList.add('is-vis');
    }
    /* ── Dark bg detection on mousemove, throttled ── */
    var now = Date.now();
    if (now - lastDarkCheck > 100) {
      lastDarkCheck = now;
      checkDark();
    }
  });

  document.addEventListener('mouseleave', function() {
    visible = false;
    ring.classList.remove('is-vis');
    dot.classList.remove('is-vis');
  });
  document.addEventListener('mouseenter', function() {
    visible = true;
    ring.classList.add('is-vis');
    dot.classList.add('is-vis');
  });

  /* ── rAF lerp loop ───────────────────────── */
  (function animate() {
    cx += (mx - cx) * 0.10;
    cy += (my - cy) * 0.10;

    var hw = isPill ? PILL_W / 2 : DEFAULT_W / 2;
    var hh = isPill ? PILL_H / 2 : DEFAULT_H / 2;

    ring.style.transform =
      'translate(' + (cx - hw).toFixed(1) + 'px,' + (cy - hh).toFixed(1) + 'px)' +
      (isPress ? ' scale(0.92)' : '');

    requestAnimationFrame(animate);
  })();

  /* ── Hover: resolve interactive target ────── */
  function resolve(el) {
    /* Form field: special case */
    if (el.matches && el.matches(FORM_SEL)) return 'form';
    if (el.closest && el.closest(FORM_SEL)) return 'form';

    /* Radovi preview should stay visually clean on hover */
    if (el.closest && el.closest('.work-card__preview')) return null;

    /* data-cursor attribute takes priority */
    var dataCursor = el.closest ? el.closest('[data-cursor]') : null;
    if (dataCursor) {
      return LABELS[dataCursor.dataset.cursor] || dataCursor.dataset.cursor;
    }

    for (var i = 0; i < TARGETS.length; i++) {
      var match = el.closest ? el.closest(TARGETS[i].sel) : null;
      if (match) return LABELS[TARGETS[i].key];
    }
    return null;
  }

  function showPill(text) {
    isPill = true;
    label.textContent = text;
    ring.classList.add('is-pill');
    dot.classList.add('is-hover');
  }

  function hidePill() {
    isPill = false;
    label.textContent = '';
    ring.classList.remove('is-pill');
    dot.classList.remove('is-hover');
  }

  function showFormCursor() {
    dot.classList.add('is-form');
    hidePill();
  }
  function hideFormCursor() {
    dot.classList.remove('is-form');
  }

  document.addEventListener('mouseover', function(e) {
    var result = resolve(e.target);
    if (result === 'form')      { showFormCursor(); }
    else if (result)            { hideFormCursor(); showPill(result); }
    else                        { hideFormCursor(); hidePill(); }
  });

  document.addEventListener('mouseout', function(e) {
    var next = e.relatedTarget;
    if (!next) { hidePill(); hideFormCursor(); return; }
    var result = resolve(next);
    if (result === 'form')      { showFormCursor(); }
    else if (result)            { hideFormCursor(); showPill(result); }
    else                        { hideFormCursor(); hidePill(); }
  });

  /* ── Click feedback ──────────────────────── */
  document.addEventListener('mousedown', function() {
    isPress = true;
    ring.classList.add('is-press');
  });
  document.addEventListener('mouseup', function() {
    isPress = false;
    ring.classList.remove('is-press');
  });

  /* ── Dark bg detection ───────────────────── */
  /* Called from mousemove (throttled to ~10/s) — no setInterval needed */
  function checkDark() {
    var el = document.elementFromPoint(mx, my);
    if (!el) return;
    /* Walk up until we find a bg that isn't transparent */
    var node = el;
    while (node && node !== document.body) {
      var bg = getComputedStyle(node).backgroundColor;
      var m  = bg.match(/\d+/g);
      if (m && +m[3] !== 0) { /* alpha present and non-zero */
        var lum = 0.299 * +m[0] + 0.587 * +m[1] + 0.114 * +m[2];
        var dark = lum < 85;
        if (dark !== isDark) {
          isDark = dark;
          ring.classList.toggle('is-dark', dark);
          dot.classList.toggle('is-dark', dark);
        }
        return;
      }
      /* rgba(r,g,b,0) = transparent, keep walking up */
      if (m && +m[3] === 0) { node = node.parentElement; continue; }
      /* rgb(r,g,b) — no alpha in match */
      if (m && m.length === 3) {
        var lum2 = 0.299 * +m[0] + 0.587 * +m[1] + 0.114 * +m[2];
        var dark2 = lum2 < 85;
        if (dark2 !== isDark) {
          isDark = dark2;
          ring.classList.toggle('is-dark', dark2);
          dot.classList.toggle('is-dark', dark2);
        }
        return;
      }
      node = node.parentElement;
    }
  }
}
