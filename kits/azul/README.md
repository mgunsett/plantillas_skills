# Kit azul

Previews de diseño armadas para el rediseño de **Ronaldo Martínez** (Vélez Sarsfield), sobre la base del [kit neón](../neon/) pasada a una paleta oscura azul. Todo lo que es del jugador está en `player.js`.

- **Estilo:** fondo azul casi negro (`--bg: #050b14`), acento azul Vélez (`--lime: #4d93d6`), segundo acento dorado (`--mag: #d4a84b`) y tipografía Nippo. Las variables conservan los nombres del kit neón para que los diseños sean intercambiables: cambiándolas en `base.css` se adapta a otro club.
- **Secciones:** Hero, Estadísticas, Clubes, Videos, Galería, Prensa, Contacto y Footer (los mismos N1 a N4 del kit neón, recoloreados) más los modelos nuevos que se diseñaron para Ronaldo.
- **Comparador:** `index.html` muestra cada opción en desktop 1440 y mobile 390, con su descripción y un botón para marcar la elegida en cada sección.

## Modelos nuevos de este kit

| Sección | Archivo | Modelo | En Ronaldo |
|---|---|---|---|
| Hero | `hero-5-split-ficha.html` | Split con ficha (el C6 claro en oscuro) | ✅ elegido |
| Estadísticas | `stats-4-dossier.html` | Dossier con la valoración en un anillo de carga | ✅ elegido |
| Clubes | `clubes-5-carrera.html` | Carrera en el tiempo: barras sobre el eje de años | |
| Clubes | `clubes-6-vitrina.html` | Vitrina: lista de clubes y ficha que cambia | |
| Videos | `videos-5-destacado.html` | Highlight grande + 3 reels de Instagram | ✅ elegido |
| Galería | `galeria-5-revelado.html` | Revelado: mosaico con apertura FLIP (`flip-lb.js`) | |
| Galería | `galeria-6-capitulos.html` | Capítulos: índice fijo y un carril por etapa | |
| Prensa | `prensa-5-cronologia.html` | Cronología: notas sobre una línea que se dibuja | |
| Prensa | `prensa-6-portada.html` | En portada: una nota por vez con avance automático | ✅ elegido |

También se eligieron `clubes-2-grilla`, `contacto-1-directorio` y `footer-3-firma` (con la firma `ronaldo77`). Los componentes React de todo lo elegido están en `modelos/<sección>/react/*Azul.jsx`, con su nota en el README de cada sección.

## Archivos

Igual que el kit neón: `player.js` (datos), `<sección>-<n>-<nombre>.html` (un diseño por archivo, con `{{campo}}`), `base.css`, `kit.js` (crédito de Sportfolio, no se toca), `bind.js`, `lb.js` y `flip-lb.js` (visores de fotos) e `img/`.

## Usarlo para otro jugador

1. `cp -r kits/azul kits/<jugador>`, reemplazá las fotos de `img/` y editá `player.js`.
2. Ajustá los colores en `base.css`.
3. Abrí `index.html` para ver el comparador.
4. Previews autocontenidas: desde `herramientas/`, `node previews/empaquetar.mjs ../kits/<jugador> ./salida`.
