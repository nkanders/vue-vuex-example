
/* eslint-disable */
/**
 * @jest-environment jsdom
 */

import { mount, createLocalVue, shallowMount } from '@vue/test-utils'
import DeviceModelDetails from '../../../../../src/pages/Devices/Model/Model.vue'
import software from '../../../../../src/store/device-software'
import auth from '../../../../../src/store/auth'
import users from "../../../../../src/store/users"

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
  const router = new VueRouter()

  let store
  let wrapper
  let computed = {
    model() {
      return {
        id: '293-9f232-4af93-d98ss',
        description: "new model for test",
        device_type_id: "1f234-3s342-412-4342",
        documentation: "",
        schematics: "",
        title: "New Model - 1"
      }
    }
  }
  beforeEach(() => {
    store = new Vuex.Store({
      actions: {
        'deviceModels/loadOne': jest.fn
      },
      modules: {
        auth,
        users,
        deviceSoftware: software
      }
    })
    wrapper = shallowMount(DeviceModelDetails, {
      mocks: {
        $api: {
          $apiUrl: 'https://api.dripio.com'
        }
      },
      store,
      localVue,
      computed,
      router
    });
  })

  it('should be a vue component', () => {
    expect(wrapper.isVueInstance()).toBe(true)
  })

  it('has a created hook', () => {
    expect(typeof DeviceModelDetails.created).toBe('function')
  })

  it('has model attributes', () => {
    expect(wrapper.text()).toContain("Firmware")
    expect(wrapper.text()).toContain("Confirm deleting")
    expect(wrapper.text()).toContain("New Model - 1")
    expect(wrapper.text()).toContain("Are you sure to delete this firmware?")
    expect(wrapper.text()).toContain("New Firmware upload")
  })
})
