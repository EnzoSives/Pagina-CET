<template>
  <div class="deportes-list">
    <div class="deportes-list__glow deportes-list__glow--one" aria-hidden="true"></div>
    <div class="deportes-list__glow deportes-list__glow--two" aria-hidden="true"></div>

    <!-- Navegación rápida por disciplina -->
    <div class="deportes-nav">
      <button v-for="(sport, index) in sports" :key="`nav-${sport.title}`" type="button" class="deportes-nav__chip"
        @click="scrollToSport(index)">
        <q-icon :name="sport.icon" size="18px" />
        <span>{{ sport.title }}</span>
      </button>
    </div>

    <div class="column q-gutter-xl">
      <div v-for="(sport, index) in sports" :key="sport.title" :ref="(el) => setRowRef(el, index)"
        class="sport-section reveal" :class="{ 'sport-section--reverse': index % 2 === 1 }"
        :style="{ '--sport-accent': sport.accent }">
        <div class="sport-card">
          <!-- Imagen -->
          <div class="sport-image">
            <img
              class="sport-image__media"
              :src="sport.image"
              :alt="`${sport.title}: actividad deportiva del CET Pinamar`"
              :style="{ objectPosition: sport.imagePosition }"
              loading="lazy"
            />
            <div class="sport-image__gradient"></div>
            <div class="sport-image__badge">
              <q-icon :name="sport.icon" size="24px" />
            </div>
            <div class="sport-image__caption">
              <span>CET Pinamar</span>
              <span>Deporte & comunidad</span>
            </div>
          </div>

          <!-- Contenido -->
          <div class="sport-content">
            <div class="sport-kicker">
              <span class="sport-kicker__line"></span>
              <span class="sport-eyebrow">Actividad deportiva</span>
            </div>

            <h2 class="text-h3 q-mb-md text-weight-bolder text-primary">
              {{ sport.title }}
            </h2>

            <div class="schedule-chip q-mb-md">
              <q-icon name="schedule" size="18px" />
              <span class="text-weight-medium">{{ sport.schedule }}</span>
            </div>

            <p class="text-body1 q-mb-xl text-grey-800">{{ sport.description }}</p>

            <div class="sport-actions">
              <div class="sport-links">
                <q-btn unelevated class="app-btn sport-btn sport-link" label="Pagar" icon-right="open_in_new"
                  :href="'https://miclub.cetpinamar.com.ar/#/pagar'" target="_blank" />
                <a class="app-btn app-btn--secondary sport-link"
                  href="https://docs.google.com/forms/d/e/1FAIpQLSd8c8tQjiLs01-gDbRoET4kdYYyxzAhbO-BI8vqkOrolAMENg/viewform"
                  target="_blank">Alta <q-icon name="open_in_new" size="16px" /></a>
                <a class="app-btn app-btn--secondary sport-link"
                  href="https://docs.google.com/forms/d/e/1FAIpQLSfpUwZ7Wj20XL-Le_kER63u6zCxT5j3gT1gJYQLZDGk4398xA/viewform"
                  target="_blank">Baja <q-icon name="open_in_new" size="16px" /></a>
                <button type="button" class="app-btn app-btn--secondary sport-link" @click="verFicha(sport.title)">
                  Ver ficha completa
                  <q-icon name="arrow_forward" size="16px" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import type { ComponentPublicInstance } from 'vue'
import { useRouter } from 'vue-router'

const base = process.env.BASE_URL || '/'
const router = useRouter()

interface Sport {
  title: string
  schedule: string
  description: string
  image: string
  icon: string
  accent: string
  imagePosition?: string
}

const sports: Sport[] = [
  {
    title: 'Hockey',
    schedule: 'Lunes a jueves, de 17 a 19:30 hs.',
    description:
      'Participación en el torneo de la ASOCIACIÓN AMATEUR MARPLATENSE DE HOCKEY (AAMH).',
    image: '/imgs/hockey.webp',
    imagePosition: 'center 42%',
    icon: 'sports_hockey',
    accent: '#1D4ED8',
  },
  {
    title: 'Patin',
    schedule: 'Consultar Horarios',
    description: 'Patin artístico federado en todas sus categorías.',
    image: `${base}imgs/Patin.jpeg`,
    imagePosition: 'center 32%',
    icon: 'roller_skating',
    accent: '#BE185D',
  },
  {
    title: 'Ciclismo',
    schedule: 'Consultar Horarios',
    description:
      'Circuito MTB para todos los niveles. (Bike Park). Grupos de ciclismo inicial, recreativo y entrenamiento.Alquiler de bicicletas.Parador MTB',
    image: '/imgs/ciclismo.webp',
    imagePosition: 'center 45%',
    icon: 'directions_bike',
    accent: '#15803D',
  },
  {
    title: 'Arquería3D',
    schedule: 'Consultar Horarios',
    description:
      'Clases de arquería para todas las edades. Participación en torneos locales y nacionales.',
    image: `${base}imgs/Arqueria4.jpeg`,
    imagePosition: 'center 42%',
    icon: 'gps_fixed',
    accent: '#C2410C',
  },
  /*
  {
    title: 'Running',
    schedule: 'Lunes, miércoles y viernes - 8hs / 19hs (8 hs. o 19 hs.).',
    description: 'Lo importante es moverse y disfrutar, no el nivel. 15 años en adelante ',
    image:
      'https://images.unsplash.com/photo-1571008887538-b36bb32f4571?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    imagePosition: 'center 40%',
    icon: 'directions_run',
    accent: '#0369A1',
  },
  */
]

const verFicha = (deporte: string) => {
  router.push({ name: 'DeportePage', params: { deporte } })
}

const rowRefs = ref<Record<number, HTMLElement>>({})

const setRowRef = (el: Element | ComponentPublicInstance | null, index: number) => {
  if (el instanceof HTMLElement) {
    rowRefs.value[index] = el
  }
}

const scrollToSport = (index: number) => {
  rowRefs.value[index]?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

let observer: IntersectionObserver | null = null

onMounted(() => {
  const targets = Object.values(rowRefs.value)

  if (!('IntersectionObserver' in window) || targets.length === 0) {
    targets.forEach((el) => el.classList.add('is-visible'))
    return
  }

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer?.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.15 },
  )

  targets.forEach((el) => observer?.observe(el))
})

onBeforeUnmount(() => {
  observer?.disconnect()
})
</script>

<style scoped>
.deportes-list {
  position: relative;
  padding: 0;
  isolation: isolate;
  max-width: 100%;
  overflow: hidden;
}

.deportes-list__glow {
  position: absolute;
  z-index: -1;
  width: 420px;
  height: 420px;
  border-radius: 50%;
  filter: blur(90px);
  opacity: 0.13;
  pointer-events: none;
}

.deportes-list__glow--one {
  top: 7%;
  right: -180px;
  background: var(--color-primary);
}

.deportes-list__glow--two {
  bottom: 12%;
  left: -190px;
  background: var(--color-accent);
}

/* Navegación rápida */
.deportes-nav {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
  margin: 0 auto 44px;
  padding: 8px;
  width: fit-content;
  max-width: 100%;
  border: 1px solid rgba(148, 163, 184, 0.22);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.68);
  box-shadow: 0 12px 35px rgba(15, 23, 42, 0.07);
  backdrop-filter: blur(18px);
}

.deportes-nav__chip {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 12px 10px 16px;
  border-radius: 999px;
  border: 1px solid transparent;
  background: transparent;
  color: var(--color-text-soft);
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.25s ease;
}

.deportes-nav__chip:hover {
  color: var(--color-primary);
  border-color: color-mix(in srgb, var(--color-primary) 20%, transparent);
  background: var(--color-surface);
  box-shadow: 0 6px 18px rgba(37, 99, 235, 0.12);
  transform: translateY(-1px);
}

/* Reveal al hacer scroll */
.reveal {
  opacity: 0;
  transform: translateY(28px);
  transition: opacity 0.7s ease, transform 0.7s ease;
  scroll-margin-top: 100px;
}

.reveal.is-visible {
  opacity: 1;
  transform: translateY(0);
}

.sport-section {
  padding: 0;
}

.sport-card {
  display: grid;
  grid-template-columns: minmax(0, 1.08fr) minmax(380px, 0.92fr);
  min-height: 430px;
  overflow: hidden;
  border: 1px solid rgba(148, 163, 184, 0.2);
  border-radius: 28px;
  background: rgba(255, 255, 255, 0.88);
  box-shadow: 0 24px 70px rgba(15, 23, 42, 0.1), 0 2px 8px rgba(15, 23, 42, 0.05);
  transition: transform 0.35s ease, box-shadow 0.35s ease, border-color 0.35s ease;
}

.sport-card:hover {
  transform: translateY(-6px);
  border-color: color-mix(in srgb, var(--sport-accent) 28%, transparent);
  box-shadow: 0 32px 90px rgba(15, 23, 42, 0.14), 0 8px 24px color-mix(in srgb, var(--sport-accent) 12%, transparent);
}

.sport-section--reverse .sport-image {
  grid-column: 2;
}

.sport-section--reverse .sport-content {
  grid-column: 1;
  grid-row: 1;
}

.sport-image {
  position: relative;
  min-width: 0;
  min-height: 430px;
  overflow: hidden;
  z-index: 1;
}

.sport-image__media {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
  filter: brightness(0.9) contrast(1.1);
  transform: scale(1.05);
  transition: transform 0.5s ease;
}

.sport-image:hover .sport-image__media {
  transform: scale(1.12);
}

.sport-image__gradient {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(140px 140px at calc(100% - 70px) 70px, rgba(8, 12, 28, 0.55), transparent 72%),
    linear-gradient(180deg, rgba(15, 23, 42, 0.02) 25%, rgba(15, 23, 42, 0.72) 100%);
  pointer-events: none;
}

.sport-image__badge {
  position: absolute;
  left: 24px;
  top: 24px;
  width: 50px;
  height: 50px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  background: color-mix(in srgb, var(--sport-accent) 68%, rgba(255, 255, 255, 0.18));
  border: 1px solid rgba(255, 255, 255, 0.28);
  box-shadow: 0 12px 28px rgba(15, 23, 42, 0.22);
  backdrop-filter: blur(12px);
}

.sport-image__caption {
  position: absolute;
  right: 24px;
  bottom: 24px;
  left: 24px;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 16px;
  color: #fff;
  font-size: 0.74rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.sport-image__caption span:last-child {
  color: rgba(255, 255, 255, 0.68);
  font-weight: 600;
}

.sport-content {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-width: 0;
  padding: clamp(38px, 4vw, 64px);
  background:
    linear-gradient(135deg, color-mix(in srgb, var(--sport-accent) 5%, transparent), transparent 45%),
    rgba(255, 255, 255, 0.92);
}

.sport-content p {
  max-width: 58ch;
  line-height: 1.65;
}

.sport-content h2 {
  margin-top: 0;
  color: var(--color-text) !important;
  font-size: clamp(2rem, 3.2vw, 3rem);
  line-height: 1.05;
  letter-spacing: -0.035em;
}

.sport-eyebrow {
  display: inline-block;
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 1.2px;
  text-transform: uppercase;
  color: var(--sport-accent);
  margin: 0;
}

.sport-kicker {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 14px;
}

.sport-kicker__line {
  width: 28px;
  height: 2px;
  border-radius: 999px;
  background: var(--sport-accent);
}

.schedule-chip {
  display: inline-flex;
  align-self: flex-start;
  align-items: center;
  gap: 8px;
  padding: 9px 14px;
  border-radius: 999px;
  background: color-mix(in srgb, var(--sport-accent) 10%, white);
  border: 1px solid color-mix(in srgb, var(--sport-accent) 18%, transparent);
  color: var(--sport-accent);
}

.sport-btn {
  background: var(--sport-accent);
  color: #fff;
  box-shadow: 0 8px 18px color-mix(in srgb, var(--sport-accent) 30%, transparent);
}

.sport-btn:hover {
  box-shadow: 0 12px 24px color-mix(in srgb, var(--sport-accent) 40%, transparent);
}

.sport-actions {
  margin-top: auto;
}

.sport-links {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 8px;
  width: 100%;
}

.sport-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  min-height: 34px;
  padding: 0 12px;
  font-size: 0.78rem;
  font-weight: 700;
  text-decoration: none;
  cursor: pointer;
  white-space: nowrap;
}

@media (max-width: 1050px) and (min-width: 769px) {
  .sport-card {
    grid-template-columns: minmax(0, 1fr) minmax(330px, 0.92fr);
  }

  .sport-content {
    padding: 34px;
  }
}

@media (max-width: 768px) {
  .deportes-nav {
    justify-content: flex-start;
    overflow-x: auto;
    overflow-y: hidden;
    flex-wrap: nowrap;
    width: 100%;
    max-width: 100%;
    padding: 7px;
    border-radius: 20px;
    margin-bottom: 28px;
    scrollbar-width: none;
    -webkit-overflow-scrolling: touch;
  }

  .deportes-nav::-webkit-scrollbar {
    display: none;
  }

  .deportes-nav__chip {
    flex: 0 0 auto;
  }

  .sport-card {
    display: flex;
    flex-direction: column;
    min-height: 0;
  }

  .sport-section--reverse .sport-card {
    flex-direction: column;
  }

  .sport-image {
    width: 100%;
    min-height: 0;
    aspect-ratio: 16 / 10;
  }

  .sport-content {
    width: 100%;
    padding: 24px 20px 28px;
  }

  .sport-actions {
    margin-top: 0;
  }

  .sport-links {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .sport-link {
    width: 100%;
  }

  .text-h3 {
    font-size: 1.5rem;
  }

  .text-body1 {
    font-size: 1rem;
    line-height: 1.5;
  }

  .sport-section {
    padding: 0;
  }

  .sport-card:hover {
    transform: none;
  }
}

@media (max-width: 420px) {
  .sport-image {
    aspect-ratio: 4 / 3;
  }

  .sport-content {
    padding: 22px 16px 24px;
  }

  .sport-links {
    grid-template-columns: 1fr;
  }
}
</style>
