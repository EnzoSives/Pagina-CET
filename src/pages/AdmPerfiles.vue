<script setup lang="ts">
import { useRouter } from 'vue-router'
import { usePerfilStore } from 'src/stores/perfilesStore'
const router = useRouter()
const perfilStore = usePerfilStore()


// Método para seleccionar un perfil
const seleccionarPerfil = (index: any) => {
  perfilStore.setPerfil(index)
  router.push('/homePerfil')
}
</script>

<template>
  <div class="perfil-selector" style="padding-top: 150px;">
    <h2>Selecciona un perfil</h2>
    <ul>
      <li v-for="(perfil, index) in perfilStore.getPerfiles" :key="perfil.id"
        :class="{ seleccionado: index === perfilStore.perfilIndex }" @click="seleccionarPerfil(index)">
        <span>{{ perfil.nombre }} {{ perfil.apellido }}</span>
        <small>({{ perfil.numeroCliente }})</small>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.perfil-selector {
  padding: 16px;
  background: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  margin: auto;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  padding: 10px;
  margin: 5px 0;
  background: #ffffff;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: background 0.2s;
}

li:hover {
  background: #e9ecef;
}

.seleccionado {
  background: #007bff;
  color: white;
}
</style>
