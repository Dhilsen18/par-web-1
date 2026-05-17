<!--
  home-view.vue
  @summary Main home view with issue analytics grid and next service order card.
  @author Student Developer
-->
<template>
  <div class="home-view" role="main" aria-labelledby="home-title">
    <div class="home-header">
      <h1 id="home-title" class="home-title">{{ $t('home.title') }}</h1>
      <p class="home-subtitle">{{ $t('home.subtitle') }}</p>
    </div>

    <!-- Issue Analytics Section -->
    <section class="analytics-section" aria-labelledby="analytics-title">
      <h2 id="analytics-title" class="section-title">
        <i class="pi pi-chart-bar" aria-hidden="true"></i>
        {{ $t('home.issue_analytics') }}
      </h2>

      <div v-if="maintenanceStore.loading || supportStore.loading" class="loading-state" role="status" aria-live="polite">
        <pv-progress-spinner aria-label="Loading data" />
      </div>

      <div v-else class="grid issue-grid">
        <div
          v-for="issueType in supportStore.ISSUE_TYPES"
          :key="issueType"
          class="col-12 md:col-4"
        >
          <issue-type-stats
            :issue-type="issueType"
            :open-issues="supportStore.getOpenIssuesByType(issueType)"
            :all-issues="supportStore.getAllIssuesByType(issueType)"
            :equipments="maintenanceStore.equipments"
          />
        </div>
      </div>
    </section>

    <!-- Next Service Order Section -->
    <section class="service-order-section" aria-labelledby="service-order-title">
      <h2 id="service-order-title" class="section-title">
        <i class="pi pi-cog" aria-hidden="true"></i>
        {{ $t('home.next_service_order') }}
      </h2>
      <div class="grid">
        <div class="col-12 md:col-6 lg:col-5">
          <next-service-order
            :order="maintenanceStore.getNextHighPriorityOrder()"
            :equipments="maintenanceStore.equipments"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useMaintenanceStore } from '../../application/maintenance.store.js'
import { useSupportStore } from '../../../support/application/support.store.js'
import IssueTypeStats from '../components/issue-type-stats.vue'
import NextServiceOrder from '../components/next-service-order.vue'
import ProgressSpinner from 'primevue/progressspinner'

const PvProgressSpinner = ProgressSpinner

const maintenanceStore = useMaintenanceStore()
const supportStore = useSupportStore()

onMounted(async () => {
  await Promise.all([
    maintenanceStore.fetchEquipments(),
    maintenanceStore.fetchServiceOrders(),
    supportStore.fetchIssues()
  ])
})
</script>

<style scoped>
.home-view { padding: 0.5rem 0; }
.home-header {
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #00857c;
}
.home-title {
  font-size: 2rem;
  color: #00857c;
  font-weight: 700;
  margin-bottom: 0.5rem;
}
.home-subtitle {
  color: #555;
  font-size: 1rem;
  font-style: italic;
}
.analytics-section, .service-order-section { margin-bottom: 2.5rem; }
.section-title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.3rem;
  color: #333;
  margin-bottom: 1.25rem;
  font-weight: 600;
}
.loading-state {
  display: flex;
  justify-content: center;
  padding: 3rem;
}

.issue-grid {
  gap: 1rem;
}
</style>
