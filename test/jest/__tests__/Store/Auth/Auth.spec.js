/* eslint-disable */
/**
 * @jest-environment jsdom
 */

import store from '../../../../../src/store/auth'
import { api } from '../../../../../src/boot/api'

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

describe('Store Config Test', () => {
  it('has four state variables ', () => {
    expect(Object.keys(store.state)).toContain('token')
    expect(Object.keys(store.state)).toContain('exp')
    expect(Object.keys(store.state)).toContain('permissions')
    expect(Object.keys(store.state)).toContain('currentUser')
  })
})
describe('Mutations Test', () => {
  it('login updates state with token and expiration data', () => {
    const state = { token: '', exp: {} }
    const token = 'token'
    const exp = {}
    store.mutations.login(state, { token, exp })
    expect(state.token).toBe(token)
    expect(state.exp).toMatchObject(exp)
  })

  it('logout updates state with empty string and null value', () => {
    const state = { token: 'token', exp: {} }
    store.mutations.logout(state)
    expect(state.token).toBe('')
    expect(state.exp).toBe(null)
  })

  it('setCurrentUser updates state with userData in payload', () => {
    const state = { currentUser: '' }
    const userData = { id: '1' }
    store.mutations.setCurrentUser(state, userData)
    expect(state.currentUser).toBe(userData.id)
  })

  it('setPermissions updates state with permission in payload', () => {
    const state = { permissions: '' }
    const permissions = '2'
    store.mutations.setPermissions(state, permissions)
    expect(state.permissions).toBe(permissions)
  })
})

describe('Getters Test', () => {
  it('returns token of state', () => {
    const state = { token: 'token1' }
    expect(store.getters.token(state)).toBe('token1')
  })

  it('returns currentUser of state', () => {
    const state = { currentUser: '' }
    const rootGetters = {
      'users/byId': jest.fn()
    }
    store.getters.currentUser(state, {}, {}, rootGetters)
    expect(rootGetters['users/byId']).toHaveBeenCalled()
  })

  it('returns permission of state', () => {
    const state = { permissions: 'p1' }
    expect(store.getters.permissions(state)).toBe('p1')
  })

  it('returns true if user has permissions', () => {
    const state = {}
    const perm = 'perm'
    const getters = {
      currentUser: { perms: 'perm' }
    }
    expect(store.getters.hasPerm(state, getters)(perm)).toBe(true)
  })
})

describe('Actions Test', () => {
  it('login commits login of api', () => {
    api.login = jest.fn(() => {
      return Promise.resolve(jest.fn())
    })
    const creds = {}
    store.actions.login(store, creds)
    expect(api.login).toHaveBeenCalledWith(creds)
  })

  it('logout commits logout mutation', () => {
    store.commit = jest.fn(() => {
      return Promise.resolve(jest.fn())
    })
    store.actions.logout(store)
    expect(store.commit).toHaveBeenCalledWith('logout')
  })

  it('would call getCurrentUser of api', () => {
    api.getCurrentUser = jest.fn(() => {
      return Promise.resolve(jest.fn())
    })
    store.actions.loadCurrentUser(store)
    expect(api.getCurrentUser).toHaveBeenCalled()
  })

  it('would call patchCurrentUser of api', async () => {
    store.commit = jest.fn()
    api.patchCurrentUser = jest.fn(() => {
      return Promise.resolve(jest.fn())
    })
    store.actions.updateCurrentUser(store)
    expect(api.patchCurrentUser).toHaveBeenCalled()
    await Promise.resolve()
    expect(store.commit).toHaveBeenCalled()
  })

  it('would call getPermissions of api', () => {
    api.getPermissions = jest.fn(() => {
      return Promise.resolve(jest.fn())
    })
    store.actions.loadPermissionsList(store)
    expect(api.getPermissions).toHaveBeenCalled()
  })

  it('would call checkLoggedIn of api', async () => {
    const token = 'token1'
    const exp = 'exp'
    localStorage.setItem('token', token)
    localStorage.setItem('exp', exp)

    store.commit = jest.fn()
    store.dispatch = jest.fn(() => {
      return Promise.resolve(jest.fn())
    })
    await store.actions.checkLoggedIn(store)
    expect(store.commit).toHaveBeenCalledWith('login', { token, exp })
    expect(store.dispatch).toHaveBeenCalledWith('loadCurrentUser')
  })
})
