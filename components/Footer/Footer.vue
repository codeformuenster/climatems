<script setup lang="ts">
import muensterhackLogo from "~/assets/images/logo_muensterhack.png";
</script>

<template>
  <footer class="footer">
    <div class="footer--top container">
      <section>
        <h1 class="footer--text">Quellen</h1>
        <ul class="flex" style="flex-direction: column;">
          <li>
            <a href="https://www.stadt-muenster.de/klimastadt/klimastadtvertrag" target="_blank" class="footer--text">
              Klimastadtvertrag Stadt Münster
            </a>
            </li>
            <li>
            <a href="https://www.energieatlas.nrw.de/site" target="_blank" class="footer--text">
              Energieatlas NRW
            </a>
          </li>
          <li>
            <a href="https://www.stadtwerke-muenster.de/unternehmen/presse" target="_blank" class="footer--text">
              Presseportal Stadtwerke Münster
            </a>
          </li>
          <li>
            <a href="https://www.stadt-muenster.de/klima/unser-klima-2030" target="_blank" class="footer--text">
              Klima Münster
            </a>
          </li>
        </ul>
      </section>
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
