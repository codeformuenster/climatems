<template>
  <section>
    <h3 class="ml-2 mt-2 text-base font-semibold leading-6 text-gray-900">Die letzten Updates</h3>
    <dl class="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      <NewsCard
        v-for="measure in newsMeasures"
        :title="measure.additionalData?.short_title || measure.original['Action outline']['Action name']"
        :category="measure.category"
        status="in_progress"
        :value="measure.progress.values[measure.progress.values.length - 1].value"
        :label="measure.progress?.goal"
        :change="getChange(measure.progress)"
        change-type="increase"
        change-semantic="positive"
        :category-id="measure.categoryId"
        :measure-id="measure.id"
      />  
      </dl>
    </section>
  </template>

  <script lang="ts" setup>
import { getMeasures, type Measure } from '~/dataProcessing/loadData';

const measures = await getMeasures();

const NUMBER_OF_NEWS = 6;

const IDS = [
  'mobilitaet1',  
  'mobilitaet7',
]

const getChange = (progress: MeasureProgress) => {
  if (progress.values.length === 0) {
    return null;
  }

  const lastValue = progress.values[progress.values.length - 1].value;

  if (progress.values.length === 1) {
    return lastValue.value;
  }

  const secondLastValue = progress.values[progress.values.length - 2].value;

  return lastValue - secondLastValue;
};
const sortedMeasures = measures.sort((a, b) => {
  if (!a.lastUpdate && !b.lastUpdate) {
    return 0;
  }

  if (!a.lastUpdate) {
    return 1;
  }

  if (!b.lastUpdate) {
    return -1;
  }

  return new Date(b.lastUpdate).getTime() > new Date(a.lastUpdate).getTime() ? 1 : -1;
});


const newsMeasures = sortedMeasures.filter((measure) => IDS.includes(measure.id));
  </script>