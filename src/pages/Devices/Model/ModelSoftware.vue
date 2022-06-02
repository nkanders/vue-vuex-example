<template>
  <div class="q-pa-md row">
    <div class="col">
      <h3>{{ software.id }}</h3>
      <p>model id: {{ software.model_id }}</p>
      <p>version: {{ software.version }}</p>
      <p>documentation: {{ software.documentation }}</p>
      <p>description: {{ software.description }}</p>
      <br />
      <p>
        ota link:
        <a :href="otaLink">{{ otaLink }}</a>
      </p>

      <q-input v-model="software.version" class="input-large" label="Version" />
      <q-input v-model="software.documentation" class="input-large" label="Documentation" />
      <q-input v-model="software.description" class="input-large" label="Description" />
      <br />
      <q-btn color="primary" icon="save" @click="save" label="save" />
      <q-btn color="negative" icon="delete" @click="destroy" class="on-right" label="delete" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Device',
  props: ['modelId', 'softwareId'],
  data: () => ({
    editMode: false
  }),

  computed: {
    me() {
      return this.$store.getters['auth/currentUser']
    },

    software() {
      return this.$store.getters['deviceSoftware/byId'](this.softwareId)
    },

    otaLink() {
      return `${this.$api.apiUrl}/ota/${this.modelId}/${this.softwareId}`
    }
  },

  methods: {
    hasPerm(perm) {
      return this.$store.getters['auth/hasPerm'](perm)
    },
    save() {
      this.$store.dispatch('deviceSoftware/update', {
        softwareId: this.softwareId
      })
    },
    destroy() {
      this.$store
        .dispatch('deviceSoftware/destroy', {
          softwareId: this.softwareId
        })
        .then(() => {
          this.$router.push({
            path: `/device-models/${this.modelId}/software`
          })
        })
    }
  },

  created() {
    // this.$store.dispatch('deviceSoftware/loadOne', {
    //   softwareId: this.softwareId
    // })
  }
}
</script>
