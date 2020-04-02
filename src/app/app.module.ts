import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LikeButtonComponent } from './like-button/like-button.component';
import { CombatComponent } from './combat/combat.component';
import { PlayButtonComponent } from './play-button/play-button.component';
import { LogColorDirective } from './combat/log-color.directive';
import { PokemonComponent } from './pokemon/pokemon.component';
import { PokemonLogColorDirective } from './combat/pokemon-log-color.directive';
import { CustomDatePipe } from './pipes/custom-date.pipe';

@NgModule({
  declarations: [
    AppComponent,
    LikeButtonComponent,
    CombatComponent,
    PlayButtonComponent,
    LogColorDirective,
    PokemonComponent,
    PokemonLogColorDirective,
    CustomDatePipe,
  ],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
