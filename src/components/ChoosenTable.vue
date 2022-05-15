<template>
  <v-col cols="12" sm="3" class="tab">
    <v-sheet rounded="lg" min-height="268" class="floating">
      <div class="table-events">
        <v-btn elevation="2" icon small tile block @click="reload">
          <v-icon color="green">
            mdi-reload
          </v-icon>
        </v-btn>
        <v-btn elevation="2" icon small tile block @click="removeAll">
          <v-icon color="red">
            mdi-delete
          </v-icon>
        </v-btn>
      </div>
      <v-simple-table height="65vh">
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">
                Nombre
              </th>
              <th class="text-left">
                Quitar Pokemon
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(pokemon, index) in choosenPokemons" :key="index">
              <td>{{ pokemon.name }}</td>
              <td>
                <v-btn color="error" elevation="2" rounded x-small @click="deletePokemon(index)">Remove</v-btn>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-sheet>
  </v-col>
</template>

<script>
import { bus } from "@/main"

export default {
  data: () => ({
    choosenPokemons: [],
  }),
  methods: {
    removeAll() {
      if (this.choosenPokemons == []) return
      this.choosenPokemons = []
    },
    reload() {
      bus.$emit('reload')
    },
    deletePokemon(index) {
      this.choosenPokemons.splice(index, 1)
    },
    addPokemon(pokemon) {
      this.choosenPokemons.push({ name: pokemon })
    }
  },
  created() {
    bus.$on('addPokemon', (data) => {
      this.addPokemon(data)
    })
  }
}
</script>
