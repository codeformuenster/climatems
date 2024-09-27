<script setup lang="ts">
import { CategoryCard } from "../components";
import PageHeader from '~/components/PageHeader.vue';
import { getCategories, getMeasureProgress, type MeasureStatus } from "~/dataProcessing/loadData";

const categoriesWithInformation = await getCategories();

const progress = await getMeasureProgress();

const rawChartData = progress.reduce((acc, item) => {
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
  <div class="main-content">
    <PageHeader
      image-src="https://westerwaldkreis.klimaschutzportal.rlp.de/fileadmin/_processed_/b/8/csm_wwkreis_umwelt_logo_neu_rgb_a3cc7eddd8.png"
      title="Klimastadtvertrag" description="Alles im Blick" />

    <Card>
      <template #title>
        Gesamtübersicht über alle Maßnahmen
      </template>
      <template #content>
        <ProgressBarChart :chart-data="chartData" />
      </template>
    </Card>

    <div class="card-grid">
      <template v-for="category in categoriesWithInformation" :key="category">
        <CategoryCard :title="category.name" :category-id="category.id" :measures="category.measures" />
      </template>
    </div>
  </div>
</template>

<style>
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
}

.main-content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>