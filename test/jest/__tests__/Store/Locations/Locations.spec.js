/* eslint-disable */
/**
 * @jest-environment jsdom
 */

import store from '../../../../../src/store/locations'
import { api } from '../../../../../src/boot/api'

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

describe('Store Config Test', () => {
  it('has state variable ', () => {
    expect(Object.keys(store.state)).toContain('locations')
  })
})
describe('Mutations Test', () => {
  it('imports a location into state', () => {
    const state = { locations: {} }
    const location = { id: '1', location: 'new' }
    store.mutations.importLocation(state, location)
    expect(state.locations[location.id]).toBe(location)
  })

  it('import several locations', () => {
    const state = { locations: {} }
    const locations = [{ id: '1', location: 'new1' }, { id: '2', location: 'new2' }]
    store.mutations.importLocations(state, locations)
    expect(Object.keys(state.locations).length).toBe(locations.length)
  })

  it('remove location location in payload', () => {
    const state = { locations: { 1: 'new1' } }
    const locationId = 1
    store.mutations.removeLocation(state, locationId)
    expect(Object.keys(state.locations).length).toBe(0)
  })
})

describe('Getters Test', () => {
  it('returns all locations', () => {
    const state = { locations: { 1: 'location1' } }
    expect(store.getters.all(state).length).toBe(Object.keys(state.locations).length)
  })

  it('returns location by given id or false if not existed', () => {
    const state = { locations: { 1: 'location1' } }
    const id1 = 1
    const id2 = 2
    expect(store.getters.byId(state)(id1)).toBe(state.locations[id1])
    expect(store.getters.byId(state)(id2)).toBe(false)
  })
  it('returns my location or empty array if not existed', () => {
    const state1 = { locations: { 1: { users: [1, 2, 3] } } }
    const state2 = { locations: { 1: { users: [2, 3] } } }
    const rootGetters = {
      'auth/currentUser': {
        id: 1
      }
    }
    expect(store.getters.my(state1, {}, null, rootGetters).length).toBe(1)
    expect(store.getters.my(state2, {}, null, rootGetters).length).toBe(0)
  })
})

describe('Actions Test', () => {
  it('loadAll commits getLocations of api', () => {
    api.getLocations = jest.fn(() => {
      return Promise.resolve(jest.fn())
    })
    const userId = 1
    store.actions.loadLocations(store, userId)
    expect(api.getLocations).toHaveBeenCalledWith(userId)
  })

  it('loadOne commits getLocation api', () => {
    api.getLocation = jest.fn(() => {
      return Promise.resolve(jest.fn())
    })
    const userId = 1
    const locationId = 1
    store.actions.loadLocation(store, { userId, locationId })
    expect(api.getLocation).toHaveBeenCalledWith(userId, locationId)
  })

  it('would call patchLocation of api', () => {
    api.patchLocation = jest.fn(() => {
      return Promise.resolve(jest.fn())
    })
    const userId = 1
    const locationId = 1
    store.actions.update(store, { userId, locationId })
    expect(api.patchLocation).toHaveBeenCalled()
  })

  it('would call putLocation of api', async () => {
    store.commit = jest.fn()
    api.putLocation = jest.fn(() => {
      return Promise.resolve(jest.fn())
    })
    const userId = 1
    const data = {}
    store.actions.create(store, { userId, data })
    expect(api.putLocation).toHaveBeenCalledWith(userId, data)
    await Promise.resolve()
    expect(store.commit).toHaveBeenCalled()
  })

  it('would call deleteLocation of api', async () => {
    store.commit = jest.fn()
    api.deleteLocation = jest.fn(() => {
      return Promise.resolve(jest.fn())
    })
    const userId = 1
    const locationId = 1
    store.actions.destroy(store, { userId, locationId })
    expect(api.deleteLocation).toHaveBeenCalledWith(userId, locationId)
    await Promise.resolve()
    expect(store.commit).toHaveBeenCalled()
  })
})
