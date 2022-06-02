<template>
  <div class="q-pa-none">
    <div class="terminal q-pa-md" id="device-terminal">
      <pre v-for="(entry, i) in log" :key="i">> {{ entry.data }}</pre>
    </div>

    <div class="row q-gutter-xs">
      <q-select
        class="col-xs-12 col-sm-2 col-md-2 items-end topic-select"
        v-model="topic"
        :options="topics"
        label="topic"
        emit-value
        map-options
      />
      <q-input
        class="col-xs-12 col-sm-9 col-md-9 items-end"
        v-model="mqttCommand"
        type="textarea"
        label="parameter"
        :max-height="100"
        rows="2"
        @keyup.enter="sendCommand"
      >
        <template v-slot:prepend>
          <q-icon color="secondary" name="mdi-console" />
        </template>
      </q-input>
    </div>

    <q-btn color="primary" icon="check" @click="sendCommand" class="q-mt-md" label="send" />
  </div>
</template>

<script>
export default {
  name: 'DeviceConsole',
  props: ['deviceId'],
  data: () => ({
    mqttCommand: '',
    topic: 'loopback',
    topics: [
      {
        label: 'loopback',
        value: 'loopback'
      },
      {
        label: 'ota',
        value: 'ota'
      },
      {
        label: 'cmd',
        value: 'cmd'
      },
      {
        label: 'job',
        value: 'job'
      },
      {
        label: 'root',
        value: ''
      }
    ]
  }),

  watch: {
    log() {
      this.$nextTick(() => {
        let container = this.$el.querySelector('#device-terminal')
        container.scrollTop = container.scrollHeight
      })
    }
  },

  computed: {
    me() {
      return this.$store.getters['auth/currentUser']
    },

    log() {
      return this.$store.getters['logs/byReporterId'](this.deviceId)
    },

    device() {
      return this.$store.getters['devices/byId'](this.deviceId)
    }
  },

  methods: {
    sendCommand() {
      this.$socket.send(
        JSON.stringify({
          type: 'mqttCommand',
          data: {
            deviceId: this.device.id,
            locationId: this.device.location_id,
            topic: this.topic,
            data: this.mqttCommand
          }
        })
      )

      this.$store.dispatch('logs/create', {
        reporterId: this.deviceId,
        data: {
          command: this.mqttCommand
        }
      })
      this.mqttCommand = ''
    }
  }
}
</script>

<style lang="stylus">
.terminal {
  background: #eee;
  height: 300px;
  max-height: 300px;
  overflow: auto;
  font-size: 10px;
}

.topic-select {
  .q-field__control {
    height: 100% !important;
  }
}
</style>
