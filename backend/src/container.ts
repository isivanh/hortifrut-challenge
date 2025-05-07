import { container } from "tsyringe";
import { PokemonTypeService } from "./services/pokemon-type";
import { PokeApiService } from "./services/pokeapi";

container.registerSingleton(PokeApiService);
container.registerSingleton(PokemonTypeService);

export { container };
