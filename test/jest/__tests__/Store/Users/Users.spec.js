/* eslint-disable */
/**
 * @jest-environment jsdom
 */

import store from '../../../../../src/store/users'
import { api } from '../../../../../src/boot/api'

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

describe('Store Config Test', () => {
  it('has state variable ', () => {
    expect(Object.keys(store.state)).toContain('users')
  })
})
describe('Mutations Test', () => {
  it('imports a user into state', () => {
    const state = { users: {} }
    const newUser = { id: '1', user: 'new' }
    store.mutations.importUser(state, newUser)
    expect(Object.keys(state.users).length).toBe(1)
  })

  it('imports mutiple users into state', () => {
    const state = { users: {} }
    const newUsers = [{ id: '1', user: 'new' }, { id: '2', user: 'new' }]
    store.mutations.importUsers(state, newUsers)
    expect(Object.keys(state.users).length).toBe(newUsers.length)
  })

  it('remove user from state', () => {
    const state = { users: { 1: { id: '1', user: 'new' } } }
    const userId = 1
    store.mutations.removeUser(state, userId)
    expect(Object.keys(state.users).length).toBe(0)
  })
})

describe('Getters Test', () => {
  it('returns all users', () => {
    const state = { users: { 1: { id: '1', user: 'new' } } }
    expect(store.getters.all(state).length).toBe(Object.keys(state.users).length)
  })

  it('returns user by given id or fale if not existed', () => {
    const state = { users: { 1: { id: '1', user: 'user' } } }
    const id1 = 1
    const id2 = 2
    expect(store.getters.byId(state)(id1)).toBe(state.users[id1])
    expect(store.getters.byId(state)(id2)).toBe(false)
  })
})

describe('Actions Test', () => {
  it('loadUsers commits getUsers of api', () => {
    api.getUsers = jest.fn(() => {
      return Promise.resolve(jest.fn())
    })
    store.actions.loadUsers(store)
    expect(api.getUsers).toHaveBeenCalled()
  })

  it('loadUser commits getUser api', () => {
    api.getUser = jest.fn(() => {
      return Promise.resolve(jest.fn())
    })
    const userId = 1
    store.actions.loadUser(store, { userId })
    expect(api.getUser).toHaveBeenCalledWith(userId)
  })

  it('would call patchDevice of api', async () => {
    store.commit = jest.fn()
    api.patchUser = jest.fn(() => {
      return Promise.resolve(jest.fn())
    })
    const userId = 1
    store.actions.update(store, { userId })
    expect(api.patchUser).toHaveBeenCalled()
    await Promise.resolve()
    expect(store.commit).toHaveBeenCalled()
  })

  it('would commit importUser', () => {
    const user = {}
    store.commit = jest.fn()
    store.actions.importUser(store, user)
    expect(store.commit).toHaveBeenCalled()
  })

  it('would commit importUsers', () => {
    const users = {}
    store.commit = jest.fn()
    store.actions.importUsers(store, users)
    expect(store.commit).toHaveBeenCalled()
  })

  it('would call putUser of api', async () => {
    store.commit = jest.fn()
    api.putUser = jest.fn(() => {
      return Promise.resolve(jest.fn())
    })
    const data = {}
    store.actions.create(store, { data })
    expect(api.putUser).toHaveBeenCalledWith(data)
    await Promise.resolve()
    expect(store.commit).toHaveBeenCalled()
  })

  it('would call deleteDevice of api', async () => {
    store.commit = jest.fn()
    api.deleteUser = jest.fn(() => {
      return Promise.resolve(jest.fn())
    })
    const userId = 1
    store.actions.destroy(store, { userId })
    expect(api.deleteUser).toHaveBeenCalledWith(userId)
    await Promise.resolve()
    expect(store.commit).toHaveBeenCalled()
  })
})
