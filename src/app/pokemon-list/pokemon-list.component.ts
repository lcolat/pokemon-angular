import { Component, OnInit, Output } from '@angular/core';
import { PokemonService } from '../pokemon/pokemon.service';
import { Pokemon } from '../fight/models/Pokemon';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css'],
})
export class PokemonListComponent implements OnInit {
  @Output() pokemons!: Pokemon[];

  constructor(private pokemonService: PokemonService) {}

  async ngOnInit(): Promise<void> {
    this.pokemons = await Promise.all([
      this.pokemonService.getPokemon('ditto'),
      this.pokemonService.getPokemon('bulbasaur'),
      this.pokemonService.getPokemon('charmander'),
      this.pokemonService.getPokemon('squirtle'),
      this.pokemonService.getPokemon('caterpie'),
      this.pokemonService.getPokemon('weedle'),
      this.pokemonService.getPokemon('rattata'),
      this.pokemonService.getPokemon('pikachu'),
      this.pokemonService.getPokemon('sandslash'),
      this.pokemonService.getPokemon('nidoqueen'),
      this.pokemonService.getPokemon('vulpix'),
      this.pokemonService.getPokemon('zubat'),
      this.pokemonService.getPokemon('oddish'),
      this.pokemonService.getPokemon('paras'),
    ]);
  }
}
