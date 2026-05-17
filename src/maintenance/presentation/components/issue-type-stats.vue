<!--
  issue-type-stats.vue
  @summary Card component displaying analytics for a specific issue type.
  @author Student Developer
-->
<template>
  <pv-card class="issue-stats-card" :aria-label="`${$t('issue_types.' + issueType)} statistics`">
    <template #header>
      <div class="stats-card-header" :class="`issue-type-${issueType.toLowerCase()}`">
        <i :class="issueTypeIcon" class="issue-type-icon" aria-hidden="true"></i>
        <span class="issue-type-label">{{ $t(`issue_types.${issueType}`) }}</span>
      </div>
    </template>
    <template #content>
      <div class="stats-content">
        <div class="stat-item" :aria-label="`${$t('issue_type_stats.cost_per_hour')}: ${formattedCostPerHour}`">
          <span class="stat-label">{{ $t('issue_type_stats.cost_per_hour') }}</span>
          <span class="stat-value primary">{{ formattedCostPerHour }}</span>
        </div>
        <pv-divider />
        <div class="stat-item" :aria-label="`${$t('issue_type_stats.accumulated_cost')}: ${formattedAccumulatedCost}`">
          <span class="stat-label">{{ $t('issue_type_stats.accumulated_cost') }}</span>
          <span class="stat-value accent">{{ formattedAccumulatedCost }}</span>
        </div>
      </div>
    </template>
    <template #footer>
      <div class="stats-footer" :aria-label="`${$t('issue_type_stats.reported_issues')}: ${reportedIssuesCount}`">
        <i class="pi pi-flag" aria-hidden="true"></i>
        <span class="footer-label">{{ $t('issue_type_stats.reported_issues') }}:</span>
        <pv-badge :value="String(reportedIssuesCount)" :severity="reportedIssuesCount > 0 ? 'warning' : 'secondary'" />
      </div>
    </template>
  </pv-card>
</template>

<script setup>
import { computed } from 'vue'
import Card from 'primevue/card'
import Divider from 'primevue/divider'
import Badge from 'primevue/badge'

const PvCard = Card
const PvDivider = Divider
const PvBadge = Badge

const props = defineProps({
  issueType: { type: String, required: true },
  openIssues: { type: Array, default: () => [] },
  allIssues: { type: Array, default: () => [] },
  equipments: { type: Array, default: () => [] }
})

const issueTypeIcon = computed(() => {
  const icons = {
    NoOperation: 'pi pi-ban',
    SlowOperation: 'pi pi-clock',
    WrongOperation: 'pi pi-exclamation-circle'
  }
  return icons[props.issueType] || 'pi pi-info-circle'
})

/**
 * Calculates total costPerHour for open issues of this type.
 * @returns {number}
 */
const costPerHour = computed(() => {
  return props.openIssues.reduce((sum, issue) => {
    const equipment = props.equipments.find(e => e.id === issue.equipmentId)
    return sum + (equipment ? equipment.costPerHour : 0)
  }, 0)
})

/**
 * Calculates accumulated cost: costPerHour * hours elapsed since registeredAt, for open issues.
 * @returns {number}
 */
const accumulatedCost = computed(() => {
  const now = new Date()
  return props.openIssues.reduce((sum, issue) => {
    const equipment = props.equipments.find(e => e.id === issue.equipmentId)
    if (!equipment) return sum
    const registeredAt = new Date(issue.registeredAt)
    const hoursElapsed = Math.round((now - registeredAt) / (1000 * 60 * 60))
    return sum + (equipment.costPerHour * hoursElapsed)
  }, 0)
})

const reportedIssuesCount = computed(() => props.allIssues.length)

const formattedCostPerHour = computed(() => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(costPerHour.value)
})

const formattedAccumulatedCost = computed(() => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(accumulatedCost.value)
})
</script>

<style scoped>
.issue-stats-card {
  height: 100%;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(0,0,0,0.1);
  transition: transform 0.2s, box-shadow 0.2s;
}
.issue-stats-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(0,0,0,0.15);
}
.stats-card-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 1.25rem;
  color: #fff;
}
.issue-type-nooperation { background: linear-gradient(135deg, #c62828, #e53935); }
.issue-type-slowoperation { background: linear-gradient(135deg, #e65100, #fb8c00); }
.issue-type-wrongoperation { background: linear-gradient(135deg, #1565c0, #1976d2); }
.issue-type-icon { font-size: 1.5rem; }
.issue-type-label { font-weight: 700; font-size: 1rem; }
.stats-content { padding: 0.5rem 0; }
.stat-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
}
.stat-label { color: #666; font-size: 0.875rem; font-weight: 500; }
.stat-value { font-size: 1.1rem; font-weight: 700; }
.stat-value.primary { color: #00857c; }
.stat-value.accent { color: #1565c0; }
.stats-footer {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #666;
  font-size: 0.875rem;
}
.footer-label { font-weight: 500; }
</style>
