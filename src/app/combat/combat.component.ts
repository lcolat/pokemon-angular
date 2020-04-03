import { Component, Input, OnInit, Output } from '@angular/core';
import { Pokemon, PokemonType } from '../fight/models/Pokemon';
import { givenPokemon } from '../fight/utils';
import { FightState, FightService, Log } from '../fight/fight.service';
import { Observable } from 'rxjs';
import { PokemonService } from '../pokemon/pokemon.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'combat-component',
  templateUrl: './combat.component.html',
  styleUrls: ['./combat.component.css'],
})
export class CombatComponent implements OnInit {
  @Input() firstPokemon!: Pokemon;
  @Input() secondPokemon!: Pokemon;
  @Output() logs: Log[] = [];
  @Output() winner?: Pokemon;
  source!: Observable<Log | undefined>;

  constructor(
    public fightService: FightService,
    private pokemonService: PokemonService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  async ngOnInit(): Promise<void> {
    const firstPokemonName = this.route.snapshot.queryParamMap.get(
      'firstPokemon',
    );

    const secondPokemonName = this.route.snapshot.queryParamMap.get(
      'secondPokemon',
    );

    if (!firstPokemonName || !secondPokemonName) {
      await this.router.navigate(['']);
    } else {
      this.firstPokemon = await this.pokemonService.getPokemon(
        firstPokemonName,
      );

      this.secondPokemon = await this.pokemonService.getPokemon(
        secondPokemonName,
      );
    }
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

    this.source = this.fightService.init(
      this.firstPokemon,
      this.secondPokemon,
      500,
    );

    const subscription = this.source.subscribe((log: Log | undefined) => {
      if (!log) {
        return; // when game is paused per example
      }

      this.logs.push(log);

      if (log.type === 'end') {
        subscription.unsubscribe();
      }
    });
  }

  handlePlay(fightState: FightState): void {
    this.fightService.state = fightState;
  }
}
