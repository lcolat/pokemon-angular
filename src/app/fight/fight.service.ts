import { EventEmitter, Injectable } from '@angular/core';
import { Pokemon } from './models/Pokemon';
import { Attack } from './models/Attack';

export type RandomFn = () => number;

export enum FightState {
  STARTING = 'STARTING',
  RUNNING = 'RUNNING',
  PAUSE = 'PAUSE',
  ENDED = 'ENDED',
}

export type LogType = 'damage' | 'end';

interface BaseLog {
  type: LogType;
}

export interface DamageLog extends BaseLog {
  type: 'damage';
  attack: Attack;
  damage: number;
  attacker: Pokemon;
  defender: Pokemon;
  isCritical: boolean;
}

export interface EndLog extends BaseLog {
  type: 'end';
  winner: Pokemon;
  looser: Pokemon;
}

export type Log = DamageLog | EndLog;

@Injectable({
  providedIn: 'root',
})
export class FightService extends EventEmitter<Log> {
  public firstPokemon!: Pokemon;
  public secondPokemon!: Pokemon;
  public attacker!: Pokemon;
  public defender!: Pokemon;
  public state: FightState = FightState.PAUSE;
  private itvId: number | undefined;

  constructor() {
    super();
    this.state = FightState.STARTING;
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
  ): {
    isCritical: boolean;
    damage: number;
  } {
    let offensiveStat = this.attacker.attack;
    const defensiveStat = this.defender.defense;
    const isCritical = crititalRandomFn() > 0.8;

    if (isCritical) {
      offensiveStat *= attack.criticalCoefficient;
    }

    return {
      damage:
        Math.floor(
          Math.floor(
            (Math.floor((2 * this.attacker.level) / 5 + 2) *
              offensiveStat *
              attack.basePower) /
              defensiveStat,
          ) / 50,
        ) + 2,
      isCritical,
    };
  }

  attack(attack: Attack, crititalRandomFn: RandomFn = Math.random): void {
    if (!this.attacker.attacks.includes(attack)) {
      throw new Error('Invalid attack');
    }

    const { damage, isCritical } = this.getAttackDamage(
      attack,
      crititalRandomFn,
    );

    const oldDefenderHp = this.defender.hp;
    this.defender.removeHp(damage);

    this.emit({
      type: 'damage',
      attack,
      damage: oldDefenderHp - this.defender.hp,
      isCritical,
      attacker: this.attacker,
      defender: this.defender,
    });

    this.switchPokemons();
  }

  private end(winner: Pokemon, looser: Pokemon): Pokemon {
    this.emit({
      type: 'end',
      winner: winner,
      looser: looser,
    });

    clearInterval(this.itvId);
    this.state = FightState.ENDED;
    return winner;
  }

  invertPauseState() {
    if (this.state === FightState.PAUSE || this.state === FightState.RUNNING) {
      this.state =
        this.state === FightState.RUNNING
          ? FightState.PAUSE
          : FightState.RUNNING;
    }
  }

  init(firstPokemon: Pokemon, secondPokemon: Pokemon, randomFn?: RandomFn) {
    this.firstPokemon = firstPokemon;
    this.secondPokemon = secondPokemon;

    this.attacker = this.getFirstAttacker(randomFn);

    this.defender =
      this.attacker === this.firstPokemon
        ? this.secondPokemon
        : this.firstPokemon;
  }

  start(roundInMs = 500): Promise<Pokemon> {
    if (this.state !== FightState.STARTING) {
      throw new Error('Game already started');
    }

    this.state = FightState.RUNNING;

    return new Promise((resolve, reject) => {
      this.itvId = setInterval(() => {
        try {
          if (this.state !== FightState.RUNNING) {
            return;
          }

          const attack = this.attacker.getRandomAttack();

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
