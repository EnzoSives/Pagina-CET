<template>
  <q-card class="q-pa-md shadow-2 full-width card-container bg-grey-2">
    <div class="text-h5 text-primary text-center">Socio</div>
    <q-card-section>
      <p class="text-body1 text-justify">
        Si sos socio del CET, tenés beneficios en comercios adheridos que podés consultar en la app del CET.
      </p>
      <q-btn color="primary" label="Quiero Asociarme al CET" class="full-width"
        @click="goTo('https://docs.google.com/forms/d/e/1FAIpQLSd8c8tQjiLs01-gDbRoET4kdYYyxzAhbO-BI8vqkOrolAMENg/viewform')" />
    </q-card-section>

    <q-separator />

    <q-card-section>
      <div class="text-h6 text-center">Formas de pago</div>

      <q-list bordered separator>
        <q-item class="q-pa-sm">
          <q-item-section>
            <q-item-label class="text-bold">Débito en la Factura de Telpin</q-item-label>
            <q-item-label caption>
              Si querés el débito en la factura de Telpin, contactanos para debitar el importe de la cuota.
            </q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-btn color="primary" label="Registrate" class="full-width" style="margin: 10px"
              @click="goTo('https://docs.google.com/forms/d/e/1FAIpQLSd8c8tQjiLs01-gDbRoET4kdYYyxzAhbO-BI8vqkOrolAMENg/viewform')" />
          </q-item-section>
        </q-item>

        <q-item class="q-pa-sm">
          <q-item-section>
            <q-item-label class="text-bold">Pagá Con Tarjeta De Crédito</q-item-label>
            <q-item-label caption>
              Adherite al débito automático mensual con tu tarjeta de crédito.
            </q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-btn color="primary" label="Pago Mensual Débito Automático" class="full-width" style="margin: 10px"
              @click="goTo('https://www.mercadopago.com.ar/subscriptions/checkout?preapproval_plan_id=79be242f4a2c4f22b9f5e09a1ccefc9e')" />
          </q-item-section>
        </q-item>

        <q-item class="q-pa-sm">
          <q-item-section>
            <q-item-label class="text-bold">Pagá Tu Cuota De Socio Anual</q-item-label>
            <q-item-label caption>
              Podés pagar el monto anual de la cuota de socio (incluso en efectivo).
            </q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-btn color="primary" label="Pago Anual" class="full-width" style="margin: 10px"
              @click="goTo('https://www.mercadopago.com.ar/subscriptions/checkout?preapproval_plan_id=ea3c3e1a5d5c47dfb7f4b7aa46da3860')" />
          </q-item-section>
        </q-item>
      </q-list>
    </q-card-section>

    <q-separator />

    <q-card-section>
      <div class="text-h6 text-center">Contacto</div>
      <p class="text-body1 text-center">
        Por cualquier consulta, contactanos o seguinos en nuestras redes.
      </p>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
const goTo = (url: string) => {
  window.open(url, '_blank');
};
</script>

<style scoped>
.full-width {
  width: 100%;
}

.card-container {
  padding-top: 125px;
  min-height: auto;
}

@media (max-width: 600px) {
  .card-container {
    padding-top: 60px;
    /* Reducir aún más en móviles */
  }

  .text-h5 {
    font-size: 1.3rem;
  }

  .text-h6 {
    font-size: 1.1rem;
  }

  .q-btn {
    font-size: 0.9rem;
    padding: 10px;
  }

  .q-item {
    flex-direction: column;
    align-items: flex-start;
  }

  .q-item-section.side {
    margin-top: 8px;
    width: 100%;
  }
}
</style>
