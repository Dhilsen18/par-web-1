/**
 * issue.assembler.js
 * @summary Assembler to map API response resources to Issue entities.
 * @author Student Developer
 */
import { Issue } from '../../domain/model/issue.entity.js'

export class IssueAssembler {
  /**
   * Maps a raw resource object to an Issue entity.
   * @param {Object} resource
   * @returns {Issue}
   */
  static toEntity(resource) {
    return new Issue(
      resource.id,
      resource.equipmentId,
      resource.issueType,
      resource.registeredAt,
      resource.status
    )
  }

  /**
   * Maps an array of resources to Issue entities.
   * @param {Object[]} resources
   * @returns {Issue[]}
   */
  static toEntities(resources) {
    return resources.map(r => IssueAssembler.toEntity(r))
  }
}
