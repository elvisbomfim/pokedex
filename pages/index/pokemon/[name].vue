<template>
    <div>
        <v-row>
            <v-progress-circular v-if="!details" indeterminate></v-progress-circular>
            <v-col cols="12" md="6" ref="cardContainer">
                <v-img :aspect-ratio="1" class="bg-white" :src="imageSrc" width="100%"></v-img>
            </v-col>
            <v-col cols="12" md="6" v-if="details">
                <strong >{{ capitalize(details.name) }}</strong>
                <v-divider  class="mb-10"></v-divider>
                <v-row>
                    <v-col cols="12" md="6">
                        <p><strong>Altura:</strong> {{ details.height / 10 }} m</p>
                        <p><strong>Peso:</strong> {{ details.weight / 10 }} kg</p>
                        <p><strong>Base de Experiência:</strong> {{ details.base_experience }}</p>
                        <p><strong>ID:</strong> {{ details.id }}</p>
                        <p><strong>Ordem:</strong> {{ details.order }}</p>
                    </v-col>
                    <v-col cols="12" md="6">
                        <p><strong>Tipo:</strong> 
                            <span v-for="(type, index) in details.types" :key="index">
                                {{ type.type.name }}<span v-if="index < details.types.length - 1">, </span>
                            </span>
                        </p>
                        <p><strong>Habilidades:</strong> 
                            <span v-for="(ability, index) in details.abilities" :key="index">
                                {{ ability.ability.name }}<span v-if="index < details.abilities.length - 1">, </span>
                            </span>
                        </p>
                        <p><strong>Espécie:</strong> {{ details.species.name }}</p>
                        <p><strong>Formas:</strong> 
                            <span v-for="(form, index) in details.forms" :key="index">
                                {{ form.name }}<span v-if="index < details.forms.length - 1">, </span>
                            </span>
                        </p>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12">
                        <p><strong>Estatísticas:</strong></p>
                        <v-row>
                            <v-col cols="12" md="6" v-for="(stat, index) in details.stats" :key="index">
                                <p>{{ stat.stat.name }}: {{ stat.base_stat }}</p>
                            </v-col>
                        </v-row>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12" md="12">
                <v-btn class="float-right" @click="$emit('closeModal')">Voltar</v-btn>                
            </v-col>
        </v-row>
    </div>
</template>


<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { usePokemonStore } from '@/stores/pokemon';
import type { PokemonDetails } from '@/services/pokemon/types';
const pokemonStore = usePokemonStore();
const details = ref<PokemonDetails>(null);
const imageSrc = ref<null>(null);
const route = useRoute();


const capitalize = (s: string) => {
    if (!s) return '';
    return s.toUpperCase();
};

onMounted(async () => {  

    await pokemonStore.fetchPokemonDetails(route.params.name);
    const result = await pokemonStore.pokemonDetails;
    pokemonStore.addViewedPokemon(result);
    details.value = result;
    imageSrc.value = result.sprites.other['official-artwork'].front_default;
});

</script>