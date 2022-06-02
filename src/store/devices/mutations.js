import Vue from 'vue'

export function importDevice(state, newDevice) {
  if (newDevice.id) {
    Vue.set(state.devices, newDevice.id, newDevice)
  }
}

export function importDevices(state, newDevices) {
  if (newDevices.length < 1) {
    state.devices = []
    return
  }

  for (let i = 0; i < newDevices.length; i++) {
    importDevice(state, newDevices[i])
  }
}

export function removeDevice(state, deviceId) {
  Vue.delete(state.devices, deviceId)
}
