<script setup lang="ts">
import {getCategories, getMeasures } from "~/dataProcessing/loadData";

const measures = await getMeasures();

const searchString = ref('');
const onlyUserActionable = ref(false);

const filteredMeasures = computed(() => {
  if (onlyUserActionable.value) {
    return measures.filter((measure) => !!measure.additionalData?.user_action);
  }

  return measures;
});

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
