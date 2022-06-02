import { api } from '../../boot/api'

export function loadUsers(store) {
  return new Promise((resolve, reject) => {
    api.getUsers().then(
      response => {
        store.commit('importUsers', response.data)
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

export function loadUser(store, { userId }) {
  return new Promise((resolve, reject) => {
    api.getUser(userId).then(
      response => {
        store.commit('importUser', response.data)
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

export function importUser(store, user) {
  store.commit('importUser', user)
}
export function importUsers(store, users) {
  store.commit('importUsers', users)
}

export function update(store, data) {
  return new Promise((resolve, reject) => {
    api.patchUser(data.id, data).then(response => {
      store.commit('importUser', data)
    }, response => { })
  })
}

export function create(store, { data }) {
  return new Promise((resolve, reject) => {
    api.putUser(data).then(response => {
      store.commit('importUser', response.data)
      resolve()
    }, reject)
  })
}

export function destroy(store, { userId }) {
  return new Promise((resolve, reject) => {
    api.deleteUser(userId).then(
      response => {
        store.commit('removeUser', userId)
        resolve()
      },
      response => { }
    )
  })
}
