<template>
  <q-carousel
    animated
    v-model="controller"
    arrows
    infinite
    height="90px"
    control-color="primary"
    style="width: 400px"
    class="smart-hub-list"
    transition-prev="slide-right"
    transition-next="slide-left"
    @input="onChangeController"
  >
    <q-carousel-slide
      v-for="hub in getHubs"
      :key="hub.id"
      :name="hub.id"
      class="smart-hub-item column no-wrap flex-center"
    >
      <div class="flex flex-center">
        <q-icon v-if="hub.type === 'acdc'" :name="acdcImage" class="q-mr-md" size="50px" />
        <q-icon v-if="hub.type === 'dc'" :name="dcImage" class="q-mr-md" size="50px" />
        {{ hub.label }}
      </div>
    </q-carousel-slide>
    <q-carousel-slide name="add" class="column no-wrap flex-center">
      <q-btn color="primary" icon="mdi-plus" label="Connect new SmartHub" />
    </q-carousel-slide>
  </q-carousel>
</template>

<style scoped>
.smart-hub-list .smart-hub-item >>> .q-icon {
  width: 65px;
  height: 65px;
  object-fit: contain;
}
</style>

<script>
export default {
  name: 'Controllers',
  props: ['hubs', 'controller'],
  data() {
    return {
      acdcImage: `img:statics/icons/ACDC_SmartHub.png`,
      dcImage: `img:statics/icons/DC_SmartHub.png`
    }
  },
  computed: {
    getHubs() {
      return this.hubs
    }
  },
  methods: {
    onChangeController(val) {
      this.$emit('update:controller', val)
    }
  }
}
</script>
