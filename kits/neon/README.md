# Kit neón

32 previews de diseño (4 por sección) armadas para el rediseño de **Héctor Fertoli**, convertidas en plantillas: todo lo que es del jugador está en un solo archivo, `player.js`.

- **Estilo:** fondo casi negro (`#0C0E0A`), acento lima (`#B4F32A`), segundo acento magenta (`#FF2E9A`) y tipografía Nippo en todos los pesos (`fonts/`). Los colores están en `base.css` (`--lime`, `--mag`, `--bg`…): cambiándolos se adapta a los colores de otro club.
- **Secciones:** Hero, Estadísticas, Clubes, Videos, Galería, Prensa, Contacto y Footer.
- **Comparador:** `index.html` muestra cada opción en desktop 1440 y mobile 390, con su descripción. Es el mismo formato que se usó para que el usuario eligiera.

## Archivos

| Archivo | Qué es |
|---|---|
| `player.js` | **Datos del jugador:** nombre, dorsal, posición, club, temporada, atributos, clubes, videos, galería, prensa y contacto. Es lo único que se edita. |
| `<sección>-<n>-<nombre>.html` | Una preview por diseño. Los textos usan `{{campo}}` (por ejemplo `{{last}}`, `{{s.pj}}`, `{{photos.heroWide}}`) y las listas se arman desde `player.js`. |
| `base.css` | Variables de color, fuentes, navbar de ejemplo y estilos comunes de sección. |
| `kit.js` | Íconos, crédito de desarrollo (logo de Sportfolio) y estilos del footer. No es del jugador: no se toca. |
| `bind.js` | Reemplaza los `{{campo}}` al abrir los HTML sueltos. |
| `lb.js` | Visor de fotos a pantalla completa que usan las galerías. |
| `img/` | Fotos y escudos del ejemplo. Los nombres genéricos (`hero-ancho`, `recorte-espalda`, `escudo-actual`, `bandera`…) son los que espera `player.js`. |

## Usarlo para otro jugador

1. Copiá la carpeta: `cp -r kits/neon kits/<jugador>`.
2. Reemplazá las fotos de `img/` y editá `player.js`. Las fotos que pide cada hero:
   - **Hero 1:** recorte de espaldas donde se lea el dorsal (`photos.heroBack`).
   - **Hero 2 y 3:** recortes con fondo transparente (`photos.heroBall`, `photos.heroFront`).
   - **Hero 4:** foto de cancha en alta, idealmente horizontal (`photos.heroWide`).
3. Abrí `index.html` para ver todo en el comparador.
4. Generá las previews autocontenidas para mandar o publicar:
   ```bash
   cd herramientas
   node previews/empaquetar.mjs ../kits/<jugador> ./salida            # todas
   node previews/empaquetar.mjs ../kits/<jugador> ./salida hero-4-transmision   # una sola
   ```
   Cada HTML lleva adentro las fotos que usa, las fuentes, el CSS y el JS, y se abre con doble clic. Al lado deja una miniatura `.jpg`.

Sin `./salida`, el script escribe en el catálogo: `modelos/<sección>/previews/<kit>-<n>-<nombre>.html`. Así se regeneran las previews `neon-*` después de tocar el kit.

## Campos de `player.js` que más se usan

- **Identidad:** `first`, `last`, `full`, `initials`, `number` / `number2` (`'8'` / `'08'`), `position`, `nationality`, `natCode`, `flag`.
- **Club:** `club`, `clubFull`, `clubCountryCode`, `crest`, `loanFrom` (vacío si no está a préstamo), `league`.
- **Ficha:** `foot`, `age`, `birthDate`, `height`, `weight`, `birthPlace`, `birthPlaceShort`.
- **Temporada:** `season` es una lista `{ k, l, v }`; la primera es el número destacado del Marcador y la que tiene `hl: true` va en magenta. En los textos se usa `{{s.<clave>}}` (por ejemplo `{{s.pj}}`).
- **Atributos:** `attrs` con 6 pares `[nombre, valor]` para que el radar cierre en hexágono. La media se calcula sola.
- **Partidos:** `lastMatch` y `nextMatch` (Hero 3 y 4). En React salen del panel `/admin`.
- **Textos sueltos:** `bio` (Hero 2), `statsHook` (Estadísticas 1), `zoneText` (Estadísticas 2, admite HTML) y `dossierLead` (Estadísticas 4).

## Pasarlo a React

Las opciones que se eligieron en Fertoli ya están en React, en `modelos/<sección>/react/`. Para las demás, portar con los mismos patrones: Chakra, datos en `playerData.js`, GSAP + ScrollTrigger para la entrada y los colores del tema (`brand.amber` es el acento, `brand.dorado` el segundo acento).
