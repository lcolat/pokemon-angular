import { PokemonType } from '../../fight/models/Pokemon';

interface Detail {
  name: string;
  url: string;
}

interface StatsPokeAPI {
  base_stat: number;
  effort: number;
  stat: Detail[];
}

interface MovePokeAPI {
  move: Detail;
}

export type PokemonMoveAPI = {
  accuracy: number;
  type: Detail;
  meta: {
    name: string;
    crit_rate: number;
  };
  power: number;
};

export interface PokemonPokeAPI {
  moves: MovePokeAPI[];
  sprites: {
    front_default: string;
    back_default: string;
  };
  stats: StatsPokeAPI[];
  types: {
    type: {
      name: PokemonType;
    };
  }[];
}

interface PokemonListElementPokeAPI {
  name: string;
  url: string;
}

export interface PokemonListPokeAPI {
  results: PokemonListElementPokeAPI[];
}
