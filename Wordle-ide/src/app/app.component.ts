import { KeyboardButtonComponent } from './keyboard-button/keyboard-button.component';
import { Component } from '@angular/core';
import { DisplayBoxComponent } from './display-box/display-box.component';
import { BackGroundColor, IKeyButton } from './keyboard-button/keybutton';
import { IDisplayBox } from './display-box/display-box';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  readonly NUM_COL = 6;
  readonly NUM_ROW = 5
  readonly NUM_KEYS = 28;

  // to indicate which would be the next box
  // show the input value.
  private _index : number = 0;

  title = 'Wordle Game';
  displays : IDisplayBox[] = [];
  keyboard_buttons: IKeyButton[] = [];

  getTitle() {
    return this.title;
  }

  constructor() {
    this.initKeyboard();

    for (var i: number = 0; i < this.NUM_COL * this.NUM_ROW; i++){
        this.displays[i] = {
          value: '',
          column: 0,
          row: 0,
          bkColor: BackGroundColor.Default, 
          isFilled: false
        };
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

  //handle the backspace key.
  private handleBkSpace()
  {
    if (this._index == 0)
    {
      //alredy deleted all the inputs, 
      //one exception is "1st" letter box, once
      //_index reaches 0, it won't decrease any more.
      this.displays[this._index].value = ''
      return;
    }

    if (this._index >= this.displays.length)
    {
      // in case the inputs are full-filled, we 
      // clear the last letter.
      this._index = this.displays.length - 1;
    }

    this.displays[this._index].value = ''
    this._index--;

  }

  private handleEnterKey()
  {
    //call to the service to handle over
    //the request to server side.
    this.displays[this._index].bkColor = (this.displays[this._index].bkColor + 1) % 4;
  }

  /// Get called when Keyboard button is clicked.
  OnClicked(info: IKeyButton)
  {
    console.log(`Button ${info.value} is clicked!`);
    
    if (info.value == "BKSPACE")
    {
      this.handleBkSpace();
      return;
    }
    
    if (this._index >= this.displays.length)
    {
      alert("Todo: exceeds the capacity, should disable the keyboard input");
      return;
    }

    if (info.value == 'ENTER')
    {
      this.handleEnterKey();
      return;
    }

    this.displays[this._index].value =  info.value;
    this._index++;
  }

  private initKeyboard()
  {
    for (var j: number = 0; j < this.NUM_KEYS; j++)
    {
      var tmp : IKeyButton = {
        value: '',
        column: 0,
        row: 0,
        bkColor: BackGroundColor.Default
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
