
/* eslint-disable */
/**
 * @jest-environment jsdom
 */

import { mount, createLocalVue, shallowMount } from '@vue/test-utils'
import Models from '../../../../src/pages/Devices/Models.vue'
import deviceModels from '../../../../src/store/device-models'

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
          "deviceModels/loadAll": jest.fn()
        },
        modules: {
          deviceModels
        }
    })
    wrapper = shallowMount(Models, {
      store,
      localVue
    });
  })

  it('should be a vue component', () => {
    expect(wrapper.isVueInstance()).toBe(true)
  })

  it('has a created hook', () => {
    expect(typeof Models.created).toBe('function')
  })

  it('should call add method when add button is clicked', () => {
    const spy = spyOn(wrapper.vm, "addDeviceModel")
    wrapper.find({ ref: 'addBtn' }).trigger('click')
    expect(spy).toBeCalled()
  })

})
