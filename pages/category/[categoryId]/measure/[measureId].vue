<template>
  <Breadcrumbs :items="items"/>
  <Card>
    <template #title>
      {{ measure?.additionalData?.short_title || measure?.original['Action outline']['Action name'] }}
      <Tag :value="measure?.category"/>
    </template>
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

  <template v-if="!!measure?.additionalData?.user_action">
    <div id="alert-additional-content-1"
          class="p-4 mb-4 text-blue-800 border border-blue-300 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400 dark:border-blue-800"
          role="alert">
      <div class="flex items-center">
        <svg class="flex-shrink-0 w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
              fill="currentColor" viewBox="0 0 20 20">
          <path
              d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
        </svg>
        <span class="sr-only">Info</span>
        <h3 class="text-lg font-medium">Werde selber aktiv</h3>
      </div>
      <div class="mt-2 mb-4 text-sm">
        {{ measure?.additionalData?.user_action.description }}
      </div>
      <div class="flex">
        <a
          class="text-white bg-blue-800 hover:bg-blue-900 focus:ring-4 focus:outline-none focus:ring-blue-200 font-medium rounded-lg text-xs px-3 py-1.5 me-2 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          :href="measure?.additionalData?.user_action.href"
        >
          <svg class="me-2 h-3 w-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 14">
            <path d="M10 0C4.612 0 0 5.336 0 7c0 1.742 3.546 7 10 7 6.454 0 10-5.258 10-7 0-1.664-4.612-7-10-7Zm0 10a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z"/>
          </svg>
          {{ measure?.additionalData?.user_action.label }}
        </a>
      </div>
    </div>
  </template>

  <div class="overflow-hidden bg-white shadow sm:rounded-lg mb-6">
    <div class="px-4 py-6 sm:px-6">
      <h3 class="text-base font-semibold leading-7 text-gray-900">Maßnahmen-Details</h3>
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
              v-html="measure?.original?.['Action outline']['Action description'].replaceAll('\n', '<br/>')"></dd>
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
        <div class="px-4 py-6 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-6" v-if="measure?.original?.['Impact & cost']['Generated renewable energy (if applicable)'] !==''">
          <dt class="text-sm font-medium text-gray-900">
            Neu generierte erneuerbare Energien
          </dt>
          <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-3 sm:mt-0">
            {{ measure?.original?.['Impact & cost']['Generated renewable energy (if applicable)'] }}
          </dd>
        </div>
        <div class="px-4 py-6 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-6">
          <dt class="text-sm font-medium text-gray-900">
            Welcher Energieträger wurde reduziert/ersetzt?
          </dt>
          <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-3 sm:mt-0">
            {{ measure?.original?.['Impact & cost']['Removed/substituted energy, volume, or fuel type'] }}
          </dd>
        </div>
        <div class="px-4 py-6 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-6">
          <dt class="text-sm font-medium text-gray-900">
            Geschätzte potentielle CO2-Einsparung
          </dt>
          <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-3 sm:mt-0"
              v-html="measure?.original?.['Impact & cost']['GHG emissions reduction estimate (total) per emission source sector']?.replaceAll('\n', '<br/>')"></dd>
        </div>
        <div class="px-4 py-6 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-6">
          <dt class="text-sm font-medium text-gray-900">
            Kosten der Maßnahme
          </dt>
          <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-3 sm:mt-0"
              v-html="measure?.original?.['Impact & cost']['Total costs and costs by CO2e unit'].replaceAll('\n', '<br/>')"></dd>
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
            {{ measure?.original?.['Implementation']['Action scale & addressed entities'] }}
          </dd>
        </div>
        <div class="px-4 py-6 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-6">
          <dt class="text-sm font-medium text-gray-900">
            Wer macht es?
          </dt>
          <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-3 sm:mt-0">
            {{ measure?.original?.['Implementation']['Responsible bodies/person for implementation'] }}
          </dd>
        </div>
        <div class="px-4 py-6 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-6">
          <dt class="text-sm font-medium text-gray-900">
            Wer ist noch beteiligt?
          </dt>
          <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-3 sm:mt-0"
              v-html="measure?.original?.['Implementation']['Involved stakeholders'].replaceAll('\n', '<br/>')"></dd>
        </div>
        <div class="px-4 py-6 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-6">
          <dt class="text-sm font-medium text-gray-900">
            Was sind die konkreten Schritte/Fortschritte?
          </dt>
          <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-3 sm:mt-0"
              v-html="measure?.original?.['Implementation']['Comments on implementation'].replaceAll('\n', '<br/>')"></dd>
        </div>
      </dl>
    </div>
  </div>
  <div class="rohdaten-accordion">
    <div class="flex mb-4 gap-2">
      <div class="px-4 py-6 sm:px-6">
        <h3 class="text-base font-semibold leading-7 text-gray-900">Für tiefer-Interessierte</h3>
        <p class="mt-1 max-w-2xl text-sm leading-6 text-gray-500">weitere Informationen</p>
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
                    <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0" v-html="value.replaceAll('\n', '<br/>')"></dd>
                  </div>
                </template>
              </dl>
            </div>
          </AccordionContent>
        </AccordionPanel>
      </template>

    </Accordion>
  </div>
</template>

<script lang="ts" setup>
import Chart from 'primevue/chart';
import { getMeasure, getProgressForMeasure } from '~/dataProcessing/loadData';
import annotationPlugin from 'chartjs-plugin-annotation';
import { Chart as ChartJS, registerables } from 'chart.js';
import { Breadcrumbs } from '~/components';
import Accordion from 'primevue/accordion';
import AccordionPanel from 'primevue/accordionpanel';
import AccordionHeader from 'primevue/accordionheader';
import AccordionContent from 'primevue/accordioncontent';

ChartJS.register(...registerables, annotationPlugin);
const route = useRoute();

const measure = await getMeasure(route.params.measureId as string);

const home = ref({
    icon: 'pi pi-home',
    route: '/'
});
const items = ref([
    { label: measure?.category, route: `/category/${measure?.categoryId}`, icon: 'pi pi-tag' },
    { label: measure?.additionalData?.short_title || measure?.original['Action outline']['Action name'], icon: 'pi pi-tag' },
]);
const chartData = {
  labels: ["2021-01-01", "2021-04-01", "2021-07-01", "2021-10-01", "2022-01-01", "2022-04-01", "2022-07-01", "2022-10-01", "2023-01-01", "2023-04-01", "2023-07-01", "2023-10-01", "2024-01-01", "2024-04-01", "2024-07-01", "2024-10-01"],
  datasets: [
    {
      label: "Fortschritt",
      data: measure?.progress?.values.map((v) => {
        return {x: v.date, y: v.value};
      }),
      fill: false,
      borderColor: "rgb(75, 192, 192)",
      tension: 0.1,
      stepped: true
    }
  ]
}
let chartOptions;
if (measure?.progress?.type === 'count') {
  chartOptions = {
    scales: {
      y: {
        min: measure.progress.yMin,
        max: measure.progress.yMax,
        title: {
          display: true,
          text: measure.progress.unit,
          padding: {top: 20, left: 0, right: 0, bottom: 0}
        }
      }
    },
    plugins: {
      annotation: {
        annotations: {
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
              position: 'end'
            }
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
              position: 'end'
            }
          }
        }
      }
    }
  }
} else {
  chartOptions = {
    scales: {
      y: {
        min: 0,
        max: 100,
        title: {
          display: true,
          text: '%',
          padding: {top: 20, left: 0, right: 0, bottom: 0}
        }
      }
    }
  }
}
</script>

<style>
.main-content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>