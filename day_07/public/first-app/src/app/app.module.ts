import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { FooterComponent } from './footer/footer.component';
import { GamesComponent } from './games/games.component';
import { GameComponent } from './game/game.component';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    FooterComponent,
    GamesComponent,
    GameComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    DatePipe,
    RouterModule.forRoot([
      {
        path : "",
        component : HomeComponent
      },
      {
        path : "games",
        component : GamesComponent
      },
      {
        path : "game/:gameId",
        component : GameComponent
      }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
