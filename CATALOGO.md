# Catálogo de modelos

✅ = aplicado en el starter (React). Las demás opciones son previews HTML para portar si se eligen.

| Sección | Modelos | Carpeta |
|---|---|---|
| **Navbar** | ✅ 1 Barra completa · 2 Píldora flotante · 3 Barra con partido | [00-navbar](modelos/00-navbar/) |
| **Hero** | ✅ Recorte + apellido gigante + scroll animado + MatchBox · 2 Ficha editorial · 3 Cinemático | [01-hero](modelos/01-hero/) |
| **Final / torneo** | ✅ "La Quinta": número gigante, cuenta regresiva, estrellas, camino a la final, galería | [02-final](modelos/02-final/) |
| **Estadísticas** | ✅ 1 Ficha de scouting · 2 Marcador · 3 Palmarés · 4 Recorrido | [03-estadisticas](modelos/03-estadisticas/) |
| **Videos** | 1 Programa · 2 Stories · 3 Temporadas · 4a Cards en foco · ✅ 4b Cards + riel de Instagram | [04-videos](modelos/04-videos/) |
| **Galería** | ✅ 1 Pestañas y mosaico · 2 Álbumes · 3 Carriles | [05-galeria](modelos/05-galeria/) |
| **Prensa** | ✅ 1 Titulares · 2 Recortes · 3 Destacada · 4 Cronología · 5 Citas | [06-prensa](modelos/06-prensa/) |
| **Contacto** | 1 Directorio · 2 Cierre con foto · 3 ¿Para qué escribís? · ✅ 4 Tarjetas mejoradas | [07-contacto](modelos/07-contacto/) |
| **Footer** | ✅ 1 Pulido · 2 Con navegación · 3 Firma | [08-footer](modelos/08-footer/) |

## Cuándo conviene cada uno

| Si el jugador… | Probá |
|---|---|
| tiene datos de scouting y una carrera larga | Estadísticas 1 (Ficha) |
| se destaca por un número de la temporada | Estadísticas 2 (Marcador) |
| tiene muchos títulos o distinciones | Estadísticas 3 (Palmarés) |
| pasó por muchos clubes y países | Estadísticas 4 (Recorrido), sola o debajo de la Ficha |
| tiene pocos videos largos | Videos 1 (Programa) |
| sube reels seguido | Videos 4b (riel) o 2 (Stories) |
| tiene videos de varios clubes | Videos 3 (Temporadas) |
| tiene muchas fotos por categoría | Galería 2 (Álbumes) |
| tiene pocas fotos | Galería 3 (Carriles) |
| tiene 3 o 4 notas de prensa | Prensa 2 (Recortes) |
| tiene una nota mucho más fuerte que el resto | Prensa 3 (Destacada) |
| tiene menciones repartidas en una temporada o en varios clubes | Prensa 4 (Cronología) |
| tiene pocos titulares cortos y con impacto | Prensa 5 (Citas) |
| tiene un representante distinto para cada tema | Contacto 3 (¿Para qué escribís?) |
| busca un cierre emotivo | Contacto 2 (Cierre con foto) o Footer 3 (Firma) |
| está jugando una final | Final |
| tiene muchos títulos para destacar de entrada | Hero 2 (Ficha editorial) |
| tiene una foto de detalle fuerte, no un recorte | Hero 3 (Cinemático) |
| juega seguido y quiere mostrar el próximo partido | Navbar 3 (Barra con partido) |
| tiene un hero muy cargado y conviene un navbar liviano | Navbar 2 (Píldora flotante) |

## Reglas de diseño comunes a todos los modelos

- **Fondo y texto:** fondo oscuro cálido (`brand.dark`), texto crema (`brand.bone`) y gris cálido para lo secundario. Un acento del club (`brand.amber`) y un dorado (`brand.dorado`).
- **Tipografía:**
  - Títulos de sección en Bebas Neue grande, con un rótulo chico en Barlow Condensed arriba (por ejemplo, TEMPORADAS sobre ESTADÍSTICAS).
  - Barlow Condensed para datos y rótulos; Barlow para el texto corrido.
- **Animación:**
  - Una sola animación coordinada por sección, con `useScrubReveal` o GSAP.
  - Solo `transform` y `opacity`, con la curva ease-out `cubic-bezier(0.23,1,0.32,1)`.
  - Respetar `prefers-reduced-motion`.
- **Hover:** solo en dispositivos que lo tienen, con `(hover: hover) and (pointer: fine)`. En mobile, mostrar el estado final directamente.
- **Accesibilidad:**
  - `role` correcto en pestañas y radios, `aria-expanded` en los acordeones y foco visible con el acento.
  - Un único `h1` (en el hero).
  - Un `alt` descriptivo en cada foto.
- **Imágenes:** WebP con un máximo de 1800 px y calidad 80, `loading="lazy"` salvo en el hero y `objectPosition` por foto.
- **Responsive:** revisar siempre en 390, 820 y 1440 px, y con el celular en horizontal.
