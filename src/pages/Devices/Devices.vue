<template>
  <custom-table
    :dataList="devices"
    :columns="columns"
    :showAddButton="false"
    :customSort="customSort"
  >
    <template v-slot:tablerow="slotProps">
      <q-tr @click.native="selectDevice(slotProps.row.row)" class="cursor-pointer q-table-item">
        <q-td key="Status">
          <q-icon v-if="!slotProps.row.row.status" color="negative" name="mdi-lan-disconnect" />
          <q-icon v-else-if="!slotProps.row.row.mcu_status" color="warning" name="mdi-lan-pending" />
          <q-icon v-else color="positive" name="mdi-lan-connect" />
        </q-td>
        <q-td key="Title">{{ slotProps.row.row.title }}</q-td>
        <q-td key="User">{{ getUser(slotProps.row.row.location_id) }}</q-td>
        <q-td key="Location">
          <router-link
            :to="`/locations/${slotProps.row.row.location_id}`"
            @click.native="$event.stopImmediatePropagation()"
          >{{ getLocationTitle(slotProps.row.row.location_id) }}</router-link>
        </q-td>
      </q-tr>
    </template>
  </custom-table>
</template>

<script>
import GridMixin from '../../mixins/GridMixin'
import CustomTable from '../../components/CustomTable'

export default {
  name: 'DevicesList',
  props: ['locationId'],
  mixins: [GridMixin],
  components: { CustomTable },
  // data() {
  // pagination: {
  //   sortBy: 'Status', // String, column "name" property value
  //   descending: true,
  //   page: 1,
  //   rowsPerPage: 0 // current rows per page being displayed
  // }
  // pagination: {
  //   page: 1,
  //   rowsPerPage: 0 // current rows per page being displayed
  // }
  // },
  computed: {
    columns() {
      let columns = [
        {
          name: 'Status',
          required: true,
          label: 'Status',
          align: 'center',
          field: 'status',
          sortable: true
        },
        {
          name: 'Title',
          required: true,
          label: 'Title',
          align: 'left',
          field: 'title',
          sortable: true
        },
        {
          name: 'User',
          required: true,
          label: 'User',
          align: 'left',
          field: 'user_id',
          sortable: true
        },
        {
          name: 'Location',
          required: true,
          label: 'Location',
          align: 'left',
          field: 'location_id',
          sortable: true
        }
      ]

      return columns
    },
    users() {
      return this.$store.getters['users/all']
    },

    devices() {
      return this.locationId ? this.$store.getters['devices/byLocationId'](this.locationId) : this.$store.getters['devices/all']
    },

    scope() {
      return `${this.locationId ? `/locations/${this.locationId}` : ''}`
    }
  },

  methods: {
    getLocationTitle(id) {
      return this.$store.getters['locations/byId'](id).title || id
    },
    getUser(id) {
      let userId = this.$store.getters['locations/byId'](id).owner_user_id || id
      let usr = this.$store.getters['users/byId'](userId)
      // this.users.forEach(user => {
      //   if (userId === user.id) {
      //     usr = user
      //   }
      // })
      let fullName = `${usr.fname} ${usr.lname}`
      return fullName
    },
    createDevice() {
      let data = {
        title: 'New Device'
      }
      this.$store.dispatch('devices/create', { data })
    },
    selectDevice(device) {
      this.$router.push({ path: `${this.scope}/devices/${device.id}` })
    },
    hasPerm(perm) {
      return this.$store.getters['auth/hasPerm'](perm)
    },
    addDevice() {
      if (this.hasPerm('can_edit_devices')) {
        this.createDevice()
      } else {
        this.$q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'fas fa-exclamation-triangle',
          message: 'Sorry, you need permissions to add devices'
        })
      }
    },
    customSort(rows, sortBy, descending) {
      let data = [...rows]

      if (sortBy) {
        data.sort((a, b) => {
          let x = descending ? b : a
          let y = descending ? a : b

          if (sortBy === 'Status') {
            x = x.status
            y = y.status
          } else if (sortBy === 'Title') {
            x = x.title
            y = y.title
          } else if (sortBy === 'User') {
            x = x.location_id
            y = y.location_id
          } else if (sortBy === 'Location') {
            x = this.getLocationTitle(x.location_id)
            y = this.getLocationTitle(y.location_id)
          } else {
            x = x.status
            y = y.status
          }

          return x > y ? 1 : x < y ? -1 : 0
        })
      }

      return data
    }
  },
  watch: {
    devices() {
      this.setTableHeight()
    }
  },
  created() {
    // this.$store.dispatch('devices/loadDevices', {
    //   locationId: this.locationId
    // })
    // this.$store.dispatch('locations/loadLocations', null)
    // this.$store.dispatch('users/loadUsers', {})
  }
}
</script>

<style lang="stylus">
.device-table {
  .q-table__bottom {
    bottom: 73px !important;
  }
}
</style>
