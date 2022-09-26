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
  displays : DisplayBoxComponent[] = [];

  getTitle() {
    return this.title;
  }

  constructor() {
    for (var i: number = 0; i < this.NUM_COL * this.NUM_ROW; i++){
        this.displays[i] = new DisplayBoxComponent();
    }
  }
}
