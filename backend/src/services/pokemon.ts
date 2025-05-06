import { BASE_URL } from '../config';
import { 
  SimplePokemon,
  Pokemon,
  StatResult,
  TypeResult,
  AbilitieResult,
  SimpleType,
  SimpleAbilitie,
  Filter
} from '../types/types';

export const getPokemons = async (): Promise<SimplePokemon[]> => {
  const url = new URL(`${BASE_URL}pokemon/`);
  url.searchParams.append('limit', '10000');
  const options = {
    method: 'GET',
  };
  
  try {
    const response = await fetch(url, options);
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.log('Error: ' + error);
    return [];
  }
};

export const getPokemonsByFilter = async (filter: Filter): Promise<SimplePokemon[]> => {
  let result: SimplePokemon[] = [];

  if (filter.abilities) {
    const abilitiesResults = await Promise.all(
      filter.abilities.map(async (ability) => {
        return await getPokemonByAbility(ability);
      })
    );
    result = result.concat(...abilitiesResults);
  }
  
  if (filter.types) {
    const typesResults = await Promise.all(
      filter.types.map(async (type) => {
        return await getPokemonByType(type);
      })
    );
    result = result.concat(...typesResults);
  }
  return result;
};

export const getPokemonByName = async (name: string): Promise<Pokemon | null> => {
  const url = new URL(`${BASE_URL}pokemon/${name}`);
  const options = {
    method: 'GET',
  };
  try {
    const response = await fetch(url, options);
    console.log('Response: ' + response);
    if (response.status === 200) {
      const data = await response.json();
      return {
        id: data.id,
        name: data.name,
        height: data.height,
        weight: data.weight,
        stats: data.stats.map((stat: StatResult) => ({
          base_stat: stat.base_stat,
          effort: stat.effort,
          name: stat.stat.name,
        })),
        types: data.types.map((type: {type: SimpleType}) => ({
          name: type.type.name,
          url: type.type.url,
        })),
        abilities: data.abilities.map((ability: {ability: SimpleAbilitie}) => ({
          name: ability.ability.name,
          url: ability.ability.url,
        })),
        sprites: data.sprites.other.dream_world.front_default,
      };
    } else {
      console.log('Error: ' + response.status);
      return null;
    }
  } catch (error) {
    console.log('Error: ' + error);
    return null;
  }
}

export const getPokemonByType = async (type: string): Promise<SimplePokemon[]> => {
  const url = new URL(`${BASE_URL}type/${type}`);
  const options = {
    method: 'GET',
  };
  
  try {
    const response = await fetch(url, options);
    const data = await response.json();
    return data.pokemon.map((pokemon: { pokemon: SimplePokemon }) => pokemon.pokemon);
  } catch (error) {
    console.log('Error: ' + error);
    return [];
  }
}

export const getPokemonByAbility = async (ability: string): Promise<SimplePokemon[]> => {
  const url = new URL(`${BASE_URL}ability/${ability}`);
  const options = {
    method: 'GET',
  };
  
  try {
    const response = await fetch(url, options);
    const data = await response.json();
    return data.pokemon.map((pokemon: { pokemon: SimplePokemon }) => pokemon.pokemon);
  } catch (error) {
    console.log('Error: ' + error);
    return [];
  }
}
