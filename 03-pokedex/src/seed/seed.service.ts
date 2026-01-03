import { Injectable } from '@nestjs/common';
import pokemons from './data/pokemons-list.json';
import { PokeResponse } from './interfaces/poke-response.interface';
import { Model } from 'mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class SeedService {
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
  ) {}

  async executeSeed() {
    const pokemonsList: PokeResponse = pokemons;

    await this.pokemonModel.deleteMany({});

    // Esta es una forma alternativa de hacerlo pero es menos eficiente, ya que hace muchas operaciones en la base de datos, mientras que insertMany hace una sola

    // const insertPromises = pokemonsList.results.map(async ({ name, url }) => {
    //   const segments = url.split('/');
    //   const no = +segments.at(-2)!;
    //   const pokemon = await this.pokemonModel.create({ name, no });
    //   return pokemon;
    // });

    // await Promise.all(insertPromises);

    const pokemonToInsert: { name: string; no: number }[] = [];

    pokemonsList.results.forEach(({ name, url }) => {
      const segments = url.split('/');
      const no = +segments.at(-2)!;

      pokemonToInsert.push({ name, no });
    });

    await this.pokemonModel.insertMany(pokemonToInsert);

    return 'Seed executed';
  }
}
