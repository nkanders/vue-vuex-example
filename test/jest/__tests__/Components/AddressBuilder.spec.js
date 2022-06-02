
/* eslint-disable */
/**
 * @jest-environment jsdom
 */

import { mount, createLocalVue, shallowMount } from '@vue/test-utils'
import AddressBuilder from '../../../../src/components/AddressBuilder.vue'
import locations from '../../../../src/store/locations'

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
        modules: {
          locations: locations
        }       
    })
    wrapper = shallowMount(AddressBuilder, {
      store,
      localVue,
    });
  })

  it('should be a vue component', () => {
    expect(wrapper.isVueInstance()).toBe(true)
  })

  it('has a created hook', () => {
    expect(typeof AddressBuilder.created).toBe('function')
  })

  it('emits event when addressJson watch is called', () => {
    const addressJson = ""
    wrapper.vm.$options.watch.addressJson.call(wrapper.vm, addressJson)
    expect(wrapper.emitted().input).toBeTruthy()
  })

})
