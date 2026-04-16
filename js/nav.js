/* ============================================================
   NAV — scroll state + mobile menu
   ============================================================ */
function initNav() {
  var nav    = document.getElementById('nav');
  var burger = document.getElementById('navBurger');
  var mobile = document.getElementById('navMobile');
  if (!nav) return;

  /* ── Scrolled class ───────────────────── */
  var ticking = false;
  window.addEventListener('scroll', function() {
    if (!ticking) {
      requestAnimationFrame(function() {
        nav.classList.toggle('is-scrolled', window.scrollY > 48);
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  /* ── Mobile menu ──────────────────────── */
  if (burger && mobile) {
    burger.addEventListener('click', function() {
      var open = mobile.classList.toggle('is-open');
      burger.classList.toggle('is-open', open);
      document.body.style.overflow = open ? 'hidden' : '';
    });

    // Close on link click
    mobile.querySelectorAll('a').forEach(function(a) {
      a.addEventListener('click', function() {
        mobile.classList.remove('is-open');
        burger.classList.remove('is-open');
        document.body.style.overflow = '';
      });
    });
  }

  /* ── Smooth anchor scroll ─────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(function(a) {
    a.addEventListener('click', function(e) {
      var id = a.getAttribute('href').slice(1);
      if (!id) return;
      var target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      var top = target.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: top, behavior: 'smooth' });
    });
  });
}
