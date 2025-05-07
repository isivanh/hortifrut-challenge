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
