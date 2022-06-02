
/* eslint-disable */
/**
 * @jest-environment jsdom
 */

import { mount, createLocalVue, shallowMount } from '@vue/test-utils'
import Location from '../../../../src/pages/Locations/Location.vue'
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

  localVue.use(VueRouter)
  localVue.use(Quasar, { components }) // , lang: langEn
  let wrapper
  
  beforeEach(() => {
    wrapper = shallowMount(Location, {
        localVue
    });
  })

  it('should be a vue component', () => {
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  it('has a created hook', () => {
    expect(typeof Location.created).toBe('function')
  })

})



