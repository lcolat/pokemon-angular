export enum AttackNature {
  NORMAL = 'normal',
  PHYSICAL = 'physical',
  PSYCHIC = 'psychic',
}

export class Attack {
  constructor(
    public readonly name: string,
    public readonly nature: AttackNature,
    public readonly basePower: number,
    public readonly precision: number,
    public readonly criticalCoefficient: number,
  ) {}
}
