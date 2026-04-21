/* ============================================================
   PACKAGES — data + dynamic selector/detail rendering
   Bilingual: SR data used on lang="sr" pages,
              EN data used on lang="en" pages.
   Language is read from <html lang="sr|en">.

   Data model per package:
     num         '01' .. '04'            tier number
     name        display name
     tagline     short supporting line
     bestFor     one-line audience fit (NEW)
     pricePrefix 'od' / 'from'           optional mono eyebrow
     priceValue  large price string      (used with pricePrefix)
     price       fallback when no value/prefix split is needed
     priceNote   small line under price
     featured    highlighted tier        (accent + badge)
     custom      non-tier custom path    (visually demoted, below divider)
     features    array of feature strings
   ============================================================ */

/* ── Serbian package data ─────────────────── */
var PKG_DATA = {
  web: [
    {
      num: '01', name: 'Start Web',
      tagline: 'Uravnotežen izbor za jasan, profesionalan sajt.',
      bestFor: 'većinu firmi kojima treba jasan i profesionalan sajt',
      pricePrefix: 'od', priceValue: '900 €', priceNote: 'Startni okvir po projektu',
      featured: true,
      features: [
        'Landing stranica ili manji sajt',
        'Osnovna struktura i CTA logika',
        'Osnovne copy smernice',
        'Kontakt forma i integracije',
        'Osnovna SEO osnova',
        'Mobilna prilagođenost'
      ]
    },
    {
      num: '02', name: 'Growth Web',
      tagline: 'Za širi obim, dublju strukturu i ozbiljniji nastup.',
      bestFor: 'firme sa većim obimom, više sadržaja i složenijim tokovima',
      pricePrefix: 'od', priceValue: '1.900 €', priceNote: 'Startni okvir po projektu',
      featured: false,
      features: [
        'Višestranični poslovni sajt',
        'Napredniji copy i funnel logika',
        'Jači vizuelni identitet kroz sajt',
        'CRM ili email integracije',
        'SEO spremna osnova',
        'Više od 3 stranice'
      ]
    },
    {
      num: '03', name: 'Signature Web',
      tagline: 'Za brendove kojima treba pun kvalitet.',
      bestFor: 'brendove koji grade ozbiljan digitalni utisak',
      pricePrefix: 'od', priceValue: '3.900 €', priceNote: 'Startni okvir po projektu',
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
      num: '04', name: 'Po meri',
      tagline: 'Kada vam treba model saradnje po meri.',
      bestFor: 'poseban opseg ili kombinacija usluga',
      priceValue: 'Na upit', priceNote: 'Individualna ponuda',
      featured: false, custom: true,
      features: [
        'Samo određeni delovi usluge',
        'Kombinacija više servisa',
        'Posebna dinamika rada',
        'Ponuda prema cilju i budžetu',
        'Fleksibilan opseg',
        'Direktna komunikacija'
      ]
    }
  ],
  social: [
    {
      num: '01', name: 'Prisustvo',
      tagline: 'Za uredan i aktivan nastup.',
      bestFor: 'uredan i dosledan mesečni nastup',
      price: 'Od 230€ / mes.', priceNote: 'Mesečna saradnja',
      featured: false,
      features: [
        '6–8 objava mesečno',
        'Min. 2 kratka videa',
        '2–3 seta storija nedeljno',
        'Mesečni plan objava',
        'Mesečni izveštaj',
        'Osnovna optimizacija profila'
      ]
    },
    {
      num: '02', name: 'Rast',
      tagline: 'Za rast i kvalitetniji sadržaj.',
      bestFor: 'brendove u aktivnoj fazi rasta',
      price: 'Od 490€ / mes.', priceNote: 'Mesečna saradnja',
      featured: true,
      features: [
        '9–12 objava mesečno',
        '4–6 kratkih videa',
        '4–5 setova storija nedeljno',
        'Optimizacija profila',
        'Priprema sadržaja za kampanje',
        'Detaljniji izveštaj'
      ]
    },
    {
      num: '03', name: 'Autoritet',
      tagline: 'Za jači identitet i veći kontinuitet.',
      bestFor: 'izgradnju autoriteta i zajednice',
      price: 'Od 690€ / mes.', priceNote: 'Mesečna saradnja',
      featured: false,
      features: [
        '12–16 objava mesečno',
        '6–9 kratkih videa',
        'Češći storiji i aktivna komunikacija',
        'Storytelling pristup',
        'Elementi komunikacije sa zajednicom',
        'Strateška analiza mesečno'
      ]
    },
    {
      num: '04', name: 'Po meri',
      tagline: 'Kada vam ne treba ceo paket.',
      bestFor: 'specifičan content fokus',
      price: 'Po dogovoru', priceNote: 'Individualna ponuda',
      featured: false, custom: true,
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
      num: '01', name: 'Start',
      tagline: 'Za početno testiranje.',
      bestFor: 'prvo testiranje publike i poruke',
      price: 'Meta/TikTok od 290€', priceNote: 'Google Ads od 320€ / mes.',
      featured: false,
      features: [
        'Postavljanje i povezivanje naloga',
        'Osnovna struktura kampanje',
        'Testiranje publike i poruke',
        'Osnovna optimizacija',
        'Mesečni izveštaj',
        'Jedan kanal po izboru'
      ]
    },
    {
      num: '02', name: 'Performanse',
      tagline: 'Za aktivnije upravljanje kampanjama.',
      bestFor: 'kampanje koje treba aktivnije pratiti',
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
      num: '03', name: 'Skaliranje',
      tagline: 'Za ozbiljniji oglasni sistem.',
      bestFor: 'ozbiljniji oglasni sistem sa ciljem skaliranja',
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
      num: '04', name: 'Po meri',
      tagline: 'Kada vam treba poseban oglasni model.',
      bestFor: 'poseban period ili segment',
      price: 'Po dogovoru', priceNote: 'Individualna ponuda',
      featured: false, custom: true,
      features: [
        'Jedan deo ads usluge',
        'Poseban period lansiranja',
        'Remarketing ili test faza',
        'Kombinacija sa sadržajnom podrškom',
        'Fleksibilan opseg',
        'Ponuda prema ciljevima'
      ]
    }
  ]
};

/* ── English package data ─────────────────── */
var PKG_DATA_EN = {
  web: [
    {
      num: '01', name: 'Start Web',
      tagline: 'The balanced choice for a clear, professional site.',
      bestFor: 'most businesses that want a clear, professional site',
      pricePrefix: 'from', priceValue: '€900', priceNote: 'Starting point per project',
      featured: true,
      features: [
        'Landing page or small website',
        'Basic structure and CTA logic',
        'Basic copy guidance',
        'Contact form and integrations',
        'Basic SEO foundation',
        'Mobile-friendly'
      ]
    },
    {
      num: '02', name: 'Growth Web',
      tagline: 'For greater scope, deeper structure and a more serious presence.',
      bestFor: 'businesses with larger scope, more content and more complex flows',
      pricePrefix: 'from', priceValue: '€1,900', priceNote: 'Starting point per project',
      featured: false,
      features: [
        'Multi-page business website',
        'Advanced copy and funnel logic',
        'Stronger visual identity through the site',
        'CRM or email integrations',
        'SEO-ready foundation',
        'More than 3 pages'
      ]
    },
    {
      num: '03', name: 'Signature Web',
      tagline: 'For brands that demand full quality.',
      bestFor: 'brands building a serious digital impression',
      pricePrefix: 'from', priceValue: '€3,900', priceNote: 'Starting point per project',
      featured: false,
      features: [
        'Business and competitor analysis',
        'Premium design and detailed logic',
        'Advanced integrations and structure',
        'Adapted to your business model',
        'Stronger SEO foundation',
        'Priority support'
      ]
    },
    {
      num: '04', name: 'Custom',
      tagline: 'When you need a tailored collaboration model.',
      bestFor: 'special scope or combination of services',
      priceValue: 'On request', priceNote: 'Individual offer',
      featured: false, custom: true,
      features: [
        'Only specific parts of the service',
        'Combination of multiple services',
        'Special working dynamic',
        'Offer based on goal and budget',
        'Flexible scope',
        'Direct communication'
      ]
    }
  ],
  social: [
    {
      num: '01', name: 'Presence',
      tagline: 'For a clean and active presence.',
      bestFor: 'a clean, consistent monthly presence',
      price: 'From €230 / mo.', priceNote: 'Monthly collaboration',
      featured: false,
      features: [
        '6–8 posts per month',
        'Min. 2 short-form videos',
        '2–3 story sets per week',
        'Monthly content plan',
        'Monthly report',
        'Basic profile optimization'
      ]
    },
    {
      num: '02', name: 'Grow',
      tagline: 'For growth and higher quality content.',
      bestFor: 'brands in an active growth phase',
      price: 'From €490 / mo.', priceNote: 'Monthly collaboration',
      featured: true,
      features: [
        '9–12 posts per month',
        '4–6 short-form videos',
        '4–5 story sets per week',
        'Profile optimization',
        'Content preparation for campaigns',
        'Detailed report'
      ]
    },
    {
      num: '03', name: 'Authority',
      tagline: 'For a stronger identity and greater continuity.',
      bestFor: 'authority building and community',
      price: 'From €690 / mo.', priceNote: 'Monthly collaboration',
      featured: false,
      features: [
        '12–16 posts per month',
        '6–9 short-form videos',
        'More frequent stories and active engagement',
        'Storytelling approach',
        'Community management elements',
        'Monthly strategic analysis'
      ]
    },
    {
      num: '04', name: 'Custom',
      tagline: "When you don't need the full package.",
      bestFor: 'a specific content focus',
      price: 'By arrangement', priceNote: 'Individual offer',
      featured: false, custom: true,
      features: [
        'Reels or short-form only',
        'Stories and community work',
        'Special content direction',
        'Combined with ads service',
        'Flexible schedule',
        'Custom offer'
      ]
    }
  ],
  ads: [
    {
      num: '01', name: 'Boost',
      tagline: 'For initial testing.',
      bestFor: 'initial audience and messaging tests',
      price: 'Meta/TikTok from €290', priceNote: 'Google Ads from €320 / mo.',
      featured: false,
      features: [
        'Account setup and connection',
        'Basic campaign structure',
        'Audience and message testing',
        'Basic optimization',
        'Monthly report',
        'One channel of choice'
      ]
    },
    {
      num: '02', name: 'Performance',
      tagline: 'For more active campaign management.',
      bestFor: 'campaigns that need active management',
      price: 'Meta/TikTok from €490', priceNote: 'Google Ads from €550 / mo.',
      featured: true,
      features: [
        'Multiple parallel tests',
        'Audience segmentation',
        'Basic remarketing',
        'Budget and ad optimization',
        'Detailed report with recommendations',
        'Two channels of choice'
      ]
    },
    {
      num: '03', name: 'Scale',
      tagline: 'For a serious ads system.',
      bestFor: 'a serious ads system aimed at scaling',
      price: 'From €790 / mo.', priceNote: '2 channels of choice',
      featured: false,
      features: [
        '2 channels of choice',
        'Funnel approach',
        'Advanced remarketing',
        'Budget and campaign scaling',
        'Strategic performance analysis',
        'Priority optimization'
      ]
    },
    {
      num: '04', name: 'Custom',
      tagline: 'When you need a special ads model.',
      bestFor: 'a special period or segment',
      price: 'By arrangement', priceNote: 'Individual offer',
      featured: false, custom: true,
      features: [
        'One part of the ads service',
        'Special launch period',
        'Remarketing or test phase',
        'Combined with content support',
        'Flexible scope',
        'Offer based on goals'
      ]
    }
  ]
};

/* ── Helpers ──────────────────────────────── */
function formatPkgPriceInner(pkg) {
  if (pkg.priceValue) {
    return (
      (pkg.pricePrefix ? '<span class="pkg-price-prefix">' + pkg.pricePrefix + '</span>' : '') +
      '<span class="pkg-price-value">' + pkg.priceValue + '</span>' +
      (pkg.priceSuffix ? '<span class="pkg-price-suffix">' + pkg.priceSuffix + '</span>' : '')
    );
  }
  return pkg.price || '';
}

function escHtml(str) {
  if (str == null) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

/* ── Selector (left rail) ─────────────────── */
function renderPkgSel(cat, activeIdx, data, ui) {
  var sel = document.getElementById('pkgSel');
  if (!sel) return;

  var items = data[cat];
  var html = '';
  var dividerInserted = false;

  items.forEach(function (pkg, i) {
    // Insert one divider before the first "custom" entry to visually
    // separate custom options from the tiered ladder.
    if (pkg.custom && !dividerInserted) {
      html += '<div class="pkg-sel__divider" aria-hidden="true"></div>';
      dividerInserted = true;
    }

    var classes = ['pkg-sel__item'];
    if (pkg.featured)        classes.push('is-featured');
    if (pkg.custom)          classes.push('is-custom');
    if (i === activeIdx)     classes.push('is-active');

    var priceClasses = 'pkg-sel__item-price' + (pkg.priceValue ? ' pkg-price' : '');

    html +=
      '<button class="' + classes.join(' ') + '" data-idx="' + i + '" type="button">' +
        '<div class="pkg-sel__item-top">' +
          '<span class="pkg-sel__item-num">' + escHtml(pkg.num) + '</span>' +
          '<span class="pkg-sel__item-name">' + escHtml(pkg.name) + '</span>' +
          '<span class="' + priceClasses + '">' + formatPkgPriceInner(pkg) + '</span>' +
        '</div>' +
        '<span class="pkg-sel__item-tag">' + escHtml(pkg.bestFor || pkg.tagline || '') + '</span>' +
      '</button>';
  });

  sel.innerHTML = html;

  // Bind events
  sel.querySelectorAll('.pkg-sel__item').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var idx = +btn.dataset.idx;
      renderPkgSel(cat, idx, data, ui);
      renderPkgDetail(cat, idx, data, ui);
    });
  });
}

/* ── Detail (right panel) ─────────────────── */
/* ui = { badge, bestForLabel, featuresLabel, cta, ctaHref } */
function renderPkgDetail(cat, idx, data, ui) {
  var detail = document.getElementById('pkgDetail');
  if (!detail) return;

  var pkg = data[cat][idx];
  if (!pkg) return;

  var featuresHtml = pkg.features.map(function (f) {
    return '<li class="pkg-d__feature">' + escHtml(f) + '</li>';
  }).join('');

  var ctaClass = pkg.featured ? 'pkg-d__cta pkg-d__cta--accent' : 'pkg-d__cta';
  var badge    = pkg.featured
    ? '<span class="pkg-d__badge"><span class="pkg-d__badge-dot" aria-hidden="true"></span>' + escHtml(ui.badge) + '</span>'
    : '';

  var bestForHtml = pkg.bestFor
    ? '<p class="pkg-d__bestfor">' +
        '<span class="pkg-d__bestfor-label">' + escHtml(ui.bestForLabel) + '</span>' +
        '<span class="pkg-d__bestfor-text">' + escHtml(pkg.bestFor) + '</span>' +
      '</p>'
    : '';

  var detailClasses = ['pkg-d', 'is-active'];
  if (pkg.featured) detailClasses.push('pkg-d--featured');
  if (pkg.custom)   detailClasses.push('pkg-d--custom');

  detail.innerHTML =
    '<div class="' + detailClasses.join(' ') + '">' +
      '<div class="pkg-d__top">' +
        '<span class="pkg-d__num">' + escHtml(pkg.num) + ' / ' + String(data[cat].length).padStart(2, '0') + '</span>' +
        badge +
      '</div>' +
      '<div class="pkg-d__header">' +
        '<div class="pkg-d__header-main">' +
          '<h3 class="pkg-d__name">' + escHtml(pkg.name) + '</h3>' +
          '<p class="pkg-d__tagline">' + escHtml(pkg.tagline) + '</p>' +
          bestForHtml +
        '</div>' +
        '<div class="pkg-d__price-block">' +
          '<div class="pkg-d__price' + (pkg.priceValue ? ' pkg-price' : '') + '">' + formatPkgPriceInner(pkg) + '</div>' +
          '<div class="pkg-d__price-note">' + escHtml(pkg.priceNote || '') + '</div>' +
        '</div>' +
      '</div>' +
      '<div class="pkg-d__features-wrap">' +
        '<div class="pkg-d__features-label">' + escHtml(ui.featuresLabel) + '</div>' +
        '<ul class="pkg-d__features">' + featuresHtml + '</ul>' +
      '</div>' +
      '<div class="pkg-d__foot">' +
        '<a href="' + ui.ctaHref + '" class="' + ctaClass + '" data-cursor="book">' + escHtml(ui.cta) + ' <span class="pkg-d__cta-arrow" aria-hidden="true">→</span></a>' +
      '</div>' +
    '</div>';
}

/* ── Init ─────────────────────────────────── */
function initPackages() {
  var cats = document.querySelectorAll('.pkg-cat');
  if (!cats.length) return;

  /* ── Language detection ──────────────────── */
  var isEN = document.documentElement.lang === 'en';
  var data = isEN ? PKG_DATA_EN : PKG_DATA;
  var ui   = isEN
    ? {
        badge:         'Most popular',
        bestForLabel:  'Best for',
        featuresLabel: 'What you get',
        cta:           'Book a call',
        ctaHref:       'pages/contact.html'
      }
    : {
        badge:         'Najpopularnije',
        bestForLabel:  'Idealno za',
        featuresLabel: 'Šta dobijate',
        cta:           'Zakaži razgovor',
        ctaHref:       'pages/kontakt.html'
      };

  var currentCat = 'web';
  var currentIdx = 1; // default: second (featured)

  function switchCat(cat) {
    currentCat = cat;
    currentIdx = data[cat].findIndex(function (p) { return p.featured; });
    if (currentIdx < 0) currentIdx = 0;
    cats.forEach(function (c) {
      var active = c.dataset.cat === cat;
      c.classList.toggle('is-active', active);
      c.setAttribute('aria-selected', active ? 'true' : 'false');
    });
    renderPkgSel(cat, currentIdx, data, ui);
    renderPkgDetail(cat, currentIdx, data, ui);
  }

  cats.forEach(function (c) {
    c.addEventListener('click', function () { switchCat(c.dataset.cat); });
  });

  // Initial render
  switchCat('web');
}

/* initPackages() is called by js/main.js after DOMContentLoaded. */
