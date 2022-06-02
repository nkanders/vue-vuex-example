
/* eslint-disable */
/**
 * @jest-environment jsdom
 */

import { mount, createLocalVue, shallowMount } from '@vue/test-utils'
import LocationDetails from '../../../../src/pages/Locations/LocationDetails.vue'
import Vuex from 'vuex'
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
  localVue.use(Quasar, { components }) // , lang: langEn

  let store
  let wrapper
  let location = {
    id: "2661ef8c-1ee5-47f9-a7f9-debe77d79e9a", 
    title: "New Location - 1 ", 
    address: "West Linn", 
    users: [ "779ad35a-d1ae-402c-bbc6-3bc1b62c1152" ]
  }
  let computed = {
    location() {
      return location
    }
  }

  beforeEach(() => {
    store = new Vuex.Store({
      actions: {
        "locations/loadLocation": jest.fn()
      },
    })
    wrapper = shallowMount(LocationDetails, {
        computed,
        store,
        localVue
    });
  })

  it('should be a vue component', () => {
    expect(wrapper.isVueInstance()).toBe(true)
  })

  it('has a created hook', () => {
    expect(typeof LocationDetails.created).toBe('function')
  })

  it('should set default location as follows', () => {
    expect(wrapper.vm.location.id).toBe(location.id)
    expect(wrapper.vm.location.title).toBe(location.title)
    expect(wrapper.vm.location.address).toBe(location.address)
    expect(wrapper.vm.location.users.length).toBe(location.users.length)
  })

  it('should have default editMode false', () => {
    expect(wrapper.vm.editMode).toBe(false)
  })
  
  it('should not show action buttons as default', () => {    
    expect(wrapper.contains('[label="save"]')).toBe(false)
    expect(wrapper.contains('[label="delete"]')).toBe(false)
  })

  it('should show action buttons when edit mode is true', () => {
    wrapper.setData({ editMode: true })
    expect(wrapper.contains('[label="save"]')).toBe(true)
    expect(wrapper.contains('[label="delete"]')).toBe(true)
  })

  it('has edit Button', () => {
    expect(wrapper.find({ ref: 'editBtn' }).exists()).toBe(true)
  })
  
  it('should call editLocation method when edit button is clicked', () => {
    const spy = spyOn(wrapper.vm, "editLocation")
    wrapper.find({ ref: 'editBtn' }).trigger('click')
    expect(spy).toBeCalled()
  })

  it('should update editMode when click edit button', () => {
    const hasPerm = (perm) => { return true }
    wrapper.setMethods({ hasPerm: hasPerm })
    wrapper.find({ ref: 'editBtn' }).trigger('click')
    expect(wrapper.vm.editMode).toBe(true)
  })

})



