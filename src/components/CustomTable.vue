<template>
  <q-page class="flex">
    <q-table
      :data="dataList"
      :columns="columns"
      row-key="id"
      color="secondary"
      :filter="filter"
      :sort-method="customSort"
      binary-state-sort
      :pagination.sync="pagination"
    >
      <template v-slot:top>
        <q-input
          borderless
          dense
          debounce="300"
          v-model="filter"
          placeholder="Search"
          class="full-width-search"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>
      <template v-slot:body="dataItem">
        <slot name="tablerow" v-bind:row="dataItem"></slot>
      </template>
    </q-table>
    <q-page-sticky v-if="showAddButton" position="bottom-right" :offset="[18, 18]">
      <q-btn fab icon="add" color="accent" @click.native="addUser()" />
    </q-page-sticky>
  </q-page>
</template>

<script>
export default {
  name: 'CustomTable',
  props: {
    dataList: null,
    columns: null,
    addUser: Function,
    customSort: Function,
    showAddButton: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      filter: '',
      pagination: {}
    }
  },
  methods: {
    getElementHeight(className) {
      const element = document.getElementsByClassName(className)
      if (element && element.length > 0) {
        return element[0].clientHeight
      } else {
        return 0
      }
    }
  },
  mounted() {
    const tableHeight = window.innerHeight - this.getElementHeight('q-header') - this.getElementHeight('q-table__top') - this.getElementHeight('q-table__bottom')
    const rowPage = tableHeight / this.getElementHeight('q-table-item')

    let firstRowName = ''
    if (this.columns.length > 0 && this.columns[0].name) {
      firstRowName = this.columns[0].name
    }

    this.pagination = {
      sortBy: null, // String, column "name" property value
      descending: true,
      rowsPerPage: Math.floor(rowPage) - 1 // current rows per page being displayed
    }
    if (firstRowName) {
      this.pagination['sortBy'] = firstRowName
    }
  }
}
</script>

<style lang="stylus" scoped>
.full-width-search {
  width: 100%;
}

.q-table .q-avatar {
  height: 33px !important;
  width: 33px !important;
}
</style>
