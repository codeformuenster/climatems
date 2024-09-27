<script setup lang="ts">
import type { Measure } from '~/dataProcessing/loadData';

defineProps<{
  title: string;
  categoryId: string;
  measures: Array<Measure>;
}>();
</script>

<template>
  <div class="category-card" :data-is-category="categoryId">
    <Card>
      <template #header>
        <div class="category-card--header">
          <h2 class="category-card--title">{{ title }}</h2>
          <i class="pi pi-sparkles"/>
        </div>
      </template>
      <template #content>
        <p class="category-card--text">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore.</p>
        <h3 class="category-card--actions-title">mit folgenden Maßnahmen:</h3>
        <div class="category-card--actions">
          <Tag v-for="measure in measures" :key="measure.id" :value="measure['Action outline']['Action name']"/>
        </div>
      </template>
      <template #footer>
        <div class="category-card--footer">
          <Button
            label="Zur Übersicht"
            icon="pi pi-angle-right"
            icon-pos="right"
            severity="primary"
            outlined
          />
        </div>
      </template>
    </Card>
  </div>
</template>

<style scoped>
@import "CategoryCard.css";
</style>
