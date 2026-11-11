# Contacto

| # | Modelo | Estado | Preview |
|---|---|---|---|
| 1 | Directorio | Alternativa | [html](previews/opcion-1-directorio.html) · ![](previews/opcion-1-directorio.jpg) |
| 2 | Cierre con foto | Alternativa | [html](previews/opcion-2-cierre.html) · ![](previews/opcion-2-cierre.jpg) |
| 3 | ¿Para qué escribís? | Alternativa | [html](previews/opcion-3-motivo.html) · ![](previews/opcion-3-motivo.jpg) |
| 4 | **Tarjetas mejoradas** | ✅ Aplicado en Keki | [html](previews/opcion-4-tarjetas.html) · ![](previews/opcion-4-tarjetas.jpg) |
| 5 | Bandas | Alternativa | [html](previews/opcion-5-bandas.html) · ![](previews/opcion-5-bandas.jpg) |
| 6 | Mensaje listo | Alternativa | [html](previews/opcion-6-mensaje.html) · ![](previews/opcion-6-mensaje.jpg) |

Los datos están en `playerData.socialMedia` (redes) y `playerData.contact` (representantes, con `title`, `label`, `image`, `handle`, `forWhom`, `cta` y `url`).

## 4. Tarjetas mejoradas (aplicado)

**Archivo:** `src/components/Contact/ContactSection.jsx`. La sección mantiene `id="contact"`.

- **Redes:** cada red es una tarjeta con su ícono grande y transparente de fondo, el usuario y una flecha. Al pasar el mouse toma el color de la red.
- **Representación:** una tarjeta por representante con logo, rol (deportiva o marketing), usuario, el texto "Escribile por…" (`forWhom`) y un botón de acción (`cta`).

## Alternativas

- **1. Directorio:** un renglón por contacto con logo, nombre, "Escribile por" y botón, más un renglón "Seguilo" con las redes. Es el más claro cuando hay muchos contactos.
- **2. Cierre con foto:** a la izquierda, el recorte del jugador con el dorsal gigante en contorno detrás. A la derecha, "Hablemos" con las tarjetas de contacto. Sirve como cierre emotivo de la página.
- **3. ¿Para qué escribís?:** el visitante elige el motivo (propuesta deportiva, marcas, prensa, saludo) y la sección le muestra a quién escribirle. Es el modelo para cuando cada tema lo lleva una persona distinta.
- **5. Bandas:** cada contacto es una franja a todo el ancho con una palabra enorme (Representación, Marketing, Instagram, Transfermarkt), el detalle a la derecha y una flecha. Las redes van en contorno. Al pasar el mouse la franja se llena con el color del club y la palabra se corre. Es el más directo y tipográfico.
- **6. Mensaje listo:** el visitante elige el motivo (chips con `role="radio"`) y la sección le muestra un mensaje sugerido, con los datos a completar resaltados, a quién mandarlo y dos botones: "Copiar mensaje" (`navigator.clipboard`, con respaldo de selección) y "Abrir Instagram". Es el modelo para cuando los contactos son solo por mensaje directo de Instagram.
