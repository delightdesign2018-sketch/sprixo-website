import './main.js';
import './project.css';

const hero = document.querySelector('.case-hero');
const scene = document.querySelector('.case-scroll-scene');
let frame = 0;

function setFrame() {
  const width = hero.clientWidth;
  const height = hero.clientHeight;
  const gutter = Number.parseFloat(getComputedStyle(scene).getPropertyValue('--gutter')) || 20;
  const frameHeight = Math.min(height * .84, Math.max(1, width - gutter * 2) * .75);
  const frameWidth = frameHeight * 4 / 3;
  hero.style.setProperty('--case-inset-x', `${Math.max(0, (width - frameWidth) / 2)}px`);
  hero.style.setProperty('--case-inset-y', `${Math.max(0, (height - frameHeight) / 2)}px`);
}

function update() {
  frame = 0;
  hero.classList.toggle('is-condensed', scene.getBoundingClientRect().top < -16);
}

function schedule() {
  if (!frame) frame = requestAnimationFrame(update);
}

setFrame();
update();
window.addEventListener('scroll', schedule, { passive: true });
window.addEventListener('resize', () => { setFrame(); schedule(); }, { passive: true });
