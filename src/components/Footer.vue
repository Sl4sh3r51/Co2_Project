<template>
  <footer class="bg-light border-top mt-auto py-3">
    <div class="container-fluid container-lg px-4 px-lg-8">
      <div class="row g-3">
        <div class="col-12 col-md-6 col-lg-4">
          <div class="d-flex align-items-center mb-2">
            <img src="@/assets/climate-logo.png" alt="Climate Transparency Logo" class="me-3" style="height: 1.5rem; width: 1.5rem;">
            <h3 class="h6 mb-0">Climate Transparency</h3>
          </div>
          <p class="text-muted small">
            Eine internationale Non-Profit-Organisation, die sich für Transparenz bei CO2-Emissionen und Klimaschutzmaßnahmen einsetzt.
          </p>
          <ul class="list-unstyled small text-muted">
            <li class="d-flex align-items-center mb-2">
              <i class="bi bi-geo-alt me-2"></i>
              <span>Berlin, Deutschland</span>
            </li>
            <li class="d-flex align-items-center mb-2">
              <i class="bi bi-envelope me-2"></i>
              <a href="mailto:info@climate-transparency.org" class="text-reset text-decoration-none">info@climate-transparency.org</a>
            </li>
            <li class="d-flex align-items-center">
              <i class="bi bi-telephone me-2"></i>
              <span>+49 30 1234 5678</span>
            </li>
          </ul>
        </div>

        <div class="col-12 col-md-6 col-lg-3">
          <h4 class="h6 text-uppercase mb-2">Rechtliches</h4>
          <ul class="list-unstyled small">
            <li><a href="#" class="text-reset text-decoration-none" @click.prevent="showImpressum = true">Impressum</a></li>
            <li><a href="#" class="text-reset text-decoration-none" @click.prevent="showDatenschutz = true">Datenschutzerklärung</a></li>
            <li><a href="#" class="text-reset text-decoration-none" @click.prevent="showNutzungsbedingungen = true">Nutzungsbedingungen</a></li>
          </ul>
        </div>
      </div>
      <hr class="my-3">
      <div class="d-flex flex-column flex-md-row justify-content-between align-items-center">
        <div class="text-muted small text-center text-md-start mb-2 mb-md-0">
          <p class="mb-0">
            © 2024 Climate Transparency. Alle Rechte vorbehalten. | Creative Commons Attribution 4.0
          </p>
        </div>
        <div class="text-muted small text-center text-md-end">
          <p class="mb-0">
            Letzte Datenaktualisierung: {{ new Date().toLocaleDateString('de-DE') }}
          </p>
        </div>
      </div>
      <div class="mt-3 p-2 bg-light-subtle rounded text-muted small">
        <strong>Datenhinweis:</strong> Die auf dieser Website dargestellten CO2-Emissionsdaten stammen aus verschiedenen wissenschaftlichen Quellen und werden regelmäßig aktualisiert. Während wir uns um Genauigkeit bemühen, können sich die Werte aufgrund unterschiedlicher Berechnungsmethodiken und Datenquellen von anderen Anbietern unterscheiden. Für wissenschaftliche oder kommerzielle Zwecke empfehlen wir, die Originalquellen zu konsultieren.
      </div>
    </div>
    <!-- Modals -->
    <BaseModal :show="showImpressum" @close="showImpressum = false">
      <template #title>Impressum</template>
      <ImpressumModalContent />
    </BaseModal>
    <BaseModal :show="showDatenschutz" @close="showDatenschutz = false">
      <template #title>Datenschutzerklärung</template>
      <DatenschutzModalContent />
    </BaseModal>
    <BaseModal :show="showNutzungsbedingungen" @close="showNutzungsbedingungen = false">
      <template #title>Nutzungsbedingungen</template>
      <NutzungsbedingungenModalContent />
    </BaseModal>
  </footer>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import BaseModal from './BaseModal.vue'
import ImpressumModalContent from './ImpressumModalContent.vue'
import DatenschutzModalContent from './DatenschutzModalContent.vue'
import NutzungsbedingungenModalContent from './NutzungsbedingungenModalContent.vue'

const showImpressum = ref(false)
const showDatenschutz = ref(false)
const showNutzungsbedingungen = ref(false)
</script>