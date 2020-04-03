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

interface MoveMetaPokeAPI {
  name: string;
  crit_rate: number;
}

export type PokemonMoveAPI = {
  accuracy: number;
  type: Detail;
  meta: MoveMetaPokeAPI;
  power: number;
};

interface SpritePokeAPI {
  front_default: string;
  back_default: string;
}

interface PokemonTypePokeAPI {
  type: {
    name: PokemonType;
  };
}

export interface PokemonPokeAPI {
  moves: MovePokeAPI[];
  sprites: SpritePokeAPI;
  stats: StatsPokeAPI[];
  types: PokemonTypePokeAPI[];
}
