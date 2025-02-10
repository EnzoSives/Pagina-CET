<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container style="background-color: white;">
      <router-view />
    </q-page-container>

    <q-card id="footer" class="q-pa-md text-white bg-dark">


      <q-card-section>
        <div class="row">

          <!-- Redes Sociales -->
          <div class="col-6" style="padding-top: 10px;">
            <div class="text-h6">CET - Club Empleados Telpin</div>
            <div class="text-subtitle2">© 2024 Todos los derechos reservados.</div>
          </div>
          <div class="col-6">
            <div class="text-h6" style="margin-bottom: 15px;">
              <q-icon name="phone_in_talk" class="q-mr-sm" />
              Contactanos
            </div>
            <div class="row items-center q-gutter-sm">
              <q-btn round class="q-mx-sm">
                <q-avatar size="42px">
                  <img src="src/assets/facebook.png" alt="Facebook" />
                </q-avatar>
              </q-btn>
              <q-btn round class="q-mx-sm">
                <q-avatar size="42px">
                  <img src="src/assets/x.png" alt="X" />
                </q-avatar>
              </q-btn>
              <q-btn round class="q-mx-sm">
                <q-avatar size="42px">
                  <img src="src/assets/instagram.png" alt="Instagram" />
                </q-avatar>
              </q-btn>
              <q-btn round class="q-mx-sm">
                <q-avatar size="42px">
                  <img src="src/assets/wpp.png" alt="Whastapp" />
                </q-avatar>
              </q-btn>
            </div>
          </div>

          <q-separator />

          <!-- Mapa -->
          <div class="col-12" style="padding-top: 20px;">
            <div class="text-h6">
              <q-icon name="location_on" class="q-mr-sm" />
              Como llegar
            </div>
            <div class="footer-map-container">
              <div id="map" style="width: 100%; height: 300px;"></div>
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
import 'ol/ol.css' // Importar los estilos de OpenLayers
import Map from 'ol/Map'
import View from 'ol/View'
import TileLayer from 'ol/layer/Tile'
import OSM from 'ol/source/OSM'
import Feature from 'ol/Feature'
import Point from 'ol/geom/Point'
import { Icon, Style } from 'ol/style'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import { fromLonLat } from 'ol/proj' // Importar la función de conversión de coordenadas

onMounted(() => {
  // Coordenadas en latitud y longitud (EPSG:4326)
  const lon = -56.87957619162803
  const lat = -37.097328981942354

  // Convertir las coordenadas a EPSG:3857
  const coords = fromLonLat([lon, lat])

  // Crear el mapa con OpenLayers
  const map = new Map({
    target: 'map',
    layers: [
      new TileLayer({
        source: new OSM()
      })
    ],
    view: new View({
      center: coords, // Usar las coordenadas convertidas
      zoom: 14.5 // Aumenta el valor del zoom para acercarte más
    })
  })

  // Crear un marcador con un ícono personalizado
  const marker = new Feature({
    geometry: new Point(coords) // Usar las coordenadas convertidas
  })

  marker.setStyle(
    new Style({
      image: new Icon({
        src: logoCET, // Usando import para importar imágenes locales
        scale: 0.3 // Puedes ajustar la escala según el tamaño del ícono
      })
    })
  )

  // Agregar el marcador al mapa
  const vectorLayer = new VectorLayer({
    source: new VectorSource({
      features: [marker]
    })
  })

  map.addLayer(vectorLayer)

  // Redimensionar el mapa cuando la ventana cambia de tamaño
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
  border: 1px solid #fff;
  border-radius: 5px;
  overflow: hidden;
  width: 100%;
}
</style>
