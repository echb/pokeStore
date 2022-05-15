import axios from "axios"

const getPokeApi = () => {
  const baseUrl = 'https://pokeapi.co/api/v2/'
  return async (path) => {
    return await axios.get(baseUrl + path)
  }
}

const url = getPokeApi()

const getAllPokemon = async (start = 0, end = 12) => {
  try {
    const { data: { results } } = await url(`pokemon?limit=100000&offset=0`)

    const allPokemons = await Promise.all(
      results.map(async (pokemon) => {
        const { data } = await url(`pokemon/${pokemon.name}`)
        return {
          name: data.name,
          image: data.sprites.other.dream_world.front_default,
          types: data.types
        }
      })
    )
    return allPokemons
  } catch (error) {
    console.log(error);

  }
}

const getPokemonById = async (pokemonId) => {
  try {
    const { data } = await url(`pokemon/${pokemonId}`)

    return data
  } catch (error) {
    console.log(error);
    return false
  }
}


const getPokemonTypes = async () => {
  try {
    const { data: { results } } = await url(`type`)

    const formatedPokeTypes = results.map((type) => {
      return {
        text: type.name,
        value: type.name
      }
    })
    return formatedPokeTypes
  } catch (error) {
    console.log(error);
    return false
  }

}


export {
  getAllPokemon,
  getPokemonById,
  getPokemonTypes
}