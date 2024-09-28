<template>
  <MeterGroup :value="[completed, inProgress, unknown]" :max="sum" />
</template>

<script lang="ts" setup>
import type { Measure } from '~/dataProcessing/loadData';

interface ChartData {
  label: string;
  color: string;
  value: number;
}

const props = defineProps<{
  measures: Measure[];
}>();


const completed = {
  label: 'Abgeschlossen',
  color: 'var(--p-green-500)',
  icon: null,
  value: props.measures.filter((measure) => measure.status === 'completed').length,
};

const unknown = {
  label: 'Unbekannt',
  color: 'var(--p-gray-500)',
  icon: null,
  value: props.measures.filter((measure) => measure.status === 'unknown').length,
};

const inProgress = {
  label: 'In Bearbeitung',
  color: 'var(--p-blue-500)',
  icon: null,
  value: props.measures.filter((measure) => measure.status === 'in_progress').length,
};

const sum = completed.value + unknown.value + inProgress.value;
</script>
