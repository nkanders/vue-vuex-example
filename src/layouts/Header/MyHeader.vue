<template>
  <q-toolbar class="shadow-2 bg-primary">
    <q-btn
      v-if="routeMeta.backButton !== 'back'"
      flat
      dense
      round
      @click.native="toggleDrawer"
      aria-label="Menu"
      ref="toggler"
    >
      <q-icon name="menu" />
    </q-btn>
    <q-btn
      v-if="routeMeta.backButton === 'back'"
      flat
      round
      dense
      @click.native="goBack()"
      :icon="routeMeta.backButtonIcon"
      ref="backBtn"
    >
      <q-tooltip
        v-if="routeMeta.backButtonTooltip"
        content-class="bg-indigo-3"
        content-style="font-size: 16px"
        :offset="[10, 10]"
      >{{ routeMeta.backButtonTooltip }}</q-tooltip>
    </q-btn>
    <q-toolbar-title>{{ routeMeta.title }}</q-toolbar-title>
    <!-- ///////////////////////////////////////////////// -->
    <q-btn
      v-if="routeMeta.rightButton && routeMeta.rightButton.indexOf('my-location-delete') > -1"
      flat
      dense
      round
      @click="onClickDelete"
      aria-label="Detail"
    >
      <q-icon name="mdi-trash-can-outline" />
    </q-btn>
  </q-toolbar>
</template>

<script>
export default {
  name: 'MyHeader',
  data() {
    return {
      deleteType: false,
      routeMeta: {
        rightButton: '',
        backButtonTooltip: '',
        backButtonPath: '',
        backButtonIcon: '',
        backButton: '',
        title: '',
        delete: ''
      }
    }
  },
  methods: {
    toggleDrawer() {
      this.$root.$emit('toggle-drawer')
    },
    goBack() {
      if (this.routeMeta.backButtonPath === -1) {
        this.$router.go(-1)
      } else {
        this.$router.push({ path: this.routeMeta.backButtonPath })
      }
    },
    updateRouteMeta(meta) {
      Object.keys(meta).forEach(el => {
        if (meta[el]) this.routeMeta[el] = meta[el]
      })
      if (this.routeMeta['rightButton'][0]) {
        const metaArray = this.routeMeta['rightButton'][0].split(',')
        for (let i = 0; i < metaArray.length; i++) {
          metaArray[i] = metaArray[i].trim()
        }
        this.routeMeta['rightButton'] = metaArray
      }
    }
  },
  watch: {
    '$route.meta': function() {
      this.updateRouteMeta(this.$route.meta)
    }
  },
  created() {
    this.updateRouteMeta(this.$route.meta)
    this.$root.$on('update-route-meta', meta => this.updateRouteMeta(meta))
  }
}
</script>
