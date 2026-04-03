# Rutas y Rumbos — Documentación del proyecto

## Propósito

**Rutas y Rumbos** es la página de aterrizaje (landing) de una agencia de viajes con sede en **San Gil, Santander (Colombia)**. El sitio presenta servicios, destinos, la trayectoria de la agencia, la relación como **agencia comercial SATENA**, y canales de contacto (teléfono, correo, WhatsApp). Incluye un formulario de cotización que arma un mensaje y lo abre en WhatsApp.

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
├── index.html          # Página única: secciones y contenido principal
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
5. **Destinos (`#destinos`)** — Grid visual con destinos destacados.
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
