export interface SimplePokemon{
  name: string,
  url: string
}

export interface SimpleType{
  name: string,
  url: string
}

export interface SimpleAbilitie{
  name: string,
  url: string
}
export interface Pokemon{
  id: number,
  name: string,
  height: number,
  weight: number,
  stats: Stat[],
  types: SimpleType[],
  abilities: SimpleAbilitie[],
  sprites: string,
}

export interface StatResult{
  base_stat: number,
  effort: number,
  stat: {
    name: string,
    url: string
  }
}

export interface Stat{
  base_stat: number,
  effort: number,
  name: string,
}

export interface TypeResult{
  id: number,
  name: string,
  pokemon?: {
    pokemon: SimplePokemon,
  }[],
}

export interface Type{
  id: number,
  name: string,
  pokemons: SimplePokemon[],
}

export interface AbilitieResult{
  id: number,
  name: string,
  pokemon: {
    pokemon: SimplePokemon,
  }[],
}

export interface Abilitie{
  id: number,
  name: string,
  pokemons: SimplePokemon[],
}

export interface Filter{
  limit: number,
  offset: number,
  abilities: string[] | null,
  types: string[] | null,
}