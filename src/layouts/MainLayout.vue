<template>
  <q-layout view="lHh Lpr lFf">


    <!-- <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header> Essential Links </q-item-label>

        <EssentialLink v-for="link in linksList" :key="link.title" v-bind="link" />
      </q-list>
    </q-drawer> -->


    <q-page-container style="background-color: black;">
      <router-view />

    </q-page-container>
    <q-footer class="bg-dark text-white">
      <q-card flat class="q-pa-md text-white bg-dark">
        <q-card-section>
          <div class="text-h6">CET - Club Empleados Telpin</div>
          <div class="text-subtitle2">© 2024 Todos los derechos reservados.</div>
        </q-card-section>
        <q-card-section>
          <div class="row items-center">
            <q-btn flat icon="facebook" aria-label="Facebook"  />
            <q-btn flat icon="twitter" aria-label="Twitter"  />
            <q-btn flat icon="instagram" aria-label="Instagram"  />
            <q-btn flat icon="linkedin" aria-label="LinkedIn" />
          </div>
        </q-card-section>
      </q-card>
    </q-footer>
  </q-layout>
</template>

<script setup lang="ts">
// import { ref } from 'vue'
// import EssentialLink, { type EssentialLinkProps } from 'components/EssentialLink.vue'

// const linksList: EssentialLinkProps[] = [
//   {
//     title: 'Docs',
//     caption: 'quasar.dev',
//     icon: 'school',
//     link: 'https://quasar.dev',
//   },
//   {
//     title: 'Github',
//     caption: 'github.com/quasarframework',
//     icon: 'code',
//     link: 'https://github.com/quasarframework',
//   },
//   {
//     title: 'Discord Chat Channel',
//     caption: 'chat.quasar.dev',
//     icon: 'chat',
//     link: 'https://chat.quasar.dev',
//   },
//   {
//     title: 'Forum',
//     caption: 'forum.quasar.dev',
//     icon: 'record_voice_over',
//     link: 'https://forum.quasar.dev',
//   },
//   {
//     title: 'Twitter',
//     caption: '@quasarframework',
//     icon: 'rss_feed',
//     link: 'https://twitter.quasar.dev',
//   },
//   {
//     title: 'Facebook',
//     caption: '@QuasarFramework',
//     icon: 'public',
//     link: 'https://facebook.quasar.dev',
//   },
//   {
//     title: 'Quasar Awesome',
//     caption: 'Community Quasar projects',
//     icon: 'favorite',
//     link: 'https://awesome.quasar.dev',
//   },
// ]

// const leftDrawerOpen = ref(false)

// function toggleLeftDrawer() {
//   leftDrawerOpen.value = !leftDrawerOpen.value
// }
</script>
