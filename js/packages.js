/* ============================================================
   PACKAGES — data + dynamic selector/detail rendering
   ============================================================ */

/* ── Package data ─────────────────────────── */
var PKG_DATA = {
  web: [
    {
      num: '01', name: 'Start Web', tagline: 'Za jasan i profesionalan početak.',
      price: 'Cena na upit', priceNote: 'Po projektu',
      featured: false,
      features: [
        'Landing stranica ili manji sajt',
        'Osnovna struktura i CTA logika',
        'Osnovni copy guidance',
        'Kontakt forma i integracije',
        'Osnovna SEO osnova',
        'Mobilna prilagođenost'
      ]
    },
    {
      num: '02', name: 'Growth Web', tagline: 'Za ozbiljniji poslovni nastup.',
      price: 'Cena na upit', priceNote: 'Po projektu',
      featured: true,
      features: [
        'Višestranični business website',
        'Napredniji copy i funnel logika',
        'Jači vizuelni identitet kroz sajt',
        'CRM ili email integracije',
        'SEO-ready osnova',
        'Više od 3 stranice'
      ]
    },
    {
      num: '03', name: 'Signature Web', tagline: 'Za brendove kojima treba pun kvalitet.',
      price: 'Cena na upit', priceNote: 'Po projektu',
      featured: false,
      features: [
        'Analiza biznisa i konkurencije',
        'Premium dizajn i detaljna logika',
        'Naprednije integracije i struktura',
        'Prilagođenost modelu poslovanja',
        'Jača SEO osnova',
        'Prioritetna podrška'
      ]
    },
    {
      num: '04', name: 'Custom', tagline: 'Kada vam treba model saradnje po meri.',
      price: 'Po dogovoru', priceNote: 'Individualna ponuda',
      featured: false,
      features: [
        'Samo određeni delovi usluge',
        'Kombinacija više servisa',
        'Posebna dinamika rada',
        'Ponuda prema cilju i budžetu',
        'Fleksibilan scope',
        'Direktna komunikacija'
      ]
    }
  ],
  social: [
    {
      num: '01', name: 'Presence', tagline: 'Za uredan i aktivan nastup.',
      price: 'Od 230€ / mes.', priceNote: 'Mesečna saradnja',
      featured: false,
      features: [
        '6–8 objava mesečno',
        'Min. 2 short-form videa',
        '2–3 seta storija nedeljno',
        'Mesečni plan objava',
        'Mesečni izveštaj',
        'Osnovna optimizacija profila'
      ]
    },
    {
      num: '02', name: 'Grow', tagline: 'Za rast i kvalitetniji sadržaj.',
      price: 'Od 490€ / mes.', priceNote: 'Mesečna saradnja',
      featured: true,
      features: [
        '9–12 objava mesečno',
        '4–6 short-form videa',
        '4–5 setova storija nedeljno',
        'Optimizacija profila',
        'Priprema sadržaja za kampanje',
        'Detaljniji izveštaj'
      ]
    },
    {
      num: '03', name: 'Authority', tagline: 'Za jači identitet i veći kontinuitet.',
      price: 'Od 690€ / mes.', priceNote: 'Mesečna saradnja',
      featured: false,
      features: [
        '12–16 objava mesečno',
        '6–9 short-form videa',
        'Češći storiji i aktivna komunikacija',
        'Storytelling pristup',
        'Community management elementi',
        'Strateška analiza mesečno'
      ]
    },
    {
      num: '04', name: 'Custom', tagline: 'Kada vam ne treba ceo paket.',
      price: 'Po dogovoru', priceNote: 'Individualna ponuda',
      featured: false,
      features: [
        'Samo reels ili short-form',
        'Storiji i community rad',
        'Poseban content pravac',
        'Kombinacija sa ads uslugom',
        'Fleksibilan raspored',
        'Prilagođena ponuda'
      ]
    }
  ],
  ads: [
    {
      num: '01', name: 'Boost', tagline: 'Za početno testiranje.',
      price: 'Meta/TikTok od 290€', priceNote: 'Google Ads od 320€ / mes.',
      featured: false,
      features: [
        'Setup i povezivanje naloga',
        'Osnovna struktura kampanje',
        'Testiranje publike i poruke',
        'Osnovna optimizacija',
        'Mesečni izveštaj',
        'Jedan kanal po izboru'
      ]
    },
    {
      num: '02', name: 'Performance', tagline: 'Za aktivnije upravljanje kampanjama.',
      price: 'Meta/TikTok od 490€', priceNote: 'Google Ads od 550€ / mes.',
      featured: true,
      features: [
        'Više paralelnih testova',
        'Segmentacija publike',
        'Osnovi remarketing',
        'Optimizacija budžeta i oglasa',
        'Detaljniji izveštaj sa preporukama',
        'Dva kanala po izboru'
      ]
    },
    {
      num: '03', name: 'Scale', tagline: 'Za ozbiljniji ads sistem.',
      price: 'Od 790€ / mes.', priceNote: '2 kanala po izboru',
      featured: false,
      features: [
        '2 kanala po izboru',
        'Funnel pristup',
        'Napredniji remarketing',
        'Skaliranje budžeta i kampanja',
        'Strateška analiza performansi',
        'Prioritetna optimizacija'
      ]
    },
    {
      num: '04', name: 'Custom', tagline: 'Kada vam treba poseban ads model.',
      price: 'Po dogovoru', priceNote: 'Individualna ponuda',
      featured: false,
      features: [
        'Jedan deo ads usluge',
        'Poseban launch period',
        'Remarketing ili test faza',
        'Kombinacija sa content podrškom',
        'Fleksibilan scope',
        'Ponuda prema ciljevima'
      ]
    }
  ]
};

/* ── Rendering ────────────────────────────── */
function renderPkgSel(cat, activeIdx) {
  var sel  = document.getElementById('pkgSel');
  if (!sel) return;
  var items = PKG_DATA[cat];
  var html  = '';

  items.forEach(function(pkg, i) {
    html += '<button class="pkg-sel__item' +
      (pkg.featured ? ' is-featured' : '') +
      (i === activeIdx ? ' is-active' : '') +
      '" data-idx="' + i + '">' +
      '<span class="pkg-sel__item-name">' + pkg.name + '</span>' +
      '<span class="pkg-sel__item-price">' + pkg.price + '</span>' +
      '</button>';
    if (i < items.length - 1) {
      html += '<div class="pkg-sel__divider"></div>';
    }
  });

  sel.innerHTML = html;

  // Bind events
  sel.querySelectorAll('.pkg-sel__item').forEach(function(btn) {
    btn.addEventListener('click', function() {
      var idx = +btn.dataset.idx;
      renderPkgSel(cat, idx);
      renderPkgDetail(cat, idx);
    });
  });
}

function renderPkgDetail(cat, idx) {
  var detail = document.getElementById('pkgDetail');
  if (!detail) return;
  var pkg = PKG_DATA[cat][idx];
  if (!pkg) return;

  var featuresHtml = pkg.features.map(function(f) {
    return '<li class="pkg-d__feature">' + f + '</li>';
  }).join('');

  var ctaClass = pkg.featured ? 'pkg-d__cta pkg-d__cta--accent' : 'pkg-d__cta';
  var badge    = pkg.featured ? '<span class="pkg-d__badge">Najpopularnije</span>' : '';

  detail.innerHTML =
    '<div class="pkg-d is-active">' +
      '<div class="pkg-d__header">' +
        '<div>' +
          '<div class="pkg-d__num">' + pkg.num + '</div>' +
          '<h3 class="pkg-d__name">' + pkg.name + '</h3>' +
          '<p class="pkg-d__tagline">' + pkg.tagline + '</p>' +
        '</div>' +
        '<div class="pkg-d__price-block">' +
          '<div class="pkg-d__price">' + pkg.price + '</div>' +
          '<div class="pkg-d__price-note">' + pkg.priceNote + '</div>' +
        '</div>' +
      '</div>' +
      '<ul class="pkg-d__features">' + featuresHtml + '</ul>' +
      '<div class="pkg-d__foot">' +
        '<a href="#kontakt" class="' + ctaClass + '">Zakaži razgovor</a>' +
        badge +
      '</div>' +
    '</div>';
}

/* ── Init ─────────────────────────────────── */
function initPackages() {
  var cats = document.querySelectorAll('.pkg-cat');
  if (!cats.length) return;

  var currentCat = 'web';
  var currentIdx = 1; // default: second (featured)

  function switchCat(cat) {
    currentCat = cat;
    currentIdx = PKG_DATA[cat].findIndex(function(p) { return p.featured; });
    if (currentIdx < 0) currentIdx = 0;
    cats.forEach(function(c) {
      var active = c.dataset.cat === cat;
      c.classList.toggle('is-active', active);
      c.setAttribute('aria-selected', active ? 'true' : 'false');
    });
    renderPkgSel(cat, currentIdx);
    renderPkgDetail(cat, currentIdx);
  }

  cats.forEach(function(c) {
    c.addEventListener('click', function() { switchCat(c.dataset.cat); });
  });

  // Initial render
  switchCat('web');
}
