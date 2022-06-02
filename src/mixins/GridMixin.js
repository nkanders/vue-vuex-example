export default {
  methods: {
    setTableHeight() {
      const cellHeight = document.querySelector('th').offsetHeight
      const container = document.querySelector('.q-table__container')
      const top = document.querySelector('.q-table__top')
      const bottom = document.querySelector('.q-table__bottom')
      const tableHeight = container.offsetHeight - top.offsetHeight - bottom.offsetHeight
      this.pagination.rowsPerPage = Math.floor(tableHeight / cellHeight) - 1
    }
  }
}
