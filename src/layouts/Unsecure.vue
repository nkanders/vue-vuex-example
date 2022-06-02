<template>
  <q-layout class="unsecure-layout">
    <div class="flex flex-center logo-container q-mb-lg">
      <a href="https://dripio.com">
        <img style="width:90px;" alt="Dripio logo" src="/statics/white_logo.svg" />
      </a>
    </div>
    <router-view :key="$route.fullPath" />
  </q-layout>
</template>

<script>
export default {
  name: 'UnsecureLayout',
  data() {
    return {}
  },
  computed: {}
}
</script>

<style lang="styl">
.unsecure-layout {
  padding-top: 10vh;
  padding-bottom: 5vh;
  background-color: #0a6064;
}
</style>
