import type { $Fetch } from "ofetch";
import type { Pokemon, PokemonDetails } from "./types";

export default class PokemonService {
  private fetch: $Fetch;

  constructor(fetch: any) {
    this.fetch = fetch;
  }

  async getPokemon(name: string) {
    const result = await this.fetch<PokemonDetails>(`/${name}`, {
      method: "GET",
    });

    return result;
  }

  async getPokemons(offset: number = 0, limit: number = 21) {
    const result = await this.fetch<Pokemon[]>(`?offset=${offset}&limit=${limit}`, {
      method: "GET",
    });

    return result;
  }
}