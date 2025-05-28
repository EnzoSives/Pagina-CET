<template>
  <div class="calendar-wrapper">
    <div class="q-mb-md">
      <p class="text-body1 text-justify">
        Selecciona el calendario que quieras ver. Puedes seleccionar varios calendarios a la vez.
      </p>
      <div class="row q-gutter-sm">
        <q-chip v-for="calendar in calendarOptions" :key="calendar.value" clickable size="15px"
          :selected="selectedCalendars.includes(calendar.value)" @click="toggleCalendar(calendar.value)"
          :color="selectedCalendars.includes(calendar.value) ? 'primary' : 'grey-4'"
          :text-color="selectedCalendars.includes(calendar.value) ? 'white' : 'black'">
          {{ calendar.label }}
        </q-chip>
      </div>
    </div>

    <div class="calendar-container">
      <iframe v-if="combinedCalendarUrl" :src="combinedCalendarUrl" style="border: 0" frameborder="0" scrolling="no"
        allowfullscreen></iframe>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

const calendarOptions = [
  {
    label: 'USO Cancha CET',
    value: 'c_kct0r8oq4upn8pmtvohbtuuh1o@group.calendar.google.com',
    color: '#f4511e', // Tangerine
  },
  {
    label: 'AAMH Fechas',
    value: 'c_classroom217cc033@group.calendar.google.com',
    color: '#33b679', // Sage
  },
  {
    label: 'Arquería',
    value: 'c_d5378e2b1c72b33e246637c2dfcf682be0d29338bd327c6cac48fa414af5f04c@group.calendar.google.com',
    color: '#039be5', // Peacock
  },
]



const selectedCalendars = ref<string[]>(
  calendarOptions[0] ? [calendarOptions[0].value] : [], // el primer calendario si existe
)

// Genera la URL combinada
const combinedCalendarUrl = computed(() => {
  if (selectedCalendars.value.length === 0) return ''

  const base = 'https://calendar.google.com/calendar/embed?'
  const params = selectedCalendars.value
    .map((calendarId) => {
      const calendar = calendarOptions.find((c) => c.value === calendarId)
      const colorParam = calendar?.color ? `&color=${encodeURIComponent(calendar.color)}` : ''
      return `src=${encodeURIComponent(calendarId)}${colorParam}`
    })
    .join('&')

  const timezone = 'ctz=America%2FArgentina%2FBuenos_Aires'
  const viewMode = 'mode=WEEK'

  return `${base}${params}&${timezone}&${viewMode}`
})


function toggleCalendar(calendarValue: string) {
  const index = selectedCalendars.value.indexOf(calendarValue)

  if (index > -1) {
    // Si ya estaba seleccionado y hay más de uno, lo deselecciona
    if (selectedCalendars.value.length > 1) {
      selectedCalendars.value.splice(index, 1)
    }
  } else {
    selectedCalendars.value.push(calendarValue)
  }
}
</script>

<style scoped>
.calendar-wrapper {
  padding: 100px 20px 20px;
  max-width: 1400px;
  margin: auto;
}

.calendar-container {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  margin-bottom: 20px;
}

.calendar-container iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

@media (max-width: 768px) {
  .calendar-wrapper {
    padding-top: 60px;
  }

  .calendar-container {
    aspect-ratio: 4 / 3;
  }
}
</style>
