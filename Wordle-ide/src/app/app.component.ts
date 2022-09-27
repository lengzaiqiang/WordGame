import { KeyboardButtonComponent } from './keyboard-button/keyboard-button.component';
import { Component } from '@angular/core';
import { DisplayBoxComponent } from './display-box/display-box.component';
import { IKeyButton } from './keyboard-button/keybutton';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  readonly NUM_COL = 6;
  readonly NUM_ROW = 5
  readonly NUM_KEYS = 28;

  title = 'Wordle Game';
  displays : DisplayBoxComponent[] = [];
  keyboard_buttons: IKeyButton[] = [];

  getTitle() {
    return this.title;
  }

  constructor() {
    this.initKeyboard();

    for (var i: number = 0; i < this.NUM_COL * this.NUM_ROW; i++){
        this.displays[i] = new DisplayBoxComponent();
        this.displays[i].value = 'X';
    }
  }

  public getKeyCountInRows(row : number)
  {
    return this.getKeysInRow(row).length

  }

  public getKeysInRow(row: number)
  {
    return this.keyboard_buttons.filter( kb => kb.row == row)
  }

  private initKeyboard()
  {
    for (var j: number = 0; j < this.NUM_KEYS; j++)
    {
      var tmp : IKeyButton = {
        value: '',
        column: 0,
        row: 0
      };

      this.keyboard_buttons[j] = tmp;
      this.initKeyComp(j, tmp);
    }
  }

  private initKeyComp(index: number, kb : IKeyButton)
  {
    let keys = [
      'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P',
      'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L',
      'ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'BKSPACE'
  ];

  kb.value = keys[index];

  if (index < 10) //first row
    {
      kb.row = 0;
      kb.column = index;
      return;
    }

    if (index < 19) //2nd row
    {
      kb.row = 1;
      kb.column = index - 10;
      return;
    }

    //3rd row
    {
      kb.row = 2;
      kb.column = index - 19;
      return;
    }
  }
}
