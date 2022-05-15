<template>
  <v-card height="280" class="card">
    <v-img lazy-src="https://picsum.photos/id/11/10/6" max-height="150" max-width="250" :src="pokemon.image"></v-img>
    <v-card-title>
      {{ pokemon.name }}
    </v-card-title>
    <div class="pokemon-button">
      <v-btn elevation="2" rounded x-small :to="`/pokemon/${pokemon.name}`">Ver Pokemon</v-btn>
      <v-btn elevation="2" rounded x-small @click="addPokemon(pokemon.name)">Agregar Pokemon</v-btn>
    </div>
  </v-card>
</template>

<script>
import { bus } from "@/main"

export default {
  props: ['pokemon'],
  methods: {
    addPokemon(pokemon) {
      bus.$emit('addPokemon', pokemon)
    }
  }
}
</script>