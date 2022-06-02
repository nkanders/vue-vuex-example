
/* eslint-disable */
/**
 * @jest-environment jsdom
 */

import { mount, createLocalVue, shallowMount } from '@vue/test-utils'
import ModelSoftwareList from '../../../../../src/pages/Devices/Model/ModelSoftwareList.vue'

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
  let mocks = {
      $api: {
        apiUrl: 'some/endpoint'
      },
      modelId: 1
  }
  let computed = {
    software() {
      return [{ 
        id: '293-9f232-4af93-d98ss',
        description: "new model for test",
        version: "1f234-3s342-412-4342",
        documentation: "",        
        title: "New Model - 1"
      }]
    }
  }
  beforeEach(() => {
    store = new Vuex.Store({
        actions: {
          'deviceSoftware/loadAll': jest.fn()
        }
    })    
    wrapper = shallowMount(ModelSoftwareList, {
      store,
      localVue,
      mocks,
      computed
    });
  })

  it('should be a vue component', () => {
    expect(wrapper.isVueInstance()).toBe(true)
  })

  it('has a created hook', () => {
    expect(typeof ModelSoftwareList.created).toBe('function')
  })


})
