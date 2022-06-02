
/* eslint-disable */
/**
 * @jest-environment jsdom
 */

import { mount, createLocalVue, shallowMount } from '@vue/test-utils'
import Forgot from '../../../../src/pages/Authorization/Forgot.vue'

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
    store = new Vuex.Store({})

    wrapper = shallowMount(Forgot, {
      store,
      localVue
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

  it('tests email input field', () => {
    wrapper.vm.$v.email.$touch()
    expect(wrapper.vm.$v.email.$error).toBe(true)

    wrapper.vm.email = 'aleksandarkaliski87@gmail.com'
    wrapper.vm.$v.email.$touch()
    expect(wrapper.vm.$v.email.$error).toBe(false)
  })


  it('should call submit method when clicking Reset button', () => {
    const spy = spyOn(wrapper.vm, "onSubmit")
    wrapper.find('[label="Reset Password"]').trigger('click')
    expect(spy).toBeCalled()
  })

  it('should call submit method when isResend is true', () => {
   wrapper.setData({ isResend: true })
    const spy = spyOn(wrapper.vm, "onSubmit")
    wrapper.find('[label="Resend Email"]').trigger('click')
    expect(spy).toBeCalled()
  })

})
