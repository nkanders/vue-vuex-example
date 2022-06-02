<template>
  <div>
    <q-img style="height: 216px" :src="background">
      <div class="absolute-bottom-left text-subtitle transparent q-ma-sm">
        <div class="text-h4 q-pb-sm">{{ addressTandem }}</div>
        <div class="text-h6 q-pb-sm text-capitalize">{{ weatherName }}</div>
        <div class="text-h2">{{ temperature }}˚F</div>
      </div>
    </q-img>
    <q-toolbar class="shadow-2 justify-center">
      <Controllers :hubs="hubs" :controller.sync="controller" />
    </q-toolbar>
    <div class="q-pa-md row items-start q-gutter-md smart-node-list">
      <SmartNode
        v-for="node in smartNodes"
        :key="node.id"
        :node="node"
        @click.native="onClickNode(node.id)"
      />
    </div>
    <SmartNodeModal :show="statusModal" @hide="onHideModal" :hubId="controller" :nodeId="nodeId" />
  </div>
</template>
<style scoped>
.smart-node-list {
  min-height: 300px;
}
</style>
<script>
import { mapGetters } from 'vuex'
import { countrySettings } from '../../helpers/countrySettings'
import Controllers from './Controllers'
import SmartNode from './SmartNode'
import SmartNodeModal from './SmartNodeModal'

export default {
  name: 'LocationDetails',
  props: ['locationId'],
  components: {
    Controllers,
    SmartNode,
    SmartNodeModal
  },
  data: () => ({
    routeTab: 'home',
    countrySettings: countrySettings(),
    weatherName: 'Clear',
    background: (() => {
      const dt = new Date()
      const hours = dt.getHours()
      if (hours >= 6 && hours < 21) {
        return `/statics/weather/default-day.jpg`
      }
      return `/statics/weather/default-night.jpg`
    })(),
    temperature: 75,
    controller: 1,
    statusModal: false,
    nodeId: null
  }),

  computed: {
    ...mapGetters({
      me: 'auth/currentUser'
    }),
    location() {
      return this.$store.getters['locations/byId'](this.locationId)
    },
    hubs() {
      return this.$store.getters['hubs/all']
    },
    smartNodes() {
      return this.$store.getters['hubs/nodesByHubId'](this.controller)
    },
    currentCountryConfig() {
      if (this.location.address) {
        return this.countrySettings[this.location.address.country] || this.countrySettings.default
      }
      return this.countrySettings.default
    },
    addressTandem() {
      if (this.location && this.location.address) {
        return this.currentCountryConfig.getTandem(this.location.address)
      }
      return ''
    },
    weather() {
      return this.$store.getters['weather/weatherById'](this.locationId)
    }
  },

  methods: {
    fetchWeather() {
      if (this.location && this.location.address) {
        this.$store.dispatch('weather/getWeather', { location: this.location, weather: this.weather }).then(() => {
          this.getWeatherInfo()
        })
      }
    },
    fetchHubs() {
      this.$store.dispatch('hubs/loadHubs', this.locationId)
    },
    getWeatherInfo() {
      if (this.weather && this.weather.weather[0]) {
        this.weatherName = this.weather.weather[0].description
      }
      if (this.weather && this.weather.main) {
        this.temperature = Math.round(this.weather.main.temp)
      }
      if (this.weather && this.weather.weather[0]) {
        let icon = 'default'
        const id = parseInt(this.weather.weather[0].id)
        const timezoneOffset = new Date().getTimezoneOffset() * 60 + this.weather.timezone
        const dt = new Date((this.weather.dt + timezoneOffset) * 1000)
        const hours = dt.getHours()
        if (id >= 200 && id < 300) {
          icon = '2xx'
        } else if (id >= 300 && id < 400) {
          icon = '3xx'
        } else if (id >= 500 && id < 600) {
          icon = '5xx'
        } else if (id >= 600 && id < 700) {
          icon = '6xx'
        } else {
          icon = id.toString()
        }
        if (hours >= 6 && hours < 21) {
          icon += '-day'
        } else {
          icon += '-night'
        }
        this.background = `/statics/weather/${icon}.jpg`
      }
      this.$forceUpdate()
    },
    onClickNode(nodeId) {
      this.statusModal = true
      this.nodeId = nodeId
    },
    onHideModal() {
      this.statusModal = false
      this.nodeId = null
    }
  },

  watch: {
    location() {
      this.fetchWeather()
    }
  },

  created() {
    this.fetchWeather()
    this.fetchHubs()
  }
}
</script>
