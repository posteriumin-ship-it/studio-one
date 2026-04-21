/* ============================================================
   FORM — shared contact form handler
   Handles: client-side validation, honeypot, graceful mailto
   fallback, and Formspree fetch submit.
   Used by: pages/kontakt.html AND en/pages/contact.html

   ── Setup ───────────────────────────────────────────────────
   1. Create two Formspree forms: one for SR and one for EN.
   2. Add and verify posteriu.in@gmail.com as a linked/target email.
   3. Set the form actions to:
        /pages/kontakt.html    → https://formspree.io/f/REPLACE_WITH_SR_FORM_ID
        /en/pages/contact.html → https://formspree.io/f/REPLACE_WITH_EN_FORM_ID
   4. Keeping SR and EN separate makes language-specific autoresponses
      much cleaner, while both forms can still send to the same inbox.

   ── Mailto fallback ─────────────────────────────────────────
   While the Formspree endpoint is not configured, submit opens
   a pre-filled mailto draft with all answers. This guarantees
   no inquiry is ever silently lost during deploy transitions.
   ============================================================ */
(function() {
  var form    = document.getElementById('kontaktForm');
  var success = document.getElementById('kontaktSuccess');
  if (!form) return;

  /* ── Language detection ──────────────────── */
  var isEN = document.documentElement.lang === 'en';

  /* ── Error / UI copy ─────────────────────── */
  var MSG = isEN ? {
    required   : 'This field is required.',
    emailBad   : 'Please enter a valid email address.',
    urlBad     : 'Please enter a valid URL (e.g. https://example.com).',
    sending    : 'Sending',
    errorRetry : 'Something went wrong — please try again',
    emailJoin  : ' at '
  } : {
    required   : 'Ovo polje je obavezno.',
    emailBad   : 'Unesite ispravnu email adresu.',
    urlBad     : 'Unesite ispravan URL (npr. https://primer.rs).',
    sending    : 'Šaljem',
    errorRetry : 'Nešto nije u redu — pokušajte ponovo',
    emailJoin  : ' na '
  };

  var FALLBACK_EMAIL   = 'posteriu.in@gmail.com';
  var MAILTO_SUBJECT   = isEN ? 'Project inquiry — Studio One'
                              : 'Upit za projekat — Studio One';
  var FIELD_LABELS     = isEN ? {
    name    : 'Full name',
    email   : 'Email address',
    company : 'Brand or company name',
    website : 'Existing website link',
    service : 'Requested service',
    message : 'Project description',
    timeline: 'Timeline',
    budget  : 'Rough investment'
  } : {
    name    : 'Ime i prezime',
    email   : 'Email adresa',
    company : 'Naziv brenda ili firme',
    website : 'Link postojećeg sajta',
    service : 'Koja usluga vas zanima',
    message : 'Kratki opis projekta',
    timeline: 'Okvirni rok',
    budget  : 'Okvirna investicija'
  };
  var MAILTO_FIELD_ORDER = ['name', 'email', 'company', 'website', 'service', 'message', 'timeline', 'budget'];
  var META_FIELDS = {
    _gotcha     : true,
    subject     : true,
    form_locale : true,
    form_page   : true
  };
  var PLACEHOLDER_MARKERS = [
    'YOUR_FORM_ID',
    'REPLACE_WITH_SR_FORM_ID',
    'REPLACE_WITH_EN_FORM_ID'
  ];

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
  function clearAllErrors() {
    form.querySelectorAll('.kontakt-field.is-error').forEach(function(field) {
      field.classList.remove('is-error');
      var errEl = field.querySelector('.kontakt-field__error');
      if (errEl) errEl.textContent = '';
    });
  }

  /* Clear errors on interaction */
  form.querySelectorAll('input, textarea').forEach(function(input) {
    input.addEventListener('input', function() { clearError(input); });
    input.addEventListener('change', function() { clearError(input); });
  });

  /* ── Validate all fields ─────────────────── */
  function validate() {
    var valid = true;
    clearAllErrors();

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

  /* Build a readable plain-text summary of the form — used for
     the mailto fallback. Keeps order + skips the honeypot. */
  function buildInquirySummary() {
    var d = new FormData(form);
    var lines = [];

    MAILTO_FIELD_ORDER.forEach(function(key) {
      var value = d.get(key);
      if (typeof value === 'string' && value.trim()) {
        lines.push(FIELD_LABELS[key] + ': ' + value.trim());
      }
    });

    d.forEach(function(v, k) {
      if (META_FIELDS[k]) return;
      if (MAILTO_FIELD_ORDER.indexOf(k) !== -1) return;
      if (typeof v === 'string' && v.trim()) {
        lines.push((FIELD_LABELS[k] || k) + ': ' + v.trim());
      }
    });

    return lines.join('\n');
  }
  function getMailtoSubject() {
    var subjectInput = form.querySelector('[name="subject"]');
    if (subjectInput && subjectInput.value.trim()) {
      return subjectInput.value.trim();
    }
    return MAILTO_SUBJECT;
  }

  /* Reveal the success panel, populate the reply-to email, and
     scroll it into view so the user sees the confirmation. */
  function showSuccess() {
    var emailInput = form.querySelector('[type="email"]');
    var emailSpan  = document.getElementById('kontaktSuccessEmail');
    if (emailSpan && emailInput && emailInput.value.trim()) {
      emailSpan.textContent = MSG.emailJoin + emailInput.value.trim();
    }
    form.style.display = 'none';
    if (success) {
      success.classList.add('is-visible');
      try {
        success.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } catch (e) { /* older browsers */ }
    }
  }

  /* If the Formspree action still contains the placeholder ID,
     we treat the endpoint as not configured. */
  function isEndpointConfigured() {
    if (!form.action) return false;
    return !PLACEHOLDER_MARKERS.some(function(marker) {
      return form.action.indexOf(marker) !== -1;
    });
  }

  /* Graceful fallback: open a pre-filled mail draft so nothing
     is lost while the endpoint is pending configuration. */
  function sendViaMailto() {
    var body = buildInquirySummary();
    var url  = 'mailto:' + FALLBACK_EMAIL
             + '?subject=' + encodeURIComponent(getMailtoSubject())
             + '&body='    + encodeURIComponent(body);
    window.location.href = url;
  }
  function restoreButton(btn, originalHTML) {
    btn.classList.remove('is-sending');
    btn.innerHTML = originalHTML;
    btn.disabled = false;
  }
  function showButtonError(btn) {
    btn.classList.remove('is-sending');
    btn.innerHTML = MSG.errorRetry;
    btn.disabled = false;
  }
  function findFieldByName(name) {
    return form.querySelector('[name="' + name + '"]');
  }
  function renderServerErrors(payload) {
    var errors = payload && Array.isArray(payload.errors) ? payload.errors : [];
    var hasFieldErrors = false;

    clearAllErrors();

    errors.forEach(function(err) {
      var fieldName = err.field || err.name || err.path;
      var message = err.message || MSG.errorRetry;
      if (!fieldName) return;

      var input = findFieldByName(fieldName);
      if (!input) return;

      setError(input, message);
      hasFieldErrors = true;
    });

    if (hasFieldErrors) {
      var firstError = form.querySelector('.is-error input, .is-error textarea');
      if (firstError) firstError.focus();
    }

    return hasFieldErrors;
  }

  /* ── Submit ──────────────────────────────── */
  form.addEventListener('submit', function(e) {
    e.preventDefault();

    /* Honeypot: filled → silently "succeed" without sending */
    var honey = form.querySelector('[name="_gotcha"]');
    if (honey && honey.value) { showSuccess(); return; }

    if (!validate()) {
      var firstError = form.querySelector('.is-error input, .is-error textarea');
      if (firstError) firstError.focus();
      return;
    }

    var btn = form.querySelector('[type="submit"]');
    var originalHTML = btn.innerHTML;

    btn.classList.add('is-sending');
    btn.innerHTML = '<span class="btn-label">' + MSG.sending +
                    '</span><span class="btn-arrow" aria-hidden="true">→</span>';
    btn.disabled  = true;

    /* Mailto fallback when endpoint isn't configured yet */
    if (!isEndpointConfigured()) {
      sendViaMailto();
      /* Restore the button so the user can retry if their mail
         client didn't open (corp machines sometimes block it). */
      setTimeout(function() {
        restoreButton(btn, originalHTML);
      }, 1500);
      return;
    }

    fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { 'Accept': 'application/json' }
    })
    .then(function(res) {
      return res.json().catch(function() {
        return null;
      }).then(function(payload) {
        return { ok: res.ok, payload: payload };
      });
    })
    .then(function(result) {
      if (result.ok) {
        showSuccess();
        return;
      }

      if (renderServerErrors(result.payload)) {
        restoreButton(btn, originalHTML);
        return;
      }

      showButtonError(btn);
    })
    .catch(function() {
      showButtonError(btn);
    });
  });
})();
