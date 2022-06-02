
/* eslint-disable */
/**
 * @jest-environment jsdom
 */

import { mount, createLocalVue, shallowMount } from '@vue/test-utils'
import Dashboard from '../../../../src/pages/My/Dashboard.vue'
import auth from '../../../../src/store/auth'
import users from '../../../../src/store/users'
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

describe('Dashboard Mount', () => {
  const localVue = createLocalVue()

  localVue.use(Vuex)
  localVue.use(Quasar, { components })
  let store
  let wrapper

  beforeEach(() => {
    store = new Vuex.Store({
      modules: {
        auth: auth,
        users: users
      }
    })
    wrapper = shallowMount(Dashboard, {
      store,
      localVue,
      attachToDocument: true,
      computed: {
        locations() {
          return [{
            title: 'Des Home Location'
          }]
        }
      }
    });
  })

  it('should be a vue component', () => {
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
  it('has a card element with my-card class', () => {
    expect(wrapper.contains('.my-card')).toBe(true);
  })
  it('has a created hook', () => {
    expect(typeof Dashboard.created).toBe('function')
  })
  it('has a watch function me', () => {
    expect(typeof wrapper.vm.$options.watch.me).toBe('function')
  })
  it('has texts for my places', () => {
    expect(wrapper.text()).toContain("My Places")
  })
})



