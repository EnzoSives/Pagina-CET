<script lang="ts" setup>
import { onMounted } from 'vue'
import '@n8n/chat/style.css'
import { createChat } from '@n8n/chat'

onMounted(() => {
  createChat({
    webhookUrl: 'https://n8n.telpin.com.ar/webhook/a889d2ae-2159-402f-b326-5f61e90f602e/chat',
    mode: 'fullscreen',
    showWelcomeScreen: true,
    initialMessages: ['Mi nombre es COCO. Como puedo ayudarte?'],
    i18n: {
      en: {
        title: '¡Hola!👋 Bienvenido/a al asistente virtual del CET.',
        subtitle: 'Estoy aquí para ayudarte con todas tus consultas sobre nuestra institución, las actividades que organizamos y el reglamento de Hockey de la AAMH 2025. No dudes en preguntarme lo que necesites.',
        footer: 'CET-2025 ',
        getStarted: 'Nueva conversacion',
        inputPlaceholder: 'Escribe tu pregunta..',
        closeButtonTooltip: 'Cerrar chat',
      },
    },
  })
})
</script>

<template>
  <div class="chat-wrapper">
    <div id="n8n-chat" class="chat-container"></div>
  </div>
</template>

<style>
/* Estilos base para el contenedor del chat en escritorio */
.chat-wrapper {
  padding-top: 40px;
  margin: 30px;

}

.chat-container {
  display: flex;
  justify-content: center;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;

}

/* Variables CSS para la apariencia del chat */
:root {
  --chat--color-primary: #e65100;
  --chat--color-primary-shade-50: rgb(219, 92, 64);
  --chat--color-primary-shade-100: rgb(207, 60, 60);
  --chat--color-secondary: #e65100;
  --chat--color-secondary-shade-50: rgb(160, 81, 28);
  --chat--color-white: #ffffff;
  --chat--color-light: #f2f4f8;
  --chat--color-light-shade-50: #e6e9f1;
  --chat--color-light-shade-100: #c2c5cc;
  --chat--color-medium: #d2d4d9;
  --chat--color-dark: #1976d2;
  --chat--color-disabled: #777980;
  --chat--color-typing: #404040;

  --chat--spacing: 1rem;
  --chat--border-radius: 0.25rem;
  --chat--transition-duration: 0.15s;

  --chat--window--width: 400px;
  --chat--window--height: 600px;

  --chat--header-height: auto;
  --chat--header--padding: var(--chat--spacing);
  --chat--header--background: var(--chat--color-dark);
  --chat--header--color: var(--chat--color-light);
  --chat--header--border-top: none;
  --chat--header--border-bottom: none;
  --chat--heading--font-size: 2em;
  --chat--subtitle--font-size: 1.3em;
  --chat--subtitle--line-height: 1.8;

  --chat--textarea--height: 50px;

  --chat--message--font-size: 1rem;
  --chat--message--padding: var(--chat--spacing);
  --chat--message--border-radius: var(--chat--border-radius);
  --chat--message-line-height: 1.8;
  --chat--message--bot--background: var(--chat--color-white);
  --chat--message--bot--color: var(--chat--color-typing);
  --chat--message--bot--border: none;
  --chat--message--user--background: var(--chat--color-secondary);
  --chat--message--user--color: var(--chat--color-white);
  --chat--message--user--border: none;
  --chat--message--pre--background: rgba(0, 0, 0, 0.05);

  --chat--toggle--background: var(--chat--color-primary);
  --chat--toggle--hover--background: var(--chat--color-primary-shade-50);
  --chat--toggle--active--background: var(--chat--color-primary-shade-100);
  --chat--toggle--color: var(--chat--color-white);
  --chat--toggle--size: 64px;
}


/* 📱 ESTILOS PARA MÓVILES (PANTALLAS DE 600PX O MENOS) */
@media (max-width: 600px) {
  /* Hacemos que el contenedor ocupe toda la pantalla */
  .chat-wrapper {
    margin: 0;
    padding: 0;

  }

  /* Quitamos bordes y sombras para una apariencia nativa */
  .chat-container {
    border: none;
    border-radius: 0;
    box-shadow: none;

  }

  /* Ajustamos las variables del chat para que se adapten */
  :root {
    /* El chat debe ocupar el 100% del ancho, no 400px */
    --chat--window--width: 100%;

    /* Reducimos el tamaño de las fuentes para que no se vean gigantes */
    --chat--heading--font-size: 1.2em;
    --chat--subtitle--font-size: 0.9em;
    --chat--message-line-height: 1.5;
  }
}
</style>
