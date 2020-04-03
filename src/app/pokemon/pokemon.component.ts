import { Component, Input, OnInit } from '@angular/core';
import { Pokemon } from '../fight/models/Pokemon';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css'],
})
export class PokemonComponent implements OnInit {
  @Input('pokemon') pokemon!: Pokemon;
  @Input('isAttacker') isAttacker!: boolean;
  initialHealth!: number;
  sprite!: string;

  ngOnInit(): void {
    this.sprite = this.isAttacker
      ? this.pokemon.sprites.back
      : this.pokemon.sprites.front;

    this.initialHealth = this.pokemon.hp;
  }

  get hpPercentage() {
    return Math.floor(this.pokemon.hp * (100 / this.initialHealth));
  }
}
