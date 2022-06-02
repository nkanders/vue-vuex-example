
/* eslint-disable */
/**
 * @jest-environment jsdom
 */

import { mount, createLocalVue, shallowMount } from '@vue/test-utils'
import Profile from '../../../../src/pages/My/Profile.vue'
import auth from '../../../../src/store/auth'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import users from "../../../../src/store/users"
import * as All from 'quasar'

import Vuelidate from 'vuelidate'

const { Quasar } = All

const components = Object.keys(All).reduce((object, key) => {
  const val = All[key]
  if (val && val.component && val.component.name != null) {
    object[key] = val
  }
  return object
}, {})

describe('Profile Mount', () => {
  const localVue = createLocalVue()

  localVue.use(Vuex)
  localVue.use(Vuelidate)
  localVue.use(VueRouter)
  const router = new VueRouter()

  localVue.use(Quasar, { components })
  let store
  let wrapper

  beforeEach(() => {
    store = new Vuex.Store({
      actions: {
        "users/loadUsers": jest.fn(),
        "locations/loadLocations": jest.fn(),
      },
      modules: {
        auth: auth,
        users: users
      }
    })
    wrapper = shallowMount(Profile, {
      store,
      localVue,
      validations: {
        changePasswordMode: {},
        thisUser: {
          fname: {},
          lname: {},
          email: {},
        }
      },
      router,
      stubs: ['router-link'],
      attachToDocument: true
    });
  })
  it('should be a vue component', () => {
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  it('has a created hook', () => {
    expect(typeof Profile.created).toBe('function')
  })

})
