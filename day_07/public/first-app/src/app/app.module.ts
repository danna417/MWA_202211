import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { ReactiveFormsModule} from '@angular/forms'
import { FormsModule} from '@angular/forms'

import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { FooterComponent } from './footer/footer.component';
import { GamesComponent } from './games/games.component';
import { GameComponent } from './game/game.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    FooterComponent,
    GamesComponent,
    GameComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    DatePipe,
    ReactiveFormsModule,
    FormsModule,
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
      },
      {
        path : "register",
        component : RegisterComponent
      },
      {
        path : "login",
        component : LoginComponent
      }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
