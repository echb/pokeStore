import Vue from 'vue';

const pokeStore = Vue.observable({
  pokemons: [],
  pokemonsChoosen: [],

  setPokemons(pokemons) {
    this.pokemons = pokemons
  },
  setLocalPokemons(pokemons) {
    localStorage.setItem('pokemonsData', JSON.stringify(pokemons))
  },
  getLocalPokemons() {
    return JSON.parse(localStorage.getItem('pokemonsData'))
  },
  removeLocalChoosenPokemons() {
    this.pokemonsChoosen = []
  },
  removeLocalPokemons() {
    localStorage.removeItem('pokemonsData')
  }
});


export {
  pokeStore,
}