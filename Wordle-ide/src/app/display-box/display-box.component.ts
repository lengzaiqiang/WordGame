import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-display-box',
  templateUrl: './display-box.component.html',
  styleUrls: ['./display-box.component.css']
})
export class DisplayBoxComponent implements OnInit {

  @Input()
  value : string = '';

  @Input()
  bkcolor : string = '#grey'

  constructor() { }

  ngOnInit(): void {
    this.value = 'X';
  }

}
