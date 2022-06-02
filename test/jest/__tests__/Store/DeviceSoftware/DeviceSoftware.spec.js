/* eslint-disable */
/**
 * @jest-environment jsdom
 */

import store from '../../../../../src/store/device-software'
import { api } from '../../../../../src/boot/api'

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

describe('Store Config Test', () => {
  it('has state variable ', () => {
    expect(Object.keys(store.state)).toContain('software')
  })
})
describe('Mutations Test', () => {
  it('imports a software into state', () => {
    const state = { software: {} }
    const software = { id: '1', software: 'new' }
    store.mutations.importSoftware(state, software)
    expect(state.software[software.id]).toBe(software)
  })

  it('import several device software', () => {
    const state = { software: {} }
    const software = [{ id: '1', software: 'new1' }, { id: '2', software: 'new2' }]
    store.mutations.importSoftwares(state, software)
    expect(Object.keys(state.software).length).toBe(software.length)
  })

  it('remove device software in payload', () => {
    const state = { software: { 1: 'new1' } }
    const softwareId = 1
    store.mutations.removeSoftware(state, softwareId)
    expect(Object.keys(state.software).length).toBe(0)
  })
})

describe('Getters Test', () => {
  it('returns all softwares', () => {
    const state = { software: { 1: 'software1' } }
    expect(store.getters.all(state).length).toBe(Object.keys(state.software).length)
  })

  it('returns software by given id or fale if not existed', () => {
    const state = { software: { 1: 'software1' } }
    const id1 = 1
    const id2 = 2
    expect(store.getters.byId(state)(id1)).toBe(state.software[id1])
    expect(store.getters.byId(state)(id2)).toBe(false)
  })
  it('returns software by given model id or false if not existed', () => {
    const state = { software: { 1: { model_id: 1 } } }
    const getters = { all: [{ model_id: 1 }] }
    const modelId1 = 1
    const modelId2 = 2
    expect(store.getters.byModelId(state, getters)(modelId1).length).toBe(1)
    expect(store.getters.byModelId(state, getters)(modelId2).length).toBe(0)
  })
})

describe('Actions Test', () => {
  it('loadAll commits getSoftwares of api', () => {
    api.getSoftwares = jest.fn(() => {
      return Promise.resolve(jest.fn())
    })
    store.actions.loadAll(store)
    expect(api.getSoftwares).toHaveBeenCalled()
  })

  it('loadOne commits getSoftware api', () => {
    api.getSoftware = jest.fn(() => {
      return Promise.resolve(jest.fn())
    })
    const softwareId = 1
    store.actions.loadOne(store, { softwareId })
    expect(api.getSoftware).toHaveBeenCalledWith(softwareId)
  })

  it('would call patchSoftware of api', async () => {
    store.commit = jest.fn()
    api.patchSoftware = jest.fn(() => {
      return Promise.resolve(jest.fn())
    })
    const softwareId = 1
    store.actions.update(store, { softwareId })
    expect(api.patchSoftware).toHaveBeenCalled()
    await Promise.resolve()
    expect(store.commit).toHaveBeenCalled()
  })

  it('would call deleteSoftware of api', async () => {
    store.commit = jest.fn()
    api.deleteSoftware = jest.fn(() => {
      return Promise.resolve(jest.fn())
    })
    const softwareId = 1
    store.actions.destroy(store, { softwareId })
    expect(api.deleteSoftware).toHaveBeenCalledWith(softwareId)
    await Promise.resolve()
    expect(store.commit).toHaveBeenCalled()
  })
})
