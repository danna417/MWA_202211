import { Component, Injectable, OnInit } from '@angular/core';
import { GamesDataService } from '../games-data.service';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent implements OnInit {
  // games: any[]= [{
  //   _id: "123",
  //   title: "Catan",
  //   price: 39.99
  //   }];
  
  games: Games[] = [];
  constructor(private gamesService:GamesDataService) { }

  ngOnInit(): void {
    this.gamesService.getGames().subscribe(games => {
      this.games= games;
   });

  }
}

export class Games{
  
  #_id !: string;
  #title !:string;
  #year !:string;
  #rate !:number;
  #price !:number;
  #minPlayers !:number;
  #maxPlayers !:number;
  #minAge !:number;
   constructor (title : string, year: string, rate: number){
    this.#title = title;
    this.#year = year;
    this.#rate = rate;
  }
  get _id() {return this.#_id; }
  get title() {return this.#title; }
  get year() {return this.#year; }
  get rate() {return this.#rate; }
  get price() {return this.#price; }
  get minPlayers() {return this.#minPlayers; }
  get maxPlayers() {return this.#maxPlayers; }
  get minAge() {return this.#minAge; }
  
  set title(title : string) { this.#title = title ; }
  set year(year : string) { this.#year = year ; }
  set rate(rate : number) { this.#rate = rate ; }
  set price(price : number) { this.#price = price ; }
  set minPlayers(minPlayers : number) { this.#minPlayers = minPlayers ; }
  set maxPlayers(maxPlayers : number) { this.#maxPlayers = maxPlayers ; }
  set minAge(minAge : number) { this.#minAge = minAge ; }
}

