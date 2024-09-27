<script setup lang="ts">
import { CategoryCard } from "../components";
import PageHeader from '~/components/PageHeader.vue';
import { getCategories } from "~/dataProcessing/loadData";

const categoriesWithInformation = await getCategories();

const numberOfMeasures = (categoriesWithInformation || []).reduce((acc, item) => acc + item.measures.length, 0);

console.log(numberOfMeasures)


const value = ref([
  { label: 'Umgesetzt', color: 'var(--p-green-500)', value: numberOfMeasures },
  { label: 'Begonnen', color: 'var(--p-yellow-500)', value: 8 },
  { label: 'nicht begonnen', color: 'var(--p-grey-500)', value: 24 },
  { label: 'verschoben', color: 'var(--p-red-500)', value: 10 }
]);
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
        <ProgressBarChart :chart-data="value" />
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