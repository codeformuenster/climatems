<template>
  <PageHeader
    imageSrc="https://westerwaldkreis.klimaschutzportal.rlp.de/fileadmin/_processed_/b/8/csm_wwkreis_umwelt_logo_neu_rgb_a3cc7eddd8.png"
    title="Klimastadtvertrag"
    description="Alles im Blick"
  />
  <Card>
    <template #content>
      <ProgressBarChart :chart-data="value" />
    </template>
  </Card>
  <ul>
    <template v-for="category in categories" :key="category">
      <li>
        {{ category }}: {{ measuresPerCategory.find((item) => item.category === category).numberOfMeasures }}
      </li>

    </template>
  </ul>
</template>

<script setup lang="ts">
import actions from '@/data/b-2_actions.json';
import PageHeader from '~/components/PageHeader.vue';

const categories = Object.keys(actions);
const measuresPerCategory = categories.map((category) => ({
  category: category,
  numberOfMeasures: actions[category].length
}));

const numberOfMeasures = (measuresPerCategory || []).reduce((acc, item) => acc + item.numberOfMeasures, 0);

const value = ref([
  { label: 'Umgesetzt', color: 'var(--p-green-500)', value: numberOfMeasures },
  { label: 'Begonnen', color: 'var(--p-yellow-500)', value: 8 },
  { label: 'nicht begonnen', color: 'var(--p-grey-500)', value: 24 },
  { label: 'verschoben', color: 'var(--p-red-500)', value: 10 }
]);
</script>
