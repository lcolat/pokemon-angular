import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';
import { Pokemon } from '../fight/models/Pokemon';

@Directive({
  selector: '[pokemonLogColor]',
})
export class PokemonLogColorDirective {
  @Input('pokemonLogColor') pokemons!: [Pokemon, Pokemon];

  constructor(private renderer: Renderer2, private elmRef: ElementRef) {}

  ngOnInit(): void {
    const attackerNameElements = this.elmRef.nativeElement.querySelectorAll(
      '.attackerName',
    );

    const defenderNameElements = this.elmRef.nativeElement.querySelectorAll(
      '.defenderName',
    );

    for (const attackerNameEl of attackerNameElements) {
      this.renderer.setStyle(attackerNameEl, 'color', this.pokemons[0].color);
    }

    for (const defenderNameEl of defenderNameElements) {
      this.renderer.setStyle(defenderNameEl, 'color', this.pokemons[1].color);
    }
  }
}
