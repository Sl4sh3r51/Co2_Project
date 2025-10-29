<template>
  <div class="d-flex flex-column min-vh-100">
    <Header/>
    <main class="container py-4 flex-grow-1">
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
    <Footer/>
  </div>
</template>

<script setup lang="ts">
import Header from '@/components/Header.vue';
import EmissionsTable from '@/components/EmissionTable.vue';
import Footer from '@/components/Footer.vue';

</script>