
/* eslint-disable */
/**
 * @jest-environment jsdom
 */

import { mount, createLocalVue, shallowMount } from '@vue/test-utils'
import Index from '../../../../../src/pages/Devices/Device/index.vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import * as All from 'quasar'

const { Quasar } = All

const components = Object.keys(All).reduce((object, key) => {
  const val = All[key]
  if (val && val.component && val.component.name != null) {
    object[key] = val
  }
  return object
}, {})

describe('Mount Quasar', () => {
  const localVue = createLocalVue()

  localVue.use(Vuex)
  localVue.use(VueRouter)
  localVue.use(Quasar, { components }) // , lang: langEn

  let store
  let wrapper
  let computed = {
    device() {
      return { 
        id: "103-4243942-2124", 
        title: "New Device", 
        location_id: "84-920-23-4234", 
        notes: "",
        mcu_errors: [],
        status: true,
        mcu_status: true
      }
    },
    log: jest.fn(),
    isConsoleEnabled: jest.fn()
  }

  beforeEach(() => {
    store = new Vuex.Store({
        actions: {
          "devices/loadDevice": jest.fn(),
          "locations/loadLocations": jest.fn()
        }
    })
    wrapper = shallowMount(Index, {
      store,
      localVue,
      computed
    });
  })

  it('should be a vue component', () => {
    expect(wrapper.isVueInstance()).toBe(true)
  })

  it('has a created hook', () => {
    expect(typeof Index.created).toBe('function')
  })
})
