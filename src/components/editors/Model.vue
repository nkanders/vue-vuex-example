<template>
  <div v-if="value">
    <q-input
      :error="$v.value.title.$anyError"
      :value="value.title"
      @change="onChange"
      v-model.trim="value.title"
      class="input-large"
      :disable="disable"
      data-test="title"
      label="title"
    >
      <!-- @onchange="$emit('input', $event.target.value)"
      @change="getErr"-->
      <template v-slot:prepend>
        <q-icon color="primary" class="input-icon-large self-end q-pb-md" name="mdi-label-outline" />
      </template>
    </q-input>
    <q-input
      :value="typeTitle"
      v-model.trim="typeTitle"
      class="input-large"
      :disable="true"
      label="type"
    >
      <template v-slot:prepend>
        <q-icon
          color="primary"
          class="input-icon-large self-end q-pb-md"
          name="mdi-folder-key-network-outline"
        />
      </template>
    </q-input>

    <q-input
      :error="$v.value.description.$anyError"
      :value="value.description"
      @change="onChange"
      v-model.trim="value.description"
      class="input-large"
      data-test="description"
      :disable="disable"
      label="description"
    >
      <!-- @onchange="$emit('input', $event.target.value)"
      @change="getErr"-->
      <template v-slot:prepend>
        <q-icon color="primary" class="input-icon-large self-end q-pb-md" name="mdi-label-outline" />
      </template>
    </q-input>
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
export default {
  name: 'editDevice',
  props: ['disable', 'value'],
  data: function() {
    return {
      title: '',
      type: '',
      description: '',
      typeTitle: ''
    }
  },
  computed: {
    types() {
      return this.$store.getters['deviceTypes/all']
    }
  },
  validations: {
    value: {
      title: { required },
      description: { required }
    }
  },
  methods: {
    // getErr(event) {
    //   let err = false
    //   this.$v.$touch()
    //   if (this.$v.value.title.$anyError || this.$v.value.description.$anyError) {
    //     err = true
    //   }
    //   this.$emit('getError', err)
    // },
    onChange() {
      this.$v.$touch()
      if (this.$v.value.title.$anyError || this.$v.value.description.$anyError) {
        this.$emit('input', null)
      } else {
        this.$emit('input', this.value)
      }
    },
    getType() {
      this.types.forEach(type => {
        if (this.value.device_type_id === type.id) {
          this.typeTitle = type.title
        }
      })
    }
  },
  created() {
    this.getType()
  }
}
</script>

<style>
</style>
