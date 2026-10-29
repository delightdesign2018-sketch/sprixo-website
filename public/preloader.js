// Include this shared script just inside <body> on each public HTML entry.
// Creating the overlay here keeps the page usable when JavaScript is disabled.
(() => {
  if (document.querySelector('.sprixo-preloader')) return;

  const loader = document.createElement('div');
  loader.className = 'sprixo-preloader';
  loader.setAttribute('role', 'status');
  loader.setAttribute('aria-label', 'Loading Sprixo website');
  loader.innerHTML = `
    <div class="sprixo-preloader__content">
      <img class="sprixo-preloader__logo" src="/assets/sprixo-logo.png"
           width="2248" height="822" alt="Sprixo" decoding="async">
      <div class="sprixo-preloader__line" aria-hidden="true"></div>
      <p class="sprixo-preloader__text">CREATING IMPACT</p>
    </div>`;
  document.body.prepend(loader);

  let leaving = false;
  let removalTimer;
  const remove = () => {
    window.clearTimeout(fallbackTimer);
    window.clearTimeout(removalTimer);
    window.removeEventListener('load', finish);
    window.removeEventListener('pageshow', restore);
    window.removeEventListener('pagehide', remove);
    loader.remove();
  };

  const finish = () => {
    if (leaving) return;
    leaving = true;
    window.clearTimeout(fallbackTimer);
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      remove();
      return;
    }
    loader.classList.add('is-leaving');
    loader.addEventListener('transitionend', (event) => {
      if (event.target === loader && event.propertyName === 'opacity') remove();
    });
    // Also remove if styles fail to load or transitionend never fires.
    removalTimer = window.setTimeout(remove, 550);
  };

  const restore = (event) => {
    if (event.persisted) remove();
  };

  const fallbackTimer = window.setTimeout(finish, 10000);
  window.addEventListener('pageshow', restore);
  window.addEventListener('pagehide', remove);
  if (document.readyState === 'complete') finish();
  else window.addEventListener('load', finish, { once: true });
})();
