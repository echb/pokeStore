<template>
  <v-app id="inspire">
    <Toolbar></Toolbar>
    <v-main class="grey lighten-3">
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Toolbar from './components/Toolbar.vue'

export default {
  components: { 'Toolbar': Toolbar }
}
</script>