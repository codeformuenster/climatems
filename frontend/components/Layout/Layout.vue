<script setup lang="ts">
import Header from '~/components/Header/Header.vue';
import Footer from '~/components/Footer/Footer.vue';
</script>

<template>
  <div class="layout">
    <Header />
    <main class="layout--main">
      <slot></slot>
    </main>
    <Footer />
  </div>
</template>

<style scoped>
@import "Layout.css";
</style>
