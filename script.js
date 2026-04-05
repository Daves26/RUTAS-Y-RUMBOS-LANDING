import './style.css';
import { destinationsData } from './js/data.js';

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
  a.addEventListener('click', (e) => {
    setNavOpen(false);
    // Interceptar click si estamos en la vista de detalle del SPA
    const homeViewEl = document.getElementById('home-view');
    if (homeViewEl && !homeViewEl.classList.contains('active-view')) {
      e.preventDefault();
      const targetId = a.getAttribute('href').substring(1);
      // Trigger navigation with page transition
      if (typeof window.navigateToHome === 'function') {
        window.navigateToHome(targetId);
      }
    }
  });
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

const logoInicio = document.querySelector('.nav-logo a');
logoInicio?.addEventListener('click', (e) => {
  e.preventDefault();
  const homeViewEl = document.getElementById('home-view');
  if (homeViewEl && !homeViewEl.classList.contains('active-view') && typeof window.navigateToHome === 'function') {
    window.navigateToHome();
  } else {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
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

// --- LÓGICA SPA (Single Page Application) ---
const homeView = document.getElementById('home-view');
const destView = document.getElementById('destination-view');
const btnBackHome = document.getElementById('btn-back-home');
const destSkeleton = document.getElementById('dest-skeleton');
const destContent = document.getElementById('dest-content');

const destBannerImg = document.getElementById('dest-banner-img');
const destTitle = document.getElementById('dest-title');
const destRegion = document.getElementById('dest-region');
const destAirlines = document.getElementById('dest-airlines');
const destHotels = document.getElementById('dest-hotels');
const destExtras = document.getElementById('dest-extras');

const navCtaBtn = document.getElementById('nav-cta-btn');
navCtaBtn?.addEventListener('click', () => {
  const homeViewEl = document.getElementById('home-view');
  if (homeViewEl && !homeViewEl.classList.contains('active-view') && typeof window.navigateToHome === 'function') {
    window.navigateToHome('contacto');
  } else {
    document.getElementById('contacto')?.scrollIntoView({behavior:'smooth'});
  }
});

function navigateToHome(targetId = null) {
  if (!homeView || !destView) return;
  
  // Determine target position before transition
  let targetTop = 0;
  if (targetId) {
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetTop = targetElement.getBoundingClientRect().top + window.pageYOffset;
    }
  }
  
  // Apple-style crossfade transition
  destView.style.opacity = '0';
  destView.style.transform = 'scale(0.98)';
  
  homeView.style.opacity = '0';
  homeView.style.transform = 'scale(1.02)';
  homeView.classList.remove('hidden-view');
  homeView.classList.add('active-view');
  
  // Scroll to target position instantly (before view is visible)
  if (targetTop > 0) {
    window.scrollTo({ top: targetTop, behavior: 'instant' });
  } else {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }
  
  // Force reflow
  void homeView.offsetWidth;
  
  // Fade in home view (already at correct scroll position)
  homeView.style.transition = 'opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1), transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
  homeView.style.opacity = '1';
  homeView.style.transform = 'scale(1)';
  
  setTimeout(() => {
    destView.classList.remove('active-view');
    destView.classList.add('hidden-view');
    destView.style.transition = '';
    destView.style.opacity = '';
    destView.style.transform = '';
    homeView.style.transition = '';
    homeView.style.opacity = '';
    homeView.style.transform = '';
  }, 500);
}
// Hacerla disponible globalmente para poderla llamar desde los Listeners de arriba
window.navigateToHome = navigateToHome;

function navigateToDestination(destId) {
  if (!homeView || !destView) return;
  
  // Apple-style crossfade transition
  // Fade out home view
  homeView.style.opacity = '0';
  homeView.style.transform = 'scale(1.02)';
  
  // Prepare destination view
  destView.style.opacity = '0';
  destView.style.transform = 'scale(0.98)';
  destView.classList.remove('hidden-view');
  destView.classList.add('active-view');
  
  // Force reflow
  void destView.offsetWidth;
  
  // Fade in destination view
  destView.style.transition = 'opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1), transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
  destView.style.opacity = '1';
  destView.style.transform = 'scale(1)';
  
  setTimeout(() => {
    homeView.classList.remove('active-view');
    homeView.classList.add('hidden-view');
    homeView.style.transition = '';
    homeView.style.opacity = '';
    homeView.style.transform = '';
    destView.style.transition = '';
    destView.style.opacity = '';
    destView.style.transform = '';
    
    window.scrollTo({ top: 0, behavior: 'instant' });

    // Preparar UI: Mostrar Skeleton, ocultar contenido real
    if (destContent && destSkeleton) {
      destContent.classList.remove('active');
      destContent.classList.add('hidden');
      destSkeleton.classList.add('active');
      destSkeleton.classList.remove('hidden');
    }

    loadDestinationData(destId);
  }, 500);
}

function renderDestination(data) {
  if (destBannerImg) {
    destBannerImg.src = data.img;
    destBannerImg.alt = data.name;
  }
  if (destTitle) destTitle.textContent = data.name;
  if (destRegion) destRegion.textContent = data.region;
  
  if (destAirlines) {
    destAirlines.innerHTML = data.airlines.map(a => `
      <div class="dest-glass-card">
         <div class="dest-glass-bg">
            <img src="https://placehold.co/400x300/e0e0e0/555555?text=Aerolinea+Img" alt="Fondo placeholder">
         </div>
         <div class="dest-glass-content">
            <div class="glass-card-icon"><i class="fas fa-plane"></i></div>
            <h3>${a.name}</h3>
            <div class="dest-glass-card-sub">${a.route}</div>
            <p>${a.type}</p>
         </div>
      </div>
    `).join('');
  }
  
  if (destHotels) {
    destHotels.innerHTML = data.hotels.map(h => `
      <div class="dest-glass-card">
         <div class="dest-glass-bg">
            <img src="https://placehold.co/400x300/e0e0e0/555555?text=Hotel+Img" alt="Fondo placeholder">
         </div>
         <div class="dest-glass-content">
            <div class="glass-card-icon"><i class="fas fa-bed"></i></div>
            <h3>${h.name}</h3>
            <div class="dest-glass-card-sub">${h.rating}</div>
            <p>${h.desc}</p>
         </div>
      </div>
    `).join('');
  }
  
  if (destExtras) {
    destExtras.innerHTML = data.extras.map(e => `
      <div class="dest-glass-card">
         <div class="dest-glass-bg">
            <img src="https://placehold.co/400x300/e0e0e0/555555?text=Extra+Img" alt="Fondo placeholder">
         </div>
         <div class="dest-glass-content">
            <div class="glass-card-icon"><i class="fas ${e.icon}"></i></div>
            <h3>${e.title}</h3>
            <p>${e.desc}</p>
         </div>
      </div>
    `).join('');
  }
  
  if (destContent && destSkeleton) {
    destSkeleton.classList.remove('active');
    destSkeleton.classList.add('hidden');
    destContent.classList.remove('hidden');
    destContent.classList.add('active');
  }
}

function loadDestinationData(destId) {
  const cacheKey = `ryr-dest-${destId}`;
  const cachedData = localStorage.getItem(cacheKey);
  
  if (cachedData) {
    setTimeout(() => {
      renderDestination(JSON.parse(cachedData));
    }, 200); // Ligero delay para UX cuando viene del cache
    return;
  }
  
  setTimeout(() => {
    const data = destinationsData[destId];
    if (data) {
      localStorage.setItem(cacheKey, JSON.stringify(data));
      renderDestination(data);
    } else {
      navigateToHome(); // Fallback si no existe
    }
  }, 1200); // 1.2s simulando latencia para mostrar the skeleton
}

const destCtaBtn = document.getElementById('dest-cta-btn');
destCtaBtn?.addEventListener('click', () => window.navigateToHome('contacto'));

document.querySelectorAll('.dest-card').forEach(card => {
  card.addEventListener('click', () => {
    const destId = card.getAttribute('data-dest-id');
    if (destId) {
      navigateToDestination(destId);
    }
  });
});
