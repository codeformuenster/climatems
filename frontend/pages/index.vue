<script setup lang="ts">
import { getMeasures } from "~/dataProcessing/loadData";

const measures = await getMeasures();

const searchString = ref('');
const onlyUserActionable = ref(false);

const filteredMeasures = computed(() => {
  let filtered = measures;
  if (onlyUserActionable.value) {
    filtered = filtered.filter((measure) => !!measure.additionalData?.user_action);
  }

  if (selectedResponsibleBody.value) {
    console.log(selectedResponsibleBody.value);
    filtered = filtered.filter((measure) => {
      const responsibleBodies = measure.original?.['Implementation']?.['Responsible bodies/person for implementation'] ?? "";
      return responsibleBodies.includes(selectedResponsibleBody.value.code);
    });
  }

  return filtered;
});

const scrollToCategories = () => {
  const element = document.getElementById('categories');
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

const selectedResponsibleBody = ref();

const responsibleBodies = ref([
    { name: 'Stadtwerke Münster', code: 'Stadtwerke Münster' },
    { name: 'Stadt Münster', code: 'Stadt Münster' },
    { name: 'Stadtverwaltung Münster', code: 'Stadtverwaltung Münster' },
]);
</script>

<template>
  <section id="categories" class="section categories container">
    <h2 class="headline" style="margin-bottom: 5px;">Maßnahmen des Klimastadtvertrags nach Kategorie</h2>
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

      <div class="flex gap-4" style="align-items: center;">
        <Select v-model="selectedResponsibleBody" :options="responsibleBodies" optionLabel="name" placeholder="Wähle eine verantwortliche Stelle" class="w-full md:w-56" showClear="true" />
        <div>
          <Checkbox v-model="onlyUserActionable" binary />
          <label for="onlyUserActionable" class="ml-2">Ich kann aktiv werden</label>
        </div>
      </div>
    </div>
    <CategoryAccordion
      :measures="filteredMeasures"
      :search-string="searchString"
      :show-user-actionable="onlyUserActionable || selectedResponsibleBody"
    />
  </section>
  <section class="section container">
    <News @scroll-to-categories="scrollToCategories" />
  </section>
  <section class="section">
    <About />
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
