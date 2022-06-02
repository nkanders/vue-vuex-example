<template>
  <div v-if="value">
    <q-input
      :error="$v.value.title.$anyError"
      :value="value.title"
      @change="onChange"
      v-model.trim="value.title"
      class="input-large"
      :disable="!editMode"
      data-test="title"
      label="label"
    >
      <!-- @onchange="$emit('input', $event.target.value)"
      @change="getErr"-->
      <template v-slot:prepend>
        <q-icon color="primary" class="input-icon-large self-end q-pb-md" name="mdi-label-outline" />
      </template>
    </q-input>
    <q-input
      :value="value.id"
      v-model.trim="value.id"
      class="input-large"
      :disable="true"
      label="id"
    >
      <template v-slot:prepend>
        <q-icon
          color="primary"
          class="input-icon-large self-end q-pb-md"
          name="mdi-folder-key-network-outline"
        />
      </template>
    </q-input>

    <div class="q-pa-md">
      <div class="q-gutter-md row">
        <q-select
          v-model="type"
          :options="typesArr"
          label="type"
          @input="selectType"
          style="width: 250px"
        />
        <q-select
          v-model="model"
          :options="modelsArr"
          label="model"
          @input="selectModel"
          :disable="typeSelected"
          style="width: 250px"
        />
        <q-select
          v-model="firmwareVersion"
          :options="firmwaresArr"
          label="firmware version"
          :disable="modelSelected"
          @input="selectFirmware"
          style="width: 250px"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
export default {
  name: 'editDevice',
  props: ['value', 'editMode', 'userId'],
  model: {
    prop: 'value',
    event: 'change'
  },
  data: function() {
    return {
      title: '',
      thisTypes: [],
      thisModels: [],
      typeId: '',
      modelsArr: [],
      firmwaresArr: [],
      type: null,
      firmwareVersion: null,
      model: null,
      typeSelected: true,
      modelSelected: true
    }
  },
  computed: {
    types() {
      return this.$store.getters['deviceTypes/all']
    },
    models() {
      return this.$store.getters['deviceModels/all']
    },
    typesArr() {
      // this.thisTypes = Object.assign([], this.types)
      let typesArr = []
      this.types.forEach(t => {
        typesArr.push(t.title)
      })
      return typesArr
    }
  },
  validations: {
    value: {
      title: { required },
      id: { required },
      notes: ''
    }
  },
  methods: {
    // getTypes() {
    //   this.thisTypes = Object.assign([], this.types)
    //   if (this.typesArr.length !== 0) {
    //     for (let i = this.typesArr.length; i > 0; i--) this.typesArr.pop()
    //   }

    //   this.thisTypes.forEach(t => {
    //     this.typesArr.push(t.title)
    //   })
    // },
    getModels() {
      this.thisModels = Object.assign([], this.models)
      this.modelsArr = []
      this.thisModels.forEach(t => {
        if (this.device_type_id === t.device_type_id) {
          this.modelsArr.push(t.title)
        }
      })
    },
    getDeviceInfo() {
      return this.$store.getters['devices/byId'](this.value.id)
    },
    onChange() {
      this.$v.$touch()
      if (this.$v.value.title.$anyError || this.$v.value.id.$anyError) {
        this.$emit('input', null)
      } else {
        this.$emit('input', this.value)
      }
    },
    // getErr(event) {
    //   let err = false
    //   this.$v.$touch()
    //   if (this.$v.value.fname.$anyError || this.$v.value.lname.$anyError || this.$v.value.email.$anyError) {
    //     err = true
    //   }
    //   this.$emit('getError', err)
    // },
    selectType(type) {
      this.device_type_id = this.types.filter(t => t.title === type)[0].id
      this.getModels()
      this.typeSelected = false
    },
    selectModel(model) {
      this.device_model_id = this.models.filter(t => t.title === model)[0].id
      this.value.device_model_id = this.device_model_id
      this.$emit('change', this.value)
      this.modelSelected = false
    },
    selectFirmware(firmware) {
      this.modelSelected = false
    },
    selectTypeFromCurrModel() {
      for (let i = 0; i < this.models.length; i++) {
        if (this.models[i].id === this.value.device_model_id) {
          const currTypeId = this.models[i].device_type_id
          let candi = this.types.filter(t => t.id === currTypeId)
          if (candi.length > 0) {
            this.device_type_id = candi[0].id
            this.type = candi[0].title
            this.getModels()
          }
        }
      }
    },
    initSelect() {
      let candi = this.models.filter(m => m.id === this.value.device_model_id)
      if (candi.length > 0) {
        this.model = candi[0].title
        if (this.model) {
          this.typeSelected = false
          this.selectTypeFromCurrModel()
        }
      }
    }
  },
  watch: {
    $route(to, from) {
      return this.editMode
    }
    // ,
    // types() {
    //   return this.getTypes()
    // }
  },
  created() {
    this.$store.dispatch('deviceTypes/loadAll')
    // this.getTypes()
    this.$store.dispatch('deviceModels/loadAll')
  },
  mounted() {
    this.initSelect()
  }
}
</script>

<style>
</style>
