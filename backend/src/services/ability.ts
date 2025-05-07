import config from '../config';
import { SimpleAbility } from '../types/abililty';


export const getAbilities = async (): Promise<SimpleAbility[]> => {
  const url = new URL(`${config.pokeapi_base_url}/ability/`);
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
}