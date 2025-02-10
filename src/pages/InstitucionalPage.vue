<template>
  <div class="q-pa-md" style="padding-top: 120px;">
    <div class="text-center q-mb-md">
      <q-avatar size="80px">
        <img src="src/assets/logoCET.png" alt="Logo CET" />
      </q-avatar>
      <div class="text-h4 q-mt-md">Club Empleados de Telpin</div>

    </div>

    <q-card class="q-pa-md bg-primary text-white">
      <q-card-section>
        <p>
          En la localidad de Pinamar Partido de Pinamar de la Provincia de Buenos Aires, donde tendrá su domicilio
          social,
          queda constituida una Asociación de carácter civil denominada: Club Empleados de Telpin Asociación Civil, que
          tendrá por objeto:
        </p>
        <ul>
          <li>Ejercer el mantenimiento, fortalecimiento y desarrollo del sentimiento del amor al deporte como un medio
            de
            unión entre los socios y sus familias.</li>
          <li>Promover la práctica y enseñanza de todos los deportes.</li>
          <li>Promover las actividades culturales.</li>
          <li>Promover actividades sociales que contribuyan a fortalecer los vínculos entre los socios y sus familias.
          </li>
          <li>Relacionarse con otras instituciones similares del país.</li>
          <li>Adquirir, arrendar o gerenciar espacios inmuebles apropiados como así también los bienes muebles
            necesarios
            para la consecución de sus fines.</li>
          <li>Desarrollar un ambiente de cordialidad y solidaridad entre sus asociados y propender al mejoramiento
            intelectual y cultural de los mismos.</li>
        </ul>
      </q-card-section>
    </q-card>

    <div class="text-h5 text-center q-mt-lg">Comisión Directiva (2022-2023)</div>
    <q-separator class="q-my-md" />

    <div class="row q-col-gutter-md justify-center">
      <q-card v-for="(miembro, index) in directiva" :key="index" class="col-12 col-md-3 q-pa-md text-center">
        <q-card-section>
          <div class="text-h6">{{ miembro.nombre }}</div>
          <div class="text-subtitle2 text-grey">{{ miembro.cargo }}</div>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const directiva = ref([
  { nombre: 'Juan Pablo Bianucci', cargo: 'Presidente' },
  { nombre: 'Patricio Javier O\'neill', cargo: 'Vicepresidente' },
  { nombre: 'Abel Eduardo Casado', cargo: 'Secretario' },
  { nombre: 'Maria Josefina Feliciangeli', cargo: 'Pro Secretaria' },
  { nombre: 'Mariela Corán', cargo: 'Tesorero' },
  { nombre: 'Ximena Miguez', cargo: 'Pro Tesorero' },
  { nombre: 'Juan Novo', cargo: 'Vocal Titular' },
  { nombre: 'Eleonora Tcaciuc', cargo: 'Vocal Titular' },
  { nombre: 'Rodrigo Oliver', cargo: 'Vocal Titular' },
  { nombre: 'Nadinne Ovelar', cargo: 'Vocal Titular' },
  { nombre: 'Juan Boulanger', cargo: 'Vocal Suplente' },
  { nombre: 'Verónica Santirso', cargo: 'Vocal Suplente' },
  { nombre: 'Matias Melo', cargo: 'Vocal Suplente' },
  { nombre: 'Gustavo Freire', cargo: 'Vocal Suplente' },
]);
</script>

<style scoped>
ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin: 5px 0;
}

.q-card {
  transition: 0.3s;
  margin: 5px;
}

.q-card:hover {
  background-color: beige;
}
</style>
