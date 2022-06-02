/* eslint-disable */
/**
 * @jest-environment jsdom
 */

import store from '../../../../../src/store/device-types'
import { api } from '../../../../../src/boot/api'

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

describe('Store Config Test', () => {
  it('has state variable ', () => {
    expect(Object.keys(store.state)).toContain('types')
  })
})
describe('Mutations Test', () => {
  it('imports a type into state', () => {
    const state = { types: {} }
    const type = { id: '1', type: 'new' }
    store.mutations.importDeviceType(state, type)
    expect(state.types[type.id]).toBe(type)
  })

  it('import several device type', () => {
    const state = { types: {} }
    const types = [{ id: '1', type: 'new1' }, { id: '2', type: 'new2' }]
    store.mutations.importDeviceTypes(state, types)
    expect(Object.keys(state.types).length).toBe(types.length)
  })

  it('remove device type in payload', () => {
    const state = { types: { 1: 'new1' } }
    const typeId = 1
    store.mutations.removeDeviceType(state, typeId)
    expect(Object.keys(state.types).length).toBe(0)
  })
})

describe('Getters Test', () => {
  it('returns all types', () => {
    const state = { types: { 1: 'type1' } }
    expect(store.getters.all(state).length).toBe(Object.keys(state.types).length)
  })

  it('returns type by given id or fale if not existed', () => {
    const state = { types: { 1: 'type1' } }
    const id1 = 1
    const id2 = 2
    expect(store.getters.byId(state)(id1)).toBe(state.types[id1])
    expect(store.getters.byId(state)(id2)).toBe(false)
  })
})

describe('Actions Test', () => {
  it('loadAll commits getDeviceTypes of api', () => {
    api.getDeviceTypes = jest.fn(() => {
      return Promise.resolve(jest.fn())
    })
    store.actions.loadAll(store)
    expect(api.getDeviceTypes).toHaveBeenCalled()
  })

  it('loadOne commits getDeviceType api', () => {
    api.getDeviceType = jest.fn(() => {
      return Promise.resolve(jest.fn())
    })
    const typeId = 1
    store.actions.loadOne(store, { typeId })
    expect(api.getDeviceType).toHaveBeenCalledWith(typeId)
  })

  it('would call patchDeviceType of api', async () => {
    store.commit = jest.fn()
    api.patchDeviceType = jest.fn(() => {
      return Promise.resolve(jest.fn())
    })
    const typeId = 1
    store.actions.update(store, { typeId })
    expect(api.patchDeviceType).toHaveBeenCalled()
    await Promise.resolve()
    expect(store.commit).toHaveBeenCalled()
  })

  it('would call putDeviceType of api', async () => {
    store.commit = jest.fn()
    api.putDeviceType = jest.fn(() => {
      return Promise.resolve(jest.fn())
    })
    const data = {}
    store.actions.create(store, { data })
    expect(api.putDeviceType).toHaveBeenCalledWith(data)
    await Promise.resolve()
    expect(store.commit).toHaveBeenCalled()
  })

  it('would call deleteDeviceType of api', async () => {
    store.commit = jest.fn()
    api.deleteDeviceType = jest.fn(() => {
      return Promise.resolve(jest.fn())
    })
    const typeId = 1
    const deviceId = 1
    store.actions.destroy(store, { typeId, deviceId })
    expect(api.deleteDeviceType).toHaveBeenCalledWith(typeId, deviceId)
    await Promise.resolve()
    expect(store.commit).toHaveBeenCalled()
  })
})
