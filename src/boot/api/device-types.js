import axios from 'axios'

export default {
  getDeviceTypes() {
    let url = ''

    url = `${this.apiUrl}/device-types`

    return axios.get(url)
  },

  getDeviceType(typeId) {
    let url = `${this.apiUrl}/device-types/${typeId}`

    return axios.get(url)
  },

  putDeviceType(data) {
    let url = `${this.apiUrl}/device-types/`

    return axios.put(url, data)
  },

  patchDeviceType(typeId, data) {
    let url = `${this.apiUrl}/device-types/${typeId}`

    return axios.patch(url, data)
  },

  deleteDeviceType(typeId) {
    let url = `${this.apiUrl}/device-types/${typeId}`

    return axios.delete(url)
  }
}
