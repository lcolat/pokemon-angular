import { Attack } from './Attack';
import { randomIndex } from '../utils';

export interface Sprites {
  front: string;
  back: string;
}

export enum PokemonType {
  WATER = 'WATER',
  GRASS = 'GRASS',
  FIRE = 'FIRE',
  BUG = 'BUG',
  ELECTRIC = 'ELECTRIC',
}

export class Pokemon {
  constructor(
    public name: string,
    public type: PokemonType,
    public hp: number,
    public level: number,
    public attack: number,
    public defense: number,
    public speed: number,
    public readonly attacks: Attack[],
    public readonly sprites: Sprites,
    public readonly color?: string,
    public isLoser?: boolean,
  ) {
    if (this.attacks.length === 0) {
      throw new Error('No attacks defined');
    }

    this.color = color ?? this.generateRandomColor();
    this.isLoser = isLoser ?? false;
  }

  private generateRandomColor(): string {
    const colors = ['red', 'green', 'yellow', 'orange'];
    return colors[randomIndex(colors.length)];
  }

  public removeHp(damage: number): void {
    this.hp = Math.max(0, this.hp - damage);
  }

  public isDead(): boolean {
    return this.hp <= 0;
  }

  public getRandomAttack(): Attack {
    return this.attacks[randomIndex(this.attacks.length)];
  }
}
