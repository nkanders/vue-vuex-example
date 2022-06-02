// Configuration for your app

module.exports = function (ctx) {
  return {
    // app boot file (/src/boot)
    // --> boot files are part of "main.js"
    boot: ['axios', 'api', 'socket', 'vuelidate'],

    css: ['app.styl'],

    extras: [
      'roboto-font',
      'material-icons', // optional, you are not bound to it
      // 'ionicons-v4',
      'mdi-v3'
      // 'fontawesome-v5',
      // 'eva-icons'
    ],

    framework: {
      // all: true, // --- includes everything; for dev only!

      components: [
        'QLayout',
        'QHeader',
        'QFooter',
        'QDrawer',
        'QPageContainer',
        'QPage',
        'QToolbar',
        'QToolbarTitle',
        'QBtn',
        'QIcon',
        'QList',
        'QItem',
        'QItemSection',
        'QItemLabel',
        'QExpansionItem',
        'QSeparator',

        'QTable',
        'QTr',
        'QTd',

        'QTabs',
        'QTab',
        'QRouteTab',

        'QField',
        'QInput',
        'QSelect',
        'QToggle',
        'QOptionGroup',

        'QCard',
        'QCardSection',
        'QCardActions',
        'QAvatar',

        'QDialog',
        'QMenu',
        'QSpinner',

        'QSpace',
        'QBadge',
        'QBtnDropdown',
        'QForm',

        'QFab',
        'QFabAction',
        'QPageSticky',
        'QImg',
        'QTooltip',
        'QUploader',
        'QUploaderAddTrigger',
        'QCarousel',
        'QCarouselControl',
        'QCarouselSlide',
        'QSlider'
      ],

      directives: ['Ripple', 'ClosePopup', 'GoBack'],

      // Quasar plugins
      plugins: ['Notify'],

      // iconSet: 'ionicons-v4'
      // lang: 'de' // Quasar language

      config: {
        cordova: {
          backButtonExit: false
        }
      },

      cssAddon: true

    },

    supportIE: false,

    build: {
      env: (ctx.dev ? {
        apiUrl: JSON.stringify('https://api.dripio.com'),
        apiWsUrl: JSON.stringify('wss://api.dripio.com'),
        weatherApiUrl: JSON.stringify('https://api.openweathermap.org'),
        weatherApiKey: JSON.stringify('f0361127b5e4a2fa28976cb2c99af325')
      } : {
          apiUrl: JSON.stringify('https://api.dripio.com'),
          apiWsUrl: JSON.stringify('wss://api.dripio.com'),
          weatherApiUrl: JSON.stringify('https://api.openweathermap.org'),
          weatherApiKey: JSON.stringify('f0361127b5e4a2fa28976cb2c99af325')
        }),
      scopeHoisting: true,
      // vueRouterMode: 'history',
      // vueCompiler: true,
      // gzip: true,
      // analyze: true,
      // extractCSS: false,
      extendWebpack(cfg) {
        cfg.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /node_modules/
        })
      }
    },

    devServer: {
      // https: true,
      // port: 8080,
      open: true // opens browser window automatically
    },

    // animations: 'all', // --- includes all animations
    animations: [],

    ssr: {
      pwa: false
    },

    pwa: {
      // workboxPluginMode: 'InjectManifest',
      // workboxOptions: {}, // only for NON InjectManifest
      manifest: {
        // name: 'Quasar App',
        // short_name: 'Quasar-PWA',
        // description: 'Best PWA App in town!',
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#ffffff',
        theme_color: '#027be3',
        icons: [
          {
            src: 'statics/icons/icon-128x128.png',
            sizes: '128x128',
            type: 'image/png'
          },
          {
            src: 'statics/icons/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'statics/icons/icon-256x256.png',
            sizes: '256x256',
            type: 'image/png'
          },
          {
            src: 'statics/icons/icon-384x384.png',
            sizes: '384x384',
            type: 'image/png'
          },
          {
            src: 'statics/icons/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    },

    cordova: {
      // id: 'org.cordova.quasar.app'
      // noIosLegacyBuildFlag: true // uncomment only if you know what you are doing
    },

    electron: {
      // bundler: 'builder', // or 'packager'

      extendWebpack(cfg) {
        // do something with Electron main process Webpack cfg
        // chainWebpack also available besides this extendWebpack
      },

      packager: {
        // https://github.com/electron-userland/electron-packager/blob/master/docs/api.md#options
        // OS X / Mac App Store
        // appBundleId: '',
        // appCategoryType: '',
        // osxSign: '',
        // protocol: 'myapp://path',
        // Window only
        // win32metadata: { ... }
      },

      builder: {
        // https://www.electron.build/configuration/configuration
        // appId: 'quasar-app'
      }
    }
  }
}
