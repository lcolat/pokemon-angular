import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CombatComponent } from './combat/combat.component';
import { PlayButtonComponent } from './play-button/play-button.component';
import { LogColorDirective } from './combat/log-color.directive';
import { PokemonComponent } from './pokemon/pokemon.component';
import { PokemonLogColorDirective } from './combat/pokemon-log-color.directive';
import { CustomDatePipe } from './pipes/custom-date.pipe';
import { PokemonListComponent } from './pokemon-list/pokemon-list.component';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import {FormsModule} from "@angular/forms";

export const appRoutes: Routes = [
  { path: '', component: PokemonListComponent },
  { path: 'combat', component: CombatComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    CombatComponent,
    PlayButtonComponent,
    LogColorDirective,
    PokemonComponent,
    PokemonLogColorDirective,
    CustomDatePipe,
    PokemonListComponent,
    PageNotFoundComponent,
  ],
  imports: [RouterModule.forRoot(appRoutes), BrowserModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
