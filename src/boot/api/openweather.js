import axios from 'axios'
import * as jsonpAdapter from 'axios-jsonp'

function addressToQuery(address) {
  return `${address.city || ''},${address.province || ''},${address.country || ''}`
}

export default {
  weatherApiUrl: process.env.weatherApiUrl,
  weatherApiKey: process.env.weatherApiKey,

  getWeather(address) {
    // TODO: configurabl units
    const url = `${this.weatherApiUrl}/data/2.5/weather?q=${addressToQuery(address)}&appid=${this.weatherApiKey}&units=Imperial`

    return axios({
      url,
      adapter: jsonpAdapter
    })
  }
}
