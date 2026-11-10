# Prensa

| # | Modelo | Estado | Preview |
|---|---|---|---|
| 1 | **Titulares** | ✅ Aplicado en Keki | [html](previews/opcion-1-titulares.html) · ![](previews/opcion-1-titulares.jpg) |
| 2 | Recortes | Alternativa | [html](previews/opcion-2-recortes.html) · ![](previews/opcion-2-recortes.jpg) |
| 3 | Destacada | Alternativa | [html](previews/opcion-3-destacada.html) · ![](previews/opcion-3-destacada.jpg) |

Los datos están en `playerData.press`: `{ media, logo, type, title, date, url }`.

## 1. Titulares (aplicado)

**Archivo:** `src/components/Press/PressSection.jsx`. Un renglón por nota, que es un link entero, con el logo del medio, el tipo (Nota o Publicación), la fecha, el titular grande y una flecha. Al pasar el mouse el renglón se resalta. Es sobrio y se adapta a cualquier cantidad de notas.

## Alternativas

- **2. Recortes:** cada nota es un recorte de diario sobre papel crema, con cinta y borde dentado, levemente girado. Tiene mucha personalidad y funciona hasta con 3 o 4 notas.
- **3. Destacada:** la nota más fuerte va grande, con una foto en blanco y negro y la cita entre comillas. Las demás van en una columna al costado. Es el modelo para cuando hay una nota claramente mejor que el resto.
