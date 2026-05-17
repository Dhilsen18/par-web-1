/**
 * support.store.js
 * @summary Pinia state management store for the support bounded context.
 * @author Student Developer
 */
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { issueApi } from '../infrastructure/http/issue.api.js'

export const useSupportStore = defineStore('support', () => {
  const issues = ref([])
  const loading = ref(false)
  const error = ref(null)

  const ISSUE_TYPES = ['NoOperation', 'SlowOperation', 'WrongOperation']

  /**
   * Loads all issues from the API.
   */
  async function fetchIssues() {
    loading.value = true
    error.value = null
    try {
      issues.value = await issueApi.getAll()
    } catch (e) {
      error.value = e.message
    } finally {
      loading.value = false
    }
  }

  /**
   * Creates a new issue record.
   * @param {Object} payload
   * @returns {Promise<Issue>}
   */
  async function createIssue(payload) {
    const newIssue = await issueApi.create(payload)
    issues.value.push(newIssue)
    return newIssue
  }

  /**
   * Checks if an equipment already has an issue registered today.
   * @param {number} equipmentId
   * @returns {boolean}
   */
  function hasIssueToday(equipmentId) {
    const today = new Date().toISOString().slice(0, 10)
    return issues.value.some(i => {
      const issueDate = new Date(i.registeredAt).toISOString().slice(0, 10)
      return i.equipmentId === equipmentId && issueDate === today
    })
  }

  /**
   * Returns open issues filtered by issueType.
   * @param {string} issueType
   * @returns {Issue[]}
   */
  function getOpenIssuesByType(issueType) {
    return issues.value.filter(i => i.issueType === issueType && i.status === 'Open')
  }

  /**
   * Returns all issues filtered by issueType (all statuses).
   * @param {string} issueType
   * @returns {Issue[]}
   */
  function getAllIssuesByType(issueType) {
    return issues.value.filter(i => i.issueType === issueType)
  }

  return {
    issues,
    loading,
    error,
    ISSUE_TYPES,
    fetchIssues,
    createIssue,
    hasIssueToday,
    getOpenIssuesByType,
    getAllIssuesByType
  }
})
