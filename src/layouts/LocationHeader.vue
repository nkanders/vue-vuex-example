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
      @click.native="onClickMyDetail"
      aria-label="Detail"
      ref="myDetail"
    >
      <q-icon name="mdi-dots-vertical" />
    </q-btn>
    <q-btn
      v-if="routeMeta.rightButton && routeMeta.rightButton.indexOf('location-detail') > -1"
      flat
      dense
      round
      @click.native="onClickLocationDetail"
      aria-label="Detail"
      ref="locationDetail"
    >
      <q-icon name="mdi-dots-vertical" />
    </q-btn>
    <q-btn
      v-if="routeMeta.rightButton && routeMeta.rightButton.indexOf('my-location-delete') > -1"
      flat
      dense
      round
      @click.native="onClickDelete"
      aria-label="Detail"
      ref="locationDelete"
    >
      <q-icon name="mdi-trash-can-outline" />
    </q-btn>
  </q-toolbar>
</template>

<script>
export default {
  name: 'LocationHeader',
  data() {
    return {
      routeMeta: {
        backButtonTooltip: '',
        backButtonPath: '',
        backButtonIcon: '',
        backButton: '',
        title: ''
      }
    }
  },
  methods: {
    goBack() {
      if (this.routeMeta.backButtonPath === -1) {
        // this.$router.go(-1)
        const temp = this.$route.fullPath.split('/')
        temp.pop()
        if (temp.length > 0) {
          this.$router.push({ path: temp.join('/') })
        } else {
          this.$router.push({ path: '/' })
        }
      } else {
        this.$router.push({ path: this.routeMeta.backButtonPath })
      }
    },
    toggleDrawer() {
      this.$root.$emit('toggle-drawer')
    },
    onClickMyDetail() {
      this.$root.$emit('my-place-header-click-detail')
    },
    onClickLocationDetail() {
      this.$root.$emit('location-header-click-detail')
    },
    onClickDelete() {
      this.$root.$emit('delete-place')
    },
    updateRouteMeta(meta) {
      Object.keys(meta).forEach(el => {
        if (meta[el]) this.routeMeta[el] = meta[el]
      })
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
