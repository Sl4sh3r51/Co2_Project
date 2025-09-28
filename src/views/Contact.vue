<template>
  <div class="d-flex flex-column min-vh-100">
    <Header/>
    <main class="container py-4 flex-grow-1">
      <div class="row justify-content-center">
        <div class="col-12 col-md-10 col-lg-8">
          <h2 class="mb-4">Kontakt</h2>
          <section class="mb-5">
            <p>Wir freuen uns über Ihr Interesse an Climate Transparency.<br>
              Für Fragen, Anregungen oder Feedback können Sie uns gerne über die folgenden Wege erreichen:
            </p>
            <div class="card mb-4">
              <div class="card-body">
                <h5 class="card-title mb-3">Kontaktinformationen</h5>
                <address class="mb-2">
                  <strong>Climate Transparency</strong><br>
                  Musterstraße 1<br>
                  12345 Berlin<br>
                  Deutschland
                </address>
                <div class="mb-1">
                  <i class="bi bi-telephone me-2"></i>
                  <span>+49 30 1234 5678</span>
                </div>
                <div>
                  <i class="bi bi-envelope me-2"></i>
                  <a href="mailto:info@climate-transparency.org" class="text-decoration-none">info@climate-transparency.org</a>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h5 class="mb-3">Kontaktformular</h5>
            <form @submit.prevent="handleSubmit" novalidate>
              <div class="mb-3">
                <label for="name" class="form-label">Name*</label>
                <input type="text" class="form-control" id="name" v-model="form.name" required />
              </div>
              <div class="mb-3">
                <label for="email" class="form-label">E-Mail-Adresse*</label>
                <input type="email" class="form-control" id="email" v-model="form.email" required />
              </div>
              <div class="mb-3">
                <label for="subject" class="form-label">Betreff</label>
                <input type="text" class="form-control" id="subject" v-model="form.subject" />
              </div>
              <div class="mb-3">
                <label for="message" class="form-label">Nachricht*</label>
                <textarea class="form-control" id="message" v-model="form.message" rows="5" required></textarea>
              </div>
              <div class="mb-2 text-muted small">*Pflichtfelder</div>
              <button type="submit" class="btn btn-primary" :class="{disabled: !isFormValid, 'opacity-50': !isFormValid, 'pointer-events-none': !isFormValid}" :disabled="!isFormValid">Absenden</button>
            </form>
          </section>
        </div>
      </div>
      <BaseModal :show="showModal" @close="showModal = false">
        <template #title>Vielen Dank!</template>
        <div>
          Wir melden uns in der Regel innerhalb von 2–3 Werktagen zurück.<br>
          Vielen Dank für Ihr Vertrauen und Ihr Interesse an unserem Projekt!
        </div>
      </BaseModal>
    </main>
    <Footer/>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import BaseModal from '@/components/BaseModal.vue';
import DOMPurify from 'dompurify';

const form = ref({
  name: '',
  email: '',
  subject: '',
  message: ''
});
const showModal = ref(false);

const isFormValid = computed(() => {
  return (
    form.value.name.trim() !== '' &&
    form.value.email.trim() !== '' &&
    form.value.message.trim() !== ''
  );
});

function handleSubmit() {
  form.value.name = DOMPurify.sanitize(form.value.name);
  form.value.email = DOMPurify.sanitize(form.value.email);
  form.value.subject = DOMPurify.sanitize(form.value.subject);
  form.value.message = DOMPurify.sanitize(form.value.message);
  showModal.value = true;
  form.value = { name: '', email: '', subject: '', message: '' };
}
</script>
