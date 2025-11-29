export const pokemonIds = [1, 20, 30];

interface Pokemon {
  id: number;
  name: string;
  age?: number;
}

export const pokemon: Pokemon = {
  id: 1,
  name: "Bulbasaur",
};

export const pokemons: Pokemon[] = [pokemon];
