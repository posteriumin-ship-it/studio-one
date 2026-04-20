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
  /*
     FADE_HOLD  — fully opaque within ±0.20 of step center
     FADE_RANGE — fades to 0 by ±0.75 from center
     Slightly tightened from the previous 0.18/0.62 so each step has
     a cleaner dominant moment before the next fades in.
  */
  var FADE_HOLD  = 0.20;
  var FADE_RANGE = 0.55;
  /* Nav offset for dot-click scroll targets (fixed nav sits at top) */
  var NAV_OFFSET = 64;

  var TONES = [
    { bg: 'var(--wwd-bg-1)', fg: 'var(--wwd-fg-1)', dark: false },
    { bg: 'var(--wwd-bg-2)', fg: 'var(--wwd-fg-2)', dark: false },
    { bg: 'var(--wwd-bg-3)', fg: 'var(--wwd-fg-3)', dark: true  },
    { bg: 'var(--wwd-bg-4)', fg: 'var(--wwd-fg-4)', dark: false },
    { bg: 'var(--wwd-bg-5)', fg: 'var(--wwd-fg-5)', dark: false },
  ];

  var lastDominant = -1;
  var ticking      = false;

  /*
     isMobileMode  — ≤960px: disables the scroll-driven sticky engine
                     (both stacked tablet AND swipe mobile share this flag)
     isSwipeMode   — ≤767px: enables horizontal snap-card behaviour
                     (dot clicks scroll inline; dot rail auto-scrolls)
     reducedMotion — respects prefers-reduced-motion; snaps steps
                     instead of tweening opacity/scale
     Keep the media-query flags in sync on resize.
  */
  var isMobileMode  = false;
  var isSwipeMode   = false;
  var motionMQ      = window.matchMedia('(prefers-reduced-motion: reduce)');
  var reducedMotion = motionMQ.matches;
  if (motionMQ.addEventListener) {
    motionMQ.addEventListener('change', function(e) { reducedMotion = e.matches; });
  }

  /* ── Helpers ─────────────────────────────────────────────── */
  function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }

  function getOpacity(raw, stepIndex) {
    var distance = Math.abs(raw - (stepIndex + 0.5));
    return clamp(1 - (distance - FADE_HOLD) / FADE_RANGE, 0, 1);
  }

  function easeOut(t) { return 1 - Math.pow(1 - t, 2); }

  function syncAria(dominantStep) {
    dots.forEach(function(d) {
      var active = +d.dataset.step === dominantStep;
      d.classList.toggle('is-active', active);
      if (active) d.setAttribute('aria-current', 'step');
      else        d.removeAttribute('aria-current');
    });
  }

  /*
     scrollDotRailIntoView — centres the active dot inside the horizontal
     dot rail so it never hides off-screen when the user swipes to later
     steps.  Uses scrollTo() on the parent rail element directly rather
     than scrollIntoView() on the dot, which would scroll the whole page
     on iOS Safari.
  */
  function scrollDotRailIntoView(stepN) {
    if (!isSwipeMode) return;
    var activeDot = dots[stepN - 1];
    if (!activeDot) return;
    var rail = activeDot.parentElement;
    if (!rail) return;
    var target = activeDot.offsetLeft
               - (rail.offsetWidth / 2)
               + (activeDot.offsetWidth / 2);
    rail.scrollTo({ left: Math.max(0, target), behavior: 'smooth' });
  }

  /* ── Core update — called every rAF on scroll ─────────────── */
  function update(raw) {
    raw = clamp(raw, 0.001, STEPS - 0.001);

    /*
       Reduced-motion: snap to the nearest step — no tween. The panel +
       visual for the dominant step are shown at full opacity, the rest
       are hidden. Preserves comprehension without motion discomfort.
    */
    if (reducedMotion) {
      var snap = Math.min(STEPS - 1, Math.floor(raw));
      panels.forEach(function(panel, i) {
        var active = i === snap;
        panel.style.opacity       = active ? '1' : '0';
        panel.style.transform     = 'none';
        panel.style.pointerEvents = active ? 'auto' : 'none';
        panel.style.visibility    = active ? 'visible' : 'hidden';
        panel.style.zIndex        = active ? '10' : '0';
      });
      visuals.forEach(function(vis, i) {
        var active = i === snap;
        vis.style.opacity       = active ? '1' : '0';
        vis.style.transform     = 'none';
        vis.style.pointerEvents = active ? 'auto' : 'none';
        vis.style.visibility    = active ? 'visible' : 'hidden';
        vis.style.zIndex        = active ? '10' : '0';
      });
      if (snap !== lastDominant) {
        lastDominant = snap;
        applyTone(snap);
        syncAria(snap + 1);
      }
      return;
    }

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

    /* Dot nav + ARIA — follows dominant step */
    syncAria(dominant + 1);

    /* Background tone — only update on dominant change (CSS transition handles the fade) */
    if (dominant !== lastDominant) {
      lastDominant = dominant;
      applyTone(dominant);
    }
  }

  /*
     applyTone — set sticky background/fg from the tones table and
     sync cursor dark-mode. Extracted so the reduced-motion branch
     and the scroll-driven branch share one code path.
  */
  function applyTone(stepIndex) {
    var tone = TONES[stepIndex];
    if (!tone) return;
    /*
       Use setProperty() — not style.backgroundColor — so CSS custom
       property references like 'var(--wwd-bg-3)' are accepted.
       The shorthand setter validates for computed colours and silently
       drops var() values in some browser versions.
    */
    sticky.style.setProperty('background-color', tone.bg);
    sticky.style.setProperty('color',            tone.fg);
    sticky.classList.toggle('is-dark', tone.dark);

    /* Cursor dark-mode sync */
    var cDot  = document.getElementById('cDot');
    var cRing = document.getElementById('cRing');
    if (cDot)  cDot.classList.toggle('is-dark',  tone.dark);
    if (cRing) cRing.classList.toggle('is-dark', tone.dark);
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
    isSwipeMode  = window.matchMedia('(max-width: 767px)').matches;
    if (!isMobileMode) onScroll();
  });

  /* ── Mobile fallback: IntersectionObserver ───────────────── */
  isMobileMode = window.matchMedia('(max-width: 960px)').matches;
  isSwipeMode  = window.matchMedia('(max-width: 767px)').matches;

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
        syncAria(n);
        /* Sync dot rail position so the active tab stays in frame */
        scrollDotRailIntoView(n);
        applyTone(n - 1);
      }
    });
  }, { threshold: [0.45, 0.65] });

  panels.forEach(function(p) { panelIO.observe(p); });

  /*
     jumpToStep — unified step target used by both dot clicks and
     keyboard arrow navigation. Mobile modes scroll the panel into
     view; desktop drives the sticky scroll position directly.
  */
  function jumpToStep(n /* 0-indexed */) {
    if (n < 0 || n >= STEPS) return;
    if (isMobileMode) {
      if (isSwipeMode) {
        if (panels[n]) {
          panels[n].scrollIntoView({
            behavior: 'smooth', block: 'nearest', inline: 'start'
          });
        }
      } else {
        if (panels[n]) {
          panels[n].scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
      scrollDotRailIntoView(n + 1);
      return;
    }
    /*
       Desktop — land the sticky at the center of step n. Offset by
       NAV_OFFSET so the fixed nav doesn't obscure the sticky pin.
    */
    var outerTop   = outer.getBoundingClientRect().top + window.scrollY;
    var scrollable = outer.offsetHeight - window.innerHeight;
    window.scrollTo({
      top: outerTop + ((n + 0.5) / STEPS) * scrollable - NAV_OFFSET,
      behavior: 'smooth'
    });
  }

  /* ── Dot click — jump to step ────────────────────────────── */
  dots.forEach(function(d) {
    d.addEventListener('click', function() {
      jumpToStep(+d.dataset.step - 1);
    });
  });

  /*
     Keyboard navigation — when a dot is focused, ←/↑ steps back,
     →/↓ steps forward, Home/End jump to first/last. Desktop only
     (mobile users have touch + native scroll). Moves focus along
     with the step so screen readers follow.
  */
  var dotRail = document.getElementById('wwdDots');
  if (dotRail) {
    dotRail.addEventListener('keydown', function(e) {
      var focused = document.activeElement;
      if (!focused || !focused.classList.contains('wwd__dot')) return;
      var current = dots.indexOf(focused);
      if (current === -1) return;

      var next = current;
      if      (e.key === 'ArrowRight' || e.key === 'ArrowDown') next = current + 1;
      else if (e.key === 'ArrowLeft'  || e.key === 'ArrowUp')   next = current - 1;
      else if (e.key === 'Home')                                 next = 0;
      else if (e.key === 'End')                                  next = STEPS - 1;
      else return;

      e.preventDefault();
      next = clamp(next, 0, STEPS - 1);
      if (dots[next]) dots[next].focus();
      jumpToStep(next);
    });
  }

  /* ── Init ────────────────────────────────────────────────── */
  if (!isMobileMode) {
    update(0.5); // show step 1 immediately
    requestAnimationFrame(onScroll);
  } else {
    if (panels[0]) panels[0].classList.add('is-active');
    syncAria(1);
  }
}
