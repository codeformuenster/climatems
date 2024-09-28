<script setup lang="ts">
interface BreadcrumbItem {
  label: string;
  route?: string;
  url?: string;
  target?: string;
}

defineProps<{
  items?: BreadcrumbItem[];
}>();

const home = ref({
  icon: 'pi pi-home',
  route: '/'
});
</script>

<template>
  <div class="breadcrumbs">
    <Breadcrumb :home="home" :model="items">
      <template #item="{ item, props }">
        <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
          <a :href="href" v-bind="props.action" @click="navigate" class="breadcrumbs--link">
            <span v-if="item.icon" class="breadcrumbs--icon" :class="item.icon" />
            <span class="breadcrumbs--text">{{ item.label }}</span>
          </a>
        </router-link>
        <template v-else>
          <a v-if="item.url" :href="item.url" :target="item.target" v-bind="props.action" class="breadcrumbs--link">
            <span class="breadcrumbs--text">{{ item.label }}</span>
          </a>
          <span v-else class="breadcrumbs--text">{{ item.label }}</span>
        </template>
      </template>
    </Breadcrumb>
  </div>
</template>

<style scoped>
@import "Breadcrumbs.css";
</style>
