<template>
  <q-card class="q-pa-md shadow-2 full-width" style="padding-top: 150px; min-height: 100vh;">
    <div class="text-h5 text-primary">Socio</div>
    <q-card-section>
      <p>Si sos socio del CET, tenés beneficios en comercios adheridos que podés consultar en la app del CET.</p>
      <q-btn color="primary" label="Quiero Asociarme al CET" class="full-width" />
    </q-card-section>

    <q-separator />

    <q-card-section>
      <div class="text-h6">Formas de pago</div>

      <q-list bordered separator>
        <q-item>
          <q-item-section>
            <q-item-label class="text-bold">Débito en la Factura de Telpin</q-item-label>
            <q-item-label caption>
              Si querés el débito en la factura de Telpin, contactanos para debitar el importe de la cuota.
            </q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-btn color="primary" label="Registrate" class="full-width" />
          </q-item-section>
        </q-item>

        <q-item>
          <q-item-section>
            <q-item-label class="text-bold">Pagá Con Tarjeta De Crédito</q-item-label>
            <q-item-label caption>
              Adherite al débito automático mensual con tu tarjeta de crédito.
            </q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-btn color="primary" label="Pago Mensual Débito Automático" class="full-width" />
          </q-item-section>
        </q-item>

        <q-item>
          <q-item-section>
            <q-item-label class="text-bold">Pagá Tu Cuota De Socio Anual</q-item-label>
            <q-item-label caption>
              Podés pagar el monto anual de la cuota de socio (incluso en efectivo).
            </q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-btn color="primary" label="Pago Anual" class="full-width" />
          </q-item-section>
        </q-item>
      </q-list>
    </q-card-section>

    <q-separator />

    <q-card-section>
      <div class="text-h6">Contacto</div>
      <p>Por cualquier consulta, contactanos o seguinos en nuestras redes.</p>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
</script>

<style scoped>
.full-width {
  width: 100%;
}

@media (max-width: 600px) {
  /* Ajustes específicos para móviles */
  .q-card {
    padding-top: 80px; /* Reducir el espacio superior */
  }

  .text-h5 {
    font-size: 1.5rem; /* Ajustar tamaño del título */
  }

  .text-h6 {
    font-size: 1.2rem; /* Ajustar tamaño de subtítulos */
  }

  .q-btn {
    width: 100% !important; /* Hacer que los botones se adapten */
  }

  .q-avatar img {
    width: 30px; /* Reducir el tamaño de los iconos en dispositivos móviles */
    height: 30px;
  }
}
</style>

