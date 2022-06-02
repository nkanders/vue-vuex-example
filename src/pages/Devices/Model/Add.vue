<template>
  <q-page padding>
    <q-input
      v-model="newModel.title"
      :error="$v.newModel.title.$anyError"
      class="input-large q-mt-lg"
      label="model name"
    />

    <q-select
      v-model="newModel.device_type_id"
      :error="$v.newModel.device_type_id.$anyError"
      class="input-large q-mt-lg"
      label="type"
      :options="types"
      option-label="title"
      option-value="id"
      map-options
    />

    <q-input
      v-model="newModel.description"
      :error="$v.newModel.description.$anyError"
      class="input-large q-mt-lg"
      type="textarea"
      label="description"
    />

    <!-- <q-input
      v-model="newModel.version"
      :error="$v.newModel.version.$anyError"
      class="input-large q-mt-lg"
      label="Version"
    />
    <q-input
      v-model="newModel.documentation"
      :error="$v.newModel.documentation.$anyError"
      class="input-large q-mt-lg"
      label="Documentation"
    />-->

    <div class="q-mt-xl q-gutter-sm">
      <q-btn color="primary" icon="mdi-plus" label="Create" @click="create()" />
      <q-btn color="primary" icon="mdi-cancel" label="Cancel" @click="cancel()" />
    </div>
  </q-page>
</template>

<script>
import { required } from 'vuelidate/lib/validators'

export default {
  name: 'AddDeviceModel',
  data() {
    return {
      newModel: {
        title: '',
        device_type_id: '',
        description: ''
        // version: '',
        // documentation: ''
      },
      typeId: ''
    }
  },

  validations: {
    newModel: {
      title: { required },
      device_type_id: { required },
      description: { required }
      // version: { required },
      // documentation: { required }
    }
  },

  computed: {
    types() {
      return this.$store.getters['deviceTypes/all']
    }
  },

  methods: {
    cancel() {
      this.$router.push({ path: `/device-types` })
    },
    create() {
      this.$v.$touch()

      if (this.$v.$error) {
        this.$q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'fas fa-exclamation-triangle',
          message: 'Please correct the errors above and try again'
        })
      } else {
        this.newModel.device_type_id = this.newModel.device_type_id.id
        this.$store.dispatch('deviceModels/create', { data: this.newModel }).then(() => {
          this.$router.push({ path: `/device-types/${this.newModel.device_type_id}` })
        })
      }
    }
  },

  created() {
    // this.$store.dispatch('deviceTypes/loadAll')
  }
}
</script>
