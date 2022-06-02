
/* eslint-disable */
/**
 * @jest-environment jsdom
 */

import { mount, createLocalVue, shallowMount } from '@vue/test-utils'
import CountryDialog from '../../../../src/components/CountryDialog.vue'
import locations from '../../../../src/store/locations'

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
          locations: locations
        }       
    })
    wrapper = shallowMount(CountryDialog, {
      store,
      localVue,
    });
  })

  it('should be a vue component', () => {
    expect(wrapper.isVueInstance()).toBe(true)
  })

  it('has country selectors', () => {
    expect(wrapper.text()).toContain("Pick your country")
    expect(wrapper.text()).toContain("Frequently searched")
    expect(wrapper.text()).toContain("All countries")
  })

  it('emits event', () => {
    const country = "canada"
    wrapper.vm.CountrySelected.call(wrapper.vm, country)
    expect(wrapper.emitted().input).toBeTruthy()
  })
})
