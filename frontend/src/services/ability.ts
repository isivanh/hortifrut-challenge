import { SimpleAbility } from "../types/types";
import { API_URL } from "./config";

export const getAbilities = async (limit: number, offset: number): Promise<SimpleAbility[]> => {
  const url = new URL(`${API_URL}ability/`);
  url.searchParams.append('limit', limit.toString());
  url.searchParams.append('offset', offset.toString());
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