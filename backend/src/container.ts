import { container } from "tsyringe";
import { PokemonTypeService } from "./services/pokemon-type";
import { PokeApiService } from "./services/pokeapi";
import { AbilityService } from "./services/ability";
import { RedisService } from "./services/redis-service";

container.registerSingleton(PokeApiService);
container.registerSingleton(PokemonTypeService);
container.registerSingleton(AbilityService);
container.registerSingleton(RedisService);

export { container };
