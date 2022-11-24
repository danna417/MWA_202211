import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CitiesDataService } from '../cities-data.service';
import { City } from '../cities/cities.component';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css']
})
export class CityComponent implements OnInit {

  city:City= new City;
  constructor(private cityService: CitiesDataService, private route: ActivatedRoute, private router : Router) { }

  ngOnInit(): void {
    const cityId: string= this.route.snapshot.params["cityId"];
    
    this.cityService.getCity(cityId).subscribe({
      next: (city)=> {this.fillCity(city), console.log("x ", city.loc.x )},
      error: (error)=>{this.city= new City; console.log(error);
      },
    });
  }

  private fillCity(city: City): void {
    this.city= city;
  }

  onDelete(): void {
    const cityId: string= this.route.snapshot.params["cityId"];
    this.cityService.deleteCity(cityId).subscribe({
      next: (city)=> {
        this.fillCity(city), 
        this.router.navigate(["/cities"]);
      },
      error: (error)=>{this.city= new City; console.log(error);
      },
    });

  }

}
