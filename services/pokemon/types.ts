export interface Pokemon {
    name: string;
    url: string;
}

export interface Abilite {
    abilite: {
        name: string;
        url: string;
    };
}

export interface Sprite {
    back_default: string;
    other: {
        'official-artwork': {
            front_default: string;
        };
    };
}

export interface Type {
    slot: number;
    type: {
        name: string;
        url: string;
    };
}

export interface PokemonDetails {
    name: string;
    abilities: Abilite[];
    sprites: Sprite;
    types: Type[];
}
