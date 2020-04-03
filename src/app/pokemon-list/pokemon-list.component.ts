import { Component, Input, OnInit, Output } from '@angular/core';
import { PokemonService } from '../pokemon/pokemon.service';
import { Pokemon } from '../fight/models/Pokemon';
import { Router } from '@angular/router';
import { givenPokemon } from '../fight/utils';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css'],
})
export class PokemonListComponent implements OnInit {
  @Output() pokemons!: Pokemon[];
  @Output() firstPokemon?: Pokemon;
  @Output() secondPokemon?: Pokemon;
  @Output() loading: boolean;
  @Input() pokemonToCreate: Partial<Pokemon> = {};

  constructor(private pokemonService: PokemonService, private router: Router) {
    this.loading = true;
  }

  async ngOnInit(): Promise<void> {
    try {
      this.pokemons = await Promise.all([
        this.pokemonService.getPokemon('charizard'),
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
    } catch (err) {
      console.error(err);
    } finally {
      this.loading = false;
    }
  }

  public selectFirstPokemon(pokemon: Pokemon): void {
    this.firstPokemon = pokemon;
  }

  public selectSecondPokemon(pokemon: Pokemon): void {
    this.secondPokemon = pokemon;
  }

  public async start(): Promise<void> {
    await this.router.navigate(['combat'], {
      queryParams: {
        firstPokemon: this.firstPokemon?.name,
        secondPokemon: this.secondPokemon?.name,
      },
    });
  }

  public submitPokemon(): void {
    console.log('NEW POKEMON', givenPokemon(this.pokemonToCreate));
  }
}
