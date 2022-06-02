<template>
  <q-layout>
    <q-page-container>
      <q-page>
        <div class="q-pa-md row">
          <div class="col">
            <div class>
              <div class="flex row">
                <q-avatar class="q-mb-md q-mt-md" size="40px">
                  <q-icon
                    v-if="!device.status"
                    color="negative"
                    name="mdi-lan-disconnect"
                    size="30px"
                  />
                  <q-icon
                    v-else-if="!device.mcu_status"
                    color="warning"
                    name="mdi-lan-pending"
                    size="30px"
                  />
                  <q-icon v-else color="positive" name="mdi-lan-connect" size="30px" />
                </q-avatar>
                <h6 class="q-mb-md q-mt-md q-ml-md">Console</h6>
              </div>
              <device-console :deviceId="deviceId"></device-console>
            </div>
            <div>
              <h6 class="q-mb-md q-mt-lg">Details:</h6>
              <edit-device
                v-model="deviceInfo"
                @getError="getErr"
                :userId="me.id"
                :editMode="editMode"
              ></edit-device>
            </div>
            <div>
              <q-input
                v-model="device.notes"
                type="text"
                label="notes"
                :max-height="100"
                rows="7"
                :disable="!editMode"
              >
                <template v-slot:prepend>
                  <q-icon
                    color="primary"
                    class="input-icon-large self-end q-pb-md"
                    name="mdi-text"
                  />
                </template>
              </q-input>
            </div>
            <div class="q-pt-lg">
              <!-- <q-btn color="primary" icon="save" @click="saveDevice" label="save" /> -->
              <!-- <q-btn
                color="negative"
                icon="delete"
                @click="destroyDevice"
                class="on-right"
                label="delete"
              />-->
            </div>
            <div class="q-pt-lg flex items-center">
              <h6 class="q-my-none q-mr-md">Location:</h6>
              <router-link
                :to="`/locations/${device.location_id}`"
              >{{ getLocationTitle(device.location_id) }}</router-link>
            </div>
            <div class="q-pt-lg">
              <h6 class="q-mb-md q-mt-lg">MCU Status</h6>
              <mcu :deviceId="deviceId"></mcu>
            </div>
          </div>
        </div>

        <q-dialog v-model="confirmDelete" persistent>
          <q-card>
            <q-card-section class="row items-center">
              <q-icon name="mdi-trash-can-outline" />
              <span class="q-ml-sm">Please confirm deleting {{ this.device.title }}</span>
            </q-card-section>

            <q-card-actions align="right">
              <q-btn flat label="Cancel" color="primary" v-close-popup />
              <q-btn flat label="Delete" color="primary" @click.native="deleteCurrDevice" />
            </q-card-actions>
          </q-card>
        </q-dialog>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import EditDevice from '../../../components/editors/Device'
import DeviceConsole from '../../../pages/Devices/Device/Console'
import DeviceMCU from '../../../pages/Devices/Device/MCU'

export default {
  name: 'Device',
  components: { 'edit-device': EditDevice, 'device-console': DeviceConsole, mcu: DeviceMCU },
  props: ['locationId', 'deviceId', 'currentUserScoped'],
  data: () => ({
    editMode: false,
    err: '',
    deviceInfo: [],
    confirmDelete: false
  }),
  computed: {
    me() {
      return this.$store.getters['auth/currentUser']
    },
    log() {
      return this.$store.getters['logs/byReporterId'](this.deviceId)
    },
    device() {
      return this.$store.getters['devices/byId'](this.deviceId)
    }
  },

  methods: {
    saveDevice() {
      let userId = this.userId
      this.$store
        .dispatch('devices/update', {
          userId,
          locationId: this.locationId,
          deviceId: this.deviceId,
          deviceInfo: this.deviceInfo
        })
        .then(
          () => {
            this.$q.notify({
              color: 'green-5',
              textColor: 'white',
              message: 'SmartHub information saved'
            })
          },
          () => {
            this.$q.notify({
              color: 'red-5',
              textColor: 'white',
              message: 'SmartHub information failed to save'
            })
          }
        )
    },
    destroyDevice() {
      let userId = this.userId
      this.$store
        .dispatch('devices/destroy', {
          userId,
          locationId: this.locationId,
          deviceId: this.deviceId
        })
        .then(() => {
          this.$router.push({
            path: `${this.scope}/locations/${this.locationId}/devices`
          })
        })
    },
    getLocationTitle(id) {
      return this.$store.getters['locations/byId'](id).title || id
    },

    getErr(err) {
      this.err = err
    },
    hasPerm(perm) {
      // return this.$store.getters['auth/hasPerm'](perm)
      return this.$store.getters.currentUser && this.$store.getters.currentUser.perms.indexOf(perm) >= 0
    },
    deleteConfirmation() {
      this.confirmDelete = true
    },
    deleteCurrDevice() {
      this.$store.dispatch('devices/destroy', { locationId: this.device.location_id, deviceId: this.device.id })
      this.$router.push({ path: '/devices' })
    }
  },

  created() {
    this.deviceInfo = this.device
    if (this.hasPerm('can_edit_devices')) {
      this.editMode = true
    } else {
      this.editMode = false
      this.$q.notify({
        color: 'red-5',
        textColor: 'white',
        icon: 'fas fa-exclamation-triangle',
        message: 'Sorry, you need permissions to edit devices'
      })
    }
    // let userId = this.currentUserScoped ? this.me.id : null
    // this.$store.dispatch('devices/loadDevice', {
    //   userId: userId,
    //   locationId: this.locationId,
    //   deviceId: this.deviceId
    // })
    // this.$store.dispatch('locations/loadLocations', userId)
  },
  mounted() {
    this.$root.$on('save-smarthub', () => {
      this.saveDevice()
    })
    this.$root.$on('delete-device', () => {
      this.deleteConfirmation()
    })

    this.$root.$emit('show-trash-button', this.editMode)
    this.$root.$emit('change-device-title', this.deviceInfo.title)
  },
  destroyed() {
    this.$root.$off('save-smarthub')
    this.$root.$off('delete-device')
  }
}
</script>
<style scoped>
h6 {
  margin-top: 2rem;
  margin-bottom: 0;
}
</style>
