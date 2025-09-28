<template>
  <div class="modal fade show d-block" tabindex="-1" role="dialog" v-if="show" @click.self="onClose">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">
            <slot name="title"></slot>
          </h5>
          <button type="button" class="btn-close" aria-label="Close" @click="onClose"></button>
        </div>
        <div class="modal-body">
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ show: boolean }>()
const emit = defineEmits(['close'])
function onClose() {
  emit('close')
}
</script>

<style scoped>
.modal {
  background: rgba(0,0,0,0.5);
  z-index: 1050;
}
</style>

