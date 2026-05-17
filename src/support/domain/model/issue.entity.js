/**
 * issue.entity.js
 * @summary Domain entity representing an equipment issue record.
 * @author Student Developer
 */
export class Issue {
  /**
   * @param {number} id
   * @param {number} equipmentId
   * @param {string} issueType - 'NoOperation' | 'SlowOperation' | 'WrongOperation'
   * @param {string} registeredAt
   * @param {string} status - 'Open' | 'Closed'
   */
  constructor(id, equipmentId, issueType, registeredAt, status) {
    this.id = id
    this.equipmentId = equipmentId
    this.issueType = issueType
    this.registeredAt = registeredAt
    this.status = status
  }
}
