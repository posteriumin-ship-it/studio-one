/* ============================================================
   FORM — shared contact form handler
   Handles: client-side validation + Formspree fetch submit
   Used by: pages/kontakt.html AND en/pages/contact.html

   ── Setup ───────────────────────────────────────────────────
   1. Create a Formspree account at https://formspree.io
   2. Create a new form and copy the form ID (e.g. "xpwzabcd")
   3. Set the form's action to:
        https://formspree.io/f/YOUR_FORM_ID_HERE
      on BOTH kontakt.html and en/pages/contact.html
   4. Both SR and EN forms can share the same Formspree endpoint.
   ============================================================ */
(function() {
  var form    = document.getElementById('kontaktForm');
  var success = document.getElementById('kontaktSuccess');
  if (!form) return;

  /* ── Language detection ──────────────────── */
  var isEN = document.documentElement.lang === 'en';

  /* ── Error messages ──────────────────────── */
  var MSG = isEN ? {
    required    : 'This field is required.',
    emailBad    : 'Please enter a valid email address.',
    urlBad      : 'Please enter a valid URL (e.g. https://example.com).',
    sending     : 'Sending…',
    errorRetry  : 'Error — please try again',
  } : {
    required    : 'Ovo polje je obavezno.',
    emailBad    : 'Unesite ispravnu email adresu.',
    urlBad      : 'Unesite ispravan URL (npr. https://primer.rs).',
    sending     : 'Šaljem…',
    errorRetry  : 'Greška — pokušajte ponovo',
  };

  /* ── Validation helpers ──────────────────── */
  function isValidEmail(v) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
  }
  function isValidUrl(v) {
    if (!v.trim()) return true; /* optional field */
    try { new URL(v.trim()); return true; } catch(e) { return false; }
  }

  /* Show / clear error on a .kontakt-field wrapper */
  function setError(input, msg) {
    var field = input.closest('.kontakt-field');
    if (!field) return;
    field.classList.add('is-error');
    var errEl = field.querySelector('.kontakt-field__error');
    if (!errEl) {
      errEl = document.createElement('span');
      errEl.className = 'kontakt-field__error';
      field.appendChild(errEl);
    }
    errEl.textContent = msg;
  }
  function clearError(input) {
    var field = input.closest('.kontakt-field');
    if (!field) return;
    field.classList.remove('is-error');
    var errEl = field.querySelector('.kontakt-field__error');
    if (errEl) errEl.textContent = '';
  }

  /* Clear errors on interaction */
  form.querySelectorAll('input, textarea').forEach(function(input) {
    input.addEventListener('input', function() { clearError(input); });
  });

  /* ── Validate all fields ─────────────────── */
  function validate() {
    var valid = true;

    /* Required text / textarea inputs */
    form.querySelectorAll('[required]').forEach(function(input) {
      if (input.type === 'radio') return; /* radios handled separately */
      if (!input.value.trim()) {
        setError(input, MSG.required);
        valid = false;
      }
    });

    /* Email format */
    var emailInput = form.querySelector('[type="email"]');
    if (emailInput && emailInput.value.trim() && !isValidEmail(emailInput.value)) {
      setError(emailInput, MSG.emailBad);
      valid = false;
    }

    /* URL format (optional field) */
    var urlInput = form.querySelector('[type="url"]');
    if (urlInput && urlInput.value.trim() && !isValidUrl(urlInput.value)) {
      setError(urlInput, MSG.urlBad);
      valid = false;
    }

    return valid;
  }

  /* ── Submit ──────────────────────────────── */
  form.addEventListener('submit', function(e) {
    e.preventDefault();

    /* Run validation first */
    if (!validate()) {
      /* Scroll to first error */
      var firstError = form.querySelector('.is-error input, .is-error textarea');
      if (firstError) firstError.focus();
      return;
    }

    var btn = form.querySelector('[type="submit"]');
    var originalText = btn.innerHTML;
    btn.innerHTML = MSG.sending;
    btn.disabled = true;

    fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { 'Accept': 'application/json' }
    })
    .then(function(res) {
      if (res.ok) {
        form.style.display = 'none';
        if (success) success.classList.add('is-visible');
      } else {
        /* Formspree returns JSON with errors on 4xx */
        return res.json().then(function() {
          btn.innerHTML = MSG.errorRetry;
          btn.disabled  = false;
        }).catch(function() {
          btn.innerHTML = MSG.errorRetry;
          btn.disabled  = false;
        });
      }
    })
    .catch(function() {
      btn.innerHTML = MSG.errorRetry;
      btn.disabled  = false;
    });
  });
})();
