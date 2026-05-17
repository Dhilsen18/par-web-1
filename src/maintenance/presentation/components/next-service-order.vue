<!--
  next-service-order.vue
  @summary Card component showing the oldest pending high-priority service order.
  @author Student Developer
-->
<template>
  <pv-card class="service-order-card" aria-label="Next high-priority service order">
    <template #title>
      <div class="order-title">
        <i class="pi pi-wrench" aria-hidden="true"></i>
        {{ $t('home.next_service_order') }}
      </div>
    </template>
    <template #content>
      <div v-if="order" class="order-details" role="region" aria-label="Service order details">
        <div class="order-row">
          <span class="order-key">{{ $t('service_order.id') }}</span>
          <span class="order-value">#{{ order.id }}</span>
        </div>
        <div class="order-row">
          <span class="order-key">{{ $t('service_order.equipment') }}</span>
          <span class="order-value">{{ equipmentName }}</span>
        </div>
        <div class="order-row">
          <span class="order-key">{{ $t('service_order.needed_action') }}</span>
          <pv-tag :value="order.neededAction" :severity="order.neededAction === 'Replace' ? 'danger' : 'info'" />
        </div>
        <div class="order-row">
          <span class="order-key">{{ $t('service_order.priority') }}</span>
          <pv-tag value="High" severity="danger" />
        </div>
        <div class="order-row">
          <span class="order-key">{{ $t('service_order.registered_at') }}</span>
          <span class="order-value">{{ formattedDate }}</span>
        </div>
      </div>
      <div v-else class="no-order" role="status" aria-live="polite">
        <i class="pi pi-check-circle" aria-hidden="true"></i>
        <p>{{ $t('service_order.no_pending') }}</p>
      </div>
    </template>
  </pv-card>
</template>

<script setup>
import { computed } from 'vue'
import Card from 'primevue/card'
import Tag from 'primevue/tag'

const PvCard = Card
const PvTag = Tag

const props = defineProps({
  order: { type: Object, default: null },
  equipments: { type: Array, default: () => [] }
})

const equipmentName = computed(() => {
  if (!props.order) return ''
  const eq = props.equipments.find(e => e.id === props.order.equipmentId)
  return eq ? eq.name : `Equipment #${props.order.equipmentId}`
})

const formattedDate = computed(() => {
  if (!props.order) return ''
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric', month: 'short', day: 'numeric',
    hour: '2-digit', minute: '2-digit'
  }).format(new Date(props.order.registeredAt))
})
</script>

<style scoped>
.service-order-card {
  border-radius: 10px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.1);
}
.order-title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #00857c;
  font-size: 1.1rem;
  font-weight: 700;
}
.order-details { display: flex; flex-direction: column; gap: 0.75rem; }
.order-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.4rem 0;
  border-bottom: 1px solid #f0f0f0;
}
.order-row:last-child { border-bottom: none; }
.order-key { color: #666; font-size: 0.875rem; font-weight: 500; }
.order-value { font-weight: 600; color: #333; }
.no-order {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1.5rem;
  color: #888;
  text-align: center;
}
.no-order i { font-size: 2.5rem; color: #00857c; }
</style>
