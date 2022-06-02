
/* eslint-disable */
/**
 * @jest-environment jsdom
 */

import { mount, createLocalVue, shallowMount } from '@vue/test-utils'
import Devices from '../../../../src/pages/Devices/Devices.vue'

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

  beforeEach(() => {
    store = new Vuex.Store({
      actions: {
        "devices/loadDevices": jest.fn(),
        "locations/loadLocations": jest.fn()
      }
    })
    wrapper = shallowMount(Devices, {
      store,
      localVue
    });
  })

  it('should be a vue component', () => {
    expect(wrapper.isVueInstance()).toBe(true)
  })

  it('has a created hook', () => {
    expect(typeof Devices.created).toBe('function')
  })
})
