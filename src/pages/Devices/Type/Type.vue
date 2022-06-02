<template>
  <div>
    <type-models :typeId="typeId"></type-models>
    <q-dialog v-model="deletePopup" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="mdi-trash-can-outline" color="primary" text-color="white" />
          <span
            v-if="hasModels"
            class="q-ml-sm"
          >Before deleting {{type.title}} make sure to delete all models under it.</span>
          <span v-else class="q-ml-sm">Confirm deleting {{type.title}}.</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
          <q-btn v-if="!hasModels" flat label="Delete" color="primary" @click="deleteType" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import DeviceModels from '../Models'
export default {
  name: 'DeviceTypeDetails',
  props: ['typeId'],
  components: { 'type-models': DeviceModels },
  data: () => ({
    deletePopup: false,
    hasModels: false,
    thisType: {}
  }),

  computed: {
    me() {
      return this.$store.getters['auth/currentUser']
    },

    type() {
      return this.$store.getters['deviceTypes/byId'](this.typeId)
    },
    models() {
      return this.$store.getters['deviceModels/all']
    }
  },

  methods: {
    getCurrentType() {
      this.thisType = Object.assign({}, this.type)
      this.updateRouteMeta({ title: this.thisType.title + ': Models' })
    },
    updateRouteMeta(m) {
      let meta = Object.assign(m, this.$route.meta)
      this.$root.$emit('update-route-meta', meta)
    },
    deleteType() {
      this.$store
        .dispatch('deviceTypes/destroy', {
          typeId: this.typeId
        })
        .then(() => {
          this.$router.push({
            path: `/device-types/`
          })
        })
    },
    findTypeModels() {
      this.models.forEach(model => {
        if (this.typeId === model.device_type_id.toString()) {
          this.hasModels = true
        }
      })
    }
  },
  watch: {
    type() {
      return this.getCurrentType()
    }
  },
  created() {
    // this.$store.dispatch('deviceTypes/loadOne', {
    //   typeId: this.typeId
    // })
    this.getCurrentType()
    this.findTypeModels()
  },
  mounted() {
    this.$root.$on('delete-model', () => {
      this.deletePopup = !this.deletePopup
    })
    this.getCurrentType()
    this.findTypeModels()
  }
}
</script>
