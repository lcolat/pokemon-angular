import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LikeButtonComponent } from './like-button/like-button.component';
import { CombatComponent } from './combat/combat.component';
import { PlayButtonComponent } from './play-button/play-button.component';

@NgModule({
  declarations: [
    AppComponent,
    LikeButtonComponent,
    CombatComponent,
    PlayButtonComponent,
  ],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
