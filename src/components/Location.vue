<template>
  <transition :name="transitionName">
    <router-view />
  </transition>
</template>

<style scoped>
.slide-up-leave-active,
.slide-down-enter-active {
  transition-duration: 0.5s;
  transition-property: height, opacity, transform;
  transition-timing-function: cubic-bezier(0.55, 0, 0.1, 1);
  overflow: hidden;
}

.slide-down-leave-active {
  opacity: 0;
  transform: translate(0, 3em);
}

.slide-down-enter,
.slide-up-leave-active {
  opacity: 0;
  transform: translate(0, -3em);
}
</style>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Location',
  props: ['locationId'],
  data: () => ({
    transitionName: 'slide'
  }),

  computed: {
    ...mapGetters({
      me: 'auth/currentUser'
    }),
    isAdminView() {
      const scope = this.getScope()
      return scope !== 'my'
    },
    location() {
      return this.$store.getters['locations/byId'](this.locationId)
    }
  },

  methods: {
    updateRouteMeta(m) {
      let meta = Object.assign(m, this.$route.meta)
      this.$root.$emit('update-route-meta', meta)
    },
    loadLocation() {
      // const userId = this.isAdminView ? null : this.me.id
      if (this.location) {
        this.updateRouteMeta({ title: this.location.title })
      } else {
        // this.$store
        //   .dispatch('locations/loadLocation', {
        //     userId,
        //     locationId: this.locationId
        //   })
        //   .then(() => this.updateRouteMeta({ title: this.location.title }))
        // this.$store.getters['locations/byId'](this.locationId)
        this.updateRouteMeta({ title: this.location.title })
      }
    },
    getScope() {
      const route = this.$router.currentRoute
      if (route && route.fullPath.indexOf('/my/places') > -1) {
        return 'my'
      }
      return ''
    }
  },
  watch: {
    me() {
      return this.loadLocation()
    }
  },
  created() {
    this.$router.beforeEach((to, from, next) => {
      const transFrom = from.meta.transitionName
      const transTo = to.meta.transitionName

      if (transFrom === 'slide' && transTo === '') {
        this.transitionName = 'slide-up'
      } else if (transFrom === '' && transTo === 'slide') {
        this.transitionName = 'slide-down'
      } else {
        this.transitionName = ''
      }
      next()
    })
    return this.loadLocation()
  },
  mounted() {
    this.$root.$on('my-place-header-click-detail', () => {
      this.$router.push({ path: `/my/places/${this.locationId}/details` })
    })
    this.$root.$on('location-header-click-detail', () => {
      this.$router.push({ path: `/locations/${this.locationId}/details` })
    })
  },
  updated() {
    return this.loadLocation()
  }
}
</script>
