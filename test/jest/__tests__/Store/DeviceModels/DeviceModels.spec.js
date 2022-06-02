/* eslint-disable */
/**
 * @jest-environment jsdom
 */

import store from '../../../../../src/store/device-models'
import { api } from '../../../../../src/boot/api'

import Vue from 'vue'
import Vuex from 'vuex'
import { async } from 'q'

Vue.use(Vuex)

describe('Store Config Test', () => {
  it('has state variable ', () => {
    expect(Object.keys(store.state)).toContain('models')
  })
})
describe('Mutations Test', () => {
  it('imports a model into state', () => {
    const state = { models: {} }
    const model = { id: '1', model: 'new' }
    store.mutations.importDeviceModel(state, model)
    expect(state.models[model.id]).toBe(model)
  })

  it('import several device models', () => {
    const state = { models: {} }
    const models = [{ id: '1', model: 'new1' }, { id: '2', model: 'new2' }]
    store.mutations.importDeviceModels(state, models)
    expect(Object.keys(state.models).length).toBe(models.length)
  })

  it('remove device model in payload', () => {
    const state = { models: { 1: 'new1' } }
    const modelId = 1
    store.mutations.removeDeviceModel(state, modelId)
    expect(Object.keys(state.models).length).toBe(0)
  })
})

describe('Getters Test', () => {
  it('returns all models', () => {
    const state = { models: { 1: 'model1' } }
    expect(store.getters.all(state).length).toBe(Object.keys(state.models).length)
  })

  it('returns model by given id or fale if not existed', () => {
    const state = { models: { 1: 'model1' } }
    const id1 = 1
    const id2 = 2
    expect(store.getters.byId(state)(id1)).toBe(state.models[id1])
    expect(store.getters.byId(state)(id2)).toBe(false)
  })
})

describe('Actions Test', () => {
  it('loadAll commits getDeviceModels of api', () => {
    api.getDeviceModels = jest.fn(() => {
      return Promise.resolve(jest.fn())
    })
    store.actions.loadAll(store)
    expect(api.getDeviceModels).toHaveBeenCalled()
  })

  it('loadOne commits getDeviceModel api', () => {
    api.getDeviceModel = jest.fn(() => {
      return Promise.resolve(jest.fn())
    })
    const modelId = 1
    store.actions.loadOne(store, { modelId })
    expect(api.getDeviceModel).toHaveBeenCalledWith(modelId)
  })

  it('would call patchDeviceModel of api', async () => {
    store.commit = jest.fn()
    api.patchDeviceModel = jest.fn(() => {
      return Promise.resolve(jest.fn())
    })
    const modelId = 1
    store.actions.update(store, { modelId })
    expect(api.patchDeviceModel).toHaveBeenCalled()
    await Promise.resolve()
    expect(store.commit).toHaveBeenCalled()
  })

  it('would call putDeviceModel of api', async () => {
    store.commit = jest.fn()
    api.putDeviceModel = jest.fn(() => {
      return Promise.resolve(jest.fn())
    })
    const data = {}
    store.actions.create(store, { data })
    expect(api.putDeviceModel).toHaveBeenCalledWith(data)
    await Promise.resolve()
    expect(store.commit).toHaveBeenCalled()
  })

  it('would call deleteDeviceModel of api', async () => {
    store.commit = jest.fn()
    api.deleteDeviceModel = jest.fn(() => {
      return Promise.resolve(jest.fn())
    })
    const modelId = 1
    store.actions.destroy(store, { modelId })
    expect(api.deleteDeviceModel).toHaveBeenCalledWith(modelId)
    await Promise.resolve()
    expect(store.commit).toHaveBeenCalled()
  })
})
