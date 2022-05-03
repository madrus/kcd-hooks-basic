import { useState, Suspense, FormEvent } from 'react'
import fetchPokemon from './fetchPokemon'

const cache: Record<string, any> = {}

const PokemonInfo = ({ pokemonName }: { pokemonName: string }) => {
  const pokemon = cache[pokemonName]
  if (pokemon === undefined) {
    // the trick to throw a promise here is to make Suspense kick in its fallback
    // until the pokemon is fetched, and then put its info in the cache
    throw fetchPokemon(pokemonName).then((p) => (cache[pokemonName] = p))
  }
  return <pre>{JSON.stringify(pokemon || 'Unknown', null, 2)}</pre>
}

const PokemonFinder = () => {
  const [pokemonName, setPokemonName] = useState<string | null>(null)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setPokemonName(e.currentTarget.elements.pokemonName.value)
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="pokemonName-input">
          Pokemon Name (i.e. Pikachu or Dragonite)
        </label>
        <input id="pokemonName-input" name="pokemonName" />
        <button type="submit">Submit</button>
      </form>
      <div>
        {pokemonName ? (
          <Suspense fallback={<div>loading...</div>}>
            <PokemonInfo pokemonName={pokemonName} />
          </Suspense>
        ) : null}
      </div>
    </div>
  )
}

export default PokemonFinder
