<template>
  <q-page class="flex">
    <q-table
      :data="models"
      :columns="columns"
      row-key="id"
      color="secondary"
      :pagination.sync="pagination"
    >
      <q-tr
        slot="body"
        slot-scope="props"
        :props="props"
        @click.native="selectModel(props.row)"
        class="cursor-pointer"
      >
        <q-td key="Title" :props="props">{{ props.row.title }}</q-td>
        <q-td key="Description" :props="props">{{ props.row.description }}</q-td>
      </q-tr>
    </q-table>
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn ref="addBtn" fab icon="add" color="accent" @click.native="addDeviceModel()" />
    </q-page-sticky>
  </q-page>
</template>

<script>
import GridMixin from '../../mixins/GridMixin'

export default {
  name: 'DeviceModels',
  props: ['typeId'],
  data: () => ({
    pagination: {
      sortBy: null, // String, column "name" property value
      descending: false,
      page: 1,
      rowsPerPage: 0 // current rows per page being displayed
    },
    typeModels: [],
    deviceTypeId: ''
  }),
  mixins: [GridMixin],
  // watch: {
  //   models() {
  //     // this.setTableHeight()
  //   }
  // },
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

    models() {
      const models = this.$store.getters['deviceModels/all']
      let filteredModel = []
      models.forEach(model => {
        if (this.typeId === model.device_type_id.toString()) {
          filteredModel.push(model)
        }
      })
      return filteredModel
    }
  },

  methods: {
    selectModel(m) {
      this.$router.push({
        path: `/device-models/${m.id}`
      })
    },
    addDeviceModel() {
      this.$router.push({ path: `/device-models/add-device-model` })
    }
  },

  created() {
    this.$store.dispatch('deviceModels/loadAll')
    // this.$store.dispatch('deviceModels/loadAll')
    this.deviceTypeId = this.typeId
  }
}
</script>
