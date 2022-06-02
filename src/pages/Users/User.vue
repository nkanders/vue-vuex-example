<template>
  <transition name="slide" appear>
    <q-layout>
      <q-page-container>
        <q-page class="user-details-block" padding v-if="slide">
          <div>
            <q-avatar size="200px" class="q-ma-xl">
              <img v-if="user.avatar!=null" :src="user.avatar" />
              <v-gravatar :size="200" v-else :email="user.email" default-img="mp" />
            </q-avatar>
          </div>
          <edit-user v-model="thisUser" :disable="!editMode"></edit-user>
          <div class="q-pt-lg">
            <q-input
              v-model="user.notes"
              type="textarea"
              label="Notes"
              :max-height="100"
              rows="7"
              :disable="!editMode"
            >
              <template v-slot:prepend>
                <q-icon color="primary" class="input-icon-large self-end q-pb-md" name="mdi-text" />
              </template>
            </q-input>
          </div>
          <div class="q-pt-lg">
            <q-btn color="primary" icon="save" label="save changes" @click="saveUser" />
            <q-btn
              v-if="!user.is_confirmed"
              color="red-4"
              icon="email"
              class="q-ml-sm"
              @click="resendConfirmation()"
              label="resend confirmation email"
            />
            <q-btn
              color="negative"
              icon="mdi-trash-can-outline"
              @click="confirm = !confirm"
              class="q-ml-sm"
              label="delete"
            />
          </div>
          <q-dialog v-model="confirm" persistent>
            <q-card>
              <q-card-section class="row items-center">
                <q-avatar icon="mdi-trash-can-outline" color="primary" text-color="white" />
                <span
                  v-if="user.locations.length > 0"
                  class="q-ml-sm"
                >This user has locations. First delete all user locations, and then try again.</span>
                <span v-else class="q-ml-sm">
                  You are about to delete
                  {{user.fname}} {{user.lname}} ({{user.email}}).
                </span>
              </q-card-section>

              <q-card-actions align="right">
                <q-btn flat label="Cancel" color="primary" v-close-popup />
                <q-btn
                  v-if="!user.locations.length > 0"
                  flat
                  label="Delete"
                  color="primary"
                  @click="destroyUser"
                />
              </q-card-actions>
            </q-card>
          </q-dialog>
          <div class="q-pt-sm">
            <h5>Permissions</h5>
            <div class="groups" v-for="chunk in getUserPermissions" :key="chunk.value">
              <h6>{{chunk[0].group}}</h6>
              <q-field borderless>
                <q-option-group
                  type="toggle"
                  color="primary"
                  v-model="user.perms"
                  :disable="!editMode"
                  :options="chunk"
                />
              </q-field>
            </div>
          </div>
          <template v-if="user.locations.length > 0">
            <h5>Locations</h5>
            <div class="q-pa-md" style="max-width: 350px">
              <q-list bordered separator>
                <q-item
                  clickable
                  v-ripple
                  v-for="p in user.locations"
                  :key="`location-link-id-${p}`"
                >
                  <q-item-section>
                    <router-link :to="`/locations/${p}`">{{ getLocationTitle(p) }}</router-link>
                  </q-item-section>
                </q-item>
              </q-list>
            </div>
          </template>
        </q-page>
      </q-page-container>
    </q-layout>
  </transition>
</template>

<script>
import User from '../../components/editors/User'
import Gravatar from 'vue-gravatar'

export default {
  name: 'User',
  components: { 'edit-user': User, 'v-gravatar': Gravatar },
  props: ['userId'],
  data: () => ({
    editMode: true,
    slide: true,
    confirm: false,
    thisUser: {},
    userPermissions: [
      {
        value: 'can_see_users',
        label: 'Can see',
        group: 'Users'
      },
      {
        value: 'can_edit_users',
        label: 'Can modify',
        group: 'Users'
      },
      {
        value: 'can_see_locations',
        label: 'Can see',
        group: 'Locations'
      },
      {
        value: 'can_edit_locations',
        label: 'Can modify',
        group: 'Locations'
      },
      {
        value: 'can_see_devices',
        label: 'Can see',
        group: 'Devices'
      },
      {
        value: 'can_edit_devices',
        label: 'Can modify and control',
        group: 'Devices'
      },
      {
        value: 'can_see_device_models',
        label: 'Can see device models',
        group: 'Devices'
      },
      {
        value: 'can_edit_device_models',
        label: 'Can modify device models',
        group: 'Devices'
      },
      {
        value: 'can_see_device_types',
        label: 'Can see device types',
        group: 'Devices'
      },
      {
        value: 'can_edit_device_types',
        label: 'Can modify device types',
        group: 'Devices'
      },
      {
        value: 'can_see_device_softwares',
        label: 'Can see software versions',
        group: 'Devices'
      },
      {
        value: 'can_edit_device_softwares',
        label: 'Can modify software versions',
        group: 'Devices'
      }
    ]
  }),
  computed: {
    permissions() {
      return this.$store.getters['auth/permissions']
    },
    user() {
      return this.$store.getters['users/byId'](this.userId)
    },
    getUserPermissions() {
      return this.groupPermissions(this.userPermissions)
    }
  },
  methods: {
    getCurrentUserData() {
      this.thisUser = Object.assign({}, this.user)
    },
    getLocationTitle(id) {
      return this.$store.getters['locations/byId'](id).title || id
    },
    getErr(err) {
      this.err = err
    },
    saveUser() {
      if (!this.thisUser) {
        this.$q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'fas fa-exclamation-triangle',
          message: 'Please correct the errors above and try again'
        })
      } else {
        this.$store.dispatch('users/update', this.thisUser).then(
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
      }
    },
    destroyUser() {
      this.$store
        .dispatch('users/destroy', {
          userId: this.userId
        })
        .then(() => {
          this.$router.push({ path: `/users` })
        })
    },
    resendConfirmation() {
      this.$api.sendEmailConfirmation(this.userId).then(
        () => {
          this.$q.notify({
            color: 'green-6',
            textColor: 'white',
            icon: 'fas fa-check-circle',
            message: 'Confirmation email resent to ' + this.user.email
          })
        },
        () => {
          this.$q.notify({
            color: 'red-6',
            textColor: 'white',
            icon: 'fas fa-check-circle',
            message: 'Something went wrong'
          })
        }
      )
    },
    hasPerm(perm) {
      return this.$store.getters['auth/hasPerm'](perm)
    },
    groupPermissions(perms) {
      let i
      let devices = perms.splice(4, 8)
      const l = Math.ceil(perms.length / 4)
      const items = perms.slice()
      const result = []
      for (i = 1; i <= l; i++) {
        const chunk3 = items.splice(0, 2)
        result.push(chunk3)
        if (items.length > 0) {
          const chunk2 = items.splice(0, 2)
          result.push(chunk2)
        }
      }
      result.push(devices)
      return result
    }
  },
  watch: {
    user() {
      return this.getCurrentUserData()
    }
  },
  created() {
    if (this.hasPerm('can_edit_users')) {
      this.editMode = true
    }
    // this.$store.dispatch('users/loadUser', {
    //   userId: this.userId
    // })
    // this.$store.dispatch('locations/loadLocations', this.userId)
    this.getCurrentUserData()
  }
}
</script>

<style>
.user-details-block h6 {
  margin: 1rem 0 0;
  font-weight: 400;
}
h5 {
  margin: 1rem 0 1rem;
}
</style>
