import axios from 'axios'

export default {
  getDeviceModels() {
    let url = `${this.apiUrl}/device-models`

    return axios.get(url)
  },

  getDeviceModel(modelId) {
    let url = `${this.apiUrl}/device-models/${modelId}`

    return axios.get(url)
  },

  putDeviceModel(data) {
    let url = `${this.apiUrl}/device-models/`

    return axios.put(url, data)
  },

  patchDeviceModel(modelId, data) {
    let url = `${this.apiUrl}/device-models/${modelId}`

    return axios.patch(url, data)
  },

  deleteDeviceModel(modelId) {
    let url = `${this.apiUrl}/device-models/${modelId}`

    return axios.delete(url)
  }
}
