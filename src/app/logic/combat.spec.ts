import { Combat } from './Combat';
import { givenPokemon } from './utils';
import { Attack, AttackNature } from './Attack';
import { PokemonType } from './Pokemon';

describe('Combat', () => {
  it('should determine the attackers which has the most speed (1)', () => {
    const firstPokemon = givenPokemon({
      speed: 10,
    });

    const secondPokemon = givenPokemon({
      speed: 15,
    });

    expect(new Combat(firstPokemon, secondPokemon).attacker).toBe(
      secondPokemon,
    );
  });

  it('should determine the attackers which has the most speed (2)', () => {
    const firstPokemon = givenPokemon({
      speed: 15,
    });

    const secondPokemon = givenPokemon({
      speed: 10,
    });

    expect(new Combat(firstPokemon, secondPokemon).attacker).toBe(firstPokemon);
  });

  it('should determine the attackers randomly when the speed is the same (1)', () => {
    const firstPokemon = givenPokemon({
      speed: 10,
    });

    const secondPokemon = givenPokemon({
      speed: 10,
    });

    const randomFn = (): number => 0.3;

    expect(new Combat(firstPokemon, secondPokemon, randomFn).attacker).toBe(
      secondPokemon,
    );
  });

  it('should determine the attackers randomly when the speed is the same (2)', () => {
    const firstPokemon = givenPokemon({
      speed: 10,
    });

    const secondPokemon = givenPokemon({
      speed: 10,
    });

    const randomFn = (): number => 0.7;

    expect(new Combat(firstPokemon, secondPokemon, randomFn).attacker).toBe(
      firstPokemon,
    );
  });

  it('should not allow unknown attacks', () => {
    const firstPokemon = givenPokemon({
      attacks: [
        {
          basePower: 10,
          name: 'AttackA',
          nature: AttackNature.PHYSICAL,
          precision: 0.2,
        },
      ],
    });

    const secondPokemon = givenPokemon();

    const combat = new Combat(firstPokemon, secondPokemon);
    expect(() => combat.attack({} as Attack)).toThrow('Invalid attack');
  });

  it('should remove correct amount of hp of the defender', () => {
    const firstPokemonAttack: Attack = {
      basePower: 10,
      name: 'AttackA',
      nature: AttackNature.PHYSICAL,
      precision: 0.2,
    };

    const firstPokemon = givenPokemon({
      attacks: [firstPokemonAttack],
      attack: 5,
    });

    const secondPokemon = givenPokemon({
      hp: 100,
      defense: 10,
    });

    const combat = new Combat(firstPokemon, secondPokemon);
    combat.attacker = firstPokemon;
    combat.defender = secondPokemon;

    combat.attack(firstPokemonAttack, () => 0);
    expect(secondPokemon.hp).toEqual(96);
  });

  it('should apply critical hit', () => {
    const firstPokemonAttack: Attack = {
      basePower: 10,
      name: 'AttackA',
      nature: AttackNature.PHYSICAL,
      precision: 0.2,
    };

    const firstPokemon = givenPokemon({
      attacks: [firstPokemonAttack],
      attack: 5,
    });

    const secondPokemon = givenPokemon({
      hp: 100,
      defense: 10,
    });

    const combat = new Combat(firstPokemon, secondPokemon);
    combat.attacker = firstPokemon;
    combat.defender = secondPokemon;

    combat.attack(firstPokemonAttack, () => 0.95);
    expect(secondPokemon.hp).toEqual(92);
  });

  it('should switch pokemons at the end of an attack', () => {
    const combat = new Combat(givenPokemon(), givenPokemon());
    const { attacker, defender } = combat;

    combat.attack(combat.attacker.attacks[0]);
    expect(combat.attacker).toBe(defender);
    expect(combat.defender).toBe(attacker);
  });

  it('should start a combat and return the winner (1)', async () => {
    const combat = new Combat(
      givenPokemon({
        defense: 100,
        attack: 100,
        hp: 100,
        speed: 50,
        type: PokemonType.FIRE,
        level: 50,
        name: 'PokemonA',
        attacks: [
          {
            nature: AttackNature.PHYSICAL,
            name: 'AttackA',
            basePower: 50,
            precision: 10,
          },
        ],
      }),
      givenPokemon({
        defense: 100,
        attack: 100,
        hp: 100,
        speed: 51,
        type: PokemonType.FIRE,
        level: 50,
        name: 'PokemonB',
        attacks: [
          {
            nature: AttackNature.PHYSICAL,
            name: 'AttackA',
            basePower: 50,
            precision: 10,
          },
        ],
      }),
    );

    const winner = await combat.start(10, () => combat.attacker.attacks[0]);
    expect(winner).toBe(combat.secondPokemon);
  });

  it('should start a combat and return the winner (2)', async () => {
    const combat = new Combat(
      givenPokemon({
        defense: 100,
        attack: 100,
        hp: 100,
        speed: 51,
        type: PokemonType.FIRE,
        level: 50,
        name: 'PokemonA',
        attacks: [
          {
            nature: AttackNature.PHYSICAL,
            name: 'AttackA',
            basePower: 50,
            precision: 10,
          },
        ],
      }),
      givenPokemon({
        defense: 100,
        attack: 100,
        hp: 100,
        speed: 50,
        type: PokemonType.FIRE,
        level: 50,
        name: 'PokemonB',
        attacks: [
          {
            nature: AttackNature.PHYSICAL,
            name: 'AttackA',
            basePower: 50,
            precision: 10,
          },
        ],
      }),
    );

    const winner = await combat.start(10, () => combat.attacker.attacks[0]);
    expect(winner).toBe(combat.firstPokemon);
  });

  it('should handle error happening in a combat', () => {
    const combat = new Combat(givenPokemon(), givenPokemon());

    return expect(
      combat.start(10, () => (undefined as unknown) as Attack),
    ).rejects.toHaveProperty('message', 'Invalid attack');
  });
});
