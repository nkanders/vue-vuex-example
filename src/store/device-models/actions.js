import { api } from '../../boot/api'

export function loadAll(store) {
  return new Promise((resolve, reject) => {
    api.getDeviceModels().then(
      response => {
        store.commit('importDeviceModels', response.data)
        resolve()
      },
      response => {
        reject()
      }
    )
  })
}

export function loadOne(store, { modelId }) {
  return new Promise((resolve, reject) => {
    api.getDeviceModel(modelId).then(
      response => {
        store.commit('importDeviceModel', response.data)
        resolve()
      },
      response => {
        reject()
      }
    )
  })
}

export function update(store, { modelId }) {
  let data = store.getters['byId'](modelId)

  return new Promise((resolve, reject) => {
    api
      .patchDeviceModel(modelId, data)
      .then(response => {
        resolve(response)
      }, response => {
        reject(response)
      })
  })
}

export function create(store, { data }) {
  return new Promise((resolve, reject) => {
    api.putDeviceModel(data).then(
      response => {
        store.commit('importDeviceModel', response.data)
        resolve()
      },
      reject
    )
  })
}

export function destroy(store, { modelId }) {
  return new Promise((resolve, reject) => {
    api.deleteDeviceModel(modelId).then(
      response => {
        store.commit('removeDeviceModel', modelId)
        resolve()
      },
      response => { }
    )
  })
}
