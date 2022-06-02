import { api } from '../../boot/api'

export function loadAll(store) {
  return new Promise((resolve, reject) => {
    api.getDeviceTypes().then(
      response => {
        store.commit('importDeviceTypes', response.data)
        resolve()
      },
      response => {
        // eslint-disable-next-line
        console.log(response)
        reject()
      }
    )
  })
}

export function loadOne(store, { typeId }) {
  return new Promise((resolve, reject) => {
    api.getDeviceType(typeId).then(
      response => {
        store.commit('importDeviceType', response.data)
        resolve()
      },
      response => {
        reject()
      }
    )
  })
}

export function update(store, { typeId }) {
  let data = store.getters['byId'](typeId)

  return new Promise((resolve, reject) => {
    api
      .patchDeviceType(typeId, data)
      .then(response => { }, response => { })
  })
}

export function create(store, { data }) {
  return new Promise((resolve, reject) => {
    api.putDeviceType(data).then(
      response => {
        store.commit('importDeviceType', response.data)
        resolve()
      },
      reject
    )
  })
}

export function destroy(store, { typeId, deviceId }) {
  return new Promise((resolve, reject) => {
    api.deleteDeviceType(typeId, deviceId).then(
      response => {
        store.commit('removeDeviceType', typeId)
        resolve()
      },
      response => {
        reject()
      }
    )
  })
}
