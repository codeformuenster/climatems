<script setup lang="ts">
import { CardGrid, CategoryCard, Search } from "../components";
import {getCategories, getMeasureProgress, getMeasures } from "~/dataProcessing/loadData";

const categoriesWithInformation = await getCategories();
console.log(categoriesWithInformation);

const progress = await getMeasureProgress();

const measures = await getMeasures();

const searchString = ref('');
const onlyUserActionable = ref(false);

const filteredMeasures = computed(() => {
  if (onlyUserActionable.value) {
    return measures.filter((measure) => !!measure.additionalData?.user_action);
  }

  return measures;
});

const rawChartData = progress.reduce((acc, item) => {
  acc[item.status] = acc[item.status] + 1 || 1;
  return acc;
}, {});

const colorScale = {
  completed: 'var(--p-green-500)',
  in_progress: 'var(--p-yellow-500)',
  unknown: 'var(--p-grey-500)',
};

</script>

<template>
  <News></News>
  <About />
  <Card>
    <template #title>
      Gesamtübersicht über alle Maßnahmen
    </template>
    <template #content>
      <ProgressBarChart :measures="measures" />
    </template>
  </Card>
  <div class="searchbar flex" style="justify-content: space-between; align-items: center;">
    <InputText v-model="searchString" type="text" size="large" placeholder="Suche" />

    <div>
      <Checkbox v-model="onlyUserActionable" binary />
      <label for="onlyUserActionable" class="ml-2">Ich kann aktiv werden</label>
    </div>
  </div>

  <CategoryAccordion
    :measures="filteredMeasures"
    :search-string="searchString"
    :show-user-actionable="onlyUserActionable"
  />
</template>
