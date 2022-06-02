/* eslint-disable */
/**
 * @jest-environment jsdom
 */

import store from '../../../../../src/store/weather'
import { api } from '../../../../../src/boot/api'

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

describe('Store Config Test', () => {
  it('has state variable ', () => {
    expect(Object.keys(store.state)).toContain('weather')
  })
})

describe('Mutations Test', () => {
  it('imports a device into state', () => {
    const state = { weather: {} }
    const locationId = 1
    const weather = { id: '1', data: 'new' }
    store.mutations.fetchWeather(state, { weather, locationId })
    expect(Object.keys(state.weather).length).toBe(1)
  })
})

describe('Getters Test', () => {
  it('returns weather by given id or false if not existed', () => {
    const state = { weather: { 1: { id: '1', data: 'new' } } }
    const id1 = 1
    const id2 = 2
    expect(store.getters.weatherById(state)(id1)).toBe(state.weather[id1])
    expect(store.getters.weatherById(state)(id2)).toBe(false)
  })
})

describe('Actions Test', () => {
  it('getWeather commits getWeather of api', () => {
    api.getWeather = jest.fn(() => {
      return Promise.resolve(jest.fn())
    })
    const dt = (new Date() - 10000000) / 1000
    const weather = { id: '1', dt: dt }
    const location = { id: '1', address: '' }
    store.actions.getWeather(store, { location, weather })
    expect(api.getWeather).toHaveBeenCalledWith(location.address)
  })
  it('getWeather would not be called when difference of time is less than 15 mins', () => {
    api.getWeather = jest.fn(() => {
      return Promise.resolve(jest.fn())
    })
    const dt = new Date().getTime() / 1000
    const weather = { id: '1', dt: dt }
    store.actions.getWeather(store, { location, weather })
    expect(api.getWeather).not.toHaveBeenCalled()
  })
  it('getWeather commits fetchWeather of store when promise succeeds', async () => {
    store.commit = jest.fn()
    const dt = (new Date() - 10000000) / 1000
    const weather = { id: '1', dt: dt }
    store.actions.getWeather(store, { location, weather })
    await Promise.resolve()
    expect(store.commit).toHaveBeenCalled()
  })
})
