export function all(state) {
  return Object.values(state.hubs)
}

export function byLocationId(state) {
  return locationId => state.hubs[locationId]
}

export function byHubId(state) {
  return hubId => Object.values(state.hubs[hubId] || {})
}

export function nodesByHubId(state) {
  return (hubId) => {
    if (state.hubs[hubId]) {
      return Object.values(state.hubs[hubId].nodes || {})
    }
    return []
  }
}

export function byNodeId(state) {
  return (hubId, nodeId) => {
    if (state.hubs[hubId]) {
      return state.hubs[hubId].nodes[nodeId]
    }
    return {}
  }
}

export function getNodeStatus(state) {
  return (hubId, nodeId) => {
    if (state.hubs[hubId] && state.hubs[hubId].nodes[nodeId]) {
      return state.hubs[hubId].nodes[nodeId].status || {}
    }
    return {}
  }
}
