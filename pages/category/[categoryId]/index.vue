<script lang="ts" setup>
import MeasureCard from '~/components/MeasureCard/MeasureCard.vue';
import { getCategory, getMeasuresForCategory } from '~/dataProcessing/loadData';

const route = useRoute();

const category = await getCategory(route.params.categoryId);

const breadcrumb = computed(() => 
  category ? [{ label: category.name }] : []
);

const measures = await getMeasuresForCategory(route.params.categoryId);

const rawChartData = measures.reduce((acc, item) => {
  acc[item.status] = acc[item.status] + 1 || 1;
  return acc;
}, {});

const colorScale = {
  completed: 'var(--p-green-500)',
  in_progress: 'var(--p-yellow-500)',
  unknown: 'var(--p-grey-500)',
};

const chartData = computed(() => {
  return Object.entries(rawChartData).map(([key, value]) => {
    return {
      label: key,
      color: colorScale[key as keyof typeof colorScale],
      value
    };
  });
})
</script>

<template>
  <Breadcrumbs :items="breadcrumb" />
  <PageHeader
    imageSrc="https://westerwaldkreis.klimaschutzportal.rlp.de/fileadmin/_processed_/b/8/csm_wwkreis_umwelt_logo_neu_rgb_a3cc7eddd8.png"
    :title="measures[0].category" />
  <template>

  <Card>
    <template #title>
      Gesamtübersicht über alle Maßnahmen
    </template>
    <template #content>
      <ProgressBarChart :chart-data="chartData" />
    </template>
  </Card>

  </template>
  <CardGrid>
    <MeasureCard v-for="(measure, index) in measures" :key="index" :measure="measure" />
  </CardGrid>
</template>
