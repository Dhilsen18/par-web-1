/**
 * service-order.entity.js
 * @summary Domain entity representing a maintenance service order.
 * @author Student Developer
 */
export class ServiceOrder {
  /**
   * @param {number} id
   * @param {number} equipmentId
   * @param {number} issueId
   * @param {string} neededAction
   * @param {string} priority
   * @param {string} registeredAt
   * @param {string|null} completedAt
   */
  constructor(id, equipmentId, issueId, neededAction, priority, registeredAt, completedAt) {
    this.id = id
    this.equipmentId = equipmentId
    this.issueId = issueId
    this.neededAction = neededAction
    this.priority = priority
    this.registeredAt = registeredAt
    this.completedAt = completedAt
  }
}
