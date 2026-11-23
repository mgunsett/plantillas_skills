# Catálogo de modelos

✅ = aplicado en el starter (React). Las demás opciones son previews HTML para portar si se eligen.

Hay dos estilos:

- **Clásico (Keki / Ivan Colman):** opciones numeradas 1, 2, 3… Paleta del club sobre fondo oscuro cálido, Bebas Neue y Barlow.
- **Kit claro (Luis Ramos):** opciones C1, C2… Fondo blanco azulado, acento azul del club y rojo, tipografía Nippo. Datos en [`kits/claro/player.js`](kits/claro/). Cubre todas las secciones menos Prensa; ⚛ marca lo aplicado en Luis Ramos, con el componente React en `modelos/<sección>/react/`.
- **Kit neón (Héctor Fertoli):** opciones N1 a N4 en cada sección. Fondo casi negro, acento lima y magenta, tipografía Nippo. Los datos del jugador están en un solo archivo ([`kits/neon/player.js`](kits/neon/)), así que se regeneran para otro jugador con `herramientas/previews/empaquetar.mjs`. Las opciones con ⚛ tienen el componente React en `modelos/<sección>/react/`.

| Sección | Clásico | Kit neón | Kit claro | Carpeta |
|---|---|---|---|---|
| **Navbar** | (dentro del starter) | — | C1 Cápsula con dorsal · C2 Escudo al centro · C3 Riel lateral · C4 Zócalo de partido · ⚛ C5 Índice a pantalla completa | [00-navbar](modelos/00-navbar/) |
| **Hero** | ✅ Recorte + apellido gigante + scroll animado + MatchBox | N1 Dorsal gigante · N2 Split editorial · N3 Marquesina · ⚛ N4 Transmisión TV | C1 Split editorial · C2 Marquesina · C3 Transmisión TV · C4 Franjas del club · C5 Portada de revista · ⚛ C6 Split con ficha | [01-hero](modelos/01-hero/) |
| **MatchBox** (dentro del hero) | ✅ Pestaña lateral "Partidos" | ⚛ M1 Marcador de TV · ⚛ M2 Tarjeta con pestañas · ⚛ M3 Dos tickets (Polaco Fydriszewski) | — | [01-hero](modelos/01-hero/#matchbox-último-resultado-y-próximo-partido-diseñado-para-polaco-fydriszewski) |
| **Final / torneo** | ✅ "La Quinta": número gigante, cuenta regresiva, estrellas, camino a la final, galería | — | — | [02-final](modelos/02-final/) |
| **Estadísticas** | ✅ 1 Ficha de scouting · 2 Marcador · 3 Palmarés · 4 Anillos y tarjetas | N1 Marcador · N2 Ficha de scouting · ⚛ N3 Radar central · N4 Dossier | ⚛ C1 Marcador · C2 Ficha de scouting · C3 Radar central · C4 Dossier · C5 Odómetro | [03-estadisticas](modelos/03-estadisticas/) |
| **Videos** | 1 Programa · 2 Stories · 3 Temporadas · 4a Cards en foco · ✅ 4b Cards + riel de Instagram | N1 Programa · N2 Stories · ⚛ N3 Temporadas · N4 Paneles | C1 Programa · C2 Stories · ⚛ C3 Temporadas · C4 Paneles · C5 Mazo de reels | [04-videos](modelos/04-videos/) |
| **Galería** | ✅ 1 Pestañas y mosaico · 2 Álbumes · 3 Carriles | ⚛ N1 Mosaico con pestañas · N2 Carriles · N3 Álbum editorial · N4 Hoja de contactos | C1 Mosaico con pestañas · ⚛ C2 Carriles · C3 Álbum editorial · C4 Hoja de contactos | [05-galeria](modelos/05-galeria/) |
| **Prensa** | ✅ 1 Titulares · 2 Recortes · 3 Destacada · 4 Zócalo · 5 Pase a pase | N1 Titulares · N2 Recortes · ⚛ N3 Nota destacada · N4 Lo publicaron | — | [06-prensa](modelos/06-prensa/) |
| **Contacto** | 1 Directorio · 2 Cierre con foto · 3 ¿Para qué escribís? · ✅ 4 Tarjetas mejoradas | N1 Directorio · N2 Cierre con foto · N3 ¿Para qué escribís? · ⚛ N4 Tarjetas grandes | C1 Directorio · C2 Cierre con foto · C3 ¿Para qué escribís? · ⚛ C4 Tarjetas grandes | [07-contacto](modelos/07-contacto/) |
| **Footer** | ✅ 1 Pulido · 2 Con navegación · 3 Firma | N1 Pulido · N2 Con navegación · ⚛ N3 Firma · N4 Escudos | C1 Pulido · C2 Con navegación · ⚛ C3 Firma · C4 Escudos | [08-footer](modelos/08-footer/) |
| **Clubes** | (dentro de Estadísticas) | N1 Línea de tiempo · ⚛ N2 Grilla de escudos · N3 Planilla · N4 Árbol de pases | C1 Línea de tiempo · ⚛ C2 Grilla de escudos · C3 Planilla · C4 Escalera · C5 Pasaporte | [09-clubes](modelos/09-clubes/) |

## Cuándo conviene cada uno

| Si el jugador… | Probá |
|---|---|
| tiene datos de scouting y una carrera larga | Estadísticas 1 (Ficha) |
| se destaca por un número de la temporada | Estadísticas 2 (Marcador) |
| tiene muchos títulos o distinciones | Estadísticas 3 (Palmarés) |
| tiene carrera larga y pocos títulos | Estadísticas 4 (Anillos y tarjetas) o Marcador + tarjetas de clubes |
| tiene pocos videos largos | Videos 1 (Programa) |
| sube reels seguido | Videos 4b (riel) o 2 (Stories) |
| tiene videos de varios clubes | Videos 3 (Temporadas) |
| tiene muchas fotos por categoría | Galería 2 (Álbumes) |
| tiene pocas fotos | Galería 3 (Carriles) |
| tiene 3 o 4 notas de prensa | Prensa 2 (Recortes) |
| tiene una nota mucho más fuerte que el resto | Prensa 3 (Destacada) |
| tiene un representante distinto para cada tema | Contacto 3 (¿Para qué escribís?) |
| busca un cierre emotivo | Contacto 2 (Cierre con foto) o Footer 3 (Firma) |
| está jugando una final | Final |
| tiene una buena foto de cancha en alta (mejor horizontal) | Hero N4 (Transmisión TV) |
| tiene un recorte de espaldas con el dorsal | Hero N1 (Dorsal gigante) |
| busca contactos con clubes y marcas desde el inicio | Hero N2 (Split editorial) |
| quiere mostrar la temporada con efecto al scrollear | Estadísticas C5 (Odómetro) |
| tiene una carrera con muchos clubes y países | Clubes C5 (Pasaporte) o C2 (Grilla de escudos) |
| sube reels y la visita llega desde el celular | Videos C5 (Mazo de reels) |
| quiere el próximo partido bien visible | Hero N3 (Marquesina) o N4 |
| tiene atributos parejos y se quiere una imagen fuerte | Estadísticas N3 (Radar central) |
| juega a préstamo y el pase es de otro club | Clubes N4 (Árbol de pases) o N2 (Grilla de escudos) |
| tiene muchos clubes | Clubes N2 (Grilla) o N3 (Planilla) |
| tiene pocos reels pero de distintas temporadas | Videos N3 (Temporadas) |
| quiere algo cinematográfico con 3 o 4 videos | Videos N4 (Paneles) |
| tiene fotos verticales y horizontales mezcladas | Galería N4 (Hoja de contactos) |
| juega en un club con camiseta a bastones o franjas | Hero C4 (Franjas del club) |
| tiene un retrato de estudio fuerte y busca marca personal | Hero C5 (Portada de revista) |
| tiene un recorte festejando y quiere datos y partidos a la vista | Hero C6 (Split con ficha) |
| quiere que el hero ocupe toda la pantalla, sin barra | Navbar C5 (Índice a pantalla completa) o C3 (Riel lateral) |
| quiere el próximo partido siempre visible | Navbar C4 (Zócalo de partido) |
| tiene un escudo lindo y reconocible | Navbar C2 (Escudo al centro) |
| tiene notas en medios conocidos | Prensa N4 (Lo publicaron) |
| tiene representante y agencia de marketing | Contacto N4 (Tarjetas grandes) o N3 |
| tiene un apellido corto o con fuerza | Footer N3 (Firma) |

## Reglas de diseño comunes a todos los modelos

El kit neón cambia la paleta y la tipografía (ver [`kits/neon/README.md`](kits/neon/README.md)), pero sigue el resto de estas reglas.

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
