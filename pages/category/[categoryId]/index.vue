<template>
  <PageHeader
  imageSrc="https://westerwaldkreis.klimaschutzportal.rlp.de/fileadmin/_processed_/b/8/csm_wwkreis_umwelt_logo_neu_rgb_a3cc7eddd8.png"
  :title="category?.name"
  />
  <div class="main-content">
  {{ JSON.stringify(category) }}
  </div>
</template>

<script lang="ts" setup>
import PageHeader from '~/components/PageHeader.vue';
import { getCategory } from '~/dataProcessing/loadData';

const route = useRoute();

const category = await getCategory(route.params.categoryId);
</script>