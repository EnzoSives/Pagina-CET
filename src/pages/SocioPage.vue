<template>
  <q-page class="socio-page">
    <div class="socio-content">
      <section class="socio-hero">
        <div class="socio-hero__copy">
          <span class="socio-eyebrow">Socios CET</span>
          <h1>Todo para disfrutar tu membresía</h1>
          <p>
            Accedé a beneficios, elegí tu forma de pago y mantenete conectado con la comunidad del club.
          </p>
        </div>

        <div class="socio-hero__action">
          <q-btn label="Quiero asociarme" icon-right="open_in_new" class="app-btn app-btn--primary socio-main-button"
            unelevated @click="goTo(associationUrl)" />
          <span>Completá el formulario y nos contactamos con vos.</span>
        </div>
      </section>

      <section class="socio-summary">
        <article class="summary-card">
          <span class="summary-card__number">01</span>
          <h2>Beneficios</h2>
          <p>Consultá comercios adheridos y promociones desde la app del CET.</p>
        </article>
        <article class="summary-card">
          <span class="summary-card__number">02</span>
          <h2>Pagos simples</h2>
          <p>Elegí débito en factura, tarjeta de crédito o cuota anual.</p>
        </article>
        <article class="summary-card">
          <span class="summary-card__number">03</span>
          <h2>Comunidad</h2>
          <p>Participá de actividades deportivas, sociales y culturales del club.</p>
        </article>
      </section>

      <section class="payment-section">
        <div class="section-heading">
          <span class="socio-eyebrow">Cuotas</span>
          <h2>Formas de pago</h2>
          <p>Seleccioná la opción que mejor se adapte a tu forma de abonar.</p>
        </div>

        <div class="payment-grid">
          <article v-for="payment in payments" :key="payment.title" class="payment-card">
            <div class="payment-card__icon">
              <q-icon :name="payment.icon" size="24px" />
            </div>
            <div class="payment-card__content">
              <h3>{{ payment.title }}</h3>
              <p>{{ payment.description }}</p>
            </div>
            <q-btn :label="payment.action" icon-right="open_in_new" class="app-btn app-btn--secondary payment-button"
              unelevated @click="goTo(payment.url)" />
          </article>
        </div>
      </section>

      <section class="contact-section">
        <div>
          <span class="socio-eyebrow">Contacto</span>
          <h2>¿Tenés dudas?</h2>
          <p>Por cualquier consulta, contactanos o seguinos en nuestras redes.</p>
        </div>
        <q-btn label="Ver redes y contacto" icon-right="south" class="app-btn app-btn--secondary" unelevated
          @click="scrollToFooter" />
      </section>
    </div>
  </q-page>
</template>

<script setup lang="ts">
const associationUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSd8c8tQjiLs01-gDbRoET4kdYYyxzAhbO-BI8vqkOrolAMENg/viewform';
const monthlyUrl = 'https://www.mercadopago.com.ar/subscriptions/checkout?preapproval_plan_id=79be242f4a2c4f22b9f5e09a1ccefc9e';
const annualUrl = 'https://www.mercadopago.com.ar/subscriptions/checkout?preapproval_plan_id=ea3c3e1a5d5c47dfb7f4b7aa46da3860';

const payments = [
  { title: 'Débito en la factura de Telpin', description: 'Si querés el débito en la factura de Telpin, contactanos para debitar el importe de la cuota.', action: 'Registrate', url: associationUrl, icon: 'receipt_long' },
  { title: 'Tarjeta de crédito', description: 'Adherite al débito automático mensual con tu tarjeta de crédito.', action: 'Pago mensual', url: monthlyUrl, icon: 'credit_card' },
  { title: 'Cuota anual', description: 'Podés pagar el monto anual de la cuota de socio, incluso en efectivo.', action: 'Pago anual', url: annualUrl, icon: 'calendar_month' },
];

const goTo = (url: string) => window.open(url, '_blank', 'noopener,noreferrer');
const scrollToFooter = () => document.getElementById('footer')?.scrollIntoView({ behavior: 'smooth' });
</script>

<style scoped>
.socio-page {
  min-height: 100%;
  padding: 0 0 48px;
  background: var(--surface-bg);
}

.socio-content {
  width: 100%;
  padding: 34px clamp(12px, 2vw, 24px) 0;
}

.socio-hero {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(280px, 0.34fr);
  gap: 22px;
  align-items: stretch;
  padding: clamp(28px, 5vw, 54px);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  background: var(--color-surface);
}

.socio-eyebrow {
  display: inline-block;
  margin-bottom: 10px;
  color: #64748b;
  font-size: 0.74rem;
  font-weight: 850;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.socio-hero h1 {
  margin: 0;
  color: var(--color-text);
  font-size: clamp(2.25rem, 6vw, 4.3rem);
  font-weight: 850;
  letter-spacing: -0.045em;
  line-height: 0.98;
}

.socio-hero p {
  max-width: 720px;
  margin: 18px 0 0;
  color: var(--color-text-soft);
  font-size: clamp(1rem, 2vw, 1.16rem);
  line-height: 1.55;
}

.socio-hero__action {
  display: grid;
  align-content: center;
  justify-items: stretch;
  gap: 12px;
  padding: 22px;
  border-radius: var(--radius-sm);
  background: #f8fafc;
}

.socio-hero__action span {
  color: var(--color-text-soft);
  font-size: 0.92rem;
  line-height: 1.45;
  text-align: center;
}

.payment-section,
.contact-section,
.socio-summary {
  margin-top: 22px;
}

.socio-summary {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
}

.summary-card {
  min-height: 150px;
  padding: 20px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  background: var(--color-surface);
}

.summary-card__number {
  display: inline-block;
  margin-bottom: 18px;
  color: var(--color-primary);
  font-size: 0.82rem;
  font-weight: 850;
}

.summary-card h2,
.section-heading h2,
.contact-section h2 {
  margin: 0;
  color: var(--color-text);
  font-weight: 850;
  letter-spacing: -0.035em;
  line-height: 1.08;
}

.summary-card h2 {
  font-size: 1.18rem;
}

.summary-card p,
.section-heading p,
.contact-section p,
.payment-card p {
  color: var(--color-text-soft);
  line-height: 1.5;
}

.summary-card p {
  margin: 8px 0 0;
  font-size: 0.92rem;
}

.payment-section {
  padding: 28px 0 0;
}

.section-heading {
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 24px;
  margin-bottom: 16px;
}

.section-heading h2,
.contact-section h2 {
  font-size: clamp(1.55rem, 3vw, 2.1rem);
}

.section-heading p {
  max-width: 460px;
  margin: 0;
  text-align: right;
}

.payment-grid {
  display: grid;
  gap: 12px;
}

.payment-card {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto;
  align-items: center;
  gap: 16px;
  min-height: 104px;
  padding: 18px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  background: var(--color-surface);
}

.payment-card__icon {
  display: grid;
  place-items: center;
  width: 46px;
  height: 46px;
  border-radius: var(--radius-sm);
  background: #f8fafc;
  color: var(--color-primary);
}

.payment-card h3 {
  margin: 0;
  color: var(--color-text);
  font-size: 1rem;
  font-weight: 850;
  line-height: 1.2;
}

.payment-card p {
  margin: 6px 0 0;
  font-size: 0.92rem;
}

.socio-main-button,
.payment-button {
  min-width: 160px;
}

.contact-section {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  padding: 22px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  background: var(--color-surface);
}

.contact-section p {
  margin: 8px 0 0;
}

@media (max-width: 600px) {
  .socio-page { padding-bottom: 32px; }
  .socio-content { padding: 18px 10px 0; }
  .socio-hero { grid-template-columns: 1fr; padding: 24px 18px; }
  .socio-hero__action { padding: 16px; }
  .socio-summary { grid-template-columns: 1fr; }
  .section-heading,
  .contact-section {
    display: grid;
    align-items: start;
  }
  .section-heading p { text-align: left; }
  .payment-card {
    grid-template-columns: 1fr;
    align-items: start;
  }
  .payment-card__icon { width: 42px; height: 42px; }
  .socio-main-button,
  .payment-button,
  .contact-section .app-btn { width: 100%; }
}

@media (min-width: 601px) and (max-width: 900px) {
  .socio-hero,
  .socio-summary {
    grid-template-columns: 1fr;
  }

  .section-heading {
    align-items: start;
  }

  .section-heading p {
    text-align: left;
  }
}
</style>
