<template>
  <q-page class="flex">
    <q-table
      title="Available Software"
      :data="software"
      :columns="columns"
      row-key="id"
      color="secondary"
      :pagination.sync="pagination"
    >
      <q-tr
        slot="body"
        slot-scope="props"
        :props="props"
        @click.native="selectSoftware(props.row)"
        class="cursor-pointer"
      >
        <q-td key="Id" :props="props">{{ props.row.id }}</q-td>
        <q-td key="Version" :props="props">{{ props.row.version }}</q-td>
      </q-tr>
    </q-table>

    <div>
      <q-uploader
        :url="`${$api.apiUrl}/ota/${modelId}`"
        style="max-width: 300px"
        multiple
        :headers="[{name: 'Authorization', value: this.uploadHeaders}]"
        @uploaded="onUploadCompleted"
      />

      <router-view />
    </div>
  </q-page>
</template>

<style>
</style>

<script>
import GridMixin from '../../../mixins/GridMixin'

export default {
  name: 'DeviceSoftware',
  props: ['modelId'],
  mixins: [GridMixin],
  data: () => ({
    pagination: {
      sortBy: null, // String, column "name" property value
      descending: false,
      page: 1,
      rowsPerPage: 0 // current rows per page being displayed
    }
  }),

  computed: {
    uploadHeaders() {
      let token = this.$store.getters['auth/token']
      return `Bearer ${token}`
    },
    columns() {
      let columns = [
        {
          name: 'Id',
          required: true,
          label: 'Id',
          align: 'left',
          field: 'id'
        },
        {
          name: 'Version',
          required: true,
          label: 'Version',
          align: 'left',
          field: 'version',
          sortable: true
        }
      ]

      return columns
    },

    software() {
      // return this.modelId
      //   ? this.$store.getters['deviceSoftware/byModelId'](this.modelId)
      //   : this.$store.getters['deviceSoftware/all']
      return this.$store.getters['deviceSoftware/byModelId'](this.modelId)
    }
  },

  watch: {
    software: function() {
      this.setTableHeight()
    }
  },

  methods: {
    selectSoftware(sw) {
      this.$router.push({
        path: `/device-models/${this.modelId}/software/${sw.id}`
      })
    },
    onUploadCompleted() {
      this.$store.dispatch('deviceSoftware/loadAll')
    }
  },

  created() {
    // this.$store.dispatch('deviceSoftware/loadAll')
  }
}
</script>
