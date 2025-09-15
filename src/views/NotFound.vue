<template>
  <div class="d-flex align-items-center justify-content-center min-vh-100 bg-light">
    <div class="text-center">
      <h1 class="display-1 fw-bold mb-4">404</h1>
      <p class="h4 text-muted mb-4">Hoppla! Seite nicht gefunden</p>
      <router-link to="/" class="btn btn-outline-primary">Zur Startseite</router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

onMounted(() => {
  console.error("404 Error: User attempted to access non-existent route:", route.path);
});
</script>