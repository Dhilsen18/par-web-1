/**
 * maintenance.store.js
 * @summary Pinia state management store for the maintenance bounded context.
 * @author Student Developer
 */
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { equipmentApi } from '../infrastructure/http/equipment.api.js'
import { serviceOrderApi } from '../infrastructure/http/service-order.api.js'

export const useMaintenanceStore = defineStore('maintenance', () => {
  const equipments = ref([])
  const serviceOrders = ref([])
  const loading = ref(false)
  const error = ref(null)

  /**
   * Loads all equipments from the API.
   */
  async function fetchEquipments() {
    loading.value = true
    error.value = null
    try {
      equipments.value = await equipmentApi.getAll()
    } catch (e) {
      error.value = e.message
    } finally {
      loading.value = false
    }
  }

  /**
   * Loads all service orders from the API.
   */
  async function fetchServiceOrders() {
    loading.value = true
    error.value = null
    try {
      serviceOrders.value = await serviceOrderApi.getAll()
    } catch (e) {
      error.value = e.message
    } finally {
      loading.value = false
    }
  }

  /**
   * Creates a new service order record.
   * @param {Object} payload
   */
  async function createServiceOrder(payload) {
    const newOrder = await serviceOrderApi.create(payload)
    serviceOrders.value.push(newOrder)
    return newOrder
  }

  /**
   * Returns the oldest high-priority service order without completion.
   * @returns {ServiceOrder|null}
   */
  function getNextHighPriorityOrder() {
    const highOrders = serviceOrders.value.filter(
      o => o.priority === 'High' && o.completedAt === null
    )
    if (highOrders.length === 0) return null
    return highOrders.reduce((oldest, current) =>
      new Date(current.registeredAt) < new Date(oldest.registeredAt) ? current : oldest
    )
  }

  /**
   * Finds an equipment by its id.
   * @param {number} id
   * @returns {Equipment|undefined}
   */
  function getEquipmentById(id) {
    return equipments.value.find(e => e.id === id)
  }

  return {
    equipments,
    serviceOrders,
    loading,
    error,
    fetchEquipments,
    fetchServiceOrders,
    createServiceOrder,
    getNextHighPriorityOrder,
    getEquipmentById
  }
})
