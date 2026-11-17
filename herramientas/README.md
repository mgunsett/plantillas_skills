# Herramientas

Instalación: `npm install` en esta carpeta. Hace falta Google Chrome; si no está en `/usr/bin/google-chrome`, indicá la ruta con la variable `CHROME`.

| Herramienta | Uso |
|---|---|
| `capturas/capt.mjs` | `node capturas/capt.mjs http://localhost:4173/ ./capturas-out [ids…]`. Captura cada sección en desktop y mobile y lista los errores de consola. |
| `og/og.html` + `og/og.mjs` | Plantilla de la imagen para redes (1200×630). El ejemplo es el de Keki: cambiá en `og.html` el recorte (base64), el escudo, el nombre, la posición y el dominio. Después, `node og/og.mjs og/og.html ../starter/public/og-image.jpg`. |
| `favicon/favicon.py` | `python3 favicon/favicon.py EP --font node_modules/@fontsource/bebas-neue/files/bebas-neue-latin-400-normal.woff --out ../starter/public --bar "#EF2D38"`. Necesita `pip install fonttools brotli`, `rsvg-convert` e ImageMagick. |
| `previews/empaquetar.mjs` | `node previews/empaquetar.mjs ../kits/neon [salida] [diseños…]`. Arma cada diseño del kit como HTML autocontenido (con las fotos que usa, fuentes, CSS y JS adentro) y saca su miniatura `.jpg`. Sin `salida`, escribe en `modelos/<sección>/previews/`. Si no hay Chrome en `/usr/bin/google-chrome`, usa `CHROME=<ruta>`. |
