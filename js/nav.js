/* ============================================================
   ANALYTICS — shared bootstrap
   ------------------------------------------------------------
   We keep analytics prep here because nav.js is the one script
   already loaded on every page of the site.

   Launch setup: Google Analytics 4 via gtag.js
   - shared loader for all pages
   - no event tracking yet
   - inert until the real GA4 Measurement ID is inserted
   - no user-facing behavior changes

   To enable later, replace REPLACE_WITH_GA4_MEASUREMENT_ID with
   your real GA4 Measurement ID (example format: G-XXXXXXXXXX).
   ============================================================ */
(function initAnalyticsBootstrap() {
  var config = {
    provider: 'ga4',
    measurementId: 'REPLACE_WITH_GA4_MEASUREMENT_ID',
    scriptSrc: 'https://www.googletagmanager.com/gtag/js'
  };

  var host = window.location.hostname;
  var isLocalhost = host === 'localhost' || host === '127.0.0.1' || host === '';
  var hasPlaceholderId = !config.measurementId || /REPLACE_WITH_/i.test(config.measurementId);

  if (config.provider !== 'ga4') return;
  if (isLocalhost || hasPlaceholderId || !config.scriptSrc) return;
  if (document.querySelector('script[data-studio-one-analytics="ga4"]')) return;

  var script = document.createElement('script');
  script.defer = true;
  script.src = config.scriptSrc + '?id=' + encodeURIComponent(config.measurementId);
  script.setAttribute('data-studio-one-analytics', 'ga4');
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function gtag(){ window.dataLayer.push(arguments); };
  window.gtag('js', new Date());
  window.gtag('config', config.measurementId);
})();

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
