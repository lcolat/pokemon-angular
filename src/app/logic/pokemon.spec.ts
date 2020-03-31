import { givenPokemon } from './utils';
import { AttackNature } from './Attack';

describe('Pokemon', () => {
  it('should throw when no attacks is provided', () => {
    expect(() =>
      givenPokemon({
        attacks: [],
      }),
    ).toThrow('No attacks defined');
  });

  it('should return a random attack within pokemon attacks', () => {
    const pokemon = givenPokemon({
      attacks: [
        {
          precision: 0,
          basePower: 0,
          name: 'a',
          nature: AttackNature.PHYSICAL,
          criticalCoefficient: 1,
        },
        {
          precision: 0,
          basePower: 0,
          name: 'b',
          nature: AttackNature.PHYSICAL,
          criticalCoefficient: 1,
        },
      ],
    });

    const randomAttack = pokemon.getRandomAttack();
    expect(pokemon.attacks).toContainEqual(randomAttack);
  });

  describe('Is dead', () => {
    it('should return true when hp is === 0', () => {
      const pokemon = givenPokemon();
      pokemon.hp = 0;
      expect(pokemon.isDead()).toBeTruthy();
    });

    it('should return true when hp is < 0', () => {
      const pokemon = givenPokemon();
      pokemon.hp = -1;
      expect(pokemon.isDead()).toBeTruthy();
    });
  });

  describe('Remove HP', () => {
    it('should remove the correct amount of HP', () => {
      const pokemon = givenPokemon({
        hp: 100,
      });

      pokemon.removeHp(50);
      expect(pokemon.hp).toEqual(50);
    });

    it('should not remove more hp after 0', () => {
      const pokemon = givenPokemon({
        hp: 10,
      });

      pokemon.removeHp(50);
      expect(pokemon.hp).toEqual(0);
    });
  });
});
