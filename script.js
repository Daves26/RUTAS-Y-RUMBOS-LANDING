import './style.css';
import './image-fallback.js';

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

// Scroll to top
const logoInicio = document.querySelector('.nav-logo');
logoInicio.addEventListener('click', (e) => {
  e.preventDefault(); // Evita el salto brusco del enlace
  window.scrollTo({
    top: 0,
    behavior: 'smooth' // Esto crea el efecto "Premium" de deslizamiento
  });
});


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
