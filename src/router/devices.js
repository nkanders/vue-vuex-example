export function deviceDetails() {
  return {
    path: 'devices',
    props: true,
    meta: {
      rightButton: ['device-types']
    },
    components: {
      default: () => import('pages/Devices/index.vue'),
      top: () => import('layouts/Header/DevicesHeader.vue')
      // bottom: () => import('pages/Devices/BottomTab.vue')
    },
    children: [
      {
        path: '',
        props: true,
        component: () => import('pages/Devices/Devices.vue'),
        meta: {
          title: 'SmartHubs',
          rightButton: ['device-types'],
          backButton: 'false'
        }
      },
      {
        path: ':deviceId',
        component: () => import('pages/Devices/Device/index.vue'),
        props: true,
        children: [
          {
            path: '',
            props: true,
            component: () => import('pages/Devices/Device/Device.vue'),
            meta: {
              title: 'smarthub-detail',
              rightButton: ['save-smarthub'],
              backButton: 'back',
              backButtonPath: '/devices',
              backButtonIcon: 'mdi-arrow-left',
              backButtonTooltip: 'Back to Devices'
            }
          },
          {
            path: 'console',
            props: true,
            component: () => import('pages/Devices/Device/Console.vue'),
            meta: {
              title: 'SmartHub Console',
              rightButton: [],
              backButton: 'back',
              backButtonPath: '/devices',
              backButtonIcon: 'mdi-arrow-left',
              backButtonTooltip: 'Back to Devices'
            }
          },
          {
            path: 'mcu',
            props: true,
            component: () => import('pages/Devices/Device/MCU.vue'),
            meta: {
              title: 'SmartHub Health Status (From MCU)',
              rightButton: [],
              backButton: 'back',
              backButtonPath: '/devices',
              backButtonIcon: 'mdi-arrow-left',
              backButtonTooltip: 'Back to Devices'
            }
          }
        ]
      }
    ]
  }
}

export default [
  deviceDetails(),
  {
    path: 'device-models',
    components: {
      default: () => import('pages/Devices/Models.vue'),
      top: () => import('layouts/Header/DevicesHeader.vue')
    },
    meta: {
      title: 'SmartHub Models',
      backButton: 'false',
      rightButton: []
    },
    props: { default: true }
  },
  {
    path: 'device-models/add-device-model',
    props: true,
    components: {
      default: () => import('pages/Devices/Model/Add.vue'),
      top: () => import('layouts/Header/DevicesHeader.vue')
    },
    meta: {
      title: 'New SmartHub Model',
      rightButton: [],
      backButton: 'back',
      backButtonPath: '/device-types',
      backButtonIcon: 'mdi-close',
      backButtonTooltip: 'Back to Device Models'
    }
  },
  {
    path: 'device-models/:modelId',
    props: { default: true },
    components: {
      default: () => import('pages/Devices/Model/index.vue'),
      top: () => import('layouts/Header/DevicesHeader.vue')
    },
    meta: {
      rightButton: [],
      backButton: 'back',
      backButtonIcon: 'mdi-close',
      backButtonTooltip: 'Back to Device Models'
    },
    children: [
      {
        path: '',
        props: true,
        component: () => import('pages/Devices/Model/Model.vue'),
        meta: {
          rightButton: ['save-device-model, delete-device-model'],
          backButton: 'back',
          backButtonIcon: 'mdi-close',
          backButtonTooltip: 'Back to Device Models'
        }
      },
      {
        path: 'software',
        props: true,
        component: () => import('pages/Devices/Model/ModelSoftwareList.vue'),
        meta: { title: 'SmartHub Firmware List' },
        children: [{
          path: ':softwareId',
          props: true,
          component: () => import('pages/Devices/Model/ModelSoftware.vue'),
          meta: {
            title: 'SmartHub Firmware',
            rightButton: [],
            backButton: 'back',
            backButtonPath: '/device-types',
            backButtonIcon: 'mdi-arrow-left',
            backButtonTooltip: 'Back to Device Models'
          }
        }]
      }
    ]
  },
  {
    path: 'device-types',
    components: {
      default: () => import('pages/Devices/Types.vue'),
      top: () => import('layouts/Header/DevicesHeader.vue')
      // bottom: () => import('pages/Devices/BottomTab')
    },
    props: { default: true },
    meta: {
      title: 'SmartHub Types',
      rightButton: [],
      backButton: 'back',
      backButtonPath: '/devices',
      backButtonIcon: 'mdi-arrow-left',
      backButtonTooltip: ''

    }
  },
  {
    path: 'device-types/add-device-type',
    props: true,
    components: {
      default: () => import('pages/Devices/Type/Add.vue'),
      top: () => import('layouts/Header/DevicesHeader.vue')
    },
    meta: {
      title: 'New SmartHub Type',
      rightButton: [],
      backButton: 'back',
      backButtonPath: '/device-types',
      backButtonIcon: 'mdi-arrow-left',
      backButtonTooltip: 'Back to Device Types'
    }
  },
  {
    path: 'device-types/:typeId',
    props: { default: true, typeId: true, title: true, top: true },
    components: {
      default: () => import('pages/Devices/Type/Type.vue'),
      top: () => import('layouts/Header/DevicesHeader.vue')
    },
    meta: {
      rightButton: ['type-delete'],
      backButton: 'back',
      backButtonPath: '/device-types',
      backButtonIcon: 'mdi-arrow-down',
      backButtonTooltip: 'Back to Device Types'
    }
  }
]
