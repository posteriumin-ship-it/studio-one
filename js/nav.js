/* ============================================================
   NAV  —  scroll state + mobile menu + anchor scroll
   ------------------------------------------------------------
   Responsibilities
     1. Toggle `.is-scrolled` on the fixed nav after short scroll.
     2. Drive the mobile menu: open / close, scroll-lock, ARIA,
        ESC-to-close, close-on-viewport-upgrade, tap-away on links.
     3. Smooth-scroll in-page anchor links, offsetting for the
        current nav height so the target isn't hidden behind it.

   All DOM writes go through a single `setMenuOpen()` so state
   can never drift between .is-open / aria / body-lock / inert.
   ============================================================ */
function initNav() {
  var nav    = document.getElementById('nav');
  var burger = document.getElementById('navBurger');
  var mobile = document.getElementById('navMobile');
  if (!nav) return;

  /* ── Scrolled class (rAF-throttled) ───────────────────── */
  var ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () {
      nav.classList.toggle('is-scrolled', window.scrollY > 48);
      ticking = false;
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // apply correct state on load (refresh mid-page)

  /* ── Mobile menu ──────────────────────────────────────── */
  if (burger && mobile) {
    var desktopMQ = window.matchMedia('(min-width: 768px)');

    function setMenuOpen(open) {
      mobile.classList.toggle('is-open', open);
      burger.classList.toggle('is-open', open);
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
      burger.setAttribute('aria-label', open ? 'Zatvori meni' : 'Otvori meni');
      mobile.setAttribute('aria-hidden', open ? 'false' : 'true');
      // `inert` removes closed-menu links from focus order and AT.
      if (open) { mobile.removeAttribute('inert'); }
      else      { mobile.setAttribute('inert', ''); }
      document.body.style.overflow = open ? 'hidden' : '';
    }

    // Initialise closed state (keeps markup + runtime in sync)
    setMenuOpen(false);

    burger.addEventListener('click', function () {
      setMenuOpen(!mobile.classList.contains('is-open'));
    });

    // Close when any menu link is tapped
    mobile.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { setMenuOpen(false); });
    });

    // Close on ESC while open
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && mobile.classList.contains('is-open')) {
        setMenuOpen(false);
        burger.focus();
      }
    });

    // Close if viewport crosses into desktop while the menu is open
    function onMQChange(e) {
      if (e.matches && mobile.classList.contains('is-open')) setMenuOpen(false);
    }
    if (desktopMQ.addEventListener) desktopMQ.addEventListener('change', onMQChange);
    else if (desktopMQ.addListener)  desktopMQ.addListener(onMQChange); // Safari <14
  }

  /* ── Smooth anchor scroll ─────────────────────────────── */
  /*
     Offset = current nav height + small breathing room, so the
     target heading doesn't collide with the fixed bar. Nav height
     changes between desktop (64) and mobile (56) — we read the
     live value instead of hardcoding.
  */
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var id = a.getAttribute('href').slice(1);
      if (!id) return;
      var target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      var offset = (nav.offsetHeight || 64) + 16;
      var top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: top, behavior: 'smooth' });
    });
  });
}
