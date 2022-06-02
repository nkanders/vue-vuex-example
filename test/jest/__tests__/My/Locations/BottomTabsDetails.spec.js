
/* eslint-disable */
/**
 * @jest-environment jsdom
 */

import { mount, createLocalVue, shallowMount } from '@vue/test-utils'
import MyLocationBottomTabsPart from '../../../../../src/pages/My/Locations/BottomTabsDetails.vue'
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

describe('Bottom Tabs Details Mount', () => {
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

  it('has share route element', () => {
    expect(wrapper.contains('[name="share"]')).toBe(true);
    expect(wrapper.find('[name="share"]').props().to.path).toBe(`/my/places/${locationId}/share`)
  })

  it('has delete route element', () => {
    expect(wrapper.contains('[name="delete"]')).toBe(true);
    expect(wrapper.find('[name="delete"]').props().to.path).toBe(`/my/places/${locationId}`)
  })


})



