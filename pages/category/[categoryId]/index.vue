<template>
  <Breadcrumbs :items="breadcrumb" />
  <CardGrid>
    <MeasureCard
      v-for="(measure, index) in category?.measures"
      :key="index"
      :measure="measure"
    />
  </CardGrid>
</template>

<script lang="ts" setup>
import { Breadcrumbs, MeasureCard } from '~/components';
import { getCategory } from '~/dataProcessing/loadData';

const route = useRoute();

const category = await getCategory(route.params.categoryId);

const breadcrumb = computed(() => 
  category ? [{ label: category.name }] : []
);
</script>