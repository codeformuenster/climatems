<script setup lang="ts">
import type { Measure } from '~/dataProcessing/loadData';

const props = defineProps<{
  measure: Measure;
}>();

const { measure } = toRefs(props);

// const iconClass = computed(() => {
//   if (categoryId.value === "Energieerzeugung") {
//     return BoltIcon;
//   }
//   if (categoryId.value === "Bauen und Sanieren") {
//     return HomeIcon;
//   }
//   if (categoryId.value === "Mobilität") {
//     return PaperAirplaneIcon;
//   }
//   if (categoryId.value === "Klimahaushalt") {
//     return SunIcon;
//   }
//   return TagIcon
// });

</script>

<template>
    <Card>
      <template #header>
        <div class="category-card--header">
          <h2 class="category-card--title">{{ measure['Action outline']['Action name'] }}</h2>
          <component class="category-card--icon" :is="iconClass" />
        </div>
      </template>
      <template #content>
        <p class="category-card--text">{{ measure['Action outline']['Action description'] }}</p>
      </template>
      <template #footer>
        <div class="category-card--footer">
          <span class="category-card--link">Mehr erfahren</span>
        </div>
      </template>
    </Card>
</template>

<style scoped>
@import "../CategoryCard/CategoryCard.css";
</style>
