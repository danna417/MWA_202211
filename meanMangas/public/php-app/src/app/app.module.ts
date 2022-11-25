import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser'
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule} from '@angular/forms';
import { FormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MangasComponent } from './mangas/mangas.component';
import { MangaComponent } from './manga/manga.component';
import { AuthorComponent } from './author/author.component';
import { NavigationComponent } from './navigation/navigation.component';
import { LoginComponent } from './login/login.component';
import { FooterComponent } from './footer/footer.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { AddMangaComponent } from './add-manga/add-manga.component';
import { RegisterComponent } from './register/register.component';
import { environment } from 'src/environments/environment';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MangasComponent,
    MangaComponent,
    AuthorComponent,
    NavigationComponent,
    LoginComponent,
    FooterComponent,
    ErrorPageComponent,
    AddMangaComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forRoot([
      {
        path : environment.nav_home,
        component : HomeComponent
      },
      {
        path: environment.nav_register,
        component : RegisterComponent
      },
      {
        path: environment.nav_mangas,
        component : MangasComponent
      },
      {
        path: environment.nav_mangas_add,
        component : AddMangaComponent
      }
      ,
      {
        path: environment.nav_manga + ":" + environment.param_mangaId,
        component : MangaComponent
      },
      {
        path:  environment.nav_manga + ":" + environment.param_mangaId + environment.nav_author + ":" + environment.param_authorId,
        component : AuthorComponent
      }
      ,
      {
        path: "**",
        component : ErrorPageComponent
      }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}