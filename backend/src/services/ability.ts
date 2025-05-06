import { BASE_URL } from '../config';
import { SimpleAbilitie } from '../types/types';

export const getAbilities = async (): Promise<SimpleAbilitie[]> => {
  const url = new URL(`${BASE_URL}ability/`);
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