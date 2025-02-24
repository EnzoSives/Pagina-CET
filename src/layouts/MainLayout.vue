<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container style="background-color: white;">
      <router-view />
    </q-page-container>

    <q-card id="footer" class="q-pa-md text-white bg-dark">
      <q-card-section>
        <div class="row">

          <!-- Izquierda: Información y Redes Sociales -->
          <div class="col-6" style="margin-top: 20px;">
            <div class="text-h6">CET - Club Empleados Telpin</div>
            <div class="text-subtitle2">© 2024 Todos los derechos reservados.</div>

            <div class="text-h6 q-mt-md" style="margin-top: 50px;">
              <q-icon name="phone_in_talk" class="q-mr-sm" />
              Contáctanos
            </div>

            <div class="row items-center q-gutter-sm q-mt-sm">
              <q-btn round class="q-mx-xs">
                <q-avatar size="42px">
                  <img src="src/assets/facebook.png" alt="Facebook" />
                </q-avatar>
              </q-btn>
              <q-btn round class="q-mx-xs">
                <q-avatar size="42px">
                  <img src="src/assets/x.png" alt="X" />
                </q-avatar>
              </q-btn>
              <q-btn round class="q-mx-xs">
                <q-avatar size="42px">
                  <img src="src/assets/instagram.png" alt="Instagram" />
                </q-avatar>
              </q-btn>
              <q-btn round class="q-mx-xs">
                <q-avatar size="42px">
                  <img src="src/assets/wpp.png" alt="WhatsApp" />
                </q-avatar>
              </q-btn>
            </div>
          </div>

          <!-- Derecha: Mapa -->
          <div class="col-6">
            <div class="text-h6">
              <q-icon name="location_on" class="q-mr-sm" />
              Cómo llegar
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
import { onMounted, onBeforeUnmount } from 'vue'
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
  /* Altura fija para que se vea bien */
  border: 1px solid #fff;
}

#map {
  width: 100%;
  height: 100%;
}
</style>
