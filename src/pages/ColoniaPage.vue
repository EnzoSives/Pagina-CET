<template>
  <q-page class="colonia-page">
    <div class="colonia-content">
      <section class="colonia-hero">
        <div class="colonia-hero__copy">
          <span class="institutional-eyebrow">Actividades · Colonia / Campus Deportivo</span>
          <h1>Un verano para disfrutar, jugar y vivir grandes aventuras</h1>
          <p>
            Queremos que tus hijos disfruten sus vacaciones en un espacio seguro, al aire libre y rodeado de
            naturaleza, aprovechando la frescura y la magia del bosque.
          </p>

          <div class="colonia-hero__meta">
            <div>
              <span>Edades</span>
              <strong>De 3 a 12 años</strong>
            </div>
            <div>
              <span>Coordinador</span>
              <strong>Emanuel Díaz y su equipo de profesores</strong>
            </div>
          </div>
        </div>

        <img class="colonia-hero__image" :src="`${base}imgs/colonia2.webp`" alt="Colonia de vacaciones, verano 2027" />
      </section>

      <section class="colonia-block">
        <div class="colonia-block__intro">
          <span class="institutional-eyebrow">Programa</span>
          <h2>¿Qué vamos a vivir?</h2>
          <p>
            Junto a nuestro coordinador y su equipo, preparamos una colonia llena de propuestas para que cada
            día sea diferente.
          </p>
        </div>

        <div class="colonia-grid">
          <article v-for="item in actividades" :key="item.label" class="colonia-chip">
            <q-icon :name="item.icon" size="22px" />
            <span>{{ item.label }}</span>
          </article>
        </div>
      </section>

      <section class="colonia-split">
        <article class="colonia-card">
          <span class="institutional-eyebrow">Para los más chiquitines</span>
          <h2>Juegos y creatividad</h2>
          <ul>
            <li v-for="item in chiquitines" :key="item.label">
              <q-icon :name="item.icon" size="20px" />
              <span>{{ item.label }}</span>
            </li>
          </ul>
        </article>

        <article class="colonia-card">
          <span class="institutional-eyebrow">Para los más grandes</span>
          <h2>Deportes y torneos</h2>
          <ul>
            <li v-for="item in grandes" :key="item.label">
              <q-icon :name="item.icon" size="20px" />
              <span>{{ item.label }}</span>
            </li>
          </ul>
        </article>
      </section>

      <section class="colonia-block">
        <div class="colonia-block__intro">
          <span class="institutional-eyebrow">Festejos</span>
          <h2>Los grandes festejos del verano</h2>
        </div>

        <div class="colonia-festejos">
          <article v-for="(festejo, index) in festejos" :key="festejo" class="colonia-festejo">
            <span>{{ String(index + 1).padStart(2, '0') }}</span>
            <h3>{{ festejo }}</h3>
          </article>
        </div>
      </section>

      <section class="colonia-block">
        <div class="colonia-block__intro">
          <span class="institutional-eyebrow">Información</span>
          <h2>Horarios, aranceles y días festivos</h2>
          <p>Verano 2027 · Precolonia desde las 8 horas.</p>
        </div>

        <div class="colonia-info">
          <div class="colonia-info__tables">
            <table class="colonia-table">
              <caption>Horarios</caption>
              <tbody>
                <tr v-for="fila in horarios" :key="fila.label">
                  <th scope="row">{{ fila.label }}</th>
                  <td>{{ fila.valor }}</td>
                </tr>
              </tbody>
            </table>

            <table class="colonia-table">
              <caption>Arancel de la colonia</caption>
              <thead>
                <tr><th>Período</th><th>Valor</th><th>Descuentos / condiciones</th></tr>
              </thead>
              <tbody>
                <tr v-for="fila in aranceles" :key="fila.periodo">
                  <th scope="row">{{ fila.periodo }}</th>
                  <td class="colonia-table__price">{{ fila.valor }}</td>
                  <td>
                    {{ fila.detalle }}
                    <em v-if="fila.descuento">{{ fila.descuento }}</em>
                  </td>
                </tr>
              </tbody>
            </table>

            <table class="colonia-table">
              <caption>Días festivos</caption>
              <tbody>
                <tr v-for="fila in festivos" :key="fila.fecha">
                  <th scope="row">{{ fila.fecha }}</th>
                  <td>La colonia permanecerá <strong>cerrada</strong>.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="colonia-flyers">
            <img :src="`${base}imgs/colonia1.webp`" alt="Flyer Colonia de vacaciones verano 2027" loading="lazy" />
          </div>
        </div>
      </section>

      <section class="colonia-contact">
        <div>
          <h2>Reservá tu vacante</h2>
          <p>Escribinos para consultas e inscripción.</p>
        </div>
        <div class="colonia-contact__actions">
          <q-btn
            label="+54 9 11 5162-3142"
            icon="chat"
            class="app-btn app-btn--primary"
            unelevated
            no-caps
            target="_blank"
            href="https://wa.me/5491151623142"
          />
          <q-btn
            label="@cetcolonia"
            icon="photo_camera"
            class="app-btn app-btn--secondary"
            unelevated
            no-caps
            target="_blank"
            href="https://www.instagram.com/cetcolonia/"
          />
        </div>
      </section>

      <section class="colonia-footer">
        <p>
          Un verano para hacer amigos, descubrir, moverse, explorar y crear recuerdos que quedan para siempre.
        </p>
        <strong>¡Te esperamos para vivir un verano inolvidable! — Club Pinamar CET</strong>
      </section>
    </div>
  </q-page>
</template>

<script setup lang="ts">
const base = process.env.BASE_URL || '/';

interface Item {
  label: string;
  icon: string;
}

const horarios = [
  { label: 'Precolonia', valor: 'A partir de las 8 horas.' },
  { label: 'Horario general', valor: 'De 9:00 a 14:00 hs.' },
  { label: 'Días', valor: 'De lunes a viernes.' },
];

const aranceles = [
  { periodo: 'Matrícula', valor: '$50.000', detalle: 'Para reservar la vacante.', descuento: '' },
  { periodo: 'Diciembre', valor: '$180.000', detalle: 'Del 21 al 31 de diciembre.', descuento: '' },
  {
    periodo: 'Enero',
    valor: '$450.000',
    detalle: 'Del 2 al 31 de enero.',
    descuento: '10% de descuento para socios / 10% de descuento al segundo hermano.',
  },
  {
    periodo: 'Febrero',
    valor: '$250.000',
    detalle: 'Del 1 al 12 de febrero.',
    descuento: '10% de descuento para socios / 10% de descuento al segundo hermano.',
  },
];

const festivos = [{ fecha: '25 de diciembre' }, { fecha: '1 de enero' }];

const actividades: Item[] = [
  { label: 'Juegos con agua todos los días', icon: 'water_drop' },
  { label: 'Recibimientos sorpresa y shows musicales', icon: 'theater_comedy' },
  { label: 'Fiesta temática todos los viernes', icon: 'celebration' },
  { label: 'Circuito de aventura', icon: 'hiking' },
  { label: 'Juegos de búsqueda en la naturaleza', icon: 'search' },
  { label: 'Bicicleteada en La Piña', icon: 'directions_bike' },
  { label: 'Caminatas por el bosque', icon: 'park' },
  { label: 'Taller de huerta', icon: 'eco' },
  { label: 'Música y percusión', icon: 'music_note' },
  { label: 'Experimentos científicos', icon: 'science' },
];

const chiquitines: Item[] = [
  { label: 'Taller de cocineritos', icon: 'soup_kitchen' },
  { label: 'Armado de títeres', icon: 'smart_toy' },
  { label: 'Actividades creativas', icon: 'palette' },
  { label: 'Juegos y propuestas recreativas adaptadas a su edad', icon: 'toys' },
  { label: '¡Y muchas sorpresas!', icon: 'auto_awesome' },
];

const grandes: Item[] = [
  { label: 'Deportes y torneos', icon: 'emoji_events' },
  { label: 'Clínica de hockey', icon: 'sports_hockey' },
  { label: 'Fútbol', icon: 'sports_soccer' },
  { label: 'Vóley', icon: 'sports_volleyball' },
  { label: 'Básquet', icon: 'sports_basketball' },
  { label: 'Clínica de arquería', icon: 'my_location' },
  { label: 'Skate y surf', icon: 'surfing' },
];

const festejos = [
  'Festejo de Reyes Magos',
  'Fiesta del Agua',
  'Fiesta de Inflables',
  'Gran cierre con noche de velada y fogón',
];
</script>

<style scoped lang="scss">
.colonia-page {
  min-height: 100%;
  padding: 0 0 64px;
  background: var(--surface-bg);
  color: var(--color-text);
}

.colonia-content {
  width: 100%;
  padding: 34px clamp(12px, 2vw, 24px) 0;
  display: grid;
  gap: 22px;
}

.colonia-hero {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(300px, 0.5fr);
  gap: clamp(22px, 4vw, 48px);
  align-items: center;
  padding: clamp(28px, 5vw, 54px);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  background: var(--color-surface);

  h1 {
    margin: 0;
    font-size: clamp(2rem, 5vw, 3.6rem);
    font-weight: 850;
    letter-spacing: -0.04em;
    line-height: 1.02;
  }

  p {
    max-width: 780px;
    margin: 18px 0 0;
    color: var(--color-text-soft);
    font-size: clamp(1rem, 2vw, 1.16rem);
    line-height: 1.55;
  }
}

.colonia-hero__meta {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  margin-top: 24px;

  > div {
    display: grid;
    gap: 4px;
    padding: 14px 18px;
    border-radius: var(--radius-sm);
    background: #f8fafc;
  }

  span {
    color: #64748b;
    font-size: 0.74rem;
    font-weight: 850;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  strong {
    font-size: 1.05rem;
    font-weight: 850;
  }
}

.colonia-hero__image {
  align-self: center;
  width: 100%;
  border-radius: var(--radius-sm);
}

.colonia-block {
  padding: clamp(22px, 4vw, 40px);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  background: var(--color-surface);
}

.colonia-block__intro {
  margin-bottom: 22px;

  h2 {
    margin: 0;
    font-size: clamp(1.6rem, 3vw, 2.2rem);
    font-weight: 850;
    letter-spacing: -0.03em;
  }

  p {
    max-width: 640px;
    margin: 10px 0 0;
    color: var(--color-text-soft);
    line-height: 1.55;
  }
}

.colonia-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 12px;
}

.colonia-chip {
  display: flex;
  align-items: center;
  gap: 12px;
  min-height: 64px;
  padding: 14px 16px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  background: #f8fafc;
  font-weight: 650;

  .q-icon {
    flex: none;
    color: var(--color-primary);
  }
}

.colonia-split {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 22px;
}

.colonia-card {
  padding: clamp(22px, 4vw, 36px);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  background: var(--color-surface);

  h2 {
    margin: 0 0 18px;
    font-size: 1.6rem;
    font-weight: 850;
    letter-spacing: -0.03em;
  }

  ul {
    display: grid;
    gap: 12px;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  li {
    display: flex;
    align-items: center;
    gap: 12px;
    color: var(--color-text-soft);

    .q-icon {
      flex: none;
      color: var(--color-accent);
    }
  }
}

.colonia-festejos {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 14px;
}

.colonia-festejo {
  min-height: 130px;
  padding: 20px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  background: #f8fafc;

  span {
    display: inline-block;
    margin-bottom: 14px;
    color: var(--color-primary);
    font-size: 0.82rem;
    font-weight: 850;
  }

  h3 {
    margin: 0;
    font-size: 1.1rem;
    font-weight: 800;
    line-height: 1.3;
  }
}

.colonia-info {
  display: grid;
  grid-template-columns: minmax(0, 1.4fr) minmax(0, 1fr);
  gap: 22px;
  align-items: start;
}

.colonia-info__tables {
  display: grid;
  gap: 22px;
}

.colonia-table {
  width: 100%;
  border-collapse: collapse;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  overflow: hidden;
  font-size: 0.95rem;

  caption {
    padding: 0 0 8px;
    text-align: left;
    font-size: 1.05rem;
    font-weight: 850;
  }

  th,
  td {
    padding: 12px 14px;
    border-bottom: 1px solid var(--color-border);
    text-align: left;
    vertical-align: top;
  }

  thead th {
    background: #f8fafc;
    color: #64748b;
    font-size: 0.74rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  tbody th {
    font-weight: 800;
  }

  td em {
    display: block;
    margin-top: 6px;
    color: var(--color-accent);
    font-style: normal;
    font-weight: 700;
  }
}

.colonia-table__price {
  font-weight: 850;
  white-space: nowrap;
}

.colonia-flyers {
  display: grid;
  gap: 14px;

  img {
    display: block;
    width: 100%;
    border: 1px solid var(--color-border);
    border-radius: var(--radius-sm);
  }
}

.colonia-contact {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  padding: clamp(22px, 4vw, 36px);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  background: var(--color-surface);

  h2 {
    margin: 0;
    font-size: 1.6rem;
    font-weight: 850;
    letter-spacing: -0.03em;
  }

  p {
    margin: 6px 0 0;
    color: var(--color-text-soft);
  }
}

.colonia-contact__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.colonia-footer {
  padding: clamp(22px, 4vw, 36px);
  border-radius: var(--radius-sm);
  background: var(--color-primary);
  color: #fff;

  p {
    margin: 0 0 10px;
    font-size: 1.1rem;
    line-height: 1.5;
  }

  strong {
    font-size: 1.05rem;
  }
}

@media (max-width: 900px) {
  .colonia-hero,
  .colonia-split,
  .colonia-info {
    grid-template-columns: 1fr;
  }
}
</style>
