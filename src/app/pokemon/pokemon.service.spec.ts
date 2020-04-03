import { TestBed } from '@angular/core/testing';
import { PokemonService } from './pokemon.service';

describe('PokemonService', function() {
  let service: PokemonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PokemonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get a pokemon from the API', async () => {
    const pokemon = await service.getPokemon('pikachu');
    expect(pokemon.name).toEqual('pikachu');
    expect(typeof pokemon.speed).toEqual('number');
    expect(typeof pokemon.hp).toEqual('number');
    expect(typeof pokemon.defense).toEqual('number');
    expect(typeof pokemon.attack).toEqual('number');
    expect(typeof pokemon.attack).toEqual('number');
    expect(typeof pokemon.sprites.front).toEqual('string');
    expect(typeof pokemon.sprites.back).toEqual('string');

    for (const attack of pokemon.attacks) {
      expect(typeof attack.name).toEqual('string');
      expect(typeof attack.nature).toEqual('string');
      expect(typeof attack.precision).toEqual('number');
      expect(typeof attack.basePower).toEqual('number');
      expect(typeof attack.criticalCoefficient).toEqual('number');
    }
  }, 10000);
});
