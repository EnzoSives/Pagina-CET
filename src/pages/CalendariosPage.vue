<template>
  <div class="calendar-wrapper">
    <div class="q-mb-md">
      <p class="text-body1 text-justify">
        Selecciona el calendario que quieras ver. Puedes seleccionar varios calendarios a la vez.
      </p>
      <div class="row q-gutter-sm">
        <q-chip clickable size="15px" @click="toggleAllCalendars" :color="allCalendarsSelected ? 'negative' : 'primary'"
          :text-color="allCalendarsSelected ? 'white' : 'white'">
          {{ allCalendarsSelected ? 'Deseleccionar Todos' : 'Seleccionar Todos' }}
        </q-chip>

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
    label: '🏒 Hockey',
    value: 'c_a0b1f812319255473e611652ef9e574301745e155b24310f938a34f96b323bf9@group.calendar.google.com',
    color: '#33b679', // Verde Salvia
  },
  {
    label: '🏹 Arquería 3D',
    value: 'c_d5378e2b1c72b33e246637c2dfcf682be0d29338bd327c6cac48fa414af5f04c@group.calendar.google.com',
    color: '#039be5', // Azul
  },
  {
    label: '🏃 Running',
    value: 'c_7bac87817576a81ca44e2c423ece4b4fb5db9e13f7916cb77694cb50eddcb_c9e@group.calendar.google.com',
    color: '#f4511e', // Naranja
  },
  {
    label: '🛼 Patín',
    value: 'c_b2b025ba907e97d3a0aabc091f11a7f552ad850e6d3a55ed04dfe6525f6f8cc9@group.calendar.google.com',
    color: '#7986cb', // Lavanda
  },
  {
    label: '🚴 Ciclismo',
    value: 'c_2ee25be99eefee0e48f9582cc52050ac6a2ff4268042875011ee788be9e9ce83@group.calendar.google.com',
    color: '#d50000', // Rojo
  },
  // Mantengo este calendario por si sigue siendo de utilidad general
  {
    label: '🏟️ Uso Cancha CET',
    value: 'c_kct0r8oq4upn8pmtvohbtuuh1o@group.calendar.google.com',
    color: '#616161', // Grafito
  },
  {
    label: '🏒 AAMH Fechas',
    value: 'c_classroom217cc033@group.calendar.google.com',
    color: '#33b679', // Sage
  },
]

// Inicializa selectedCalendars con todos los valores de calendarOptions
const selectedCalendars = ref<string[]>(calendarOptions.map(calendar => calendar.value))

// Determina si todos los calendarios están seleccionados
const allCalendarsSelected = computed(() => {
  return selectedCalendars.value.length === calendarOptions.length
})

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
  const viewMode = 'mode=WEEK' // Puedes cambiar a 'MONTH' o 'AGENDA' si lo prefieres

  return `${base}${params}&${timezone}&${viewMode}`
})

function toggleCalendar(calendarValue: string) {
  const index = selectedCalendars.value.indexOf(calendarValue)

  if (index > -1) {
    // Si ya estaba seleccionado, lo deselecciona
    selectedCalendars.value.splice(index, 1)
  } else {
    // Si no estaba seleccionado, lo añade
    selectedCalendars.value.push(calendarValue)
  }
}

function toggleAllCalendars() {
  if (allCalendarsSelected.value) {
    // Si todos están seleccionados, deselecciona todos
    selectedCalendars.value = []
  } else {
    // Si no todos están seleccionados, selecciona todos
    selectedCalendars.value = calendarOptions.map(calendar => calendar.value)
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