// Cursor
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursorRing');
let mx = 0, my = 0, rx = 0, ry = 0;
document.addEventListener('mousemove', e => {
mx = e.clientX; my = e.clientY;
cursor.style.transform = `translate(${mx - 6}px, ${my - 6}px)`;
});
function animRing() {
rx += (mx - rx) * 0.12;
ry += (my - ry) * 0.12;
ring.style.transform = `translate(${rx - 18}px, ${ry - 18}px)`;
requestAnimationFrame(animRing);
}
animRing();

// Hover effects on interactive elements
document.querySelectorAll('button, a, .service-card, .dest-card, .contact-item').forEach(el => {
el.addEventListener('mouseenter', () => {
    cursor.style.transform += ' scale(1.5)';
    ring.style.opacity = '1';
    ring.style.transform += ' scale(1.3)';
});
el.addEventListener('mouseleave', () => {
    ring.style.opacity = '0.6';
});
});

// WhatsApp form
function sendWhatsApp() {
const name = document.querySelector('.form-input[type="text"]').value || 'Cliente';
const phone = document.querySelector('.form-input[type="tel"]').value || '';
const dest = document.querySelector('.form-select').value || 'por definir';
const msg = document.querySelector('.form-textarea').value || '';
const text = `Hola! Soy ${name}${phone ? ` (${phone})` : ''}. Estoy interesado en viajar a: ${dest}. ${msg}`;
window.open(`https://wa.me/573107777106?text=${encodeURIComponent(text)}`, '_blank');
}

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