/* eslint-disable */
/**
 * @jest-environment jsdom
 */

import store from '../../../../../src/store/logs'

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

describe('Store Config Test', () => {
  it('has state variable ', () => {
    expect(Object.keys(store.state)).toContain('entries')
  })
})
describe('Mutations Test', () => {
  it('imports an entry into state', () => {
    const state = { entries: [] }
    const data = { id: '1', entry: 'new' }
    store.mutations.importLogEntry(state, data)
    expect(state.entries.length).toBe(1)
  })
})

describe('Getters Test', () => {
  it('returns all entries', () => {
    const state = { entries: [{ id: '1', entry: 'new' }] }
    expect(store.getters.all(state).length).toBe(Object.keys(state.entries).length)
  })

  it('returns model by given id or fale if not existed', () => {
    const state = { entries: [{ reporterId: 1 }] }
    const getters = { all: [{ reporterId: 1 }] }
    const reporterId1 = 1
    const reporterId2 = 2
    expect(store.getters.byReporterId(state, getters)(reporterId1).length).toBe(1)
    expect(store.getters.byReporterId(state, getters)(reporterId2).length).toBe(0)
  })
})

describe('Actions Test', () => {
  it('importLogEntry commits importLogEntry mutation', () => {
    const data = {}
    store.commit = jest.fn()
    store.actions.importLogEntry(store, data)
    expect(store.commit).toHaveBeenCalled()
  })

  it('create commits importLogEntry mutation', () => {
    const data = {}
    store.commit = jest.fn()
    store.actions.importLogEntry(store, data)
    expect(store.commit).toHaveBeenCalled()
  })
})
