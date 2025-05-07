import config from "../config";
import {
  ParsePokeApiResponseError,
  PokeApiError,
  UnreachablePokeApiError,
} from "../error/error";
import { PokeApiAbilityResponse, PokeApiTypeResponse } from "../types/pokeapi";
import { injectable } from "tsyringe";

@injectable()
export class PokeApiService {
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
    let response: Response;

    try {
      response = await fetch(url.toString(), { method: "GET" });
    } catch {
      throw new UnreachablePokeApiError();
    }

    if (!response.ok) {
      throw new PokeApiError(response.status);
    }

    try {
      return (await response.json()) as T;
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
}
