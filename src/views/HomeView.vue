<template>
  <v-row align="center" justify="center">
    <v-col cols="12">
      <div>
        <div>
          <v-select v-model="selected" :items="type" label="Pokemon Type" solo @change="filterByType"></v-select>
        </div>
      </div>
      <div>
        <div class="text-center" v-if="isLoading">
          <v-progress-circular indeterminate color="primary"></v-progress-circular>
        </div>
        <v-row v-else>
          <Content :pokemons="pokemons"></Content>
          <v-btn class="mx-2 toggle-tab" small fab dark color="indigo" @click="hideTab">
            <v-icon dark>
              mdi-pencil
            </v-icon>
          </v-btn>
          <ChoosenTable></ChoosenTable>
        </v-row>
      </div>
    </v-col>
  </v-row>
</template>

<script>
import Content from '../components/Content.vue'
import ChoosenTable from '../components/ChoosenTable.vue'

import { pokeStore } from '../store/pokemonsStore.js'
import { getPokemonTypes } from '../store/pokemonService.js'

import { bus } from '@/main'

export default {
  components: {
    'Content': Content,
    'ChoosenTable': ChoosenTable
  },
  data: () => ({
    selected: '',
    isLoading: true,
    pokemons: pokeStore.pokemons,
    type: [],
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
    reload() {
      if (!this.selected) return
      this.selected = ''

      this.loadAnimation()
      this.pokemons = pokeStore.pokemons
    },
    filterByType(pokemonType) {
      const filteredByType = pokeStore.pokemons.filter((pokemon) => {

        const type = pokemon.types.some(el => el.type.name == pokemonType)
        if (type) {
          return pokemon
        }
      })

      this.pokemons = filteredByType
    },
    async storePokemons() {
      const localPokemonsExits = pokeStore.getLocalPokemons()
      let pokemonsData

      if (!localPokemonsExits) {
        const worker = new Worker(new URL('../worker.js', import.meta.url));
        worker.onmessage = ({ data: { answer } }) => {
          pokemonsData = answer
          pokeStore.setPokemons(pokemonsData)
          pokeStore.setLocalPokemons(pokemonsData)
          this.pokemons = pokeStore.pokemons
          this.isLoading = false
        };
        return
      }

      pokeStore.setPokemons(localPokemonsExits)
      this.pokemons = pokeStore.pokemons
      this.loadAnimation()
    }
  },
  created() {
    bus.$on('reload', () => {
      this.reload()
    })
  },
  async mounted() {
    this.type = await getPokemonTypes()
    await this.storePokemons()
  }
}
</script>