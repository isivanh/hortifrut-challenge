import { SimplePokemon } from "./pokemon";

export interface SimpleAbility{
  name: string,
  url: string
}

export interface AbilityResult{
  id: number,
  name: string,
  pokemon: {
    pokemon: SimplePokemon,
  }[],
}

export interface Ability{
  id: number,
  name: string,
  pokemons: SimplePokemon[],
}