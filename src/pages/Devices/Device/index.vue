<template>
  <q-page padding>
    <div>
      <router-view />
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'DeviceIndex',
  props: ['locationId', 'deviceId', 'currentUserScoped'],
  data: () => ({
    editMode: false
  }),

  computed: {
    me() {
      return this.$store.getters['auth/currentUser']
    },

    log() {
      return this.$store.getters['logs/byReporterId'](this.deviceId)
    },

    device() {
      return this.$store.getters['devices/byId'](this.deviceId)
    },

    scope() {
      return `${this.currentUserScoped ? '/my' : ''}${this.locationId ? `/locations/${this.locationId}` : ''}`
    },

    isConsoleEnabled() {
      return this.hasPerm('can_edit_devices')
    }
  },

  methods: {
    hasPerm(perm) {
      return this.$store.getters['auth/hasPerm'](perm)
    }
  },

  created() {
    // let userId = this.currentUserScoped ? this.me.id : null
    // this.$store.dispatch('devices/loadDevice', {
    //   userId: userId,
    //   locationId: this.locationId,
    //   deviceId: this.deviceId
    // })
    // this.$store.dispatch('locations/loadLocations', userId)
  }
}
</script>
