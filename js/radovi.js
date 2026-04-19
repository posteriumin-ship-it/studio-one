/* ============================================================
   Radovi — editorial website showcase
   Website-only, reusable data model with premium preview frames
   ============================================================ */
function initRadovi() {
  var isEN = document.documentElement.lang === 'en';
  var showcase = document.getElementById('radoviShowcase');
  if (!showcase) return;

  var assetBase = document.body.classList.contains('lang-en')
    ? '../../assets/work-previews/'
    : '../assets/work-previews/';
  var supportsHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  var UI = isEN ? {
    industry: 'Industry',
    services: 'Scope',
    cta: 'View project',
    live: 'Live site',
    openProject: 'Open project ',
    previewLabel: 'Curated preview'
  } : {
    industry: 'Industrija',
    services: 'Opseg',
    cta: 'Otvori projekat',
    live: 'Live sajt',
    openProject: 'Otvori projekat ',
    previewLabel: 'Kurirani preview'
  };

  var PROJECTS = [
    {
      name: 'Posterium',
      domain: 'posteriumin.com',
      url: 'https://posteriumin.com/en',
      type: 'E-commerce website',
      type_en: 'E-commerce website',
      description: 'E-commerce iskustvo za brend koji personalizovanu automobilsku estetiku prevodi u proizvod sa jasnim premium osećajem i čistim prodajnim tokom.',
      description_en: 'An e-commerce experience for a brand translating personalised automotive culture into a digital product with a clear premium feel and a clean sales flow.',
      industry: 'Custom automotive art / DTC retail',
      industry_en: 'Custom automotive art / DTC retail',
      services: ['UX struktura', 'Shopify build', 'Product storytelling', 'Konverzijski tok'],
      services_en: ['UX structure', 'Shopify build', 'Product storytelling', 'Conversion flow'],
      preview: {
        type: 'image',
        src: 'posterium.webp',
        accent: '#E36D49',
        glow: 'rgba(227, 109, 73, 0.18)',
        wash: 'rgba(227, 109, 73, 0.065)',
        line: 'rgba(227, 109, 73, 0.18)',
        chip: 'rgba(227, 109, 73, 0.08)',
        frame: '#F2ECE4',
        chrome: '#FBF7F2',
        ink: '#16222A',
        pill: 'rgba(255, 255, 255, 0.76)',
        state: 'rgba(10, 10, 10, 0.05)',
        start: '0%',
        end: '-18%',
        mobile: '-6%'
      }
    },
    {
      name: 'Interplast S',
      domain: 'interplast-s.com',
      url: 'https://interplast-s.com/',
      type: 'Corporate B2B website',
      type_en: 'Corporate B2B website',
      description: 'Korporativni B2B sajt za industrijsku firmu, sa jasnim putanjama ka materijalima, obradi i brzom tehničkom upitu.',
      description_en: 'A corporate B2B website for an industrial company, with clear paths toward materials, machining services, and fast technical enquiries.',
      industry: 'Industrial plastics / manufacturing',
      industry_en: 'Industrial plastics / manufacturing',
      services: ['Informaciona arhitektura', 'B2B copy', 'Lead capture', 'Responsive UI'],
      services_en: ['Information architecture', 'B2B copy', 'Lead capture', 'Responsive UI'],
      preview: {
        type: 'image',
        src: 'interplast.webp',
        accent: '#4E67E8',
        glow: 'rgba(78, 103, 232, 0.16)',
        wash: 'rgba(78, 103, 232, 0.06)',
        line: 'rgba(78, 103, 232, 0.18)',
        chip: 'rgba(78, 103, 232, 0.08)',
        frame: '#EEF2FF',
        chrome: '#F7F9FF',
        ink: '#17203A',
        pill: 'rgba(255, 255, 255, 0.82)',
        state: 'rgba(10, 10, 10, 0.05)',
        start: '0%',
        end: '-10%',
        mobile: '-3%'
      }
    },
    {
      name: 'DR-METALPLUS',
      domain: 'dr-metalplus.com',
      url: 'https://dr-metalplus.com/',
      type: 'Service website',
      type_en: 'Service website',
      description: 'Servisni i prodajni website za mašinsku obradu, elise i tehničke zahteve, građen da odmah ulije poverenje u stručnost i kapacitet.',
      description_en: 'A service and sales website for machining, propellers, and technical requests, built to signal expertise and capacity from the first screen.',
      industry: 'CNC machining / marine components',
      industry_en: 'CNC machining / marine components',
      services: ['Pozicioniranje', 'Arhitektura usluga', 'Tehnički upit', 'Custom development'],
      services_en: ['Positioning', 'Service architecture', 'Technical enquiry flow', 'Custom development'],
      preview: {
        type: 'image',
        src: 'dr-metalplus.webp',
        accent: '#63B23D',
        glow: 'rgba(99, 178, 61, 0.16)',
        wash: 'rgba(99, 178, 61, 0.06)',
        line: 'rgba(99, 178, 61, 0.16)',
        chip: 'rgba(99, 178, 61, 0.075)',
        frame: '#EFF4EA',
        chrome: '#F8FBF4',
        ink: '#193117',
        pill: 'rgba(255, 255, 255, 0.8)',
        state: 'rgba(10, 10, 10, 0.05)',
        start: '0%',
        end: '-20%',
        mobile: '-8%'
      }
    },
    {
      name: 'EDC Satovi',
      domain: 'edcsatovishop.com',
      url: 'https://edcsatovishop.com/',
      type: 'E-commerce website',
      type_en: 'E-commerce website',
      description: 'E-commerce platforma za prodaju satova, sa fokusom na merchandising, brz izbor proizvoda i premium osećaj kupovine.',
      description_en: 'An e-commerce platform for watches, focused on merchandising, faster product discovery, and a more premium shopping feel.',
      industry: 'Watches & accessories / online retail',
      industry_en: 'Watches & accessories / online retail',
      services: ['E-commerce UX', 'Katalog sistem', 'Visual merchandising', 'Mobile shopping'],
      services_en: ['E-commerce UX', 'Catalogue system', 'Visual merchandising', 'Mobile shopping'],
      preview: {
        type: 'image',
        src: 'edc-satovi.webp',
        accent: '#C8A24B',
        glow: 'rgba(200, 162, 75, 0.18)',
        wash: 'rgba(200, 162, 75, 0.07)',
        line: 'rgba(200, 162, 75, 0.18)',
        chip: 'rgba(200, 162, 75, 0.1)',
        frame: '#191713',
        chrome: '#1D1A14',
        ink: '#E8C373',
        pill: 'rgba(255, 255, 255, 0.08)',
        state: 'rgba(255, 255, 255, 0.08)',
        start: '0%',
        end: '-8%',
        mobile: '-4%'
      }
    }
  ];

  function getLocalized(project, key) {
    var enKey = key + '_en';
    return isEN && project[enKey] ? project[enKey] : project[key];
  }

  function mediaMarkup(project, index) {
    var preview = project.preview || {};
    var src = assetBase + preview.src;
    var alt = project.name + ' — ' + (isEN ? 'website preview' : 'website preview');
    var loading = index === 0 ? 'eager' : 'lazy';
    var fetchPriority = index === 0 ? 'high' : 'auto';

    if (preview.type === 'video') {
      var poster = preview.poster ? ' poster="' + assetBase + preview.poster + '"' : '';
      return (
        '<video class="work-card__media" autoplay muted loop playsinline' + poster + '>' +
          '<source src="' + src + '" type="video/mp4">' +
        '</video>'
      );
    }

    return (
      '<img class="work-card__media" src="' + src + '" alt="' + alt + '" loading="' + loading + '" decoding="async" fetchpriority="' + fetchPriority + '">' 
    );
  }

  function renderProject(project, index) {
    var preview = project.preview || {};
    var services = getLocalized(project, 'services') || [];
    var reverseClass = index % 2 === 1 ? ' work-card--reverse' : '';
    var previewNote = UI.previewLabel;
    var style = [
      '--project-accent:' + (preview.accent || '#0A0A0A'),
      '--project-glow:' + (preview.glow || 'rgba(10, 10, 10, 0.12)'),
      '--project-wash:' + (preview.wash || 'rgba(10, 10, 10, 0.04)'),
      '--project-line:' + (preview.line || 'rgba(10, 10, 10, 0.1)'),
      '--project-chip:' + (preview.chip || 'rgba(255, 255, 255, 0.72)'),
      '--project-frame:' + (preview.frame || '#F4F1EC'),
      '--project-chrome:' + (preview.chrome || '#FFFFFF'),
      '--project-ink:' + (preview.ink || '#0A0A0A'),
      '--project-pill:' + (preview.pill || 'rgba(255, 255, 255, 0.76)'),
      '--project-state:' + (preview.state || 'rgba(10, 10, 10, 0.05)'),
      '--preview-start:' + (preview.start || '0%'),
      '--preview-end:' + (preview.end || '-12%'),
      '--preview-mobile:' + (preview.mobile || '0%')
    ].join(';');

    return (
      '<article class="work-card' + reverseClass + '" style="' + style + '">' +
        '<div class="work-card__content">' +
          '<div class="work-card__topline">' +
            '<span class="work-card__index">' + String(index + 1).padStart(2, '0') + '</span>' +
            '<span class="work-card__type">' + getLocalized(project, 'type') + '</span>' +
          '</div>' +
          '<h3 class="work-card__title">' + project.name + '</h3>' +
          '<p class="work-card__description">' + getLocalized(project, 'description') + '</p>' +
          '<div class="work-card__detail">' +
            '<span class="work-card__detail-label">' + UI.industry + '</span>' +
            '<p class="work-card__detail-value">' + getLocalized(project, 'industry') + '</p>' +
          '</div>' +
          '<div class="work-card__detail work-card__detail--services">' +
            '<span class="work-card__detail-label">' + UI.services + '</span>' +
            '<ul class="work-card__tags">' +
              services.map(function(service) {
                return '<li class="work-card__tag">' + service + '</li>';
              }).join('') +
            '</ul>' +
          '</div>' +
          '<div class="work-card__actions">' +
            '<a href="' + project.url + '" class="work-card__cta" target="_blank" rel="noopener" data-cursor="view">' + UI.cta + '</a>' +
            '<span class="work-card__domain">' + project.domain + '</span>' +
          '</div>' +
        '</div>' +
        '<a class="work-card__preview" href="' + project.url + '" target="_blank" rel="noopener" aria-label="' + UI.openProject + project.name + '" data-cursor="view">' +
          '<div class="work-card__preview-shell">' +
            '<div class="work-card__window">' +
              '<div class="work-card__browser-bar">' +
                '<div class="work-card__browser-dots"><span></span><span></span><span></span></div>' +
                '<span class="work-card__browser-address">' + project.domain + '</span>' +
                '<span class="work-card__browser-state">' + UI.live + '</span>' +
              '</div>' +
              '<div class="work-card__viewport">' +
                '<div class="work-card__scroll">' +
                  mediaMarkup(project, index) +
                '</div>' +
                '<span class="work-card__preview-note">' + previewNote + '</span>' +
              '</div>' +
            '</div>' +
          '</div>' +
        '</a>' +
      '</article>'
    );
  }

  function renderShowcase() {
    showcase.innerHTML = PROJECTS.map(renderProject).join('');
  }

  function initRevealObserver() {
    var cards = Array.prototype.slice.call(showcase.querySelectorAll('.work-card'));
    if (!cards.length) return;

    if (!('IntersectionObserver' in window)) {
      cards.forEach(function(card) {
        card.classList.add('is-visible');
      });
      return;
    }

    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.2 });

    cards.forEach(function(card) {
      observer.observe(card);
    });
  }

  function initPreviewMotion() {
    if (!supportsHover) return;

    var previews = showcase.querySelectorAll('.work-card__preview');

    previews.forEach(function(preview) {
      var shell = preview.querySelector('.work-card__preview-shell');
      if (!shell) return;

      function resetMotion() {
        shell.style.setProperty('--preview-shift-x', '0px');
        shell.style.setProperty('--preview-shift-y', '0px');
        shell.style.setProperty('--preview-rotate-x', '0deg');
        shell.style.setProperty('--preview-rotate-y', '0deg');
      }

      preview.addEventListener('pointermove', function(event) {
        var rect = preview.getBoundingClientRect();
        var relX = (event.clientX - rect.left) / rect.width - 0.5;
        var relY = (event.clientY - rect.top) / rect.height - 0.5;

        shell.style.setProperty('--preview-shift-x', (relX * 12).toFixed(2) + 'px');
        shell.style.setProperty('--preview-shift-y', (relY * 10).toFixed(2) + 'px');
        shell.style.setProperty('--preview-rotate-x', (relY * -3).toFixed(2) + 'deg');
        shell.style.setProperty('--preview-rotate-y', (relX * 4).toFixed(2) + 'deg');
      });

      preview.addEventListener('pointerleave', resetMotion);
      preview.addEventListener('blur', resetMotion, true);
      resetMotion();
    });
  }

  renderShowcase();
  initRevealObserver();
  initPreviewMotion();
}
