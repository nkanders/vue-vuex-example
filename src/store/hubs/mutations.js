import Vue from 'vue'

export function importHub (state, newHub) {
  if (newHub.id) {
    Vue.set(state.hubs, newHub.id, newHub)
  }
}

export function importHubs (state, newHubs) {
  for (let i = 0; i < newHubs.length; i++) {
    importHub(state, newHubs[i])
  }
}

export function updateNode(state, { hubId, nodeId, status }) {
  const hub = { ...state.hubs[hubId] }
  hub.nodes[nodeId].status = status
  Vue.set(state.hubs, hubId, hub)
}
