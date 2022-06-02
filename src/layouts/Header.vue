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
    <q-btn
      v-if="routeMeta.rightButton && routeMeta.rightButton.indexOf('my-detail') > -1"
      flat
      dense
      round
      @click="onClickDetail"
      aria-label="Detail"
    >
      <q-icon name="mdi-dots-vertical" />
    </q-btn>
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
    <q-btn
      v-if="routeMeta.rightButton && routeMeta.rightButton.indexOf('type-delete') > -1"
      flat
      dense
      round
      @click="onClickDeleteModel"
      aria-label="Detail"
    >
      <q-icon name="mdi-trash-can-outline" />
    </q-btn>
    <q-btn
      v-if="routeMeta.rightButton && routeMeta.rightButton.indexOf('device-types') > -1"
      flat
      dense
      round
      @click="onOpenType"
      aria-label="Detail"
    >
      <q-icon name="mdi-dots-vertical" />
    </q-btn>

    <q-btn
      v-if="routeMeta.rightButton && routeMeta.rightButton.indexOf('save-device-model') > -1"
      flat
      dense
      round
      @click="onSaveDeviceModel"
      aria-label="Detail"
    >
      <q-icon name="mdi-content-save" />
    </q-btn>
    <q-btn
      v-if="routeMeta.rightButton && routeMeta.rightButton.indexOf('delete-device-model') > -1"
      flat
      dense
      round
      @click="onDeleteDeviceModel"
      aria-label="Detail"
    >
      <q-icon name="mdi-trash-can-outline" />
    </q-btn>
    <q-btn
      v-if="routeMeta.rightButton && routeMeta.rightButton.indexOf('save-smarthub') > -1"
      flat
      dense
      round
      @click="onSaveSmarthub"
      aria-label="Detail"
    >
      <q-icon name="mdi-content-save" />
    </q-btn>
  </q-toolbar>
</template>

<script>
export default {
  name: 'DefaultSecureHeader',
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
    goBack() {
      if (this.routeMeta.backButtonPath === -1) {
        this.$router.go(-1)
      } else {
        this.$router.push({ path: this.routeMeta.backButtonPath })
      }
    },
    onClickDeleteModel() {
      this.$root.$emit('delete-model')
    },
    onOpenType() {
      this.$router.push({ path: '/device-types' })
      this.$root.$emit('device-types')
    },
    onSaveDeviceModel() {
      this.$root.$emit('save-device-model')
    },
    onDeleteDeviceModel() {
      this.$root.$emit('delete-device-model')
    },
    onSaveSmarthub() {
      this.$root.$emit('save-smarthub')
    },
    toggleDrawer() {
      this.$root.$emit('toggle-drawer')
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
