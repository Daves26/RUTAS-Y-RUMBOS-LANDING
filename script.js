import './style.css';

const htmlRoot = document.documentElement;
const CURSOR_PREF_KEY = 'ryr-no-custom-cursor';
if (localStorage.getItem(CURSOR_PREF_KEY) === '1') {
  htmlRoot.classList.add('no-custom-cursor');
}

function isCustomCursorActive() {
  return window.innerWidth >= 769 && !htmlRoot.classList.contains('no-custom-cursor');
}

// Menú móvil (panel accesible)
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

// Cursor (solo escritorio; cursor oculto en móvil vía CSS)
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursorRing');
let mx = 0, my = 0, rx = 0, ry = 0;
document.addEventListener('mousemove', e => {
if (!cursor || !isCustomCursorActive()) return;
mx = e.clientX; my = e.clientY;
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

// Scroll to top
const logoInicio = document.querySelector('.nav-logo');
logoInicio.addEventListener('click', (e) => {
  e.preventDefault(); // Evita el salto brusco del enlace
  window.scrollTo({
    top: 0,
    behavior: 'smooth' // Esto crea el efecto "Premium" de deslizamiento
  });
});


// Hover effects on interactive elements (escritorio)
document.querySelectorAll('button, a, .service-card, .dest-card, .contact-item').forEach(el => {
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

const footerCursorToggle = document.getElementById('footerCursorToggle');
function syncCursorToggleUI() {
  if (!footerCursorToggle) return;
  const standardOn = htmlRoot.classList.contains('no-custom-cursor');
  footerCursorToggle.setAttribute('aria-pressed', standardOn ? 'true' : 'false');
  footerCursorToggle.setAttribute(
    'aria-label',
    standardOn ? 'Volver al cursor animado del sitio' : 'Usar el cursor del sistema'
  );
  footerCursorToggle.textContent = standardOn ? 'Cursor animado' : 'Cursor estándar';
}
footerCursorToggle?.addEventListener('click', () => {
  htmlRoot.classList.toggle('no-custom-cursor');
  localStorage.setItem(CURSOR_PREF_KEY, htmlRoot.classList.contains('no-custom-cursor') ? '1' : '0');
  syncCursorToggleUI();
});
syncCursorToggleUI();

// WhatsApp form
window.sendWhatsApp = function () {
  const name = document.querySelector('.form-input[type="text"]').value || 'Cliente';
  const phone = document.querySelector('.form-input[type="tel"]').value || '';
  const dest = document.querySelector('.form-select').value || 'por definir';
  const msg = document.querySelector('.form-textarea').value || '';
  const text = `Hola! Soy ${name}${phone ? ` (${phone})` : ''}. Estoy interesado en viajar a: ${dest}. ${msg}`;
  window.open(`https://wa.me/573107777106?text=${encodeURIComponent(text)}`, '_blank');
};

// Scroll animations
const observer = new IntersectionObserver((entries) => {
entries.forEach(e => {
    if (e.isIntersecting) {
    e.target.style.opacity = '1';
    e.target.style.transform = 'translateY(0)';
    }
});
}, { threshold: 0.1 });

document.querySelectorAll('.service-card, .dest-card, .contact-item, .stat-item').forEach(el => {
el.style.opacity = '0';
el.style.transform = 'translateY(24px)';
el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
observer.observe(el);
});

// Toggle modo claro
window.toggleTheme = function () {
  document.documentElement.classList.toggle('light');
};

// 1. Determinar el tema inicial
const savedTheme = localStorage.getItem('theme');
const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
    htmlRoot.classList.remove('light');
} else {
    htmlRoot.classList.add('light');
}

// 2. Función de cambio mejorada
window.toggleTheme = function () {
    const isNowLight = htmlRoot.classList.toggle('light');
    localStorage.setItem('theme', isNowLight ? 'light' : 'dark');
};

// 3. Escuchar cambios en el sistema en tiempo real (opcional)
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    if (!localStorage.getItem('theme')) { // Solo si el usuario no ha elegido manualmente
        if (e.matches) htmlRoot.classList.remove('light');
        else htmlRoot.classList.add('light');
    }
});