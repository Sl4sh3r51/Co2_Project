<template>
  <div class="d-flex flex-column min-vh-100">
    <Header />
    <main class="flex-grow-1 container py-4">
      <h2>Über uns</h2>
      <p>Informationen über das Projekt und das Team.</p>
    </main>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';

</script>
