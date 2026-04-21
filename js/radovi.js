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

  var UI = isEN ? {
    industry: 'Business type',
    focus: 'Project focus',
    services: 'Scope',
    cta: 'View project',
    live: 'Live site',
    openProject: 'Open project ',
    previewLabel: 'Website preview'
  } : {
    industry: 'Tip biznisa',
    focus: 'Fokus projekta',
    services: 'Rađeno',
    cta: 'Otvori projekat',
    live: 'Aktivan sajt',
    openProject: 'Otvori projekat ',
    previewLabel: 'Prikaz sajta'
  };

  var PROJECTS = [
    {
      name: 'Posterium',
      domain: 'posteriumin.com',
      url: 'https://posteriumin.com/en',
      type: 'E-commerce sajt',
      type_en: 'E-commerce website',
      description: 'E-commerce sajt za specijalizovani brend personalizovanih auto postera, građen da proizvod deluje premium, a izbor dizajna bude jasan već na prvom prolazu.',
      description_en: 'An e-commerce site for a niche custom poster brand, built so the product feels premium and the design selection becomes clear from the first pass.',
      industry: 'Automotive art / direktna online prodaja',
      industry_en: 'Custom automotive art / DTC retail',
      focus: 'Fokus je bio na jasnijoj UX strukturi, Shopify izradi, storytelling pristupu proizvodu i čistijem konverzijskom toku.',
      focus_en: 'The focus was on a clearer UX structure, a Shopify build, stronger product storytelling, and a cleaner conversion flow.',
      services: ['UX struktura', 'Shopify izrada', 'Storytelling proizvoda', 'Konverzijski tok'],
      services_en: ['UX structure', 'Shopify build', 'Product storytelling', 'Conversion flow'],
      preview: {
        type: 'image',
        src: 'posterium.webp',
        ratio: '1600 / 920',
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
        travel: 0.18,
        mobileTravel: 0.04
      }
    },
    {
      name: 'Interplast S',
      domain: 'interplast-s.com',
      url: 'https://interplast-s.com/',
      type: 'Korporativni B2B sajt',
      type_en: 'Corporate B2B website',
      description: 'Korporativni B2B sajt za industrijsku firmu, postavljen tako da tehnički sadržaj deluje pregledno, ozbiljno i lako dostupno pravom kupcu.',
      description_en: 'A corporate B2B website for an industrial company, structured so technical content feels clear, serious, and easy to navigate for the right buyer.',
      industry: 'Industrijska plastika / proizvodnja',
      industry_en: 'Industrial plastics / manufacturing',
      focus: 'Fokus projekta bio je na jasnijoj informacionoj arhitekturi, B2B tekstovima, tačkama za upit i responzivnom interfejsu.',
      focus_en: 'The project focused on clearer information architecture, sharper B2B copy, lead capture points, and a responsive UI system.',
      services: ['Informaciona arhitektura', 'B2B tekstovi', 'Tačke za upit', 'Responzivni interfejs'],
      services_en: ['Information architecture', 'B2B copy', 'Lead capture', 'Responsive UI'],
      preview: {
        type: 'image',
        src: 'interplast.webp',
        ratio: '1600 / 920',
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
        travel: 0.14,
        mobileTravel: 0.025
      }
    },
    {
      name: 'DR-METALPLUS',
      domain: 'dr-metalplus.com',
      url: 'https://dr-metalplus.com/',
      type: 'Servisni sajt',
      type_en: 'Service website',
      description: 'Servisni i prodajni sajt za mašinsku obradu, elise i tehničke zahteve, građen da odmah prenese stručnost, kapacitet i poslovno poverenje.',
      description_en: 'A service and sales website for machining, propellers, and technical requests, built to communicate expertise, capacity, and business trust from the first screen.',
      industry: 'CNC obrada / marine komponente',
      industry_en: 'CNC machining / marine components',
      focus: 'Fokus je bio na pozicioniranju usluga, jasnijoj arhitekturi ponude, tehničkom upitu i prilagođenom razvoju rešenja.',
      focus_en: 'The focus was on service positioning, a clearer service architecture, technical enquiry flow, and custom development tailored to the business.',
      services: ['Pozicioniranje', 'Arhitektura usluga', 'Tehnički upit', 'Prilagođeni razvoj'],
      services_en: ['Positioning', 'Service architecture', 'Technical enquiry flow', 'Custom development'],
      preview: {
        type: 'image',
        src: 'dr-metalplus.webp',
        ratio: '1600 / 920',
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
        travel: 0.17,
        mobileTravel: 0.05
      }
    },
    {
      name: 'EDC Satovi',
      domain: 'edcsatovishop.com',
      url: 'https://edcsatovishop.com/',
      type: 'E-commerce sajt',
      type_en: 'E-commerce website',
      description: 'E-commerce platforma za satove, građena da pregled, katalog i izbor proizvoda deluju premium, brzo i sigurno.',
      description_en: 'An e-commerce platform for watches, built so browsing, catalogue navigation, and product choice feel premium, fast, and reliable.',
      industry: 'Satovi i aksesoari / online prodaja',
      industry_en: 'Watches & accessories / online retail',
      focus: 'Fokus projekta bio je na e-commerce UX-u, katalog sistemu, merchandising logici i mobile shopping iskustvu.',
      focus_en: 'The project focused on e-commerce UX, catalogue system logic, visual merchandising, and a stronger mobile shopping experience.',
      services: ['UX prodavnice', 'Katalog sistem', 'Merchandising logika', 'Kupovina na mobilnom'],
      services_en: ['E-commerce UX', 'Catalogue system', 'Visual merchandising', 'Mobile shopping'],
      preview: {
        type: 'image',
        src: 'edc-satovi.webp',
        ratio: '1600 / 920',
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
        travel: 0.15,
        mobileTravel: 0.03
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
    var alt = project.name + ' — ' + (isEN ? 'website preview' : 'prikaz sajta');
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
      '--project-ratio:' + (preview.ratio || '16 / 9.2')
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
          '<div class="work-card__detail">' +
            '<span class="work-card__detail-label">' + UI.focus + '</span>' +
            '<p class="work-card__detail-value">' + getLocalized(project, 'focus') + '</p>' +
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
        '<a class="work-card__preview" href="' + project.url + '" target="_blank" rel="noopener" aria-label="' + UI.openProject + project.name + '" data-preview-travel="' + (preview.travel || 0.16) + '" data-preview-mobile="' + (preview.mobileTravel || 0.03) + '">' +
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
                '<span class="work-card__scroll-rail" aria-hidden="true"><span class="work-card__scroll-thumb"></span></span>' +
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
    }, { threshold: 0.08 });

    cards.forEach(function(card) {
      observer.observe(card);
    });
  }

  function initPreviewMetrics() {
    var previews = Array.prototype.slice.call(showcase.querySelectorAll('.work-card__preview'));
    if (!previews.length) return;

    function clamp(value, min, max) {
      return Math.min(max, Math.max(min, value));
    }

    function syncPreview(preview) {
      var viewport = preview.querySelector('.work-card__viewport');
      var media = preview.querySelector('.work-card__media');
      if (!viewport || !media || media.tagName !== 'IMG') return;
      if (!media.naturalWidth || !media.naturalHeight) return;

      var frameWidth = viewport.clientWidth;
      var frameHeight = viewport.clientHeight;
      if (!frameWidth || !frameHeight) return;

      var renderedHeight = frameWidth * (media.naturalHeight / media.naturalWidth);
      var maxScroll = Math.min(0, frameHeight - renderedHeight);
      var travel = clamp(parseFloat(preview.dataset.previewTravel || '0.16'), 0, 1);
      var mobileTravel = clamp(parseFloat(preview.dataset.previewMobile || '0.03'), 0, travel);
      var scrollProgress = maxScroll < -8 ? travel : 0;
      var mobileProgress = maxScroll < -8 ? mobileTravel : 0;
      var thumbRatio = clamp(frameHeight / renderedHeight, 0.14, 0.76);
      var thumbTravel = (1 - thumbRatio) * scrollProgress;
      var duration = clamp(1200 + Math.abs(maxScroll) * 0.18, 1200, 2200);

      preview.style.setProperty('--preview-end', (maxScroll * scrollProgress).toFixed(2) + 'px');
      preview.style.setProperty('--preview-mobile', (maxScroll * mobileProgress).toFixed(2) + 'px');
      preview.style.setProperty('--scroll-thumb-size', (thumbRatio * 100).toFixed(2) + '%');
      preview.style.setProperty('--scroll-thumb-shift', (thumbTravel * 100).toFixed(2) + '%');
      preview.style.setProperty('--preview-duration', duration.toFixed(0) + 'ms');
      preview.classList.toggle('is-scrollable', maxScroll < -8);
    }

    previews.forEach(function(preview) {
      var media = preview.querySelector('.work-card__media');
      if (!media) return;

      if (media.complete) syncPreview(preview);
      media.addEventListener('load', function() {
        syncPreview(preview);
      });
    });

    if ('ResizeObserver' in window) {
      var resizeObserver = new ResizeObserver(function(entries) {
        entries.forEach(function(entry) {
          var preview = entry.target.closest('.work-card__preview');
          if (preview) syncPreview(preview);
        });
      });

      previews.forEach(function(preview) {
        var viewport = preview.querySelector('.work-card__viewport');
        if (viewport) resizeObserver.observe(viewport);
      });
    } else {
      window.addEventListener('resize', function() {
        previews.forEach(syncPreview);
      });
    }
  }

  renderShowcase();
  initRevealObserver();
  initPreviewMetrics();
}
