export interface PokemonFilterRequest {
  type: string | null;
  ability: string | null;
  page: number;
  pageSize: number;
}

export interface PokemonFilterResponse {
  total_pages: number;
  page: number;
  results: PokemonSummary[];
}

export interface PokemonSummary {
  id: string;
  name: string;
}

export interface PokemonDetailResponse {
  id: string;
  name: string;
  base_experience: number;
  height: number;
  weight: number;
  abilities: AbilitySummary[];
  types: TypeSummary[];
  moves: string[];
  stats: Stat[];
  sprites: Sprites;
}

export interface AbilitySummary {
  id: string;
  name: string;
}

export interface TypeSummary {
  id: string;
  name: string;
}

export interface Stat {
  name: string;
  base_stat: number;
  effort: number;
}

export interface Sprites {
  back_default: string | null;
  front_default: string | null;
  other: {
    dream_world: {
      front_default: string | null;
    };
    home: {
      front_default: string | null;
    };
    official_artwork: {
      front_default: string | null;
    };
  };
}
