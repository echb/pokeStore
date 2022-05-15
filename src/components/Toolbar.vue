<template>
  <v-app-bar app color="white" flat>
    <v-avatar :color="$vuetify.breakpoint.smAndDown ? 'grey darken-1' : 'transparent'" size="32"></v-avatar>

    <v-tabs centered class="ml-n9" color="grey darken-1">
      <v-tab v-if="logged" to="/home">
        Home
      </v-tab>
      <v-tab v-if="logged" to="/home">
        Habilidades
      </v-tab>
      <v-tab v-if="!logged" to="/login">
        Iniciar sesión.
      </v-tab>
      <v-tab v-if="!logged" to="/signup">
        Registrarse
      </v-tab>
      <v-tab v-if="logged" to="/login" @click="handleLogOut">
        Cerrar sesión
      </v-tab>
    </v-tabs>

    <v-avatar class="hidden-sm-and-down" color="grey darken-1 shrink" size="32"></v-avatar>
  </v-app-bar>
</template>
<script>
import { logOut, authChanged } from '../store/auth.js'
import { pokeStore } from '../store/pokemonsStore.js'
import { authLogged } from '../store/auth.js'

export default {
  data: () => ({
    logged: authLogged
  }),
  methods: {
    handleLogOut: () => {
      pokeStore.removeLocalChoosenPokemons()
      pokeStore.removeLocalPokemons()
      logOut();
    }
  },
  mounted() {
    authChanged();
  },
}
</script>