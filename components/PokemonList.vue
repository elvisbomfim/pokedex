<template>
  <v-container>
    
      <v-infinite-scroll height="500" @load="load">
        <v-row>
        <template v-for="(pokemon, index) in pokemons" :key="index">
          <v-col cols="12" sm="6" md="6" xl="3">
            <PokemonCard :pokemon="pokemon" />
          </v-col>
        </template>
      </v-row>
        <template v-slot:load-more="{ props }">
          <v-btn icon="mdi-refresh" size="small" variant="text" v-bind="props"></v-btn>
        </template>
      </v-infinite-scroll>
    
  

  </v-container>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import { usePokemonStore } from '@/stores/pokemon';


const props = defineProps<{ page: string }>();

const pokemonStore = usePokemonStore();
const pokemons = ref([]);


const fetchPokemons = async (page: string) => {
  await pokemonStore.fetchPokemons();
  pokemons.value = pokemonStore.pokemons;
};

async function load({ done }) {
 
  await fetchPokemons()

  done('ok')
}


watch(() => props.page, (newPage) => {

}, { immediate: true });


onMounted(() => {
  fetchPokemons()
});
</script>

<style scoped>
.v-infinite-scroll--vertical {
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  overflow-x: hidden;
}

</style>
