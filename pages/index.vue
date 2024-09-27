<script setup lang="ts">
import { CategoryCard } from "../components";
import actions from '@/data/b-2_actions.json';

const categories = Object.keys(actions);
const measuresPerCategory = categories.map((category) => ({
  category: category,
  numberOfMeasures: actions[category].length
}));

const numberOfMeasures = (measuresPerCategory || []).reduce((acc, item) => acc + item.numberOfMeasures, 0);

const value = ref([
  { label: 'Umgesetzt', color: 'var(--p-green-500)', value: numberOfMeasures },
  { label: 'Begonnen', color: 'var(--p-yellow-500)', value: 8 },
  { label: 'nicht begonnen', color: 'var(--p-grey-500)', value: 24 },
  { label: 'verschoben', color: 'var(--p-red-500)', value: 10 }
]);
</script>

<template>
  <Card>
    <template #content>
      <ProgressBarChart :chart-data="value" />
    </template>
  </Card>
  <div class="card-grid">
    <template v-for="category in categories" :key="category">
      <CategoryCard
        :title="category"
        :category="measuresPerCategory"
        :measures="actions[category]"
      />
    </template>
  </div>
</template>

<style>
  .card-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1rem;
  }
</style>