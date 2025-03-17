<template>
  <div class="hola" style="padding-top: 150px;">
    <q-banner class="bg-warning text-black q-mb-md">
      <p><b>{{ msg }} {{ authStore.user }}</b></p>
      <q-separator />
      <p class="q-mt-sm">CONSULTE SU CASILLA DE CORREO PARA VERIFICAR EL ACCESO</p>
    </q-banner>

    <q-banner class="bg-green text-white">
      <h4 class="q-mb-none">¡Hola {{ perfilSeleccionado?.nombre }}!</h4>
      <p><b>Consulta tu carnet de socio, estado de cuenta y beneficios en comercios adheridos.</b></p>
    </q-banner>

    <div v-if="perfilSeleccionado?.numeroCliente" class="q-pa-md q-mt-md bg-green text-white text-center">
      <img :src="perfilSeleccionado?.url" width="340px" />
      <div class="texto-apellido"><small>{{ perfilSeleccionado?.apellido }}</small></div>
      <div class="texto-nombre"><small>{{ perfilSeleccionado?.nombre }}</small></div>
      <div class="texto-dni"><small>D.N.I.: {{ perfilSeleccionado?.dni }}</small></div>
      <div class="nro-socio"><small>{{ perfilSeleccionado?.numeroCliente }}</small></div>
      <div class="texto-ano">2024</div>

    </div>

    <div v-if="perfilSeleccionado?.numeroCliente" class="q-pa-md bg-green text-white">
      <q-list bordered separator>
        <q-item v-for="item in cuentasCobros" :key="item.nroCuenta">
          <CuentaCobro :id="item.nroCuenta" :eID="item.eID" :tipoCuentaCobro="item.tipoCuentaCobro" :saldo="item.saldo"
            :cpe="item.cPE" />
        </q-item>
      </q-list>

      <p class="q-mt-md">Cualquier inquietud o sugerencia, contáctenos a info@cetpinamar.com.ar</p>
      <q-btn color="secondary" label="WhatsApp" icon="mdi-whatsapp" @click="whatsapp" />
    </div>

    <q-banner v-else class="bg-yellow text-black">
      <p><b>SI USTED NO ES SOCIO, LLENE EL FORMULARIO</b></p>
      <q-btn flat label="AQUÍ" type="a"
        href="https://docs.google.com/forms/d/e/1FAIpQLSd8c8tQjiLs01-gDbRoET4kdYYyxzAhbO-BI8vqkOrolAMENg/viewform" />
      <q-separator />
      <p class="q-mt-sm"><b>SI CONSIDERA QUE YA ES SOCIO:</b></p>
      <p>1. VERIFIQUE SU DNI.</p>
      <p>2. O CONTACTESE CON ADMINISTRACIÓN.</p>
    </q-banner>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { usePerfilStore } from 'src/stores/perfilesStore'
import { useRouter } from 'vue-router'
import { useAuthStore } from 'src/stores/auth'
import CuentaCobro from 'src/components/CuentaCobro.vue'

const { perfilIndex, perfiles, getCuentasCobroPerfilJCETAction, cuentasCobros } = usePerfilStore()
const router = useRouter()
const authStore = useAuthStore()

// Redirigir automáticamente cuando no se seleccione un perfil
if (perfilIndex === null || perfilIndex === undefined) {
  router.push('/seleccion-perfil') // Ajusta la ruta según tu aplicación
}

// Acceder al perfil completo usando el índice
const perfilSeleccionado = computed(() => {
  return perfilIndex !== null && perfilIndex !== undefined ? perfiles[perfilIndex] : null
})
// Llamamos a la acción de obtener cuentas de cobro cuando el perfil seleccionado se carga
onMounted(() => {
  if (perfilSeleccionado.value) {
    getCuentasCobroPerfilJCETAction(perfilSeleccionado.value.id) // Cargar las cuentas de cobro
  }
})
const whatsapp = () => {
  window.open("https://api.whatsapp.com/send?phone=+542254495253", "_blank")
}

defineProps({
  msg: String
})
</script>

<style scoped>
.texto-apellido,
.texto-nombre,
.texto-dni,
.nro-socio,
.texto-estado {
  font-size: 1rem;
  font-weight: bold;
  margin-top: 5px;
}
</style>
