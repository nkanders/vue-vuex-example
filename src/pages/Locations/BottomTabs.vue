<template>
  <q-tabs active-color="white" indicator-color="transparent" class="bg-secondary text-grey">
    <q-route-tab
      name="home"
      icon="home"
      label="Home"
      :to="{ path: `/locations/${this.locationId}` }"
    />
    <q-route-tab
      name="schedule"
      icon="mdi-calendar-month"
      label="Schedule"
      :to="{ path: `/locations/${this.locationId}/schedule` }"
    />
    <q-route-tab
      name="zones"
      icon="mdi-view-quilt"
      label="Zones"
      :to="{ path: `/locations/${this.locationId}/zones` }"
    />
    <q-route-tab
      name="history"
      icon="mdi-history"
      label="History"
      :to="{ path: `/locations/${this.locationId}/history` }"
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
