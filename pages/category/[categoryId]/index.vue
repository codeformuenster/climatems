<script lang="ts" setup>
import { getCategory, getMeasuresForCategory, type MeasureProgress } from '~/dataProcessing/loadData';

const route = useRoute();

const category = await getCategory(route.params.categoryId);

const breadcrumb = computed(() => 
  category ? [{ label: category.name }] : []
);

const measures = await getMeasuresForCategory(route.params.categoryId);

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
      <ProgressBarChart :measures="sortedMeasures" />
    </template>
  </Card>

  </template>
  <CardGrid>
   
    <NewsCard
      v-for="measure in sortedMeasures"
        :title="measure.additionalData?.short_title || measure.original['Action outline']['Action name']"
        :category="measure.category"
        :status="measure.status"
        :value="measure.progress.values.length > 0 ? measure.progress.values[measure.progress.values.length - 1].value : 'unknown'"
        :label="measure.progress?.goal"
        :type="measure.progress.type"
        :change="getChange(measure.progress)"
        change-type="increase"
        change-semantic="positive"
        :category-id="measure.categoryId"
        :measure-id="measure.id"
    />
    <!-- <MeasureCard v-for="(measure, index) in measures" :key="index" :measure="measure" /> -->
  </CardGrid>
</template>
