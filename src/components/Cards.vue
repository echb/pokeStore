<template>
  <v-col cols="12" sm="9">
    <v-row>
      <v-col v-for="pokemon in pokemons" :key="pokemon.name" cols="6" sm="4">
        <Card :pokemon="pokemon"></Card>
      </v-col>
    </v-row>
  </v-col>
</template>

<script>
import Card from './Card.vue'
export default {
  props: ['pokemons'],
  components: {
    'Card': Card
  }
}
</script>