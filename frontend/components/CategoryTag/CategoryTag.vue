<script setup lang="ts">
import { getCategoryIcon } from '~/helper';

const props = defineProps<{
  title: string;
  categoryId: string;
}>();
</script>

<template>
  <span class="category-tag" :data-is-category="categoryId">
    <span class="category-tag--icon">
      <component :is="getCategoryIcon(categoryId)" />
    </span>
    <span class="category-tag--text">{{ title }}</span>
  </span>
</template>

<style scoped>
@import "CategoryTag.css";
</style>
