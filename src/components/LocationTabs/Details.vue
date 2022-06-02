<template>
  <q-page>
    <q-img
      :src="imgURL"
      spinner-color="white"
      :ratio="16/7"
      style="max-height: 40vh; max-width: 100%"
    >
      <q-btn
        size="35px"
        icon="mdi-camera"
        color="white"
        outline
        unelevated
        flat
        @click.native="changePic()"
        style="opacity: 0.7"
        class="absolute-bottom-right"
      />
    </q-img>

    <div class="q-mx-lg q-mt-lg q-pb-lg">
      <q-input
        :error="$v.thisLocation.title.$anyError"
        v-model.trim="$v.thisLocation.title.$model"
        class="input-large"
        label="place name"
      >
        <template v-slot:prepend>
          <q-icon color="primary" class="input-icon-large self-end q-pb-md" name="mdi-rename-box" />
        </template>
      </q-input>

      <q-select
        v-if="isAdminView"
        v-model.trim="$v.placeUser.$model"
        class="input-large"
        label="place owner"
        use-input
        hide-selected
        fill-input
        input-debounce="0"
        :options="usersList"
        :error="$v.placeUser.$anyError"
        @filter="filterUser"
      >
        <template v-slot:prepend>
          <q-icon color="primary" class="input-icon-large self-end q-pb-md" name="mdi-account" />
        </template>
        <template v-slot:no-option>
          <q-item>
            <q-item-section class="text-grey">No results</q-item-section>
          </q-item>
        </template>
      </q-select>

      <q-select class="input-large" label="place type" :options="placeTypes" v-model="placeType">
        <template v-slot:prepend>
          <q-icon
            color="primary"
            class="input-icon-large self-end q-pb-md"
            name="mdi-format-list-bulleted-type"
          />
        </template>
      </q-select>

      <q-input
        :error="$v.addressStreet.$anyError"
        v-model.trim="$v.addressStreet.$model"
        class="input-large q-mt-lg"
        label="address"
      >
        <template v-slot:prepend>
          <q-icon color="primary" class="input-icon-large self-end q-pb-md" name="mdi-map-marker" />
        </template>
      </q-input>

      <div class="row justify-end">
        <address-builder class="col" v-model="addressJson" :location-id="locationId" />
      </div>

      <div class="q-mt-xl">
        <q-btn color="primary" icon="save" label="save" @click="saveChanges()" />
        <q-btn
          class="q-ml-sm"
          color="accent"
          icon="mdi-share-variant"
          label="share"
          @click="onShare()"
        />
      </div>

      <q-dialog v-model="confirmDelete" persistent>
        <q-card>
          <q-card-section class="row items-center">
            <q-icon name="mdi-trash-can-outline" />
            <span class="q-ml-sm">Please confirm deleting {{ this.location.title }}</span>
          </q-card-section>

          <q-card-actions align="right">
            <q-btn flat label="Cancel" color="primary" v-close-popup />
            <q-btn flat label="Delete" color="primary" @click.native="onDeleteLocation" />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>
  </q-page>
</template>

<script>
import { mapGetters } from 'vuex'
import { required } from 'vuelidate/lib/validators'
import AddressBuilder from '../AddressBuilder'

export default {
  name: 'MyLocationDetails',
  props: ['locationId'],
  data() {
    return {
      thisLocation: {},
      addressStreet: '',
      placeUser: null,
      imgURL: '/statics/placeholders/place-placeholder-large.jpg',
      placeType: null,
      placeTypes: [
        'residential property',
        'commercial property',
        'mixed use property',
        'indoor growing facility',
        'outdoor growing facility',
        'mixed growing facility',
        'community garden',
        'farm',
        'urban farm',
        'campus',
        'country club',
        'golf course',
        'lab',
        'other'
      ],
      addressJson: '',
      usersKeyword: '',
      confirmDelete: false
    }
  },
  components: { AddressBuilder },
  validations: {
    thisLocation: {
      title: { required }
    },
    addressStreet: { required },
    addressJson: { required },
    placeUser: {}
  },
  computed: {
    ...mapGetters({
      me: 'auth/currentUser'
    }),
    isAdminView() {
      const scope = this.getScope()
      return scope !== 'my'
    },
    usersList() {
      const users = this.$store.getters['users/all'].map(user => ({
        email: user.email,
        label: `${user.fname} ${user.lname}`,
        value: user.id
      }))
      if (this.usersKeyword !== '') {
        return users.filter(user => user.label.toLowerCase().indexOf(this.usersKeyword) > -1)
      }
      return users
    },
    location() {
      return this.$store.getters['locations/byId'](this.locationId)
    },
    devices() {
      return this.$store.getters['devices/byLocationId'](this.locationId)
    }
  },

  methods: {
    toTitleCase(str) {
      return str.replace(/\w\S*/g, function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
      })
    },
    getCurrentLocationData() {
      const owner = this.usersList.filter(user => user.value === this.location.owner_user_id)[0]
      if (owner) {
        this.placeUser = owner
      }
      this.thisLocation = Object.assign({}, this.location)
    },
    updateRouteMeta(m) {
      let meta = Object.assign(m, this.$route.meta)
      this.$root.$emit('update-route-meta', meta)
    },
    buildAddressJson() {
      this.addressJson.street = this.toTitleCase(this.addressStreet)
      this.thisLocation.address = this.addressJson
    },
    changePic() {
      this.$q.notify({
        color: 'red-5',
        textColor: 'white',
        icon: 'fas fa-exclamation-triangle',
        message: 'Function to be implemented...'
      })
    },
    onShare() {
      this.$router.push(`/my/places/${this.locationId}/share`)
    },
    saveChanges() {
      this.$root.$emit('validate-country-specific-address')
      this.$nextTick(() => {
        this.$v.$touch()

        if (this.$v.$error) {
          this.$q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'fas fa-exclamation-triangle',
            message: 'Please correct the errors above and try again'
          })
        } else {
          this.buildAddressJson()
          this.$api.patchLocation(this.me.id, this.locationId, this.thisLocation).then(
            () => {
              this.$q.notify({
                color: 'green-5',
                textColor: 'white',
                message: this.thisLocation.title + ' was successfully updated'
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
      })
    },
    getScope() {
      const route = this.$router.currentRoute
      if (route && route.fullPath.indexOf('/my/places') > -1) {
        return 'my'
      }
      return ''
    },
    filterUser(val, update) {
      this.usersKeyword = val.toLowerCase()
      update()
    },
    deletePlace() {
      // this.$store
      //   .dispatch('devices/loadDevices', {
      //     locationId: this.thisLocation.id
      //   })
      // .then(
      // () => {
      if (this.devices.length > 0) {
        this.$q.notify({
          color: 'yellow-5',
          textColor: 'red',
          icon: 'fas fa-exclamation-triangle',
          message: 'This place has SmartHub(s) allocated to it. Remove all SmartHubs from this place and then try again.'
        })
      } else {
        this.confirmDelete = true
      }
      // },
      // () => {}
      // )
    },
    onDeleteLocation() {
      this.$store
        .dispatch('locations/destroy', {
          locationId: this.location.id
        })
        .then(() => {
          this.$router.push({ path: '/locations' })
        })
    }
  },
  watch: {
    location() {
      if (this.location) {
        this.addressStreet = this.location.address.street
        return this.getCurrentLocationData()
      }
    }
  },
  created() {
    this.$root.$on('delete-place', this.deletePlace)

    const scope = this.getScope()
    if (scope === 'my') {
      this.updateRouteMeta({
        backButtonPath: `/my/places`
      })
    } else {
      // this.$store.dispatch('users/loadUsers')
      this.updateRouteMeta({
        backButtonPath: `/locations`
      })
    }
    if (this.location.address) this.addressStreet = this.location.address.street
    return this.getCurrentLocationData()
  },
  destroyed() {
    this.$root.$off('delete-place')
  }
}
</script>

<style lang="styl">
.input-large {
  font-size: 1.3rem;
}
</style>
