<template>
  <div>
    <q-list link inset-delimiter>
      <q-item class="bg-cyan-9">
        <q-item-section style="height: 90px">
          <q-item-label>
            <img class="full-width logo-padding" src="/statics/white_horiz.svg" />
          </q-item-label>
        </q-item-section>
      </q-item>

      <q-item v-if="me" clickable v-ripple class="q-py-lg" to="/my/settings">
        <q-item-section avatar>
          <q-avatar>
            <img v-if="me.avatar" :src="me.avatar" />
            <v-gravatar v-else :email="me.email" default-img="mp" />
          </q-avatar>
        </q-item-section>
        <q-item-section>
          <q-item-label class="text-bold text-grey-10">{{ me.fname }} {{ me.lname }}</q-item-label>
          <q-item-label caption>{{ me.email }}</q-item-label>
        </q-item-section>
      </q-item>
      <q-item class="bg-red-3 text-white q-pa-md" v-if="me && !me.is_confirmed">
        <q-btn
          class="q-ml-md"
          color="red-4"
          icon="mail"
          label="confirm email"
          @click="resendConfirmation()"
        >
          <q-tooltip
            content-class="bg-red-2 text-grey-9"
            content-style="font-size: 16px"
            :offset="[10, 10]"
          >To complete your account setup please confirm your email address</q-tooltip>
        </q-btn>
      </q-item>
      <q-separator />
      <q-item clickable v-ripple to="/dashboard">
        <q-item-section avatar>
          <q-icon name="mdi-monitor-dashboard" class="text-primary" />
        </q-item-section>
        <q-item-section>
          <q-item-label>Dashboard</q-item-label>
        </q-item-section>
      </q-item>
      <q-item clickable v-ripple to="/my/places">
        <q-item-section avatar>
          <q-icon name="home" class="text-primary" />
        </q-item-section>
        <q-item-section>
          <q-item-label>My Places</q-item-label>
        </q-item-section>
      </q-item>

      <q-separator />
      <q-item-label
        header
        class="menu-item-border"
        v-if="
      hasPerm('can_see_users') ||
      hasPerm('can_edit_users') ||
      hasPerm('can_see_locations') ||
      hasPerm('can_edit_locations') ||
      hasPerm('can_see_devices') ||
      hasPerm('can_edit_devices') ||
      hasPerm('can_see_device_softwares') ||
      hasPerm('can_edit_device_softwares') ||
      hasPerm('can_see_device_types') ||
      hasPerm('can_edit_device_types') ||
      hasPerm('can_see_device_models') ||
      hasPerm('can_edit_device_models')
      "
      >Admin Controls:</q-item-label>

      <q-item
        v-if="hasPerm('can_see_users') || hasPerm('can_edit_users')"
        clickable
        v-ripple
        to="/users"
      >
        <q-item-section avatar>
          <q-icon name="mdi-account-multiple" class="text-primary" />
        </q-item-section>

        <q-item-section>
          <q-item-label>Users</q-item-label>
          <!--<q-item-label caption>If you see it you are an admin</q-item-label>-->
        </q-item-section>
      </q-item>

      <q-item
        v-if="hasPerm('can_see_locations') || hasPerm('can_edit_locations')"
        clickable
        v-ripple
        to="/locations"
      >
        <q-item-section avatar>
          <q-icon name="mdi-pin" class="text-primary" />
        </q-item-section>

        <q-item-section>
          <q-item-label>Locations</q-item-label>
        </q-item-section>
      </q-item>

      <q-item
        v-if="hasPerm('can_see_devices') || hasPerm('can_edit_devices')"
        expand-separator
        clickable
        to="/devices"
        header-class="customclass"
      >
        <q-item-section avatar>
          <q-icon name="mdi-hubspot" class="text-primary" />
        </q-item-section>

        <q-item-section>
          <q-item-label>Smarthubs</q-item-label>
        </q-item-section>
      </q-item>

      <q-separator />

      <q-item clickable @click="confirm = true">
        <q-item-section avatar>
          <q-icon name="logout" class="text-primary" />
        </q-item-section>

        <q-item-section>
          <q-item-label>Sign Out</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>

    <q-dialog v-model="confirm" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="logout" color="primary" text-color="white" />
          <span class="q-ml-sm">You are about to sign out.</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Back" color="primary" v-close-popup />
          <q-btn flat label="Sign Out" color="primary" @click.native="logout" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Gravatar from 'vue-gravatar'

export default {
  data() {
    return {
      confirm: false
    }
  },
  components: { 'v-gravatar': Gravatar },
  computed: {
    ...mapGetters({
      me: 'auth/currentUser'
    })
  },
  methods: {
    logout() {
      this.$store.dispatch('auth/logout')
      this.$router.push({ path: '/login' })
    },
    hasPerm(perm) {
      return this.$store.getters['auth/hasPerm'](perm)
    },
    resendConfirmation() {
      this.$api.sendEmailConfirmation(this.me.id).then(
        () => {
          this.$q.notify({
            color: 'green-6',
            textColor: 'white',
            icon: 'fas fa-check-circle',
            message: 'Confirmation email resent to ' + this.me.email
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
    }
  }
}
</script>

<style lang="styl">
.customclass {
  .q-icon {
    color: #1697a6;
  }
}

.logo-padding {
  padding-left: 20px;
  padding-right: 27px;
}
</style>
