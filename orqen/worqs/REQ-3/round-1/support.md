# REQ-3 — soporte (ronda 1)

- **Soporte:** Enzo Sives
- **Resultado:** escalate

## Resumen

El cliente pide unificar los textos de las páginas de deportes; el pedido llegó solo con el título y sin descripción.

## Revisado

* El pedido REQ-3 y sus comentarios (sin descripción ni respuestas del cliente)
* src/pages/DeportesPage.vue (textos fijos de la página)
* public/deportes.json (descripciones HTML por deporte, con formatos distintos entre sí)
* openspec/specs/ (no hay specs que describan este comportamiento)
* Búsqueda de pedidos similares con orqen search (falló por un error de consulta JQL)

## Respuesta al cliente

Recibimos tu pedido de unificar los textos de las páginas de deportes. Lo vamos a revisar para definir el alcance y, si necesitamos más detalle sobre qué textos querés unificar, te consultamos por acá.

## Escalamiento

El pedido llegó solo con el título "Unificar textos en las páginas de deportes" y sin descripción. Hoy la página DeportesPage.vue mezcla textos fijos con descripciones HTML por deporte en public/deportes.json, y esas descripciones tienen formatos distintos entre sí (por ejemplo Fútbol usa "Horarios / Lugar / Prof" y Arquería 3D usa "Clases disponibles / Profesor", con distintos encabezados y emojis). Falta definir el alcance: qué textos hay que unificar, cuál es el formato de referencia y si incluye las tarjetas de la home. Requiere un analista por ser un cambio de código y contenido.
