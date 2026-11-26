# REQ-2 — plan del carril rápido (ronda 1)

**Mostrar las dos cámaras a la vez**

- **Analista:** Enzo Sives
- **Carril:** direct (carril rápido) — Cambio de UI y reproducción acotado a un solo componente (HomePerfil.vue), sin cambios de contrato ni datos, riesgo bajo, unas 3 horas.
- **Estimación:** 3 h
- **Tareas:** [fast-lane-tasks.md](./fast-lane-tasks.md)

## Qué cambia

El cliente pide que la sección Cámaras del perfil muestre las dos cámaras en vivo del complejo al mismo tiempo, en lugar de una por vez con navegación por flechas.
## Criterios de aceptación

- Dado un socio en desktop, cuando abre la pestaña Cámaras, entonces ve la Cámara 1 y la Cámara 2 lado a lado, ambas reproduciéndose.
- Dado un socio en mobile (ancho menor a 768px), cuando abre la pestaña Cámaras, entonces ve las dos cámaras apiladas una debajo de la otra.
- Dada la pestaña Cámaras, cuando se muestra, entonces no aparecen las flechas de navegación y cada video muestra su propio título.
- Dado que el stream de una cámara falla, cuando se abre la pestaña Cámaras, entonces esa tarjeta muestra el aviso "Cámara no disponible" y la otra cámara sigue reproduciéndose.
- Dado que las cámaras se están reproduciendo, cuando el socio cambia a otra pestaña, entonces se detienen ambos streams; y cuando vuelve a Cámaras, se reanudan.
## Plan

1. En HomePerfil.vue, reemplazar el selector con flechas y chip por una grilla (.camaras-grid) que renderiza una tarjeta con título y <video> por cada cámara: 2 columnas en desktop y 1 columna en mobile.
2. Refactorizar inicializarCamara para iniciar un HLS (o src nativo en Safari) por cada cámara, de forma independiente, guardando cada instancia en hlsInstances; eliminar camaraIndex, camaraActual y su watch.
3. Agregar un estado de error por cámara: ante un error HLS fatal o un error del video, mostrar "Cámara no disponible" en esa tarjeta sin afectar a la otra.
4. Agregar una función detenerCamaras que destruye todas las instancias HLS y limpia los src; llamarla al salir de la pestaña Cámaras y en onUnmounted, y reiniciar al volver a la pestaña.
5. Verificar con npm run build y revisar en el navegador en desktop y mobile los 5 criterios de aceptación.
## Decisiones

- **¿Cómo se disponen las dos cámaras?** → Lado a lado en desktop y apiladas en mobile (< 768px, mismo corte isMobile existente).
- **¿Se mantiene la navegación con flechas y el chip de cámara actual?** → No, se quitan; cada tarjeta muestra su título.
- **¿Ambas cámaras se reproducen automáticamente?** → Sí, ambas en autoplay muteadas como hoy; si el navegador bloquea el autoplay queda el play manual de cada video.
- **¿Qué se muestra si una cámara falla?** → Las cámaras son independientes: la que falla muestra "Cámara no disponible" en su tarjeta y la otra sigue funcionando.
- **¿Se detienen los streams al salir de la pestaña Cámaras?** → Sí, se destruyen las instancias HLS al salir de la pestaña y se reinician al volver.
## Capacidades afectadas

- perfil-camaras
## Riesgos

- Se duplica el consumo de datos en mobile al reproducir dos streams simultáneos.
- Algunos navegadores pueden bloquear el autoplay de dos videos; queda el play manual como alternativa.
- El servidor mistserver recibe el doble de conexiones por usuario.
