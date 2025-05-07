import { container } from "tsyringe";
import { PokemonTypeService } from "./services/pokemon-type";
import { PokeApiService } from "./services/pokeapi";
import { AbilityService } from "./services/ability";

container.registerSingleton(PokeApiService);
container.registerSingleton(PokemonTypeService);
container.registerSingleton(AbilityService);

export { container };
