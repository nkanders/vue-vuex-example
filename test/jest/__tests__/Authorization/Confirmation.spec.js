
/* eslint-disable */
/**
 * @jest-environment jsdom
 */

import { mount, createLocalVue, shallowMount } from '@vue/test-utils'
import Confirmation from '../../../../src/pages/Authorization/Confirmation.vue'

import Vuex from 'vuex'
import Vuelidate from 'vuelidate'
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
  localVue.use(Vuelidate)
  localVue.use(Quasar, { components }) // , lang: langEn

  let store
  let wrapper
  let computed = {
    email() {
      return "aleksandarkaliski87@gmail.com"
    },
    token() {
      "2837-298384-23423"
    }
  }
  
  let mocks = {
    $api: {
      confirmEmail: jest.fn(() => {           
        return Promise.resolve(jest.fn());
      })
    }
  }

  beforeEach(() => {
    store = new Vuex.Store({})

    wrapper = shallowMount(Confirmation, {
      mocks,
      store,
      localVue,
      computed
    });
  })

  it('should be a vue component', () => {
    expect(wrapper.isVueInstance()).toBe(true)
  })

  it('has a created hook', () => {
    expect(typeof Confirmation.created).toBe('function')
  })

  it('should be confirmed when confirmation status is 2', () => {
    wrapper.setData({ confirmationStatus: 2 })
    expect(wrapper.text()).toContain("Confirmed")
  })

  it('should be failed when confirmation status is 1', () => {
    wrapper.setData({ confirmationStatus: 1 })
    expect(wrapper.text()).toContain("Confirmation failed")
  })

  it('should be in middle of confirmation when confirmation status is 0', () => {
    wrapper.setData({ confirmationStatus: 0 })
    expect(wrapper.text()).toContain("processing")
  })
})
