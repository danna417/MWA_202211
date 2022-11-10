import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css']
})
export class ParentComponent implements OnInit {

  constructor() { }
parentX : number = 8;
parentY : number = 2;
parentZ : number = 10;
  ngOnInit(): void {
  }

}
