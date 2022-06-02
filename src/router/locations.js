const props = { default: true, top: true, bottom: true }
const propsNoBottom = { default: true, top: true, bottom: false }

export default [
  {
    path: 'locations',
    components: {
      default: () => import('layouts/Location.vue'),
      top: () => import('layouts/LocationHeader.vue')
    },
    //   meta: {
    //     title: 'Locations',
    //     backButton: 'back',
    //     backButtonPath: -1,
    //     backButtonIcon: 'mdi-arrow-left',
    //     backButtonTooltip: ''
    //   }
    // },
    // // {
    // //   path: 'locations/add-location',
    // //   components: {
    // //     default: () => import('pages/Locations/AddLocation.vue'),
    // //     top: () => import('layouts/Header.vue')
    // //   },
    // //   meta: {
    // //     title: 'Add a Location',
    // //     backButton: 'back',
    // //     backButtonPath: '/locations',
    // //     backButtonIcon: 'mdi-arrow-left',
    // //     backButtonTooltip: 'Back to Locations'
    // //   }
    // // },
    // {
    //   path: 'locations/:locationId',
    //   components: {
    //     default: () => import('pages/Locations/Location.vue'),
    //     top: () => import('layouts/Header.vue')
    //   },
    //   props: true,
    children: [
      {
        path: '',
        component: () => import('pages/Locations/Locations.vue'),
        meta: {
          title: 'Locations',
          transitionName: '',
          rightButton: [],
          backButton: 'false'
        }
      },
      {
        path: 'add-location',
        component: () => import('components/AddLocation.vue'),
        meta: {
          title: 'Add a Location',
          rightButton: [],
          backButton: 'back',
          backButtonPath: '/locations',
          backButtonIcon: 'mdi-close',
          backButtonTooltip: 'Back to Locations'
        }
      },
      {
        path: ':locationId/details',
        props: propsNoBottom,
        components: {
          default: () => import('components/Location.vue'),
          top: () => import('pages/Locations/TopTabs.vue')
        },
        children: [
          {
            path: '',
            props: true,
            component: () => import('components/LocationTabs/Details.vue'),
            meta: {
              title: 'Place Details',
              rightButton: ['my-location-delete'],
              transitionName: 'slide',
              backButton: 'back',
              backButtonPath: -1,
              backButtonIcon: 'mdi-arrow-down',
              backButtonTooltip: ''
            }
          },
          {
            path: 'share',
            props: true,
            component: () => import('components/LocationTabs/Share/Router.vue'),
            meta: {
              title: 'Shared Access',
              rightButton: [],
              backButton: 'back',
              backButtonPath: -1,
              backButtonIcon: 'mdi-arrow-left',
              backButtonTooltip: 'Back to Place Details'
            }
          }
        ]
      },
      {
        path: ':locationId',
        props: props,
        components: {
          default: () => import('components/Location.vue'),
          top: () => import('pages/Locations/TopTabs.vue'),
          bottom: () => import('pages/Locations/BottomTabs.vue')
        },
        children: [
          {
            path: '',
            props: true,
            component: () => import('components/LocationTabs/Home.vue'),
            meta: {
              transitionName: '',
              rightButton: ['location-detail'],
              backButton: 'back',
              backButtonPath: '/locations',
              backButtonIcon: 'mdi-arrow-left',
              backButtonTooltip: 'Back to Locations'
            }
          },
          {
            path: 'schedule',
            props: true,
            component: () => import('components/LocationTabs/Schedule.vue'),
            meta: {
              backButton: 'back',
              backButtonPath: '/locations',
              backButtonIcon: 'mdi-arrow-left',
              backButtonTooltip: 'Back to Locations'
            }
          },
          {
            path: 'zones',
            props: true,
            component: () => import('components/LocationTabs/Zones.vue'),
            meta: {
              backButton: 'back',
              backButtonPath: '/locations',
              backButtonIcon: 'mdi-arrow-left',
              backButtonTooltip: 'Back to Locations'
            }
          },
          {
            path: 'history',
            props: true,
            component: () => import('components/LocationTabs/History.vue'),
            meta: {
              backButton: 'back',
              backButtonPath: '/locations',
              backButtonIcon: 'mdi-arrow-left',
              backButtonTooltip: 'Back to Locations'
            }
          }
        ]
      }
    ]
  }
]
