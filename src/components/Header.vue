<template>
  <header class="navbar navbar-expand-md navbar-dark bg-primary-gradient shadow">
    <div class="container-fluid container-lg px-4 px-lg-8">
      <a class="navbar-brand d-flex align-items-center" href="/">
        <img src="@/assets/climate-logo.png" alt="Climate Transparency Logo" class="me-2" style="height: 2.5rem; width: 2.5rem;">
        <div>
          <h1 class="h5 mb-0 text-white">Climate Transparency</h1>
          <p class="mb-0 text-white-50 d-none d-sm-block">
            Zahlen, Fakten und Trends zu globalen Emissionen
          </p>
        </div>
      </a>

      <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
        <div class="offcanvas-header">
          <h5 class="offcanvas-title" id="offcanvasNavbarLabel">Navigation</h5>
          <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">
          <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
            <li class="nav-item" v-for="item in navigationItems" :key="item.name">
              <a class="nav-link text-white" :href="item.href" data-bs-dismiss="offcanvas">{{ item.name }}</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const navigationItems = ref([
  { name: "Startseite", href: "/" },
  { name: "Daten", href: "/data" },
  { name: "Über uns", href: "/about" },
  { name: "Methodik", href: "/methodology" },
  { name: "Kontakt", href: "/contact" },
]);
</script>

<style scoped>
.bg-primary-gradient {
  background: linear-gradient(to right, #2c3e50, #42b983);
}
</style>