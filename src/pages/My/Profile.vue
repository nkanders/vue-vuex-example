<template>
  <transition name="slide" appear>
    <q-layout>
      <q-page-container>
        <q-page class="user-details-block" padding v-if="slide">
          <div>
            <q-avatar size="200px" class="q-ma-xl">
              <img v-if="thisUser.avatar!=null" :src="thisUser.avatar">
              <v-gravatar :size="200" v-else :email="thisUser.email" default-img="mp"/>
            </q-avatar>
          </div>
          <edit-user
            v-model="thisUser"
            :disable="!editMode"></edit-user>
          <div v-if="changePasswordMode">
            <new-password v-model="thisUser.password" show-lock="true" input-class="text-black" hints-class="text-red"/>
          </div>
          <div class="q-pt-lg">
            <q-btn color="primary" icon="save" label="save changes" @click="saveChanges()"/>
            <q-btn v-if="!changePasswordMode" color="accent" icon="mdi-lock" class="q-ml-sm" label="change password"
                   @click="changePassword(true)"/>
            <q-btn v-if="changePasswordMode" color="red-4" icon="mdi-lock" class="q-ml-sm" label="cancel"
                   @click="changePassword(false)"/>
          </div>
        </q-page>
      </q-page-container>
    </q-layout>
  </transition>
</template>

<script>
import User from '../../components/editors/User'
import { mapGetters } from 'vuex'
import NewPassword from '../../components/NewPassword'
import Gravatar from 'vue-gravatar'

export default {
  name: 'MySettings',
  props: ['userId'],
  components: { 'edit-user': User, NewPassword, 'v-gravatar': Gravatar },
  data() {
    return {
      changePasswordMode: false,
      slide: true,
      editMode: true,
      thisUser: {}
    }
  },
  computed: {
    ...mapGetters({
      me: 'auth/currentUser'
    })
  },
  methods: {
    getCurrentUserData() {
      this.thisUser = Object.assign({}, this.me)
    },
    changePassword(mode) {
      this.changePasswordMode = mode
    },
    getErr(err) {
      this.err = err
    },
    saveChanges() {
      if (!this.thisUser || (this.changePasswordMode && this.user.password === '')) {
        this.$q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'fas fa-exclamation-triangle',
          message: 'Please correct the errors above and try again'
        })
      } else {
        this.changePasswordMode = false
        this.$store.dispatch('auth/updateCurrentUser', this.thisUser).then(
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
              message: 'Something went wrong. Don\'t worry, try submitting the form again. If the problem persists, please contact our customer service'
            })
          }
        )
      }
    }
  },
  watch: {
    me() { return this.getCurrentUserData() }
  },
  created() {
    return this.getCurrentUserData()
  }
}
</script>
