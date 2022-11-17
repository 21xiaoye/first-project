<template>
  <div id="app">
    <div>
      <Header></Header>
      <router-view></router-view>
      <Floor></Floor>
    </div>
  </div>
</template>

<script>
import Header from './components/Header.vue';
import Floor from './components/Floor.vue';
import {
  userinfo
} from './api/index'
export default {
  name: 'App',
  components: {
    Header,
    Floor
  },
  watch: {
    $route: {
      handler() {
        userinfo().then((res) => {
            if (res.code == 200) {
              this.$store.commit("USERINFO", res.data)
            }
        })
      }
    }
  },
}
</script>

<style>

</style>
