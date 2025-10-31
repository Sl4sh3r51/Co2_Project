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
      
    </main>
    <Footer/>
  </div>
</template>

<script setup lang="ts">
import Header from '@/components/Header.vue';
import EmissionsTable from '@/components/EmissionTable.vue';
import Footer from '@/components/Footer.vue';

</script>