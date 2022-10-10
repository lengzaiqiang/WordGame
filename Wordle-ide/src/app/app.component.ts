import { KeyboardButtonComponent } from './keyboard-button/keyboard-button.component';
import { Component, Inject } from '@angular/core';
import { DisplayBoxComponent } from './display-box/display-box.component';
import { BackGroundColor, IKeyButton } from './keyboard-button/keybutton';
import { IDisplayBox } from './display-box/display-box';
import { AppService } from './app.service';
import { LetterResult } from './IApp.Service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  readonly NUM_COL = 5;
  readonly NUM_ROW = 6
  readonly NUM_KEYS = 28;

  // to indicate which would be the next box
  // show the input value.  It always points
  // to next input box.
  private _col = 0;
  private _row = 0;

  //save the characters user inputs.
  private _word : string = '';

  //whether we have started a new session.
  private _startedNewSession : boolean = false;

  title = 'Wordle Game';
  displays : IDisplayBox[] = [];
  keyboard_buttons: IKeyButton[] = [];

  getTitle() {
    return this.title;
  }

  constructor(
    private _service: AppService
  ) {
    this.Init();
  }

  private Init()
  {
    this._col = 0;
    this._row = 0;
    this._word = "";
    this._startedNewSession = false;
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

  private calulateIndex(row: number, col: number){
    return row * this.NUM_COL + col;
  }

  //handle the backspace key.
  private handleBkSpace()
  {
    if (this._col == 0)
    {
      //already in 1st, so do nothing.
      return;
    }

    this._word = this._word.substring(0, this._word.length - 1);
    this._col--;

    this.displays[this.calulateIndex(this._row, this._col)].value = ''
  }

  private UpdateLetterColors(results: string[])
  {
    let start = this._row * this.NUM_COL;

    results.forEach( res => {
      switch(res)
      {
        case LetterResult[LetterResult.NotExist]:
          this.displays[start].bkColor = BackGroundColor.NotCorrect;
          break;
        case LetterResult[LetterResult.LetterPositionCorrect]:
          this.displays[start].bkColor = BackGroundColor.BothCorrect;
          break;
        case LetterResult[LetterResult.LetterCorrectOnly]:
          this.displays[start].bkColor = BackGroundColor.LetterCorrect;
          break;
        default:
          console.log(`can't find result: ${res}! Something is wrong!****`);
          break;
      }
      start++;
    });
  }

  private async handleEnterKey()
  {
    //call to the service to handle over
    //the request to server side.
    if (this._col != this.NUM_COL)
    {
      //not enough word, do nothing
      alert('Not enough character');
      return;
    }

    // check whether we have started a new session
    if (this._startedNewSession == false)
    {
      this._startedNewSession = true;
      const _ = await this._service.GetRandomWord();
    }

    const res = await this._service.CheckWord(this._word)
    if (res.wordExist)
    {
      if (res.wordCorrect)
      {
        var letterResult : string[] = new Array<string>(5).fill(LetterResult[LetterResult.LetterPositionCorrect]);
        this.UpdateLetterColors(letterResult);
        this._word = "";
        alert("Congratulations! You dit it!");
      }
      else
      {
        this.UpdateLetterColors(<string[]><unknown>res.letterResult);

        //try next please.
        //move to next row
        this._col = 0;
        this._row++;
        this._word = "";
      }
    }
    else
    {
      //word doesn't exist, shake the words and do nothing.
      alert(`input word ${this._word} does not exist!`)
      return;
    }

    //let index = this.calulateIndex(this._row, this._col);
    //this.displays[index].bkColor = (this.displays[index].bkColor + 1) % 4;
  }

  /// Get called when Keyboard button is clicked.
  OnClicked(info: IKeyButton)
  {    
    if (info.value == "BKSPACE")
    {
      this.handleBkSpace();
      return;
    }
    
    if (this._col >= this.NUM_COL && info.value != 'ENTER')
    {
      alert("Only take up to 5 letters, press Enter to submit");
      return;
    }

    if (info.value == 'ENTER')
    {
      this.handleEnterKey();
      return;
    }

    this._word = this._word + info.value;
    this.displays[this.calulateIndex(this._row, this._col)].value =  info.value;
    this._col++;
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
