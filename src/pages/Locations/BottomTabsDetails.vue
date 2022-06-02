<template>
  <q-tabs indicator-color="transparent" class="text-white">
    <q-route-tab
      name="home"
      icon="home"
      label="Home"
      :to="{ path: `/locations/${this.locationId}` }"
    />
    <q-route-tab
      name="share"
      icon="mdi-share-variant"
      label="Share"
      :to="{ path: `/locations/${this.locationId}/share` }"
    />
    <q-route-tab
      name="delete"
      icon="mdi-trash-can-outline"
      label="Delete"
      :to="{ path: `/locations/${this.locationId}` }"
    />
  </q-tabs>
</template>

<script>
export default {
  name: 'LocationBottomTabsPart',
  props: ['locationId'],
  data: () => ({})
}
</script>
