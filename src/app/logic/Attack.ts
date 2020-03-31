export enum AttackNature {
  PHYSICAL = 'PHYSICAL',
  PSYCHIC = 'PSYCHIC',
}

export class Attack {
  constructor(
    public readonly name: string,
    public readonly nature: AttackNature,
    public readonly basePower: number,
    public readonly precision: number,
  ) {}
}
