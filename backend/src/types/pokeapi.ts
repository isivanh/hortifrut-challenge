export interface PokeApiTypeResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokeApiType[];
}

export interface PokeApiType {
  url: string;
  name: string;
}

export interface PokeApiAbilityResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokeApiAbility[];
}

export interface PokeApiAbility {
  url: string;
  name: string;
}

export interface PokeApiPokemonByTypeResponse {
  id: number;
  name: string;
  pokemon: PokeApiPokemonEntry[];
}

export interface PokeApiPokemonByAbilityResponse {
  id: number;
  name: string;
  pokemon: PokeApiPokemonEntry[];
}

export interface PokeApiPokemonEntry {
  slot: number;
  pokemon: {
    name: string;
    url: string;
  };
}

export interface PokeApiAllPokemonsResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokeApiPokemonSummary[];
}

export interface PokeApiPokemonSummary {
  name: string;
  url: string;
}

export interface PokeApiPokemonDetail {
  id: number;
  abilities: PokeApiAbilityEntry[];
  base_experience: number;
  height: number;
  moves: PokeApiMoveEntry[];
  name: string;
  sprites: PokeApiSprites;
  stats: PokeApiStatEntry[];
  types: PokeApiTypeEntry[];
  weight: number;
}
export interface PokeApiAbilityEntry {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
  slot: number;
}

export interface PokeApiMoveEntry {
  move: {
    name: string;
    url: string;
  };
}

export interface PokeApiSprites {
  back_default: string | null;
  back_female: string | null;
  front_default: string | null;
  front_female: string | null;
  other: {
    dream_world: {
      front_default: string | null;
      front_female: string | null;
    };
    home: {
      front_default: string | null;
      front_female: string | null;
    };
    official_artwork: {
      front_default: string | null;
    };
    showdown: {
      back_default: string | null;
      back_female: string | null;
      front_default: string | null;
      front_female: string | null;
    };
  };
}

export interface PokeApiStatEntry {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
}

export interface PokeApiTypeEntry {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}
