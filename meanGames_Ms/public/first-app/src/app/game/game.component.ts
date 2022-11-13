import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { GamesDataService } from '../games-data.service';
import { Games } from '../games/games.component';
@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  game!: Games;
  constructor(private route:ActivatedRoute, private gameService:GamesDataService, private router: Router) { 
    this.game = new Games ("", "", 0);
  }

  ngOnInit(): void {
      const gameId = this.route.snapshot.params["gameId"];
      this.gameService.getGame(gameId).subscribe(game => {
        this.game = game;
      })
  }

  deleteGame(): void{
    
    const gameId = this.route.snapshot.params['gameId'];

    console.log("deleteGame request", gameId);
    this.gameService.deleteGame(gameId).subscribe(game => {
      console.log("deleted game: ", game);
      
      this.router.navigate(["games"])
    });
  }

}
