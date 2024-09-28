<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "GenericDialog",
  props: {
    visible: {
      value: Boolean,
      required: true,
    },
    onClose: {
      type: Function,
      required: true,
    },
    title: {
      text: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
});
</script>

<template>
  <Dialog
    v-model:visible="visible"
    modal
    :header="title"
    :style="{ width: '25rem' }"
  >
    <span class="p-text-secondary block mb-5">{{ description }}</span>
    <div class="flex align-items-center gap-3 mb-5">
      <label for="email" class="font-semibold w-6rem">Email</label>
      <InputText id="email" class="flex-auto" autocomplete="off" />
    </div>
    <div class="flex justify-content-end gap-2">
      <Button
        type="button"
        label="Cancel"
        severity="secondary"
        @click="onClose"
      ></Button>
      <Button type="button" label="Save" @click="onClose"></Button>
    </div>
  </Dialog>
</template>
