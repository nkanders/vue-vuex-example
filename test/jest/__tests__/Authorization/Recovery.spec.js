
/* eslint-disable */
/**
 * @jest-environment jsdom
 */

import { mount, createLocalVue, shallowMount } from '@vue/test-utils'
import Recovery from '../../../../src/pages/Authorization/Recovery.vue'

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
    email() {
      return "aleksandarkaliski87@gmail.com"
    },
    token() {
      "2837-298384-23423"
    }
  }

  beforeEach(() => {
    store = new Vuex.Store({
      actions: {
        'auth/login': jest.fn()
      }
    })

    wrapper = shallowMount(Recovery, {
      store,
      localVue,
      computed
    });
  })

  it('should be a vue component', () => {
    expect(wrapper.isVueInstance()).toBe(true)
  })

  it('has a created hook', () => {
    expect(typeof Recovery.created).toBe('function')
  })

  it('should call submit method when clicking Reset button', () => {
    wrapper.setData({ loggedInWithToken: true })
    wrapper.setData({ isDone: false })
    const spy = spyOn(wrapper.vm, "onSubmit")
    wrapper.find('[label="Save Password"]').trigger('click')
    expect(spy).toBeCalled()
  })

  it('should show password recovery text in below case', () => {
    wrapper.setData({ loggedInWithToken: true })
    wrapper.setData({ isDone: true })
     expect(wrapper.text()).toContain("Password Recovery")
  })

  it('should show invalid token text in below case', () => {
    wrapper.setData({ loggedInWithToken: false })
    expect(wrapper.text()).toContain("Invalid token")
  })
})
