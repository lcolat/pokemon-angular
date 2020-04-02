import { TestBed } from '@angular/core/testing';
import { FightService, FightState } from './fight.service';
import { givenPokemon } from './utils';
import { Attack, AttackNature } from './models/Attack';
import { PokemonType } from './models/Pokemon';
import { take } from 'rxjs/operators';

describe('FightService', () => {
  let service: FightService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FightService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should determine the attackers which has the most speed (1)', () => {
    const firstPokemon = givenPokemon({
      speed: 10,
    });

    const secondPokemon = givenPokemon({
      speed: 15,
    });

    const fs = new FightService();
    fs.init(firstPokemon, secondPokemon);
    expect(fs.attacker).toBe(secondPokemon);
  });

  it('should determine the attackers which has the most speed (2)', () => {
    const firstPokemon = givenPokemon({
      speed: 15,
    });

    const secondPokemon = givenPokemon({
      speed: 10,
    });

    const fs = new FightService();
    fs.init(firstPokemon, secondPokemon);
    expect(fs.attacker).toBe(firstPokemon);
  });

  it('should determine the attackers randomly when the speed is the same (1)', () => {
    const firstPokemon = givenPokemon({
      speed: 10,
    });

    const secondPokemon = givenPokemon({
      speed: 10,
    });

    const randomFn = (): number => 0.3;

    const fs = new FightService();
    fs.init(firstPokemon, secondPokemon, randomFn);
    expect(fs.attacker).toBe(secondPokemon);
  });

  it('should determine the attackers randomly when the speed is the same (2)', () => {
    const firstPokemon = givenPokemon({
      speed: 10,
    });

    const secondPokemon = givenPokemon({
      speed: 10,
    });

    const randomFn = (): number => 0.7;

    const fs = new FightService();
    fs.init(firstPokemon, secondPokemon, randomFn);
    expect(fs.attacker).toBe(firstPokemon);
  });

  it('should not allow unknown attacks', () => {
    const firstPokemon = givenPokemon({
      attacks: [
        {
          basePower: 10,
          name: 'AttackA',
          nature: AttackNature.PHYSICAL,
          precision: 0.2,
          criticalCoefficient: 1,
        },
      ],
    });

    const secondPokemon = givenPokemon();

    const fs = new FightService();
    fs.init(firstPokemon, secondPokemon);
    expect(() => fs.attack({} as Attack)).toThrow('Invalid attack');
  });

  it('should remove correct amount of hp of the defender', () => {
    const firstPokemonAttack: Attack = {
      basePower: 10,
      name: 'AttackA',
      nature: AttackNature.PHYSICAL,
      precision: 0.2,
      criticalCoefficient: 1,
    };

    const firstPokemon = givenPokemon({
      attacks: [firstPokemonAttack],
      attack: 5,
    });

    const secondPokemon = givenPokemon({
      hp: 100,
      defense: 10,
    });

    const fs = new FightService();
    fs.init(firstPokemon, secondPokemon);
    fs.attacker = firstPokemon;
    fs.defender = secondPokemon;

    fs.attack(firstPokemonAttack);
    expect(secondPokemon.hp).toEqual(96);
  });

  it('should apply critical hit', () => {
    const firstPokemonAttack: Attack = {
      basePower: 10,
      name: 'AttackA',
      nature: AttackNature.PHYSICAL,
      precision: 0.2,
      criticalCoefficient: 3,
    };

    const firstPokemon = givenPokemon({
      attacks: [firstPokemonAttack],
      attack: 5,
    });

    const secondPokemon = givenPokemon({
      hp: 100,
      defense: 10,
    });

    const fs = new FightService();
    fs.init(firstPokemon, secondPokemon);
    fs.attacker = firstPokemon;
    fs.defender = secondPokemon;

    fs.attack(firstPokemonAttack, () => 0.95);
    expect(secondPokemon.hp).toEqual(92);
  });

  it('should switch pokemons at the end of an attack', () => {
    const fs = new FightService();
    fs.init(givenPokemon(), givenPokemon());
    const { attacker, defender } = fs;

    fs.attack(fs.attacker.attacks[0]);
    expect(fs.attacker).toBe(defender);
    expect(fs.defender).toBe(attacker);
  });

  it('should start a FightService and return the winner (1)', async () => {
    const fs = new FightService();

    fs.init(
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
            criticalCoefficient: 1,
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
            name: 'AttackB',
            basePower: 50,
            precision: 10,
            criticalCoefficient: 1,
          },
        ],
      }),
    );

    const winner = await fs.start(10).pipe(take(1)).toPromise();
    expect(winner).toBe(fs.secondPokemon);
  });

  it('should start a FightService and return the winner (2)', async () => {
    const fs = new FightService();

    fs.init(
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
            criticalCoefficient: 1,
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
            name: 'AttackB',
            basePower: 50,
            precision: 10,
            criticalCoefficient: 1,
          },
        ],
      }),
    );

    const winner = await fs.start(10).pipe(take(1)).toPromise();
    expect(winner).toBe(fs.firstPokemon);
  });

  it('should not start twice a FightService', () => {
    const fs = new FightService();
    fs.init(givenPokemon(), givenPokemon());
    fs.start(500);
    return expect(() => fs.start(500)).toThrow('Game already started');
  });

  it('should invert state when the state is RUNNING', () => {
    const fs = new FightService();
    fs.init(givenPokemon(), givenPokemon());
    fs.state = FightState.RUNNING;
    fs.invertPauseState();
    expect(fs.state).toEqual(FightState.PAUSE);
  });

  it('should invert state when the state is PAUSE', () => {
    const fs = new FightService();
    fs.init(givenPokemon(), givenPokemon());
    fs.state = FightState.PAUSE;
    fs.invertPauseState();
    expect(fs.state).toEqual(FightState.RUNNING);
  });

  it('should not invert state when the state is not PAUSE or RUNNING', () => {
    const fs = new FightService();
    fs.init(givenPokemon(), givenPokemon());
    fs.state = FightState.STARTING;
    fs.invertPauseState();
    expect(fs.state).toEqual(FightState.STARTING);
  });
});
