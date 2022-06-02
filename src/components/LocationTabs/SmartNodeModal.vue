<template>
  <q-dialog :value="show" @hide="onHide" persistent>
    <q-card class="q-pa-md" style="width: 450px">
      <q-card-section>
        <div class="text-h6">{{ title }}</div>
      </q-card-section>

      <q-card-section class="items-center" v-if="!nodeStatus.started && !nodeStatus.ended">
        <div class="text-subtitle2 q-mb-md">Quick watering:</div>
        <div class="flex justify-between">
          <q-badge color="white" class="text-black">
            Water until reached total of:
          </q-badge>
          <q-badge>
            {{ total }} gallons
          </q-badge>
        </div>
        <q-slider v-model="total" :min="0" :step="0.1" :max="5" />
        <div class="flex justify-between">
          <q-badge color="white" class="text-black">
            If flow sensing is off, water for:
          </q-badge>
          <q-badge>
            {{ duration }} mins
          </q-badge>
        </div>
        <q-slider v-model="duration" :min="0" :step="1" :max="60" />
        <div class="flex justify-between">
          <q-badge color="white" class="text-black">
            Cycle:
          </q-badge>
          <q-badge>
            {{ cycle }} mins
          </q-badge>
        </div>
        <q-slider v-model="cycle" :min="0" :step="1" :max="60" />
        <div class="flex justify-between">
          <q-badge color="white" class="text-black">
            Soak:
          </q-badge>
          <q-badge>
            {{ soak }} mins
          </q-badge>
        </div>
        <q-slider v-model="soak" :min="0" :step="1" :max="60" />
      </q-card-section>

      <q-card-section class="items-center" v-if="nodeStatus.started">
        <div class="text-subtitle2 q-mb-md">Quick watering:</div>
        <div class="flex justify-between">
          <div class="text-subtitle1" style="width: 150px">
            Running for:
          </div>
          <div class="text-subtitle1 text-weight-bold">
            {{ timeLeft }} sec
          </div>
        </div>
        <div class="flex justify-between">
          <div class="text-subtitle1" style="width: 150px">
            Delivered:
          </div>
          <div class="text-subtitle1 text-weight-bold">
            2.43 gallons
          </div>
        </div>
        <div class="flex justify-between">
          <div class="text-subtitle1" style="width: 150px">
            Estimated time left:
          </div>
          <div class="text-subtitle1 text-weight-bold">
            1 hour 3 min
          </div>
        </div>
        <div class="flex justify-between">
          <div class="text-subtitle1" style="width: 150px">
            Current stage:
          </div>
          <div class="text-subtitle1 text-weight-bold">
            Cycle
          </div>
        </div>
      </q-card-section>

      <q-card-section class="items-center" v-if="!nodeStatus.started && nodeStatus.ended">
        <div class="text-subtitle2 q-mb-md">Quick watering:
          <q-badge color="green">
            DONE
          </q-badge>
        </div>
        <div class="flex justify-between">
          <div class="text-subtitle1" style="width: 150px">
            Run for:
          </div>
          <div class="text-subtitle1 text-weight-bold">
            1:12:34
          </div>
        </div>
        <div class="flex justify-between">
          <div class="text-subtitle1" style="width: 150px">
            Delivered:
          </div>
          <div class="text-subtitle1 text-weight-bold">
            2.43 gallons
          </div>
        </div>
      </q-card-section>

      <q-card-actions align="center">
        <q-btn label="Close" color="primary" v-close-popup />
        <q-btn v-if="!nodeStatus.started && !nodeStatus.ended" label="Start" color="primary" @click.native="start" />
        <q-btn v-if="!nodeStatus.started && nodeStatus.ended" label="Start Over" color="primary" @click.native="startOver" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  name: 'SmartNodeModal',
  props: ['show', 'nodeId', 'hubId'],
  data: () => ({
    total: 0,
    duration: 0,
    cycle: 0,
    soak: 0,
    tick: 0
  }),
  computed: {
    smartNode() {
      return this.$store.getters['hubs/byNodeId'](this.hubId, this.nodeId)
    },
    nodeStatus() {
      return this.$store.getters['hubs/getNodeStatus'](this.hubId, this.nodeId)
    },
    title() {
      if (this.smartNode) {
        return this.smartNode.title || ''
      }
      return ''
    },
    startTime() {
      return this.nodeStatus.startTime || false
    },
    timeLeft() {
      return 30 - this.tick
    }
  },
  watch: {
    tick() {
      if (this.startTime) {
        const diff = (Date.now() - this.startTime) / 1000
        if (diff > 30) { // elapse 30 secs
          this.stop()
        }
      }
    }
  },
  methods: {
    start() {
      this.tick = 0
      this.$store.dispatch('hubs/updateNode', {
        hubId: this.hubId,
        nodeId: this.nodeId,
        status: {
          started: true,
          ended: false,
          total: this.total,
          duration: this.duration,
          cycle: this.cycle,
          soak: this.soak,
          startTime: Date.now()
        }
      })
    },
    stop() {
      this.$store.dispatch('hubs/updateNode', {
        hubId: this.hubId,
        nodeId: this.nodeId,
        status: {
          started: false,
          ended: true,
          total: this.total,
          duration: this.duration,
          cycle: this.cycle,
          soak: this.soak,
          startTime: 0
        }
      })
    },
    startOver() {
      this.$store.dispatch('hubs/updateNode', {
        hubId: this.hubId,
        nodeId: this.nodeId,
        status: {
          started: false,
          ended: false,
          total: this.total,
          duration: this.duration,
          cycle: this.cycle,
          soak: this.soak,
          startTime: 0
        }
      })
    },
    onHide() {
      this.$emit('hide')
    }
  },
  created() {
    setInterval(() => {
      this.tick++
    }, 1000)
  }
}
</script>
