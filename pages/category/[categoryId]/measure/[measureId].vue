<template>
  <div class="main-content">

    <Card>
      <template #title>
        {{  measure?.['Action outline']['Action name'] }}
        <Tag :value="measure?.category" />
      </template>
      <template #content>
        <div v-if="progress?.measure === 'percent'">
          <MeterGroup :value="[{
            label: 'erreicht',
            value: progress.progress,
            color: 'var(--p-green-500)'
            } ]" />
          {{ progress?.progress }} % erreicht
        </div>

        <div v-if="progress?.measure === 'binary'">
          {{ progress?.status === 'completed' ? 'Erreicht' : 'Nicht erreicht' }}
        </div>

        <!-- <p class="prose prose-">
          {{ measure?.['Action outline']['Action description'] }}
        </p> -->
        
      </template>
    </Card>
    {{ JSON.stringify(measure)}}
  </div>
</template>

<script lang="ts" setup>
import { getMeasure, getProgressForMeasure } from '~/dataProcessing/loadData';

const route = useRoute();

const measure = await getMeasure(route.params.measureId as string);
const progress = await getProgressForMeasure(route.params.measureId as string);
</script>

<style>
.main-content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>