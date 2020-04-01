import { Pokemon } from './Pokemon';
import { Attack } from './Attack';
import { EventEmitter } from '@angular/core';

export type RandomFn = () => number;

export enum CombatState {
  RUNNING = 'RUNNING',
  PAUSE = 'PAUSE',
}

export type LogType =
  | 'critical'
  | 'damage'
  | 'hp'
  | 'dead'
  | 'win'
  | 'newRound'
  | 'attack';

export interface Log {
  type: LogType;
  data: string;
}

export class Combat extends EventEmitter<Log> {
  public attacker: Pokemon;
  public defender: Pokemon;
  public state: CombatState = CombatState.PAUSE;
  private itvId: number | undefined;

  constructor(
    public readonly firstPokemon: Pokemon,
    public readonly secondPokemon: Pokemon,
    randomFn?: RandomFn,
  ) {
    super();
    this.attacker = this.getFirstAttacker(randomFn);
    this.defender =
      this.attacker === firstPokemon ? secondPokemon : firstPokemon;
  }

  private getFirstAttacker(randomFn: RandomFn = Math.random): Pokemon {
    if (this.firstPokemon.speed > this.secondPokemon.speed) {
      return this.firstPokemon;
    } else if (this.firstPokemon.speed < this.secondPokemon.speed) {
      return this.secondPokemon;
    }

    return randomFn() > 0.5 ? this.firstPokemon : this.secondPokemon;
  }

  private switchPokemons(): void {
    const tmp = this.attacker;
    this.attacker = this.defender;
    this.defender = tmp;
  }

  private getAttackDamage(
    attack: Attack,
    crititalRandomFn: RandomFn = Math.random,
  ): number {
    let offensiveStat = this.attacker.attack;
    const defensiveStat = this.defender.defense;
    const isCritical = crititalRandomFn() > 0.8;

    if (isCritical) {
      this.emit({
        type: 'critical',
        data: `The attack is critical (x${attack.criticalCoefficient})!`,
      });

      offensiveStat *= attack.criticalCoefficient;
    }

    return (
      Math.floor(
        Math.floor(
          (Math.floor((2 * this.attacker.level) / 5 + 2) *
            offensiveStat *
            attack.basePower) /
            defensiveStat,
        ) / 50,
      ) + 2
    );
  }

  attack(attack: Attack, crititalRandomFn: RandomFn = Math.random): void {
    if (!this.attacker.attacks.includes(attack)) {
      throw new Error('Invalid attack');
    }

    const damageDealt = this.getAttackDamage(attack, crititalRandomFn);
    this.defender.removeHp(damageDealt);

    this.emit({
      type: 'damage',
      data: `${attack.name} caused ${damageDealt} damage`,
    });

    this.emit({
      type: 'hp',
      data: `${this.defender.name} have ${this.defender.hp}HP`,
    });

    this.switchPokemons();
  }

  private end(winner: Pokemon, looser: Pokemon): Pokemon {
    this.emit({
      type: 'dead',
      data: `${looser.name} is dead`,
    });

    this.emit({
      type: 'win',
      data: `${winner.name} won`,
    });

    clearInterval(this.itvId);
    this.itvId = undefined;
    return winner;
  }

  invertState() {
    this.state =
      this.state === CombatState.RUNNING
        ? CombatState.PAUSE
        : CombatState.RUNNING;
  }

  start(roundInMs = 500): Promise<Pokemon> {
    if (typeof this.itvId === 'number') {
      throw new Error('Game already started');
    }

    this.state = CombatState.RUNNING;

    return new Promise((resolve, reject) => {
      this.itvId = setInterval(() => {
        try {
          if (this.state !== CombatState.RUNNING) {
            return;
          }

          this.emit({
            type: 'newRound',
            data: 'New round',
          });

          const attack = this.attacker.getRandomAttack();

          this.emit({
            type: 'attack',
            data: `${this.attacker.name} will attack ${this.defender.name} with ${attack?.name}`,
          });

          this.attack(attack);

          if (this.firstPokemon.isDead()) {
            return resolve(this.end(this.secondPokemon, this.firstPokemon));
          }

          if (this.secondPokemon.isDead()) {
            return resolve(this.end(this.firstPokemon, this.secondPokemon));
          }
        } catch (err) {
          clearInterval(this.itvId);
          reject(err);
        }
      }, roundInMs);
    });
  }
}
