<script lang="ts" setup>
// App.vue
import { onMounted } from 'vue'
import '@n8n/chat/style.css'
import { createChat } from '@n8n/chat'

onMounted(() => {
  createChat({
    webhookUrl: 'https://n8n.telpin.com.ar/webhook/a889d2ae-2159-402f-b326-5f61e90f602e/chat',
    mode: 'fullscreen',
    showWelcomeScreen: true,
    initialMessages: ['Hola! 👋', 'Mi nombre es COCO. Como puedo ayudarte?'],
    i18n: {
      en: {
        title: 'Hola! 👋',
        subtitle: 'Inicia el chat. Estamos para ayudarte.',
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
  <!-- 🔧 Este contenedor es necesario para que el chat se renderice -->
  <div style="padding-top: 70px; margin: 30px; height: 90%">
    <div
      id="n8n-chat"
      style="
        display: flex;
        justify-content: center;
        border: 1px solid #ccc;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        overflow: hidden;
        height: 95%;
      "
    ></div>
  </div>
</template>
<style>
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
  --chat--header--border-bottom: none;
  --chat--header--border-bottom: none;
  --chat--heading--font-size: 2em;
  --chat--header--color: var(--chat--color-light);
  --chat--subtitle--font-size: inherit;
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
</style>
