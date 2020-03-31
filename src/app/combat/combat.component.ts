import { Component, Input, OnInit, Output } from '@angular/core';
import { Pokemon, PokemonType } from '../logic/Pokemon';
import { Combat } from '../logic/Combat';
import { givenPokemon } from '../logic/utils';

@Component({
  selector: 'combat-component',
  templateUrl: './combat.component.html',
  styleUrls: ['./combat.component.css'],
})
export class CombatComponent implements OnInit {
  @Input() firstPokemon!: Pokemon;
  @Input() secondPokemon!: Pokemon;
  @Output() combat!: Combat;
  @Output() logs: string[] = [];

  ngOnInit(): void {
    this.firstPokemon = givenPokemon({
      name: 'Pikachu',
      type: PokemonType.ELECTRIC,
      hp: 35,
      level: 1,
      attack: 55,
      defense: 40,
      speed: 90,
    });

    this.secondPokemon = givenPokemon();
    this.combat = new Combat(this.firstPokemon, this.secondPokemon);

    this.combat.subscribe((log: string) => {
      this.logs.push(log);
    });
  }

  async start(): Promise<void> {
    await this.combat.start(1000);
  }
}
