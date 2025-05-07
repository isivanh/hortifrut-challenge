import {
  PokemonDetailResponse,
  PokemonFilterRequest,
  PokemonFilterResponse,
  PokemonSummary,
} from "../types/pokemon";
import { injectable, inject } from "tsyringe";
import { PokeApiService } from "./pokeapi";
import {
  PokeApiAbilityEntry,
  PokeApiMoveEntry,
  PokeApiPokemonEntry,
  PokeApiStatEntry,
  PokeApiTypeEntry,
} from "../types/pokeapi";

@injectable()
export class PokemonService {
  constructor(
    @inject(PokeApiService)
    private pokeApiService: PokeApiService,
  ) {}

  async getPokemonsByFilter(
    filters: PokemonFilterRequest,
  ): Promise<PokemonFilterResponse> {
    if (!filters.ability && !filters.type) {
      const offset = (filters.page - 1) * filters.pageSize;
      const allPokemonsResponse = await this.pokeApiService.getAllPokemons(
        filters.pageSize,
        offset,
      );
      const totalPages = Math.ceil(
        allPokemonsResponse.count / filters.pageSize,
      );
      return {
        total_pages: totalPages,
        page: filters.page,
        results: allPokemonsResponse.results.map((pokemon) => ({
          id: pokemon.url.split("/").slice(-2)[0],
          name: pokemon.name,
        })),
      };
    }

    let pokemonsByAbilityEntries: PokeApiPokemonEntry[] = [];
    let pokemonsByTypeEntries: PokeApiPokemonEntry[] = [];

    if (filters.ability) {
      const pokemonsByAbilityResponse =
        await this.pokeApiService.getPokemonByAbility(filters.ability);
      pokemonsByAbilityEntries = pokemonsByAbilityResponse.pokemon;
    }
    if (filters.type) {
      const pokemonsByTypeResponse = await this.pokeApiService.getPokemonByType(
        filters.type,
      );
      pokemonsByTypeEntries = pokemonsByTypeResponse.pokemon;
    }

    let filteredPokemons: PokemonSummary[] = [];
    if (filters.ability && filters.type) {
      const abilityNames = new Set(
        pokemonsByAbilityEntries.map((entry) => entry.pokemon.name),
      );
      filteredPokemons = pokemonsByTypeEntries
        .filter((pokemon) => abilityNames.has(pokemon.pokemon.name))
        .map((pokemon) => ({
          id: pokemon.pokemon.url.split("/").slice(-2)[0],
          name: pokemon.pokemon.name,
        }));
    } else if (filters.ability) {
      filteredPokemons = pokemonsByAbilityEntries.map((pokemon) => ({
        id: pokemon.pokemon.url.split("/").slice(-2)[0],
        name: pokemon.pokemon.name,
      }));
    } else if (filters.type) {
      filteredPokemons = pokemonsByTypeEntries.map((pokemon) => ({
        id: pokemon.pokemon.url.split("/").slice(-2)[0],
        name: pokemon.pokemon.name,
      }));
    }
    const totalPages = Math.ceil(filteredPokemons.length / filters.pageSize);
    return {
      total_pages: totalPages,
      page: filters.page,
      results: filteredPokemons.slice(
        (filters.page - 1) * filters.pageSize,
        filters.page * filters.pageSize,
      ),
    };
  }

  async getPokemonDetailById(id: string): Promise<PokemonDetailResponse> {
    const pokemonDetail = await this.pokeApiService.getPokemonDetail(id);
    return {
      id: pokemonDetail.id.toString(),
      name: pokemonDetail.name,
      base_experience: pokemonDetail.base_experience,
      height: pokemonDetail.height,
      weight: pokemonDetail.weight,
      abilities: pokemonDetail.abilities.map(
        (ability: PokeApiAbilityEntry) => ({
          name: ability.ability.name,
          id: ability.ability.url.split("/").slice(-2)[0],
        }),
      ),
      types: pokemonDetail.types.map((type: PokeApiTypeEntry) => ({
        id: type.type.url.split("/").slice(-2)[0],
        name: type.type.name,
      })),
      moves: pokemonDetail.moves.map(
        (move: PokeApiMoveEntry) => move.move.name,
      ),
      stats: pokemonDetail.stats.map((stat: PokeApiStatEntry) => ({
        base_stat: stat.base_stat,
        effort: stat.effort,
        name: stat.stat.name,
      })),
      sprites: {
        back_default: pokemonDetail.sprites.back_default ?? null,
        front_default: pokemonDetail.sprites.front_default ?? null,
        other: {
          dream_world: {
            front_default:
              pokemonDetail.sprites.other?.dream_world?.front_default ?? null,
          },
          home: {
            front_default:
              pokemonDetail.sprites.other?.home?.front_default ?? null,
          },
          official_artwork: {
            front_default:
              pokemonDetail.sprites.other?.official_artwork?.front_default ??
              null,
          },
        },
      },
    };
  }
}
