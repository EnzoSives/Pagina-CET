<template>
  <q-page class="responsive-container movements-page">
    <q-card class="account-card">
      <!-- Header mejorado -->
      <q-card-section class="header-section">
        <div class="header-content">
          <!-- Botón volver optimizado -->
          <q-btn label="Volver" unelevated flat size="md" icon="arrow_back"
            class="back-button" @click="back" />

          <!-- Info del perfil -->
          <div class="profile-info">
            <div class="profile-details">
              <p class="movement-eyebrow">Movimientos</p>
              <h1 class="profile-name">{{ perfilSeleccionado?.nombre }}</h1>
              <p class="account-type">{{ cuentaSeleccionada?.tipoCuentaCobro }}</p>
            </div>
            <div class="profile-icon">
              <q-icon name="account_balance_wallet" size="48px" class="wallet-icon" />
            </div>
          </div>

          <q-separator class="header-separator" />

          <!-- Cards de saldo responsivos -->
          <div class="balance-grid">
            <div class="balance-item">
              <div class="balance-card current-balance">
                <div class="balance-content">
                  <q-icon name="account_balance" size="28px" class="balance-icon current" />
                  <div class="balance-info">
                    <p class="balance-label">Saldo Actual</p>
                    <p class="balance-amount">$ {{ formatNumber(cuentaSeleccionada?.saldo) }}</p>
                  </div>
                </div>
              </div>
            </div>

            <div class="balance-item">
              <div class="balance-card overdue-balance">
                <div class="balance-content">
                  <q-icon name="warning" size="28px" class="balance-icon overdue" />
                  <div class="balance-info">
                    <p class="balance-label">Saldo Vencido</p>
                    <p class="balance-amount">$ {{ formatNumber(cuentaSeleccionada?.saldoVencido) }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </q-card-section>

      <!-- Sección de contenido principal -->
      <q-card-section class="main-content">
        <!-- Botón de pago mejorado -->
        <div class="action-section">
          <q-btn v-if="cuentaSeleccionada?.saldo > 0" label="Pagar cuenta" unelevated size="md"
            icon-right="open_in_new" class="app-btn app-btn--primary pay-button-modern" @click="pagar" />

          <div v-else class="account-paid-message">
            <q-icon name="check_circle" color="positive" size="32px" />
            <span class="paid-text">¡Cuenta al día!</span>
          </div>
        </div>

        <!-- Sección de movimientos -->
        <div class="movements-wrapper">
          <div class="movements-header">
            <h2 class="movements-title">
              <span class="title-icon"><q-icon name="history" size="22px" /></span>
              Movimientos de cuenta
            </h2>
          </div>

          <!-- Tabla responsive -->
          <div class="table-container">
            <q-table flat bordered :dense="$q.screen.lt.md" :rows="movimientosCuentaCobro" :columns="responsiveColumns"
              row-key="id" class="movements-table" :rows-per-page-options="[5, 10, 25, 50]"
              :rows-per-page="$q.screen.lt.md ? 5 : 10" rows-per-page-label="Filas por página:"
              no-data-label="No hay movimientos registrados" :grid="$q.screen.xs">
              <!-- Template para vista de tabla normal -->
              <template v-slot:body-cell-fechaMovimiento="props">
                <q-td :props="props" class="date-cell">
                  <div class="date-content">
                    <q-icon name="event" size="16px" class="date-icon" />
                    <span class="date-text">{{ formatDate(props.row.fechaMovimiento) }}</span>
                  </div>
                </q-td>
              </template>

              <template v-slot:body-cell-descripcion="props">
                <q-td :props="props" class="description-cell">
                  <div class="description-content">
                    {{ props.row.descripcion.toUpperCase() }}
                  </div>
                </q-td>
              </template>

              <template v-slot:body-cell-monto="props">
                <q-td :props="props" class="amount-cell">
                  <q-chip dense :color="props.row.credito ? 'negative' : 'positive'" text-color="white"
                    class="amount-chip" :icon="props.row.credito ? 'remove' : 'add'">
                    {{ props.row.credito ? `$${formatNumber(props.row.monto)}` : `$${formatNumber(props.row.monto)}`
                    }}
                  </q-chip>
                </q-td>
              </template>

              <template v-slot:body-cell-saldoAFecha="props">
                <q-td :props="props" class="balance-cell">
                  <span class="balance-value">$ {{ formatNumber(props.row.saldoAFecha) }}</span>
                </q-td>
              </template>

              <!-- Template para vista de grid (móvil) -->
              <template v-slot:item="props">
                <div class="movement-card q-pa-md">
                  <div class="movement-header">
                    <div class="movement-date">
                      <q-icon name="event" size="16px" class="q-mr-xs" />
                      {{ formatDate(props.row.fechaMovimiento) }}
                    </div>
                    <q-chip dense :color="props.row.credito ? 'negative' : 'positive'" text-color="white"
                      :icon="props.row.credito ? 'remove' : 'add'">
                      {{ props.row.credito ? `$${formatNumber(props.row.monto)}` : `$${formatNumber(props.row.monto)}`
                      }}
                    </q-chip>
                  </div>
                  <div class="movement-description">
                    {{ props.row.descripcion.toUpperCase() }}
                  </div>
                  <div class="movement-balance">
                    <span class="balance-label">Saldo: </span>
                    <span class="balance-amount">$ {{ formatNumber(props.row.saldoAFecha) }}</span>
                  </div>
                </div>
              </template>
            </q-table>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { usePerfilStore } from 'src/stores/perfilesStore'

const router = useRouter()
const $q = useQuasar()
const perfilStore = usePerfilStore()

const perfilSeleccionado = computed(() => perfilStore.perfiles[perfilStore.perfilIndex] || null)
const movimientosCuentaCobro = computed(() => perfilStore.movimientosCuentasCobro)
const cuentaSeleccionada = computed(() => perfilStore.cuentaSeleccionada)

type Column = {
  name: string;
  label: string;
  field: string;
  align: 'left' | 'right' | 'center';
  sortable?: boolean;
  headerStyle?: string;
  style?: string;
};

const baseColumns: Column[] = [
  {
    name: 'fechaMovimiento',
    label: 'Fecha',
    field: 'fechaMovimiento',
    align: 'left',
    sortable: true,
    style: 'width: 120px'
  },
  {
    name: 'descripcion',
    label: 'Descripción',
    field: 'descripcion',
    align: 'left',
    sortable: true
  },
  {
    name: 'monto',
    label: 'Monto',
    field: 'monto',
    align: 'center',
    sortable: true,
    style: 'width: 140px'
  },
  {
    name: 'saldoAFecha',
    label: 'Saldo',
    field: 'saldoAFecha',
    align: 'right',
    sortable: true,
    style: 'width: 120px'
  }
]

// Columnas responsivas
const responsiveColumns = computed(() => {
  if ($q.screen.xs) {
    return [] // En grid mode no necesitamos columnas
  }
  if ($q.screen.sm) {
    return baseColumns.filter(col => ['fechaMovimiento', 'descripcion', 'monto'].includes(col.name))
  }
  return baseColumns
})

// Funciones auxiliares para formateo
const formatNumber = (value: number | string | undefined): string => {
  if (!value) return '0'
  const num = typeof value === 'string' ? parseFloat(value) : value
  return num.toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

const formatDate = (dateString: string): string => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('es-AR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })
}

const back = () => router.replace('/homePerfil')

const pagar = () => {
  window.open(
    `https://miclub.cetpinamar.com.ar/external/pagarOnline.faces?cpe=${cuentaSeleccionada?.value.cPE}&monto=${cuentaSeleccionada.value?.saldo}`,
    '_blank'
  )
}
</script>

<style scoped>
.responsive-container {
  min-height: 100vh;
  background: var(--surface-bg);
}

.account-card {
  /* max-width: 1200px; */
  margin: 0 auto;
  border-radius: var(--radius-md);
  overflow: hidden;
  box-shadow: var(--shadow-md);
  background: white;
}

/* === HEADER STYLES === */
.header-section {
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  color: #333;
  position: relative;
  overflow: hidden;
  border-bottom: 1px solid #e0e0e0;
}

.header-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.02);
  backdrop-filter: blur(10px);
}

.header-content {
  position: relative;
  z-index: 1;
}

.back-button {
  margin-bottom: 20px;
  border: 1px solid #ddd;
  backdrop-filter: blur(10px);
  background: rgba(255, 255, 255, 0.9);
  transition: all 0.3s ease;
  border-radius: 4px;
}

.back-button:hover {
  background: rgba(0, 0, 0, 0.05);
  transform: translateY(-2px);
}

.profile-info {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
}

.profile-details {
  flex: 1;
}

.profile-name {
  margin: 0;
  font-size: 1.8rem;
  font-weight: 600;
  color: #333;
}

.account-type {
  margin: 4px 0 0 0;
  font-size: 1.1rem;
  color: #666;
  font-weight: 400;
}

.profile-icon {
  margin-left: 16px;
}

.wallet-icon {
  color: #666;
}

.header-separator {
  background: #ddd;
  margin: 24px 0;
}

/* === BALANCE GRID === */
.balance-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 16px;
}

.balance-card {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(20px);
  border-radius: 4px;
  padding: 20px;
  border: 1px solid #e0e0e0;
  transition: all 0.3s ease;
}

.balance-card:hover {
  transform: translateY(-4px);
  background: rgba(255, 255, 255, 1);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.balance-content {
  display: flex;
  align-items: center;
  gap: 16px;
}

.balance-icon {
  color: #666;
}

.balance-icon.current {
  color: #4caf50;
}

.balance-icon.overdue {
  color: #f44336;
}

.balance-info {
  flex: 1;
}

.balance-label {
  margin: 0;
  font-size: 0.9rem;
  color: #666;
  font-weight: 500;
}

.balance-amount {
  margin: 4px 0 0 0;
  font-size: 1.5rem;
  font-weight: 700;
  color: #333;
}

/* === MAIN CONTENT === */
.main-content {
  padding: 32px;
}

.action-section {
  margin-bottom: 40px;
  display: flex;
  justify-content: center;
}

.pay-button-modern {
  background: linear-gradient(45deg, #4caf50, #45a049);
  font-weight: 600;
  padding: 16px 32px;
  border-radius: 4px;
  box-shadow: 0 6px 20px rgba(76, 175, 80, 0.3);
  transition: all 0.3s ease;
  font-size: 1.1rem;
}

.pay-button-modern:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(76, 175, 80, 0.4);
}

.account-paid-message {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 24px;
  background: rgba(76, 175, 80, 0.1);
  border-radius: 4px;
  border: 2px solid rgba(76, 175, 80, 0.3);
}

.paid-text {
  font-size: 1.2rem;
  font-weight: 600;
  color: #2e7d32;
}

/* === MOVEMENTS SECTION === */
.movements-wrapper {
  background: #f8f9fa;
  border-radius: 4px;
  padding: 24px;
  box-shadow: inset 0 2px 8px rgba(0, 0, 0, 0.05);
}

.movements-header {
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 3px solid #e0e0e0;
}

.movements-title {
  margin: 0;
  font-size: 1.4rem;
  font-weight: 600;
  color: #424242;
  display: flex;
  align-items: center;
  gap: 8px;
}

.title-icon {
  color: #666;
}

.table-container {
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.movements-table {
  background: white;
}

.movements-table :deep(.q-table__top) {
  background: #f5f5f5;
  border-bottom: 1px solid #e0e0e0;
}

.movements-table :deep(.q-table thead th) {
  background: #f0f0f0;
  font-weight: 600;
  color: #424242;
  border-bottom: 2px solid #e0e0e0;
  font-size: 0.95rem;
}

.movements-table :deep(.q-table tbody tr) {
  border-bottom: 1px solid #f0f0f0;
}

.movements-table :deep(.q-table tbody tr:hover) {
  background: #f8f9fa;
}

/* === TABLE CELL STYLES === */
.date-cell {
  font-weight: 500;
}

.date-content {
  display: flex;
  align-items: center;
  gap: 6px;
}

.date-icon {
  color: #666;
}

.date-text {
  font-size: 0.9rem;
}

.description-content {
  font-weight: 500;
  color: #424242;
  font-size: 0.9rem;
}

.amount-chip {
  font-weight: 600;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  font-size: 0.85rem;
}

.balance-cell {
  font-weight: 700;
}

.balance-value {
  font-size: 0.95rem;
}

/* === MOBILE GRID STYLES === */
.movement-card {
  background: white;
  border-radius: 4px;
  margin-bottom: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  border: 1px solid #f0f0f0;
}

.movement-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.movement-date {
  display: flex;
  align-items: center;
  color: #666;
  font-size: 0.9rem;
  font-weight: 500;
}

.movement-description {
  font-weight: 600;
  color: #424242;
  margin-bottom: 8px;
  font-size: 0.95rem;
}

.movement-balance {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 8px;
  border-top: 1px solid #f0f0f0;
}

.movement-balance .balance-label {
  color: #666;
  font-size: 0.9rem;
}

.movement-balance .balance-amount {
  font-weight: 700;
  color: #424242;
  font-size: 1rem;
}

/* === RESPONSIVE BREAKPOINTS === */
@media (max-width: 599px) {
  .responsive-container {
    padding: 8px;
  }

  .main-content {
    padding: 20px 16px;
  }

  .profile-name {
    font-size: 1.5rem;
  }

  .account-type {
    font-size: 1rem;
  }

  .balance-grid {
    grid-template-columns: 1fr;
    gap: 12px;
  }

  .balance-card {
    padding: 16px;
  }

  .balance-amount {
    font-size: 1.3rem;
  }

  .pay-button-modern {
    width: 100%;
    padding: 14px 24px;
  }

  .movements-wrapper {
    padding: 16px;
  }

  .movements-title {
    font-size: 1.2rem;
  }
}


@media (max-width: 959px) and (min-width: 600px) {
  .profile-info {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }

  .profile-icon {
    margin-left: 0;
    align-self: flex-end;
  }
}

@media (min-width: 1200px) {
  .responsive-container {
    padding: 32px;
  }

  .main-content {
    padding: 40px;
  }
}

/* === Diseño CET unificado === */
.movements-page {
  padding: 0 0 64px;
  background: var(--surface-bg);
  color: var(--color-text);
}

.account-card {
  width: min(1180px, 100%);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  background: var(--color-surface);
  box-shadow: var(--shadow-sm);
}

.header-section {
  padding: 28px;
  border-bottom: 1px solid var(--color-border);
  background: var(--color-surface);
}

.header-section::before {
  display: none;
}

.back-button {
  min-height: 40px;
  margin-bottom: 22px;
  padding: 0 18px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  background: #fff;
  color: var(--color-text-soft);
  box-shadow: var(--shadow-sm);
  font-weight: 700;
  text-transform: none;
}

.back-button:hover {
  background: var(--color-primary-soft);
  color: var(--color-primary);
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.profile-info {
  align-items: center;
  margin-bottom: 22px;
}

.movement-eyebrow {
  margin: 0 0 8px;
  color: var(--color-text-soft);
  font-size: 0.76rem;
  font-weight: 850;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.profile-name {
  color: var(--color-text);
  font-size: clamp(1.7rem, 4vw, 2.45rem);
  font-weight: 850;
  line-height: 1.05;
}

.account-type {
  margin-top: 8px;
  color: var(--color-text-soft);
  font-size: 1rem;
  font-weight: 700;
}

.profile-icon {
  display: grid;
  place-items: center;
  width: 52px;
  height: 52px;
  margin-left: 18px;
  border-radius: var(--radius-sm);
  background: var(--color-primary-soft);
}

.profile-icon .q-icon {
  font-size: 34px !important;
}

.wallet-icon {
  color: var(--color-primary);
}

.header-separator {
  margin: 22px 0;
  background: var(--color-border);
}

.balance-grid {
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
}

.balance-card {
  padding: 18px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  background: #f8fafc;
  box-shadow: none;
}

.balance-card:hover {
  transform: translateY(-2px);
  background: #fff;
  box-shadow: var(--shadow-sm);
}

.balance-icon {
  display: grid;
  place-items: center;
  width: 42px;
  height: 42px;
  border-radius: var(--radius-sm);
  background: #fff;
}

.balance-label {
  color: var(--color-text-soft);
  font-size: 0.82rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.balance-amount {
  margin-top: 5px;
  color: var(--color-text);
  font-size: clamp(1.25rem, 3vw, 1.65rem);
  font-weight: 850;
}

.main-content {
  padding: 28px;
}

.action-section {
  justify-content: flex-start;
  margin-bottom: 24px;
}

.pay-button-modern {
  min-width: 220px;
  padding: 0 24px;
  background: var(--color-primary);
  box-shadow: 0 8px 18px rgba(37, 99, 235, 0.24);
  font-size: 1rem;
}

.account-paid-message {
  padding: 12px 16px;
  border: 1px solid rgba(22, 163, 74, 0.22);
  border-radius: var(--radius-sm);
  background: rgba(22, 163, 74, 0.08);
}

.paid-text {
  color: #15803d;
  font-size: 1rem;
  font-weight: 850;
}

.movements-wrapper {
  padding: 0;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  background: var(--color-surface);
  box-shadow: none;
}

.movements-header {
  margin: 0;
  padding: 18px 20px;
  border-bottom: 1px solid var(--color-border);
}

.movements-title {
  color: var(--color-text);
  font-size: clamp(1.25rem, 3vw, 1.65rem);
  font-weight: 850;
}

.title-icon {
  display: grid;
  place-items: center;
  width: 42px;
  height: 42px;
  border-radius: var(--radius-sm);
  background: var(--color-primary-soft);
  color: var(--color-primary);
}

.table-container {
  border-radius: 0;
  box-shadow: none;
}

.movements-table {
  background: var(--color-surface);
}

.movements-table :deep(.q-table thead th) {
  background: #f8fafc;
  color: var(--color-text-soft);
  border-bottom: 1px solid var(--color-border);
  font-size: 0.82rem;
  font-weight: 850;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.movements-table :deep(.q-table tbody td) {
  color: var(--color-text);
  border-bottom: 1px solid #edf2f7;
}

.movements-table :deep(.q-table tbody tr:hover) {
  background: var(--color-primary-soft);
}

.description-content {
  color: var(--color-text);
  font-weight: 700;
}

.date-icon {
  color: var(--color-primary);
}

.balance-value {
  color: var(--color-text);
  font-weight: 850;
}

.movement-card {
  margin: 0 0 12px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  background: var(--color-surface);
  box-shadow: var(--shadow-sm);
}

@media (max-width: 599px) {
  .movements-page {
    padding: 16px 12px 32px;
  }

  .account-card {
    border-radius: 18px;
  }

  .header-section {
    padding: 18px;
  }

  .profile-info {
    display: grid;
    gap: 14px;
  }

  .profile-icon {
    width: 48px;
    height: 48px;
    margin-left: 0;
  }

  .balance-grid {
    grid-template-columns: 1fr;
  }

  .main-content {
    padding: 18px;
  }

  .action-section {
    justify-content: stretch;
  }

  .pay-button-modern {
    width: 100%;
  }

  .movements-header {
    padding: 16px;
  }
}

/* === Ajuste minimalista/profesional === */
.movements-page {
  padding: 24px 16px 64px;
}

.account-card {
  box-shadow: none;
}

.header-section {
  padding: 24px;
}

.back-button {
  box-shadow: none;
}

.back-button:hover {
  box-shadow: none;
}

.profile-name {
  letter-spacing: -0.035em;
}

.profile-icon {
  width: 46px;
  height: 46px;
  background: #f8fafc;
}

.profile-icon .q-icon {
  font-size: 28px !important;
}

.balance-grid {
  gap: 12px;
}

.balance-card {
  padding: 16px;
  background: var(--color-surface);
}

.balance-card:hover {
  transform: none;
  box-shadow: none;
}

.balance-icon {
  width: 38px;
  height: 38px;
  background: #f8fafc;
}

.balance-label {
  font-size: 0.76rem;
}

.balance-amount {
  font-size: clamp(1.2rem, 2.8vw, 1.45rem);
}

.main-content {
  padding: 24px;
}

.account-paid-message {
  border-width: 1px;
}

.movements-wrapper {
  overflow: hidden;
}

.movements-title {
  gap: 10px;
}

.title-icon {
  width: 38px;
  height: 38px;
  background: #f8fafc;
}

.amount-chip {
  box-shadow: none;
}

.movement-card {
  box-shadow: none;
}

@media (max-width: 599px) {
  .movements-page {
    padding: 12px 12px 32px;
  }

  .header-section,
  .main-content {
    padding: 16px;
  }

  .back-button {
    margin-bottom: 18px;
  }

  .profile-info {
    grid-template-columns: minmax(0, 1fr) auto;
    align-items: start;
  }

  .profile-icon {
    width: 40px;
    height: 40px;
  }

  .profile-icon .q-icon {
    font-size: 24px !important;
  }

  .profile-name {
    font-size: clamp(1.45rem, 7vw, 1.85rem);
  }

  .balance-card {
    padding: 14px;
  }
}

.profile-info {
  display: block;
  margin-bottom: 18px;
}

.profile-details {
  text-align: left;
}

.profile-icon {
  display: none;
}

.header-section {
  padding: 22px 24px;
}

.header-separator {
  margin: 18px 0;
}

.movement-eyebrow {
  margin-bottom: 6px;
}

.account-type {
  margin-top: 6px;
}

@media (max-width: 959px) {
  .profile-info {
    display: block;
  }

  .profile-details {
    text-align: left;
  }
}

/* Uso completo del ancho disponible */
.movements-page {
  padding-right: clamp(10px, 2vw, 24px);
  padding-left: clamp(10px, 2vw, 24px);
}

.account-card {
  width: 100%;
  max-width: none;
  margin: 0;
}

.header-content,
.main-content,
.balance-grid,
.action-section,
.movements-wrapper,
.table-container,
.movements-table {
  width: 100%;
}

@media (max-width: 599px) {
  .movements-page {
    padding-right: 10px;
    padding-left: 10px;
  }
}
</style>
