import { SimpleType } from "../types/types";
import { API_URL } from "./config";

export const getTypes = async (limit: number, offset: number): Promise<SimpleType[]> => {
  const url = new URL(`${API_URL}type/`);
  url.searchParams.append('limit', limit.toString());
  url.searchParams.append('offset', offset.toString());
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