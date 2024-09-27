<template>
  <div class="main-content">
   {{ JSON.stringify(category) }}
  </div>
</template>

<script lang="ts" setup>
import { getCategory } from '~/dataProcessing/loadData';

const route = useRoute();

const category = await getCategory(route.params.categoryId);
</script>