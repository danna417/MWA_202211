import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Winner } from '../winners/winners.component';
import { WinnersService } from '../winners.service';

@Component({
  selector: 'app-winner',
  templateUrl: './winner.component.html',
  styleUrls: ['./winner.component.css']
})
export class WinnerComponent implements OnInit {
  winner !: Winner;

  constructor(private route : ActivatedRoute, private winnerService : WinnersService, private router : Router) { 
    this.winner = new Winner("", "", "");
  }

  ngOnInit(): void {
    const winnerId = this.route.snapshot.params["winnerId"];
    this.winnerService.getWinner(winnerId).subscribe(winner => {
      this.winner = winner;
    })
  }

  deleteWinner() : void { 
    const winnerId = this.route.snapshot.params["winnerId"];

    this.winnerService.deleteWinner(winnerId).subscribe(winner => {
      console.log("delete winner ", winner);

      this.router.navigate(["winners"])
      
    })
  }

}
