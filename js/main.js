/* ============================================================
   MAIN — bootstrap all modules
   Guard: each init function is only called if the corresponding
   script was loaded on this page (inner pages load a subset).
   Without the guard, undefined function calls throw ReferenceError
   and abort the handler — initReveal() would never run, leaving
   all reveal-* elements permanently invisible.
   ============================================================ */
document.addEventListener('DOMContentLoaded', function() {
  if (typeof initCursor   === 'function') initCursor();
  if (typeof initNav      === 'function') initNav();
  if (typeof initWwd      === 'function') initWwd();
  if (typeof initPackages === 'function') initPackages();
  if (typeof initFaq      === 'function') initFaq();
  if (typeof initReveal   === 'function') initReveal();
});
