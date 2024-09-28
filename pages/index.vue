<script setup lang="ts">
import {getMeasures } from "~/dataProcessing/loadData";

const measures = await getMeasures();

const searchString = ref('');
const onlyUserActionable = ref(false);

const filteredMeasures = computed(() => {
  if (onlyUserActionable.value) {
    return measures.filter((measure) => !!measure.additionalData?.user_action);
  }

  return measures;
});

const scrollToCategories = () => {
  const element = document.getElementById('categories');
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};
</script>

<template>
  <section class="section container">
    <News @scroll-to-categories="scrollToCategories" />
  </section>
  <section class="section">
    <About />
  </section>
  <section id="categories" class="section categories container">
    <h1 class="headline">Maßnahmen nach Kategorie</h1>
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
        <Checkbox v-model="onlyUserActionable" binary input-id="onlyUserActionable"/>
        <label for="onlyUserActionable" class="ml-2">Ich kann aktiv werden</label>
      </div>
    </div>
    <CategoryAccordion
      :measures="filteredMeasures"
      :search-string="searchString"
      :show-user-actionable="onlyUserActionable"
    />
  </section>
</template>

<style scoped>
  .categories {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    padding-block-start: 3rem;
  }
</style>