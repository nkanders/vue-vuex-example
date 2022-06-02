
/* eslint-disable */
/**
 * @jest-environment jsdom
 */

import { mount, createLocalVue, shallowMount } from '@vue/test-utils'
import Device from '../../../../../src/pages/Devices/Device/Device.vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import auth from '../../../../../src/store/auth'
import users from "../../../../../src/store/users"

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
    log() {
      return {}
    },
    device() {
      return { id: "103-4243942-2124", title: "New Device", location_id: "84-920-23-4234", notes: "" }
    }
  }

  beforeEach(() => {
    store = new Vuex.Store({
        actions: {
          "devices/loadDevice": jest.fn(),
          "locations/loadLocations": jest.fn()
        },
        modules: {
          auth: auth,
          users: users
        }
    })
    wrapper = shallowMount(Device, {
      store,
      localVue,
      computed,
      methods: {
        getLocationTitle: jest.fn()
      },
      mocks: {
        $q: {
          notify: () => {}
        }
      }
    });
  })

  it('should be a vue component', () => {
    expect(wrapper.isVueInstance()).toBe(true)
  })

  it('should have default editMode false', () => {
    expect(wrapper.vm.editMode).toBe(false)
  })

  // it('should not show action buttons as default', () => {
  //   expect(wrapper.contains('[label="save"]')).toBe(false)
  //   expect(wrapper.contains('[label="delete"]')).toBe(false)
  // })

  // it('should show action buttons when edit mode is true', () => {
  //   wrapper.setData({ editMode: true })
  //   expect(wrapper.contains('[label="save"]')).toBe(true)
  //   expect(wrapper.contains('[label="delete"]')).toBe(true)
  // })
})
