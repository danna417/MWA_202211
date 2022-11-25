import { Component, EnvironmentInjector, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  env = environment;
  
  constructor() { }

  ngOnInit(): void {
    console.log(environment.nav_manga + ":" + environment.param_mangaId + environment.nav_author + ":" + environment.param_authorId)
  }

}
