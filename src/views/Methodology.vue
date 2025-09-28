<template>
  <div class="d-flex flex-column min-vh-100">
    <Header/>
    <main class="container py-4 flex-grow-1">
      <div class="row justify-content-center">
        <div class="col-12 col-md-10 col-lg-8">
          <h1 class="mb-4">Methodik</h1>
          <p class="lead">
            Die Grundlage unseres Projekts <strong>Climate Transparency</strong> bildet eine transparente und nachvollziehbare Methodik zur Erhebung, Aufbereitung und Auswertung von Daten zu CO₂-Emissionen. Unser Ziel ist es, aktuelle Trends sichtbar zu machen und internationale Vergleichbarkeit herzustellen.
          </p>
          <hr/>
          <section class="mb-5">
            <h2 class="h5 mb-3">1. Datenbeschaffung</h2>
            <p>Unsere Daten stammen aus verschiedenen vertrauenswürdigen Quellen, darunter:</p>
            <ul class="list-group list-group-flush mb-3">
              <li class="list-group-item ps-0"><strong>Internationale Organisationen</strong> wie die Internationale Energieagentur (IEA), die Weltbank und die Vereinten Nationen.</li>
              <li class="list-group-item ps-0"><strong>Nationale Behörden und Statistikämter</strong>, die offizielle Emissionsdaten veröffentlichen.</li>
              <li class="list-group-item ps-0"><strong>Unternehmensberichte</strong>, insbesondere Nachhaltigkeits- und Geschäftsberichte von großen Emittenten.</li>
              <li class="list-group-item ps-0"><strong>Wissenschaftliche Studien</strong>, die sektor- oder regionenspezifische Analysen bereitstellen.</li>
            </ul>
            <p>Die Daten werden regelmäßig aktualisiert, um die Relevanz und Aktualität der Informationen sicherzustellen.</p>
          </section>
          <section class="mb-5">
            <h2 class="h5 mb-3">2. Datenaufbereitung</h2>
            <p>Um eine einheitliche Vergleichbarkeit zu ermöglichen, werden die Rohdaten in einem mehrstufigen Prozess aufbereitet:</p>
            <ol class="mb-3">
              <li><strong>Prüfung auf Plausibilität und Vollständigkeit</strong></li>
              <li><strong>Standardisierung von Einheiten</strong> (z. B. Umrechnung in Millionen Tonnen CO₂)</li>
              <li><strong>Harmonisierung von Kategorien</strong> wie Sektoren, Länderbezeichnungen und Unternehmensstrukturen</li>
            </ol>
            <p>Dabei legen wir besonderen Wert auf Transparenz, sodass die verwendeten Definitionen und Annahmen dokumentiert werden.</p>
          </section>
          <section class="mb-5">
            <h2 class="h5 mb-3">3. Datenauswertung</h2>
            <p>Die Auswertung erfolgt mithilfe von statistischen Verfahren und visualisierenden Darstellungen. Dazu gehören:</p>
            <ul class="list-group list-group-flush mb-3">
              <li class="list-group-item ps-0"><strong>Zeitreihenanalysen</strong>, um Trends über Jahre hinweg sichtbar zu machen</li>
              <li class="list-group-item ps-0"><strong>Vergleichsanalysen</strong> zwischen Ländern, Sektoren und Unternehmen</li>
              <li class="list-group-item ps-0"><strong>Kategorisierung nach Emissionsintensität</strong>, um Schwerpunkte klar zu kennzeichnen</li>
            </ul>
            <p>Die Ergebnisse werden in interaktiven Tabellen und Diagrammen auf unserer Website dargestellt, damit sie auch für Nutzer:innen ohne tiefgehende Fachkenntnisse verständlich sind.</p>
          </section>
          <section class="mb-5">
            <h2 class="h5 mb-3">4. Einschränkungen</h2>
            <p>Wir weisen darauf hin, dass trotz sorgfältiger Aufbereitung gewisse <strong>Unsicherheiten</strong> in den Daten bestehen können, etwa durch unterschiedliche Berichtsmethoden einzelner Länder oder Unternehmen. Diese werden soweit möglich berücksichtigt und in unseren Darstellungen kenntlich gemacht.</p>
          </section>
          <div class="alert alert-info mt-4">
            Mit dieser Methodik möchten wir eine <strong>vertrauenswürdige und transparente Informationsbasis</strong> schaffen, die sowohl der wissenschaftlichen Analyse als auch der breiten Öffentlichkeit dient.
          </div>
        </div>
      </div>
    </main>
    <Footer/>
  </div>
</template>

<script setup lang="ts">
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
</script>
