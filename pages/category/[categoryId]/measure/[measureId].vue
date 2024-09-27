<template>
  <div class="main-content">
    <Card>
      <template #title>
        {{  additionalData?.short_title || measure?.['Action outline']['Action name'] }}
        <Tag :value="measure?.category" />
      </template>
      <template #content>
        <p class="prosa">
          {{  additionalData?.summary }}
        </p>
        <div v-if="progress?.measure === 'percent'">
          <Chart type="line" :data="chartData" :options="chartOptions" class="h-[30rem]" />
        </div>
        <div v-if="progress?.measure === 'percent'">
          <MeterGroup :value="[{
            label: 'erreicht',
            value: progress?.progress,
            color: 'var(--p-green-500)'
            } ]" />
          {{ progress?.progress }} % erreicht
        </div>

        <div v-if="progress?.measure === 'binary'">
          Aktueller Status:
          {{ progress?.status === 'completed' ? 'Erreicht' : 'Nicht erreicht' }}
        </div>
      </template>
    </Card>

    <template v-if="!!additionalData?.user_action">
      <div id="alert-additional-content-1" class="p-4 mb-4 text-blue-800 border border-blue-300 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400 dark:border-blue-800" role="alert">
        <div class="flex items-center">
          <svg class="flex-shrink-0 w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
          </svg>
          <span class="sr-only">Info</span>
          <h3 class="text-lg font-medium">Werde selber aktiv</h3>
        </div>
        <div class="mt-2 mb-4 text-sm">
          {{ additionalData?.user_action.description }}
        </div>
        <div class="flex">
          <a
            class="text-white bg-blue-800 hover:bg-blue-900 focus:ring-4 focus:outline-none focus:ring-blue-200 font-medium rounded-lg text-xs px-3 py-1.5 me-2 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            :href="additionalData?.user_action.href"
          >
            <svg class="me-2 h-3 w-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 14">
              <path d="M10 0C4.612 0 0 5.336 0 7c0 1.742 3.546 7 10 7 6.454 0 10-5.258 10-7 0-1.664-4.612-7-10-7Zm0 10a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z"/>
            </svg>
            {{ additionalData?.user_action.label }}
          </a>
        </div>
      </div>
    </template>

    <template v-for="k in ['Action outline', 'Reference to impact pathway', 'Implementation', 'Impact & cost']">
      <div class="overflow-hidden bg-white shadow sm:rounded-lg">
        <div class="px-4 py-6 sm:px-6">
          <h3 class="text-base font-semibold leading-7 text-gray-900">{{ k }}</h3>
          <p class="mt-1 max-w-2xl text-sm leading-6 text-gray-500">weitere Informationen</p>
        </div>
        <div class="border-t border-gray-100">
          <dl class="divide-y divide-gray-100">

            <template v-for="value, key in measure?.[k]">
              <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-900">{{key}}</dt>
                <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0" v-html="value.replaceAll('\n', '<br/>')"></dd>
              </div>
            </template>
          </dl>
        </div>
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup>
import Chart from 'primevue/chart';
import { getMeasure, getProgressForMeasure, getAdditionalMeasureData, getProgressListForMeasure } from '~/dataProcessing/loadData';

const route = useRoute();

const measure = await getMeasure(route.params.measureId as string);
const progress = await getProgressForMeasure(route.params.measureId as string);
const progressList = await getProgressListForMeasure(route.params.measureId as string);

const chartData = {
  labels: ["2021-01-01", "2021-04-01", "2021-07-01", "2021-10-01", "2022-01-01", "2022-04-01", "2022-07-01", "2022-10-01", "2023-01-01", "2023-04-01", "2023-07-01", "2023-10-01", "2024-01-01", "2024-04-01", "2024-07-01", "2024-10-01"],
  datasets: [
    {
      label: "Fortschritt",
      data: progressList.map(p => p.progress),
      fill: false,
      borderColor: "rgb(75, 192, 192)",
      tension: 0.1,
      stepped: true
    }
  ]
}
const chartOptions = {
  scales: {
    y: {
      min: 0,
      max: 100,
    }
  }
}
const additionalData = await getAdditionalMeasureData(route.params.measureId as string);
</script>

<style>
.main-content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
