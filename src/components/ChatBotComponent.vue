<template>
  <div></div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';

onMounted(() => {
  const js = document.createElement('script');
  js.type = 'text/javascript';
  js.async = true;
  js.src = 'https://go.botmaker.com/rest/webchat/p/0ULI4UUP6H/init.js';
  document.body.appendChild(js);
});
</script>
