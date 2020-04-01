import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LikeButtonComponent } from './like-button/like-button.component';
import { CombatComponent } from './combat/combat.component';
import { PlayButtonComponent } from './play-button/play-button.component';
import { LogColorDirective } from './combat/log-color.directive';

@NgModule({
  declarations: [
    AppComponent,
    LikeButtonComponent,
    CombatComponent,
    PlayButtonComponent,
    LogColorDirective,
  ],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
