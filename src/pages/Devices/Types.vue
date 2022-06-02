<template>
  <q-page class="flex">
    <q-table
      :data="thisTypes"
      :columns="columns"
      row-key="id"
      color="secondary"
      :pagination.sync="pagination"
    >
      <q-tr slot="body" slot-scope="props" :props="props" :typeId="typeId" class="cursor-pointer">
        <q-td key="Title" :props="props">
          <div class="td">
            <div @click="selectType(props.row)">{{ props.row.title }}</div>
            <q-popup-edit v-if="inputEditing" v-model="props.row.title" title="Edit the Title">
              <q-input v-model="props.row.title" @change="editType(props.row) " />
            </q-popup-edit>
            <q-btn
              class="on-right"
              round
              flat
              icon="mdi-pencil"
              v-if="editMode"
              @click="inputEditing = true"
            />
          </div>
        </q-td>
        <q-td key="Description" :props="props">
          <div class="td">
            <div @click="selectType(props.row)">{{ props.row.description }}</div>
            <q-popup-edit
              v-if="inputEditing"
              v-model="props.row.title"
              title="Edit the Description"
            >
              <q-input v-model="props.row.description" @change="editType(props.row) " />
            </q-popup-edit>
            <q-btn
              class="on-right"
              round
              flat
              icon="mdi-pencil"
              v-if="editMode"
              @click="inputEditing = true"
            />
          </div>
        </q-td>
      </q-tr>
    </q-table>
    <q-dialog v-model="addTypeDialog" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <add-type></add-type>
        </q-card-section>
      </q-card>
    </q-dialog>
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn
        fab
        ref="addBtn"
        icon="add"
        color="accent"
        id="addDeviceType"
        @click.native="addDeviceType()"
      />
    </q-page-sticky>
  </q-page>
</template>

<script>
import AddDeviceType from './Type/Add.vue'
import GridMixin from '../../mixins/GridMixin'
import { QPopupEdit } from 'quasar'
import store from '../../store'

export default {
  name: 'DeviceTypes',
  components: { 'add-type': AddDeviceType, 'q-popup-edit': QPopupEdit },
  data: () => ({
    pagination: {
      sortBy: null, // String, column "name" property value
      descending: false,
      page: 1,
      rowsPerPage: 0 // current rows per page being displayed
    },
    addTypeDialog: false,
    typeId: '',
    editMode: true,
    thisType: {},
    thisTypes: [],
    inputEditing: false
  }),
  mixins: [GridMixin],
  computed: {
    columns() {
      let columns = [
        {
          name: 'Title',
          required: true,
          label: 'Title',
          align: 'left',
          field: 'title',
          sortable: true
        },
        {
          name: 'Description',
          required: true,
          label: 'Description',
          align: 'left',
          field: 'description',
          sortable: true
        }
      ]

      return columns
    },

    types() {
      return this.$store.getters['deviceTypes/all']
    }
  },
  methods: {
    getTypes() {
      this.thisTypes = Object.assign([], this.types)
    },
    hasPerm(perm) {
      // return this.$store.getters['auth/hasPerm'](perm)
      return this.$store.getters.currentUser && this.$store.getters.currentUser.perms.indexOf(perm) >= 0
    },
    selectType(t) {
      this.$router.push({
        path: `/device-types/${t.id}`
      })
      this.typeId = t.id
    },
    editType(type) {
      this.$store.dispatch('deviceTypes/update', { typeId: type.id }).then(
        () => {
          this.$q.notify({
            color: 'green-5',
            textColor: 'white',
            message: 'Your information was successfully updated'
          })
        },
        () => {
          this.$q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'fas fa-exclamation-triangle',
            message: "Something went wrong. Don't worry, try submitting the form again. If the problem persists, please contact our customer service"
          })
        }
      )
      this.inputEditing = false
    },
    addDeviceType() {
      this.addTypeDialog = !this.addTypeDialog
    }
  },
  watch: {
    types() {
      this.setTableHeight()
      return this.getTypes()
    }
  },
  created() {
    if (this.hasPerm('can_edit_device_types')) {
      this.editMode = true
    }
    // this.$store.dispatch('deviceTypes/loadAll')
    this.getTypes()
  },
  beforeRouteEnter(to, from, next) {
    const promises = [store().dispatch('deviceTypes/loadAll'), store().dispatch('deviceModels/loadAll')]
    Promise.all(promises).then(resolve => {
      next()
    })
  }
}
</script>
<style>
.td {
  position: relative;
  z-index: 0;
}

table .q-btn {
  position: absolute;
  top: -0.5rem;
  right: 0;
  font-size: 0.7rem;
  z-index: 2;
}
</style>
