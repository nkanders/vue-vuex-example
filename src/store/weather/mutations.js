import Vue from 'vue'

export function fetchWeather(state, { locationId, weather }) {
  if (locationId) {
    Vue.set(state.weather, locationId, weather)
  }
}
