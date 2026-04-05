import './style.css';

const htmlRoot = document.documentElement;
const CURSOR_PREF_KEY = 'ryr-no-custom-cursor';

const savedCursorPref = localStorage.getItem(CURSOR_PREF_KEY);
if (savedCursorPref === null || savedCursorPref === '1') {
  htmlRoot.classList.add('no-custom-cursor');
} else {
  htmlRoot.classList.remove('no-custom-cursor');
}

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function isCustomCursorActive() {
  return window.innerWidth >= 769 && !htmlRoot.classList.contains('no-custom-cursor');
}

const siteNav = document.getElementById('siteNav');
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

function setNavOpen(open) {
  if (!siteNav || !navToggle) return;
  siteNav.classList.toggle('nav-open', open);
  navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  navToggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
  document.body.classList.toggle('nav-open', open);
}

navToggle?.addEventListener('click', () => {
  setNavOpen(!siteNav?.classList.contains('nav-open'));
});

navMenu?.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener('click', () => setNavOpen(false));
});

window.addEventListener('resize', () => {
  if (window.innerWidth >= 769) setNavOpen(false);
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') setNavOpen(false);
});

const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursorRing');
let mx = 0;
let my = 0;
let rx = 0;
let ry = 0;

document.addEventListener('mousemove', (e) => {
  if (!cursor || !isCustomCursorActive()) return;
  mx = e.clientX;
  my = e.clientY;
  cursor.style.transform = `translate(${mx - 6}px, ${my - 6}px)`;
});

function animRing() {
  if (!ring || !isCustomCursorActive()) {
    requestAnimationFrame(animRing);
    return;
  }
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  ring.style.transform = `translate(${rx - 18}px, ${ry - 18}px)`;
  requestAnimationFrame(animRing);
}
animRing();

const logoInicio = document.querySelector('.nav-logo');
logoInicio?.addEventListener('click', (e) => {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

document.querySelectorAll('button, a, .service-card, .dest-card, .contact-item').forEach((el) => {
  el.addEventListener('mouseenter', () => {
    if (!cursor || !isCustomCursorActive()) return;
    cursor.style.transform += ' scale(1.5)';
    ring.style.opacity = '1';
    ring.style.transform += ' scale(1.3)';
  });
  el.addEventListener('mouseleave', () => {
    if (!ring || !isCustomCursorActive()) return;
    ring.style.opacity = '0.6';
  });
});

window.toggleCursor = function toggleCursor() {
  htmlRoot.classList.toggle('no-custom-cursor');
  localStorage.setItem(CURSOR_PREF_KEY, htmlRoot.classList.contains('no-custom-cursor') ? '1' : '0');
};

window.sendWhatsApp = function sendWhatsApp() {
  const name = document.querySelector('.form-input[type="text"]')?.value || 'Cliente';
  const phone = document.querySelector('.form-input[type="tel"]')?.value || '';
  const dest = document.querySelector('.form-select')?.value || 'por definir';
  const msg = document.querySelector('.form-textarea')?.value || '';
  const text = `Hola! Soy ${name}${phone ? ` (${phone})` : ''}. Estoy interesado en viajar a: ${dest}. ${msg}`;
  window.open(`https://wa.me/573107777106?text=${encodeURIComponent(text)}`, '_blank');
};

const savedTheme = localStorage.getItem('theme');
const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
  htmlRoot.classList.remove('light');
} else {
  htmlRoot.classList.add('light');
}

window.toggleTheme = function toggleTheme() {
  const isNowLight = htmlRoot.classList.toggle('light');
  localStorage.setItem('theme', isNowLight ? 'light' : 'dark');
};

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
  if (!localStorage.getItem('theme')) {
    if (e.matches) htmlRoot.classList.remove('light');
    else htmlRoot.classList.add('light');
  }
});

function initNavScroll() {
  const nav = document.getElementById('siteNav');
  if (!nav) return;
  const onScroll = () => {
    nav.classList.toggle('site-nav--scrolled', window.scrollY > 32);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}

function initHeroParallax() {
  const heroFx = document.getElementById('heroFx');
  const hero = document.querySelector('.hero');
  if (!heroFx || !hero || prefersReducedMotion()) return;

  let ticking = false;
  const update = () => {
    ticking = false;
    const rect = hero.getBoundingClientRect();
    if (rect.bottom < 0 || rect.top > window.innerHeight) return;
    const range = Math.max(hero.offsetHeight, 1);
    const p = Math.min(1, Math.max(0, -rect.top / (range * 0.55)));
    const y = p * 48;
    heroFx.style.transform = `translate3d(0, ${y}px, 0)`;
  };

  window.addEventListener(
    'scroll',
    () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    },
    { passive: true }
  );
  update();
}

let revealObserver = null;

function teardownScrollReveals() {
  if (revealObserver) {
    revealObserver.disconnect();
    revealObserver = null;
  }
}

function applyRevealStagger(selector, delayStep) {
  const reduced = prefersReducedMotion();
  document.querySelectorAll(selector).forEach((el, i) => {
    if (!el.classList.contains('reveal')) el.classList.add('reveal');
    if (!reduced) el.style.setProperty('--reveal-delay', `${i * delayStep}s`);
  });
}

function setRevealVisibleState(el, visible) {
  if (visible) {
    el.classList.add('is-inview');
    el.removeAttribute('aria-hidden');
    if ('inert' in el) el.inert = false;
  } else {
    el.classList.remove('is-inview');
    el.setAttribute('aria-hidden', 'true');
    if ('inert' in el) el.inert = true;
  }
}

function initScrollReveals() {
  teardownScrollReveals();

  const reduced = prefersReducedMotion();

  applyRevealStagger('.services-grid .service-card', 0.06);
  applyRevealStagger('.dest-grid .dest-card', 0.07);
  applyRevealStagger('.contact-info .contact-item', 0.06);
  applyRevealStagger('.stats-strip .stat-item', 0.08);

  document.querySelectorAll('.contact-form-card').forEach((el) => {
    el.classList.add('reveal');
    if (!reduced) el.style.setProperty('--reveal-delay', '0.28s');
  });

  const revealEls = document.querySelectorAll('.reveal');

  if (reduced) {
    revealEls.forEach((el) => setRevealVisibleState(el, true));
    return;
  }

  revealEls.forEach((el) => setRevealVisibleState(el, false));

  revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        setRevealVisibleState(entry.target, entry.isIntersecting);
      });
    },
    {
      threshold: 0,
      rootMargin: '0px 0px -8% 0px',
    }
  );

  revealEls.forEach((el) => revealObserver.observe(el));
}

window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', () => {
  initScrollReveals();
});

initNavScroll();
initHeroParallax();
initScrollReveals();
