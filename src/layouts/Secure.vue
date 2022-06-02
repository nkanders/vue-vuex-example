<template>
  <q-layout view="lHh Lpr lFf">
    <q-header>
      <router-view name="top"></router-view>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" :width="250" :breakpoint="400" show-if-above elevated>
      <main-menu />
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer>
      <router-view name="bottom" />
    </q-footer>
  </q-layout>
</template>

<script>
import MainMenu from '../components/MainMenu'
import { mapGetters } from 'vuex'
import store from '../store'

export default {
  name: 'MyLayout',
  data() {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop
    }
  },
  components: { MainMenu },
  computed: {
    ...mapGetters({
      me: 'auth/currentUser'
    })
  },
  beforeRouteEnter(to, from, next) {
    let store2 = store()
    store2.dispatch('auth/checkLoggedIn').then(
      () => {
        store2.dispatch('auth/loadPermissionsList').then(() => {
          next()
        })
      },
      () => next({ path: '/login' })
    )
  },
  // beforeRouteUpdate(to, from, next) {
  //   this.$store.dispatch('auth/loadPermissionsList')
  //   next()
  // },
  mounted() {
    this.$root.$on('toggle-drawer', () => {
      this.leftDrawerOpen = !this.leftDrawerOpen
    })
    this.$socket.init()
  }
}
</script>

<style scoped lang="styl">
</style>
