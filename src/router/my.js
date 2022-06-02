const props = { default: true, top: true, bottom: true }
const propsNoBottom = { default: true, top: true, bottom: false }

export default [
  {
    path: 'dashboard',
    components: {
      default: () => import('pages/My/Dashboard.vue'),
      top: () => import('layouts/Header/MyHeader.vue')
    },
    meta: {
      title: 'Welcome to Dripio!',
      rightButton: [],
      backButton: 'false'
    }
  },
  {
    path: 'my/places',
    components: {
      default: () => import('layouts/Location.vue'),
      top: () => import('layouts/LocationHeader.vue')
    },
    children: [
      // All my locations list
      {
        path: '',
        component: () => import('pages/My/Locations/LocationList.vue'),
        meta: {
          title: 'My Places',
          transitionName: '',
          rightButton: [],
          backButton: 'false'
        }
      },
      {
        path: 'add-location',
        component: () => import('components/AddLocation.vue'),
        meta: {
          title: 'Add a Place',
          rightButton: [],
          backButton: 'back',
          backButtonPath: '/my/places',
          backButtonIcon: 'mdi-close',
          backButtonTooltip: 'Back to My Places'
        }
      },
      // Single location details and share settings
      {
        path: ':locationId/details',
        props: propsNoBottom,
        components: {
          default: () => import('components/Location.vue'),
          top: () => import('pages/My/Locations/TopTabs.vue')
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
      // single location data
      {
        path: ':locationId',
        props: props,
        components: {
          default: () => import('components/Location.vue'),
          top: () => import('pages/My/Locations/TopTabs.vue'),
          bottom: () => import('pages/My/Locations/BottomTabs.vue')
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
              backButtonPath: '/my/places',
              backButtonIcon: 'mdi-arrow-left',
              backButtonTooltip: 'Back to My Places'
            }
          },
          {
            path: 'schedule',
            props: true,
            component: () => import('components/LocationTabs/Schedule.vue'),
            meta: {
              backButton: 'back',
              backButtonPath: '/my/places',
              backButtonIcon: 'mdi-arrow-left',
              backButtonTooltip: 'Back to My Places'
            }
          },
          {
            path: 'zones',
            props: true,
            component: () => import('components/LocationTabs/Zones.vue'),
            meta: {
              backButton: 'back',
              backButtonPath: '/my/places',
              backButtonIcon: 'mdi-arrow-left',
              backButtonTooltip: 'Back to My Places'
            }
          },
          {
            path: 'history',
            props: true,
            component: () => import('components/LocationTabs/History.vue'),
            meta: {
              backButton: 'back',
              backButtonPath: '/my/places',
              backButtonIcon: 'mdi-arrow-left',
              backButtonTooltip: 'Back to My Places'
            }
          }
        ]
      }
    ]
  },
  // current user settings
  {
    path: 'my/settings',
    components: {
      default: () => import('pages/My/Profile.vue'),
      top: () => import('layouts/Header/MyHeader.vue')
    },
    props: true,
    meta: {
      title: 'My Profile',
      backButton: 'false',
      backButtonPath: -1,
      backButtonIcon: 'mdi-arrow-left',
      backButtonTooltip: ''
    }
  }
]
