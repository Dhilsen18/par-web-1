/**
 * equipment.api.js
 * @summary Infrastructure service for Equipment endpoint communication.
 * @author Student Developer
 */
import http from '../../../shared/infrastructure/http/http.js'
import { EquipmentAssembler } from '../../application/dtos/equipment.assembler.js'

const ENDPOINT = '/equipments'

export const equipmentApi = {
  /**
   * Fetches all equipment records.
   * @returns {Promise<Equipment[]>}
   */
  async getAll() {
    const response = await http.get(ENDPOINT)
    return EquipmentAssembler.toEntities(response.data)
  },

  /**
   * Fetches a single equipment by id.
   * @param {number} id
   * @returns {Promise<Equipment>}
   */
  async getById(id) {
    const response = await http.get(`${ENDPOINT}/${id}`)
    return EquipmentAssembler.toEntity(response.data)
  }
}
