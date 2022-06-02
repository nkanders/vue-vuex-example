import Vue from 'vue'

export function importSoftware(state, software) {
  Vue.set(state.software, software.id, software)
}

export function importSoftwares(state, softwares) {
  for (let i = 0; i < softwares.length; i++) {
    importSoftware(state, softwares[i])
  }
}

export function removeSoftware(state, softwareId) {
  Vue.delete(state.software, softwareId)
}
