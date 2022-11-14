import { Component, OnInit } from '@angular/core';
import { WinnersService} from '../winners.service';



@Component({
  selector: 'app-winners',
  templateUrl: './winners.component.html',
  styleUrls: ['./winners.component.css']
})
export class WinnersComponent implements OnInit {
  winners : Winner[] = [];
  page : number = 1;
  offset : number = 0;
  count : number = 5;

  constructor(private winnerService : WinnersService) { }

  ngOnInit(): void {
    this.getData();
  }
  getData(): void{
    this.winnerService.getWinners(this.offset, this.count).subscribe( winners=> {
      this.winners = winners;
    })
  }

  onPrev(): void{
    if(this.offset > 0) {
      this.offset-= this.count;
      this.page--;
      this.getData();
    }
  }

  onNext(): void{
    console.log(this.offset);
    
  //  if(this.offset < this.winners.length - this.count) {
      this.offset+= this.count;
      this.page++;
      this.getData();
    //}
  }

}

export class Winner {
    #_id !: String;
    #firstname !: String;
    #surname !: String;
    #born !: String;
    #died !: String;
    #bornCountry !: String;
    #bornCountryCode !: String;
    #bornCity !: String;
    #diedCountry !: String;
    #diedCountryCode !: String;
    #diedCity !: String;
    #gender !: String;
    #year !: String;
    #category !: String;
    #motivation !: String;
    #affiliation !: String;

    get _id () : String {return this.#_id; }
    get firstname () : String {return this.#firstname; }
    get surname () : String {return this.#surname; }
    get born () : String {return this.#born; }
    get died () : String {return this.#died; }
    get bornCountry () : String {return this.#bornCountry; }
    get bornCountryCode () : String {return this.#bornCountryCode; }
    get bornCity () : String {return this.#bornCity; }
    get diedCountry () : String {return this.#diedCountry; }
    get diedCountryCode () : String {return this.#diedCountryCode; }
    get diedCity () : String {return this.#diedCity; }
    get gender () : String {return this.#gender; }
    get year () : String {return this.#year; }
    get category () : String {return this.#category; }
    get motivation () : String {return this.#motivation; }
    get affiliation () : String {return this.#affiliation; }

    set id (id : String) { this.#_id = id ; }
    set firstname (firstname : String) { this.#firstname = firstname ; }
    set surname (surname : String) { this.#surname = surname ; }
    set born (born : String) { this.#born = born ; }
    set died (died : String) { this.#died = died ; }
    set bornCountry (bornCountry : String) { this.#bornCountry = bornCountry ; }
    set bornCountryCode (bornCountryCode : String) { this.#bornCountryCode = bornCountryCode ; }
    set bornCity (bornCity : String) { this.#bornCity = bornCity ; }
    set diedCountry (diedCountry : String) { this.#diedCountry = diedCountry ; }
    set diedCountryCode (diedCountryCode : String) { this.#diedCountryCode = diedCountryCode ; }
    set diedCity (diedCity : String) { this.#diedCity = diedCity ; }
    set gender (gender : String) { this.#gender = gender ; }
    set year (year : String) { this.#year = year ; }
    set category (category : String) { this.#category = category ; }
    set motivation (motivation : String) { this.#motivation = motivation ; }
    set affiliation (affiliation : String) { this.#affiliation = affiliation ; }

    constructor (firstname : String, surname : String, year : String) {
      this.#firstname = firstname;
      this.#surname = surname;
      this.#year = year;
    }
}