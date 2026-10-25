<template>
  <q-page class="index-page">
    <!-- Sección Hero -->
    <section class="hero-section" :style="{ backgroundImage: 'url(/imgs/imagen-cet.webp)' }">
      <div class="hero-blobs" aria-hidden="true">
        <span class="blob blob--one"></span>
        <span class="blob blob--two"></span>
      </div>
      <div class="hero-overlay"></div>

      <div class="hero-content">
        <div class="hero-eyebrows">
          <button type="button" class="hero-eyebrow hero-eyebrow--link" @click="goToColonia">
            <q-icon name="wb_sunny" size="18px" />
            Colonia de verano 2027
            <q-icon name="arrow_forward" size="16px" />
          </button>
        </div>

        <h1 class="hero-title">
          PINAMAR-CET
        </h1>
        <p class="hero-subtitle">Deporte, comunidad y beneficios para socios, todo el año.</p>

        <div class="hero-actions">
          <q-btn class="app-btn app-btn--primary hero-btn" label="Iniciar sesión" unelevated @click="goToLogin()"
            icon-right="login" />
          <q-btn class="app-btn app-btn--ghost hero-btn" label="Ser socio" outline
            :href="'https://docs.google.com/forms/d/e/1FAIpQLSd8c8tQjiLs01-gDbRoET4kdYYyxzAhbO-BI8vqkOrolAMENg/viewform'"
            target="_blank" icon-right="person_add" />
          <q-btn class="app-btn app-btn--ghost hero-btn" label="Beneficios" outline @click="goToBeneficios()"
            icon-right="star" />
          <q-btn class="app-btn app-btn--ghost hero-btn" label="Calendarios" outline @click="goToCalendario"
            icon-right="event" />
        </div>
      </div>
    </section>

    <!-- Tira de features flotante -->
    <section ref="featuresRef" class="features-strip reveal">
      <div class="features-card">
        <div v-for="feature in features" :key="feature.title" class="feature-item">
          <div class="feature-icon">
            <q-icon :name="feature.icon" size="26px" />
          </div>
          <div class="feature-text">
            <div class="feature-title">{{ feature.title }}</div>
            <div class="feature-desc">{{ feature.desc }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Actividades -->
    <section ref="actividadesRef" class="section reveal">
      <div class="section-header">
        <span class="section-eyebrow">Vida en movimiento</span>
        <h2 class="section-title">Nuestras Actividades Principales</h2>
        <p class="section-subtitle">Elegí tu disciplina y sumate a nuestra comunidad deportiva.</p>
      </div>
      <DeportesComponent></DeportesComponent>
    </section>

    <!-- Colonia de verano -->
    <section ref="coloniaRef" class="section reveal">
      <div class="colonia-promo">
        <div class="colonia-promo__copy">
          <span class="section-eyebrow">Verano 2027</span>
          <h2 class="section-title">Colonia de vacaciones</h2>
          <p class="section-subtitle">
            Multideportiva y recreativa para chicos de 3 a 12 años, al aire libre y rodeados de naturaleza.
          </p>
          <q-btn class="app-btn app-btn--primary colonia-promo__btn" label="Ver la colonia" icon-right="arrow_forward"
            unelevated no-caps @click="goToColonia" />
        </div>
        <img class="colonia-promo__img" :src="`${base}imgs/colonia2.webp`" alt="Colonia de vacaciones, verano 2027"
          loading="lazy" />
      </div>
    </section>

    <!-- Galería -->
    <section ref="galeriaRef" class="section galeriaContent reveal">
      <div class="section-header">
        <span class="section-eyebrow">Conocé el predio</span>
        <h2 class="section-title">Nuestro Espacio</h2>
        <p class="section-subtitle">Instalaciones pensadas para disfrutar en familia.</p>
      </div>

      <!-- Galería Grid para pantallas grandes -->
      <div v-if="!isMobile" class="gallery-grid">
        <div v-for="(image, index) in images" :key="`grid-${index}`" :class="['gallery-item', `item-${index + 1}`]">
          <img :src="image" class="gallery-item__img" />
          <div class="gallery-item__overlay"></div>
        </div>
      </div>

      <!-- Swiper Carousel mejorado para móviles -->
      <div v-else class="mobile-gallery-container">
        <swiper :modules="[Pagination, Navigation]" :slides-per-view="1" :space-between="20"
          :pagination="{ clickable: true }" :navigation="true" class="mobile-swiper">
          <swiper-slide v-for="(image, index) in images" :key="index" class="mobile-swiper-slide">
            <img :src="image" class="carousel-image" />
          </swiper-slide>
        </swiper>
      </div>
    </section>
  </q-page>
</template>

<script setup lang="ts">
import DeportesComponent from 'components/DeportesComponet.vue'
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Pagination, Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

const router = useRouter()

// Estado para saber si estamos en modo móvil
const isMobile = ref(false)

const base = process.env.BASE_URL || '/'

// Función para verificar si estamos en modo móvil
const checkIfMobile = () => {
  isMobile.value = window.innerWidth <= 768 // Considerar móvil si la pantalla es de 768px o menor
}

// Función para manejar el redimensionamiento de la ventana
const handleResize = () => {
  checkIfMobile()
}

// Refs de las secciones que se animan al entrar en pantalla
const featuresRef = ref<HTMLElement | null>(null)
const actividadesRef = ref<HTMLElement | null>(null)
const coloniaRef = ref<HTMLElement | null>(null)
const galeriaRef = ref<HTMLElement | null>(null)

let observer: IntersectionObserver | null = null

const setupScrollReveal = () => {
  const targets = [featuresRef.value, actividadesRef.value, coloniaRef.value, galeriaRef.value].filter(
    (el): el is HTMLElement => el !== null,
  )

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
}

// Verificar el tamaño de la pantalla al montar el componente
onMounted(() => {
  checkIfMobile()
  window.addEventListener('resize', handleResize)
  setupScrollReveal()
})

// Limpiar listeners cuando el componente se desmonta
onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
  observer?.disconnect()
})

const images = ref([
  `${base}imgs/cancha-aerea-1.webp`,
  `${base}imgs/cancha-aerea-2.webp`,
  `${base}imgs/DJI_0019.webp`,
  `${base}imgs/Arqueria2.webp`,
  `${base}imgs/DJI_0019.webp`,
])

const features = [
  {
    icon: 'sports_soccer',
    title: 'Actividades deportivas',
    desc: 'Hockey, patín, ciclismo y arquería.',
  },
  {
    icon: 'local_offer',
    title: 'Beneficios exclusivos',
    desc: 'Descuentos para socios en comercios adheridos.',
  },
  {
    icon: 'park',
    title: 'Predio y naturaleza',
    desc: 'Canchas y espacios verdes para todo el año.',
  },
  {
    icon: 'groups',
    title: 'Comunidad de socios',
    desc: 'Un club pensado para toda la familia.',
  },
]

const goToLogin = () => {
  router.push({ path: '/homePerfil' })
}
const goToColonia = () => {
  router.push({ path: '/colonia' })
}
const goToBeneficios = () => {
  router.push({ path: '/beneficios' })
}
const goToCalendario = () => {
  router.push({ path: '/calendarios' })
}
</script>

<style scoped>
.index-page {
  background: var(--surface-bg);
}

/* Hero section */
.hero-section {
  position: relative;
  width: 100%;
  height: calc(100vh - 200px);
  min-height: 540px;
  background-size: cover;
  background-position: bottom;
  display: flex;
  align-items: center;
  justify-content: start;
  color: white;
  margin: 0;
  padding: 0;
  overflow: hidden;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(180deg, rgba(8, 12, 28, 0.35) 0%, rgba(8, 12, 28, 0) 30%, rgba(8, 12, 28, 0.25) 100%),
    linear-gradient(105deg, rgba(8, 12, 28, 0.82) 0%, rgba(15, 23, 42, 0.45) 40%, rgba(15, 23, 42, 0) 75%);
}

.hero-blobs {
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
}

.blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(90px);
  opacity: 0.55;
  animation: float 12s ease-in-out infinite;
}

.blob--one {
  width: 420px;
  height: 420px;
  top: -120px;
  right: -80px;
  background: radial-gradient(circle, var(--color-primary) 0%, transparent 70%);
}

.blob--two {
  width: 360px;
  height: 360px;
  bottom: -140px;
  right: 10%;
  background: radial-gradient(circle, var(--color-accent) 0%, transparent 70%);
  animation-delay: -6s;
}

@keyframes float {

  0%,
  100% {
    transform: translate(0, 0) scale(1);
  }

  50% {
    transform: translate(-30px, 40px) scale(1.08);
  }
}

.hero-content {
  position: relative;
  z-index: 1;
  padding-left: 60px;
  padding-right: 40px;
  max-width: 780px;
}

.hero-eyebrows {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 24px;
}

.hero-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(10px);
  color: inherit;
  font: inherit;
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: 0.3px;
}

.hero-eyebrow--link {
  cursor: pointer;
  background: rgba(249, 115, 22, 0.9);
  border-color: transparent;
  transition: transform 0.2s ease, background 0.2s ease;
}

.hero-eyebrow--link:hover {
  transform: translateY(-2px);
  background: var(--color-accent);
}

.hero-title {
  font-weight: 800;
  font-style: normal;
  font-size: clamp(2.8rem, 7vw, 5rem);
  letter-spacing: -0.03em;
  line-height: 1.05;
  margin: 0 0 16px;
  text-transform: uppercase;
}

.hero-subtitle {
  font-weight: 500;
  font-style: normal;
  font-size: 1.3rem;
  color: rgba(255, 255, 255, 0.88);
  max-width: 520px;
  margin: 0 0 36px;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.hero-btn { min-height: 46px; }

.hero-scroll-cue {
  position: absolute;
  bottom: 28px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;
  color: rgba(255, 255, 255, 0.75);
  animation: bounce 2s ease-in-out infinite;
}

@keyframes bounce {

  0%,
  100% {
    transform: translate(-50%, 0);
  }

  50% {
    transform: translate(-50%, 8px);
  }
}

/* Tira de features flotante */
.features-strip {
  position: relative;
  z-index: 2;
  max-width: 1200px;
  margin: -56px auto 0;
  padding: 0 20px;
}

.features-card {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  background: var(--color-surface);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 32px;
}

.feature-item {
  display: flex;
  align-items: flex-start;
  gap: 14px;
}

.feature-icon {
  flex: 0 0 auto;
  width: 48px;
  height: 48px;
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-primary-soft);
  color: var(--color-primary);
}

.feature-title {
  font-weight: 700;
  color: var(--color-text);
  margin-bottom: 4px;
}

.feature-desc {
  font-size: 0.85rem;
  color: var(--color-text-soft);
  line-height: 1.4;
}

/* Secciones y títulos */
.section {
  padding: 100px 20px 20px;
  max-width: 1400px;
  margin: 0 auto;
}

.section-header {
  text-align: center;
  max-width: 620px;
  margin: 0 auto 48px;
}

.section-eyebrow {
  display: inline-block;
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 1.2px;
  text-transform: uppercase;
  color: var(--color-accent);
  margin-bottom: 10px;
}

.section-title {
  margin: 0;
  font-size: 2.1rem;
  font-weight: 800;
  color: var(--color-text);
}

.section-subtitle {
  margin: 12px 0 0;
  color: var(--color-text-soft);
  font-size: 1rem;
}

/* Colonia de verano */
.colonia-promo {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1.1fr);
  gap: clamp(24px, 4vw, 48px);
  align-items: center;
  padding: clamp(24px, 4vw, 44px);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  background: var(--color-surface);
  box-shadow: var(--shadow-md);
}

.colonia-promo__btn {
  margin-top: 22px;
}

.colonia-promo__img {
  display: block;
  width: 100%;
  border-radius: var(--radius-md);
}

@media (max-width: 768px) {
  .colonia-promo {
    grid-template-columns: 1fr;
  }
}

/* Animación de aparición al hacer scroll */
.reveal {
  opacity: 0;
  transform: translateY(28px);
  transition: opacity 0.7s ease, transform 0.7s ease;
}

.reveal.is-visible {
  opacity: 1;
  transform: translateY(0);
}

/* Galería de imágenes */
.gallery-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: 250px;
  gap: 14px;
  max-width: 1400px;
  margin: auto;
}

.gallery-item {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: var(--radius-md);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
}

.gallery-item__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.5s ease;
}

.gallery-item__overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, transparent 60%, rgba(15, 23, 42, 0.55) 100%);
  opacity: 0;
  transition: opacity 0.35s ease;
}

.gallery-item:hover {
  box-shadow: var(--shadow-lg);
}

.gallery-item:hover .gallery-item__img {
  transform: scale(1.08);
}

.gallery-item:hover .gallery-item__overlay {
  opacity: 1;
}

/* Ajuste de imágenes más grandes */
.item-1 {
  grid-column: span 2;
}

.item-3 {
  grid-row: span 2;
}

.item-5 {
  grid-column: span 2;
}

/* Mejoras para el carrusel en móvil */
.mobile-gallery-container {
  padding: 0 15px 40px;
  max-width: 100%;
  overflow: hidden;
}

.mobile-swiper {
  width: 100%;
  max-width: 100%;
  overflow: hidden;
}

.mobile-swiper-slide {
  display: flex;
  justify-content: center;
  align-items: center;
}

.carousel-image {
  max-height: 230px;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);
  display: block;
  margin: 0 auto;
  padding-bottom: 40px;
}

@media (max-width: 1024px) {
  .hero-title {
    font-size: 4rem;
  }

  .features-card {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  .hero-section {
    background-position: center;
    width: 100%;
    max-width: none;
    height: auto;
    min-height: 100vh;
    align-items: center;
  }

  .hero-content {
    padding-left: 24px;
    padding-right: 24px;
  }

  .hero-actions {
    flex-direction: column;
    width: 100%;
  }

  .hero-btn {
    width: 100%;
    justify-content: space-between;
    height: 48px;
    padding: 0 15px;
  }

  .hero-title {
    font-size: 3rem;
  }

  .hero-subtitle {
    font-size: 1.05rem;
  }

  .features-strip {
    margin-top: -40px;
  }

  .features-card {
    grid-template-columns: 1fr;
    padding: 24px;
    gap: 20px;
  }

  .section {
    padding: 64px 16px 8px;
  }

  .section-title {
    font-size: 1.6rem;
  }

  /* Mejoras del carrusel en móvil */
  .carousel-image {
    height: 260px;
    width: 100%;
    object-fit: cover;
  }

  /* Estilo para los botones de navegación del carrusel */
  :deep(.swiper-button-next),
  :deep(.swiper-button-prev) {
    color: var(--color-accent);
    background: rgba(255, 255, 255, 0.8);
    width: 35px;
    height: 35px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  :deep(.swiper-button-next:after),
  :deep(.swiper-button-prev:after) {
    font-size: 18px;
  }

  :deep(.swiper-pagination-bullet-active) {
    background: var(--color-accent);
  }
}

@media (max-width: 400px) {
  .hero-title {
    font-size: 2.5rem;
  }

  .carousel-image {
    height: 220px;
  }
}
</style>
