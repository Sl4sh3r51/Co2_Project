<template>
  <footer class="bg-light border-top mt-auto py-5">
    <div class="container-fluid container-lg px-4 px-lg-8">
      <div class="row g-4">
        <div class="col-12 col-md-6 col-lg-4">
          <div class="d-flex align-items-center mb-3">
            <img src="@/assets/climate-logo.png" alt="Climate Transparency Logo" class="me-3" style="height: 2rem; width: 2rem;">
            <h3 class="h5 mb-0">Climate Transparency</h3>
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
          <h4 class="h6 text-uppercase mb-3">Rechtliches</h4>
          <ul class="list-unstyled small">
            <li><a href="#" class="text-reset text-decoration-none">Impressum</a></li>
            <li><a href="#" class="text-reset text-decoration-none">Datenschutzerklärung</a></li>
            <li><a href="#" class="text-reset text-decoration-none">Nutzungsbedingungen</a></li>
          </ul>
        </div>
      </div>

      <hr class="my-4">

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

      <div class="mt-4 p-3 bg-light-subtle rounded text-muted small">
        <strong>Datenhinweis:</strong> Die auf dieser Website dargestellten CO2-Emissionsdaten stammen aus verschiedenen wissenschaftlichen Quellen und werden regelmäßig aktualisiert. Während wir uns um Genauigkeit bemühen, können sich die Werte aufgrund unterschiedlicher Berechnungsmethodiken und Datenquellen von anderen Anbietern unterscheiden. Für wissenschaftliche oder kommerzielle Zwecke empfehlen wir, die Originalquellen zu konsultieren.
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
</script>