# Navbar

## Modelo aplicado en el starter: 1 Barra completa

**Archivos del starter:** `src/components/UI/Navbar.jsx`, `MobileMenu.jsx`, `BrandLogo.jsx` y `src/hooks/useActiveSection.js`.

## Modelos

| # | Modelo | Preview | Qué tiene |
|---|---|---|---|
| 1 | ✅ Barra completa | [html](previews/opcion-1-barra.html) · [jpg](previews/opcion-1-barra.jpg) | Barra a todo el ancho, transparente sobre el hero y sólida con blur al scrollear. Píldora granate en la sección activa, CTA con contorno dorado y línea de progreso de lectura. En mobile, menú a pantalla completa con links numerados en Bebas, escudo del club e Instagram. |
| 2 | Píldora flotante | [html](previews/opcion-2-pildora.html) · [jpg](previews/opcion-2-pildora.jpg) | Cápsula centrada y despegada del borde que se compacta al bajar (`translateY` + `scale`). Píldora en el acento con texto oscuro y CTA sólido. En mobile muestra "#dorsal · club" y abre un desplegable debajo. |
| 3 | Barra con partido | [html](previews/opcion-3-partido.html) · [jpg](previews/opcion-3-partido.jpg) | Franja superior en el color del club con el próximo partido y el último resultado (de `useMatches`), que se esconde al scrollear. Subrayado deslizante en la sección activa. El menú mobile cierra con una tarjeta del próximo partido. |

**Combinación usada en Lisandro Alzugaray:** la cápsula de la opción 2 en desktop y mobile, con el menú a pantalla completa de la opción 1. En React: la cápsula es el `nav` y el menú va en un `Portal` con `z-index` menor, así la cápsula hace de cabecera del menú.

## Decisiones técnicas que conviene conservar
- **Sección activa:** `useActiveSection` observa la banda central del viewport (`rootMargin: -35% 0px -55% 0px`). La píldora se mueve con `layoutId` de Framer Motion.
- **Menú mobile:** va en un `Portal`, porque el `nav` tiene `transform` por la animación de entrada y eso rompe `position: fixed`. Mientras está abierto se frena Lenis (`__lenis.stop()`) y el `body`, y el contenedor lleva `data-lenis-prevent` para que scrollee solo. Antes de navegar hay que llamar a `__lenis.start()`: con Lenis frenado, `scrollTo` no hace nada.
- **Accesibilidad:** botón real con `aria-expanded` y `aria-controls`, `aria-current` en el link activo, cierre con Escape y al pasar a desktop.
- **Alto del menú:** `100svh` con `100vh` de respaldo, nunca `dvh`.
