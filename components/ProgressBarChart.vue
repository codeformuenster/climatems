<template>
  <MeterGroup :value="chartData" :max="sum" />
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";

interface ChartData {
  labels: string;
  color: string;
  value: number;
}

const props = defineProps<{
  chartData: ChartData[];
}>();

const sum = computed(() => {
  return props.chartData.reduce((acc, item) => acc + item.value, 0);
});
</script>
