<template>
  <q-layout>
    <q-page-container>
      <q-page class="flex">
        <div class="q-pa-md col">
          <model-edit :value="model" :disable="!editMode" class="q-model-edit"></model-edit>
          <div class="q-pa-md q-firmware-title">
            <h6 class="q-mb-md q-mt-lg">Firmware</h6>
          </div>

          <q-table
            :data="firmwares"
            :columns="columns"
            row-key="version"
            color="secondary"
            ref="qFirmwareTable"
            class="q-firmware-table"
            :pagination.sync="pagination"
          >
            <q-tr
              slot="body"
              slot-scope="props"
              :props="props"
              class="cursor-pointer q-firmware-table-item"
              @click.native="selectFirmware(props.row)"
            >
              <q-td key="version" :props="props" style="width: 50px">{{ props.row.version }}</q-td>
              <q-td key="description" class="text-left" :props="props">{{ props.row.description }}</q-td>
            </q-tr>
          </q-table>

          <!-- delete model dialog -->
          <q-dialog v-model="deletePopup" persistent>
            <q-card>
              <q-card-section class="row items-center">
                <q-avatar icon="mdi-trash-can-outline" color="primary" text-color="white" />
                <span class="q-ml-sm">Confirm deleting {{model.title}}.</span>
              </q-card-section>

              <q-card-actions align="right">
                <q-btn flat label="Cancel" color="primary" v-close-popup />
                <q-btn flat label="Delete" color="primary" @click="destroy" />
              </q-card-actions>
            </q-card>
          </q-dialog>

          <!-- delete firmware dialog -->
          <q-dialog v-model="deleteFirmware" ref="deleteFirmwareDialog" persistent>
            <q-card class="delete-firmware-dialog">
              <q-card-section class="row items-center">
                <div class="text-h6">Firmware</div>
                <q-space />
                <q-btn icon="close" flat round dense v-close-popup />
              </q-card-section>

              <q-card-section>
                <q-input
                  :value="selectedFirmwareInfo.version"
                  v-model.trim="selectedFirmwareInfo.version"
                  class="input-large"
                  label="version"
                />
              </q-card-section>
              <q-card-section>
                <q-input
                  :value="selectedFirmwareInfo.description"
                  v-model.trim="selectedFirmwareInfo.description"
                  class="input-large"
                  label="description"
                />
              </q-card-section>
              <q-card-section class="row items-center">
                <q-input
                  :value="selectedFirmwareInfo.ota_link"
                  v-model.trim="selectedFirmwareInfo.ota_link"
                  class="input-large"
                  label="OTA Link"
                  :disable="true"
                  style="width: 95%"
                />
                <q-icon
                  name="mdi-image-filter-none"
                  @click.native="onCopyOTALink(selectedFirmwareInfo.ota_link)"
                />
              </q-card-section>
              <q-card-section>
                <q-input
                  v-model="selectedFirmwareInfo.documentation"
                  type="textarea"
                  label="documentation"
                ></q-input>
              </q-card-section>

              <q-card-section align="right">
                <q-btn flat label="Save" color="primary" @click.native="onSaveFirmware" />
                <q-btn flat label="Delete" color="primary" @click.native="onDelFirmware" />
              </q-card-section>
            </q-card>
          </q-dialog>

          <!-- delete firmware confirm dialog -->
          <q-dialog v-model="deleteFirmwareConfirm">
            <q-card>
              <q-card-section>
                <span>Are you sure to delete this firmware?</span>
              </q-card-section>
              <q-card-section align="right">
                <q-btn
                  flat
                  label="Yes"
                  color="primary"
                  v-close-popup
                  @click.native="onDelFirmwareConfirm"
                />
                <q-btn flat label="No" color="primary" v-close-popup />
              </q-card-section>
            </q-card>
          </q-dialog>

          <q-dialog v-model="firmwareUpload" ref="newFirmwareDialog">
            <q-card class="upload-firmware-dialog">
              <q-card-section class="row items-center">
                <div class="text-h6">New Firmware upload</div>
                <q-space />
                <q-btn icon="close" flat round dense v-close-popup />
              </q-card-section>

              <q-card-section>
                <q-input
                  v-model.trim="newFirmwareInfo.version"
                  class="input-large"
                  label="version"
                />
              </q-card-section>

              <q-card-section>
                <q-input
                  v-model.trim="newFirmwareInfo.description"
                  class="input-large"
                  label="description"
                />
              </q-card-section>

              <q-card-section>
                <q-uploader
                  :url="`${$api.apiUrl}/ota/${modelId}`"
                  :headers="[{name: 'Authorization', value: this.uploadHeaders}]"
                  @uploaded="onUploadCompleted"
                >
                  <template v-slot:header="scope">
                    <div
                      v-if="!uploadFileSucceed"
                      class="row no-wrap items-center q-pa-sm q-gutter-xs"
                    >
                      <q-btn
                        v-if="scope.queuedFiles.length > 0"
                        icon="clear_all"
                        @click="scope.removeQueuedFiles"
                        round
                        dense
                        flat
                      >
                        <q-tooltip>Clear All</q-tooltip>
                      </q-btn>

                      <q-btn
                        v-if="scope.uploadedFiles.length > 0"
                        icon="done_all"
                        @click="scope.removeUploadedFiles"
                        round
                        dense
                        flat
                      >
                        <q-tooltip>Remove Uploaded Files</q-tooltip>
                      </q-btn>

                      <q-spinner v-if="scope.isUploading" class="q-uploader__spinner"></q-spinner>
                      <div class="col">
                        <div class="q-uploader__title">Upload your files</div>
                        <div
                          class="q-uploader__subtitle"
                        >{{ scope.uploadSizeLabel }} / {{ scope.uploadProgressLabel }}</div>
                      </div>

                      <q-btn v-if="scope.canAddFiles" type="a" icon="add_box" round dense flat>
                        <q-uploader-add-trigger></q-uploader-add-trigger>
                        <q-tooltip>Pick Files</q-tooltip>
                      </q-btn>

                      <q-btn
                        v-if="scope.canUpload"
                        icon="cloud_upload"
                        @click="scope.upload"
                        round
                        dense
                        flat
                      >
                        <q-tooltip>Upload Files</q-tooltip>
                      </q-btn>

                      <q-btn
                        v-if="scope.isUploading"
                        icon="clear"
                        @click="scope.abort"
                        round
                        dense
                        flat
                      >
                        <q-tooltip>Abort Upload</q-tooltip>
                      </q-btn>
                    </div>
                  </template>
                </q-uploader>
              </q-card-section>

              <q-card-section class="row items-end">
                <q-space />
                <q-btn flat label="Save" color="primary" @click.native="onSaveNewFirmware" />
                <q-btn flat label="Cancel" color="primary" v-close-popup />
              </q-card-section>
            </q-card>
          </q-dialog>
        </div>
      </q-page>

      <q-page-sticky position="bottom-right" :offset="[18, 18]">
        <q-btn
          ref="addButton"
          fab
          icon="mdi-cloud-upload-outline"
          color="accent"
          @click.native="uploadFirmware()"
        />
      </q-page-sticky>
    </q-page-container>
  </q-layout>
</template>

<script>
import ModelEdit from '../../../components/editors/Model'
export default {
  name: 'DeviceModelDetails',
  props: ['modelId'],
  components: { 'model-edit': ModelEdit },
  data: () => ({
    editMode: true,
    typeId: '',
    thisModel: {},
    deletePopup: false,
    pagination: {},
    deleteFirmware: false,
    selectedFirmwareInfo: {
      version: '',
      desc: '',
      ota_link: ''
    },
    deleteFirmwareConfirm: false,
    firmwareUpload: false,
    uploadFileSucceed: false,
    newFirmwareInfo: {
      softwareId: -1,
      version: '',
      description: ''
    }
  }),

  computed: {
    me() {
      return this.$store.getters['auth/currentUser']
    },

    model() {
      return this.$store.getters['deviceModels/byId'](this.modelId)
    },

    devices() {
      return this.$store.getters['devices/all']
    },

    firmwares() {
      let temp = this.$store.getters['deviceSoftware/byModelId']
      if (temp) return temp(this.modelId)
      return undefined
    },

    uploadHeaders() {
      let token = this.$store.getters['auth/token']
      return `Bearer ${token}`
    },

    columns() {
      let columns = [
        {
          name: 'version',
          required: true,
          label: 'Version',
          align: 'left',
          field: 'version',
          sortable: true
        },
        {
          name: 'description',
          required: true,
          label: 'Description',
          align: 'left',
          field: 'description',
          sortable: true
        }
      ]

      return columns
    }
  },

  methods: {
    getCurrentModel() {
      this.thisModel = Object.assign({}, this.model)
      this.updateRouteMeta({ title: this.thisModel.title })
      this.updateRouteMeta({ backButtonPath: `/device-types/${this.thisModel.device_type_id}` })
    },
    updateRouteMeta(m) {
      let meta = Object.assign(m, this.$route.meta)
      this.$root.$emit('update-route-meta', meta)
    },
    hasPerm(perm) {
      // return this.$store.getters['auth/hasPerm'](perm)
      let temp = this.$store.getters['auth/hasPerm']
      if (temp) return temp(perm)
      return undefined
    },
    selectFirmware(row) {
      this.selectedFirmwareInfo = row
      this.selectedFirmwareInfo.ota_link = this.otaLink(row.id)
      this.deleteFirmware = !this.deleteFirmware
    },
    otaLink(softwareId) {
      return `${this.$api.apiUrl}/ota/${this.modelId}/${softwareId}`
    },
    onUploadCompleted(file, xhr) {
      const response = JSON.parse(file.xhr.response)
      this.newFirmwareInfo.softwareId = response.id
      this.uploadFileSucceed = true
    },
    copyToClipboard(str) {
      const el = document.createElement('textarea')
      el.value = str
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
    },
    save() {
      this.$store
        .dispatch('deviceModels/update', {
          modelId: this.modelId
        })
        .then(
          () => {
            this.$q.notify({
              color: 'green-5',
              textColor: 'white',
              message: 'Model details saved'
            })
          },
          () => {
            this.$q.notify({
              color: 'red-5',
              textColor: 'white',
              message: 'Model details failed to save'
            })
          }
        )
    },
    destroy() {
      for (let i = 0; i < this.devices.length; i++) {
        if (this.devices[i].device_model_id === parseInt(this.modelId)) {
          this.$q.notify({
            color: 'red-5',
            textColor: 'white',
            message: 'Cannot delete this model. There are SmartHubs that belong to this model.'
          })
          return
        }
      }

      this.$store
        .dispatch('deviceModels/destroy', {
          modelId: this.modelId
        })
        .then(() => {
          this.$q.notify({
            color: 'green-5',
            textColor: 'white',
            message: 'Model is deleted successfully.'
          })
          this.$router.push({
            path: `/device-types/${this.typeId}`
          })
        })
    },
    onCopyOTALink(str) {
      try {
        this.copyToClipboard(str)
        this.$q.notify({
          color: 'green-5',
          textColor: 'white',
          message: 'OTA link was copied'
        })
      } catch (err) {
        this.$q.notify({
          color: 'red-5',
          textColor: 'white',
          message: 'Failed to copy OTA link'
        })
      }
    },
    onDelFirmware() {
      this.deleteFirmwareConfirm = !this.deleteFirmwareConfirm
    },
    onDelFirmwareConfirm() {
      this.$store
        .dispatch('deviceSoftware/destroy', {
          softwareId: this.selectedFirmwareInfo.id
        })
        .then(resolve => {
          this.$refs.deleteFirmwareDialog.hide()
          this.$q.notify({
            color: 'green-5',
            textColor: 'white',
            message: 'Firmware removed'
          })
        })
    },
    onSaveFirmware() {
      this.$store
        .dispatch('deviceSoftware/updateWithData', {
          softwareId: this.selectedFirmwareInfo.id,
          software: this.selectedFirmwareInfo
        })
        .then(() => {
          this.$refs.deleteFirmwareDialog.hide()
          this.$q.notify({
            color: 'green-5',
            textColor: 'white',
            message: 'Firmware info changed'
          })
        })
    },
    uploadFirmware() {
      this.firmwareUpload = !this.firmwareUpload
      this.newFirmwareInfo = {}
      this.uploadFileSucceed = false
    },
    onSaveNewFirmware() {
      if (this.newFirmwareInfo.description && this.newFirmwareInfo.version && this.uploadFileSucceed) {
        this.$store
          .dispatch('deviceSoftware/updateWithData', {
            softwareId: this.newFirmwareInfo.softwareId,
            software: {
              description: this.newFirmwareInfo.description,
              version: this.newFirmwareInfo.version
            }
          })
          .then(response => {
            this.$store.dispatch('deviceSoftware/loadAll')
            this.$refs.newFirmwareDialog.hide()
            this.$q.notify({
              color: 'green-5',
              textColor: 'white',
              message: 'New firmware has been saved'
            })
          })
      } else {
        this.$q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'fas fa-exclamation-triangle',
          message: 'Correct the missing fields'
        })
      }
    },
    uploadFirmwareDlg() {},
    getElementHeight(className) {
      const element = document.getElementsByClassName(className)
      if (element && element.length > 0) {
        return element[0].clientHeight
      } else {
        return 0
      }
    },
    setFirmwarePagination() {
      const tableHeight =
        window.innerHeight - this.getElementHeight('q-header') - this.getElementHeight('q-firmware-title') - this.getElementHeight('q-model-edit') - this.getElementHeight('q-table__bottom')
      const rowPage = tableHeight / this.getElementHeight('q-firmware-table-item')
      this.pagination = {
        sortBy: 'version',
        descending: true,
        rowsPerPage: Math.floor(rowPage) - 1
      }
    }
  },
  watch: {
    model() {
      return this.getCurrentModel()
    }
  },
  created() {
    if (this.hasPerm('can_edit_device_models')) {
      this.editMode = true
    }
    // this.$store.dispatch('deviceModels/loadOne', {
    //   modelId: this.modelId
    // })
    this.getCurrentModel()
    this.typeId = this.thisModel.device_type_id
    // this.$store.dispatch('deviceSoftware/loadAll')
  },

  mounted() {
    this.$root.$on('save-device-model', () => {
      this.save()
    })
    this.$root.$on('delete-device-model', () => {
      this.deletePopup = !this.deletePopup
    })

    this.setFirmwarePagination()
  },
  destroyed() {
    this.$root.$off('save-device-model')
  }
}
</script>

<style lang="stylus">
.q-firmware-table {
  .q-table__bottom {
    margin-left: -15px !important;
  }

  .q-table__middle.scroll {
    padding-bottom: 0px !important;
  }
}
</style>

<style lang="stylus" scoped>
.q-page {
  min-height: auto !important;
}

.q-layout {
  min-height: auto !important;
}

.q-table__container {
  width: 100% !important;
}

.delete-firmware-dialog {
  width: 400px;

  @media (max-width: $sizes.xs) {
    width: 200px;
  }
}

.upload-firmware-dialog {
  width: 400px;

  @media (max-width: $sizes.xs) {
    width: 200px;
  }
}

.q-uploader {
  width: auto !important;
}
</style>
