<script lang="ts">
let dialogVisible = ref(false);
</script>

<template>
  <GenericDialog v-model:visible="dialogVisible" title="Dialog" description="Dialog Beschreibung"
    @close="dialogVisible = false" />
  <Button icon="pi pi-bell" @click="dialogVisible = true" />
</template>
