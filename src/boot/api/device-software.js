import axios from 'axios'

export default {
  getSoftwares() {
    let url = ''

    url = `${this.apiUrl}/software`

    return axios.get(url)
  },

  getSoftware(softwareId) {
    let url = ''

    url = `${this.apiUrl}/software/${softwareId}`

    return axios.get(url)
  },

  patchSoftware (softwareId, data) {
    let url = ''

    url = `${this.apiUrl}/software/${softwareId}`

    return axios.patch(url, data)
  },

  deleteSoftware (softwareId) {
    let url = ''

    url = `${this.apiUrl}/software/${softwareId}`

    return axios.delete(url)
  }
}
