import { Attack } from './Attack';
import { randomIndex } from '../utils';

export enum PokemonType {
  WATER = 'WATER',
  GRASS = 'GRASS',
  FIRE = 'FIRE',
  BUG = 'BUG',
  ELECTRIC = 'ELECTRIC',
}

export class Pokemon {
  constructor(
    public readonly name: string,
    public readonly type: PokemonType,
    public hp: number,
    public level: number,
    public readonly attack: number,
    public readonly defense: number,
    public readonly speed: number,
    public readonly attacks: Attack[],
    public readonly color?: string,
  ) {
    if (this.attacks.length === 0) {
      throw new Error('No attacks defined');
    }

    this.color = color ?? this.generateRandomColor();
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
