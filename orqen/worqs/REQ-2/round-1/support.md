# REQ-2 — soporte (ronda 1)

- **Soporte:** Enzo Sives
- **Resultado:** escalate

## Resumen

El cliente pide que la sección de Cámaras muestre las dos cámaras en vivo al mismo tiempo, en lugar de una por vez.

## Revisado

* Ticket REQ-2 y sus comentarios
* src/pages/HomePerfil.vue: pestaña Cámaras muestra una cámara por vez (camaraIndex + flechas), dos streams HLS (cet-col1, cet-col3); existe estilo .camaras-grid sin usar
* openspec/specs/: no hay especificaciones documentadas
* No se encontraron pedidos similares

## Respuesta al cliente

Hola, gracias por el pedido. Confirmamos que hoy la sección de Cámaras muestra una cámara por vez y se alterna entre ellas con las flechas. Derivamos tu solicitud para mostrar ambas cámaras simultáneamente al equipo de análisis, que la va a evaluar. Te vamos a mantener al tanto por este mismo ticket.

## Escalamiento

Pedido de funcionalidad: mostrar las dos cámaras en vivo a la vez en la pestaña "Cámaras" de HomePerfil.vue. Hoy se muestra una por vez (camaraIndex + flechas) y hay dos streams HLS en mistserver.telpin.com.ar (cet-col1, cet-col3). Existe un estilo .camaras-grid sin usar. Falta definir: la disposición en desktop y en mobile (lado a lado o apiladas), si se mantiene la navegación con flechas, y el impacto de reproducir dos streams HLS a la vez (ancho de banda y autoplay en mobile). Necesita analista porque cambia la UI y el comportamiento de reproducción. Riesgo bajo, parece que solo toca un componente, y no se indicó urgencia.
