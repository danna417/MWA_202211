import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Winner } from '../winners/winners.component';
import { WinnersService } from '../winners.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchForm !: FormGroup;
  winner !: Winner;
  winners : Winner[] = [];
  page : number = 1;
  offset : number = 0;
  count : number = 5;

  constructor(private winnerService : WinnersService) { }


  ngOnInit(): void {
    this.searchForm = new FormGroup ({
      country : new FormControl("country")
    })
  }

  onSearch():void {
    this.getData();
  }

  getData(): void{
    this.winnerService.searchByBornCountry(this.offset, this.count, this.searchForm.value.country).subscribe( winners=> {
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
