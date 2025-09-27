<template>
  <header class="navbar navbar-expand-md navbar-dark bg-primary-gradient shadow-sm py-1">
    <div class="container-fluid px-2 px-md-3 d-flex align-items-center">
      <router-link class="navbar-brand d-flex align-items-center text-decoration-none me-3" to="/" aria-label="Climate Transparency Startseite">
        <img src="@/assets/climate-logo.png" alt="" class="brand-logo" />
        <div class="brand-text d-none d-sm-flex flex-column ms-2 text-truncate">
          <span class="brand-title text-white text-truncate">Climate Transparency</span>
          <small class="text-white-50 d-none d-md-block text-truncate">Zahlen, Fakten und Trends</small>
        </div>
      </router-link>

      <!-- Desktop Nav (visible >= md) -->
      <nav v-if="isDesktop" class="d-none d-md-flex align-items-center ms-auto">
        <ul class="navbar-nav d-flex flex-row align-items-center gap-2">
          <li class="nav-item" v-for="item in navigationItems" :key="item.name">
            <router-link
                :to="item.href"
                class="nav-link py-1 px-2 text-white-90 medium"
                active-class="active"
            >{{ item.name }}</router-link>
          </li>
        </ul>
      </nav>

      <!-- Mobile Nav (visible < md) -->
      <button
          class="navbar-toggler ms-auto d-md-none"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasNavbar"
          aria-controls="offcanvasNavbar"
          aria-label="Navigation öffnen"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <!-- Offcanvas for mobile -->
      <div v-if="!isDesktop" class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
        <div class="offcanvas-header">
          <h5 class="offcanvas-title" id="offcanvasNavbarLabel">Navigation</h5>
          <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Schließen"></button>
        </div>
        <div class="offcanvas-body p-0">
          <ul class="navbar-nav">
            <li class="nav-item" v-for="item in navigationItems" :key="item.name">
              <router-link class="nav-link py-3 px-4" :to="item.href" @click="closeOffcanvas">{{ item.name }}</router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import * as bootstrap from 'bootstrap'

const isDesktop = ref(window.matchMedia('(min-width: 768px)').matches)
const navigationItems = ref([
  { name: 'Startseite', href: '/' },
  { name: 'Über uns', href: '/about' },
  { name: 'Methodik', href: '/methodology' },
  { name: 'Kontakt', href: '/contact' }
])

function handleMq(e: MediaQueryListEvent) { isDesktop.value = e.matches }

onMounted(() => {
  const mq = window.matchMedia('(min-width: 768px)')
  mq.addEventListener('change', handleMq)
  isDesktop.value = mq.matches
})
onBeforeUnmount(() => {
  const mq = window.matchMedia('(min-width: 768px)')
  mq.removeEventListener('change', handleMq)
})

function closeOffcanvas() {
  const offcanvasEl = document.getElementById('offcanvasNavbar')
  if (!offcanvasEl) return
  // robust: getInstance oder neue Instanz erzeugen, falls noch nicht initialisiert
  let instance = bootstrap.Offcanvas.getInstance(offcanvasEl)
  if (!instance) instance = new bootstrap.Offcanvas(offcanvasEl)
  instance.hide()
}
</script>

<style scoped>
.bg-primary-gradient {
  background: linear-gradient(90deg, #274151 0%, #2f7f6c 100%);
}


.brand-logo {
  height: 34px;
  width: 34px;
  object-fit: contain;
  flex-shrink: 0;
}


.brand-title {
  font-size: 0.95rem;
  line-height: 1;
  font-weight: 600;
}

/* Desktop nav */
.navbar-nav .nav-link {
  color: rgba(255,255,255,0.92);
  padding: 0.25rem 0.5rem;
  white-space: nowrap;
}

.navbar-nav .nav-link.active {
  text-decoration: underline;
  text-underline-offset: 3px;
  color: #fff;
}

header.navbar {
  min-height: 48px;
  padding-top: 0.2rem;
  padding-bottom: 0.2rem;
}

.offcanvas .nav-link {
  color: #222;
}


@media (max-width: 575.98px) {
  .brand-text small { display: none !important; }
}
</style>
