# Videos

| # | Modelo | Estado | Preview |
|---|---|---|---|
| 1 | Programa | Alternativa (aplicado en Ivan Colman) | [html](previews/opcion-1-programa.html) · ![](previews/opcion-1-programa.jpg) |
| 2 | Stories | Alternativa | [html](previews/opcion-2-stories.html) · ![](previews/opcion-2-stories.jpg) |
| 3 | Temporadas | Alternativa | [html](previews/opcion-3-temporadas.html) · ![](previews/opcion-3-temporadas.jpg) |
| 4a | Cards en foco | Alternativa | [html](previews/opcion-4-cards.html) · ![](previews/opcion-4-cards.jpg) |
| 4b | **Cards + riel de Instagram** | ✅ Aplicado en Keki | [html](previews/opcion-4-riel.html) · ![](previews/opcion-4-riel.jpg) |

## 4b. Cards + riel de Instagram (aplicado)

**Archivos:** `src/components/Videos/VideosSection.jsx`, `VideoCard.jsx` e `InstagramRail.jsx`.

- **Slider:** las cards son reels verticales con portada y se reproducen dentro de la card. Hay flechas para avanzar.
- **Riel a la izquierda:** una columna del mismo alto que las cards, con el logo de Instagram y la palabra "Instagram" en vertical.
  - `useFitWord` ajusta la palabra al alto disponible. En mobile el espaciado entre letras tiene un tope (`MOBILE_MAX_SPACING`), y el usuario (`@...`, en dorado) completa el alto que sobra.
  - En mobile el riel muestra siempre los colores del hover, porque ahí no existe el hover.
  - Ancho del riel: 48 px en mobile, 64 px en tablet y 84 px en desktop.
- **Detalles técnicos:**
  - Las flechas usan `slider.scrollTo()`. Con `scrollIntoView()` se corría toda la sección hacia los costados.
  - La sección tiene `overflow: clip` (con `@supports`) para que nada se desborde.

## Alternativas

- **1. Programa:** un video principal grande que se reproduce en la página y, al lado, una lista "Más videos" para cambiarlo. Es el modelo para pocos videos largos (resúmenes de temporada).
  - Implementado en Ivan Colman (`VideosSection.jsx`, `VideoCard.jsx`, `videos.css`): todo el bloque entra en el alto visible. El alto de la pantalla sale de `svh` menos la navbar fija, el padding y el título; la ficha toma ese mismo alto y la lista scrollea por dentro solo si hay muchos videos.
  - Las variables con `clamp()` van en un `.css` aparte: en `sx` de Chakra algunas se descartaban.
- **2. Stories:** las cards se apilan como historias de Instagram, con flechas y puntos. Cada una tiene un botón "Ver reel". Es el más compacto.
- **3. Temporadas:** los videos se agrupan por año, con el año gigante en contorno y el club debajo. Es el modelo para una carrera con videos en varios clubes.
- **4a. Cards en foco:** las mismas cards que el aplicado, pero en alturas escalonadas. Al pasar el mouse o llegar con Tab, la card se agranda y muestra su detalle.

## Kit neón (diseñado para Héctor Fertoli)

Cuatro opciones más, en paleta oscura con acento lima y magenta y tipografía Nippo. Salen de [`kits/neon`](../../kits/neon/): los datos del jugador están en `player.js`, así que se pueden regenerar con otro jugador (ver el [README del kit](../../kits/neon/README.md)).

| # | Modelo | Estado | Preview |
|---|---|---|---|
| N1 | Programa | Alternativa | [html](previews/neon-1-programa.html) · ![](previews/neon-1-programa.jpg) |
| N2 | Stories | Alternativa | [html](previews/neon-2-stories.html) · ![](previews/neon-2-stories.jpg) |
| N3 | **Temporadas** | ✅ Aplicado en Héctor Fertoli | [html](previews/neon-3-temporadas.html) · ![](previews/neon-3-temporadas.jpg) |
| N4 | Paneles | Alternativa | [html](previews/neon-4-paneles.html) · ![](previews/neon-4-paneles.jpg) |

- **N1. Programa:** un reel grande y, al lado, título, club y la lista "Más videos" para cambiarlo. Versión neón de la opción 1.
- **N2. Stories:** los reels como historias de Instagram, con barras de progreso, usuario, botón "Ver reel" y círculos por club. Avanzan solos cada 6 segundos (se frenan con reducir movimiento).
- **N3. Temporadas (aplicado en Fertoli):** cada video bajo su año gigante en contorno (`'26`, `'25`…) con el escudo del club. El reel se abre en un modal de Instagram.
  - **React:** [`react/VideosTemporadas.jsx`](react/VideosTemporadas.jsx) (en el proyecto se llama `VideosSection.jsx`) y [`react/VideoCardNeon.jsx`](react/VideoCardNeon.jsx). Cada video necesita `year`, `club`, `clubLogo`, `league` y `cover` (o `thumbnail`), además del código del reel.
- **N4. Paneles:** paneles a todo el ancho; el activo se abre grande y a color y los otros quedan finos, en blanco y negro, con el club en vertical. Hover en desktop, toque en mobile (acordeón vertical).

## Kit claro (diseñado para Luis Ramos)

Opciones en paleta clara (blanco azulado, azul del club y rojo) con tipografía Nippo, desde [`kits/claro`](../../kits/claro/). Los datos salen de `kits/claro/player.js`.

| # | Modelo | Estado | Preview |
|---|---|---|---|
| C1 | Programa | Alternativa | [html](previews/claro-1-programa.html) · ![](previews/claro-1-programa.jpg) |
| C2 | Stories | Alternativa | [html](previews/claro-2-stories.html) · ![](previews/claro-2-stories.jpg) |
| C3 | **Temporadas** | ✅ Aplicado en Luis Ramos | [html](previews/claro-3-temporadas.html) · ![](previews/claro-3-temporadas.jpg) |
| C4 | Paneles | Alternativa | [html](previews/claro-4-paneles.html) · ![](previews/claro-4-paneles.jpg) |
| C5 | Mazo de reels | Alternativa | [html](previews/claro-5-mazo.html) · ![](previews/claro-5-mazo.jpg) |

- **C1. Programa:** Un reel grande y, al lado, título, club y la lista "Más videos" para cambiarlo. Ideal para 3 videos.
- **C2. Stories:** Los reels como historias de Instagram, con barras de progreso, avance automático y círculos por club.
- **C3. Temporadas (aplicado en Luis Ramos):** Cada video bajo su año gigante en contorno con el escudo del club: Alianza 26, América 25 y Selección 24.
  - **React:** [`react/VideosTemporadasClaro.jsx`](react/VideosTemporadasClaro.jsx).
- **C4. Paneles:** Paneles a todo el ancho: el activo se abre grande a color y los otros quedan finos en blanco y negro.
- **C5. Mazo de reels:** Los reels apilados como cartas verticales 9:16. Se arrastran con el mouse o se deslizan con el dedo para pasar al siguiente; al costado, el año gigante en contorno y el título cambian con la carta.

En React, cada video necesita `year`, `club` y `clubLogo` en `playerData.videos`.

## Kit azul (diseñado para Ronaldo Martínez)

Opciones en paleta oscura azul (fondo `#050B14`, azul Vélez `#4D93D6` y dorado `#D4A84B`) con tipografía Nippo, desde [`kits/azul`](../../kits/azul/). Los datos salen de `kits/azul/player.js`. En React se portaron con Bebas Neue, Barlow Condensed y Barlow, como el resto del starter.

| # | Modelo | Estado | Preview |
|---|---|---|---|
| A5 | **Destacado + reels** | ✅ Aplicado en Ronaldo Martínez | [html](previews/azul-5-destacado.html) · ![](previews/azul-5-destacado.jpg) |

- **A5. Destacado + reels (aplicado en Ronaldo Martínez):** un highlight grande de YouTube con panel de datos (club, goles y valoración de la temporada) y, debajo, 3 reels de Instagram en 9:16. En mobile los reels pasan a un carrusel con snap y puntos.
  - **React:** [`react/VideosDestacadoAzul.jsx`](react/VideosDestacadoAzul.jsx). El iframe de `youtube-nocookie` se carga recién al tocar play. Lee `videos` (el primero es el destacado: `title`, `url`, `club`, `crest`), `reels` (`title`, `club`, `cover`, `url`), `socialMedia` (Instagram) y `seasonStats`.
  - **Temporada:** `useSeasonStats` (API-Football vía Firestore) con respaldo en `playerData.seasonStats`; los rótulos se buscan sin acentos con `seasonTiles()`. Copiá [`03-estadisticas/react/useSeasonStats.js`](../03-estadisticas/react/useSeasonStats.js) a `src/hooks/` y [`seasonTiles.js`](../03-estadisticas/react/seasonTiles.js) a `src/lib/`. Si el proyecto no tiene la sincronización, el hook puede devolver `null` y se usan los valores fijos.
