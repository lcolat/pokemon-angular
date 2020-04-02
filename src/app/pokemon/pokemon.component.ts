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
  sprite = '';

  ngOnInit(): void {
    this.sprite = this.isAttacker
      ? 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/149.png'
      : 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png';
  }
}
