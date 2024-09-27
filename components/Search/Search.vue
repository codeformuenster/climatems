<template>
  <div class="search">
    <input type="text" placeholder="Suche nach Maßnahmen" v-model="suchstring" />
  </div>
  <div class="mearsure-grid">
<!--    <slot></slot>-->
    <template v-for="fuseresult in filteredMeasures" :key="fuseresult.item.id">
      <NuxtLink :to="`/category/${fuseresult.item.categoryId}/measure/${fuseresult.item.id}`">
        <Card>
          <template #title>
            {{ fuseresult.item['Action outline']?.['Action name'] }}
            <Tag :value="fuseresult.item?.category" />
          </template>
        </Card>
      </NuxtLink>
    </template>
  </div>

</template>

<script lang="ts" setup>
  import type {Measure} from "~/dataProcessing/loadData";
  import Fuse from 'fuse.js';
  const props = defineProps<{
    measures: Array<Measure>;
  }>();

  const suchstring = ref('');

  const options = {
    includeScore: true,
    // Search in `author` and in `tags` array
    keys: [
      { name: 'name', getFn: (measure: Measure) => measure["Action outline"]?.["Action name"] },
    ]
  }

  const fuse = new Fuse(props.measures,options)

  const filteredMeasures = computed(() => {
    if ("" === suchstring.value) {
      return props.measures.map((item) => ({ item, score: 0 }));
    }
    return fuse.search(suchstring.value)
  })
</script>

<style scoped>
@import "Search.css";
</style>