<template>
    <div class="calendar-wrapper">
        <q-select v-model="selectedCalendar" :options="calendarOptions" label="Seleccioná un calendario" emit-value
            map-options class="q-mb-md" filled />
        <div class="calendar-container">
            <iframe :src="selectedCalendar" style="border: 0" frameborder="0" scrolling="no" allowfullscreen></iframe>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const calendarOptions = [
    {
        label: 'USO Cancha CET',
        value:
            'https://calendar.google.com/calendar/embed?src=c_kct0r8oq4upn8pmtvohbtuuh1o%40group.calendar.google.com&ctz=America%2FArgentina%2FBuenos_Aires',
    },
    {
        label: 'AAMH Fechas',
        value:
            'https://calendar.google.com/calendar/embed?src=c_classroom217cc033%40group.calendar.google.com&ctz=America%2FArgentina%2FBuenos_Aires',
    },
    {
        label: 'Arquería',
        value:
            'https://calendar.google.com/calendar/embed?src=c_d5378e2b1c72b33e246637c2dfcf682be0d29338bd327c6cac48fa414af5f04c%40group.calendar.google.com&ctz=America%2FArgentina%2FBuenos_Aires',
    },
]

const selectedCalendar = ref(calendarOptions[0].value)
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