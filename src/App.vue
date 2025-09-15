<template>
  <div class="d-flex flex-column min-vh-100">
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
// Da Bootstrap keine Anbieter wie React-Komponenten benötigt,
// ist diese Datei schlank und dient nur als Root-Komponente für das Routing.
</script>

<style>
/* Hier können globale Stile hinzugefügt werden, falls nötig.
   Ansonsten reichen die Bootstrap-Klassen. */
</style>