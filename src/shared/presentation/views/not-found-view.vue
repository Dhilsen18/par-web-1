<!--
  not-found-view.vue
  @summary Page-not-found view displaying the unmatched route and a return button.
  @author Student Developer
-->
<template>
  <div class="not-found-container" role="main" aria-labelledby="not-found-title">
    <pv-card class="not-found-card">
      <template #header>
        <div class="not-found-header">
          <i class="pi pi-exclamation-triangle not-found-icon" aria-hidden="true"></i>
        </div>
      </template>
      <template #title>
        <h1 id="not-found-title">404</h1>
      </template>
      <template #content>
        <p class="not-found-message">
          {{ $t('not_found.message') }}: <strong>{{ currentRoute }}</strong>
        </p>
      </template>
      <template #footer>
        <pv-button
          :label="$t('not_found.go_home')"
          icon="pi pi-home"
          @click="goHome"
          :aria-label="$t('not_found.go_home')"
        />
      </template>
    </pv-card>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import Card from 'primevue/card'
import Button from 'primevue/button'

const PvCard = Card
const PvButton = Button

const router = useRouter()
const route = useRoute()

const currentRoute = computed(() => route.fullPath)

function goHome() {
  router.push('/home')
}
</script>

<style scoped>
.not-found-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 60vh;
}
.not-found-card {
  max-width: 480px;
  width: 100%;
  text-align: center;
}
.not-found-header {
  background: #fff3cd;
  padding: 2rem;
  border-radius: 8px 8px 0 0;
}
.not-found-icon {
  font-size: 3rem;
  color: #e65100;
}
h1 {
  font-size: 3rem;
  color: #e65100;
  margin: 0;
}
.not-found-message {
  color: #555;
  font-size: 1rem;
  margin-top: 0.5rem;
}
</style>
