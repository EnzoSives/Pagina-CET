<template>
  <div class="q-pa-md" style="max-width: 1200px; margin: 0 auto; padding-top: 120px">
    <div class="text-center q-mb-xl">
      <div class="text-h3 q-mt-md text-weight-bold text-primary">Club Empleados de Telpin</div>
      <div class="text-subtitle1 text-grey-7">Asociación Civil - Pinamar, Buenos Aires</div>
    </div>

    <q-card class="objetivos-card bg-primary text-white shadow-10 q-mb-xl">
      <q-card-section class="text-justify">
        <p class="text-body1 q-mb-md">
          En la localidad de Pinamar, el Club Empleados de Telpin es una Asociación Civil que persigue los siguientes
          objetivos:
        </p>
        <q-list dense>
          <q-item v-for="(objetivo, index) in objetivos" :key="index" class="objetivo-item">
            <q-item-section avatar>
              <q-icon name="check_circle" size="md" color="white" />
            </q-item-section>
            <q-item-section class="text-body2">{{ objetivo }}</q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
    </q-card>

    <div class="q-mb-xl">
      <div class="text-h4 text-center q-mb-md text-primary">
        Comisión Directiva
        <div class="text-subtitle1 text-grey-7">Período 2025</div>
        <div>
          <q-btn color="primary" class="q-mt-md" label="Documentación" :target="'_blank'"
            :href="'https://sites.google.com/cetpinamar.com.ar/comision2021/inicio'" icon-right="open_in_new">
            <q-tooltip anchor="top middle" self="bottom middle" :offset="[0, 10]">
              Ir al Sitio
            </q-tooltip>
          </q-btn>
        </div>
      </div>

      <q-separator class="q-my-lg" color="primary" />

      <div class="row q-col-gutter-md justify-center">
        <div class="col-12 col-sm-6 col-md-4 col-lg-3" v-for="(miembro, index) in directiva" :key="index">
          <q-card class="miembro-card" flat bordered>
            <q-card-section class="bg-grey-2 text-center">
              <q-avatar size="80px" color="primary" text-color="white" class="shadow-3">
                {{ getInitials(miembro.nombre) }}
              </q-avatar>
              <div class="text-h6 q-mt-sm">{{ miembro.nombre }}</div>
              <q-badge color="primary" class="q-py-xs q-mt-sm">
                {{ miembro.cargo }}
              </q-badge>
            </q-card-section>
            <q-card-actions class="justify-center q-pb-md">
              <q-btn flat color="primary" :icon="'email'" size="sm" round :href="'mailto:' + miembro.email">
                <q-tooltip>{{ miembro.email }}</q-tooltip>
              </q-btn>
            </q-card-actions>
          </q-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const objetivos = ref([
  'Ejercer el mantenimiento, fortalecimiento y desarrollo del sentimiento del amor al deporte como un medio de unión entre los socios y sus familias.',
  'Promover la práctica y enseñanza de todos los deportes.',
  'Promover las actividades culturales.',
  'Promover actividades sociales que contribuyan a fortalecer los vínculos entre los socios y sus familias.',
  'Relacionarse con otras instituciones similares del país.',
  'Adquirir, arrendar o gerenciar espacios inmuebles apropiados como así también los bienes muebles necesarios para la consecución de sus fines.',
  'Desarrollar un ambiente de cordialidad y solidaridad entre sus asociados y propender al mejoramiento intelectual y cultural de los mismos.'
]);

const directiva = ref([
  { nombre: 'Rodrigo Oliver', cargo: 'Presidente', email: 'rodrigo.oliver@cetpinamar.com.ar' },
  { nombre: 'Doverli Esteban Coran', cargo: 'Vicepresidente', email: 'doverli@cetpinamar.com.ar' },
  { nombre: 'Juan Pablo Bianucci', cargo: 'Secretario', email: 'juan.bianucci@cetpinamar.com.ar' },
  { nombre: 'Patricio Javier O\'Neill', cargo: 'Pro Secretario', email: 'patricio.oneill@cetpinamar.com.ar' },
  { nombre: 'Ximena Miguez', cargo: 'Tesorero', email: 'ximena.miguez@cetpinamar.com.ar' },
  { nombre: 'Mariela Corán', cargo: 'Pro Tesorero', email: 'marielac@cetpinamar.com.ar' },
  { nombre: 'Leandro Gabriel Laudano', cargo: 'Vocal Titular', email: 'leandro.laudano@cetpinamar.com.ar' },
  { nombre: 'Dina Giordano', cargo: 'Vocal Titular', email: 'dina.giordano@cetpinamar.com.ar' },
  { nombre: 'Mariano Hueter', cargo: 'Vocal Titular', email: 'mariano.hueter@cetpinamar.com.ar' },
  { nombre: 'Christian Alexis Frejeiro', cargo: 'Vocal Titular', email: 'christian.frejeiro@cetpinamar.com.ar' },
  { nombre: 'Tristana Cangiano', cargo: 'Vocal Suplente', email: 'tristana.cangiano@cetpinamar.com.ar' },
  { nombre: 'Diego Mainini', cargo: 'Vocal Suplente', email: 'diego.mainini@cetpinamar.com.ar' },
  { nombre: 'Juan Algieri', cargo: 'Vocal Suplente', email: 'juan.algieri@cetpinamar.com.ar' },
  { nombre: 'Ana Garbino', cargo: 'Vocal Suplente', email: 'ana.garbino@cetpinamar.com.ar' },
  { nombre: 'Abel Casado', cargo: 'Revisor de Cuentas Titular', email: 'abel.casado@cetpinamar.com.ar' },
  { nombre: 'Fabiola Corina Roth', cargo: 'Revisor de Cuentas Titular', email: 'fabiola.roth@cetpinamar.com.ar' },
  { nombre: 'Ricardo Martin Pagano', cargo: 'Revisor de Cuentas Titular', email: 'martin.pagano@cetpinamar.com.ar' },
  { nombre: 'Florencia Canepa', cargo: 'Revisor de Cuentas Suplente', email: 'florencia.canepa@cetpinamar.com.ar' },
]);

// Función para obtener las iniciales del nombre
const getInitials = (nombre: any) => {
  return nombre
    .split(' ')
    .map((word: any) => word.charAt(0))
    .join('')
    .substring(0, 2)
    .toUpperCase();
};
</script>

<style scoped>
.objetivos-card {
  border-radius: 12px;
}

.objetivo-item {
  padding: 8px 0;
}

.miembro-card {
  transition: all 0.3s ease;
  border-radius: 12px;
  overflow: hidden;
}

.miembro-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.q-avatar {
  transition: transform 0.3s ease;
}

.miembro-card:hover .q-avatar {
  transform: scale(1.05);
}
</style>
