import Vue from 'vue';

const pokeStore = Vue.observable({
  pokemons: [],

  setPokemons(pokemons) {
    this.pokemons = pokemons
  },

  setLocalPokemons(pokemons) {
    localStorage.setItem('pokemonsData', JSON.stringify(pokemons))
  },
  getLocalPokemons() {
    return JSON.parse(localStorage.getItem('pokemonsData'))
  },
});

Vue.prototype.$storePokemon = pokeStore