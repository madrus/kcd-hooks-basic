import type { Query } from '@favware/graphql-pokemon'

interface GraphQLPokemonResponse<K extends keyof Omit<Query, '__typename'>> {
  data: Record<K, Omit<Query[K], '__typename'>>
}

const fetchPokemon = (name: string) => {
  const pokemonQuery = `
    query pokemon ($name: String) {
      pokemon(name: $name) {
        id
        number
        name
        attacks {
          special {
            name
            type
            damage
          }
        }
      }
    }
  `

  return window
    .fetch('https://graphql-pokemon2.vercel.app/', {
      // learn more about this API here: https://wayfair.github.io/dociql/
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ query: pokemonQuery, variables: { name } })
    })
    .then((r) => r.json() as Promise<GraphQLPokemonResponse<'getPokemon'>>)
    .then((json) => json.data)
}

export default fetchPokemon
