# Climate Transparency CO₂ Project

Dieses Repository enthält den Quellcode für die Climate Transparency Webanwendung, ein Vue.js-Projekt, das einen klaren und zugänglichen Überblick über globale CO₂-Emissionen bietet.  
Es stellt Daten aus verschiedenen Ländern und von großen Unternehmen in einem interaktiven Format dar, mit dem Ziel, Transparenz zu fördern und fundierte Diskussionen über den Klimawandel zu ermöglichen.

## Hauptfunktionen

* **Interaktive Emissionstabelle:** Anzeigen und Vergleichen von CO₂-Emissionsdaten für Länder und Unternehmen, inklusive Trendindikatoren und Emissionsniveaus.  
* **Dynamisches Filtern & Suchen:** Einfaches Filtern der Daten sowie Live-Suche nach Namen, Sektor oder Land.  
* **Datensortierung:** Sortieren der Tabellendaten nach Name, Entitätstyp, Emissionsvolumen oder Trend für eine bessere Analyse.  
* **Responsives Design:** Vollständig responsiv und sowohl für Desktop- als auch Mobilgeräte optimiert, um eine einheitliche Nutzererfahrung sicherzustellen.  
* **Komponentenbasierte Architektur:** Entwickelt mit wiederverwendbaren Vue-Komponenten.

## Technologie-Stack

* **Framework:** Vue 3 (Composition API) mit TypeScript  
* **UI / Styling:** Bootstrap 5 & Bootstrap Icons  
* **Routing:** Vue Router 4  
* **Sicherheit:** DOMPurify zur Bereinigung von Benutzereingaben in Formularen  
* **End-to-End-Testing:** Playwright

## Erste Schritte

Folge diesen Anweisungen, um das Projekt lokal auf deinem Rechner für Entwicklungs- und Testzwecke einzurichten.

### Voraussetzungen

Du benötigst [Node.js](https://nodejs.org/) (inklusive npm), installiert auf deinem System.

### Installation

1. Repository auf den lokalen Rechner klonen:
    ```sh
    git clone https://github.com/sl4sh3r51/co2_project.git
    ```
2. In das Projektverzeichnis wechseln:
    ```sh
    cd co2_project
    ```
3. Benötigte NPM-Pakete installieren:
    ```sh
    npm install
    ```

### Anwendung starten

**Entwicklungsserver**  
Um die App im Entwicklungsmodus mit Hot-Reloading auszuführen:  
```sh
npm run serve
````

Die Anwendung ist anschließend unter `http://localhost:8080/` erreichbar.

## Tests

Dieses Projekt nutzt Playwright für End-to-End-Tests.
Die Tests decken Navigation, Modal-Interaktionen, das Absenden des Kontaktformulars und die Kernfunktionalität der Emissionstabelle (Filtern, Suchen und Datenintegrität) ab.

Um die Testsuite auszuführen:

```sh
npm run test:e2e
```

Playwright führt die Tests im Verzeichnis `src/tests e2e/` aus und erstellt nach Abschluss einen HTML-Bericht im Ordner `playwright-report`.
