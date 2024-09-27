<template>
  <div class="wrapper">
    <Card>
      <template #content>
        <ProgressBarChart :chart-data="value" />
      </template>
    </Card>
    {{ categories }}
  </div>
</template>

<script setup lang="ts">
import actions from '@/data/b-2_actions.json';

const categories = Object.keys(actions);

const value = ref([
  { label: 'Umgesetzt', color: 'var(--p-green-500)', value: 16 },
  { label: 'Begonnen', color: 'var(--p-yellow-500)', value: 8 },
  { label: 'nicht begonnen', color: 'var(--p-grey-500)', value: 24 },
  { label: 'verschoben', color: 'var(--p-red-500)', value: 10 }
]);
</script>

<style>
.wrapper {
  display: flex;
  align-content: center;
  flex-direction: column;
}
</style>