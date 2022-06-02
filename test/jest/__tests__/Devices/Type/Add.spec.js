
/* eslint-disable */
/**
 * @jest-environment jsdom
 */

import { mount, createLocalVue, shallowMount } from '@vue/test-utils'
import AddDeviceType from '../../../../../src/pages/Devices/Type/Add.vue'

import Vuex from 'vuex'
import Vuelidate from 'vuelidate'

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
  localVue.use(Vuelidate)
  localVue.use(Quasar, { components }) // , lang: langEn

  let store
  let wrapper

  beforeEach(() => {
    store = new Vuex.Store({
        actions: {
          'deviceTypes/loadAll': jest.fn
        }
    })
    wrapper = shallowMount(AddDeviceType, {
      store,
      localVue
    });
  })

  it('should be a vue component', () => {
    expect(wrapper.isVueInstance()).toBe(true)
  })

  it('has a created hook', () => {
    expect(typeof AddDeviceType.created).toBe('function')
  })
})
