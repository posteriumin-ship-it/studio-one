/* ============================================================
   FAQ — accordion
   ============================================================ */
function initFaq() {
  var items = document.querySelectorAll('.faq__item');
  if (!items.length) return;

  items.forEach(function(item) {
    var btn = item.querySelector('.faq__q');
    if (!btn) return;

    btn.addEventListener('click', function() {
      var isOpen = item.classList.contains('is-open');

      // Close all
      items.forEach(function(i) { i.classList.remove('is-open'); });

      // Open this one (unless it was already open)
      if (!isOpen) {
        item.classList.add('is-open');
      }
    });
  });
}
