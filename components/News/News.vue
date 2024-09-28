<script lang="ts" setup>
  import { getMeasures, type Measure, type MeasureProgress } from '~/dataProcessing/loadData';

  const emit = defineEmits<{
    (e: "scrollToCategories"): void;
  }>();

  const measures = await getMeasures();

  const NUMBER_OF_NEWS = 6;

  const IDS = [
    'mobilitaet1',
    'mobilitaet7',
    'energieerzeugung1'
  ]

  const getStatus = (progress: MeasureProgress) => {
    if (progress.values.length === 0) {
      return 'unknown';
    }

    const lastValue = progress.values[progress.values.length - 1];

    if (progress.type === 'binary') {
      return lastValue.value;
    }

    if (progress.type === 'count') {
      return parseInt(lastValue.value, 10) >= progress.goal ? 'completed' : 'in_progress';
    }

    if (progress.type === 'percent') {
      return lastValue.value === 100 ? 'completed' : 'in_progress';
    }
  };

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

<template>
  <section class="container">
    <h1 class="headline ml-2 mt-2 text-base font-semibold leading-6 text-gray-900">Was gibt es Neues?</h1>
    <dl class="news--card mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      <NewsCard
        v-for="measure in newsMeasures"
        :title="measure.additionalData?.short_title || measure.original['Action outline']['Action name']"
        :category="measure.category"
        :status="getStatus(measure.progress)"
        :value="measure.progress.values[measure.progress.values.length - 1].value"
        :label="measure.progress?.goal"
        :type="measure.progress.type"
        :change="getChange(measure.progress)"
        change-type="increase"
        change-semantic="positive"
        :category-id="measure.categoryId"
        :measure-id="measure.id"
      />
    </dl>
    <Stale />
    <div class="news--actions">
      <Button label="Zu allen Maßnahmen" icon="pi pi-arrow-down" icon-pos="right" @click="$emit('scrollToCategories')" />
    </div>
  </section>
</template>

<style scoped>
@import "News.css";
</style>
