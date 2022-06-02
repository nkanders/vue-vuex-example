
/* eslint-disable */
/**
 * @jest-environment jsdom
 */

import { mount, createLocalVue, shallowMount } from '@vue/test-utils'
import Secure from '../../../../src/layouts/Secure.vue'
import auth from '../../../../src/store/auth'

import Vuex from 'vuex'
import VueRouter from'vue-router'
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
  let mocks = {
    $socket: {
      init: jest.fn()
    }
  }
  beforeEach(() => {
    store = new Vuex.Store({
        actions: {
          'auth/loadPermissionsList': jest.fn(),
          'auth/checkLoggedIn': jest.fn()
        }
    })
    wrapper = shallowMount(Secure, {
      mocks,
      store,
      localVue
    });
  })

  it('should be a vue component', () => {
    expect(wrapper.isVueInstance()).toBe(true)
  })

})
