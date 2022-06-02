/* eslint-disable */
/**
 * @jest-environment jsdom
 */

import store from '../../../../../src/store/devices'
import { api } from '../../../../../src/boot/api'

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

describe('Store Config Test', () => {
  it('has state variable ', () => {
    expect(Object.keys(store.state)).toContain('devices')
  })
})
describe('Mutations Test', () => {
  it('imports a device into state', () => {
    const state = { devices: {} }
    const device = { id: '1', device: 'new' }
    store.mutations.importDevice(state, device)
    expect(state.devices[device.id]).toBe(device)
  })

  it('import several devices', () => {
    const state = { devices: {} }
    const devices = [{ id: '1', device: 'new1' }, { id: '2', device: 'new2' }]
    store.mutations.importDevices(state, devices)
    expect(Object.keys(state.devices).length).toBe(devices.length)
  })

  it('remove device device in payload', () => {
    const state = { devices: { 1: 'new1' } }
    const deviceId = 1
    store.mutations.removeDevice(state, deviceId)
    expect(Object.keys(state.devices).length).toBe(0)
  })
})

describe('Getters Test', () => {
  it('returns all devices', () => {
    const state = { devices: { 1: 'device1' } }
    expect(store.getters.all(state).length).toBe(Object.keys(state.devices).length)
  })

  it('returns device by given id or false if not existed', () => {
    const state = { devices: { 1: 'device1' } }
    const id1 = 1
    const id2 = 2
    expect(store.getters.byId(state)(id1)).toBe(state.devices[id1])
    expect(store.getters.byId(state)(id2)).toBe(false)
  })
  it('returns device by given location id or false if not existed', () => {
    const state = { devices: { 1: { location_id: 1 } } }
    const getters = { all: [{ location_id: 1 }] }
    const locationId1 = 1
    const locationId2 = 2
    expect(store.getters.byLocationId(state, getters)(locationId1).length).toBe(1)
    expect(store.getters.byLocationId(state, getters)(locationId2).length).toBe(0)
  })
})

describe('Actions Test', () => {
  it('loadAll commits getDevicedevices of api', () => {
    api.getDevices = jest.fn(() => {
      return Promise.resolve(jest.fn())
    })
    const userId = 1
    const locationId = 1
    store.actions.loadDevices(store, { userId, locationId })
    expect(api.getDevices).toHaveBeenCalledWith(userId, locationId)
  })

  it('loadOne commits getDevicedevice api', () => {
    api.getDevice = jest.fn(() => {
      return Promise.resolve(jest.fn())
    })
    const deviceId = 1
    const userId = 1
    const locationId = 1
    store.actions.loadDevice(store, { userId, locationId, deviceId })
    expect(api.getDevice).toHaveBeenCalledWith(userId, locationId, deviceId)
  })

  it('would call patchDevice of api', async () => {
    store.commit = jest.fn()
    api.patchDevice = jest.fn(() => {
      return Promise.resolve(jest.fn())
    })
    const deviceId = 1
    const userId = 1
    const locationId = 1
    store.actions.update(store, { userId, locationId, deviceId })
    expect(api.patchDevice).toHaveBeenCalled()
    await Promise.resolve()
    expect(store.commit).toHaveBeenCalled()
  })

  it('would commit importDevice', () => {
    const device = {}
    store.commit = jest.fn()
    store.actions.importDevice(store, device)
    expect(store.commit).toHaveBeenCalled()
  })

  it('would commit importDevices', () => {
    const devices = {}
    store.commit = jest.fn()
    store.actions.importDevices(store, devices)
    expect(store.commit).toHaveBeenCalled()
  })

  it('would call putDevice of api', async () => {
    store.commit = jest.fn()
    api.putDevice = jest.fn(() => {
      return Promise.resolve(jest.fn())
    })
    const data = {}
    const userId = 1
    const locationId = 1
    store.actions.create(store, { userId, locationId, data })
    expect(api.putDevice).toHaveBeenCalledWith(userId, locationId, data)
    await Promise.resolve()
    expect(store.commit).toHaveBeenCalled()
  })

  it('would call deleteDevice of api', async () => {
    store.commit = jest.fn()
    api.deleteDevice = jest.fn(() => {
      return Promise.resolve(jest.fn())
    })
    const deviceId = 1
    const userId = 1
    const locationId = 1
    store.actions.destroy(store, { userId, locationId, deviceId })
    expect(api.deleteDevice).toHaveBeenCalledWith(userId, locationId, deviceId)
    await Promise.resolve()
    expect(store.commit).toHaveBeenCalled()
  })
})
