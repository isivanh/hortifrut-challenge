import config from "../config";
import {
  AbilityNotFoundError,
  ParsePokeApiResponseError,
  PokeApiError,
  PokemonNotFoundError,
  PokemonTypeNotFoundError,
  UnreachablePokeApiError,
} from "../error/error";
import {
  PokeApiAbilityResponse,
  PokeApiAllPokemonsResponse,
  PokeApiPokemonByAbilityResponse,
  PokeApiPokemonByTypeResponse,
  PokeApiPokemonDetail,
  PokeApiTypeResponse,
} from "../types/pokeapi";
import { inject, injectable } from "tsyringe";
import { RedisService } from "./redis-service";

const CACHE_TTL_SECONDS = 24 * 60 * 60;

@injectable()
export class PokeApiService {
  constructor(@inject(RedisService) private redisService: RedisService) {}

  async get<T>(
    endpoint: string,
    params?: Record<string, string | number>,
  ): Promise<T> {
    const url = new URL(endpoint, config.pokeapi_base_url);
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, value.toString());
      });
    }

    const cacheKey = `pokeapi:${url.pathname}${url.search}`;
    const cached = await this.redisService.get<T>(cacheKey);
    if (cached) {
      console.log("Cache hit for", cacheKey);
      return cached;
    }

    let response: Response;
    try {
      console.log("Cache miss for", cacheKey);
      response = await fetch(url.toString(), { method: "GET" });
    } catch {
      throw new UnreachablePokeApiError();
    }

    if (!response.ok) {
      throw new PokeApiError(response.status);
    }

    try {
      const data = (await response.json()) as T;
      await this.redisService.set(cacheKey, data, CACHE_TTL_SECONDS);
      return data;
    } catch {
      throw new ParsePokeApiResponseError();
    }
  }

  async getTypes(limit = 20, offset = 0): Promise<PokeApiTypeResponse> {
    const data = await this.get<PokeApiTypeResponse>("type", {
      limit: limit,
      offset: offset,
    });
    return data;
  }

  async getAbilities(limit = 20, offset = 0): Promise<PokeApiAbilityResponse> {
    const data = await this.get<PokeApiAbilityResponse>("ability", {
      limit: limit,
      offset: offset,
    });
    return data;
  }

  async getAllPokemons(
    limit = 20,
    offset = 0,
  ): Promise<PokeApiAllPokemonsResponse> {
    const data = await this.get<PokeApiAllPokemonsResponse>("pokemon", {
      limit: limit,
      offset: offset,
    });
    return data;
  }

  async getPokemonByType(type: string): Promise<PokeApiPokemonByTypeResponse> {
    try {
      const data = await this.get<PokeApiPokemonByTypeResponse>(`type/${type}`);
      return data;
    } catch (error) {
      if (error instanceof PokeApiError) {
        if (error.pokeApiStatusCode === 404) {
          throw new PokemonTypeNotFoundError(type);
        }
      }
      throw error;
    }
  }

  async getPokemonByAbility(
    ability: string,
  ): Promise<PokeApiPokemonByAbilityResponse> {
    try {
      const data = await this.get<PokeApiPokemonByAbilityResponse>(
        `ability/${ability}`,
      );
      return data;
    } catch (error) {
      if (error instanceof PokeApiError) {
        if (error.pokeApiStatusCode === 404) {
          throw new AbilityNotFoundError(ability);
        }
      }
      throw error;
    }
  }

  async getPokemonDetail(id: string): Promise<PokeApiPokemonDetail> {
    try {
      const data = await this.get<PokeApiPokemonDetail>(`pokemon/${id}`);
      return data;
    } catch (error) {
      if (error instanceof PokeApiError) {
        if (error.pokeApiStatusCode === 404) {
          throw new PokemonNotFoundError(id);
        }
      }
      throw error;
    }
  }
}
