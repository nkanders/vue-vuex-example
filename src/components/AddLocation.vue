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

    <div class="q-mx-lg q-mt-lg">
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
        <address-builder class="col" v-model="addressJson" />
      </div>

      <div class="q-mt-xl q-gutter-sm">
        <q-btn color="primary" icon="mdi-plus" label="Create" @click="create()" />
        <q-btn color="primary" icon="mdi-cancel" label="Cancel" @click="cancel()" />
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapGetters } from 'vuex'
import { required } from 'vuelidate/lib/validators'
import AddressBuilder from './AddressBuilder'

export default {
  name: 'AddLocation',
  props: ['currentUserScoped'],
  data() {
    return {
      thisLocation: {
        title: '',
        placeType: ''
      },
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
      usersKeyword: ''
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
    }
  },

  methods: {
    toTitleCase(str) {
      return str.replace(/\w\S*/g, function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
      })
    },
    updateRouteMeta(m) {
      let meta = Object.assign(m, this.$route.meta)
      this.$root.$emit('update-route-meta', meta)
    },
    buildAddressJson() {
      this.addressJson.street = this.toTitleCase(this.addressStreet)
      this.thisLocation.address = this.addressJson
    },
    getLocationUser() {
      const scope = this.getScope()
      if (scope === 'my') {
        return this.me.id
      }
      return this.placeUser.value || null
    },
    changePic() {
      this.$q.notify({
        color: 'red-5',
        textColor: 'white',
        icon: 'fas fa-exclamation-triangle',
        message: 'Function to be implemented...'
      })
    },
    createLocation(data) {
      const userId = this.getLocationUser()
      this.$store.dispatch('locations/create', { userId, data }).then(() => {
        const scope = this.getScope()
        if (scope === 'my') {
          this.$router.push({ path: `/my/places` })
        } else {
          this.$router.push({ path: `/locations` })
        }
      })
    },
    cancel() {
      const scope = this.getScope()
      if (scope === 'my') {
        this.$router.push({ path: `/my/places` })
      } else {
        this.$router.push({ path: `/locations` })
      }
    },
    create() {
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
          this.createLocation(this.thisLocation)
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
    }
  },
  created() {
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
  }
}
</script>

<style lang="styl">
.input-large {
  font-size: 1.3rem;
}
</style>
