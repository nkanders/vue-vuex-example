
/* eslint-disable */
/**
 * @jest-environment jsdom
 */

import { mount, createLocalVue, shallowMount } from '@vue/test-utils'
import Header from '../../../../src/layouts/Header.vue'

import Vuex from 'vuex'
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
  localVue.use(Quasar, { components }) // , lang: langEn

  let store
  let wrapper
  let mocks = {
    $route: {
      meta: {}
    }
  }
  beforeEach(() => {
    store = new Vuex.Store()
    wrapper = shallowMount(Header, {
      mocks,
      store,
      localVue
    });
  })

  it('should be a vue component', () => {
    expect(wrapper.isVueInstance()).toBe(true)
  })

  it('has a created hook', () => {
    expect(typeof Header.created).toBe('function')
  })

  it('should call goBack method when click back button', () => {
    wrapper.vm.routeMeta = { backButton: "back" }
    const spy = spyOn(wrapper.vm, "goBack")
    wrapper.find({ ref: "backBtn" }).trigger('click')
    expect(spy).toBeCalled()
  })

  it('should call toggleDrawer method when click toggler button', () => {
    const spy = spyOn(wrapper.vm, "toggleDrawer")
    wrapper.find({ ref: "toggler" }).trigger('click')
    expect(spy).toBeCalled()
  })


})
