/* ============================================================
   Radovi — portfolio page
   Filter tabs + project grid + iframe preview overlay
   Bilingual: tags and UI strings adapt to lang="sr|en".
   ============================================================ */
function initRadovi() {

  /* ── Language detection ──────────────────── */
  var isEN = document.documentElement.lang === 'en';

  /* ── UI strings ──────────────────────────── */
  var UI = isEN ? {
    webCta      : 'Preview →',
    fotoLabel   : 'Photography',
  } : {
    webCta      : 'Pregledaj →',
    fotoLabel   : 'Fotografija',
  };

  /* ── Project data ────────────────────────── */
  /* tag / tag_en — render based on language   */
  var PROJECTS = {
    web: [
      {
        n: '01', name: 'Posterium', domain: 'posteriumin.com',
        url: 'https://posteriumin.com/en',
        tag: 'E-commerce · Brend',      tag_en: 'E-commerce · Brand'
      },
      {
        n: '02', name: 'Interplast-S', domain: 'interplast-s.com',
        url: 'https://interplast-s.com/',
        tag: 'Korporativni sajt',        tag_en: 'Corporate website'
      },
      {
        n: '03', name: 'Dr MetalPlus', domain: 'dr-metalplus.com',
        url: 'https://dr-metalplus.com/',
        tag: 'Medicinski servis',        tag_en: 'Medical service'
      },
      {
        n: '04', name: 'EDC Satovi', domain: 'edcsatovishop.com',
        url: 'https://edcsatovishop.com/',
        tag: 'Online prodavnica',        tag_en: 'Online store'
      }
    ],
    foto: [
      { n: '01', name: 'Portrait series',      tag: 'Fotografija · 2025', tag_en: 'Photography · 2025' },
      { n: '02', name: 'Product shoot',        tag: 'Fotografija · 2024', tag_en: 'Photography · 2024' },
      { n: '03', name: 'Architectural series', tag: 'Fotografija · 2024', tag_en: 'Photography · 2024' }
    ],
    ig: [
      { n: '01', name: 'Posterium',  handle: '@posteriumin',   tag: 'E-commerce · Fashion',    tag_en: 'E-commerce · Fashion'  },
      { n: '02', name: 'EDC Satovi', handle: '@edcsatovishop', tag: 'Online prodavnica',        tag_en: 'Online store'          }
      /* Note: third IG slot removed — placeholder "Projekat 03" was not real work */
    ]
  };

  /* Helper: resolve correct tag string for current language */
  function getTag(p) {
    return isEN && p.tag_en ? p.tag_en : p.tag;
  }

  /* ── DOM refs ────────────────────────────── */
  var grid      = document.getElementById('radoviGrid');
  var filter    = document.getElementById('radoviFilter');
  var indicator = document.getElementById('filterIndicator');
  var tabs      = Array.from(document.querySelectorAll('.filter__tab'));

  var overlay      = document.getElementById('previewOverlay');
  var iframe       = document.getElementById('previewIframe');
  var siteName     = document.getElementById('previewSiteName');
  var extLink      = document.getElementById('previewExtLink');
  var closeBtn     = document.getElementById('previewClose');
  var blocked      = document.getElementById('previewBlocked');
  var blockedLink  = document.getElementById('previewBlockedLink');

  if (!grid || !filter) return;

  var activeCat = 'web';

  /* ── Build cards ─────────────────────────── */
  function buildWebCard(p) {
    var el = document.createElement('div');
    el.className = 'proj-card proj-card--web';
    el.innerHTML =
      '<span class="proj-card__n">' + p.n + '</span>' +
      '<span class="proj-card__domain">' + p.domain + '</span>' +
      '<h2 class="proj-card__name">' + p.name + '</h2>' +
      '<span class="proj-card__tag">' + getTag(p) + '</span>' +
      '<span class="proj-card__cta">' + UI.webCta + '</span>';
    el.addEventListener('click', function() { openPreview(p); });
    return el;
  }

  function buildFotoCard(p) {
    var el = document.createElement('div');
    el.className = 'proj-card proj-card--foto';
    el.innerHTML =
      '<span class="proj-card__n">' + p.n + '</span>' +
      '<div class="foto-frame"><span class="foto-frame__label">' + UI.fotoLabel + '</span></div>' +
      '<h2 class="proj-card__name" style="position:absolute;bottom:66px;left:22px;right:22px;font-family:var(--font-serif);font-weight:300;font-size:clamp(22px,2.8vw,40px);line-height:.95;letter-spacing:-.03em;">' + p.name + '</h2>' +
      '<span class="proj-card__tag">' + getTag(p) + '</span>';
    return el;
  }

  function buildIgCard(p) {
    var cells = '';
    for (var i = 0; i < 9; i++) { cells += '<div class="ig-phone__cell"></div>'; }
    var el = document.createElement('div');
    el.className = 'proj-card proj-card--ig';
    el.innerHTML =
      '<span class="proj-card__n">' + p.n + '</span>' +
      '<div class="ig-phone">' +
        '<div class="ig-phone__bar">' + p.handle + '</div>' +
        '<div class="ig-phone__grid">' + cells + '</div>' +
      '</div>' +
      '<span class="proj-card__tag">' + getTag(p) + '</span>';
    return el;
  }

  /* ── Render grid for a category ──────────── */
  function renderGrid(cat, animate) {
    var items = PROJECTS[cat] || [];

    /* Fade out existing cards */
    var existing = Array.from(grid.querySelectorAll('.proj-card'));
    existing.forEach(function(c) {
      c.style.opacity = '0';
      c.style.transform = 'translateY(10px)';
    });

    var delay = animate && existing.length ? 180 : 0;

    setTimeout(function() {
      grid.innerHTML = '';
      items.forEach(function(p, idx) {
        var card;
        if (cat === 'web')  card = buildWebCard(p);
        if (cat === 'foto') card = buildFotoCard(p);
        if (cat === 'ig')   card = buildIgCard(p);
        grid.appendChild(card);

        /* Staggered entrance */
        setTimeout(function() {
          card.classList.add('is-in');
        }, 60 + idx * 90);
      });
    }, delay);
  }

  /* ── Sliding indicator ───────────────────── */
  function moveIndicator(tab) {
    var filterRect = filter.getBoundingClientRect();
    var tabRect    = tab.getBoundingClientRect();
    indicator.style.left  = (tabRect.left - filterRect.left + filter.scrollLeft) + 'px';
    indicator.style.width = tabRect.width + 'px';
  }

  /* ── Tab switching ───────────────────────── */
  tabs.forEach(function(tab) {
    tab.addEventListener('click', function() {
      if (tab.dataset.cat === activeCat) return;
      activeCat = tab.dataset.cat;

      tabs.forEach(function(t) { t.classList.remove('is-active'); });
      tab.classList.add('is-active');
      moveIndicator(tab);
      renderGrid(activeCat, true);
    });
  });

  /* ── iframe Preview ──────────────────────── */
  function openPreview(p) {
    if (!overlay) return;

    siteName.textContent    = p.domain || p.name;
    extLink.href            = p.url;
    blockedLink.href        = p.url;
    blocked.classList.remove('is-visible');
    iframe.src              = '';

    overlay.classList.add('is-open');
    document.body.style.overflow = 'hidden';

    /* Small delay before loading iframe so overlay animates in first */
    setTimeout(function() {
      iframe.src = p.url;
    }, 200);

    /* Detect if iframe was blocked (X-Frame-Options) */
    iframe.onload = function() {
      try {
        /* If we can access contentWindow.location it loaded OK */
        var loc = iframe.contentWindow.location.href;
        if (!loc || loc === 'about:blank') throw new Error('blank');
        blocked.classList.remove('is-visible');
      } catch(e) {
        /* Cross-origin or blocked — show fallback */
        blocked.classList.add('is-visible');
      }
    };

    iframe.onerror = function() {
      blocked.classList.add('is-visible');
    };
  }

  function closePreview() {
    overlay.classList.remove('is-open');
    document.body.style.overflow = '';
    setTimeout(function() { iframe.src = ''; }, 500);
  }

  if (closeBtn)  closeBtn.addEventListener('click', closePreview);
  if (overlay)   overlay.addEventListener('click', function(e) {
    if (e.target === overlay) closePreview();
  });
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closePreview();
  });

  /* ── Init ────────────────────────────────── */
  renderGrid('web', false);

  /* Position indicator after layout paint */
  requestAnimationFrame(function() {
    var activeTab = tabs.find(function(t) { return t.classList.contains('is-active'); });
    if (activeTab) moveIndicator(activeTab);
  });

  /* Reposition on resize */
  window.addEventListener('resize', function() {
    var activeTab = tabs.find(function(t) { return t.classList.contains('is-active'); });
    if (activeTab) moveIndicator(activeTab);
  });
}
