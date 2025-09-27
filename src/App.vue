<template>
  <div :dir="direction" class="d-flex flex-column min-vh-100">
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const direction = computed(() =>
    ['ar', 'he', 'fa', 'ur'].some(l => navigator.language.startsWith(l)) ? 'rtl' : 'ltr'
)

</script>

<style>

</style>