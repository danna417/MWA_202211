import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  constructor(public authService : AuthenticationService) { }
  env = environment;

  ngOnInit(): void {
  }

}
