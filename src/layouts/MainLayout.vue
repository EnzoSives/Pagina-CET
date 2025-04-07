<template>
  <q-layout view="lHh Lpr lFf">

    <q-btn v-if="isMobile" dense flat @click="drawerOpen = !drawerOpen" round icon="menu"
      style="margin: 20px; position: fixed; z-index: 10;" />

    <!-- Drawer: Menú lateral -->
    <q-drawer v-model="drawerOpen" :width="200" :breakpoint="700" elevated class="bg-black text-white">
      <q-img src="~/assets/logoCET.png" class="q-mx-auto q-mt-md" style="width: 50px; margin:20px" />
      <q-list>
        <q-item>
          <q-btn label="Inicio" color="white" flat class="hover-orange" @click="goToHome()"></q-btn>

        </q-item>
        <q-item>
          <q-btn label="Socio" color="white" flat class="hover-orange" @click="goToSocio()"></q-btn>

        </q-item>
        <q-item>
          <q-btn-dropdown label="Deportes" color="white" flat class="hover-orange">
             <q-list>
          <q-item
            v-for="deporte in deportes"
            :key="deporte"
            clickable
            v-ripple
            @click="goToDeportes(deporte)"
            :class="{'selected-deporte': deporteSeleccionado === deporte}"
          >
            <q-item-section>{{ deporte }}</q-item-section>
          </q-item>
        </q-list>
          </q-btn-dropdown>

        </q-item>
        <q-item>
          <q-btn label="Institucional" color="white" flat class="hover-orange" @click="goToIsti()"></q-btn>

        </q-item>
        <q-item>
          <q-btn label="Tienda" color="white" flat class="hover-orange" @click="goToTienda()"></q-btn>

        </q-item>
        <q-item>
          <q-btn label="?Faq" color="white" flat class="hover-orange" @click="openFaq"></q-btn>

        </q-item>
        <q-item>

          <q-btn label="App CET" color="white" flat class="hover-orange" @click="goToApp()"></q-btn>
        </q-item>

      </q-list>
    </q-drawer>

    <!-- Contenedor principal de la página -->
    <q-page-container style="background-color: #f5f5f5;">
      <router-view />
    </q-page-container>

    <ChatBotComponent />

    <q-card id="footer" class="q-pa-md text-white bg-dark">
      <q-card-section>
        <div class="row">
          <!-- Izquierda: Información y Redes Sociales -->
          <div class="col-12 col-md-6" style="margin-top: 20px;">
            <div class="text-h6">CET - Club Empleados Telpin</div>
            <div class="text-subtitle2">© 2024 Todos los derechos reservados.</div>
            <div class="text-h6 q-mt-md" style="margin-top: 50px;">
              <q-icon name="phone_in_talk" class="q-mr-sm" />
              Contáctanos
            </div>
            <div class="row items-center q-gutter-sm q-mt-sm">
              <q-btn round class="q-mx-xs">
                <q-avatar size="42px">
                  <img src="~/assets/facebook.png" alt="Facebook" @click="goTo('https://www.facebook.com/cetpinamar/')"/>
                </q-avatar>
              </q-btn>

              <q-btn round class="q-mx-xs">
                <q-avatar size="42px">
                  <img src="~/assets/instagram.png" alt="Instagram" @click="goTo('https://www.instagram.com/cetpinamar/#')"/>
                </q-avatar>
              </q-btn>
              <q-btn round class="q-mx-xs">
                <q-avatar size="42px">
                  <img src="~/assets/wpp.png" alt="WhatsApp" @click="goTo('https://api.whatsapp.com/send/?phone=542254495253&text=Hola+CET%21&type=phone_number&app_absent=0')"/>
                </q-avatar>
              </q-btn>
              <q-btn round class="q-mx-xs">
                <q-avatar size="50px">
                  <img src="~/assets/email.png" alt="Mail"/>
                </q-avatar>
                <q-tooltip>
                info@cetpinamar.com.ar
                </q-tooltip>
              </q-btn>
            </div>
          </div>

          <!-- Derecha: Mapa -->
          <div class="col-12 col-md-6">
            <div class="text-h6">
              <!-- <q-icon name="location_on" class="q-mr-sm" />
              Cómo llegar -->

              <q-btn label="Cómo llegar" color="primary" icon="directions" flat @click="goToGoogleMaps">
                <q-tooltip>
                  Ir a ruta
                </q-tooltip>
              </q-btn>
            </div>
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
import { onMounted, onUnmounted, onBeforeUnmount, ref } from 'vue'
import logoCET from 'src/assets/logoCET.png'
import 'ol/ol.css'
import Map from 'ol/Map'
import View from 'ol/View'
import TileLayer from 'ol/layer/Tile'
import OSM from 'ol/source/OSM'
import Feature from 'ol/Feature'
import Point from 'ol/geom/Point'
import { Icon, Style } from 'ol/style'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import { fromLonLat } from 'ol/proj'
import { useRouter, useRoute } from 'vue-router';
import ChatBotComponent from 'src/components/ChatBotComponent.vue'

const router = useRouter();
const route = useRoute();
// Estado para controlar la visibilidad del drawer
const drawerOpen = ref(false)


const deporteSeleccionado = ref<string | null>(
  Array.isArray(route.params.deporte) ? route.params.deporte[0] ?? null : route.params.deporte ?? null
);


const deportes = ["Hockey", "Patin", "Running", "Arqueria", "Ciclismo"];

const goToDeportes = (deporte: string) => {
  console.log(deporte); // Verifica que se está pasando el valor correcto
  deporteSeleccionado.value = deporte;
  router.push({ name: 'DeportePage', params: { deporte } });
};


const isMobile = ref(false);

const handleResize = () => {
  isMobile.value = window.innerWidth <= 600;
};


const openFaq = () => {
  window.open('~/assets/faq.pdf', '_blank');  // Esto abre el PDF en una nueva pestaña
};

const goTo = (url: string) => {
  window.open(url, '_blank');
};

// const goToDeporte = (deporte: string) => {
//   router.push({ name: 'DeportePage', params: { deporte } });
// };
const goToHome = () => {
  router.push({ path: '/' });
};
const goToSocio = () => {
  router.push({ path: '/socio' });
};
const goToIsti = () => {
  router.push({ path: '/institucional' });
};
const goToApp = () => {
  // router.push({ path: '/appcet' });
  router.push({ path: '/homePerfil' });
};
const goToTienda = () => {
  window.location.href = 'https://cetpinamar.mercadoshops.com.ar/';
};

const goToGoogleMaps = () => {
  window.open('https://www.google.com/search?rlz=1C1CHBD_esAR860AR862&tbs=lrf:!1m4!1u2!2m2!2m1!1e1!2m1!1e2!3sIAE,lf:1,lf_ui:2&tbm=lcl&sxsrf=ALeKk01FAQCkwxcJ4X-Jq6L0JCDyOUr16Q:1612449379773&q=cet&rflfq=1&num=10&ved=2ahUKEwi9hf-DutDuAhVaGbkGHWNcBzsQtgN6BAgDEAc&rlst=f#rlfi=hd:;si:;mv:[[-36.5095441,-56.6757588],[-37.1306564,-57.1776644]];tbs:lrf:!1m4!1u2!2m2!2m1!1e1!2m1!1e2!3sIAE,lf:1,lf_ui:2', '_blank');
};

onMounted(() => {
  window.addEventListener('resize', handleResize);
  handleResize(); // Inicializa el estado de isMobile al cargar
  if (route.params.deporte) {
    deporteSeleccionado.value = route.params.deporte as string;
  }
});

onUnmounted(() => {

  window.removeEventListener('resize', handleResize);
});
onMounted(() => {
  const lon = -56.87957619162803
  const lat = -37.097328981942354
  const coords = fromLonLat([lon, lat])

  const map = new Map({
    target: 'map',
    layers: [
      new TileLayer({
        source: new OSM()
      })
    ],
    view: new View({
      center: coords,
      zoom: 14.5
    })
  })

  const marker = new Feature({
    geometry: new Point(coords)
  })

  marker.setStyle(
    new Style({
      image: new Icon({
        src: logoCET,
        scale: 0.3
      })
    })
  )

  const vectorLayer = new VectorLayer({
    source: new VectorSource({
      features: [marker]
    })
  })

  map.addLayer(vectorLayer)

  const resizeMap = () => map.updateSize()
  window.addEventListener('resize', resizeMap)

  onBeforeUnmount(() => {
    window.removeEventListener('resize', resizeMap)
  })
})
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

.q-dialog-plugin {
  width: 80%;
  max-width: 1500px;
}

.selected-deporte {
  background-color: orange;
  color: white;
  font-weight: bold;
}
</style>
