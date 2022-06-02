
/* eslint-disable */
/**
 * @jest-environment jsdom
 */

import { mount, createLocalVue, shallowMount } from '@vue/test-utils'
import CountrySpecific from '../../../../src/components/CountrySpecific.vue'
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
  let computed = {
    location() {
      return { address: { city: 'New York', region: 'NN', province: 'NYC', postal: '1000' } }
    }
  }
  beforeEach(() => {
    store = new Vuex.Store({
        modules: {
          locations: locations
        }       
    })
    wrapper = shallowMount(CountrySpecific, {
      store,
      localVue,
      computed
    });
  })

  it('should be a vue component', () => {
    expect(wrapper.isVueInstance()).toBe(true)
  })

  it('has a created hook', () => {
    expect(typeof CountrySpecific.created).toBe('function')
  })

  it('loads vuelidate object', () => {
    expect(typeof wrapper.vm.$v).toBe("object")
  })

  it('has no error when page is loaded', () => {
    expect(wrapper.vm.$v.$error).toBe(false)
  })

  it('tests input fields set by values after location computed func called', () => {

    wrapper.vm.$v.city.$touch()
    wrapper.vm.$v.region.$touch()
    wrapper.vm.$v.province.$touch()
    wrapper.vm.$v.postal.$touch()

    expect(wrapper.vm.$v.city.$error).toBe(false)
    expect(wrapper.vm.$v.region.$error).toBe(false)
    expect(wrapper.vm.$v.province.$error).toBe(false)
    expect(wrapper.vm.$v.postal.$error).toBe(false)
  })
})
