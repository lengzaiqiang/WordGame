import { Component } from '@angular/core';
import { DisplayBoxComponent } from './display-box/display-box.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  readonly NUM_COL = 6;
  readonly NUM_ROW = 5
  title = 'Wordle Game';
  displays : DisplayBoxComponent[][] = [];

  columnDefs = [
    {headerName: 'Make', field: 'make'},
    {headerName: 'Model', field: 'model'},
    {headerName: 'Price', field: 'price'}
  ];
  rowData = [
    {make: 'Toyota', model: 'Celica', price: 35000},
    {make: 'Ford', model: 'Mondeo', price: 32000},
    {make: 'Porsche', model: 'Boxter', price: 72000}
  ];

  cards = [
    {title: 'Title 1', content: 'Content 1'},
    {title: 'Title 2', content: 'Content 2'},
    {title: 'Title 3', content: 'Content 3'},
    {title: 'Title 4', content: 'Content 4'}
  ];
  
  getTitle() {
    return this.title;
  }

  constructor() {
    for (var i: number = 0; i < this.NUM_COL; i++){
      this.displays[i] = [];
      for (var j: number = 0; j < this.NUM_ROW; j++)
      {
        this.displays[i][j] = new DisplayBoxComponent();
      }    
    }
  }
}
