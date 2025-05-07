export interface SimplePokemon{
  name: string,
  url: string
}

export interface Stat{
  base_stat: number,
  effort: number,
  name: string,
}

export interface Pokemon{
  id: number,
  name: string,
  height: number,
  weight: number,
  stats: Stat[],
  // types: PokemonType[],
  // abilities: SimpleAbility[],
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

export interface Filter{
  limit: number,
  offset: number,
  abilities: string[] | null,
  types: string[] | null,
}