<template>
  <q-page>
    <div>
      <router-view />
    </div>
  </q-page>
</template>

<style>
</style>

<script>
import store from '../../store'

export default {
  name: 'Devices',

  data: () => ({}),

  computed: {},

  created() {},

  beforeRouteEnter(to, from, next) {
    const promises = [store().dispatch('devices/loadDevices', {}), store().dispatch('locations/loadLocations', null), store().dispatch('users/loadUsers', {})]
    Promise.all(promises).then(resolve => {
      next()
    })
  }
}
</script>
