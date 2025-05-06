import { BASE_URL } from '../config';
import { SimpleType } from '../types/types';

export const getTypes = async (): Promise<SimpleType[]> => {
  const url = new URL(`${BASE_URL}type/`);
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