<template>
  <Breadcrumbs :items="items"/>
  <section class="container" style="margin-bottom: 2rem;">
    <h1 class="headline headline-with-icon" :data-is-measure="true">
      {{ measure?.additionalData?.short_title || measure?.original['Action outline']['Action name'] }}
      <CategoryTag :title="measure?.category || ''" :category-id="measure?.category || ''" />
    </h1>
    <Card>
      <template #content>
        <p class="prosa">
          {{ measure?.additionalData?.summary }}
        </p>
        <div v-if="measure?.progress?.type === 'percent'">
          <Chart type="line" :data="chartData" :options="chartOptions" class="h-[30rem]"/>
        </div>
        <div v-if="measure?.progress?.type === 'count'">
          <Chart type="line" :data="chartData" :options="chartOptions" class="h-[30rem]"/>
        </div>
        <div v-if="measure?.progress?.type === 'percent'">
          <MeterGroup :value="[{
            label: 'erreicht',
            value: measure?.progress?.values[measure?.progress?.values.length - 1].value,
            color: 'var(--p-green-500)'
            } ]"/>
          {{ measure?.progress?.values[measure?.progress?.values.length - 1].value }} % erreicht
        </div>

        <div v-if="measure?.progress?.type === 'binary'">
          Aktueller Status:
          {{
            measure?.progress?.values[measure?.progress?.values.length - 1]?.value === 'completed' ? 'Erreicht' : 'Nicht erreicht'
          }}
        </div>
      </template>
    </Card>
  </section>
  <section class="action-section section" v-if="!!measure?.additionalData?.user_action">
    <div id="alert-additional-content-1" class="container" role="alert">
      <h1 class="headline">Werde selber aktiv!</h1>
      <p class="action-section--text">
        {{ measure?.additionalData?.user_action.description }}
      </p>
      <div class="action-section--button">
        <Button as="a" :label="measure?.additionalData?.user_action.label" :href="measure?.additionalData?.user_action.href" outlined />
      </div>
    </div> 
  </section>

  <section class="action-section section error" v-if="measure?.status === 'stale'">
    <div id="alert-additional-content-1" class="container" role="alert">
      <h1 class="headline">Frage nach!</h1>
      <p class="action-section--text">
        Frage jetzt die Verantwortlichen nach neuen Informationen!
      </p>
      <div class="action-section--button">
        <Button as="a" label="Jetzt Daten anfragen" href="https://fragdenstaat.de/" outlined target="_blank" />
      </div>
    </div>
  </section>
  <section class="section container">
    <h1 class="headline">Maßnahmen-Details</h1>
    <div class="overflow-hidden bg-white shadow sm:rounded-lg mb-6">
      <div class="px-4 py-6 sm:px-6">
        <h3 class="text-base font-semibold leading-7 text-gray-900">Beschreibung</h3>
        <p class="mt-1 max-w-6xl text-sm leading-6 text-gray-500">
          Darum geht es
        </p>
      </div>
      <div class="border-t border-gray-100">
        <dl class="divide-y divide-gray-100">
          <div class="px-4 py-6 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-6">
            <dt class="text-sm font-medium text-gray-900">
              Worum geht es?
            </dt>
            <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-3 sm:mt-0">
              {{ measure?.original?.['Action outline']['Action name'] }}
            </dd>
          </div>
          <div class="px-4 py-6 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-6">
            <dt class="text-sm font-medium text-gray-900">
              Was wird im Detail geplant?
            </dt>
            <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-3 sm:mt-0"
                v-html="measure?.original?.['Action outline']['Action description'].replaceAll('\n', '<br/>').replaceAll('\t', '<span class=\'pl-4\'></span>')"></dd>
          </div>
        </dl>
      </div>
    </div>
    <div class="overflow-hidden bg-white shadow sm:rounded-lg mb-6">
      <div class="px-4 py-6 sm:px-6">
        <h3 class="text-base font-semibold leading-7 text-gray-900">Auswirkungen</h3>
        <p class="mt-1 max-w-6xl text-sm leading-6 text-gray-500">
          Fakten die erreicht werden wollen
        </p>
      </div>
      <div class="border-t border-gray-100">
        <dl class="divide-y divide-gray-100">
          <div class="px-4 py-6 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-6" v-if="measure?.original?.['Impact & cost']?.['Generated renewable energy (if applicable)'] !==''">
            <dt class="text-sm font-medium text-gray-900">
              Neu generierte erneuerbare Energien
            </dt>
            <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-3 sm:mt-0">
              {{ measure?.original?.['Impact & cost']?.['Generated renewable energy (if applicable)'] }}
            </dd>
          </div>
          <div class="px-4 py-6 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-6">
            <dt class="text-sm font-medium text-gray-900">
              Welcher Energieträger wurde reduziert/ersetzt?
            </dt>
            <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-3 sm:mt-0">
              {{ measure?.original?.['Impact & cost']?.['Removed/substituted energy, volume, or fuel type'] }}
            </dd>
          </div>
          <div class="px-4 py-6 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-6">
            <dt class="text-sm font-medium text-gray-900">
              Geschätzte potentielle CO2-Einsparung
            </dt>
            <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-3 sm:mt-0"
                v-html="measure?.original?.['Impact & cost']?.['GHG emissions reduction estimate (total) per emission source sector']?.replaceAll('\n', '<br/>').replaceAll('\t', '<span class=\'pl-4\'></span>')"></dd>
          </div>
          <div class="px-4 py-6 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-6">
            <dt class="text-sm font-medium text-gray-900">
              Kosten der Maßnahme
            </dt>
            <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-3 sm:mt-0">
              {{ measure?.additionalData?.cost.value === null ? "keine Angabe/trifft nicht zu" : formatNumber(measure?.additionalData?.cost.value).concat(" €")}}
            </dd>
          </div>
        </dl>
      </div>
    </div>
    <div class="overflow-hidden bg-white shadow sm:rounded-lg mb-6">
      <div class="px-4 py-6 sm:px-6">
        <h3 class="text-base font-semibold leading-7 text-gray-900">Umsetzung</h3>
        <p class="mt-1 max-w-6xl text-sm leading-6 text-gray-500">
          Details zur Umsetzung der Maßnahme
        </p>
      </div>
      <div class="border-t border-gray-100">
        <dl class="divide-y divide-gray-100">
          <div class="px-4 py-6 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-6">
            <dt class="text-sm font-medium text-gray-900">
              Welchen Bereich betrifft die Maßnahme?
            </dt>
            <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-3 sm:mt-0">
              {{ measure?.original?.['Implementation']?.['Action scale & addressed entities'] }}
            </dd>
          </div>
          <div class="px-4 py-6 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-6">
            <dt class="text-sm font-medium text-gray-900">
              Wer macht es?
            </dt>
            <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-3 sm:mt-0">
              {{ measure?.original?.['Implementation']?.['Responsible bodies/person for implementation'] }}
            </dd>
          </div>
          <div class="px-4 py-6 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-6">
            <dt class="text-sm font-medium text-gray-900">
              Wer ist noch beteiligt?
            </dt>
            <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-3 sm:mt-0"
                v-html="measure?.original?.['Implementation']?.['Involved stakeholders']?.replaceAll('\n', '<br/>').replaceAll('\t', '<span class=\'pl-4\'></span>')"></dd>
          </div>
          <div class="px-4 py-6 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-6">
            <dt class="text-sm font-medium text-gray-900">
              Geplante Umsetzung bis
            </dt>
            <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-3 sm:mt-0">
              {{ measure?.additionalData?.cost.until_in_years }}
            </dd>
          </div>
          <div class="px-4 py-6 sm:grid sm:grid-cols-1 sm:gap-4 sm:px-6">
            <dt class="text-sm font-medium text-gray-900">
              Was sind die konkreten Schritte/Fortschritte?
            </dt>  
            <template>
                <div class="card">
                    <Timeline :value="events" align="alternate" class="customized-timeline">
                        <template #marker="slotProps">
                            <span class="flex w-8 h-8 items-center justify-center text-white rounded-full z-10 shadow-sm" :style="{ backgroundColor: slotProps.item.color }">
                                <i :class="slotProps.item.icon"></i>
                            </span>
                        </template>
                        <template #content="slotProps">
                            <Card style="text-align: left;">
                                <template #title>
                                    {{ slotProps.item.status }}
                                </template>
                                <template #subtitle>
                                    {{ slotProps.item.date }}
                                </template>
                                <template #content>
                                    <!-- <img v-if="slotProps.item.image" :src="`https://primefaces.org/cdn/primevue/images/product/${slotProps.item.image}`" :alt="slotProps.item.name" width="200" class="shadow-sm" /> -->
                                    <p v-html="measure?.original?.['Implementation']?.['Comments on implementation']?.replaceAll('\n', '<br/>').replaceAll('\t', '<span class=\'pl-4\'></span>')">
                                    </p>
                                    <!-- <Button label="Read more" text></Button> -->
                                </template>
                            </Card>
                        </template>
                    </Timeline>
                </div>
            </template>
            <!-- <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-3 sm:mt-0"
                v-html=></dd> -->
          </div>
        </dl>
      </div>
    </div>
  </section>
  <section class="section container">
    <h1 class="headline">Weitere Informationen</h1>
    <div class="rohdaten-accordion">
      <div class="flex mb-4 gap-2">
        <div class="px-4 py-6 sm:px-6">
          <h3 class="text-base font-semibold leading-7 text-gray-900">Rohdaten aus dem Klimastadtvertrag</h3>
          <p class="mt-1 max-w-6xl text-sm leading-6 text-gray-500">
            Für alle, die es genauer wissen wollen
          </p>
        </div>
      </div>
      <Accordion :value="[]" multiple>
        <template v-for="(k, index) in ['Action outline', 'Reference to impact pathway', 'Implementation', 'Impact & cost']">
          <AccordionPanel :value="index">

            <AccordionHeader>{{ k }}</AccordionHeader>
            <AccordionContent>
              <div class="border-t border-gray-100">
                <dl class="divide-y divide-gray-100">
                  <template v-for="(value, key) in measure?.original?.[k]">
                    <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt class="text-sm font-medium text-gray-900">{{key}}</dt>
                      <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0" v-html="value.replaceAll('\n', '<br/>').replaceAll('\t', '<span class=\'pl-4\'></span>')"></dd>
                    </div>
                  </template>
                </dl>
              </div>
            </AccordionContent>
          </AccordionPanel>
        </template>

      </Accordion>
    </div>
  </section>
</template>

<!-- <style lang="scss" scoped>
@media screen and (max-width: 960px) {
    ::v-deep(.customized-timeline) {
        .p-timeline-event:nth-child(even) {
            flex-direction: row;

            .p-timeline-event-content {
                text-align: left;
            }
        }

        .p-timeline-event-opposite {
            flex: 0;
        }
    }
}
</style> -->

<script lang="ts" setup>
import Chart from 'primevue/chart';
import { getMeasure } from '~/dataProcessing/loadData';
import annotationPlugin from 'chartjs-plugin-annotation';
import { Chart as ChartJS, registerables } from 'chart.js';
import { Breadcrumbs, CategoryTag } from '~/components';
import Accordion from 'primevue/accordion';
import AccordionPanel from 'primevue/accordionpanel';
import AccordionHeader from 'primevue/accordionheader';
import AccordionContent from 'primevue/accordioncontent';
import {formatNumber} from "chart.js/helpers";
import 'chartjs-adapter-moment';
import Timeline from 'primevue/timeline';

import { ref } from "vue";

const events = ref([
    { status: 'Sachstand 2024', date: '01/08/2024', icon: 'pi pi-cog', color: '#673AB7' },
    { status: 'Klimastadtvertrag', date: '01/07/2024', icon: 'pi pi-shopping-cart', color: '#9C27B0'},
    // { status: 'Shipped', date: '15/10/2020 16:15', icon: 'pi pi-shopping-cart', color: '#FF9800' },
    // { status: 'Delivered', date: '16/10/2020 10:00', icon: 'pi pi-check', color: '#607D8B' }
]);


ChartJS.register(...registerables, annotationPlugin);
const route = useRoute();

const measure = await getMeasure(route.params.measureId as string);

const items = ref([
    { label: measure?.category, route: `/category/${measure?.categoryId}` },
    { label: measure?.additionalData?.short_title || measure?.original['Action outline']['Action name'] },
]);
const chartData = {
  datasets: [
    {
      label: measure?.progress?.label || "Fortschritt",
      data: measure?.progress?.values.map((v) => {
        return {x: (v.date as Date).toISOString().split('T')[0], y: v.value};
      }),
      fill: false,
      borderColor: "rgb(75, 192, 192)",
      tension: 0.1,
      stepped: true
    }
  ]
}

const chartOptions = {
  scales: {
    x: {
      min: measure?.progress?.values[0]?.date < new Date("2024-01-01") ? measure?.progress?.values[0]?.date.toISOString().substring(0, 10) : "2023-01-01",
      max: "2026-10-01",
      type: 'time',
      ticks: {
        stepSize: 3,
      },
      time: {
        unit: 'month',
        tooltipFormat: 'DD.MM.yyyy',
        displayFormats: {
          day: 'DD.MM.yyyy',
        },
      },
      adapters: {
        date: {
          locale: 'de',
        },
      },
    },
    y: {
      min: measure?.progress?.type === 'count' ? measure.progress.yMin : 0,
      max: measure?.progress?.type === 'count' ? measure.progress.yMax : 100,
      title: {
        display: true,
        text: measure?.progress?.type === 'count' ? measure.progress.unit : '%',
        padding: { top: 20, left: 0, right: 0, bottom: 0 },
      },
    },
  },
  plugins: {
    annotation: {
      annotations: measure?.progress?.type === 'count' ? {
        start: {
          type: 'line',
          yMin: measure.progress.start,
          yMax: measure.progress.start,
          borderColor: '#6ee7b7',
          borderWidth: 2,
          borderDash: [5, 5],
          label: {
            content: 'Start',
            enabled: true,
            display: true,
            position: 'end',
          },
        },
        goal: {
          type: 'line',
          yMin: measure.progress.goal,
          yMax: measure.progress.goal,
          borderColor: '#6ee7b7',
          borderWidth: 2,
          borderDash: [5, 5],
          label: {
            content: 'Ziel',
            display: true,
            enabled: true,
            position: 'end',
          },
        },
      } : {},
    },
  },
};
</script>

<style>
.action-section {
  --p-button-outlined-primary-color: #fff;
  --p-button-outlined-primary-border-color: #fff;
  --p-button-outlined-primary-active-background: rgba(255, 255, 255, 0.1);
  --p-button-outlined-primary-hover-background: rgba(255, 255, 255, 0.1);

  background: var(--color-primary);
  padding-block: 5rem;
  color: #fff;
  font-size: 1rem;
 
  .container {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  .headline {
    color: #fff;
    margin-block: 0;
    font-weight: 400;
    font-size: 1.5rem;
  }

  &.error {
    background: var(--p-red-400);
  }
}

.action-section--text {
  line-height: 1.75;
  max-width: 800px;
  margin-inline: auto;
}

.action-section--button {
  display: flex;
  justify-content: center;
}
</style>
