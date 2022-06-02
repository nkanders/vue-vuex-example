export function weatherById(state) {
  return id => (state.weather[id] || false)
}
