/* eslint-disable */
/**
 * @jest-environment jsdom
 */

import { mount, createLocalVue, shallowMount } from '@vue/test-utils'
import Types from '../../../../src/pages/Devices/Types.vue'
import auth from '../../../../src/store/auth'
import users from '../../../../src/store/users'

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
        "deviceTypes/loadAll": jest.fn()
      },
      modules: {
        auth, users
      }
    })
    wrapper = shallowMount(Types, {
      store,
      localVue
    });
  })

  it('should be a vue component', () => {
    expect(wrapper.isVueInstance()).toBe(true)
  })

  it('has a created hook', () => {
    expect(typeof Types.created).toBe('function')
  })

  it('should call add method when add button is clicked', () => {
    const spy = spyOn(wrapper.vm, "addDeviceType")
    wrapper.find('#addDeviceType').trigger('click')
    expect(spy).toBeCalled()
  })
})
