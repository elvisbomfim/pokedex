<template>
    <v-card>
      <NuxtLink :to="`/pokemon/${pokemon.name}`">
        <v-row>
          <v-col cols="12" md="6" class="d-flex justify-center">
            <v-img
              :aspect-ratio="1"
              v-if="details && details.sprites && details.sprites.back_default"
              class="bg-white"
              :src="details.sprites.back_default"
              width="300"
            ></v-img>
          </v-col>
          <v-col cols="12" md="6">
            <v-row>
              <v-col cols="12" md="12" class="d-flex justify-sm-center justify-md-start">
                <v-card-title class="title text-h5 text-sm-center">{{ pokemon.name }}</v-card-title>
              </v-col>
              <v-col cols="12" md="12" v-if="details">
                <v-btn
                  density="compact"
                  class="mb-2 ml-2"                  
                  v-for="(type, type_index) in details.types"
                  :key="type_index"
                  :style="{ backgroundColor: getBgColor(type.type.name), color: getColor(type.type.name) }"
                >
                  {{ type.type.name }}
                </v-btn>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </NuxtLink>
    </v-card>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { usePokemonStore } from '@/stores/pokemon';  
  import type { PokemonDetails } from '@/services/pokemon/types';
  
  const props = defineProps<{ pokemon: { name: string } }>();
  
  const pokemonStore = usePokemonStore();
  const details = ref<null>(null);
  
  

  onMounted(async () => {
    
    await pokemonStore.fetchPokemonDetails(props.pokemon.name);
    details.value = pokemonStore.pokemonDetails;
  });
  

  const colors = {
    fire: { bg_color: '#de5239', color: '#FFF' },
    grass: { bg_color: '#00ff73', color: '#000' },
    electric: { bg_color: '#f6bd20', color: '#000' },
    water: { bg_color: '#00ff73', color: '#000' },
    ground: { bg_color: '#f4e7da', color: '#000' },
    rock: { bg_color: '#d5d5d4', color: '#000' },
    fairy: { bg_color: '#fceaff', color: '#000' },
    poison: { bg_color: '#9441bd', color: '#FFF' },
    ghost: { bg_color: '#33336b', color: '#FFF' },
    bug: { bg_color: '#f8d5a3', color: '#000' },
    dragon: { bg_color: '#97b3e6', color: '#000' },
    psychic: { bg_color: '#eaeda1', color: '#000' },
    flying: { bg_color: '#F5F5F5', color: '#000' },
    fighting: { bg_color: '#93b2c7', color: '#000' },
    normal: { bg_color: '#75515b', color: '#FFF' },
    steel: { bg_color: '#5f756d', color: '#FFF' },
  };
  
  type Colors = typeof colors;
  
  function getBgColor(value: string): string {
    return colors[value as keyof Colors]?.bg_color || '#FFF';
  }
  
  function getColor(value: string): string {
    return colors[value as keyof Colors]?.color || '#FFF';
  }
  </script>
  
  <style scoped>
  a {
    text-decoration: none !important;
    color: black;
    font-weight: 700 !important;
  }
  
  .v-card__subtitle,
  .v-card__text,
  .v-card__title {
    padding: 10px;
  }
  
  .v-application .text-h5 {
    font-weight: 700 !important;
  }
  
  .v-card {
    margin: 10px;
  }
  </style>
  