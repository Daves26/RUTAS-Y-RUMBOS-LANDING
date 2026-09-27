const base = import.meta.env.BASE_URL;
const placeholders = {
  destino: `${base}placeholder-destino.svg`,
  hotel: `${base}placeholder-hotel.svg`,
  marca: `${base}placeholder-marca.svg`,
  satena: `${base}placeholder-satena.svg`,
};

function showPlaceholder(image) {
  if (image.dataset.placeholderApplied === 'true') {
    // Si también falla el recurso local, no mostrar el icono de imagen rota.
    image.style.visibility = 'hidden';
    return;
  }

  const source = image.getAttribute('src') || '';
  if (!source) return;

  let kind = 'destino';
  if (image.classList.contains('detail-card-photo')) kind = 'hotel';
  else if (source.includes('logo-satena')) kind = 'satena';
  else if (source.includes('logo-rutas-y-rumbos')) kind = 'marca';

  image.dataset.placeholderApplied = 'true';
  image.removeAttribute('srcset');
  image.removeAttribute('sizes');
  image.alt = kind === 'marca' ? 'Rutas y Rumbos' : kind === 'satena' ? 'SATENA' : '';
  image.src = placeholders[kind];
}

// El evento error de <img> no burbujea: captura cubre imágenes diferidas.
document.addEventListener('error', (event) => {
  if (event.target instanceof HTMLImageElement) showPlaceholder(event.target);
}, true);

// También cubre fallos ocurridos antes de cargar este módulo.
document.querySelectorAll('img').forEach((image) => {
  if (image.complete && image.naturalWidth === 0) showPlaceholder(image);
});
