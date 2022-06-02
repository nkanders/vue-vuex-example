
/* eslint-disable */
/**
 * @jest-environment jsdom
 */

import { mount, createLocalVue, shallowMount } from '@vue/test-utils'
import MCU from '../../../../../src/pages/Devices/Device/MCU.vue'

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

  localVue.use(Quasar, { components }) // , lang: langEn

  let wrapper
  let computed = {
    device() {
      return { 
        id: "103-4243942-2124",
        title: "New Device",         
        mcu_errors: [],
      }
    }
  }

  beforeEach(() => {
    wrapper = shallowMount(MCU, {
      localVue,
      computed
    });
  })

  it('should be a vue component', () => {
    expect(wrapper.isVueInstance()).toBe(true)
  })

  it('should show MCU status OK as default', () => {
    expect(wrapper.text()).toContain('MCU status is OK')
  })

  it('should not show MCU status OK when error', () => {
    let computed = { 
      device() { 
        return { mcu_errors: [ "error - 1" ]} 
      } 
    }
    wrapper = shallowMount(MCU, { localVue, computed })
    expect(wrapper.text()).not.toContain('MCU status is OK')
  })

})
