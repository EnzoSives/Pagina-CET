# REQ-2 — tareas del carril rápido

Marcá cada tarea al terminarla (`- [x]`).

## Tareas

- [ ] 1. En HomePerfil.vue, reemplazar el selector con flechas y chip por una grilla (.camaras-grid) que renderiza una tarjeta con título y <video> por cada cámara: 2 columnas en desktop y 1 columna en mobile.
- [ ] 2. Refactorizar inicializarCamara para iniciar un HLS (o src nativo en Safari) por cada cámara, de forma independiente, guardando cada instancia en hlsInstances; eliminar camaraIndex, camaraActual y su watch.
- [ ] 3. Agregar un estado de error por cámara: ante un error HLS fatal o un error del video, mostrar "Cámara no disponible" en esa tarjeta sin afectar a la otra.
- [ ] 4. Agregar una función detenerCamaras que destruye todas las instancias HLS y limpia los src; llamarla al salir de la pestaña Cámaras y en onUnmounted, y reiniciar al volver a la pestaña.
- [ ] 5. Verificar con npm run build y revisar en el navegador en desktop y mobile los 5 criterios de aceptación.
