# Clubes (trayectoria)

En Keki los clubes van dentro de Estadísticas (renglones que se abren, ver [`03-estadisticas`](../03-estadisticas/)) y en Ivan Colman como tarjetas horizontales (Estadísticas opción 4). Esta carpeta junta los modelos de trayectoria como **sección propia**, todos del kit neón (diseñados para Héctor Fertoli).

| # | Modelo | Estado | Preview |
|---|---|---|---|
| N1 | Línea de tiempo | Alternativa | [html](previews/neon-1-linea.html) · ![](previews/neon-1-linea.jpg) |
| N2 | **Grilla de escudos** | ✅ Aplicado en Héctor Fertoli | [html](previews/neon-2-grilla.html) · ![](previews/neon-2-grilla.jpg) |
| N3 | Planilla | Alternativa | [html](previews/neon-3-planilla.html) · ![](previews/neon-3-planilla.jpg) |
| N4 | Árbol de pases | Alternativa | [html](previews/neon-4-arbol.html) · ![](previews/neon-4-arbol.jpg) |

Los datos salen de `clubs` en `kits/neon/player.js` (del más reciente al más antiguo): `n` nombre, `c` país, `y` años, `y0` año de llegada, `l` escudo, `t` títulos, `i` vínculo (`'Préstamo'`, `'Pase'` o vacío), `cur` club actual y `own` dueño del pase.

## N2. Grilla de escudos (aplicado en Fertoli)

**React:** [`react/ClubsGrid.jsx`](react/ClubsGrid.jsx). En el proyecto se monta dentro de `StatsSection.jsx` con `CLUBS_DESIGN = 'grilla'` y lee `playerData.clubs` (`name`, `country`, `years`, `logo`, `titles`, `info`).

- Una baldosa por club, del actual al más antiguo, con el escudo, los años, el país y el vínculo arriba a la derecha.
- De fondo, el **escudo completo en escala de grises y tenue** (no una silueta ni el año: así lo pidió el usuario). En la baldosa del club actual, que va en el acento, el escudo de fondo va oscuro.
- La última baldosa resume clubes, países y títulos ("Título" en singular si hay uno).
- Hover solo con mouse: la baldosa se ilumina y el escudo crece. 4 columnas en desktop, 2 en tablet y mobile.

## Alternativas

- **N1. Línea de tiempo:** los clubes del más antiguo al actual sobre una línea que se ilumina hacia el presente. Cada parada con escudo, años, país y una etiqueta (Actual, Dueño del pase, Préstamo o Pase); los títulos con estrella. En mobile la línea pasa a vertical.
- **N3. Planilla:** una tabla tipo ficha de transferencias: temporada, club, país, vínculo y títulos. El club actual marcado con una barra del acento. En mobile, renglones compactos con escudo, club y vínculo.
- **N4. Árbol de pases:** explica por qué un jugador figura en un club y juega en otro: los inicios a la izquierda, el club **dueño del pase** en el centro (con borde magenta) y, desde ahí, los préstamos hasta el club actual. Líneas continuas para pases y punteadas para préstamos. Necesita un club con `own: true`.
