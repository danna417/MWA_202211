import { Component, OnInit } from '@angular/core';
import { CitiesDataService } from '../cities-data.service';

export class City {
  #_id!: String;
  #city!: String;
  #zip!: String;
  #loc!: {
    x: Number,
    y: Number
  };
  #pop!: Number;
  #state!: String;

  get _id() {return this.#_id};
  get city() {return this.#city;}
  get zip() {return this.#zip;}
  get x() {return this.#loc.x;}
  get y() {return this.#loc.y;}
  get pop() {return this.#pop;}
  get state() {return this.#state;}
  
  set _id(_id) {this.#_id= _id;}
  set city(city) {this.#city= city;}
  set zip(zip) {this.#zip= zip;}
  set x(x) {this.#loc.x= x;}
  set y(y) {this.#loc.y= y;}
  set loc(loc:{x: Number,y: Number}) {this.#loc= loc;}
  set pop(pop) {this.#pop= pop;}
  set state(state) {this.#state= state;}
  
  constructor() {
    this.loc= {x: 0, y: 0};
  }
}

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.css']
})
export class CitiesComponent implements OnInit {

  cities!: City[];

  // private cityService!:CitiesDataService;
  constructor(private cityService : CitiesDataService) { }

  ngOnInit(): void {
    this.cityService.getCities().subscribe({
      next: (cities)=> this.fillCities(cities),
      error: (error)=>{this.cities= []; console.log(error);
      },
    });
  }

  private fillCities(cities: City[]) {
    this.cities= cities;
  }

}
