import { api } from '../../boot/api'

export function getWeather(store, { location, weather }) {
  return new Promise((resolve, reject) => {
    let diff
    if (weather && weather.dt) {
      diff = new Date(new Date() - new Date(weather.dt * 1000)).getMinutes()
    }
    if (typeof diff !== 'undefined' && diff < 15) {
      resolve(null)
    } else {
      api.getWeather(location.address).then(
        response => {
          const data = {
            locationId: location.id,
            weather: response.data
          }
          store.commit('fetchWeather', data)
          resolve(response)
        },
        response => {
          // eslint-disable-next-line
          console.log(response)
          reject(response)
        }
      )
    }
  })
}
