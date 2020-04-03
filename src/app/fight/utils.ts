import { Pokemon, PokemonType } from './models/Pokemon';
import { AttackNature } from './models/Attack';
import * as uuid from 'uuid';

export function givenPokemon(data?: Partial<Pokemon>): Pokemon {
  return new Pokemon(
    data?.name ?? uuid.v4(),
    data?.type ?? PokemonType.FIRE,
    data?.hp ?? 200,
    data?.level ?? 50,
    data?.attack ?? 20,
    data?.defense ?? 30,
    data?.speed ?? 10,
    data?.attacks ?? [
      {
        name: uuid.v4(),
        basePower: 20,
        nature: AttackNature.PHYSICAL,
        precision: 2,
        criticalCoefficient: 3,
      },
    ],
    data?.sprites ?? {
      back:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/28.png',
      front:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/29.png',
    },
  );
}

export function randomIndex(collectionLength: number): number {
  return Math.floor(Math.random() * collectionLength);
}
