# Rutas y Rumbos — Documentación del proyecto

## Propósito

**Rutas y Rumbos** es la página de aterrizaje (landing) de una agencia de viajes con sede en **San Gil, Santander (Colombia)**. El sitio presenta servicios, destinos, la trayectoria de la agencia, la relación como **agencia comercial SATENA**, y canales de contacto (teléfono, correo, WhatsApp). Incluye un formulario de cotización que arma un mensaje y lo abre en WhatsApp, además de fichas independientes para los destinos destacados.

Objetivos principales:

- Generar confianza y leads (cotizaciones vía WhatsApp).
- Comunicar oferta (tiquetes, hoteles, paquetes, cruceros, salidas grupales, seguros).
- Reforzar la identidad local y el vínculo con SATENA.

---

## Stack tecnológico

| Área | Tecnología |
|------|------------|
| Empaquetado y dev server | [Vite](https://vitejs.dev/) 8.x |
| Lenguaje | HTML5, CSS3, JavaScript (ES modules), sin framework de UI |
| Fuentes | Google Fonts: **DM Sans**, **Syne** |
| Iconos | [Font Awesome 6](https://fontawesome.com/) (CDN) |
| Almacenamiento local | `localStorage` (tema claro/oscuro y preferencia de cursor) |

No hay backend ni base de datos: es un sitio estático generado o servido por Vite.

---

## Estructura del repositorio

```
Rutas y Rumbos Landing/
├── index.html          # Landing: secciones y contenido principal
├── destinos/           # Fichas estáticas: un index.html por destino
├── destination.js      # Tema compartido en las fichas
├── vite.config.mjs     # Entradas HTML para el build multipágina
├── script.js           # Punto de entrada JS (importa estilos; interactividad)
├── style.css           # Entrada CSS: @import de módulos en styles/
├── styles/             # Hojas por bloque (orden de carga definido en style.css)
│   ├── tokens.css      # Variables de diseño
│   ├── base.css
│   ├── animations.css
│   ├── cursor.css
│   ├── nav.css
│   ├── hero.css
│   ├── stats.css
│   ├── sections.css
│   ├── destinations.css
│   ├── destination-detail.css # Estilos compartidos de las fichas
│   ├── highlight.css
│   ├── partnership.css
│   ├── contact.css
│   ├── footer.css
│   └── utilities.css
├── package.json
├── package-lock.json
└── dist/               # Salida de `npm run build` (no versionar en producción si se prefiere)
```

**Recursos estáticos:** Las rutas en HTML usan prefijo `/` (por ejemplo `/logo-rutas-y-rumbos.png`, imágenes de destinos). En Vite conviene colocarlos en la carpeta **`public/`** para que se copien a la raíz del build y funcionen igual en desarrollo y producción.

---

## Secciones de la landing (`index.html`)

1. **Navegación** — Enlaces ancla: Servicios, Destinos, Nosotros, SATENA, Contacto; CTA “Cotizar viaje”; alternancia de tema.
2. **Hero (`#home`)** — Mensaje principal, ubicación (Google Maps), CTAs.
3. **Franja de estadísticas** — Cifras de experiencia, viajeros, destinos, atención.
4. **Servicios (`#servicios`)** — Tarjetas de servicios (aéreos, hotel, paquetes, cruceros, grupales, seguros/visas).
5. **Destinos (`#destinos`)** — Grid visual que enlaza a las fichas de Punta Cana, Europa, Cartagena, San Andrés y Providencia, y México.
6. **Nosotros (`#nosotros`)** — Historia y propuesta de valor.
7. **SATENA (`#satena`)** — Bloque de alianza / agencia oficial.
8. **Contacto (`#contacto`)** — Datos, enlaces WhatsApp y formulario que dispara `sendWhatsApp()` en `script.js`.
9. **Footer** — Marca, copyright, enlaces rápidos, opción para desactivar el cursor personalizado.

---

## Comportamiento destacado (`script.js`)

- Menú móvil accesible (ARIA, Escape, cierre al redimensionar).
- Cursor personalizado en escritorio (con opción de cursor estándar y persistencia).
- Scroll suave al inicio desde el logo.
- **IntersectionObserver** para animaciones al entrar en vista.
- **Tema:** clase `light` en `<html>`, preferencia guardada y sincronización opcional con `prefers-color-scheme`.
- **Formulario → WhatsApp:** construye el texto y abre `wa.me` con el número configurado.

### Fichas de destinos

- Cada ficha está en `destinos/<slug>/index.html`: el contenido (hoteles, aerolíneas, experiencias y texto de WhatsApp) se edita directamente en ese archivo. `styles/destination-detail.css` y `destination.js` comparten diseño y preferencia de tema con la landing.
- Los nombres de hoteles y aerolíneas son **referencias editoriales**, no un ranking ni garantía de rutas, tarifas o disponibilidad. Confirmar la oferta vigente antes de ofrecerla a un cliente. Europa y México muestran ejemplos ubicados por ciudad o zona; los alojamientos de la ficha de San Andrés están en San Andrés, no en Providencia.
- Al agregar un destino nuevo, crear su `destinos/<slug>/index.html`, añadir el enlace en `index.html` y agregar el slug al arreglo de `vite.config.mjs`. `npm run build` genera los HTML bajo `dist/destinos/`; el alojamiento estático debe servir `index.html` al abrir las rutas con barra final.

#### Fotografías de hoteles

Cada tarjeta ya apunta a un archivo WebP transparente válido en `public/hoteles/`. Para mostrar una foto, reemplazar **el archivo correspondiente, conservando su nombre**: el HTML y los estilos ya están conectados. Mientras tanto, el fondo de la tarjeta indica «Foto próximamente». Si una imagen falta o no se puede leer, `image-fallback.js` muestra un SVG local distinto para hoteles, destinos o marcas, tanto en la landing como en las fichas. Usar fotos del hotel exacto con permiso para publicarlas en la web de la agencia. Una foto pública en la web del hotel o en otra agencia no equivale a una licencia de reutilización. Por ejemplo, el [Media Kit de Decameron para agencias](https://travelagents.decameron.com/es/agy-co-media-kit) requiere acceso, mientras que su [contrato de uso del sitio](https://travelagents.decameron.com/es/agy-co-contrato-de-informacion-y-uso-del-sitio) prohíbe copiar sus imágenes sin consentimiento previo por escrito.

Cuando se obtenga una foto autorizada, guardar el original y la constancia de permiso fuera del repositorio; reemplazar su WebP por una copia optimizada (idealmente 720 × 450 px, o una imagen horizontal de proporción similar). `loading="lazy"` y el recorte `object-fit: cover` ya están configurados. Las imágenes son decorativas porque el nombre de cada hotel aparece inmediatamente debajo; no hay que editar el texto alternativo al reemplazarlas.

| Ficha | Archivos en `public/hoteles/` |
|-------|------------------------------|
| Punta Cana | `riu-bambu.webp`, `bahia-principe-explore-punta-cana.webp`, `hard-rock-hotel-casino-punta-cana.webp` |
| Europa | `hotel-artemide.webp`, `hotel-trevi-collection.webp`, `hotel-riu-plaza-espana.webp` |
| Cartagena | `hotel-decameron-cartagena.webp`, `hotel-caribe-by-faranda-grand.webp`, `hotel-cartagena-premium.webp` |
| San Andrés | `decameron-san-luis.webp`, `sol-caribe-san-andres.webp`, `ghl-hotel-sunrise.webp` |
| México | `barcelo-mexico-reforma.webp`, `camino-real-polanco.webp`, `grand-palladium-costa-mujeres.webp` |

Confirmar la propiedad exacta antes de añadir las fotos: Hotel Cartagena Premium, Decameron San Luis (no otros hoteles Decameron de la isla) y Camino Real Polanco (no Aeropuerto) son alojamientos distintos dentro de las opciones iniciales.

---

## Scripts npm

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Servidor de desarrollo (Vite). |
| `npm run build` | Compilación estática en `dist/`. |
| `npm run preview` | Previsualiza el build localmente. |

---

## Repositorio remoto

- GitHub: `https://github.com/Daves26/RUTAS-Y-RUMBOS-LANDING`.
