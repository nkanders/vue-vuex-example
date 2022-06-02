<template>
  <div>
    <q-input v-model="newType.title" :error="$v.newType.title.$anyError" label="Title" />
    <q-input
      v-model="newType.description"
      :error="$v.newType.description.$anyError"
      label="Description"
    />

    <div class="q-gutter-sm">
      <q-btn color="primary" icon="mdi-plus" label="Create" @click="create()" v-close-popup />
      <q-btn color="primary" icon="mdi-cancel" label="Cancel" @click="cancel()" v-close-popup />
    </div>
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'

export default {
  name: 'AddDeviceType',
  data() {
    return {
      newType: {
        title: '',
        description: ''
      }
    }
  },

  validations: {
    newType: {
      title: { required },
      description: { required }
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
        this.$store.dispatch('deviceTypes/create', { data: this.newType })
      }
    }
  },

  created() {
    // this.$store.dispatch('deviceTypes/loadAll')
  }
}
</script>
