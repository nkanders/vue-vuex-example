<template>
  <q-card class="node-item">
    <router-link class="node-item-link text-black" to="#">
      <q-img src="/statics/placeholders/place-placeholder.jpg">
        <div class="absolute-bottom">
          <div class="text-subtitle2 text-center">{{ title }}</div>
        </div>
      </q-img>

      <q-card-section>
        <div class="row">
          <q-icon :name="smartNode" class="q-ma-sm" size="30px" />
          <q-icon :name="flowSensor" class="q-ma-sm" size="30px" />
          <q-icon :name="mositureSensor" class="q-ma-sm" size="30px" />
          <q-icon :name="valve" class="q-ma-sm" size="30px" />
        </div>
        <div class="text-subtitle2 text-center">
          {{ description }}
        </div>
      </q-card-section>
    </router-link>
  </q-card>
</template>

<style scoped lang="stylus">
.node-item >>> .q-icon
  width: 30px
  height: 30px
  object-fit: contain

.node-item-link
  text-decoration: none

@media (max-width $breakpoint-xs-max)
  .node-item
    width: 100%

  .node-item .node-item-link
    display: flex
</style>

<script>
export default {
  name: 'SmartNode',
  props: ['node'],
  data() {
    return {
      smartNode: `img:statics/icons/SmartNode.png`,
      flowSensor: `img:statics/icons/FlowSensor.png`,
      mositureSensor: `img:statics/icons/MoistureSensor.png`,
      valve: `img:statics/icons/Valve.png`
    }
  },
  computed: {
    title() {
      return this.node.title || ''
    },
    description() {
      return this.node.description || ''
    }
  }
}
</script>
