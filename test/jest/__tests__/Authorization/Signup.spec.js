
/* eslint-disable */
/**
 * @jest-environment jsdom
 */

import { mount, createLocalVue, shallowMount } from '@vue/test-utils'
import Signup from '../../../../src/pages/Authorization/Signup.vue'

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

    wrapper = shallowMount(Signup, {
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

  it('tests input fields', () => {
    wrapper.vm.$v.$touch()
    expect(wrapper.vm.$v.newUser.$error).toBe(true)

    wrapper.vm.newUser = { 
      email: 'aleksandarkaliski87@gmail.com',
      password: '1234566',
      fname: 'aleksandar',
      lname: 'kaliski',
      liame: 'aleksandarkaliski87@gmail.com'      
    }
    wrapper.vm.$v.newUser.fname.$touch()
    wrapper.vm.$v.newUser.lname.$touch()

    expect(wrapper.vm.$v.newUser.fname.$error).toBe(false)
    expect(wrapper.vm.$v.newUser.lname.$error).toBe(false)
  })


  it('should call submit method when click SIGN UP button', () => {
    const spy = spyOn(wrapper.vm, "onSubmit")
    wrapper.find('[label="SIGN UP"]').trigger('click')
    expect(spy).toBeCalled()
  })

})
