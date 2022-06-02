import { api } from '../../boot/api'

export function loadAll(store) {
  return new Promise((resolve, reject) => {
    api.getSoftwares().then(
      response => {
        store.commit('importSoftwares', response.data)
        resolve()
      },
      response => {
        reject()
      }
    )
  })
}

export function loadOne(store, { softwareId }) {
  return new Promise((resolve, reject) => {
    api.getSoftware(softwareId).then(
      response => {
        store.commit('importSoftware', response.data)
        resolve()
      },
      response => {
        reject()
      }
    )
  })
}

export function update(store, { softwareId }) {
  let data = store.getters['byId'](softwareId)

  return new Promise((resolve, reject) => {
    api
      .patchSoftware(softwareId, data)
      .then(response => {
        store.commit('importSoftware', response.data)
      }, response => { })
  })
}

export function updateWithData(store, { softwareId, software }) {
  return new Promise((resolve, reject) => {
    api
      .patchSoftware(softwareId, software)
      .then(response => {
        store.commit('importSoftware', {
          id: softwareId,
          ...software
        })
        resolve()
      }, response => { reject() })
  })
}

export function destroy(store, { softwareId }) {
  return new Promise((resolve, reject) => {
    api.deleteSoftware(softwareId).then(
      response => {
        store.commit('removeSoftware', softwareId)
        resolve()
      },
      response => { }
    )
  })
}
