/* ============================================================
   REVEAL — IntersectionObserver scroll reveals + counter
   Premium animation types: fade-rise, clip-path, blur-rise,
   section labels, manifesto list, ul-sweep
   ============================================================ */
function initReveal() {

  /* ── Shared helper ────────────────────────── */
  function observe(selector, callback, options) {
    var els = document.querySelectorAll(selector);
    if (!els.length) return;
    var io = new IntersectionObserver(function(entries) {
      entries.forEach(function(e) {
        if (e.isIntersecting) {
          callback(e.target, io);
        }
      });
    }, options || { threshold: 0.12 });
    els.forEach(function(el) { io.observe(el); });
  }

  /* ── 1. Standard fade-rise reveals ─────────── */
  observe('.reveal', function(el, io) {
    el.classList.add('is-in');
    io.unobserve(el);
  }, { threshold: 0.02 });

  /* ── 2. Clip-path headline reveals ─────────── */
  observe('.reveal-clip', function(el, io) {
    el.classList.add('is-in');
    io.unobserve(el);
  }, { threshold: 0.14 });

  /* ── 3. Blur-rise paragraph reveals ─────────── */
  observe('.reveal-blur', function(el, io) {
    el.classList.add('is-in');
    io.unobserve(el);
  }, { threshold: 0.04 });

  /* ── 4. Section focus line reveals ─────────── */
  observe('.reveal-line', function(el, io) {
    el.classList.add('is-in');
    io.unobserve(el);
  }, { threshold: 0.14 });

  /* ── 5. Section label line sweep ─────────── */
  observe('.section__label', function(el, io) {
    el.classList.add('is-in');
    io.unobserve(el);
  }, { threshold: 0.5 });

  /* ── 6. Manifesto list stagger ─────────── */
  observe('.manifesto__list', function(el, io) {
    el.classList.add('is-in');
    io.unobserve(el);
  }, { threshold: 0.2 });

  /* ── 7. Inline underline sweep (standalone use) ── */
  observe('.ul-sweep', function(el, io) {
    el.classList.add('is-in');
    io.unobserve(el);
  }, { threshold: 0.5 });

  /* ── 8. Animated counters ─────────────────── */
  var counters = document.querySelectorAll('.stat-n[data-count]');
  if (counters.length) {
    var counterIO = new IntersectionObserver(function(entries) {
      entries.forEach(function(e) {
        if (!e.isIntersecting) return;
        counterIO.unobserve(e.target);
        var el  = e.target;
        var end = parseInt(el.dataset.count, 10);
        if (isNaN(end)) return;

        var duration = 1400;
        var start    = null;

        function step(ts) {
          if (!start) start = ts;
          var p    = Math.min((ts - start) / duration, 1);
          var ease = 1 - Math.pow(1 - p, 4); // ease-out-quart
          el.textContent = Math.round(ease * end);
          if (p < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
      });
    }, { threshold: 0.5 });

    counters.forEach(function(c) { counterIO.observe(c); });
  }
}
