import { Injectable } from '@angular/core';
import { Pokemon } from '../fight/models/Pokemon';
import axios from 'axios';
import { PokemonMoveAPI, PokemonPokeAPI } from './models/IPokeAPIModels';
import { AttackNature } from '../fight/models/Attack';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  constructor() {}

  // getPokemons(): Observable<Pokemon[]>{
  //   return this.http.get<PokemonPokeAPI>('https://pokeapi.co/api/v2/pokemon/').pipe(
  //     map((raw:IPokemonListPokeAPI): Pokemon[]=>{
  //       let mappedResult:Pokemon[];
  //       raw.results.forEach(pokemon => {
  //         mappedResult.push(new Pokemon(pokemon.name,))
  //       });
  //     return mappedResult;
  //   }))
  // }

  async getPokemon(name: string): Promise<Pokemon> {
    const rawPokemon: PokemonPokeAPI = (
      await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
    ).data;

    const moves: PokemonMoveAPI[] = (
      await Promise.all(rawPokemon.moves.map((m) => axios.get(m.move.url)))
    ).map((p) => p.data);

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
