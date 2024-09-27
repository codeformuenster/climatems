<script setup lang="ts">
import type { Measure } from '~/dataProcessing/loadData';

const props = defineProps<{
  title: string;
  categoryId: string;
  measures: Array<Measure>;
}>();

const { measures } = toRefs(props);

const measuresList = computed(() => {
  const amount = measures.value.length;
  return {
    amount,
    items: [
      ...measures.value.slice(0, 5).map((measure) => measure['Action outline']['Action name']),
      ...(amount === 6 ? ["1 weitere Maßnahme"] : []),
      ...(amount > 6 ? [`${amount - 5} weitere Maßnahmen`] : []),
    ]
  };
});
</script>

<template>
  <NuxtLink
    class="category-card"
    :data-is-category="categoryId"
    :to="`/category/${categoryId}`"
  >
    <Card>
      <template #header>
        <div class="category-card--header">
          <h2 class="category-card--title">{{ title }}</h2>
          <i class="pi pi-sparkles"/>
        </div>
      </template>
      <template #content>
        <p class="category-card--text">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore.</p>
        <h3 class="category-card--measures-title">mit folgenden Maßnahmen:</h3>
        <ul class="category-card--measures">
          <li
            v-for="(measure, index) in measuresList.items"
            :key="index"
            class="category-card--measure pi pi-angle-right"
            :data-has-more-items="measuresList.amount > 5 "
          >
            {{ measure }}
          </li>
        </ul>
      </template>
      <template #footer>
        <div class="category-card--footer">
          <span class="category-card--link">Mehr erfahren</span>
        </div>
      </template>
    </Card>
  </NuxtLink>
</template>

<style scoped>
@import "CategoryCard.css";
</style>
