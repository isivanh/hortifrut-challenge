export class ApiError extends Error {
  constructor(
    public statusCode: number,
    message: string,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export class UnreachablePokeApiError extends ApiError {
  constructor() {
    super(500, `Failed to reach PokeAPI`);
  }
}

export class PokeApiError extends ApiError {
  constructor(pokeApiStatusCode: number) {
    super(500, `PokeAPI returned ${pokeApiStatusCode} status code`);
  }
}

export class ParsePokeApiResponseError extends ApiError {
  constructor() {
    super(500, `Failed to parse PokeAPI response to JSON`);
  }
}
