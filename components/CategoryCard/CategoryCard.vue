<script setup lang="ts">
import { computed, toRefs } from 'vue';

const props = defineProps<{
  title: string;
  category: Array<{
    category: string,
    numberOfMeasures: any,
  }>;
  measures: Array<any>;
}>();

const { measures } = toRefs(props);

defineEmits<{
  (e: "click", value: string): void;
}>();

const measuresList = computed(() => {
  const amount = measures.value.length;
  return {
    amount,
    items: [
      ...measures.value.slice(0, 5).map((measure) => measure['Short Title']),
      ...(amount === 6 ? ["1 weitere Maßnahme"] : []),
      ...(amount > 6 ? [`${amount - 5} weitere Maßnahmen`] : []),
    ]
  };
});
</script>

<template>
  <div class="category-card" :data-is-category="category">
    <Card>
      <template #header>
        <div class="category-card--header">
          <h2 class="category-card--title">{{ title }}</h2>
          <i class="pi pi-sparkles"></i>
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
  </div>
</template>

<style scoped>
@import "CategoryCard.css";
</style>
