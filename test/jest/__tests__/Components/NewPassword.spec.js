
/* eslint-disable */
/**
 * @jest-environment jsdom
 */

import { mount, createLocalVue, shallowMount } from '@vue/test-utils'
import NewPassword from '../../../../src/components/NewPassword.vue'
import locations from '../../../../src/store/locations'

import Vuex from 'vuex'
import VueRouter from 'vue-router'
import Vuelidate from 'vuelidate'
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
  localVue.use(Vuelidate)
  localVue.use(Quasar, { components, directives: { Ripple, ClosePopup } }) // , lang: langEn

  let store
  let wrapper

  beforeEach(() => {
    store = new Vuex.Store({
        modules: {
          locations: locations
        }       
    })
    wrapper = shallowMount(NewPassword, {
      store,
      localVue,
    });
  })

  it('should be a vue component', () => {
    expect(wrapper.isVueInstance()).toBe(true)
  })

  it('loads vuelidate object', () => {
    expect(typeof wrapper.vm.$v).toBe("object")
  })

  it('has no error when page is loaded', () => {
    expect(wrapper.vm.$v.$error).toBe(false)
  })

  it('tests default input fields', () => {
    wrapper.vm.$v.password.$touch()
    wrapper.vm.$v.checkPassword.$touch()
    expect(wrapper.vm.$v.password.$error).toBe(true)
    expect(wrapper.vm.$v.checkPassword.$error).toBe(true)
  })
  it('tests after setting password', () => {
    wrapper.setData({ password: '123456', checkPassword: '123456' })
    wrapper.vm.$v.password.$touch()
    wrapper.vm.$v.checkPassword.$touch()
    expect(wrapper.vm.$v.password.$error).toBe(false)
    expect(wrapper.vm.$v.checkPassword.$error).toBe(false)
  })

})
