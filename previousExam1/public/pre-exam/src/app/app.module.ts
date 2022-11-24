import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule} from '@angular/forms';
import { FormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { WinnersComponent } from './winners/winners.component';
import { WinnerComponent } from './winner/winner.component';
import { HomeComponent } from './home/home.component';
import { SearchComponent } from './search/search.component';
import { AddWinnerComponent } from './add-winner/add-winner.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    WinnersComponent,
    WinnerComponent,
    HomeComponent,
    SearchComponent,
    AddWinnerComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forRoot([
      {
        path: "",
        component : HomeComponent
      },
      {
        path: "winners",
        component : WinnersComponent
      },
      {
        path: "winner/:winnerId",
        component : WinnerComponent
      },
      {
        path: "winners/search",
        component : SearchComponent
      },
      {
        path: "winners/add",
        component : AddWinnerComponent
      }
  ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
