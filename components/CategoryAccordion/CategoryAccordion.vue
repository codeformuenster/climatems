<script lang="ts" setup>
import { CheckIcon, ClockIcon, QuestionMarkCircleIcon } from '@heroicons/vue/24/outline';
import type { Measure } from "~/dataProcessing/loadData";
import Fuse from 'fuse.js';
import { getCategoryIcon } from "~/helper";

const props = defineProps<{
  measures: Array<Measure>;
  searchString: string;
  showUserActionable: boolean;
}>();

const openAccordionPanels = computed(() => {
  const allPanels = filteredCategories.value.map((_, index) => index);
  if (props.showUserActionable) {
    return allPanels;
  }
  return props.searchString === '' ? [] : allPanels;
});

const options = {
  includeScore: true,
  shouldSort: false,
  threshold: 0.3,
  keys: [
      "original.Action outline.Action name",
      "additionalData.short_title",
      "additionalData.summary",
      "original.Action outline.Action description",
      "category",
  ],
}

const fuse = computed(() => new Fuse(props.measures, options));

const filteredCategories = computed(() => {
  let fuseresults;
  if ("" === props.searchString) {
    fuseresults = props.measures.map((item) => ({item, score: 0}));
  } else {
    fuseresults = fuse.value.search(props.searchString)
  }
  const categories = new Set();
  fuseresults.forEach(fuseresult => categories.add(fuseresult.item.category));
  return Array.from(categories);
})

const filteredMeasures = function(category) {
  if ("" === props.searchString) {
    return props.measures.filter((measure) => measure.category === category).map((item) => ({item, score: 0}));
  }
  const fuseresults = fuse.value.search(props.searchString).filter((fuseresult) => fuseresult.item.category === category);
  return fuseresults;
};

const getStatusProps = (status: string) => {
  switch (status) {
    case 'completed':
      return {
        text: 'Abgeschlossen',
        icon: CheckIcon,
      };
    case 'in_progress':
    return {
        text: 'In Bearbeitung',
        icon: ClockIcon,
      };
    case 'stale':
    return {
        text: 'Veraltet',
        icon: ClockIcon,
      };
    default:
    return {
        text: 'Unbekannt',
        icon: QuestionMarkCircleIcon,
      };
  }
};

const getCategoryLink = (category: string) => {
  const cat = props.measures.find((m) => m.category === category);
  return `/category/${cat.categoryId}`;
};
</script>

<template>
  <div class="category-accordion">
    <Accordion :value="openAccordionPanels" multiple>
      <AccordionPanel v-for="(category, index) in filteredCategories" :key="index" :value="index" :data-is-category="category">
        <AccordionHeader>
          <div class="category-accordion--header">
            <div class="category-accordion--icon">
              <component :is="getCategoryIcon(category)" />
            </div>
            <h3>{{ category }}</h3>
          </div>
          <NuxtLink
            :to="getCategoryLink(category)"
            style="width: 150px"
          >
            zur Kategorie
          </NuxtLink>
        </AccordionHeader>
        <AccordionContent>
          <ul class="category-accordion--list">
            <li v-for="fuseresult in filteredMeasures(category)" :key="fuseresult.item.id" class="category-accordion--list-item">
              <span v-tooltip.top="getStatusProps(fuseresult.item.status).text" class="category-accordion--status" :data-has-status="fuseresult.item.status">
                <component :is="getStatusProps(fuseresult.item.status).icon" />
              </span>
              <NuxtLink :to="`/category/${fuseresult.item.categoryId}/measure/${fuseresult.item.id}`">
                {{ fuseresult.item.additionalData?.short_title || fuseresult.item.original['Action outline']?.['Action name'] }}
              </NuxtLink>
            </li>
          </ul>
        </AccordionContent>
      </AccordionPanel>
    </Accordion>
  </div>
</template>

<style scoped>
@import "CategoryAccordion.css";
</style>