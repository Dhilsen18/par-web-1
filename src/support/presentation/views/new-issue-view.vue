<!--
  new-issue-view.vue
  @summary Form view for creating a new issue record and auto-generating a service order.
  @author Student Developer
-->
<template>
  <div class="new-issue-view" role="main" aria-labelledby="new-issue-title">
    <div class="page-header">
      <h1 id="new-issue-title" class="page-title">{{ $t('new_issue.title') }}</h1>
      <h2 class="page-subtitle">{{ $t('new_issue.subtitle') }}</h2>
    </div>

    <pv-card class="issue-form-card">
      <template #content>
        <form @submit.prevent="handleCreate" novalidate aria-label="New issue form">

          <!-- Equipment selector -->
          <div class="field" role="group" aria-labelledby="equipment-label">
            <label id="equipment-label" for="equipment-select" class="field-label">
              {{ $t('new_issue.equipment') }} *
            </label>
            <pv-dropdown
              id="equipment-select"
              v-model="selectedEquipmentId"
              :options="equipmentOptions"
              option-label="label"
              option-value="value"
              :placeholder="$t('new_issue.select_equipment')"
              class="w-full"
              append-to="body"
              :class="{ 'p-invalid': errors.equipment }"
              aria-required="true"
              :aria-describedby="errors.equipment ? 'equipment-error' : undefined"
            />
            <small
              v-if="errors.equipment"
              id="equipment-error"
              class="p-error"
              role="alert"
            >{{ errors.equipment }}</small>
          </div>

          <!-- Issue Type selector -->
          <div class="field" role="group" aria-labelledby="issue-type-label">
            <label id="issue-type-label" for="issue-type-select" class="field-label">
              {{ $t('new_issue.issue_type') }} *
            </label>
            <pv-dropdown
              id="issue-type-select"
              v-model="selectedIssueType"
              :options="issueTypeOptions"
              option-label="label"
              option-value="value"
              :placeholder="$t('new_issue.select_issue_type')"
              class="w-full"
              append-to="body"
              :class="{ 'p-invalid': errors.issueType }"
              aria-required="true"
              :aria-describedby="errors.issueType ? 'issue-type-error' : undefined"
            />
            <small
              v-if="errors.issueType"
              id="issue-type-error"
              class="p-error"
              role="alert"
            >{{ errors.issueType }}</small>
          </div>

          <!-- Duplicate today warning -->
          <pv-message v-if="duplicateWarning" severity="warn" :closable="false" aria-live="polite">
            {{ $t('new_issue.duplicate_today') }}
          </pv-message>

          <!-- Form actions -->
          <div class="form-actions">
            <pv-button
              type="submit"
              :label="$t('new_issue.create')"
              icon="pi pi-check"
              :loading="submitting"
              :disabled="submitting"
              aria-label="Create issue"
            />
            <pv-button
              type="button"
              :label="$t('new_issue.cancel')"
              icon="pi pi-times"
              severity="secondary"
              :disabled="submitting"
              @click="handleCancel"
              aria-label="Cancel"
            />
          </div>
        </form>
      </template>
    </pv-card>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useToast } from 'primevue/usetoast'
import { useMaintenanceStore } from '../../../maintenance/application/maintenance.store.js'
import { useSupportStore } from '../../application/support.store.js'
import Card from 'primevue/card'
import Dropdown from 'primevue/dropdown'
import Button from 'primevue/button'
import Message from 'primevue/message'

const PvCard = Card
const PvDropdown = Dropdown
const PvButton = Button
const PvMessage = Message

const { t } = useI18n()
const router = useRouter()
const toast = useToast()
const maintenanceStore = useMaintenanceStore()
const supportStore = useSupportStore()

const selectedEquipmentId = ref(null)
const selectedIssueType = ref(null)
const submitting = ref(false)
const errors = ref({ equipment: '', issueType: '' })
const duplicateWarning = ref(false)

const equipmentOptions = computed(() =>
  maintenanceStore.equipments.map(e => ({ label: e.name, value: e.id }))
)

const issueTypeOptions = computed(() =>
  supportStore.ISSUE_TYPES.map(type => ({ label: t(`issue_types.${type}`), value: type }))
)

watch(selectedEquipmentId, (newVal) => {
  if (newVal) {
    duplicateWarning.value = supportStore.hasIssueToday(newVal)
    errors.value.equipment = ''
  }
})

watch(selectedIssueType, () => {
  errors.value.issueType = ''
})

/**
 * Validates the form fields.
 * @returns {boolean}
 */
function validate() {
  let valid = true
  errors.value.equipment = ''
  errors.value.issueType = ''

  if (!selectedEquipmentId.value) {
    errors.value.equipment = t('new_issue.validation_equipment')
    valid = false
  }
  if (!selectedIssueType.value) {
    errors.value.issueType = t('new_issue.validation_issue_type')
    valid = false
  }
  return valid
}

/**
 * Handles the Create form submission: creates issue and service order.
 */
async function handleCreate() {
  if (!validate()) return
  if (duplicateWarning.value) return

  submitting.value = true
  try {
    const equipment = maintenanceStore.getEquipmentById(selectedEquipmentId.value)

    const issuePayload = {
      equipmentId: selectedEquipmentId.value,
      issueType: selectedIssueType.value,
      registeredAt: new Date().toISOString(),
      status: 'Open'
    }

    const newIssue = await supportStore.createIssue(issuePayload)

    const serviceOrderPayload = {
      equipmentId: selectedEquipmentId.value,
      issueId: newIssue.id,
      neededAction: equipment.defaultAction,
      priority: equipment.impactInProductionLine === 'Total' ? 'High' : 'Normal',
      registeredAt: new Date().toISOString(),
      completedAt: null
    }

    await maintenanceStore.createServiceOrder(serviceOrderPayload)

    toast.add({
      severity: 'success',
      summary: 'Success',
      detail: t('new_issue.success'),
      life: 3000
    })

    router.push('/home')
  } catch (e) {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: t('new_issue.error'),
      life: 4000
    })
  } finally {
    submitting.value = false
  }
}

function handleCancel() {
  router.push('/home')
}

onMounted(async () => {
  if (maintenanceStore.equipments.length === 0) {
    await maintenanceStore.fetchEquipments()
  }
  if (supportStore.issues.length === 0) {
    await supportStore.fetchIssues()
  }
})
</script>

<style scoped>
.new-issue-view {
  max-width: 560px;
  margin: 0 auto;
}

.page-header {
  margin-bottom: 1.5rem;
}

.page-title {
  font-size: 1.75rem;
  color: #00857c;
  font-weight: 700;
  margin: 0 0 0.35rem;
}

.page-subtitle {
  color: #666;
  font-size: 1rem;
  font-weight: 400;
  margin: 0;
}

.issue-form-card {
  border-radius: 10px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
}

.issue-form-card :deep(.p-card-body) {
  padding: 1.5rem;
}

.issue-form-card :deep(.p-card-content) {
  padding: 0;
}

.field {
  margin-bottom: 1.5rem;
}

.field-label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #333;
  font-size: 0.95rem;
}

.field :deep(.p-dropdown) {
  width: 100%;
}

.form-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  justify-content: flex-end;
  margin-top: 0.5rem;
  padding-top: 1.25rem;
  border-top: 1px solid #e8e8e8;
}
</style>
