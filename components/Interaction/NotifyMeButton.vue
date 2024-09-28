<script lang="ts">
let dialogVisible = ref(false);
</script>

<template>
  <GenericDialog v-model:visible="dialogVisible" title="Interessiert mich" description="Halte mich auf dem Laufenden"
    @close="dialogVisible = false" />
  <Button icon="pi pi-bell" @click="dialogVisible = true" />
</template>
