<template>
  <div class="main-content">
    <Card>
      <template #title>
        {{  measure?.['Action outline']['Action name'] }}
        <Tag :value="measure?.category" />
      </template>
      <template #content>
        <div v-if="progress?.measure === 'percent'">
          <Chart type="line" :data="chartData" :options="chartOptions" class="h-[30rem]" />
        </div>
        <div v-if="progress?.measure === 'percent'">
          <MeterGroup :value="[{
            label: 'erreicht',
            value: progress.progress,
            color: 'var(--p-green-500)'
            } ]" />
          {{ progress?.progress }} % erreicht
        </div>

        <div v-if="progress?.measure === 'binary'">
          {{ progress?.status === 'completed' ? 'Erreicht' : 'Nicht erreicht' }}
        </div>
      </template>
    </Card>

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
                <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{{value}}</dd>
              </div>
            </template>
          </dl>
        </div>
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { getMeasure, getProgressForMeasure, getProgressListForMeasure } from '~/dataProcessing/loadData';
import Chart from 'primevue/chart';

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
      tension: 0.1
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
</script>

<style>
.main-content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
