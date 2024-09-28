<script setup lang="ts">
import { CardGrid, CategoryCard, Search } from "../components";
import {getCategories, getMeasureProgress, getMeasures } from "~/dataProcessing/loadData";

const categoriesWithInformation = await getCategories();
console.log(categoriesWithInformation);

const progress = await getMeasureProgress();

const measures = await getMeasures();

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
  <Card>
    <template #title>
      Gesamtübersicht über alle Maßnahmen
    </template>
    <template #content>
      <ProgressBarChart :chart-data="chartData" />
    </template>
  </Card>

  <CardGrid>
    <template v-for="category in categoriesWithInformation" :key="category">
      <CategoryCard :title="category.name" :category-id="category.id" :measures="category.measures" :description="category.description"/>
    </template>
  </CardGrid>

  <dl class="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
    <NewsCard
      title="Windkraftausbau bis 2023"
      category="Energieerzeugung"
      content="es gibt drei neue windräder"
      status="in_progress"
      value="3"
      label="/ 5 Windrädern"
      :change="1"
      change-type="increase"
      change-semantic="positive"
    />
    <NewsCard
      title="Windkraftausbau bis 2023"
      category="Energieerzeugung"
      content="es gibt drei neue windräder"
      status="completed"
      value="5"
      label="/ 5 Windrädern"
      :change="1"
      change-semantic="positive"
      change-type="increase"
      />
      
    <NewsCard
      title="Windkraftausbau bis 2023"
      category="Energieerzeugung"
      content="es gibt drei neue windräder"
      status="completed"
      value="5"
      label="/ 5 Windrädern"
      :change="1"
      change-type="decrease"
      change-semantic="negative"
    />
  </dl>
  <div class="flex items-center">
    <Checkbox v-model="onlyUserActionable" binary />
    <label for="onlyUserActionable" class="ml-2">Hier kann ich aktiv werden</label>
  </div>
  <Search :measures="filteredMeasures">
  </Search>
</template>
