import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Winner } from '../winners/winners.component';
import { WinnersService } from '../winners.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-add-winner',
  templateUrl: './add-winner.component.html',
  styleUrls: ['./add-winner.component.css']
})
export class AddWinnerComponent implements OnInit {
  winner !: Winner;
  addForm !: FormGroup;

  constructor(private router : Router, private winnerServ : WinnersService) { 
    this.winner = new Winner("", "", "");
  }

  ngOnInit(): void {
    this.addForm = new FormGroup ({
      firstname : new FormControl("firstname"),
      surname : new FormControl("surname"),
      year : new FormControl("year")
    })
  }

  onAdd():void {
    this.winner = this.addForm.value;
    this.winnerServ.addOne(this.winner).subscribe(winner => {
      console.log("added winner ", winner);

      this.router.navigate(["winner",winner._id]);
    })
  }
}
