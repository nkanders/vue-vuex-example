
/* eslint-disable */
/**
 * @jest-environment jsdom
 */

import { mount, createLocalVue, shallowMount } from '@vue/test-utils'
import MyLocationBottomTabsPart from '../../../../../src/pages/My/Locations/BottomTabs.vue'
import * as All from 'quasar'
import VueRouter from 'vue-router'
const { Quasar } = All

const components = Object.keys(All).reduce((object, key) => {
  const val = All[key]
  if (val && val.component && val.component.name != null) {
    object[key] = val
  }
  return object
}, {})

describe('Bottom Tabs Mount', () => {
  const localVue = createLocalVue()

  localVue.use(VueRouter)
  localVue.use(Quasar, { components })

  let wrapper
  let locationId = 1

  beforeEach(() => {
    wrapper = shallowMount(MyLocationBottomTabsPart, {
        localVue,
        propsData: {
          locationId: locationId
        },
        stubs: ['router-link']
    });
  })

  it('should be a vue component', () => {
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  it('has home route element', () => {
    expect(wrapper.contains('[name="home"]')).toBe(true);
    expect(wrapper.find('[name="home"]').props().to.path).toBe(`/my/places/${locationId}`)
  })

  it('has schedule route element', () => {
    expect(wrapper.contains('[name="schedule"]')).toBe(true);
    expect(wrapper.find('[name="schedule"]').props().to.path).toBe(`/my/places/${locationId}/schedule`)
  })

  it('has zones route element', () => {
    expect(wrapper.contains('[name="zones"]')).toBe(true);
    expect(wrapper.find('[name="zones"]').props().to.path).toBe(`/my/places/${locationId}/zones`)
  })

  it('has history route element', () => {
    expect(wrapper.contains('[name="history"]')).toBe(true);
    expect(wrapper.find('[name="history"]').props().to.path).toBe(`/my/places/${locationId}/history`)
  })

})



