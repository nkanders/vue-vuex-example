<template>
  <div class="row flex-center">
    <div class="col-sm-auto col-xs-12">
      <q-btn
        class="q-pa-xs custom-flag-btn"
        :loading="loading"
        push
        text-color="primary"
        @click="SimulateDelay()"
      >
        <div class="q-mx-sm custom-flag">
          <country-flag :country="this.selectCountry" size="normal" />
        </div>
      </q-btn>
    </div>
    <country-specific
      :country="selectCountry"
      :location-id="locationId"
      v-model="addressJson"
      class="col-sm col-xs-12"
    />

    <q-dialog v-model="showDialog" full-height>
      <country-dialog v-model="selectCountry" />
    </q-dialog>
  </div>
</template>

<script>
import countryDialog from './CountryDialog'
import countryFlag from 'vue-country-flag'
import countrySpecific from './CountrySpecific'

export default {
  props: ['locationId'],
  data() {
    return {
      showDialog: false,
      selectCountry: 'us',
      loading: false,
      addressJson: ''
    }
  },
  components: {
    countryFlag,
    'country-dialog': countryDialog,
    'country-specific': countrySpecific
  },
  computed: {
    location() {
      return this.$store.getters['locations/byId'](this.locationId)
    }
  },
  watch: {
    addressJson() {
      this.$emit('input', this.addressJson)
    },
    location() {
      if (this.location) this.selectCountry = this.location.address.country
    }
  },

  methods: {
    CountrySelected(country) {
      this.selectCountry = country
    },
    SimulateDelay() {
      this.loading = true
      // simulate a delay
      setTimeout(() => {
        // we're done, we reset loading state
        this.loading = false
      }, 1000)
      this.showDialog = true
    }
  },
  created() {
    if (this.location.address) {
      this.selectCountry = this.location.address.country
    }
  }
}
</script>

<style lang="styl">
.custom-flag-btn {
  overflow: hidden;
}

.custom-flag-btn .custom-flag {
  height: 40px;
}

.custom-flag-btn .custom-flag .flag {
  margin-top: -10px;
}
</style>
