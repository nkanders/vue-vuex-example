
/* eslint-disable */
/**
 * @jest-environment jsdom
 */

import { mount, createLocalVue, shallowMount } from '@vue/test-utils'
import Console from '../../../../../src/pages/Devices/Device/Console.vue'
import logs from '../../../../../src/store/logs'

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

describe('Mount Quasar', () => {
  const localVue = createLocalVue()

  localVue.use(Vuex)
  localVue.use(Quasar, { components }) // , lang: langEn

  let store
  let wrapper

  beforeEach(() => {
    store = new Vuex.Store({
        modules: {
          logs: logs
        }
    })
    wrapper = shallowMount(Console, {
      store,
      localVue
    });
  })

  it('should be a vue component', () => {
    expect(wrapper.isVueInstance()).toBe(true)
  })

})
