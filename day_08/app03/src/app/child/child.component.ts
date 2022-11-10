import { Component, OnInit, Input } from '@angular/core';
@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css']
})
export class ChildComponent implements OnInit {

  //childX : number = 8;
  // childY : number = 2;
  childZ !: number;

  constructor() { }

  ngOnInit(): void {
  }

@Input()
set childX(x : number){
  this.childX = x;
}
@Input()
set childY(y : number){
  this.childY = y;
}

add():void {
  this.childZ = this.childX + this.childY;
}
}
