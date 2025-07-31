// src/components/ChatBotComponent.vue
<template>
  <div></div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';

// Declaramos la función para que TypeScript la reconozca.
declare function bmHide(): void;

onMounted(() => {
  // Opcional: previene que el script se agregue más de una vez
  if (document.querySelector('script[src*="go.botmaker.com"]')) {
    return;
  }

  const js = document.createElement('script');
  js.type = 'text/javascript';
  js.async = true;
  js.src = 'https://go.botmaker.com/rest/webchat/p/0ULI4UUP6H/init.js';

  // ✅ La clave está aquí:
  js.onload = () => {
    // Apenas el script termina de cargar, ocultamos el widget del chat.
    // De esta forma, el logo no será visible por defecto.
    if (typeof bmHide === 'function') {
      bmHide();
    }
  };

  document.body.appendChild(js);
});
</script>
