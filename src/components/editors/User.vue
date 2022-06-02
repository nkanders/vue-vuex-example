<template>
  <div v-if="value">
    <q-input
      :error="$v.value.fname.$anyError"
      :value="value.fname"
      @change="onChange"
      v-model.trim="value.fname"
      class="input-large"
      :disable="disable"
      data-test="fname"
      label="first name"
    >
      <template v-slot:prepend>
        <q-icon color="primary" class="input-icon-large self-end q-pb-md" name="mdi-account" />
      </template>
    </q-input>
    <q-input
      :error="$v.value.lname.$anyError"
      :value="value.lname"
      @change="onChange"
      v-model.trim="value.lname"
      class="input-large"
      :disable="disable"
      data-test="lname"
      label="last name"
    >
      <template v-slot:prepend>
        <q-icon
          color="primary"
          class="input-icon-large self-end q-pb-md"
          name="mdi-account-multiple"
        />
      </template>
    </q-input>
    <q-input
      v-model.trim="value.id"
      class="input-large q-field--with-bottom"
      label="user id"
      data-test="user-id"
      :disable="true"
    >
      <template v-slot:prepend>
        <q-icon color="primary" class="input-icon-large self-end q-pb-md" name="mdi-account-key" />
      </template>
    </q-input>
    <q-input
      :error="$v.value.email.$anyError"
      :value="value.email"
      @change="onChange"
      v-model.trim="value.email"
      class="input-large"
      data-test="email"
      :disable="disable"
      label="email"
    >
      <template v-slot:prepend>
        <q-icon color="primary" class="input-icon-large self-end q-pb-md" name="mdi-email" />
      </template>
    </q-input>
  </div>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators'

export default {
  name: 'editUser',
  props: ['disable', 'value'],
  data: function() {
    return {
      hasLocations: false
    }
  },
  validations: {
    value: {
      fname: { required },
      lname: { required },
      email: { required, email }
    }
  },
  computed: {
    permissions() {
      return this.$store.getters['auth/permissions']
    }
  },
  methods: {
    getLocationTitle(id) {
      return this.$store.getters['locations/byId'](id).title || id
    },
    hasPerm(perm) {
      return this.$store.getters['auth/hasPerm'](perm)
    },
    onChange() {
      this.$v.$touch()
      if (this.$v.value.fname.$anyError || this.$v.value.lname.$anyError || this.$v.value.email.$anyError) {
        this.$emit('input', null)
      } else {
        this.$emit('input', this.value)
      }
    }
  }
}
</script>

<style lang="stylus">
.input-large {
  font-size: 1.3rem;
}

.input-icon-large {
  font-size: 1.6rem;
}

.hints {
  max-width: 400px;
  padding: 0.5em;
  font-size: 1.1em;
  color: red;

  h2 {
    margin: 0.5em 0 0.2em 0;
  }

  p {
    margin: 0;
    padding-left: 1em;

    &::before {
      content: '---';
      font-size: 0.4em;
      margin-right: 6px;
      display: inline-block;
    }
  }
}

.hint {
  &-enter {
    opacity: 0;
    transform: translate3d(-20px, 0, 0);
  }

  &-leave-to {
    opacity: 0;
    transform: translate3d(0, 20px, 0);
  }

  &-enter-active {
    transition: 300ms;
  }

  &-leave-active {
    transition: 400ms;
  }
}

.user-details-block {
  background-color: #ffffff;
}

body {
  background-color: white;
}
</style>
