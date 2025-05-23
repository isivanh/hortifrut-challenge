import { PokemonDetail, SimplePokemon } from "../types/types";
import { API_URL } from "./config";

export const getPokemonByName = async (name: string): Promise<PokemonDetail | null> => {
  const url = new URL(`${API_URL}pokemon/${name}`);
  const options = {
    method: 'GET',
  };
  try {
    const response = await fetch(url, options);
    const data = await response.json();
    return data;
  } catch {
    return null;
  }
}

export const getPokemons = async (page_size: number, page: number): Promise< SimplePokemon[]> => {
  const url = new URL(`${API_URL}pokemon/`);
  url.searchParams.append('page', page.toString());
  url.searchParams.append('page_size', page_size.toString());
  const options = {
    method: 'GET',
  };
  try {
    const response = await fetch(url, options);
    const data = await response.json();
    return data.results;
  } catch {
    return [];
  }
}

export const getPokemonsByFilter = async (
  page_size: number = 10,
  page: number = 1,
  types?: number,
  abilities?: number
): Promise< { 
  page: number, total_pages: number, pokemons: SimplePokemon[] 
}> => {
  const url = new URL(`${API_URL}pokemon/`);
  url.searchParams.append('page_size', page_size.toString());
  url.searchParams.append('page', page.toString());
  if (types) {
    url.searchParams.append('type', types.toString());
  }
  if (abilities) {
    url.searchParams.append('ability', abilities.toString());
  }
  const options = {
    method: 'GET',
  };
  try {
    const response = await fetch(url, options);
    const data = await response.json();
    return { page: data.page, total_pages: data.total_pages, pokemons: data.results };
  } catch {
    return { page: 0, total_pages: 0, pokemons: [] };
  }
}