/**
 * service-order.assembler.js
 * @summary Assembler to map API response resources to ServiceOrder entities.
 * @author Student Developer
 */
import { ServiceOrder } from '../../domain/model/service-order.entity.js'

export class ServiceOrderAssembler {
  /**
   * Maps a raw resource to a ServiceOrder entity.
   * @param {Object} resource
   * @returns {ServiceOrder}
   */
  static toEntity(resource) {
    return new ServiceOrder(
      resource.id,
      resource.equipmentId,
      resource.issueId,
      resource.neededAction,
      resource.priority,
      resource.registeredAt,
      resource.completedAt
    )
  }

  /**
   * Maps array of resources to ServiceOrder entities.
   * @param {Object[]} resources
   * @returns {ServiceOrder[]}
   */
  static toEntities(resources) {
    return resources.map(r => ServiceOrderAssembler.toEntity(r))
  }
}
