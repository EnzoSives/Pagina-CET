<template>
  <main class="sport-page" :style="{ '--page-accent': sportProfile.accent }">
    <div class="sport-page__glow" aria-hidden="true"></div>
    <div class="sport-shell">
      <nav class="sport-breadcrumb" aria-label="Navegación de deportes">
        <q-btn flat round dense icon="arrow_back" aria-label="Volver a actividades" @click="volverAActividades" />
        <span>Actividades</span><q-icon name="chevron_right" size="18px" /><strong>{{ deporte }}</strong>
      </nav>

      <section class="sport-hero">
        <img :src="getDeporteImage(deporte)" :alt="`${deporte} en CET Pinamar`" class="sport-hero__image" />
        <div class="sport-hero__overlay"></div>
        <div class="sport-hero__topline">
          <span class="sport-hero__badge"><q-icon :name="sportProfile.icon" size="22px" /> CET Pinamar</span>
          <span class="sport-hero__index">Actividad deportiva</span>
        </div>
        <div class="sport-hero__content">
          <p>Deporte · comunidad · bienestar</p>
          <h1>{{ deporte }}</h1>
        </div>
      </section>

      <section class="sport-primary-actions" aria-label="Acciones principales">
        <q-btn unelevated no-caps icon-right="open_in_new" label="Quiero sumarme" class="app-btn app-btn--primary sport-main-action" @click="irAlFormularioAlta" />
        <q-btn unelevated no-caps icon-right="open_in_new" label="Pagar actividad" class="app-btn app-btn--secondary sport-main-action" @click="goTo('https://miclub.cetpinamar.com.ar/#/pagar')" />
      </section>

      <div class="sport-layout">
        <article class="sport-info-card">
          <header class="sport-info-card__header">
            <div><span class="section-kicker">Todo lo que necesitás saber</span><h2>Información de {{ deporte }}</h2></div>
            <div class="sport-info-card__icon"><q-icon :name="sportProfile.icon" size="26px" /></div>
          </header>
          <div v-if="isLoading" class="sport-state"><q-spinner color="primary" size="34px" /><span>Cargando información…</span></div>
          <div v-else class="sport-description" v-html="deporteDescripcion"></div>
        </article>

        <aside class="sport-sidebar">
          <div class="action-card">
            <div class="action-card__heading"><span class="section-kicker">Gestiones rápidas</span><h2>¿Qué querés hacer?</h2></div>
            <div class="action-list">
              <button type="button" class="app-action-button action-item action-item--featured" @click="irAlFormularioAlta">
                <span class="action-item__icon"><q-icon name="person_add" size="22px" /></span><span><strong>Inscribirme</strong><small>Formulario de alta</small></span><q-icon name="arrow_forward" size="20px" />
              </button>
              <button type="button" class="app-action-button action-item" @click="goTo('https://miclub.cetpinamar.com.ar/#/pagar')">
                <span class="action-item__icon"><q-icon name="credit_card" size="22px" /></span><span><strong>Pagar actividad</strong><small>Acceder a Mi Club</small></span><q-icon name="open_in_new" size="18px" />
              </button>
              <button type="button" class="app-action-button action-item" @click="movimientos">
                <span class="action-item__icon"><q-icon name="receipt_long" size="22px" /></span><span><strong>Mis movimientos</strong><small>Consultar pagos</small></span><q-icon name="arrow_forward" size="20px" />
              </button>
              <button type="button" class="app-action-button action-item action-item--quiet" @click="irAlFormularioBaja">
                <span class="action-item__icon"><q-icon name="person_remove" size="22px" /></span><span><strong>Solicitar baja</strong><small>Formulario de baja</small></span><q-icon name="open_in_new" size="18px" />
              </button>
            </div>
            <div class="action-card__help"><q-icon name="info" size="20px" /><span>Las inscripciones y bajas se completan mediante un formulario externo.</span></div>
          </div>
        </aside>
      </div>
    </div>
    <PagosModal ref="pagoModalRef" />
  </main>
</template>

<script setup lang="ts">
import { computed, defineProps, onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import PagosModal from 'components/PagosModal.vue'

const props = defineProps<{ deporte: string }>()
const router = useRouter()
const pagoModalRef = ref()
const deporteDescripcion = ref('')
const isLoading = ref(true)
const base = process.env.BASE_URL || '/'
const actividadesPausadas = ['Running']

const redirigirSiActividadPausada = (deporte: string) => {
  if (!actividadesPausadas.includes(deporte)) return false

  router.replace({ path: '/', hash: '#actividades' })
  return true
}

const cargarDescripcion = async (deporte: string) => {
  isLoading.value = true
  try {
    const response = await fetch(`${base}deportes.json`)
    if (!response.ok) throw new Error(`HTTP ${response.status}`)
    const data = await response.json()
    deporteDescripcion.value = data[deporte] || 'Información no disponible.'
  } catch (error) {
    console.error('Error al cargar la descripción:', error)
    deporteDescripcion.value = 'No pudimos cargar la información de esta actividad.'
  } finally { isLoading.value = false }
}

onMounted(() => {
  if (redirigirSiActividadPausada(props.deporte)) return
  cargarDescripcion(props.deporte)
})

watch(() => props.deporte, (nuevo) => {
  if (redirigirSiActividadPausada(nuevo)) return
  cargarDescripcion(nuevo)
})

const deporteImages: Record<string, string> = {
  Patin: `${base}imgs/Patin.jpeg`, Hockey: `${base}imgs/hockey.webp`, Ciclismo: `${base}imgs/ciclismo.webp`,
  // Running: 'https://images.unsplash.com/photo-1571008887538-b36bb32f4571?q=80&w=2070&auto=format&fit=crop',
  'Arquería3D': `${base}imgs/Arqueria4.JPG`,
}
const sportProfiles: Record<string, { icon: string; accent: string }> = {
  Hockey: { icon: 'sports_hockey', accent: '#2563eb' }, Patin: { icon: 'roller_skating', accent: '#db2777' },
  Ciclismo: { icon: 'directions_bike', accent: '#16a34a' }, 'Arquería3D': { icon: 'gps_fixed', accent: '#f97316' },
  // Running: { icon: 'directions_run', accent: '#0ea5e9' },
  Futbol: { icon: 'sports_soccer', accent: '#7c3aed' },
}
const sportProfile = computed(() => sportProfiles[props.deporte] || { icon: 'sports', accent: '#2563eb' })
const getDeporteImage = (deporte: string) => deporteImages[deporte] || `${base}imgs/imagen-cet.webp`
const volverAActividades = () => router.push({ path: '/', hash: '#actividades' })
const irAlFormularioAlta = () => window.open('https://docs.google.com/forms/d/e/1FAIpQLSd8c8tQjiLs01-gDbRoET4kdYYyxzAhbO-BI8vqkOrolAMENg/viewform', '_blank')
const irAlFormularioBaja = () => window.open('https://docs.google.com/forms/d/e/1FAIpQLSfpUwZ7Wj20XL-Le_kER63u6zCxT5j3gT1gJYQLZDGk4398xA/viewform', '_blank')
const movimientos = () => router.push({ name: 'HomePerfil' })
const goTo = (url: string) => window.open(url, '_blank')
</script>

<style scoped>
.sport-page { position:relative; min-height:100vh; padding:0 0 64px; overflow:hidden; background:var(--surface-bg); color:var(--color-text); isolation:isolate; }
.sport-page__glow { display:none; }
.sport-shell { width:100%; max-width:none; margin:0; padding:34px clamp(10px,2vw,24px) 0; }
.sport-breadcrumb { display:flex; align-items:center; gap:8px; min-height:44px; margin-bottom:14px; color:#64748b; font-size:.88rem; }
.sport-breadcrumb strong { color:var(--color-text); }
.sport-hero { position:relative; min-height:clamp(380px,50vh,540px); overflow:hidden; border-radius:18px; box-shadow:var(--shadow-md); color:#fff; }
.sport-hero__image { position:absolute; inset:0; width:100%; height:100%; object-fit:cover; }
.sport-hero__overlay { position:absolute; inset:0; background:linear-gradient(90deg,rgba(15,23,42,.78) 0%,rgba(15,23,42,.4) 48%,rgba(15,23,42,.12) 100%),linear-gradient(0deg,rgba(15,23,42,.42),transparent 58%); }
.sport-hero__topline { position:absolute; top:26px; right:30px; left:30px; display:flex; align-items:center; justify-content:space-between; gap:16px; }
.sport-hero__badge { display:inline-flex; align-items:center; gap:9px; padding:8px 13px; border:1px solid rgba(255,255,255,.22); border-radius:10px; background:rgba(15,23,42,.28); backdrop-filter:blur(10px); font-size:.85rem; font-weight:600; }
.sport-hero__index { color:rgba(255,255,255,.72); font-size:.75rem; font-weight:800; letter-spacing:.12em; text-transform:uppercase; }
.sport-hero__content { position:absolute; right:clamp(30px,5vw,62px); bottom:clamp(34px,6vw,58px); left:clamp(30px,5vw,62px); max-width:720px; }
.sport-hero__content p { margin:0 0 9px; color:rgba(255,255,255,.78); font-size:.76rem; font-weight:800; letter-spacing:.1em; text-transform:uppercase; }
.sport-hero__content h1 { margin:0; font-size:clamp(2.7rem,6vw,4.8rem); font-weight:850; line-height:.95; letter-spacing:-.045em; text-shadow:0 6px 18px rgba(0,0,0,.24); }
.sport-primary-actions { position:relative; z-index:2; display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:12px; width:min(620px,calc(100% - 36px)); margin:-26px auto 0; padding:12px; border:1px solid var(--color-border); border-radius:var(--radius-sm); background:rgba(255,255,255,.94); box-shadow:var(--shadow-md); backdrop-filter:blur(12px); }
.sport-main-action { width:100%; min-width:0; }
.sport-layout { display:grid; grid-template-columns:minmax(0,1fr) minmax(320px,420px); gap:24px; align-items:start; margin-top:24px; }
.sport-info-card,.action-card { border:1px solid var(--color-border); border-radius:var(--radius-sm); background:var(--color-surface); box-shadow:var(--shadow-sm); }
.sport-info-card { padding:clamp(28px,5vw,56px); }
.sport-info-card__header { display:flex; align-items:flex-start; justify-content:space-between; gap:24px; padding-bottom:28px; border-bottom:1px solid #e2e8f0; }
.section-kicker { display:block; margin-bottom:8px; color:#64748b; font-size:.72rem; font-weight:700; letter-spacing:.09em; text-transform:uppercase; }
.sport-info-card h2,.action-card h2 { margin:0; color:#0f172a; font-size:clamp(1.55rem,2.5vw,2.15rem); line-height:1.15; letter-spacing:-.03em; }
.sport-info-card__icon { display:grid; place-items:center; flex:0 0 auto; width:50px; height:50px; border-radius:13px; background:#f1f5f9; color:#475569; }
.sport-state { display:flex; align-items:center; justify-content:center; gap:14px; min-height:220px; color:#64748b; }
.sport-description { padding-top:12px; color:#475569; font-size:1rem; line-height:1.75; }
.sport-description :deep(.contenido > h3:first-child) { display:none; }
.sport-description :deep(h3),.sport-description :deep(h4) { margin:30px 0 12px; color:#0f172a; line-height:1.25; }
.sport-description :deep(h4) { font-size:1.15rem; }
.sport-description :deep(p) { margin:14px 0; }
.sport-description :deep(ul) { display:grid; gap:10px; margin:16px 0; padding-left:0; list-style:none; }
.sport-description :deep(li) { position:relative; padding:13px 16px 13px 42px; border:1px solid #e2e8f0; border-radius:14px; background:#f8fafc; }
.sport-description :deep(li::before) { content:'✓'; position:absolute; top:13px; left:16px; color:var(--page-accent); font-weight:900; }
.sport-description :deep(strong) { color:#1e293b; }
.sport-sidebar { position:sticky; top:96px; }
.action-card { padding:28px; }
.action-card__heading { margin-bottom:22px; }
.action-list { display:grid; gap:10px; }
.action-item__icon { display:grid; place-items:center; width:44px; height:44px; border-radius:11px; background:#f1f5f9; color:#475569; }
.action-item>span:nth-child(2) { display:grid; }
.action-item strong { color:#0f172a; font-size:.95rem; }
.action-item small { margin-top:2px; color:#64748b; font-size:.76rem; }
.action-item--featured { border-color:#cbd5e1; background:#f8fafc; color:#334155; box-shadow:none; }
.action-item--featured .action-item__icon { background:#e2e8f0; color:#334155; }
.action-item--featured strong { color:#0f172a; }
.action-item--featured small { color:#64748b; }
.action-item--quiet { background:transparent; }
.action-card__help { display:flex; align-items:flex-start; gap:10px; margin-top:20px; padding-top:20px; border-top:1px solid #e2e8f0; color:#64748b; font-size:.77rem; line-height:1.45; }
@media (max-width:980px) { .sport-layout { grid-template-columns:1fr; } .sport-sidebar { position:static; } }
@media (max-width:600px) {
  .sport-page { padding-bottom:32px; }
  .sport-shell { padding:18px 10px 0; }
  .sport-breadcrumb span,.sport-breadcrumb>.q-icon { display:none; }
  .sport-hero { min-height:430px; border-radius:18px; }
  .sport-hero__overlay { background:linear-gradient(0deg,rgba(5,10,24,.9) 0%,rgba(5,10,24,.44) 62%,rgba(5,10,24,.14) 100%); }
  .sport-hero__content { right:22px; bottom:32px; left:22px; }
  .sport-hero__content h1 { font-size:clamp(2.9rem,16vw,4.4rem); }
  .sport-primary-actions { grid-template-columns:1fr; width:calc(100% - 20px); margin:-22px auto 0; padding:10px; }
  .sport-main-action { width:100%; }
  .sport-hero__topline { top:18px; right:18px; left:18px; }
  .sport-hero__index { display:none; }
  .sport-layout { gap:18px; margin-top:18px; }
  .sport-info-card,.action-card { border-radius:22px; }
  .sport-info-card { padding:24px 20px; }
  .sport-info-card__icon { display:none; }
  .action-card { padding:22px 18px; }
}
</style>
