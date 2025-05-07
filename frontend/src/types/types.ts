export enum KindFilter {
  NAME,
  TYPE,
  ABILITY,
}
export interface SimplePokemon {
  name: string;
  id: number;
}
export interface Pokemon{
  id: number,
  name: string,
  height: number,
  weight: number,
  stats: Stat[],
  types: SimpleType[],
  abilities: SimpleAbility[],
  sprites: string,
}

export interface Stat{
  base_stat: number,
  effort: number,
  name: string,
}

export interface SimpleType{
  name: string,
  id: number
}

export interface SimpleAbility{
  name: string,
  id: number
}

export interface PokemonDetail {
  name: string;
  height: number;
  weight: number;
  stats: { base_stat: number; name: string }[];
  types: { id: string; name: string }[];
  abilities: { id: string; name: string }[];
}