import { defineStore } from 'pinia';
import { useNuxtApp } from '#app';
import type { Pokemon, PokemonDetails } from '@/services/pokemon/types';



export const usePokemonStore = defineStore('pokemon', {
  state: () => ({
    pokemonDetails: {} as PokemonDetails | null,
    pokemons: [] as Pokemon[],
    pokemonsViewed: [] as Pokemon[],
    pokemonsResearched: [] as Pokemon[],    
    offset: 0,
    limit: 21,
    hasMore: true,
    dialog: false,
  }),
  actions: {
    async fetchPokemons() {
      try {
        const $http = useNuxtApp().$http;
        const data = await $http.pokemon.getPokemons(this.offset, this.limit);
        
        if (data.results) {
          this.pokemons.push(...data.results);
          this.offset += this.limit;
          this.hasMore = data.next !== null;
        }
      } catch (error) {
        console.error(error);
      }
    },
    async fetchPokemonDetails(name: string) {
        const  $http  = useNuxtApp().$http;
        this.pokemonDetails = await $http.pokemon.getPokemon(name);
      },
    openModal() {
      this.dialog = true;
    },
    closeModal() {
      this.dialog = false;     
    },
    addViewedPokemon(pokemon: Pokemon) {
      if (!this.pokemonsViewed.some(p => p.name === pokemon.name)) {
        this.pokemonsViewed.push(pokemon);
        localStorage.setItem('ViewedPokemon', JSON.stringify(this.pokemonsViewed));
      }
    },
    addResearchedPokemon(pokemon: Pokemon) {
      if (!this.pokemonsResearched.some(p => p.name === pokemon.name)) {
        this.pokemonsResearched.push(pokemon);
        localStorage.setItem('ResearchedPokemon', JSON.stringify(this.pokemonsResearched));
      }
    },
    restoreViewedPokemonFromLocalStorage() {
      const data = localStorage.getItem('ViewedPokemon');
      if (data) {
        this.pokemonsViewed = JSON.parse(data);
      }
    },
    restoreResearchedPokemonFromLocalStorage() {
      const data = localStorage.getItem('ResearchedPokemon');
      if (data) {
        this.pokemonsResearched = JSON.parse(data);
      }
    },
  },
});


export const watchDialogState = () => {
  const store = usePokemonStore();
  const { $router } = useNuxtApp();

  watch(
    () => store.dialog,
    (newValue, oldValue) => {
      if (oldValue === true && newValue === false) {
        $router.push('/');
      }
    }
  );
};