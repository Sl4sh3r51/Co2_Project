<template>
  <div class="d-flex flex-column min-vh-100">
    <Header />
    <div class="flex-grow-1 d-flex flex-column flex-md-row">
      <main class="flex-grow-1 p-4 p-md-8 overflow-y-auto">
        <section class="mb-5">
          <div class="d-flex flex-column flex-md-row justify-content-between align-items-center mb-4">
            <div>
              <h2 class="h1 fw-bold text-primary">Globaler Emissions-Report</h2>
              <p class="lead text-muted">
                Detaillierte Analyse der CO2-Emissionen von Ländern und Unternehmen weltweit.
              </p>
            </div>
          </div>
        </section>

        <section class="mb-5">
          <h3 class="h4 fw-semibold text-secondary mb-4">Wichtige Kennzahlen</h3>
          <div class="row g-4">
            <div class="col-12 col-sm-6 col-lg-3" v-for="stat in stats" :key="stat.title">
              <div class="card shadow-sm h-100">
                <div class="card-body">
                  <div class="d-flex align-items-center mb-3">
                    <div :class="`badge rounded-pill bg-light text-${getBadgeColor(stat.iconClass)} me-3 p-2`">
                      <i :class="stat.iconClass"></i>
                    </div>
                    <h5 class="card-title mb-0">{{ stat.title }}</h5>
                  </div>
                  <div class="d-flex justify-content-between align-items-end">
                    <span class="display-6 fw-bold text-primary">{{ stat.value }}</span>
                    <span class="small text-muted">{{ stat.trend }}</span>
                  </div>
                  <p class="card-text text-muted small mt-1">{{ stat.description }}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section class="mb-5">
          <EmissionsTable />
        </section>

        <section class="mb-5">
          <div class="row g-4">
            <div class="col-12 col-md-6">
              <div class="card shadow-sm h-100">
                <div class="card-header">
                  <h4 class="card-title mb-0">Datenquellen</h4>
                  <p class="card-text text-muted">Transparenz durch verlässliche Daten</p>
                </div>
                <div class="card-body">
                  <ul class="list-unstyled text-muted small">
                    <li>International Energy Agency (IEA)</li>
                    <li>Global Carbon Project</li>
                    <li>Carbon Disclosure Project (CDP)</li>
                    <li>UN Framework Convention on Climate Change</li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="col-12 col-md-6">
              <div class="card shadow-sm h-100">
                <div class="card-header">
                  <h4 class="card-title mb-0">Unser Auftrag</h4>
                  <p class="card-text text-muted">Transparenz fördern für eine nachhaltige Zukunft</p>
                </div>
                <div class="card-body">
                  <p class="card-text text-muted small">
                    Wir glauben, dass Transparenz der Schlüssel zu wirksamem Klimaschutz ist. Durch den offenen Zugang zu verlässlichen Emissionsdaten ermöglichen wir fundierte Entscheidungen von Politik, Wirtschaft und Gesellschaft.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue';
import Header from '@/components/Header.vue';
import EmissionsTable from '@/components/EmissionTable.vue';
import Footer from '@/components/Footer.vue';

const stats = ref([
  {
    title: "Länder erfasst",
    value: "195",
    description: "Vollständige CO2-Daten",
    iconClass: "bi-globe",
    trend: "+12% seit 2022"
  },
  {
    title: "Unternehmen",
    value: "2.847",
    description: "Größte Emittenten weltweit",
    iconClass: "bi-buildings",
    trend: "+156 neue Einträge"
  },
  {
    title: "Datenpunkte",
    value: "50M+",
    description: "Historische Emissionsdaten",
    iconClass: "bi-database",
    trend: "Seit 1990 verfügbar"
  },
  {
    title: "Reduzierung",
    value: "-8.2%",
    description: "EU-Emissionen 2023 vs. 2022",
    iconClass: "bi-graph-down",
    trend: "Positiver Trend"
  }
]);

const getBadgeColor = (iconClass: string) => {
  switch (iconClass) {
    case 'bi-globe':
      return 'primary';
    case 'bi-buildings':
      return 'secondary';
    case 'bi-database':
      return 'info';
    case 'bi-graph-down':
      return 'success';
    default:
      return 'secondary';
  }
};
</script>