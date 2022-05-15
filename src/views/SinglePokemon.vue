<template>
  <v-row>
    <v-col cols="12">
      <v-card rounded="lg" min-height="268" class="capital" :color="pokemon.types[0].type.name">
        <v-img height="250" :src="pokemon.sprites.other.dream_world.front_default" aspect-ratio="2" contain></v-img>
        <v-card-title> {{ pokemon.name }} </v-card-title>
        <v-card-text :class="pokemon.types[0].type.name">
          Height: {{ pokemon.height }}
          Weight: {{ pokemon.weight }}
          <v-chip-group column>
            <v-chip :color="pokeType.type.name" v-for="pokeType in pokemon.types" :key="pokeType.type.name">{{
                pokeType.type.name
            }}
            </v-chip>
          </v-chip-group>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>


<script>
import { getPokemonById } from "@/store/pokemonService"

export default {
  data: () => ({
    id: null,
    pokemon: []
  }),
  async created() {
    this.pokemon = await getPokemonById(this.$route.params.id)
    this.id = this.$route.params.id
  }
}
</script>