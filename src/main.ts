import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';

// Importieren Sie Komponenten
import App from './App.vue';
import Index from './views/Index.vue';
import NotFound from './views/NotFound.vue';

// Bootstrap CSS und JS importieren
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// Routen definieren
const routes = [
    { path: '/', component: Index },
    { path: '/:pathMatch(.*)*', component: NotFound },
];

// Router-Instanz erstellen
const router = createRouter({
    history: createWebHistory(),
    routes,
});

// App-Instanz erstellen und mit Router und Root-Element verbinden
createApp(App)
    .use(router)
    .mount('#app');