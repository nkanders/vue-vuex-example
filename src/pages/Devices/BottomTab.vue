<template>
  <q-tabs indicator-color="transparent" class="text-white">
    <q-route-tab
      name="home"
      icon="home"
      label="Home"
      :to="{ path: '/devices' }"
    />
    <q-route-tab
      name="models"
      icon="mdi-share-variant"
      label="Models"
      :to="{ path: '/device-types' }"
    />
  </q-tabs>
</template>

<script>
export default {
  name: 'DevicesBottomTab',
  props: ['locationId'],
  data: () => ({})
}
</script>
