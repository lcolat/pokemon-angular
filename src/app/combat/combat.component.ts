import { Component, Input, OnInit, Output } from '@angular/core';
import { Pokemon, PokemonType } from '../fight/models/Pokemon';
import { givenPokemon } from '../fight/utils';
import { FightState, FightService, Log } from '../fight/fight.service';

@Component({
  selector: 'combat-component',
  templateUrl: './combat.component.html',
  styleUrls: ['./combat.component.css'],
})
export class CombatComponent implements OnInit {
  @Input() firstPokemon!: Pokemon;
  @Input() secondPokemon!: Pokemon;
  @Output() logs: Log[] = [];

  constructor(public fightService: FightService) {}

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

    this.fightService.subscribe((log: Log) => {
      this.logs.push(log);
    });
  }

  async start(): Promise<void> {
    const startButton = document.getElementById(
      'startButton',
    ) as HTMLInputElement;

    startButton.disabled = true;

    const pauseButton = document.getElementById(
      'pauseButton',
    ) as HTMLInputElement;

    pauseButton.hidden = false;

    this.fightService.init(this.firstPokemon, this.secondPokemon);
    await this.fightService.start(1000);
  }

  handlePlay(fightState: FightState): void {
    this.fightService.state = fightState;
  }
}
