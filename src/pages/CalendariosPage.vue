<template>
  <q-page class="calendar-page">
    <div class="calendar-content">
      <section class="calendar-board">
        <header class="calendar-board__header">
          <div class="calendar-board__title">
          <span class="calendar-eyebrow">Agenda CET</span>
          <h1>Calendarios</h1>
          <p>
              Elegí una o más actividades y consultá la agenda semanal del club.
          </p>
        </div>

        <div class="calendar-status">
          <strong>{{ selectedCalendars.length }} / {{ calendarOptions.length }}</strong>
            <span>{{ allCalendarsSelected ? 'Vista completa' : 'Vista personalizada' }}</span>
        </div>

        <q-btn
          :label="allCalendarsSelected ? 'Deseleccionar todos' : 'Seleccionar todos'"
          :icon="allCalendarsSelected ? 'visibility_off' : 'done_all'"
          unelevated
          no-caps
          class="app-btn calendar-toggle-button"
          :class="allCalendarsSelected ? 'app-btn--secondary' : 'app-btn--primary'"
          @click="toggleAllCalendars"
        />
        </header>

        <div class="calendar-filters" aria-label="Filtros de calendario">
          <button
            v-for="calendar in calendarOptions"
            :key="calendar.value"
            type="button"
            class="calendar-filter"
            :class="{ 'calendar-filter--active': selectedCalendars.includes(calendar.value) }"
            @click="toggleCalendar(calendar.value)"
          >
            <span class="calendar-filter__dot" :style="{ backgroundColor: calendar.color }" />
            <span>{{ calendar.label }}</span>
            <q-icon
              :name="selectedCalendars.includes(calendar.value) ? 'check_circle' : 'radio_button_unchecked'"
              size="18px"
            />
          </button>
        </div>
      </section>

      <section class="calendar-view">
        <div class="calendar-view__header">
          <div>
            <span class="calendar-eyebrow">Vista semanal</span>
            <h2>Agenda de actividades</h2>
          </div>
          <p>Si no aparece nada, seleccioná al menos un calendario.</p>
        </div>

        <div class="calendar-frame">
          <iframe
            v-if="combinedCalendarUrl"
            :src="combinedCalendarUrl"
            title="Calendario de actividades CET"
            frameborder="0"
            scrolling="no"
            allowfullscreen
          />

          <div v-else class="calendar-empty">
            <q-icon name="event_busy" size="42px" />
            <h3>No hay calendarios seleccionados</h3>
            <p>Elegí una actividad o usá “Seleccionar todos” para volver a la agenda completa.</p>
          </div>
        </div>
      </section>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

const calendarOptions = [
  {
    label: 'Hockey',
    value: 'c_a0b1f812319255473e611652ef9e574301745e155b24310f938a34f96b323bf9@group.calendar.google.com',
    color: '#33b679',
  },
  {
    label: 'Arquería 3D',
    value: 'c_d5378e2b1c72b33e246637c2dfcf682be0d29338bd327c6cac48fa414af5f04c@group.calendar.google.com',
    color: '#039be5',
  },
  /*
  {
    label: 'Running',
    value: 'c_7bac87817576a81ca44e2c423ece4b4fb5db9e13f7916cb77694cb50eddcb_c9e@group.calendar.google.com',
    color: '#f4511e',
  },
  */
  {
    label: 'Patín',
    value: 'c_b2b025ba907e97d3a0aabc091f11a7f552ad850e6d3a55ed04dfe6525f6f8cc9@group.calendar.google.com',
    color: '#7986cb',
  },
  {
    label: 'Ciclismo',
    value: 'c_2ee25be99eefee0e48f9582cc52050ac6a2ff4268042875011ee788be9e9ce83@group.calendar.google.com',
    color: '#d50000',
  },
  {
    label: 'Uso Cancha CET',
    value: 'c_kct0r8oq4upn8pmtvohbtuuh1o@group.calendar.google.com',
    color: '#616161',
  },
  {
    label: 'USO Quincho CET',
    value: 'c_b1d8617707db00362f63eb7151d18bdc135cc13d1f9694a7d0161caf91b7b232@group.calendar.google.com',
    color: '#8e24aa',
  },
  {
    label: 'AAMH Fechas',
    value: 'c_classroom217cc033@group.calendar.google.com',
    color: '#33b679',
  },
]

const selectedCalendars = ref<string[]>(calendarOptions.map(calendar => calendar.value))

const allCalendarsSelected = computed(() => selectedCalendars.value.length === calendarOptions.length)

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
    selectedCalendars.value.splice(index, 1)
  } else {
    selectedCalendars.value.push(calendarValue)
  }
}

function toggleAllCalendars() {
  if (allCalendarsSelected.value) {
    selectedCalendars.value = []
  } else {
    selectedCalendars.value = calendarOptions.map(calendar => calendar.value)
  }
}
</script>

<style scoped>
.calendar-page {
  min-height: 100%;
  padding: 0 0 64px;
  background: var(--surface-bg);
  color: var(--color-text);
}

.calendar-content {
  width: 100%;
  max-width: none;
  margin: 0;
  padding: 22px clamp(12px, 2vw, 24px) 0;
}

.calendar-board {
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  background: var(--color-surface);
  overflow: hidden;
}

.calendar-board__header {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto auto;
  gap: 14px;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid var(--color-border);
}

.calendar-eyebrow {
  display: inline-block;
  margin-bottom: 6px;
  color: #64748b;
  font-size: 0.74rem;
  font-weight: 850;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.calendar-board__title h1 {
  margin: 0;
  color: var(--color-text);
  font-size: clamp(1.8rem, 4vw, 3rem);
  font-weight: 850;
  letter-spacing: -0.04em;
  line-height: 1;
}

.calendar-board__title p {
  max-width: 620px;
  margin: 8px 0 0;
  color: var(--color-text-soft);
  font-size: 0.98rem;
  line-height: 1.45;
}

.calendar-status {
  display: flex;
  align-items: baseline;
  gap: 8px;
  min-height: 40px;
  padding: 8px 13px;
  border-radius: var(--radius-sm);
  background: #f8fafc;
  white-space: nowrap;
}

.calendar-status span {
  color: #64748b;
  font-size: 0.82rem;
  font-weight: 850;
}

.calendar-status strong {
  color: var(--color-text);
  font-size: 1.25rem;
  font-weight: 850;
  letter-spacing: -0.04em;
  line-height: 1;
}

.calendar-view__header h2 {
  margin: 0;
  color: var(--color-text);
  font-size: clamp(1.35rem, 3vw, 2rem);
  font-weight: 850;
  letter-spacing: -0.035em;
  line-height: 1.1;
}

.calendar-toggle-button {
  min-height: 40px;
  padding: 0 18px;
  white-space: nowrap;
}

.calendar-filters {
  display: grid;
  grid-template-columns: repeat(7, minmax(0, 1fr));
  gap: 10px;
  padding: 12px;
}

.calendar-filter {
  display: grid;
  grid-template-columns: 10px minmax(0, 1fr) 18px;
  gap: 10px;
  align-items: center;
  min-height: 46px;
  padding: 10px 12px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  background: var(--color-surface);
  color: var(--color-text-soft);
  font: inherit;
  font-size: 0.9rem;
  font-weight: 800;
  text-align: left;
  cursor: pointer;
  transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease, color 0.2s ease;
}

.calendar-filter:hover {
  transform: translateY(-2px);
  border-color: rgba(37, 99, 235, 0.26);
  box-shadow: var(--shadow-sm);
}

.calendar-filter--active {
  border-color: rgba(37, 99, 235, 0.32);
  background: #f8fbff;
  color: var(--color-text);
}

.calendar-filter__dot {
  width: 10px;
  height: 10px;
  border-radius: 999px;
}

.calendar-filter .q-icon {
  color: #94a3b8;
}

.calendar-filter--active .q-icon {
  color: var(--color-primary);
}

.calendar-view {
  margin-top: 16px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  background: var(--color-surface);
  overflow: hidden;
}

.calendar-view__header {
  display: flex;
  gap: 16px;
  align-items: end;
  justify-content: space-between;
  padding: 16px 20px 14px;
  border-bottom: 1px solid var(--color-border);
}

.calendar-view__header p {
  max-width: 360px;
  margin: 0;
  color: var(--color-text-soft);
  font-size: 0.92rem;
  line-height: 1.45;
  text-align: right;
}

.calendar-frame {
  position: relative;
  width: 100%;
  height: clamp(680px, 82vh, 920px);
  background: #f8fafc;
}

.calendar-frame iframe {
  display: block;
  width: 100%;
  height: 100%;
  border: 0;
}

.calendar-empty {
  display: grid;
  place-items: center;
  align-content: center;
  gap: 8px;
  width: 100%;
  height: 100%;
  padding: 28px;
  color: var(--color-text-soft);
  text-align: center;
}

.calendar-empty .q-icon {
  color: #94a3b8;
}

.calendar-empty h3 {
  margin: 8px 0 0;
  color: var(--color-text);
  font-size: 1.25rem;
  font-weight: 850;
}

.calendar-empty p {
  max-width: 420px;
  margin: 0;
  line-height: 1.5;
}

@media (max-width: 1180px) {
  .calendar-filters {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}

@media (max-width: 900px) {
  .calendar-board__header {
    grid-template-columns: 1fr;
    align-items: stretch;
  }

  .calendar-view__header {
    align-items: stretch;
    flex-direction: column;
  }

  .calendar-toggle-button {
    width: 100%;
  }

  .calendar-view__header p {
    max-width: none;
    text-align: left;
  }
}

@media (max-width: 640px) {
  .calendar-content {
    padding: 18px 10px 0;
  }

  .calendar-board__header,
  .calendar-view__header {
    padding: 18px;
  }

  .calendar-filters {
    grid-template-columns: 1fr;
  }

  .calendar-frame {
    height: 680px;
  }
}
</style>
