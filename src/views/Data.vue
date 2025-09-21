<template>
  <div class="d-flex flex-column min-vh-100">
    <Header />
    <main class="flex-grow-1 container py-4">
      <h2>Daten</h2>
      <p>Hier werden zukünftig die Emissionsdaten angezeigt.</p>
    </main>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';

</script>
