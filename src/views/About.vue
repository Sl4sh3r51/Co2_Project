<template>
  <div class="d-flex flex-column min-vh-100">
    <Header/>
    <main class="container py-4 flex-grow-1">
      <div class="row justify-content-center">
        <div class="col-12 col-md-10 col-lg-8">
          <h2 class="mb-4">Über uns</h2>

          <section class="mb-5">
            <h3 class="h5 mb-3">Unser Projekt</h3>
            <p>
              Climate Transparency ist eine Initiative, die sich zum Ziel gesetzt hat, komplexe Daten zu CO₂-Emissionen verständlich und zugänglich darzustellen.<br>
              Wir möchten damit Entscheidungsträger*innen, Journalist*innen, Wissenschaftler*innen und die interessierte Öffentlichkeit dabei unterstützen, faktenbasierte Diskussionen über den Klimawandel zu führen.
            </p>
            <p>
              Unsere Plattform sammelt Daten aus verschiedenen internationalen Quellen, bereitet sie interaktiv auf und macht Entwicklungen im Bereich der globalen Emissionen transparent. Neben einer Übersicht über Länder und Unternehmen legen wir besonderen Wert darauf, Trends und Fortschritte im Hinblick auf Klimaziele nachvollziehbar zu machen.
            </p>
          </section>

          <section class="mb-5">
            <h3 class="h5 mb-3">Unsere Mission</h3>
            <ul class="list-group list-group-flush mb-0">
              <li class="list-group-item ps-0"><strong>Transparenz schaffen:</strong> Wir wollen, dass alle Zugang zu relevanten Emissionsdaten haben.</li>
              <li class="list-group-item ps-0"><strong>Komplexität reduzieren:</strong> Daten sollen verständlich und vergleichbar aufbereitet werden.</li>
              <li class="list-group-item ps-0"><strong>Handeln fördern:</strong> Mit klaren Fakten möchten wir zum Diskurs und zu konkreten Maßnahmen gegen den Klimawandel beitragen.</li>
            </ul>
          </section>

          <section class="mb-5">
            <h3 class="h5 mb-3">Unser Team</h3>
            <ul class="list-group list-group-flush mb-0">
              <li class="list-group-item ps-0"><strong>Datenanalyst*innen</strong> – bereiten große Mengen an Emissionsdaten verständlich und präzise auf.</li>
              <li class="list-group-item ps-0"><strong>Entwickler*innen</strong> – sorgen dafür, dass die Plattform zuverlässig, interaktiv und benutzerfreundlich funktioniert.</li>
              <li class="list-group-item ps-0"><strong>Kommunikation &amp; Design</strong> – machen die Inhalte zugänglich, visuell ansprechend und leicht verständlich.</li>
              <li class="list-group-item ps-0"><strong>Forschungsunterstützung</strong> – stellt sicher, dass alle Informationen wissenschaftlich fundiert und aktuell sind.</li>
            </ul>
          </section>

          <section class="mb-3">
            <h3 class="h5 mb-3">Kontakt</h3>
            <p>
              Haben Sie Fragen zu unserem Projekt oder möchten Sie sich beteiligen?<br>
              Schreiben Sie uns gerne über unser <a href="/contact">Kontaktformular</a> oder per E-Mail.<br>
              Gemeinsam können wir den Klimawandel sichtbar machen – und bekämpfen.
            </p>
          </section>
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
