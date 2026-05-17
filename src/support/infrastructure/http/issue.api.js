/**
 * issue.api.js
 * @summary Infrastructure service for Issue endpoint communication.
 * @author Student Developer
 */
import http from '../../../shared/infrastructure/http/http.js'
import { IssueAssembler } from '../../application/dtos/issue.assembler.js'

const ENDPOINT = '/issues'

export const issueApi = {
  /**
   * Fetches all issues.
   * @returns {Promise<Issue[]>}
   */
  async getAll() {
    const response = await http.get(ENDPOINT)
    return IssueAssembler.toEntities(response.data)
  },

  /**
   * Creates a new issue record.
   * @param {Object} payload
   * @returns {Promise<Issue>}
   */
  async create(payload) {
    const response = await http.post(ENDPOINT, payload)
    return IssueAssembler.toEntity(response.data)
  }
}
