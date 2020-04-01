import { Component, Input, OnInit, Output } from '@angular/core';
import { Pokemon, PokemonType } from '../logic/Pokemon';
import { Combat, CombatState } from '../logic/Combat';
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

    this.secondPokemon = givenPokemon({
      name: 'Salamèche',
      type: PokemonType.FIRE,
      hp: 39,
      level: 1,
      attack: 52,
      defense: 43,
      speed: 65,
    });

    this.combat = new Combat(this.firstPokemon, this.secondPokemon);

    this.combat.subscribe((log: string) => {
      this.logs.push(log);
    });
  }

  async start(): Promise<void> {
    var btn = <HTMLInputElement>document.getElementById('startButton');
    btn.disabled = true;
    btn = <HTMLInputElement>document.getElementById('pauseButton');
    btn.hidden = false;
    await this.combat.start(1000);
  }

  handlePlay(combatState: CombatState): void {
    this.combat.state = combatState;
  }
}
