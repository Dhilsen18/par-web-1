/**
 * http.js
 * @summary Axios base HTTP instance for API communication.
 * @author Student Developer
 */
import axios from 'axios'

const http = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: { 'Content-Type': 'application/json' }
})

export default http
