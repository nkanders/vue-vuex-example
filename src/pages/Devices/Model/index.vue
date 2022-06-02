<template>
  <q-page>
    <div>
      <router-view />
    </div>
  </q-page>
</template>

<script>
import store from '../../../store'

export default {
  name: 'DeviceModelsIndex',
  props: ['modelId'],
  data: () => ({}),

  computed: {
    me() {
      return this.$store.getters['auth/currentUser']
    },

    model() {
      return this.$store.getters['deviceModels/byId'](this.modelId)
    }
  },

  methods: {
    hasPerm(perm) {
      return this.$store.getters['auth/hasPerm'](perm)
    }
  },

  created() {
    // this.$store.dispatch('deviceModels/loadOne', {
    //   modelId: this.modelId
    // })
  },

  beforeRouteEnter(to, from, next) {
    const promises = [store().dispatch('deviceModels/loadAll'), store().dispatch('deviceTypes/loadAll'), store().dispatch('deviceSoftware/loadAll')]
    Promise.all(promises).then(resolve => {
      next()
    })
  }
}
</script>
