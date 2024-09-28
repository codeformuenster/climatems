<script setup lang="ts">
import muensterhackLogo from "~/assets/images/logo_muensterhack.png";
</script>

<template>
  <footer class="footer">
    <div class="footer--top container">
      <div class="footer--muensterhack">
        <span class="footer--text-muensterhack">featured by</span>
        <img class="footer--logo-muensterhack" :src="muensterhackLogo" />
      </div>
    </div>
    <div class="footer--bottom container">
      <span class="footer--text">© 2024 Climate|MS</span>
    </div>
  </footer>
</template>

<style scoped>
@import "Footer.css";
</style>
