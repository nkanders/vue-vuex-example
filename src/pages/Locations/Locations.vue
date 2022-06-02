<template>
  <!-- <q-page class="flex">
    <q-table
      title="Locations"
      :data="locations"
      :columns="columns"
      row-key="id"
      color="secondary"
      ref="table"
      :filter="filter"
      :pagination.sync="pagination"
    >
      <q-tr
        slot="body"
        slot-scope="props"
        :props="props"
        @click.native="selectLocation(props.row)"
        class="cursor-pointer"
      >
        <q-td v-for="col in props.cols" :key="col.name" :props="props">{{ col.value }}</q-td>
      </q-tr>
      <template v-slot:top>
        <q-input
          dense
          debounce="300"
          v-model="filter"
          placeholder="Search"
          class="col-12 col-md-4 col-lg-3 col-xl-2"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>
    </q-table>
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn ref="addButton" fab icon="add" color="accent" @click.native="addLocation()" />
    </q-page-sticky>
  </q-page>-->
  <custom-table :dataList="locations" :columns="columns" :addUser="addLocation">
    <template v-slot:tablerow="slotProps">
      <q-tr @click.native="selectLocation(slotProps.row.row)" class="cursor-pointer q-table-item">
        <q-td v-for="col in slotProps.row.cols" :key="col.name">{{ col.value }}</q-td>
      </q-tr>
    </template>
  </custom-table>
</template>

<script>
import { mapGetters } from 'vuex'
import GridMixin from '../../mixins/GridMixin.js'
import { countrySettings } from '../../helpers/countrySettings'
import CustomTable from '../../components/CustomTable'

export default {
  name: 'Locations',
  props: ['currentUserScoped'],
  mixins: [GridMixin],
  components: { 'custom-table': CustomTable },
  data: () => ({
    filter: '',
    countrySettings: countrySettings(),
    pagination: {
      page: 1,
      rowsPerPage: 10 // 0 means all rows
    }
  }),
  watch: {
    locations() {
      this.setTableHeight()
    }
  },
  computed: {
    ...mapGetters({
      me: 'auth/currentUser'
    }),
    columns() {
      let columns = [
        {
          name: 'Title',
          required: true,
          label: 'Title',
          align: 'left',
          field: 'title',
          format: val => `${val}`,
          sortable: true
        },
        {
          name: 'Geo',
          required: true,
          label: 'Geo',
          align: 'left',
          field: row => this.addressTandem(row),
          sortable: true
        }
      ]

      if (this.currentUserScoped) {
        // columns.push()
      } else {
        columns.push({
          name: 'Owner',
          required: true,
          label: 'Owner',
          align: 'left',
          field: row => this.getUserName(row.owner_user_id),
          sortable: true
        })
      }

      return columns
    },
    locations() {
      if (this.currentUserScoped) {
        return this.$store.getters['locations/my']
      } else {
        return this.$store.getters['locations/all']
      }
    }
  },

  methods: {
    currentCountryConfig(country) {
      return this.countrySettings[country] || this.countrySettings.default
    },
    addressTandem(location) {
      if (location.address && Object.entries(location.address).length) {
        return this.currentCountryConfig(location.address.country).getTandem(location.address)
      } else {
        return ''
      }
    },
    getUserName(id) {
      let user = this.$store.getters['users/byId'](id)
      if (user) {
        return `${user.fname} ${user.lname}`
      } else {
        return id
      }
    },
    createLocation() {
      let userId = this.currentUserScoped ? this.me.id : null
      let data = {
        title: 'New Location'
      }
      this.$store.dispatch('locations/create', { userId, data })
    },
    selectLocation(location) {
      let scope = this.currentUserScoped ? '/my' : ''
      this.$router.push({ path: `${scope}/locations/${location.id}` })
    },
    hasPerm(perm) {
      return this.$store.getters['auth/hasPerm'](perm)
    },
    addLocation() {
      this.$router.push({ path: `/locations/add-location` })

      // if (this.hasPerm('can_edit_locations')) {
      //   this.createLocation()
      // } else {
      //   this.$q.notify({
      //     color: 'red-5',
      //     textColor: 'white',
      //     icon: 'fas fa-exclamation-triangle',
      //     message: 'Sorry, you need permission to add locations'
      //   })
      // }
    }
  },

  mounted() {
    // if (this.currentUserScoped) {
    //   if (this.me) this.$store.dispatch('locations/loadLocations', this.me.id)
    // }
    // else {
    //   this.$store.dispatch('users/loadUsers')
    //   this.$store.dispatch('locations/loadLocations', null)
    // }
  }
}
</script>

<style lang="stylus" scoped>
.q-table-item {
  height: 30px;
}
</style>
