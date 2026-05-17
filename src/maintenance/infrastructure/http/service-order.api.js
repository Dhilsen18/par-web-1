/**
 * service-order.api.js
 * @summary Infrastructure service for ServiceOrder endpoint communication.
 * @author Student Developer
 */
import http from '../../../shared/infrastructure/http/http.js'
import { ServiceOrderAssembler } from '../../application/dtos/service-order.assembler.js'

const ENDPOINT = '/service-orders'

export const serviceOrderApi = {
  /**
   * Fetches all service orders.
   * @returns {Promise<ServiceOrder[]>}
   */
  async getAll() {
    const response = await http.get(ENDPOINT)
    return ServiceOrderAssembler.toEntities(response.data)
  },

  /**
   * Creates a new service order.
   * @param {Object} payload
   * @returns {Promise<ServiceOrder>}
   */
  async create(payload) {
    const response = await http.post(ENDPOINT, payload)
    return ServiceOrderAssembler.toEntity(response.data)
  }
}
