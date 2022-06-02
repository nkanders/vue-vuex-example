
/* eslint-disable */
/**
 * @jest-environment jsdom
 */

import { mount, createLocalVue, shallowMount } from '@vue/test-utils'
import ModelSoftware from '../../../../../src/pages/Devices/Model/ModelSoftware.vue'

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
    software() {
      return { 
        id: '293-9f232-4af93-d98ss',
        description: "new model for test",
        device_type_id: "1f234-3s342-412-4342",
        documentation: "",
        schematics: "",
        title: "New Model - 1"
      }
    },
    otaLink() {
      return ""
    }
  }
  beforeEach(() => {
    store = new Vuex.Store({
        actions: {
          'deviceSoftware/loadOne': jest.fn()
        }
    })
    wrapper = shallowMount(ModelSoftware, {
      store,
      localVue,
      computed
    });
  })

  it('should be a vue component', () => {
    expect(wrapper.isVueInstance()).toBe(true)
  })

  it('has a created hook', () => {
    expect(typeof ModelSoftware.created).toBe('function')
  })

  it('has attributes', () => {
    expect(wrapper.text()).toContain("model id")
    expect(wrapper.text()).toContain("version")
    expect(wrapper.text()).toContain("description")
    expect(wrapper.text()).toContain("documentation")
  })
})
