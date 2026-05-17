<!--
  App.vue
  @summary Root application component with toolbar and router view.
  @author Student Developer
-->
<template>
  <div class="app-wrapper">
    <app-toolbar />
    <main class="main-content" role="main">
      <router-view />
    </main>
    <pv-toast />
  </div>
</template>

<script setup>
import AppToolbar from './shared/presentation/components/app-toolbar.vue'
import Toast from 'primevue/toast'
const PvToast = Toast
</script>

<style>
*,
*::before,
*::after {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: #f0f2f1;
  color: #333;
}

.app-wrapper {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
  padding: 2rem 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

@media (max-width: 768px) {
  .main-content {
    padding: 1.25rem 1rem;
  }
}
</style>
