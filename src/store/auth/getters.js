export function token(state) {
  return state.token
}

export function currentUser(state, getters, rootState, rootGetters) {
  // eslint-disable-next-line
  console.log(rootGetters)
  return rootGetters['users/byId'](state.currentUser)
}

export function permissions(state) {
  return state.permissions
}

export function hasPerm(state, getters) {
  return (perm) => getters.currentUser && getters.currentUser.perms.indexOf(perm) >= 0
}
