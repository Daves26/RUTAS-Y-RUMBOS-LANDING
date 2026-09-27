import './styles/destination-detail.css';
import './image-fallback.js';

const root = document.documentElement;
const themeButton = document.querySelector('.detail-theme');
const savedTheme = localStorage.getItem('theme');
const systemTheme = window.matchMedia('(prefers-color-scheme: dark)');

function applyTheme(theme) {
  const isLight = theme === 'light';
  root.classList.toggle('light', isLight);
  themeButton?.setAttribute('aria-pressed', String(isLight));
  if (themeButton) themeButton.title = isLight ? 'Activar modo oscuro' : 'Activar modo claro';
}

applyTheme(savedTheme || (systemTheme.matches ? 'dark' : 'light'));

themeButton?.addEventListener('click', () => {
  const nextTheme = root.classList.contains('light') ? 'dark' : 'light';
  applyTheme(nextTheme);
  localStorage.setItem('theme', nextTheme);
});

systemTheme.addEventListener('change', (event) => {
  if (!localStorage.getItem('theme')) applyTheme(event.matches ? 'dark' : 'light');
});
