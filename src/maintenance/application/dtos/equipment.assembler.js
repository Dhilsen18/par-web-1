/**
 * equipment.assembler.js
 * @summary Assembler to map API response resources to Equipment entities.
 * @author Student Developer
 */
import { Equipment } from '../../domain/model/equipment.entity.js'

export class EquipmentAssembler {
  /**
   * Maps a raw API resource object to an Equipment entity.
   * @param {Object} resource
   * @returns {Equipment}
   */
  static toEntity(resource) {
    return new Equipment(
      resource.id,
      resource.name,
      resource.costPerHour,
      resource.impactInProductionLine,
      resource.defaultAction
    )
  }

  /**
   * Maps an array of resource objects to Equipment entities.
   * @param {Object[]} resources
   * @returns {Equipment[]}
   */
  static toEntities(resources) {
    return resources.map(r => EquipmentAssembler.toEntity(r))
  }
}
