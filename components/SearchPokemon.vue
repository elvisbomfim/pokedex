<template>
  <v-row>
    <v-col cols="12" md="12">
      <div class="d-flex justify-center mb-6 " wid>
        <v-text-field label="Buscar" v-model="search" prepend-inner-icon="mdi-magnify" outlined
          class="ml-5 mr-5 mt-5 mb-5">
          <template v-slot:append>
            <v-btn color="primary" @click="searchPokemon">Buscar</v-btn>
          </template>
        </v-text-field>
      </div>
    </v-col>
  </v-row>
</template>


<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { usePokemonStore } from '@/stores/pokemon';

const search = ref('');
const router = useRouter();
const pokemonStore = usePokemonStore();


watch(() => pokemonStore.dialog, (newVal) => {
  if(!newVal)
  search.value = '';
})


const searchPokemon = async () => {
  try {
    const { $http } = useNuxtApp(); 
   
    const response = await $http.pokemon.getPokemon(search.value.toLowerCase());
    
    if (response) {     
      pokemonStore.addResearchedPokemon(response);

      router.push(`/pokemon/${response.name}`);
    }
  } catch (error) {
    router.push(`/pokemon/404`);
  }
};
</script>