/* ============================================================
   REVEAL — IntersectionObserver scroll reveals + counter
   ============================================================ */
function initReveal() {

  /* ── Fade-in reveals ──────────────────── */
  var revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length) {
    var revealIO = new IntersectionObserver(function(entries) {
      entries.forEach(function(e) {
        if (e.isIntersecting) {
          e.target.classList.add('is-in');
          revealIO.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });

    revealEls.forEach(function(el) { revealIO.observe(el); });
  }

  /* ── Animated counters ────────────────── */
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
