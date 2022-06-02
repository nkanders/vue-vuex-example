<template>
  <q-page>
    <router-view name="top" />

    <div>
      <router-view />
    </div>

    <q-footer bordered class="bg-secondary text-white">
      <router-view name="bottom" />
    </q-footer>
  </q-page>
</template>

<script>
import store from '../store'

export default {
  name: 'LocationLayout',
  data: () => ({}),
  beforeRouteEnter(to, from, next) {
    const promises = [store().dispatch('users/loadUsers'), store().dispatch('locations/loadLocations', null), store().dispatch('devices/loadDevices', {})]
    Promise.all(promises).then(resolve => {
      next()
    })
  }
}
</script>
