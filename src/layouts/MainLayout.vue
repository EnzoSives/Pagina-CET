<template>
  <q-layout view="lHh Lpr lFf">
    <q-header v-if="$q.screen.lt.md" class="bg-dark text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="drawerOpen = !drawerOpen" aria-label="Abrir menú" />
        <q-toolbar-title>
          <q-img src="~/assets/logoCET.png" style="height: 40px; width: 40px; margin-right: 10px" />
          CET
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="drawerOpen" :width="250" :breakpoint="700" elevated class="bg-grey-10 text-white">
      <q-img src="~/assets/logoCET.png" class="q-mx-auto q-mt-md" style="width: 80px; display: block;" />
      <q-list class="q-mt-md">
        <q-item clickable v-ripple @click="goTo('/')" :active="$route.path === '/'">
          <q-item-section avatar>
            <q-icon name="home" />
          </q-item-section>
          <q-item-section>Inicio</q-item-section>
        </q-item>

        <q-item clickable v-ripple @click="goTo('/socio')" :active="$route.path === '/socio'">
          <q-item-section avatar>
            <q-icon name="person" />
          </q-item-section>
          <q-item-section>Socio</q-item-section>
        </q-item>

        <q-expansion-item icon="sports_soccer" label="Deportes">
          <q-list class="q-pl-lg">
            <q-item v-for="deporte in deportes" :key="deporte" clickable v-ripple @click="goToDeportes(deporte)"
              :active="deporteSeleccionado === deporte" class="q-pl-xl">
              <q-item-section>{{ deporte }}</q-item-section>
            </q-item>
          </q-list>
        </q-expansion-item>

        <q-item clickable v-ripple @click="goTo('/institucional')" :active="$route.path === '/institucional'">
          <q-item-section avatar>
            <q-icon name="apartment" />
          </q-item-section>
          <q-item-section>Institucional</q-item-section>
        </q-item>

        <q-item clickable v-ripple @click="goToExternal('https://cetpinamar.mercadoshops.com.ar/')">
          <q-item-section avatar>
            <q-icon name="store" />
          </q-item-section>
          <q-item-section>Tienda</q-item-section>
        </q-item>

        <q-item clickable v-ripple @click="goTo('/agenteia')" :active="$route.path === '/agenteia'">
          <q-item-section avatar>
            <q-icon name="smart_toy" />
          </q-item-section>
          <q-item-section>Agente IA</q-item-section>
        </q-item>

        <q-item clickable v-ripple @click="goTo('/homePerfil')" :active="$route.path === '/homePerfil'">
          <q-item-section avatar>
            <q-icon name="phone_android" />
          </q-item-section>
          <q-item-section>App CET</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container style="background-color: #f5f5f5">
      <router-view />
    </q-page-container>

    <ChatBotComponent />

    <q-card id="footer" class="q-pa-md text-white bg-dark">
      <q-card-section>
        <div class="row q-col-gutter-md">
          <div class="col-12 col-md-6 q-mb-md">
            <div class="text-h6 q-mb-sm">CET - Club Empleados Telpin</div>
            <div class="text-subtitle2 q-mb-md">© 2025 Todos los derechos reservados.</div>

            <div class="text-h6 q-mb-sm">
              <q-icon name="phone_in_talk" class="q-mr-sm" />
              Contáctanos
            </div>
            <div class="row q-gutter-sm q-mt-sm justify-start">
              <q-btn round flat @click="goToExternal('https://www.facebook.com/cetpinamar/')" aria-label="Facebook">
                <q-avatar size="42px">
                  <img src="~/assets/facebook.png" alt="Facebook" />
                </q-avatar>
                <q-tooltip> Ir a Facebook </q-tooltip>
              </q-btn>

              <q-btn round flat @click="goToExternal('https://www.instagram.com/cetpinamar/#')" aria-label="Instagram">
                <q-avatar size="42px">
                  <img src="~/assets/instagram.png" alt="Instagram" />
                </q-avatar>
                <q-tooltip> Ir a Instagram </q-tooltip>
              </q-btn>

              <q-btn round flat
                @click="goToExternal('https://api.whatsapp.com/send/?phone=542254625253&text=Hola+CET%21&type=phone_number&app_absent=0')"
                aria-label="WhatsApp">
                <q-avatar size="42px">
                  <img src="~/assets/wpp.png" alt="WhatsApp" />
                </q-avatar>
                <q-tooltip> Ir a WhatsApp </q-tooltip>
              </q-btn>

              <q-btn round flat @click="goToExternal('mailto:info@cetpinamar.com.ar')" aria-label="Enviar Mail">
                <q-avatar size="42px">
                  <img src="~/assets/email.png" alt="Mail" />
                </q-avatar>
                <q-tooltip> Enviar Mail </q-tooltip>
              </q-btn>
            </div>
          </div>

          <div class="col-12 col-md-6">
            <q-btn label="Cómo llegar" color="primary" icon="directions" flat @click="goToGoogleMaps" class="q-mb-md">
              <q-tooltip> Ir a ruta </q-tooltip>
            </q-btn>
            <div class="footer-map-container">
              <div id="map"></div>
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-layout>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useQuasar } from 'quasar'; // Import useQuasar for screen utilities

import logoCET from 'src/assets/logoCET.png';
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import { Icon, Style } from 'ol/style';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { fromLonLat } from 'ol/proj';
import ChatBotComponent from 'src/components/ChatBotComponent.vue';

const router = useRouter();
const route = useRoute();
const $q = useQuasar(); // Initialize Quasar screen utility

// Estado para controlar la visibilidad del drawer
const drawerOpen = ref(false);

const deporteSeleccionado = ref<string | null>(
  Array.isArray(route.params.deporte)
    ? (route.params.deporte[0] ?? null)
    : (route.params.deporte ?? null),
);

const deportes = ['Hockey', 'Patin', 'Running', 'Arquería3D', 'Ciclismo'];

// Centralized navigation for internal routes
const goTo = (path: string) => {
  router.push({ path });
  if ($q.screen.lt.md) { // Close drawer on mobile after navigation
    drawerOpen.value = false;
  }
};

// Centralized navigation for external links
const goToExternal = (url: string) => {
  window.open(url, '_blank');
};

const goToDeportes = (deporte: string) => {
  deporteSeleccionado.value = deporte;
  router.push({ name: 'DeportePage', params: { deporte } });
  if ($q.screen.lt.md) { // Close drawer on mobile after navigation
    drawerOpen.value = false;
  }
};

const goToGoogleMaps = () => {
  goToExternal(
    'https://www.google.com/search?rlz=1C1CHBD_esAR860AR862&tbs=lrf:!1m4!1u2!2m2!2m1!1e1!2m1!1e2!3sIAE,lf:1,lf_ui:2&tbm=lcl&sxsrf=ALeKk01FAQCkwxcJ4X-Jq6L0JCDyOUr16Q:1612449379773&q=cet&rflfq=1&num=10&ved=2ahUKEwi9hf-DutDuAhVaGbkGHWNcBzsQtgN6BAgDEAc&rlst=f#rlfi=hd:;si:;mv:[[-36.5095441,-56.6757588],[-37.1306564,-57.1776644]];tbs:lrf:!1m4!1u2!2m2!2m1!1e1!2m1!1e2!3sIAE,lf:1,lf_ui:2',
  );
};

onMounted(() => {
  if (route.params.deporte) {
    deporteSeleccionado.value = route.params.deporte as string;
  }

  // OpenLayers map initialization
  const lon = -56.87957619162803;
  const lat = -37.097328981942354;
  const coords = fromLonLat([lon, lat]);

  const map = new Map({
    target: 'map',
    layers: [
      new TileLayer({
        source: new OSM(),
      }),
    ],
    view: new View({
      center: coords,
      zoom: 14.5,
    }),
  });

  const marker = new Feature({
    geometry: new Point(coords),
  });

  marker.setStyle(
    new Style({
      image: new Icon({
        src: logoCET,
        scale: 0.02,
      }),
    }),
  );

  const vectorLayer = new VectorLayer({
    source: new VectorSource({
      features: [marker],
    }),
  });

  map.addLayer(vectorLayer);

  const resizeMap = () => map.updateSize();
  window.addEventListener('resize', resizeMap);

  onBeforeUnmount(() => {
    window.removeEventListener('resize', resizeMap);
    map.setTarget(undefined); // Clean up the map instance
  });
});
</script>

<style scoped>
.footer-map-container {
  margin-top: 10px;
  border-radius: 5px;
  overflow: hidden;
  width: 100%;
  height: 200px;
  border: 1px solid #fff;
}

#map {
  width: 100%;
  height: 100%;
}

.selected-deporte {
  background-color: #287eff;
  /* A vibrant blue for selected items */
  color: white;
  font-weight: bold;
}

/* Hover effects for drawer items */
.q-item.q-hoverable:hover {
  background-color: rgba(255, 255, 255, 0.1);
  /* Slightly transparent white on hover */
}

/* Specific styling for the logo within the drawer */
.q-drawer .q-img {
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 20px;
}
</style>