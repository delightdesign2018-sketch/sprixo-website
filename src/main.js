import './style.css';

const menuToggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#main-navigation');
const mobileViewport = window.matchMedia('(max-width: 650px)');

if (menuToggle && navigation) {
  const setMenuOpen = (open) => {
    const expanded = mobileViewport.matches && open;
    menuToggle.setAttribute('aria-expanded', String(expanded));
    menuToggle.setAttribute('aria-label', expanded ? 'Close navigation' : 'Open navigation');
    navigation.inert = mobileViewport.matches && !expanded;
  };

  menuToggle.addEventListener('click', () => {
    setMenuOpen(menuToggle.getAttribute('aria-expanded') !== 'true');
  });

  navigation.addEventListener('click', (event) => {
    if (mobileViewport.matches && event.target.closest('a')) {
      menuToggle.focus({ preventScroll: true });
      setMenuOpen(false);
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') {
      event.preventDefault();
      menuToggle.focus({ preventScroll: true });
      setMenuOpen(false);
    }
  });

  mobileViewport.addEventListener('change', () => {
    if (mobileViewport.matches && navigation.contains(document.activeElement)) {
      menuToggle.focus({ preventScroll: true });
    } else if (!mobileViewport.matches && document.activeElement === menuToggle) {
      navigation.querySelector('a').focus({ preventScroll: true });
    }
    setMenuOpen(false);
  });

  setMenuOpen(false);
}
