# Starter Sportfolio

Proyecto base con todas las secciones **aplicadas** del catálogo. Los textos son los de Keki Piovi, como ejemplo de cómo se llena cada campo. Las imágenes son placeholders grises que indican el nombre y el tamaño esperados.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # dist/ para Netlify
```

## Estructura

```
src/
├── App.jsx                 ← orden de las secciones (sacá las que no uses)
├── main.jsx                ← Lenis + ScrollTrigger (ignoreMobileResize) + Chakra
├── theme.js                ← paleta brand.* y fuentes: lo primero que se cambia
├── data/
│   ├── playerData.js       ← todo el contenido del jugador
│   ├── finalData.js        ← sección "Final" (torneo destacado)
│   └── matchData.js        ← partidos por defecto del MatchBox del hero
├── components/
│   ├── Hero/               ← Hero.jsx + MatchBox.jsx
│   ├── Final/              ← FinalSection.jsx + shared.jsx (estrella, cuenta regresiva)
│   ├── Stats/              ← ficha de scouting + clubes colapsables
│   ├── Videos/             ← VideosSection + VideoCard + InstagramRail
│   ├── Gallery/            ← pestañas + mosaico + "Ver más" + lightbox
│   ├── Press/              ← titulares
│   ├── Contact/            ← redes + tarjetas de representación
│   └── UI/                 ← Navbar, MobileMenu, BrandLogo, Footer
├── hooks/                  ← useScrubReveal, useCountdown, useActiveSection, useMatches
├── utils/heroUnits.js      ← unidades que no cambian con el zoom + alto estable en mobile
├── lib/                    ← Firebase (lazy) para el panel /admin
└── pages/AdminPage.jsx     ← carga de próximos partidos (noindex)
```

## Qué reemplazar

### 1. Colores: `src/theme.js`

- `brand.amber` es el acento principal (en Keki, el rojo de Estudiantes). `brand.dorado` es el secundario.
- `brand.dark` y `brand.bone` son el fondo y el texto. Conviene mantenerlos oscuro y crema, y cambiar solo los acentos.
- Las fuentes son Bebas Neue (`heading`), Barlow Condensed (`mono`) y Barlow (`body`). Se cargan desde `index.html`.
- `dev.*` son los colores del crédito del desarrollador en el footer. No se tocan.

### 2. Datos: `src/data/playerData.js`

| Campo | Lo usa | Notas |
|---|---|---|
| `name`, `fullName`, `BIRTH_DATE` | Hero, ficha, footer | La edad se calcula sola |
| `nickname`, `shortName` | alt y aria-labels | Ej.: `'Keki'`, `'Keki Piovi'` |
| `number`, `position*`, `nationality*`, `height`, `weight`, `foot`, `birthPlace` | Hero y ficha | |
| `currentClub`, `logoCurrentClub` | Hero y ficha | |
| `pitchZoneLabel` | Ficha | Descripción en palabras de la zona de la cancha |
| `stats` | Ficha → atributos | 6 valores de 0 a 100 |
| `seasonStats` | Ficha → última temporada | `highlight: true` los pinta de rojo |
| `clubs` | Ficha → trayectoria | `titles` e `info` son arrays. Sin datos, la fila no se puede abrir. `loan: true` agrega "a préstamo" |
| `videos` | Videos | Reels de Instagram: `instagramId`, `thumbnail` y `cover` |
| `galleries` | Galería | `{ key, name, description, photos: [{ src, alt, pos? }] }`. `pos` es el `objectPosition` del encuadre |
| `press` | Prensa | `{ media, logo, type, title, date, url }` |
| `socialMedia` | Contacto → redes | |
| `contact` | Contacto → representación | `forWhom` y `cta` arman el texto de la tarjeta |

### 3. Imágenes: `assets/`

Placeholders actuales y tamaño de referencia:

| Archivo | Tamaño | Qué va |
|---|---|---|
| `player-hero.webp` | 1002×2791 | Recorte del jugador con fondo transparente, de cuerpo entero |
| `hero-bg.webp`, `hero-bg2.webp` | 786×2148 / 898×1400 | Fotos de fondo del hero. La segunda solo se ve en desktop |
| `final/player-final.webp` | 1080×1350 | Recorte del jugador para la sección Final |
| `final/*.webp` | 1050×1400 | Galería de la noche clave del torneo |
| `escudos/*.webp` | 256×256 | Escudos de los clubes de la trayectoria y del rival de la final |
| `gallery/imageN.webp` | variable | Fotos de la galería. Convertir a WebP con un máximo de 1800 px y calidad 80 |
| `logos/logoN.webp` | variable | Logos de los medios de prensa |
| `contact*.{svg,webp}` | 512×512 | Logos de los representantes |
| `argentina.webp` | 512×512 | Bandera de la nacionalidad |
| `logo_sport.png` | — | Logo Sportfolio del crédito. **Se mantiene** |

Para convertir fotos:

```bash
convert foto.jpg -auto-orient -strip -resize '1800x1800>' -quality 80 assets/gallery/imageN.webp
```

### 4. SEO

El SEO de ejemplo es el de kekipiovi.com y hay que reemplazarlo completo.

- **`index.html`:**
  - Título, descripción y canonical.
  - Etiquetas Open Graph, `profile:*` y de X/Twitter.
  - Datos estructurados (JSON-LD con WebSite, ProfilePage y Person): redes en `sameAs`, club en `memberOf`, nacionalidad, etc.
  - El contenido del `<noscript>`.
- **`public/sitemap.xml`, `robots.txt` y `site.webmanifest`:** cambiar el dominio y el nombre.
- **Imagen para redes (`public/og-image.jpg`, 1200×630):** generarla con `herramientas/og/`.
- **Favicons:** `python3 herramientas/favicon/favicon.py <INICIALES> --font <BebasNeue.woff> --out public --bar <acento>`.

### 5. Firebase (opcional)

Sin variables de entorno, la landing usa `matchData.js` y el panel `/admin` no carga nada. Para usar el panel, copiá `.env.example` a `.env` y poné el `VITE_PLAYER_SLUG` del jugador. El proyecto de Firebase lo comparten todas las landings, separadas por ese slug.
