<template>
  <q-card class="q-mt-md shadow-2">
    <q-card-section>
      <div class="text-h6 text-primary">Horarios</div>
    </q-card-section>
    <q-separator />
    <q-card-section class="q-pa-none">
      <iframe
        :src="calendarUrl"
        style="border: 0; width: 100%; height: 400px"
        frameborder="0"
        scrolling="no"
      ></iframe>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
// import { defineProps, computed } from 'vue'

// const props = defineProps<{ deporte: string }>()

const calendarUrl =
  'https://calendar.google.com/calendar/embed?' +
  'src=c_kct0r8oq4upn8pmtvohbtuuh1o%40group.calendar.google.com' +
  '&src=c_classroom217cc033%40group.calendar.google.com' +
  '&src=c_d5378e2b1c72b33e246637c2dfcf682be0d29338bd327c6cac48fa414af5f04c%40group.calendar.google.com' +
  '&ctz=America%2FArgentina%2FBuenos_Aires'

// const calendarUrls: Record<string, string> = {
//   Patin:
//     'https://calendar.google.com/calendar/embed?src=enzosives7%40gmail.com&ctz=America%2FArgentina%2FBuenos_Aires',
//   Hockey:
//     'https://calendar.google.com/calendar/embed?src=enzosives7%40gmail.com&ctz=America%2FArgentina%2FBuenos_Aires',
//   Ciclismo:
//     'https://calendar.google.com/calendar/embed?src=enzosives7%40gmail.com&ctz=America%2FArgentina%2FBuenos_Aires',
//   Running:
//     'https://calendar.google.com/calendar/embed?src=enzosives7%40gmail.com&ctz=America%2FArgentina%2FBuenos_Aires',
//   Arqueria:
//     'https://calendar.google.com/calendar/embed?src=enzosives7%40gmail.com&ctz=America%2FArgentina%2FBuenos_Aires',
// }

// const calendarUrl = computed(() => calendarUrls[props.deporte] || '')
</script>
