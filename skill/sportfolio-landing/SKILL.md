---
name: sportfolio-landing
description: Arma o rediseña la landing de un jugador de fútbol con los modelos del repo mgunsett/plantillas_skills (React + Chakra + GSAP). Ofrece 3 opciones por sección, adapta datos, colores y SEO, y guarda los modelos nuevos en el catálogo.
---

# Landing Sportfolio para jugadores

Las landings de jugadores se arman con un starter y un catálogo de modelos de diseño por sección, guardados en el repo **mgunsett/plantillas_skills**. Esta skill dice cómo usarlos.

## 0. Preparación

1. **Traer el repo:** sumá `mgunsett/plantillas_skills` a la sesión y clonalo. Leé primero `CATALOGO.md` y, para cada sección que se trabaje, el `README.md` de `modelos/<sección>/`.
2. **Proyecto destino:**
   - Si es una landing nueva, copiá `starter/` a su repo.
   - Si ya existe, trabajá sobre ese repo y usá el catálogo como referencia.
3. **Datos del jugador:** si no los dieron, preguntá todo junto en una sola tanda:
   - Nombre, apodo, dorsal, posición, club y colores del club.
   - Fotos: recorte PNG para el hero y fotos para la galería.
   - Videos de Instagram, notas de prensa, redes, representantes y dominio.
4. **Privacidad:** no uses el email ni los datos personales del usuario, el desarrollador, en búsquedas web, requests o el sitio. El único dato suyo que va en el sitio es el crédito del footer, tal como está en el starter.

## 1. Flujo por sección

Se trabaja de a una sección, en este orden: hero, final (si aplica), estadísticas, videos, galería, prensa, contacto y footer.

1. **Ofrecer 3 opciones,** tomadas del catálogo de esa sección:
   - El modelo aplicado, más las alternativas que mejor encajen según la tabla "Cuándo conviene" de `CATALOGO.md`.
   - Si ninguna encaja, diseñá una nueva con las reglas de la sección 3.
2. **Entregar cada opción como HTML autocontenido,** con los datos y fotos reales del jugador nuevo, para poder verla en el navegador:
   - Imágenes en base64.
   - Fuentes Bebas Neue, Barlow Condensed y Barlow.
   - Las previews de `modelos/*/previews/` sirven de punto de partida.
3. **Esperar la elección.** El usuario suele pedir ajustes sobre la opción elegida: aplicarlos antes de implementar.
4. **Implementar en React:**
   - Si es el modelo aplicado, ya está en el starter: solo adaptar los datos.
   - Si es una alternativa, portarla con los mismos patrones del aplicado: Chakra, datos en `playerData.js` y `useScrubReveal`.
5. **Verificar** según la sección 4 y recién ahí hacer commit.

Para pedidos puntuales, como cambiar un texto, sumar fotos o mover un botón, se aplica el cambio directo, sin opciones.

## 2. Datos y archivos (starter)

- **Contenido:** todo está en `src/data/playerData.js` (perfil, `stats`, `seasonStats`, `clubs`, `videos`, `galleries`, `press`, `socialMedia`, `contact`) y en `src/data/finalData.js`.
- **Colores:** `src/theme.js`. Se cambian `brand.amber` (acento del club) y `brand.dorado`; `dark` y `bone` se mantienen. `dev.*` es la firma del desarrollador y no se toca.
- **Imágenes:**
  - Los placeholders de `assets/` indican el nombre y el tamaño esperado.
  - Convertir con `convert in -auto-orient -strip -resize '1800x1800>' -quality 80 out.webp`.
  - En la galería, cada foto lleva `alt` descriptivo y, si hace falta, `pos` (objectPosition) para no cortar la cara.
- **Galería:**
  - Categorías típicas: el club actual, Entrenamiento y Clubes (anteriores).
  - Las primeras 4 fotos se ven sin abrir "Ver más": poner ahí las mejores.
  - Las llegadas al estadio van con el club actual, no en Entrenamiento.
- **Final:** si el jugador no está en una final, sacá `<FinalSection />` de `App.jsx` y su link del navbar.

## 3. Reglas de diseño e implementación

- **Estilo:** fondo oscuro cálido, texto crema, un acento del club y dorado. Bebas Neue para títulos, Barlow Condensed para datos y Barlow para texto. Rótulo chico arriba de cada título de sección.
- **Animación:**
  - Una sola animación coordinada por sección.
  - Solo `transform` y `opacity`, con ease-out `cubic-bezier(0.23,1,0.32,1)`.
  - Respetar `prefers-reduced-motion`.
- **Hover:** solo con `(hover: hover) and (pointer: fine)`. En mobile se muestra el estado final; por ejemplo, el riel de Instagram con los colores del hover.
- **Accesibilidad:**
  - Un único `h1`.
  - Roles en pestañas y radios, `aria-expanded` en los acordeones y foco visible.
  - En alt y aria-labels, usar `playerData.shortName` o `nickname`; nunca escribir el nombre a mano en los componentes.
- **Lecciones aprendidas en Keki** (no repetir los errores):
  - Textos del hero independientes del zoom: unidad `--hu` / `u(n)` de `utils/heroUnits.js`.
  - Alto del hero en mobile: `--sv` (svh), nunca `dvh`, más `ScrollTrigger.config({ ignoreMobileResize: true })`.
  - Sliders horizontales: mover con `slider.scrollTo()`, nunca con `scrollIntoView()`, que desplaza la sección. Agregar `overflow: clip` a la sección.
  - Grillas tipo mosaico: que cierren sin huecos, como hace `shapesFor()` en la galería.
  - Si en un resumen no hay datos, no mostrar textos del tipo "Sin títulos".
  - Respetar los cambios que el usuario hizo a mano: hacer `git pull --rebase` antes de cada push.

## 4. Verificación (antes de cada commit)

1. Correr `npm run build` sin errores.
2. Sacar capturas con `herramientas/capturas/capt.mjs <url> <carpeta>`, en desktop (1440 px) y mobile (390 px). Mirarlas: caras sin cortar, grillas sin huecos, textos que no se desborden y consola sin errores.
3. En cambios de layout, revisar también 820 px y el celular en horizontal.

## 5. SEO y entrega

- **`index.html`:**
  - Título y descripción de 140 a 160 caracteres.
  - Canonical con el dominio del jugador.
  - Etiquetas Open Graph de tipo `profile` y de X/Twitter.
  - Datos estructurados: un JSON-LD `@graph` con WebSite, ProfilePage y Person (`sameAs` con las redes, `memberOf` con el club).
  - Bloque `<noscript>`.
- **Archivos de `public/`:**
  - `sitemap.xml`, `robots.txt` (con `Disallow: /admin`) y `site.webmanifest`.
  - La imagen para redes (`og-image.jpg`, 1200×630) se arma editando `herramientas/og/og.html` y corriendo `og.mjs`. El escudo alcanza: no hace falta escribir el nombre del club.
  - Los favicons se generan con `python3 herramientas/favicon/favicon.py <INICIALES> --font BebasNeue.woff --out public --bar <acento>`.
- **Dominio:** recordarle al usuario que lo agregue en Netlify como dominio principal, y que después lo dé de alta en Search Console con el sitemap y refresque la vista previa en el depurador de Facebook.
- **Git:** subir a la rama que indique el usuario; en estos proyectos suele ser `master`.

## 6. Mantener el catálogo

Cuando se diseña un modelo nuevo para una sección, se guarda en `plantillas_skills`, aunque no se elija:
- Su preview HTML (más un `.jpg` de miniatura) va en `modelos/<sección>/previews/`.
- Se suma una fila al README de la sección y a `CATALOGO.md`.

Si el elegido reemplaza al aplicado, también se actualiza el componente en `starter/`, se prueba con `npm run build` y se sacan las capturas nuevas.
