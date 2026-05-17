/**
 * equipment.entity.js
 * @summary Domain entity representing a plant equipment item.
 * @author Student Developer
 */
export class Equipment {
  /**
   * @param {number} id
   * @param {string} name
   * @param {number} costPerHour
   * @param {string} impactInProductionLine - 'None' | 'Partial' | 'Total'
   * @param {string} defaultAction - 'Repair' | 'Replace'
   */
  constructor(id, name, costPerHour, impactInProductionLine, defaultAction) {
    this.id = id
    this.name = name
    this.costPerHour = costPerHour
    this.impactInProductionLine = impactInProductionLine
    this.defaultAction = defaultAction
  }
}
