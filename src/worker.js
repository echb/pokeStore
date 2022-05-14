import { getAllPokemon } from './store/pokemonService.js'


(async () => {
  const data = await getAllPokemon()
  self.postMessage({
    answer: data,
  })
})()
