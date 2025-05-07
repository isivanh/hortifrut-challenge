import { injectable, inject } from "tsyringe";
import { PokemonTypeResponse } from "../types/pokemon-type";
import { PokeApiService } from "./pokeapi";
import { PokeApiAbility } from "../types/pokeapi";

@injectable()
export class AbilityService {
  constructor(
    @inject(PokeApiService)
    private pokeApiService: PokeApiService,
  ) {}

  async getAbilities(): Promise<PokemonTypeResponse> {
    let allResults: PokeApiAbility[] = [];
    let offset = 0;
    const limit = 10;
    let hasNext = true;

    while (hasNext) {
      const data = await this.pokeApiService.getAbilities(limit, offset);
      allResults = allResults.concat(data.results);
      hasNext = data.next !== null;
      offset += limit;
    }

    return {
      results: allResults.map((result) => ({
        name: result.name,
        id: result.url.split("/").slice(-2)[0],
      })),
    };
  }
}
