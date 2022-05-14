<template>
  <v-row align="center" justify="center">
    <v-col cols="12">
      <div>
        <div>
          <v-select v-model="selected" :items="items" label="Solo field" solo @change="filterByType"></v-select>
          {{ selected }}
        </div>
      </div>
      <div>
        <div class="text-center" v-if="isLoading">
          <v-progress-circular indeterminate color="primary"></v-progress-circular>
        </div>
        <v-row v-else>
          <v-col cols="12" sm="9">
            <v-row>
              <v-col v-for="pokemon in pokemons" :key="pokemon.name" cols="6" sm="4">
                <v-card height="280">
                  <v-card-title>
                    {{ pokemon.name }}
                  </v-card-title>
                  <div class="pokemon-button">
                    <v-btn elevation="2" rounded x-small>Ver Pokemon</v-btn>
                    <v-btn elevation="2" rounded x-small @click="addPokemon(pokemon.name)">Agregar Pokemon</v-btn>
                  </div>
                </v-card>
              </v-col>
            </v-row>
          </v-col>

          <v-btn class="mx-2 toggle-tab" small fab dark color="indigo" @click="hideTab">
            <v-icon dark>
              mdi-pencil
            </v-icon>
          </v-btn>

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
                      <td><button @click="deletePokemon(index)">Remove</button></td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </v-sheet>
          </v-col>
          <div class="text-center">

          </div>
        </v-row>

      </div>
    </v-col>
  </v-row>

</template>

<script>
import '../store/pokemonsStore.js'
import { getPokemonById, getPokemonTypes } from '../store/pokemonService.js'

export default {
  data: () => ({
    selected: '',
    isLoading: true,
    pokemons: [],
    items: [
      {
        text: 'normal',
        value: 'normal'
      }
    ],
    choosenPokemons: [],
    isActive: false,
  }),
  methods: {
    hideTab() {
      const toggleTab = document.querySelector('.toggle-tab')
      const tab = document.querySelector('.tab')
      tab.classList.toggle('tab-active')
      toggleTab.classList.toggle('toggle-tab-active')
    },
    loadAnimation() {
      this.isLoading = true
      setTimeout(() => {
        this.isLoading = false
      }, 1000);
    },
    removeAll() {
      if (this.choosenPokemons == []) return
      this.choosenPokemons = []
    },
    reload() {
      if (!this.selected) return

      this.loadAnimation()
      this.pokemons = this.$storePokemon.pokemons
    },
    addPokemon(pokemon) {
      this.choosenPokemons.push({ name: pokemon })
    },
    deletePokemon(index) {
      this.choosenPokemons.splice(index, 1)
    },
    filterByType(pokemonType) {
      const filteredByType = this.$storePokemon.pokemons.filter((pokemon) => {

        const type = pokemon.types.some(el => el.type.name == pokemonType)
        if (type) {
          return pokemon
        }
      })

      this.pokemons = filteredByType
    },
    async storePokemons() {
      const localPokemonsExits = this.$storePokemon.getLocalPokemons()
      let pokemonsData

      if (!localPokemonsExits) {
        // pokemonsData = await getAllPokemon()
        const worker = new Worker(new URL('../worker.js', import.meta.url));
        worker.onmessage = ({ data: { answer } }) => {
          pokemonsData = answer
          this.$storePokemon.setPokemons(pokemonsData)
          this.$storePokemon.setLocalPokemons(pokemonsData)
          this.pokemons = this.$storePokemon.pokemons
          this.isLoading = false
        };
        return
      }

      this.$storePokemon.setPokemons(localPokemonsExits)
      this.pokemons = this.$storePokemon.pokemons


      this.loadAnimation()
    }
  },
  computed: {
  },
  async mounted() {
    this.items = await getPokemonTypes()
    await this.storePokemons()
  }
}
</script>


<style>
.toggle-tab {
  display: none;
  transition: transform .4s ease-out;
}

.floating {
  position: sticky;
  top: 70px;
  overflow-y: scroll;
  height: 70vh;
}

.table-events {
  display: flex;
  justify-content: space-around;
}

.table-events button {
  min-width: 20px !important;
}


@media screen and (max-width: 1264px) {
  .pokemon-button {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .pokemon-button button:first-child {
    margin-bottom: 10px;
  }
}

@media screen and (max-width: 600px) {
  .toggle-tab {
    display: initial;
    margin-bottom: 10px;
    position: fixed;
    right: 0;
    z-index: 2;
    bottom: 0;
  }

  .toggle-tab-active {
    z-index: 2;
    transform: translateY(-70vh);
  }

  .tab {
    position: fixed;
    height: 70vh;
    bottom: 0;
    transition: transform .4s ease-out;
    transform: translateY(70vh);
  }


  .tab-active {
    transform: translateY(0);

  }

  .tab-hide {
    /* transition: transform .4s ease-out;
    position: fixed;
    bottom: 0;
    height: 70vh; */
  }

}
</style>