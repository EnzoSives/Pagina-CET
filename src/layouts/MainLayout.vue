<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="app-header">
      <q-toolbar class="app-toolbar">
        <q-btn v-if="$q.screen.lt.md" dense flat round icon="menu" class="q-mr-sm app-menu-btn"
          @click="drawerOpen = !drawerOpen" aria-label="Abrir menú" />

        <q-toolbar-title class="app-brand" @click="goTo('/')">
          <img :src="logoCET" class="app-brand__logo" alt="Pinamar CET" />
        </q-toolbar-title>

        <div v-if="$q.screen.gt.sm" class="app-nav-desktop">
          <template v-for="item in navItems" :key="item.label">
            <q-btn-dropdown v-if="item.dropdown" flat no-caps unelevated :label="item.label" :icon="item.icon"
              class="app-nav-btn">
              <q-list>
                <q-item v-for="deporte in deportes" :key="deporte" clickable v-ripple
                  @click="goToDeportes(deporte)" :active="deporteSeleccionado === deporte"
                  active-class="selected-deporte">
                  <q-item-section>{{ deporte }}</q-item-section>
                </q-item>
                <q-separator />
                <q-item clickable v-ripple @click="goTo('/colonia')" :active="route.path === '/colonia'"
                  active-class="selected-deporte">
                  <q-item-section>{{ coloniaLabel }}</q-item-section>
                </q-item>
              </q-list>
            </q-btn-dropdown>

            <q-btn v-else flat no-caps unelevated :label="item.label" :icon="item.icon" class="app-nav-btn"
              :class="{ 'app-nav-btn--active': isActive(item) }" @click="handleNavClick(item)" />
          </template>
        </div>

        <q-btn-dropdown v-if="showProfileControls" flat no-caps unelevated dropdown-icon="keyboard_arrow_down"
          class="app-profile-menu">
          <template #label>
            <div class="app-profile-menu__trigger">
              <q-avatar size="34px" class="app-profile-avatar">
                <img v-if="selectedProfileAvatar" :src="selectedProfileAvatar" @error="avatarError = true" />
                <span v-else>{{ selectedProfileInitials }}</span>
              </q-avatar>
            </div>
          </template>

          <q-list class="app-profile-dropdown">
            <div class="app-profile-dropdown__current">
              <q-avatar size="42px" class="app-profile-avatar">
                <img v-if="selectedProfileAvatar" :src="selectedProfileAvatar" />
                <span v-else>{{ selectedProfileInitials }}</span>
              </q-avatar>
              <div>
                <span>Perfil activo</span>
                <strong>{{ selectedProfileName }}</strong>
              </div>
            </div>

            <q-item-label header class="app-profile-dropdown__header">Elegir perfil</q-item-label>

            <q-item v-for="option in profileOptions" :key="option.value" clickable v-ripple
              :active="option.value === perfilStore.perfilIndex" active-class="app-profile-option--active"
              class="app-profile-option" @click="selectProfile(option.value)">
              <q-item-section avatar>
                <q-avatar size="34px" class="app-profile-option__avatar">
                  <img v-if="option.avatar" :src="option.avatar" />
                  <span v-else>{{ option.initials }}</span>
                </q-avatar>
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ option.label }}</q-item-label>
                <q-item-label caption>N° Cliente: {{ option.numeroCliente }}</q-item-label>
              </q-item-section>
              <q-item-section v-if="option.value === perfilStore.perfilIndex" side>
                <q-icon name="check_circle" color="primary" size="20px" />
              </q-item-section>
            </q-item>

            <q-separator class="q-my-xs" />

            <q-item clickable v-ripple class="app-profile-logout-item" @click="authStore.logout">
              <q-item-section avatar>
                <q-icon name="logout" size="22px" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Salir</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="drawerOpen" :width="260" :breakpoint="700" elevated class="bg-grey-10 text-white">
      <img :src="logoCET" class="drawer-logo" alt="Pinamar CET" />
      <q-list class="q-mt-md">
        <template v-for="item in navItems" :key="item.label">
          <q-expansion-item v-if="item.dropdown" :icon="item.icon" :label="item.label">
            <q-list class="q-pl-lg">
              <q-item v-for="deporte in deportes" :key="deporte" clickable v-ripple @click="goToDeportes(deporte)"
                :active="deporteSeleccionado === deporte" class="q-pl-xl">
                <q-item-section>{{ deporte }}</q-item-section>
              </q-item>
              <q-item clickable v-ripple @click="goTo('/colonia')" :active="route.path === '/colonia'" class="q-pl-xl">
                <q-item-section>{{ coloniaLabel }}</q-item-section>
              </q-item>
            </q-list>
          </q-expansion-item>

          <q-item v-else clickable v-ripple @click="handleNavClick(item)" :active="isActive(item)">
            <q-item-section avatar>
              <q-icon :name="item.icon" />
            </q-item-section>
            <q-item-section>{{ item.label }}</q-item-section>
          </q-item>
        </template>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

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

              <q-btn round flat @click="abrirChat" aria-label="Abrir chat de ayuda">
                <q-avatar size="42px" font-size="24px" color="primary" text-color="white" icon="chat" />
                <q-tooltip> Chateá con nosotros </q-tooltip>
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
import { computed, onMounted, onBeforeUnmount, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useQuasar } from 'quasar'; // Import useQuasar for screen utilities
import { useAuthStore } from 'src/stores/auth';
import { usePerfilStore } from 'src/stores/perfilesStore';

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

const router = useRouter();
const route = useRoute();
const $q = useQuasar(); // Initialize Quasar screen utility
const authStore = useAuthStore();
const perfilStore = usePerfilStore();

// Estado para controlar la visibilidad del drawer
const drawerOpen = ref(false);

declare function bmShow(): void;
declare function bmMaximize(): void;
const isScriptLoaded = ref(false);

const deporteSeleccionado = ref<string | null>(
  Array.isArray(route.params.deporte)
    ? (route.params.deporte[0] ?? null)
    : (route.params.deporte ?? null),
);

const deportes = [
  'Hockey',
  'Patin',
  // 'Running', // Actividad pausada: no mostrar en navegación.
  'Arquería3D',
  'Ciclismo',
];

const coloniaLabel = 'Colonia / Campus Deportivo';

interface NavItem {
  label: string;
  icon: string;
  path?: string;
  external?: string;
  dropdown?: boolean;
}

const navItems: NavItem[] = [
  { label: 'Inicio', icon: 'home', path: '/' },
  { label: 'Socio', icon: 'person', path: '/socio' },
  { label: 'Deportes y Actividades', icon: 'sports_soccer', dropdown: true },
  { label: 'Institucional', icon: 'apartment', path: '/institucional' },
  { label: 'Tienda', icon: 'store', external: 'https://mercadolibre.com.ar/pagina/cetclubempleadostelpin' },
  { label: 'Agente IA', icon: 'smart_toy', path: '/agenteia' },
  { label: 'App CET', icon: 'phone_android', path: '/homePerfil' },
];

const isActive = (item: NavItem) => !!item.path && route.path === item.path;

const avatarError = ref(false);

const getInitials = (nombre = '', apellido = '') =>
  `${nombre.charAt(0)}${apellido.charAt(0)}`.trim().toUpperCase() || 'CET';

const profileOptions = computed(() =>
  perfilStore.perfiles.map((perfil, index) => ({
    avatar: perfil.url || '',
    initials: getInitials(perfil.nombre, perfil.apellido),
    label: `${perfil.nombre} ${perfil.apellido}`,
    numeroCliente: perfil.numeroCliente,
    value: index,
  })),
);

const selectedProfile = computed(() => perfilStore.perfiles[perfilStore.perfilIndex] || null);
const selectedProfileName = computed(() =>
  selectedProfile.value ? `${selectedProfile.value.nombre} ${selectedProfile.value.apellido}` : 'Mi perfil',
);
const selectedProfileInitials = computed(() =>
  getInitials(selectedProfile.value?.nombre, selectedProfile.value?.apellido),
);
const selectedProfileAvatar = computed(() =>
  avatarError.value ? '' : (selectedProfile.value?.url || ''),
);

const selectProfile = (index: number) => {
  perfilStore.perfilIndex = index;
  avatarError.value = false;
};

const showProfileControls = computed(() =>
  route.matched.some((record) => record.meta?.requiresAuth)
  && route.path !== '/perfiles'
  && profileOptions.value.length > 0,
);

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

const handleNavClick = (item: NavItem) => {
  if (item.external) {
    goToExternal(item.external);
    return;
  }
  if (item.path) {
    goTo(item.path);
  }
};

const goToDeportes = (deporte: string) => {
  deporteSeleccionado.value = deporte;
  router.push({ name: 'DeportePage', params: { deporte } });
  if ($q.screen.lt.md) { // Close drawer on mobile after navigation
    drawerOpen.value = false;
  }
};

const abrirChat = () => {
  if (isScriptLoaded.value) {
    if (typeof bmShow === 'function') {
      bmShow();
      bmMaximize();
    }
    return;
  }

  const js = document.createElement('script');
  js.type = 'text/javascript';
  js.async = true;
  js.src = 'https://go.botmaker.com/rest/webchat/p/0ULI4UUP6H/init.js';



  // ✅ CAMBIO PRINCIPAL AQUÍ
  js.onload = () => {
    isScriptLoaded.value = true;
    setTimeout(() => {
      if (typeof bmShow === 'function') {
        bmShow();
        bmMaximize();
      } else {
        // Notificación de error si las funciones aún no existen
        $q.notify({
          color: 'negative',
          message: 'Las funciones del chat no se encontraron. Intente de nuevo.',
          icon: 'report_problem'
        });
      }
    }, 100); // 100ms de retardo
  };

  document.body.appendChild(js);
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
.app-header {
  background: var(--color-surface);
  color: var(--color-text);
  box-shadow: var(--shadow-sm);
}

.app-toolbar {
  min-height: 68px;
  gap: 10px;
  padding: 8px 20px;
}

.app-menu-btn {
  color: var(--color-text);
}

.app-brand {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  flex: 0 0 auto;
  width: auto;
}

.app-brand__logo {
  display: block;
  width: auto;
  height: 46px;
  max-width: 46px;
  object-fit: contain;
  image-rendering: auto;
}

.app-brand__text {
  font-weight: 700;
  font-size: 1.2rem;
  letter-spacing: 0.3px;
  color: var(--color-text);
}

.app-nav-desktop {
  display: flex;
  align-items: center;
  gap: 4px;
  margin-left: auto;
}

.app-profile-menu {
  margin-left: 10px;
  width: 46px;
  height: 46px;
  min-height: 46px;
  padding: 0;
  border: 1px solid var(--color-border);
  border-radius: 50%;
  background: #f8fafc;
  color: var(--color-text);
}

.app-profile-menu:hover {
  background: #fff;
  border-color: rgba(37, 99, 235, 0.24);
}

.app-profile-menu__trigger {
  display: grid;
  place-items: center;
  width: 38px;
  height: 38px;
}

.app-profile-avatar,
.app-profile-option__avatar {
  background: var(--color-primary);
  color: #fff;
  font-size: 0.78rem;
  font-weight: 850;
}

.app-profile-menu :deep(.q-btn-dropdown__arrow) {
  display: none;
}

.app-profile-menu :deep(.q-btn__content) {
  width: 100%;
  height: 100%;
}

.app-profile-menu__text {
  display: grid;
  min-width: 0;
  text-align: left;
  line-height: 1.05;
}

.app-profile-menu__eyebrow {
  color: #64748b;
  font-size: 0.66rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.app-profile-menu__text strong {
  max-width: 180px;
  overflow: hidden;
  color: var(--color-text);
  font-size: 0.85rem;
  font-weight: 850;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.app-profile-dropdown {
  min-width: 280px;
  padding: 6px;
}

.app-profile-dropdown__current {
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 2px 2px 8px;
  padding: 10px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  background: #f8fafc;
}

.app-profile-dropdown__current span {
  display: block;
  color: #64748b;
  font-size: 0.68rem;
  font-weight: 850;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.app-profile-dropdown__current strong {
  display: block;
  margin-top: 2px;
  color: var(--color-text);
  font-size: 0.9rem;
  font-weight: 850;
}

.app-profile-dropdown__header {
  color: #64748b;
  font-size: 0.72rem;
  font-weight: 850;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.app-profile-option {
  margin: 2px 0;
  border-radius: var(--radius-sm);
}

.app-profile-option--active {
  background: var(--color-primary-soft);
  color: var(--color-primary);
}

.app-profile-logout-item {
  margin-top: 4px;
  border-radius: var(--radius-sm);
  color: #b91c1c;
  font-weight: 800;
}

.app-nav-btn {
  color: var(--color-text-soft);
  border-radius: var(--radius-sm);
  padding: 8px 14px;
  font-weight: 500;
  transition: color 0.2s, background-color 0.2s;
}

.app-nav-btn:hover {
  color: var(--color-accent);
  background: var(--color-primary-soft);
}

.app-nav-btn--active {
  color: var(--color-primary);
  background: var(--color-primary-soft);
}

@media (max-width: 700px) {
  .app-toolbar {
    padding: 8px 10px;
  }

  .app-profile-menu {
    order: 3;
    width: 46px;
    margin-left: 0;
    border-radius: 50%;
  }

  .app-profile-menu__trigger {
    width: 38px;
    min-width: 0;
  }

  .app-profile-menu__text {
    flex: 1 1 auto;
    min-width: 0;
  }

  .app-profile-menu__text strong {
    max-width: none;
  }
}

@media (min-width: 701px) and (max-width: 1180px) {
  .app-nav-btn {
    padding: 8px 10px;
  }

  .app-profile-menu__trigger {
    min-width: 0;
  }
}

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

.drawer-logo {
  display: block;
  width: auto;
  height: 92px;
  max-width: 92px;
  margin: 16px auto 20px;
  object-fit: contain;
}
</style>
