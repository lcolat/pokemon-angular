import { Injectable } from '@angular/core';
import { Pokemon } from '../fight/models/Pokemon';
import axios from 'axios';
import { PokemonMoveAPI, PokemonPokeAPI } from './models/PokeAPI';
import { AttackNature } from '../fight/models/Attack';
import * as localForage from 'localforage';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private async getRawPokemon(name: string): Promise<PokemonPokeAPI> {
    const pokemonKey = `pokemon:${name}`;
    const pokemonInCache = await localForage.getItem<PokemonPokeAPI>(
      pokemonKey,
    );

    if (pokemonInCache) {
      return pokemonInCache;
    }

    const pokemon = (
      await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
    ).data;

    await localForage.setItem(pokemonKey, pokemon);

    return pokemon;
  }

  private getPokemonMoves(pokemon: PokemonPokeAPI): Promise<PokemonMoveAPI[]> {
    return Promise.all(
      pokemon.moves.map(async (m) => {
        const moveKey = `move:${m.move.name}`;
        const moveInCache = await localForage.getItem<PokemonMoveAPI>(moveKey);

        if (moveInCache) {
          return moveInCache;
        }

        const move = (await axios.get(m.move.url)).data;
        await localForage.setItem(moveKey, move);
        return move;
      }),
    );
  }

  async getPokemon(name: string): Promise<Pokemon> {
    const rawPokemon = await this.getRawPokemon(name);
    const moves = await this.getPokemonMoves(rawPokemon);

    return new Pokemon(
      name,
      rawPokemon.types[0].type.name,
      rawPokemon.stats[5].base_stat,
      1,
      rawPokemon.stats[4].base_stat,
      rawPokemon.stats[3].base_stat,
      rawPokemon.stats[0].base_stat,
      moves.map((m) => ({
        nature: m.type.name as AttackNature,
        criticalCoefficient: Math.max(1, m.meta.crit_rate),
        name: m.meta.name,
        basePower: m.power,
        precision: m.accuracy,
      })),
      {
        front: rawPokemon.sprites.front_default,
        back: rawPokemon.sprites.back_default,
      },
    );
  }
}
