import { EventEmitter, Injectable } from '@angular/core';
import { Pokemon } from './models/Pokemon';
import { Attack } from './models/Attack';
import { interval, Observable, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

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
export class FightService {
  public firstPokemon!: Pokemon;
  public secondPokemon!: Pokemon;
  public attacker!: Pokemon;
  public defender!: Pokemon;
  public state: FightState = FightState.PAUSE;
  public startDate: Date | undefined;
  public endDate: Date | undefined;
  private subscription: Subscription | undefined;

  constructor() {
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

  attack(attack: Attack, crititalRandomFn: RandomFn = Math.random): DamageLog {
    if (!this.attacker.attacks.includes(attack)) {
      throw new Error('Invalid attack');
    }

    const { damage, isCritical } = this.getAttackDamage(
      attack,
      crititalRandomFn,
    );

    const oldDefenderHp = this.defender.hp;
    this.defender.removeHp(damage);

    const log: DamageLog = {
      type: 'damage',
      attack,
      damage: oldDefenderHp - this.defender.hp,
      isCritical,
      attacker: this.attacker,
      defender: this.defender,
    };

    this.switchPokemons();
    return log;
  }

  private end(winner: Pokemon, looser: Pokemon): EndLog {
    this.state = FightState.ENDED;
    this.endDate = new Date();

    return {
      type: 'end',
      winner: winner,
      looser: looser,
    };
  }

  invertPauseState() {
    if (this.state === FightState.PAUSE || this.state === FightState.RUNNING) {
      this.state =
        this.state === FightState.RUNNING
          ? FightState.PAUSE
          : FightState.RUNNING;
    }
  }

  init(
    firstPokemon: Pokemon,
    secondPokemon: Pokemon,
    roundInMs = 500,
    randomFn?: RandomFn,
  ): Observable<Log | undefined> {
    if (this.state !== FightState.STARTING) {
      throw new Error('Game already started');
    }

    this.firstPokemon = firstPokemon;
    this.secondPokemon = secondPokemon;

    this.attacker = this.getFirstAttacker(randomFn);

    this.defender =
      this.attacker === this.firstPokemon
        ? this.secondPokemon
        : this.firstPokemon;

    this.startDate = new Date();
    this.state = FightState.RUNNING;

    return interval(roundInMs).pipe(
      map(() => {
        if (this.state !== FightState.RUNNING) {
          return;
        }

        const attack = this.attacker.getRandomAttack();
        const damageLog = this.attack(attack);

        if (this.firstPokemon.isDead()) {
          return this.end(this.secondPokemon, this.firstPokemon);
        }

        if (this.secondPokemon.isDead()) {
          return this.end(this.firstPokemon, this.secondPokemon);
        }

        return damageLog;
      }),
    );
  }
}
