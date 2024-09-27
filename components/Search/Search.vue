<template>
  <div class="search">
    <input type="text" placeholder="Suche nach Maßnahmen" v-model="suchstring"/>
  </div>
  <div class="mearsure-grid">
    <template v-for="category in filteredCategories" :key="category">
      <Card>
        <template #title>
          {{ category }}
              <template v-for="fuseresult in filteredMeasures(category)" :key="fuseresult.item.id">
                <NuxtLink :to="`/category/${fuseresult.item.categoryId}/measure/${fuseresult.item.id}`">
                  <Card>
                    <template #title>
                      {{ fuseresult.item.additionalData?.short_title || fuseresult.item.original['Action outline']?.['Action name'] }}
                      <Tag :value="fuseresult.item?.category"/>
                    </template>
                  </Card>
                </NuxtLink>
              </template>
        </template>
      </Card>
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
  shouldSort: false,
  threshold: 0.3,
  // Search in `author` and in `tags` array
  keys: [
      "original.Action outline.Action name",
      "additionalData.short_title",
      "additionalData.summary",
      "original.Action outline.Action description",
      "category",
  ],
}

const fuse = new Fuse(props.measures, options)

const filteredCategories = computed(() => {
  let fuseresults;
  if ("" === suchstring.value) {
    fuseresults = props.measures.map((item) => ({item, score: 0}));
  } else {
    fuseresults = fuse.search(suchstring.value)
  }
  const categories = new Set();
  fuseresults.forEach(fuseresult => categories.add(fuseresult.item.category));
  return Array.from(categories);
})

const filteredMeasures = function(category) {
  if ("" === suchstring.value) {
    return props.measures.filter((measure) => measure.category === category).map((item) => ({item, score: 0}));
  }
  const fuseresults = fuse.search(suchstring.value).filter((fuseresult) => fuseresult.item.category === category);
  return fuseresults;
};
</script>

<style scoped>
@import "Search.css";
</style>