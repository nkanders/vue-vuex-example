/* eslint-disable */
/**
 * @jest-environment jsdom
 */

import { mount, createLocalVue, shallowMount } from '@vue/test-utils'
import Locations from '../../../../src/pages/Locations/Locations.vue'
import Vue from 'vue'
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

  let component = Vue.component('testComponent', {
    template: '<q-layout><q-page-container><location-page></location-page></q-page-container></q-layout>',
    components: {
      'q-layout': All.QLayout,
      'q-page-container': All.QPageContainer,
      'location-page': Locations
    },
  })
  beforeEach(() => {
    store = new Vuex.Store({
        actions: {
          "users/loadUsers": jest.fn(),
          "locations/loadLocations": jest.fn()
        }
    })
    wrapper = mount(component, {
        store,
        localVue,
    });
  })

  it('should be a vue component', () => {
    expect(wrapper.isVueInstance()).toBeTruthy()
  })


  it('not has a title element with q-table__title class', () => {
      expect(wrapper.contains('.q-table__title')).toBe(false);
  })

  it('has a table element with q-table__container class', () => {
      expect(wrapper.contains('.q-table__container')).toBe(true);
  })

  it('has a table header element with q-table__top class', () => {
      expect(wrapper.contains('.q-table__top')).toBe(true);
  })

  it('has a pagination element with q-table__bottom class', () => {
      expect(wrapper.contains('.q-table__bottom')).toBe(true);
  })

  it('has a function for setting dynamic table height', () => {
    wrapper = shallowMount(Locations, { store, localVue })
    expect(typeof wrapper.vm.setTableHeight).toBe('function')
  })

  it('calls setHeight when watcher detects change on locations data', () => {
    wrapper = shallowMount(Locations, { store, localVue })
    const spy = spyOn(wrapper.vm, "setTableHeight")
    wrapper.vm.$options.watch.locations.call(wrapper.vm, wrapper.locations);
    expect(spy).toBeCalled()
  })
})



