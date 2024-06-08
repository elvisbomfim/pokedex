<template>
    <v-container>
        <v-row>
            <v-col cols="12" sm="6" md="6" xl="3" v-for="(pokemon, index) in pokemons" :key="index">
                <PokemonCard :pokemon="pokemon" />
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import { usePokemonStore } from '@/stores/pokemon';


const props = defineProps<{ page: string }>();

const pokemonStore = usePokemonStore();
const pokemons = ref([]);


const fetchPokemons = (page: string) => {
    
    pokemons.value = pokemonStore.pokemonsResearched;
};


onMounted(() => {
    pokemonStore.restoreResearchedPokemonFromLocalStorage();
    fetchPokemons()
});
</script>

