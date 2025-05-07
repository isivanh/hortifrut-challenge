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
