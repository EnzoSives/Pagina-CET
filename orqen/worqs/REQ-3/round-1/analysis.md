# REQ-3 — análisis (ronda 1)

- **Analista:** Enzo Sives
- **Ruta:** development
- **Carril:** direct
- **Motivo del carril:** Un solo archivo de contenido, unas 2 horas, riesgo bajo y sin cambio de contrato.
- **Issue:** SIS-2
- **Plan y tareas:** [fast-lane-plan.md](./fast-lane-plan.md) · [fast-lane-tasks.md](./fast-lane-tasks.md)
- **Estimación:** 2 h

## Resumen

El cliente pide unificar los textos de las fichas de deportes (/#/deporte/*): las descripciones de public/deportes.json tienen estructuras y rótulos distintos y deben seguir una estructura común sin cambiar los datos.

## Criterios de aceptación

- Dado cualquier deporte, cuando se abre /#/deporte/<deporte>, entonces la ficha muestra las secciones en el mismo orden (título con emoji, descripción breve, bloques por grupo con 🗓️ Horarios, 📍 Lugar, 👨‍🏫 Profesor/es y 💵 Cuota, 📝 Aclaraciones, 📞 Contacto) y con los mismos rótulos.
- Dado un deporte sin un dato (por ejemplo Arquería sin lugar), cuando se muestra la ficha, entonces esa sección no aparece y no hay textos de relleno.
- Dada cualquier ficha, cuando se compara con la versión anterior, entonces no cambió ningún dato (precios, horarios, profesores, teléfonos, direcciones).
- Dado npm run build, cuando se ejecuta, entonces termina sin errores y public/deportes.json sigue siendo un JSON válido.

## Plan (carril directo)

1. Definir la plantilla HTML común de la ficha (título, descripción, bloques por grupo con Horarios/Lugar/Profesor/es/Cuota, Aclaraciones, Contacto).
2. Reordenar la ficha de Fútbol y Arquería 3D con la plantilla, unificando rótulos.
3. Reordenar las fichas de Patín y Hockey con la plantilla, un bloque por categoría.
4. Reordenar la ficha de Ciclismo con la plantilla.
5. Verificar que no cambió ningún dato comparando textos antes y después y que el JSON es válido.
6. Ejecutar npm run build y revisar las páginas en el navegador.

## Decisiones del analista

- **¿Qué significa unificar?** → Estructura común para las fichas de deportes, solo cambio de contenido en public/deportes.json.
- **¿Cómo se tratan los datos que una ficha no tiene?** → Se omite la sección cuando no hay dato.
- **¿Se reescribe la redacción?** → No: solo se reordena y se unifican rótulos; los datos no cambian.
- **¿Alcance y lane?** → Fuera de alcance: textos fijos de DeportesPage.vue, tarjetas de la home y Running (pausado). Lane direct.

## Riesgos

- Al editar el HTML a mano se puede perder o alterar un dato; se mitiga comparando el texto antes y después.
- Hockey es largo y con muchas categorías, queda como lista de bloques.

