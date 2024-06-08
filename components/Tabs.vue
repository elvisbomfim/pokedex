<template>
  <v-card>
    <v-tabs v-model="tab" align-tabs="center" bg-color="deep-purple-accent-4" stacked>

      <v-tab value="home">
        <v-icon icon="mdi-pokeball"></v-icon>

        Home
      </v-tab>
      <v-tab value="history">
        <v-icon icon="mdi-history"></v-icon>

        Histórico
      </v-tab>

      <v-tab value="visited">
        <v-icon icon="mdi-eye-circle"></v-icon>

        Visitados
      </v-tab>


    </v-tabs>

    <v-tabs-window v-model="tab">
      <v-tabs-window-item value="home">
        <v-dialog v-if="pokemonStore.dialog" v-model="pokemonStore.dialog" max-width="900px">
          <v-card>
            <v-card-text>
              <NuxtPage @closeModal="pokemonStore.closeModal()" v-if="pokemonStore.dialog" />
            </v-card-text>
          </v-card>
        </v-dialog>
        <v-container fluid>
          <SearchPokemon />
          <PokemonList page="home" />
        </v-container>
      </v-tabs-window-item>

      <v-tabs-window-item value="history">
        <PokemonsResearched />
      </v-tabs-window-item>

      <v-tabs-window-item value="visited">
          <PokemonViewed />
      </v-tabs-window-item>

    </v-tabs-window>
  </v-card>
</template>
<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { usePokemonStore, watchDialogState } from '~/stores/pokemon';

watchDialogState();

const tab = ref(null);
const pokemonStore = usePokemonStore();
const route = useRoute();

onMounted(() => {
  if (!pokemonStore.dialog && route.name !== 'index') {
    pokemonStore.openModal();
  }
});



watch(() => route.name, (newVal) => {
  if (newVal !== 'index') {
    pokemonStore.openModal();
  } else {
    pokemonStore.closeModal();
  }
});
</script>
