<script setup lang="ts">
import { useRouter } from 'vue-router'
import { usePerfilStore } from 'src/stores/perfilesStore'

const router = useRouter()
const perfilStore = usePerfilStore()

// Método para seleccionar un perfil
const seleccionarPerfil = (index: number) => {
  perfilStore.setPerfil(index)
  router.push('/homePerfil')
}
</script>

<template>
  <q-page class="q-pa-md" style="padding-top: 150px;">
    <div class="row justify-center">
      <div class="col-12 col-md-6">
        <q-card class="q-pa-md">
          <div class="text-center q-mb-md">
            <h2 class="text-h4 text-primary">Selecciona un perfil</h2>
            <p class="text-subtitle1 text-grey-7">Elige el perfil con el que deseas continuar</p>
          </div>

          <q-list separator bordered class="rounded-borders">
            <q-item v-for="(perfil, index) in perfilStore.getPerfiles" :key="perfil.id" clickable
              :active="index === perfilStore.perfilIndex" @click="seleccionarPerfil(index)" class="q-mb-sm">
              <q-item-section avatar>
                <q-avatar color="primary" text-color="white">
                  {{ perfil.nombre.charAt(0) }}{{ perfil.apellido.charAt(0) }}
                </q-avatar>
              </q-item-section>

              <q-item-section>
                <q-item-label class="text-h6">{{ perfil.nombre }} {{ perfil.apellido }}</q-item-label>
                <q-item-label caption>
                  <q-icon name="badge" size="xs" class="q-mr-xs" />
                  N° Cliente: {{ perfil.numeroCliente }}
                </q-item-label>
              </q-item-section>

              <q-item-section side>
                <q-icon name="chevron_right" color="grey" />
              </q-item-section>
            </q-item>
          </q-list>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<style scoped>
.q-item {
  border-radius: 8px;
  transition: all 0.3s ease;
}

.q-item:hover {
  background: #f5f5f5;
}

.q-item--active {
  background: #e3f2fd;
}
</style>
