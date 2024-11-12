<template>
  <MeterGroup :value="[completed, inProgress, stale, unknown]" :max="sum" />
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


const totalMeasures = props.measures.length;

const completed = {
  label: 'Abgeschlossen',
  color: 'var(--p-green-500)',
  icon: null,
  value: props.measures.filter((measure) => measure.status === 'completed').length,
  width: (props.measures.filter((measure) => measure.status === 'completed').length / totalMeasures) * 100,
};

const stale = {
  label: 'Veraltet',
  color: 'var(--color-status-stale)',
  icon: null,
  value: props.measures.filter((measure) => measure.status === 'stale').length,
  width: (props.measures.filter((measure) => measure.status === 'stale').length / totalMeasures) * 100,
};

const unknown = {
  label: 'Unbekannt',
  color: 'var(--p-gray-500)',
  icon: null,
  value: props.measures.filter((measure) => measure.status === 'unknown').length,
  width: (props.measures.filter((measure) => measure.status === 'unknown').length / totalMeasures) * 100,
};

const inProgress = {
  label: 'In Bearbeitung',
  color: 'var(--p-blue-500)',
  icon: null,
  value: props.measures.filter((measure) => measure.status === 'in_progress').length,
  width: (props.measures.filter((measure) => measure.status === 'in_progress').length / totalMeasures) * 100,
};

const sum = completed.value + unknown.value + inProgress.value + stale.value;
</script>
