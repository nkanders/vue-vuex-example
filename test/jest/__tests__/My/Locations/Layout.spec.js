
/* eslint-disable */
/**
 * @jest-environment jsdom
 */

import { mount, createLocalVue, shallowMount } from '@vue/test-utils'
import MyLayout from '../../../../../src/layouts/Location.vue'
import VueRouter from 'vue-router'
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

describe('Layout Mount', () => {
  const localVue = createLocalVue()

  localVue.use(Vuex)
  localVue.use(VueRouter)
  localVue.use(Quasar, { components })
  let store
  let wrapper

  beforeEach(() => {
    store = new Vuex.Store()
    wrapper = shallowMount(MyLayout, {
        store,
        localVue,
        stubs: ['router-link'],
        attachToDocument: true
    });
  })

  it('should be a vue component', () => {
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

})



