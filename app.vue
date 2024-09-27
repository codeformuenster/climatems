<template>
  <main class="app">
    <div class="wrapper">
      <Card>
        <template #content>
          <ProgressBarChart :chart-data="value" />
        </template>
      </Card>
    </div>

  </main>
</template>

<script setup lang="ts">

const value = ref([
  { label: 'Umgesetzt', color: 'var(--p-green-500)', value: 16 },
  { label: 'Begonnen', color: 'var(--p-yellow-500)', value: 8 },
  { label: 'nicht begonnen', color: 'var(--p-grey-500)', value: 24 },
  { label: 'verschoben', color: 'var(--p-red-500)', value: 10 }
]);
</script>

<style>
.app {
  height: 100vh;
  width: 100vw;
  background-color: var(--p-gray-50);
}

.wrapper {
  display: flex;
  justify-content: center;
}
</style>