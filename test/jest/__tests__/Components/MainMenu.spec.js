
/* eslint-disable */
/**
 * @jest-environment jsdom
 */

import { mount, createLocalVue, shallowMount } from '@vue/test-utils'
import MainMenu from '../../../../src/components/MainMenu.vue'
import auth from '../../../../src/store/auth'
import users from '../../../../src/store/users'

import Vuex from 'vuex'
import VueRouter from 'vue-router'
import * as All from 'quasar'
const { Quasar, Ripple, ClosePopup } = All

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
  localVue.use(Quasar, { components, directives: { Ripple, ClosePopup } }) // , lang: langEn

  let store
  let wrapper

  beforeEach(() => {
    store = new Vuex.Store({
        modules: {
          auth: auth,
          users: users
        }
    })
    wrapper = shallowMount(MainMenu, {
      store,
      localVue
    });
  })

  it('should be a vue component', () => {
    expect(wrapper.isVueInstance()).toBe(true)
  })

  it('has menus for dashboard, my places, sign out', () => {
    expect(wrapper.text()).toContain("Dashboard")
    expect(wrapper.text()).toContain("My Places")
    expect(wrapper.text()).toContain("Sign Out")
  })

})
