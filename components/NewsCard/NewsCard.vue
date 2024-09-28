<template>
    <div class="relative overflow-hidden rounded-lg bg-white px-4 pb-12 pt-5 shadow sm:px-6 sm:pt-6">
      <dt>
        <div class="absolute flex rounded-md p-3" :style="{ backgroundColor: statusColors[status] }">
          <i
          :class="'text-white pi ' + statusIcon[status]"
          style="font-size: 20px;"
        />
        </div>
        <p class="ml-16 truncate text-sm font-medium text-gray-500">{{  title  }}</p>
      </dt>
      <dd class="ml-16 flex items-baseline pb-6 sm:pb-7">
        <div
          class="flex items-baseline text-2xl font-semibold"
          :style="{ color: statusColors[status] }"
        >
          {{value}}
          <span class="ml-2 text-sm font-medium text-gray-500">{{ label }}</span>
        </div>
        <p
          v-if="change"
          class="ml-2 flex items-baseline text-sm font-semibold" :class="changeColor[changeSemantic]">
          <svg viewBox="0 0 20 20" 
          :class="['h-5 w-5 flex-shrink-0 self-center', { 'rotate-180': changeType === 'decrease'}]" fill="currentColor" aria-hidden="true">
            <path fill-rule="evenodd" d="M10 17a.75.75 0 01-.75-.75V5.612L5.29 9.77a.75.75 0 01-1.08-1.04l5.25-5.5a.75.75 0 011.08 0l5.25 5.5a.75.75 0 11-1.08 1.04l-3.96-4.158V16.25A.75.75 0 0110 17z" clip-rule="evenodd" />
          </svg>
          <span class="sr-only"> Increased by </span>
          {{  change }}
        </p>
       
        <div class="absolute inset-x-0 bottom-0 bg-gray-50 px-4 py-4 sm:px-6">
          <div class="text-sm">
            <NuxtLink
              :to="`/category/${categoryId}/measure/${measureId}`"
              class="font-medium text-indigo-600 hover:text-indigo-500"
              :style="{
                color: statusColors[status],
              }"
            >Zur Maßnahme
            </NuxtLink>
          </div>
        </div>
      </dd>
    </div>
    
</template>

<script setup lang="ts">
import type { MeasureStatus } from '~/dataProcessing/loadData';

const statusColors = {
  completed: 'var(--p-green-500)',
  in_progress: 'var(--p-blue-500)',
  unknown: 'var(--p-grey-500)',
};

const statusIcon = {
  completed: 'pi pi-check-circle',
  in_progress: 'pi pi-clock',
  unknown: 'pi pi-question-circle',
};

const changeColor = {
  positive: 'text-green-600',
  negative: 'text-red-600',
};

defineProps<{
  title: string;
  label: string;
  category: string;
  status: MeasureStatus;
  value: string;
  change: number;
  changeType: 'increase' | 'decrease';
  changeSemantic: 'positive' | 'negative';
  categoryId: string;
  measureId: string;
}>(); 
</script>

<style>

</style>