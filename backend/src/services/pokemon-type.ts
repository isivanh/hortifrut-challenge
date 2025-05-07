import config from "../config";
import { PokemonType } from "../types/pokemon-type";

export const getTypes = async (): Promise<PokemonType[]> => {
  const url = new URL(`${config.pokeapi_base_url}/type/`);
  const options = {
    method: "GET",
  };
  try {
    const response = await fetch(url, options);
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.log("Error: " + error);
    return [];
  }
};
