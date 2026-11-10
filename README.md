# Plantillas Sportfolio

Modelos de diseño reutilizables para landings de jugadores de fútbol, sacados del sitio de **Ezequiel "Keki" Piovi** ([kekipiovi.com](https://kekipiovi.com)).

Cada sección de la landing tiene varios modelos:

- **Aplicado:** está implementado en React dentro de [`starter/`](starter/) y se puede usar tal cual.
- **Alternativa:** es una preview HTML que se descartó en Keki pero sirve para otro jugador. Si se elige, se porta a React con los mismos patrones del aplicado.

La skill [`skill/sportfolio-landing`](skill/sportfolio-landing/SKILL.md) le enseña a Claude a usar este repo. Ofrece 3 opciones por sección, arma la landing desde el starter y adapta datos, colores y SEO al jugador nuevo.

## Qué hay

```
plantillas_skills/
├── CATALOGO.md            ← índice de todos los modelos, sección por sección
├── starter/               ← proyecto Vite + React listo para clonar (todas las secciones aplicadas)
├── modelos/
│   ├── 01-hero/           ← README + capturas
│   ├── 02-final/          ← sección "camino a la final" de una copa (Libertadores en Keki)
│   ├── 03-estadisticas/   ← README + capturas + previews/ (3 opciones)
│   ├── 04-videos/         ← 5 opciones
│   ├── 05-galeria/        ← 3 opciones
│   ├── 06-prensa/         ← 3 opciones
│   ├── 07-contacto/       ← 4 opciones
│   └── 08-footer/         ← 3 opciones
├── herramientas/
│   ├── favicon/favicon.py ← genera favicon.svg/.ico/PNGs con el logo del navbar
│   ├── og/                ← plantilla de imagen para redes (og.html → og-image.jpg)
│   └── capturas/capt.mjs  ← captura cada sección en desktop y mobile
└── skill/sportfolio-landing/SKILL.md
```

## Ver los modelos

- **Previews:** cada `modelos/*/previews/*.html` es un archivo autocontenido (fotos y estilos adentro) que se abre con doble clic. Al lado hay un `.jpg` con la miniatura.
- **Capturas:** `modelos/*/capturas/` muestra cómo quedó el modelo aplicado en el sitio real, en desktop y mobile.

## Arrancar una landing nueva

1. Copiá `starter/` a un repo nuevo y corré `npm install`.
2. Reemplazá los datos en `src/data/`:
   - `playerData.js`: perfil, estadísticas, clubes, videos, galería, prensa, redes y contacto.
   - `finalData.js`: solo si el jugador tiene una final o un torneo para destacar. Si no, sacá la sección de `App.jsx` y del navbar.
   - `matchData.js`: próximos partidos por defecto. Con Firebase configurado, se cargan desde `/admin`.
3. Reemplazá las imágenes de `assets/`. Hoy son placeholders grises con el nombre y el tamaño esperado. La lista completa está en [`starter/README.md`](starter/README.md).
4. Ajustá los colores del club en `src/theme.js`.
5. Hacé el SEO: textos de `index.html`, `public/sitemap.xml`, `robots.txt` y `site.webmanifest`. Generá el favicon y la imagen para redes con `herramientas/`.
6. Corré `npm run build` y publicá en Netlify; `netlify.toml` ya está configurado.

Las instrucciones detalladas de cada sección están en el README de su carpeta dentro de `modelos/`.

## Stack

| Uso | Herramienta |
|---|---|
| Interfaz | React 18, Vite 5, Chakra UI 2 |
| Animación | Framer Motion 11, GSAP + ScrollTrigger |
| Scroll suave | Lenis |
| Rutas | React Router 7 |
| Panel `/admin` (opcional) | Firebase |
| Deploy | Netlify |
