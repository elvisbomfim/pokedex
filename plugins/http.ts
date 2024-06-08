import PokemonService from "@/services/pokemon";

interface IHttp {
  pokemon: PokemonService;
}

export default defineNuxtPlugin(() => {
  const fetcher = $fetch.create({
    baseURL: "https://pokeapi.co/api/v2/pokemon",    
  });

  const httpServices: IHttp = {
    pokemon: new PokemonService(fetcher),
  };

  return {
    provide: {
      http: httpServices,
    },
  };
});