# Kit claro

Previews de Navbar y Hero armadas para el rediseño de **Luis Ramos**, convertidas en plantillas: todo lo que es del jugador está en `player.js`.

- **Estilo:** fondo blanco azulado (`#F4F6FB`), acento del club (`--acc`, azul marino `#17285A`), segundo acento (`--acc2`, rojo `#E23744`) y tipografía Nippo. Para otro club se cambian `--acc`, `--acc2` y, si hace falta, `--deep` en `base.css`.
- **Secciones:** Navbar (5 opciones) y Hero (6 opciones). Las demás secciones se pueden sumar con la misma estructura.
- **Comparador:** `index.html` muestra cada opción en desktop 1440 y mobile 390 y, en los navbar, también con el menú abierto.

## Archivos

| Archivo | Qué es |
|---|---|
| `player.js` | Datos del jugador: identidad, club, temporada, partidos de ejemplo, contactos, links del menú y fotos. |
| `navbar-<n>-<nombre>.html` | Una preview por navbar. Usan `demo.js` (hero y secciones de relleno) y `navkit.js` (links, sección activa, scroll y `#open`). |
| `hero-<n>-<nombre>.html` | Una preview por hero, con un navbar neutro de referencia. |
| `base.css`, `kit.js`, `bind.js` | Colores y estilos comunes, crédito de desarrollo y reemplazo de `{{campo}}` (igual que el kit neón). |
| `img/` | Fotos del ejemplo con nombres genéricos: `recorte-frente`, `recorte-pelota`, `recorte-festejo`, `hero-ancho`, `retrato`, `escudo-actual` y `bandera`. |

## Fotos que pide cada hero

- **Hero 1 (Split editorial):** recorte con la pelota (`photos.heroBall`).
- **Hero 2 (Marquesina) y 4 (Franjas):** recorte de frente (`photos.heroFront`).
- **Hero 3 (Transmisión TV):** foto de cancha en alta (`photos.heroWide`).
- **Hero 5 (Portada):** retrato vertical de estudio (`photos.portrait`).
- **Hero 6 (Split con ficha):** recorte con los brazos abiertos o festejando (`photos.heroCelebrate`). Que llegue cortado abajo (por los muslos) está bien: apoya en el borde inferior.

El Navbar 5 usa `photos.portrait` en el menú y los navbar usan `photos.heroWide` en el hero de relleno.

## Usarlo para otro jugador

```bash
cp -r kits/claro kits/<jugador>          # o trabajar en una copia fuera del repo
# reemplazar img/ y editar player.js
cd herramientas
node previews/empaquetar.mjs ../kits/<jugador> ./salida     # previews autocontenidas para mostrar
```

Para publicar el comparador, copiá `index.html` a la salida, reemplazá `{{full}}` por el nombre, sacá las dos últimas etiquetas `<script>` y sumá `fonts/Nippo-Bold.woff2`.
