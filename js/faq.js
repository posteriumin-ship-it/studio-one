/* ============================================================
   FAQ — accordion
   ============================================================ */
function initFaq() {
  var lists = document.querySelectorAll('.faq__list');
  if (!lists.length) return;

  function setState(item, shouldOpen, immediate) {
    var btn = item.querySelector('.faq__q');
    var panel = item.querySelector('.faq__a');
    if (!btn || !panel) return;

    item.classList.toggle('is-open', shouldOpen);
    btn.setAttribute('aria-expanded', shouldOpen ? 'true' : 'false');

    if (shouldOpen) {
      panel.hidden = false;

      if (immediate) {
        panel.style.maxHeight = panel.scrollHeight + 'px';
        return;
      }

      panel.style.maxHeight = '0px';
      requestAnimationFrame(function() {
        panel.style.maxHeight = panel.scrollHeight + 'px';
      });
      return;
    }

    if (immediate) {
      panel.style.maxHeight = '0px';
      panel.hidden = true;
      return;
    }

    panel.style.maxHeight = panel.scrollHeight + 'px';
    requestAnimationFrame(function() {
      panel.style.maxHeight = '0px';
    });

    panel.addEventListener('transitionend', function handleClose(event) {
      if (event.propertyName !== 'max-height') return;
      if (!item.classList.contains('is-open')) {
        panel.hidden = true;
      }
      panel.removeEventListener('transitionend', handleClose);
    });
  }

  lists.forEach(function(list, listIndex) {
    var items = list.querySelectorAll('.faq__item');
    if (!items.length) return;

    items.forEach(function(item, itemIndex) {
      var btn = item.querySelector('.faq__q');
      var panel = item.querySelector('.faq__a');
      if (!btn || !panel) return;

      var buttonId = btn.id || 'faq-button-' + listIndex + '-' + itemIndex;
      var panelId = panel.id || 'faq-panel-' + listIndex + '-' + itemIndex;

      btn.id = buttonId;
      panel.id = panelId;
      btn.setAttribute('aria-controls', panelId);
      panel.setAttribute('role', 'region');
      panel.setAttribute('aria-labelledby', buttonId);

      setState(item, item.classList.contains('is-open'), true);

      btn.addEventListener('click', function() {
        var isOpen = item.classList.contains('is-open');

        items.forEach(function(other) {
          if (other !== item) setState(other, false, false);
        });

        setState(item, !isOpen, false);
      });
    });
  });

  window.addEventListener('resize', function() {
    document.querySelectorAll('.faq__item.is-open .faq__a').forEach(function(panel) {
      panel.style.maxHeight = panel.scrollHeight + 'px';
    });
  });
}
