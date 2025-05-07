import { SimplePokemon } from "./pokemon";

export interface PokemonType {
  id: string;
  name: string;
}

export interface PokemonTypeResult {
  id: number;
  name: string;
  pokemon?: {
    pokemon: SimplePokemon;
  }[];
}

export interface Type {
  id: number;
  name: string;
  pokemons: SimplePokemon[];
}
