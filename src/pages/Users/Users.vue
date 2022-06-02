<template>
  <custom-table :dataList="users" :columns="columns" :addUser="addUser">
    <template v-slot:tablerow="slotProps">
      <q-tr @click.native="selectUser(slotProps.row.row)" class="cursor-pointer q-table-item">
        <q-td key="Avatar">
          <q-avatar size="50px" class="q-ma-xs">
            <img v-if="slotProps.row.row.avatar!=null" :src="slotProps.row.row.avatar" />
            <v-gravatar :size="200" v-else :email="slotProps.row.row.email" default-img="mp" />
          </q-avatar>
        </q-td>
        <q-td key="First Name">{{ slotProps.row.row.fname }}</q-td>
        <q-td key="Last Name">{{ slotProps.row.row.lname }}</q-td>
        <q-td key="Email">
          <span>
            <q-icon v-if="slotProps.row.row.is_confirmed" class="text-green" name="email" />
            <q-icon v-else class="text-red" name="email" />
            {{slotProps.row.row.email}}
          </span>
        </q-td>
      </q-tr>
    </template>
  </custom-table>
</template>

<script>
import Gravatar from 'vue-gravatar'
// import GridMixin from '../../mixins/GridMixin'
import store from '../../store'
import CustomTable from '../../components/CustomTable'

export default {
  name: 'Users',
  components: { 'v-gravatar': Gravatar, CustomTable },
  data: () => ({
    filter: '',
    avatar: '//www.gravatar.com/avatar/a67dfbfd65826941d6b6570de13272f3?s=80&d=mp&r=g'
  }),
  // mixins: [GridMixin],
  // watch: {
  //   users() {
  //     this.setTableHeight()
  //   }
  // },
  computed: {
    columns() {
      let columns = [
        {
          name: 'Avatar',
          required: true,
          label: 'Avatar',
          align: 'left',
          field: row => row.avatar,
          sortable: false
        },
        {
          name: 'First Name',
          required: true,
          label: 'First Name',
          align: 'left',
          field: row => row.fname,
          format: val => `${val}`,
          sortable: true
        },
        {
          name: 'Last Name',
          required: true,
          label: 'Last Name',
          align: 'left',
          field: row => row.lname,
          format: val => `${val}`,
          sortable: true
        },
        {
          name: 'Email',
          required: true,
          label: 'Email',
          align: 'left',
          field: row => row.email,
          format: val => `${val}`,
          sortable: true
        }
      ]

      return columns
    },
    users() {
      return this.$store.getters['users/all']
    }
  },

  methods: {
    selectUser(user) {
      this.$router.push({ path: `/users/${user.id}` })
    },
    hasPerm(perm) {
      return this.$store.getters['auth/hasPerm'](perm)
    },
    addUser() {
      if (this.hasPerm('can_edit_users')) {
        this.$router.push({ path: '/users/add-user' })
      }
    }
  },
  created() {
    // this.$store.dispatch('users/loadUsers', {})
  },

  beforeRouteEnter(to, from, next) {
    const promises = [store().dispatch('users/loadUsers'), store().dispatch('locations/loadLocations')]
    Promise.all(promises).then(() => {
      next()
    })
  }
}
</script>

<style lang="styl">
.q-table__middle.scroll {
  padding-bottom: 3rem;
}
</style>
