<template>
  <q-page class="benefits-page">
    <div class="benefits-content">
      <section class="benefits-hero">
        <div class="benefits-hero__copy">
          <span class="benefits-eyebrow">Beneficios CET</span>
          <h1>Comercios adheridos</h1>
          <p>
            Buscá descuentos por comercio, rubro o descripción. Mostrá tu credencial
            de socio para acceder a los beneficios disponibles.
          </p>
        </div>

        <div class="benefits-credential">
          <q-img
            src="~/assets/credencial.png"
            alt="Credencial de socio CET"
            class="benefits-credential__image"
            spinner-color="primary"
          />
          <div>
            <span>Credencial digital</span>
            <strong>Disponible en la App CET</strong>
          </div>
        </div>
      </section>

      <section class="benefits-toolbar">
        <q-input
          v-model="busqueda"
          outlined
          dense
          clearable
          placeholder="Buscar comercio, rubro o descuento"
          class="benefits-search"
        >
          <template v-slot:prepend>
            <q-icon name="search" />
          </template>
        </q-input>

        <div class="benefits-toolbar__meta">
          <span>{{ beneficiosFiltrados.length }} beneficios</span>
          <q-btn
            label="Ver en App CET"
            icon-right="arrow_forward"
            class="app-btn app-btn--primary benefits-app-button"
            unelevated
            no-caps
            @click="verComercios"
          />
        </div>
      </section>

      <section class="benefits-list">
        <div v-if="beneficiosStore.loading" class="benefits-state">
          <q-spinner color="primary" size="2.4em" />
          <p>Cargando beneficios...</p>
        </div>

        <div v-else-if="beneficiosFiltrados.length === 0" class="benefits-state">
          <q-icon name="search_off" size="42px" />
          <h2>No se encontraron beneficios</h2>
          <p>Probá buscar por otro comercio, rubro o palabra clave.</p>
        </div>

        <div v-else class="benefits-grid">
          <BeneficiosCard
            v-for="beneficio in beneficiosFiltrados"
            :key="beneficio.id"
            :beneficio="beneficio"
          />
        </div>
      </section>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useQuasar } from 'quasar'
import { useRouter } from 'vue-router'
import { useBeneficiosStore } from 'src/stores/beneficiosStore'
import BeneficiosCard from 'src/components/BeneficiosComponent.vue'

const $q = useQuasar()
const router = useRouter()
const beneficiosStore = useBeneficiosStore()

const busqueda = ref('')
const ordenAleatorio = ref<string[]>([])

const beneficiosAprobados = computed(() =>
  beneficiosStore.beneficios.filter((beneficio) => beneficio.chequeado),
)

const beneficiosOrdenados = computed(() => {
  const orden = ordenAleatorio.value
  return [...beneficiosAprobados.value].sort(
    (a, b) => orden.indexOf(a.id) - orden.indexOf(b.id),
  )
})

const beneficiosFiltrados = computed(() => {
  const texto = busqueda.value?.trim().toLowerCase() ?? ''
  if (!texto) return beneficiosOrdenados.value

  return beneficiosOrdenados.value.filter((beneficio) =>
    [beneficio.nombrefantasia, beneficio.titulo, beneficio.rubro, beneficio.descripcion]
      .filter(Boolean)
      .some((campo) => campo!.toLowerCase().includes(texto)),
  )
})

const mezclarBeneficios = () => {
  const ids = beneficiosAprobados.value.map((beneficio) => beneficio.id)
  for (let i = ids.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const temp = ids[i]!
    ids[i] = ids[j]!
    ids[j] = temp
  }
  ordenAleatorio.value = ids
}

const verComercios = () => {
  router.push('/homePerfil')
  $q.notify({
    message: 'Redirigiendo a la lista de comercios...',
    color: 'blue',
    position: 'top',
    timeout: 2000,
  })
}

onMounted(async () => {
  await beneficiosStore.fetchBeneficios()
  mezclarBeneficios()
})
</script>

<style scoped>
.benefits-page {
  min-height: 100%;
  padding: 0 0 64px;
  background: var(--surface-bg);
  color: var(--color-text);
}

.benefits-content {
  width: 100%;
  max-width: none;
  margin: 0;
  padding: 34px clamp(12px, 2vw, 24px) 0;
}

.benefits-hero {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(280px, 0.34fr);
  gap: 22px;
  align-items: stretch;
  padding: clamp(28px, 5vw, 54px);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  background: var(--color-surface);
}

.benefits-eyebrow {
  display: inline-block;
  margin-bottom: 10px;
  color: #64748b;
  font-size: 0.74rem;
  font-weight: 850;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.benefits-hero h1 {
  margin: 0;
  color: var(--color-text);
  font-size: clamp(2.2rem, 6vw, 4.1rem);
  font-weight: 850;
  letter-spacing: -0.045em;
  line-height: 0.98;
}

.benefits-hero p {
  max-width: 760px;
  margin: 18px 0 0;
  color: var(--color-text-soft);
  font-size: clamp(1rem, 2vw, 1.14rem);
  line-height: 1.55;
}

.benefits-credential {
  display: grid;
  align-content: center;
  gap: 16px;
  padding: 18px;
  border-radius: var(--radius-sm);
  background: #f8fafc;
}

.benefits-credential__image {
  width: min(100%, 280px);
  border-radius: var(--radius-sm);
  box-shadow: var(--shadow-sm);
}

.benefits-credential span {
  display: block;
  color: #64748b;
  font-size: 0.74rem;
  font-weight: 850;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.benefits-credential strong {
  display: block;
  margin-top: 4px;
  color: var(--color-text);
  font-size: 1rem;
  font-weight: 850;
}

.benefits-toolbar {
  display: grid;
  grid-template-columns: minmax(260px, 1fr) auto;
  gap: 14px;
  align-items: center;
  margin-top: 22px;
  padding: 16px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  background: var(--color-surface);
}

.benefits-search {
  width: 100%;
}

.benefits-toolbar__meta {
  display: flex;
  gap: 14px;
  align-items: center;
  justify-content: flex-end;
}

.benefits-toolbar__meta span {
  color: var(--color-text-soft);
  font-size: 0.9rem;
  font-weight: 800;
  white-space: nowrap;
}

.benefits-app-button {
  min-height: 40px;
  padding: 0 18px;
}

.benefits-list {
  margin-top: 16px;
}

.benefits-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
}

.benefits-state {
  display: grid;
  place-items: center;
  gap: 10px;
  min-height: 260px;
  padding: 32px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  background: var(--color-surface);
  color: var(--color-text-soft);
  text-align: center;
}

.benefits-state h2 {
  margin: 0;
  color: var(--color-text);
  font-size: 1.35rem;
  font-weight: 850;
  letter-spacing: -0.03em;
}

.benefits-state p {
  margin: 0;
  line-height: 1.5;
}

@media (max-width: 1100px) {
  .benefits-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 860px) {
  .benefits-hero,
  .benefits-toolbar {
    grid-template-columns: 1fr;
  }

  .benefits-toolbar__meta {
    align-items: stretch;
    flex-direction: column;
  }

  .benefits-app-button {
    width: 100%;
  }
}

@media (max-width: 640px) {
  .benefits-content {
    padding: 18px 10px 0;
  }

  .benefits-hero {
    padding: 20px;
  }

  .benefits-grid {
    grid-template-columns: 1fr;
  }
}
</style>
