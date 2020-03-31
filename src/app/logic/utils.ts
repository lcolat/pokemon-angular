import { Pokemon, PokemonType } from './Pokemon';
import { Attack, AttackNature } from './Attack';
import * as uuid from 'uuid';

export interface PokemonData {
  name?: string;
  type?: PokemonType;
  hp?: number;
  level?: number;
  attack?: number;
  defense?: number;
  speed?: number;
  attacks?: Attack[];
}

export function givenPokemon(data?: PokemonData): Pokemon {
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
  );
}
