<template>
  <q-page class="flex bg-grey-2 q-px-md q-pt-md row items-start column justify-start">
    <q-card class="my-card">
      <router-link class="my-places-link text-black" to="/my/places">
        <q-card-section class="flex row justify-center">
          <div class="text-h6 q-mt-md">My Places</div>
        </q-card-section>
        <q-card-section class="flex row justify-center dashboard-big-stats">
          <div>{{ locations.length }}</div>
        </q-card-section>
      </router-link>
    </q-card>
  </q-page>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  data() {
    return {}
  },
  computed: {
    ...mapGetters({
      me: 'auth/currentUser'
    }),
    locations() {
      return this.$store.getters['locations/my']
    }
  },
  watch: {
    me() {
      if (this.me) this.$store.dispatch('locations/loadLocations', this.me.id)
    }
  },
  created() {
    if (this.me) this.$store.dispatch('locations/loadLocations', this.me.id)
  }
}
</script>

<style lang="stylus" scoped>
.my-card {
  width: 100%;
  max-width: 250px;
}

.dashboard-big-stats {
  font-size: 4.4em;
}

.my-places-link {
  text-decoration: none;
}

@media (max-width: $breakpoint-xs-max) {
  .my-card {
    max-width: 1000px;
  }
}
</style>
