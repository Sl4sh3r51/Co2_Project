import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';

// Komponenten
import App from './App.vue';
import Index from './views/Index.vue';
import NotFound from './views/NotFound.vue';
import About from './views/About.vue';
import Methodology from './views/Methodology.vue';
import Contact from './views/Contact.vue';

// Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// Routen
const routes = [
    { path: '/', component: Index },
    { path: '/about', component: About },
    { path: '/methodology', component: Methodology },
    { path: '/contact', component: Contact },
    { path: '/:pathMatch(.*)*', component: NotFound },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

// Nach jedem Routenwechsel Body-Overflow und Bootstrap-Überbleibsel zurücksetzen
router.afterEach(() => {
  document.body.style.overflow = '';
  document.body.classList.remove('modal-open', 'offcanvas-open');
  document.querySelectorAll('.modal-backdrop, .offcanvas-backdrop').forEach(el => el.remove());
});

createApp(App)
    .use(router)
    .mount('#app');