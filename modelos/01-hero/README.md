# Hero

## Modelo aplicado: Hero con recorte y scroll animado

![desktop](capturas/hero-desktop.jpg)

**Archivos del starter:** `src/components/Hero/Hero.jsx` y `MatchBox.jsx`, `src/utils/heroUnits.js` y `src/hooks/useMatches.js`.

**Qué tiene**
- Apellido gigante en el acento y nombre en crema. Es el único `h1` de la página.
- Dorsal en contorno, posición, nacionalidad con bandera y club actual con escudo.
- Recorte PNG del jugador, de cuerpo entero, con `fetchpriority="high"` porque es la imagen principal de la página.
- Dos fotos de fondo. La segunda (`hero-bg2`) solo se ve en desktop, a la derecha.
- **MatchBox:** pestaña lateral "Partidos" con los próximos partidos. Los carga Firebase desde `/admin` y, si no está configurado, usa `matchData.js`.
- La sección mide `200svh` y su contenido queda fijo (`sticky`) mientras GSAP anima la salida con el scroll.

**Decisiones técnicas que conviene conservar**
- **Textos que no cambian con el zoom:** se usa la unidad `--hu`, basada en vw y calculada para 390, 820 y 1440 px de referencia, con la función `u(n)`. Así el hero se ve igual con el navegador al 80 % o al 125 %.
- **Alto estable en mobile:** `--sv` vale `1svh` (con `1vh` como respaldo). Antes se usaba `100dvh` y el hero cambiaba de tamaño al aparecer y desaparecer la barra del navegador.
  - `main.jsx` además configura `ScrollTrigger.config({ ignoreMobileResize: true })`.
  - La sección que se superpone después del hero usa `margin-top: -100svh`.
- **Celular horizontal:** `LANDSCAPE` cambia la referencia a `--sv` para que el hero entre en pantalla.

**Para adaptar**
- **Datos:** `name`, `fullName`, `number`, `position`, `nationality`, `nationalityFlag`, `currentClub`, `logoCurrentClub` e `image` en `playerData.js`.
- **Recorte:** cada recorte tiene otras proporciones. Hay que ajustar el `left`, el `h` y el `objectPosition` de la imagen del jugador y revisarlo en 390, 820 y 1440 px.

## Otros modelos (previews)

| # | Modelo | Preview | Qué tiene |
|---|---|---|---|
| 1 | Recorte + apellido gigante (pulido) | [html](previews/opcion-1-recorte.html) · [jpg](previews/opcion-1-recorte.jpg) | Versión del aplicado: apellido enorme detrás del recorte, nombre arriba, dorsal y datos abajo a la izquierda, próximo partido abajo a la derecha. |
| 2 | Ficha editorial | [html](previews/opcion-2-ficha.html) · [jpg](previews/opcion-2-ficha.jpg) | Nombre en dos líneas con chips de títulos, edad/altura/pie/país y dos CTA. Recorte sobre un panel en el color del club con el dorsal. Cinta de escudos de la trayectoria al pie. Conviene si tiene títulos importantes. |
| 3 | Cinemático | [html](previews/opcion-3-cine.html) · [jpg](previews/opcion-3-cine.jpg) | Foto de detalle a pantalla completa (espejada), nombre grande abajo a la izquierda y barra con último resultado y próximo partido (de `/admin`). En desktop, foto de espaldas con el dorsal en B/N detrás del nombre. Conviene si hay una foto fuerte que no sea un recorte. |

**Aplicado en Lisandro Alzugaray:** el 3. Lecciones:
- Con GSAP, no espejar la foto con `transform` en CSS: GSAP lee `scaleX(-1)` como una rotación de 180° y la foto aparece dada vuelta. Dejar el espejado en el tween (`scaleX: -1, rotation: 0`).
- No animar con GSAP el contenedor de un elemento `position: absolute`: el `transform` lo convierte en el bloque de referencia. Usar el contenedor posicionado para la entrada y el hijo para la salida con el scroll.
- Si `/admin` no tiene partidos, la barra no se muestra: nada de partidos de ejemplo en `defaultMatches`.
