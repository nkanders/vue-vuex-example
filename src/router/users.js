export default [
  {
    path: 'users',
    components: {
      default: () => import('pages/Users/Users.vue'),
      top: () => import('layouts/Header/UsersHeader')
    },
    meta: {
      title: 'Users',
      rightButton: [],
      backButton: 'false',
      backButtonPath: -1,
      backButtonIcon: 'mdi-arrow-left',
      backButtonTooltip: ''
    }
  },
  {
    path: 'users/add-user',
    components: {
      default: () => import('pages/Users/AddUser.vue'),
      top: () => import('layouts/Header/UsersHeader')
    },
    meta: {
      title: 'Add User',
      rightButton: [],
      backButton: 'back',
      backButtonPath: -1,
      backButtonIcon: 'mdi-close',
      backButtonTooltip: ''
    }
  },
  {
    path: 'users/:userId',
    components: {
      default: () => import('pages/Users/User.vue'),
      userId: () => import('pages/Users/User.vue'),
      top: () => import('layouts/Header/UsersHeader')
    },
    props: { default: true, userId: true, top: true },
    meta: {
      title: 'User Details',
      backButton: 'back',
      backButtonPath: -1,
      backButtonIcon: 'mdi-arrow-down',
      backButtonTooltip: ''
    }
  }
]
