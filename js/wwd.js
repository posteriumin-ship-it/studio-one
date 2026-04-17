/* ============================================================
   WwD — cinematic overlap scroll
   Continuous opacity driven by scroll distance from each step's
   center — no hard class-switching, panels overlap during transition.
   ============================================================ */
function initWwd() {
  var outer   = document.getElementById('wwdOuter');
  var sticky  = document.getElementById('wwdSticky');
  var dots    = Array.from(document.querySelectorAll('.wwd__dot'));
  var panels  = Array.from(document.querySelectorAll('.wwd__panel'));
  var visuals = Array.from(document.querySelectorAll('.wwd__vis'));
  if (!outer || !sticky) return;

  /* ── Constants ──────────────────────────────────────────── */
  var STEPS      = 5;
  var FADE_HOLD  = 0.18;   // fully opaque within ±0.18 of step center
  var FADE_RANGE = 0.62;   // fades to 0 by ±0.80 from center

  var TONES = [
    { bg: 'var(--wwd-bg-1)', fg: 'var(--wwd-fg-1)', dark: false },
    { bg: 'var(--wwd-bg-2)', fg: 'var(--wwd-fg-2)', dark: false },
    { bg: 'var(--wwd-bg-3)', fg: 'var(--wwd-fg-3)', dark: true  },
    { bg: 'var(--wwd-bg-4)', fg: 'var(--wwd-fg-4)', dark: false },
    { bg: 'var(--wwd-bg-5)', fg: 'var(--wwd-fg-5)', dark: false },
  ];

  var lastDominant = -1;
  var ticking      = false;
  var isMobileMode = false;

  /* ── Helpers ─────────────────────────────────────────────── */
  function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }

  function getOpacity(raw, stepIndex) {
    var distance = Math.abs(raw - (stepIndex + 0.5));
    return clamp(1 - (distance - FADE_HOLD) / FADE_RANGE, 0, 1);
  }

  function easeOut(t) { return 1 - Math.pow(1 - t, 2); }

  /* ── Core update — called every rAF on scroll ─────────────── */
  function update(raw) {
    raw = clamp(raw, 0.001, STEPS - 0.001);

    var maxOp     = -1;
    var dominant  = 0;
    var opacities = [];

    for (var i = 0; i < STEPS; i++) {
      var op = easeOut(getOpacity(raw, i));
      opacities.push(op);
      if (op > maxOp) { maxOp = op; dominant = i; }
    }

    /* Text panels */
    panels.forEach(function(panel, i) {
      var op   = opacities[i];
      var diff = raw - (i + 0.5);
      // entering from below (+22px → 0), leaving upward (0 → -14px)
      var ty   = diff <= 0 ? (1 - op) * 22 : -(1 - op) * 14;

      if (op > 0.005) {
        panel.style.opacity       = op;
        panel.style.transform     = 'translateY(' + clamp(ty, -14, 22).toFixed(2) + 'px)';
        panel.style.pointerEvents = op > 0.5 ? 'auto' : 'none';
        panel.style.zIndex        = Math.round(op * 10);
        panel.style.visibility    = 'visible';
      } else {
        panel.style.opacity       = '0';
        panel.style.transform     = 'translateY(22px)';
        panel.style.pointerEvents = 'none';
        panel.style.zIndex        = '0';
        panel.style.visibility    = 'hidden';
      }
    });

    /* Visual panels */
    visuals.forEach(function(vis, i) {
      var op    = opacities[i];
      var scale = 1 + (1 - op) * 0.035; // subtle zoom-out when hidden

      if (op > 0.005) {
        vis.style.opacity       = op;
        vis.style.transform     = 'scale(' + scale.toFixed(4) + ')';
        vis.style.pointerEvents = op > 0.5 ? 'auto' : 'none';
        vis.style.zIndex        = Math.round(op * 10);
        vis.style.visibility    = 'visible';
      } else {
        vis.style.opacity       = '0';
        vis.style.transform     = 'scale(1.035)';
        vis.style.pointerEvents = 'none';
        vis.style.zIndex        = '0';
        vis.style.visibility    = 'hidden';
      }
    });

    /* Dot nav — follows dominant step */
    var dominantStep = dominant + 1;
    dots.forEach(function(d) {
      d.classList.toggle('is-active', +d.dataset.step === dominantStep);
    });

    /* Background tone — only update on dominant change (CSS transition handles the fade) */
    if (dominant !== lastDominant) {
      lastDominant = dominant;
      var tone = TONES[dominant];
      sticky.style.backgroundColor = tone.bg;
      sticky.style.color           = tone.fg;
      sticky.classList.toggle('is-dark', tone.dark);

      /* Cursor dark-mode sync */
      var cDot  = document.getElementById('cDot');
      var cRing = document.getElementById('cRing');
      if (cDot)  cDot.classList.toggle('is-dark',  tone.dark);
      if (cRing) cRing.classList.toggle('is-dark', tone.dark);
    }
  }

  /* ── Scroll handler ──────────────────────────────────────── */
  function onScroll() {
    if (isMobileMode) return;
    var outerTop   = outer.getBoundingClientRect().top + window.scrollY;
    var scrollable = outer.offsetHeight - window.innerHeight;
    if (scrollable <= 0) return;
    var raw = (window.scrollY - outerTop) / scrollable * STEPS;
    update(raw);
  }

  window.addEventListener('scroll', function() {
    if (isMobileMode || ticking) return;
    ticking = true;
    requestAnimationFrame(function() { onScroll(); ticking = false; });
  }, { passive: true });

  window.addEventListener('resize', function() {
    isMobileMode = window.matchMedia('(max-width: 960px)').matches;
    if (!isMobileMode) onScroll();
  });

  /* ── Mobile fallback: IntersectionObserver ───────────────── */
  isMobileMode = window.matchMedia('(max-width: 960px)').matches;

  var panelIO = new IntersectionObserver(function(entries) {
    if (!isMobileMode) return;
    entries.forEach(function(e) {
      if (e.isIntersecting && e.intersectionRatio > 0.45) {
        var n = +e.target.dataset.panel;
        /* Reset inline styles set by desktop JS */
        panels.forEach(function(p) {
          p.style.cssText = '';
          p.classList.toggle('is-active', +p.dataset.panel === n);
        });
        dots.forEach(function(d) {
          d.classList.toggle('is-active', +d.dataset.step === n);
        });
        var tone = TONES[n - 1] || TONES[0];
        sticky.style.backgroundColor = tone.bg;
        sticky.style.color           = tone.fg;
        sticky.classList.toggle('is-dark', tone.dark);
      }
    });
  }, { threshold: [0.45, 0.65] });

  panels.forEach(function(p) { panelIO.observe(p); });

  /* ── Dot click — jump to step ────────────────────────────── */
  dots.forEach(function(d) {
    d.addEventListener('click', function() {
      var n = +d.dataset.step - 1;
      if (isMobileMode) {
        /* Mobile: snap-scroll the panels rail to the target card */
        if (panels[n]) {
          panels[n].scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
            inline: 'start'
          });
        }
        return;
      }
      /* Desktop: drive the sticky scroll position */
      var outerTop   = outer.getBoundingClientRect().top + window.scrollY;
      var scrollable = outer.offsetHeight - window.innerHeight;
      window.scrollTo({
        top: outerTop + ((n + 0.5) / STEPS) * scrollable,
        behavior: 'smooth'
      });
    });
  });

  /* ── Init ────────────────────────────────────────────────── */
  if (!isMobileMode) {
    update(0.5); // show step 1 immediately
    requestAnimationFrame(onScroll);
  } else {
    if (panels[0]) panels[0].classList.add('is-active');
  }
}
