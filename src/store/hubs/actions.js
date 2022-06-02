import { api } from '../../boot/api'

export function loadHubs(store, locationId) {
  return new Promise((resolve, reject) => {
    api.getHubs(locationId).then(
      response => {
        store.commit('importHubs', response)
        resolve(response)
      },
      response => {
        // eslint-disable-next-line
        console.log(response)
        reject(response)
      }
    )
  })
}

export function updateNode(store, { hubId, nodeId, status }) {
  store.commit('updateNode', { hubId, nodeId, status })
}
