<template>
  <q-page class="institutional-page">
    <div class="institutional-content">
      <section class="institutional-hero">
        <div class="institutional-hero__copy">
          <span class="institutional-eyebrow">Institucional</span>
          <h1>Club Empleados de Telpin</h1>
          <p>
            Una asociación civil de Pinamar que impulsa el deporte, la cultura y el encuentro entre socios y familias.
          </p>
        </div>

        <div class="institutional-hero__meta">
          <span>Asociación Civil</span>
          <strong>Pinamar, Buenos Aires</strong>
        </div>
      </section>

      <section class="institutional-summary">
        <article class="institutional-summary__card">
          <span>01</span>
          <h2>Deporte</h2>
          <p>Promoción, enseñanza y práctica deportiva para la comunidad del club.</p>
        </article>
        <article class="institutional-summary__card">
          <span>02</span>
          <h2>Cultura</h2>
          <p>Actividades que fortalecen el desarrollo social, intelectual y cultural.</p>
        </article>
        <article class="institutional-summary__card">
          <span>03</span>
          <h2>Comunidad</h2>
          <p>Espacios de participación, cordialidad y solidaridad entre asociados.</p>
        </article>
      </section>

      <section class="institutional-objectives">
        <div class="institutional-objectives__intro">
          <span class="institutional-eyebrow">Propósito</span>
          <h2>Objetivos del club</h2>
          <p>
            El CET trabaja para sostener una institución cercana, activa y con mirada de crecimiento.
          </p>
        </div>

        <div class="objectives-list">
          <article v-for="objetivo in objetivos" :key="objetivo" class="objective-item">
            <q-icon name="check_circle" size="22px" />
            <span>{{ objetivo }}</span>
          </article>
        </div>
      </section>

      <section class="institutional-commission">
        <div class="commission-heading">
          <div>
            <span class="institutional-eyebrow">Autoridades</span>
            <h2>Comisión Directiva</h2>
            <p>Período 2025</p>
          </div>
          <q-btn
            label="Documentación"
            icon-right="open_in_new"
            class="app-btn app-btn--secondary"
            unelevated
            target="_blank"
            href="https://sites.google.com/cetpinamar.com.ar/comision2021/inicio"
          />
        </div>

        <div class="members-grid">
          <article v-for="miembro in directiva" :key="`${miembro.cargo}-${miembro.nombre}`" class="member-card">
            <q-avatar class="member-card__avatar" size="58px" text-color="white">
              {{ getInitials(miembro.nombre) }}
            </q-avatar>
            <div>
              <h3>{{ miembro.nombre }}</h3>
              <span>{{ miembro.cargo }}</span>
              <a class="member-card__mail" :href="`mailto:${miembro.email}`">{{ miembro.email }}</a>
            </div>
          </article>
        </div>
      </section>
    </div>
  </q-page>
</template>

<script setup lang="ts">
const objetivos = [
  'Ejercer el mantenimiento, fortalecimiento y desarrollo del sentimiento del amor al deporte como un medio de unión entre los socios y sus familias.',
  'Promover la práctica y enseñanza de todos los deportes.',
  'Promover las actividades culturales.',
  'Promover actividades sociales que contribuyan a fortalecer los vínculos entre los socios y sus familias.',
  'Relacionarse con otras instituciones similares del país.',
  'Adquirir, arrendar o gerenciar espacios inmuebles apropiados como así también los bienes muebles necesarios para la consecución de sus fines.',
  'Desarrollar un ambiente de cordialidad y solidaridad entre sus asociados y propender al mejoramiento intelectual y cultural de los mismos.',
];

const directiva = [
  { nombre: 'Rodrigo Oliver', cargo: 'Presidente', email: 'rodrigo.oliver@cetpinamar.com.ar' },
  { nombre: 'Doverli Esteban Coran', cargo: 'Vicepresidente', email: 'doverli@cetpinamar.com.ar' },
  { nombre: 'Juan Pablo Bianucci', cargo: 'Secretario', email: 'juan.bianucci@cetpinamar.com.ar' },
  { nombre: "Patricio Javier O'Neill", cargo: 'Pro Secretario', email: 'patricio.oneill@cetpinamar.com.ar' },
  { nombre: 'Ximena Miguez', cargo: 'Tesorero', email: 'ximena.miguez@cetpinamar.com.ar' },
  { nombre: 'Mariela Corán', cargo: 'Pro Tesorero', email: 'marielac@cetpinamar.com.ar' },
  { nombre: 'Leandro Gabriel Laudano', cargo: 'Vocal Titular', email: 'leandro.laudano@cetpinamar.com.ar' },
  { nombre: 'Dina Giordano', cargo: 'Vocal Titular', email: 'dina.giordano@cetpinamar.com.ar' },
  { nombre: 'Mariano Hueter', cargo: 'Vocal Titular', email: 'mariano.hueter@cetpinamar.com.ar' },
  { nombre: 'Christian Alexis Frejeiro', cargo: 'Vocal Titular', email: 'christian.frejeiro@cetpinamar.com.ar' },
  { nombre: 'Tristana Cangiano', cargo: 'Vocal Suplente', email: 'tristana.cangiano@cetpinamar.com.ar' },
  { nombre: 'Diego Mainini', cargo: 'Vocal Suplente', email: 'diego.mainini@cetpinamar.com.ar' },
  { nombre: 'Juan Algieri', cargo: 'Vocal Suplente', email: 'juan.algieri@cetpinamar.com.ar' },
  { nombre: 'Ana Garbino', cargo: 'Vocal Suplente', email: 'ana.garbino@cetpinamar.com.ar' },
  { nombre: 'Abel Casado', cargo: 'Revisor de Cuentas Titular', email: 'abel.casado@cetpinamar.com.ar' },
  { nombre: 'Fabiola Corina Roth', cargo: 'Revisor de Cuentas Titular', email: 'fabiola.roth@cetpinamar.com.ar' },
  { nombre: 'Ricardo Martin Pagano', cargo: 'Revisor de Cuentas Titular', email: 'martin.pagano@cetpinamar.com.ar' },
  { nombre: 'Florencia Canepa', cargo: 'Revisor de Cuentas Suplente', email: 'florencia.canepa@cetpinamar.com.ar' },
];

const getInitials = (nombre: string) => nombre
  .split(' ')
  .filter(Boolean)
  .map((word) => word.charAt(0))
  .join('')
  .substring(0, 2)
  .toUpperCase();
</script>
