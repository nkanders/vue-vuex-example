/* eslint-disable */
/**
 * @jest-environment jsdom
 */

import { shallowMount, createLocalVue} from '@vue/test-utils'
import Users from '../../../../src/pages/Users/Users'
import Vuex from 'vuex'
import VueRouter from "vue-router"
import auth from '../../../../src/store/auth'
import users from "../../../../src/store/users"
import * as All from 'quasar'
// import langEn from 'quasar/lang/en-us' // change to any language you wish! => this breaks wallaby :(
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
  const router = new VueRouter()

  beforeEach(() => {
    store = new Vuex.Store({
      actions: {
        "users/loadUsers": jest.fn(),
        "locations/loadLocations": jest.fn(),
      },
      modules: {
        auth: auth,
        users: users
      }
    })
    wrapper = shallowMount(Users, {
      propsData: {},
      mocks: {},
      router,
      stubs: ['router-link'],
      methods: {},
      store,
      localVue,
      attachToDocument: true
    })
  })

  it('should be a vue component', () => {
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  it('has a created hook', () => {
    expect(typeof Users.created).toBe('function')
  })

  // it('goes to add-user page', () => {
  //   const wrapper = mount(Users, { localVue, router })
  //   wrapper.find("button").trigger("click");
  //
  //   router.push("/add-user")
  //
  //   expect(wrapper.find(AddUser).exists()).toBe(true)
  // })

})
