import { injectable, inject } from "tsyringe";
import { PokemonTypeResponse } from "../types/pokemon-type";
import { PokeApiService } from "./pokeapi";
import { PokeApiType } from "../types/pokeapi";

@injectable()
export class PokemonTypeService {
  constructor(
    @inject(PokeApiService)
    private pokeApiService: PokeApiService,
  ) {}

  async getTypes(): Promise<PokemonTypeResponse> {
    let allResults: PokeApiType[] = [];
    let offset = 0;
    const limit = 50;
    let hasNext = true;

    while (hasNext) {
      const data = await this.pokeApiService.getTypes(limit, offset);
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
