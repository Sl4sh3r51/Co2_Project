<template>
  <aside class="d-flex flex-column h-100 bg-light border-end w-md-250px">
    <div class="p-4">
      <h2 class="h5 mb-3 text-secondary">Lokale Navigation</h2>
      <div class="accordion" id="sidebarAccordion">
        <div class="accordion-item">
          <h2 class="accordion-header" id="headingData">
            <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseData" aria-expanded="true" aria-controls="collapseData">
              <i class="bi bi-bar-chart-fill me-2"></i>
              Daten
            </button>
          </h2>
          <div id="collapseData" class="accordion-collapse collapse show" aria-labelledby="headingData" data-bs-parent="#sidebarAccordion">
            <div class="accordion-body p-0">
              <ul class="nav flex-column">
                <li class="nav-item" v-for="link in dataLinks" :key="link.name">
                  <a :href="link.href" class="nav-link text-secondary">
                    <i :class="link.iconClass" class="me-2"></i>
                    {{ link.name }}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="accordion-item">
          <h2 class="accordion-header" id="headingAnalysis">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseAnalysis" aria-expanded="false" aria-controls="collapseAnalysis">
              <i class="bi bi-graph-up me-2"></i>
              Analyse
            </button>
          </h2>
          <div id="collapseAnalysis" class="accordion-collapse collapse" aria-labelledby="headingAnalysis" data-bs-parent="#sidebarAccordion">
            <div class="accordion-body p-0">
              <ul class="nav flex-column">
                <li class="nav-item" v-for="link in analysisLinks" :key="link.name">
                  <a :href="link.href" class="nav-link text-secondary">
                    <i :class="link.iconClass" class="me-2"></i>
                    {{ link.name }}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div class="pt-4 mt-4 border-top">
        <h3 class="h6 mb-3 text-muted">Schnellzugriff</h3>
        <ul class="nav flex-column">
          <li class="nav-item"><a href="#latest-data" class="nav-link text-secondary py-1">Neueste Daten</a></li>
          <li class="nav-item"><a href="#top-emitters" class="nav-link text-secondary py-1">Top-Emittenten</a></li>
          <li class="nav-item"><a href="#download" class="nav-link text-secondary py-1">Daten herunterladen</a></li>
        </ul>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const dataLinks = ref([
  { name: "CO2-Emissionen nach Land", href: "#countries", iconClass: "bi bi-globe" },
  { name: "Unternehmens-Emissionen", href: "#companies", iconClass: "bi bi-buildings" },
  { name: "Emissions-Trends", href: "#trends", iconClass: "bi bi-graph-down" },
]);

const analysisLinks = ref([
  { name: "Datenquellen", href: "#sources", iconClass: "bi bi-info-circle" },
  { name: "Methodik", href: "#methodology", iconClass: "bi bi-bar-chart" },
]);
</script>

<style scoped>
.w-md-250px {
  width: 250px;
}
</style>