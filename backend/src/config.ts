function getRequiredEnv(key: string): string {
  const value = process.env[key];
  if (value === undefined) {
    throw new Error(`Required environment variable ${key} is not defined`);
  }
  return value;
}
interface Config {
  pokeapi_base_url: string;
  redis_url: string;
}

const config: Config = {
  pokeapi_base_url: "https://pokeapi.co/api/v2/",
  redis_url: getRequiredEnv("REDIS_URL"),
};

export default config;
