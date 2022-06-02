
/* eslint-disable */
/**
 * @jest-environment jsdom
 */

import { mount, createLocalVue, shallowMount } from '@vue/test-utils'
import Login from '../../../../src/pages/Authorization/Login.vue'

import Vuex from 'vuex'
import Vuelidate from 'vuelidate'
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
  localVue.use(Vuelidate)
  localVue.use(Quasar, { components }) // , lang: langEn

  let store
  let wrapper

  beforeEach(() => {
    store = new Vuex.Store()
    
    wrapper = shallowMount(Login, {
      store,
      localVue
    });
  })

  it('should be a vue component', () => {
    expect(wrapper.isVueInstance()).toBe(true)
  })

  it('should has email, password fields, submit and signup buttons, remember me checkbox', () => {
    expect(wrapper.contains('[label="email"]')).toBe(true)
    expect(wrapper.contains('[label="password"]')).toBe(true)
    expect(wrapper.contains('[label="Login"]')).toBe(true)
    expect(wrapper.text()).toContain("sign up")
    expect(wrapper.text()).toContain("forgot password")
  })

  it('loads vuelidate object', () => {
    expect(typeof wrapper.vm.$v).toBe("object")
  })

  it('has no error when page is loaded', () => {
    expect(wrapper.vm.$v.$error).toBe(false)
  })

  it('tests email input field', () => {
    wrapper.vm.$v.email.$touch()
    expect(wrapper.vm.$v.email.$error).toBe(true)
    wrapper.vm.email = "aleksandarkaliski87@gmail.com"
    wrapper.vm.$v.email.$touch()
    expect(wrapper.vm.$v.email.$error).toBe(false)
  })

  it('tests email password field', () => {
    wrapper.vm.$v.password.$touch()
    expect(wrapper.vm.$v.password.$error).toBe(true)
    wrapper.vm.password = "123456"
    wrapper.vm.$v.password.$touch()
    expect(wrapper.vm.$v.password.$error).toBe(false)
  })

  it('should call submit method when click Login button', () => {
    const spy = spyOn(wrapper.vm, "onSubmit")
    wrapper.find('[label="Login"]').trigger('click')
    expect(spy).toBeCalled()
  })

})
